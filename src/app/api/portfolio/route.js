// Legacy route - redirects to universal route
// This file is kept for backward compatibility
import { getItems, addItem, updateItem, deleteItem } from '../../../utils/fileStorage.js';

export async function GET() {
  try {
    const portfolio = await getItems('portfolio');
    return new Response(
      JSON.stringify({
        data: portfolio.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch portfolio' }),
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
    await addItem('portfolio', item);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error adding portfolio item:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to add portfolio item' }),
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
    await updateItem('portfolio', item.folder_name, item);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update portfolio item' }),
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
    await deleteItem('portfolio', folder_name);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete portfolio item' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
