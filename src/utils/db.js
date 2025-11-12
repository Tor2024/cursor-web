import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'db.json');

// Initialize database
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ portfolio: [], news: [] }, null, 2));
}

let db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

const saveDB = () => {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
};

export const getPortfolio = () => db.portfolio;
export const getNews = () => db.news;

export const addPortfolio = (item) => {
  item.id = Date.now();
  db.portfolio.push(item);
  saveDB();
  return item;
};

export const updatePortfolio = (folder_name, item) => {
  const index = db.portfolio.findIndex(p => p.folder_name === folder_name);
  if (index !== -1) {
    db.portfolio[index] = { ...db.portfolio[index], ...item };
    saveDB();
    return db.portfolio[index];
  }
  return null;
};

export const deletePortfolio = (folder_name) => {
  db.portfolio = db.portfolio.filter(p => p.folder_name !== folder_name);
  saveDB();
};

export const addNews = (item) => {
  item.id = Date.now();
  db.news.push(item);
  saveDB();
  return item;
};

export const updateNews = (folder_name, item) => {
  const index = db.news.findIndex(n => n.folder_name === folder_name);
  if (index !== -1) {
    db.news[index] = { ...db.news[index], ...item };
    saveDB();
    return db.news[index];
  }
  return null;
};

export const deleteNews = (folder_name) => {
  db.news = db.news.filter(n => n.folder_name !== folder_name);
  saveDB();
};
