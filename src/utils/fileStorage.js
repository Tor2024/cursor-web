import { promises as fs } from 'node:fs';
import { join } from 'node:path';

// Determine storage method based on environment
const USE_BLOB_STORAGE = !!process.env.BLOB_READ_WRITE_TOKEN;

// Lazy import for Vercel Blob (only if token is available)
let blobStoragePromise = null;
async function getBlobStorage() {
  if (!USE_BLOB_STORAGE) {
    return null;
  }
  if (!blobStoragePromise) {
    blobStoragePromise = import('@vercel/blob').catch((error) => {
      console.warn('Vercel Blob not available, using file system:', error.message);
      return null;
    });
  }
  return blobStoragePromise;
}

// File system paths (for local development)
const DATA_DIR = join(process.cwd(), 'content_data');
const TYPE_DIRS = {
  news: join(DATA_DIR, 'news'),
  portfolio: join(DATA_DIR, 'portfolio'),
};

function getDirForType(type) {
  const dir = TYPE_DIRS[type];
  if (!dir) {
    throw new Error(`Unknown content type: ${type}. Supported types: ${Object.keys(TYPE_DIRS).join(', ')}`);
  }
  return dir;
}

async function ensureDirExists(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.warn(`Warning: Could not create directory ${dir}:`, error.message);
  }
}

async function readJsonFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

async function writeJsonFile(filePath, data) {
  await ensureDirExists(join(filePath, '..'));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Blob Storage functions
function getBlobPath(type, folderName) {
  return `content_data/${type}/${folderName}.json`;
}

async function getItemsFromBlob(type) {
  const blobStorage = await getBlobStorage();
  if (!blobStorage) {
    throw new Error('Blob storage not available');
  }
  const { list } = blobStorage;
  try {
    const prefix = `content_data/${type}/`;
    const { blobs } = await list({ prefix });
    const items = [];
    
    for (const blob of blobs) {
      if (blob.pathname.endsWith('.json')) {
        try {
          const response = await fetch(blob.url);
          const content = await response.text();
          const item = JSON.parse(content);
          items.push(item);
        } catch (error) {
          console.error(`Error reading blob ${blob.pathname}:`, error);
        }
      }
    }
    
    return items;
  } catch (error) {
    console.error(`Error listing blobs for ${type}:`, error);
    return [];
  }
}

async function getItemFromBlob(type, folderName) {
  const blobStorage = await getBlobStorage();
  if (!blobStorage) {
    throw new Error('Blob storage not available');
  }
  const { get } = blobStorage;
  try {
    const path = getBlobPath(type, folderName);
    const blob = await get(path);
    const response = await fetch(blob.url);
    const content = await response.text();
    return JSON.parse(content);
  } catch (error) {
    if (error.message?.includes('not found')) {
      return null;
    }
    throw error;
  }
}

async function addItemToBlob(type, item) {
  const blobStorage = await getBlobStorage();
  if (!blobStorage) {
    throw new Error('Blob storage not available');
  }
  const { put } = blobStorage;
  const path = getBlobPath(type, item.folder_name);
  const content = JSON.stringify(item, null, 2);
  await put(path, Buffer.from(content, 'utf-8'), {
    contentType: 'application/json',
    access: 'public',
  });
}

async function updateItemInBlob(type, folderName, newItem) {
  const blobStorage = await getBlobStorage();
  if (!blobStorage) {
    throw new Error('Blob storage not available');
  }
  const { put } = blobStorage;
  const path = getBlobPath(type, folderName);
  const content = JSON.stringify(newItem, null, 2);
  await put(path, Buffer.from(content, 'utf-8'), {
    contentType: 'application/json',
    access: 'public',
  });
}

async function deleteItemFromBlob(type, folderName) {
  const blobStorage = await getBlobStorage();
  if (!blobStorage) {
    throw new Error('Blob storage not available');
  }
  const { del } = blobStorage;
  try {
    const path = getBlobPath(type, folderName);
    await del(path);
  } catch (error) {
    // Ignore if file doesn't exist
    if (!error.message?.includes('not found')) {
      throw error;
    }
  }
}

// Universal functions for all content types
export async function getItems(type) {
  if (USE_BLOB_STORAGE) {
    try {
      return await getItemsFromBlob(type);
    } catch (error) {
      console.warn(`Blob storage failed for ${type}, falling back to file system:`, error.message);
      // Fall through to file system
    }
  }
  
  // File system fallback
  const dir = getDirForType(type);
  await ensureDirExists(dir);
  
  try {
    const files = await fs.readdir(dir);
    const items = [];
    for (const file of files) {
      if (file.endsWith('.json')) {
        const item = await readJsonFile(join(dir, file));
        if (item) {
          items.push(item);
        }
      }
    }
    return items;
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
}

export async function getItem(type, folderName) {
  if (USE_BLOB_STORAGE) {
    try {
      return await getItemFromBlob(type, folderName);
    } catch (error) {
      console.warn(`Blob storage failed for ${type}, falling back to file system:`, error.message);
      // Fall through to file system
    }
  }
  
  // File system fallback
  const dir = getDirForType(type);
  const filePath = join(dir, `${folderName}.json`);
  return readJsonFile(filePath);
}

export async function addItem(type, item) {
  if (!item.folder_name) {
    throw new Error('folder_name is required');
  }
  
  if (USE_BLOB_STORAGE) {
    try {
      return await addItemToBlob(type, item);
    } catch (error) {
      console.warn(`Blob storage failed for ${type}, falling back to file system:`, error.message);
      // Fall through to file system
    }
  }
  
  // File system fallback
  const dir = getDirForType(type);
  const filePath = join(dir, `${item.folder_name}.json`);
  await writeJsonFile(filePath, item);
}

export async function updateItem(type, folderName, newItem) {
  if (USE_BLOB_STORAGE) {
    try {
      return await updateItemInBlob(type, folderName, newItem);
    } catch (error) {
      console.warn(`Blob storage failed for ${type}, falling back to file system:`, error.message);
      // Fall through to file system
    }
  }
  
  // File system fallback
  const dir = getDirForType(type);
  const filePath = join(dir, `${folderName}.json`);
  await writeJsonFile(filePath, newItem);
}

export async function deleteItem(type, folderName) {
  if (USE_BLOB_STORAGE) {
    try {
      return await deleteItemFromBlob(type, folderName);
    } catch (error) {
      console.warn(`Blob storage failed for ${type}, falling back to file system:`, error.message);
      // Fall through to file system
    }
  }
  
  // File system fallback
  const dir = getDirForType(type);
  const filePath = join(dir, `${folderName}.json`);
  await fs.unlink(filePath).catch(() => {});
}

// Legacy functions for backward compatibility (deprecated, use universal functions instead)
export async function getNewsItems() {
  return getItems('news');
}

export async function getNewsItem(folderName) {
  return getItem('news', folderName);
}

export async function addNewsItem(item) {
  return addItem('news', item);
}

export async function updateNewsItem(folderName, newItem) {
  return updateItem('news', folderName, newItem);
}

export async function deleteNewsItem(folderName) {
  return deleteItem('news', folderName);
}

export async function getPortfolioItems() {
  return getItems('portfolio');
}

export async function getPortfolioItem(folderName) {
  return getItem('portfolio', folderName);
}

export async function addPortfolioItem(item) {
  return addItem('portfolio', item);
}

export async function updatePortfolioItem(folderName, newItem) {
  return updateItem('portfolio', folderName, newItem);
}

export async function deletePortfolioItem(folderName) {
  return deleteItem('portfolio', folderName);
}
