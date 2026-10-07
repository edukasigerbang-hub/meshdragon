import { NextResponse } from 'next/server';

// In a real application, this would be stored in a database
const generatedScenes = new Map<string, string>();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const html = generatedScenes.get(id);
  
  if (!html) {
    return NextResponse.json({ error: 'Preview not found' }, { status: 404 });
  }

  return NextResponse.json({ html });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { html } = await request.json();
  
  if (!html) {
    return NextResponse.json({ error: 'HTML content is required' }, { status: 400 });
  }

  generatedScenes.set(id, html);
  
  return NextResponse.json({ success: true });
} 