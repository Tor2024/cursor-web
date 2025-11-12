import { promises as fs } from 'node:fs';
import { join } from 'node:path';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

export async function POST(req) {
  const form = await req.formData();
  const file = form.get('file');
  if (!file) {
    return new Response(JSON.stringify({ error: "No file" }), { status: 400 });
  }
  // генерируем уникальное имя файла
  const ext = file.name.split('.').pop();
  const fileName = `img_${Date.now()}_${Math.floor(Math.random()*10000)}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(join(UPLOAD_DIR, fileName), new Uint8Array(arrayBuffer));

  // отдаём URL (относительно сайта)
  return new Response(JSON.stringify({
    url: `/uploads/${fileName}`
  }), { status: 200 });
}
