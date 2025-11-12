// Legacy route - redirects to universal route
// This file is kept for backward compatibility
import { getItems, addItem, updateItem, deleteItem } from '../../../utils/fileStorage.js';

export async function GET() {
  try {
    const news = await getItems('news');
    return new Response(
      JSON.stringify({
        data: news.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching news:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch news' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req) {
  try {
    const item = await req.json();
    if (!item.folder_name) {
      return new Response(
        JSON.stringify({ error: 'folder_name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    await addItem('news', item);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error adding news item:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to add news item' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT(req) {
  try {
    const item = await req.json();
    if (!item.folder_name) {
      return new Response(
        JSON.stringify({ error: 'folder_name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    await updateItem('news', item.folder_name, item);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating news item:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update news item' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(req) {
  try {
    const { folder_name } = await req.json();
    if (!folder_name) {
      return new Response(
        JSON.stringify({ error: 'folder_name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    await deleteItem('news', folder_name);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting news item:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete news item' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
