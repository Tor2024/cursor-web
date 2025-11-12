import { getItems, addItem, updateItem, deleteItem } from '../../../utils/fileStorage.js';

const VALID_TYPES = ['news', 'portfolio'];

function validateType(type) {
  if (!VALID_TYPES.includes(type)) {
    throw new Error(`Invalid type: ${type}. Valid types are: ${VALID_TYPES.join(', ')}`);
  }
}

export async function GET(request, { params }) {
  try {
    const { type } = params || {};
    validateType(type);
    const items = await getItems(type);
    return new Response(
      JSON.stringify({
        data: items.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(`Error fetching ${params?.type || 'unknown'}:`, error);
    return new Response(
      JSON.stringify({ error: `Failed to fetch ${params?.type || 'content'}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { type } = params || {};
    validateType(type);
    const item = await request.json();
    if (!item.folder_name) {
      return new Response(
        JSON.stringify({ error: 'folder_name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    await addItem(type, item);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(`Error adding ${params?.type || 'unknown'} item:`, error);
    return new Response(
      JSON.stringify({ error: `Failed to add ${params?.type || 'content'} item` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { type } = params || {};
    validateType(type);
    const item = await request.json();
    if (!item.folder_name) {
      return new Response(
        JSON.stringify({ error: 'folder_name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    await updateItem(type, item.folder_name, item);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(`Error updating ${params?.type || 'unknown'} item:`, error);
    return new Response(
      JSON.stringify({ error: `Failed to update ${params?.type || 'content'} item` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { type } = params || {};
    validateType(type);
    const { folder_name } = await request.json();
    if (!folder_name) {
      return new Response(
        JSON.stringify({ error: 'folder_name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    await deleteItem(type, folder_name);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(`Error deleting ${params?.type || 'unknown'} item:`, error);
    return new Response(
      JSON.stringify({ error: `Failed to delete ${params?.type || 'content'} item` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

