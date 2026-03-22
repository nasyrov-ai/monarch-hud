import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path');

  if (!filePath) {
    // List default files
    const workspace = process.env.OPENCLAW_WORKSPACE || path.join(process.env.HOME || '', '.openclaw/workspace-am-gemini-3-pro-high-thinking');
    const files = ['AGENTS.md', 'MEMORY.md'];
    const result = files.map(name => ({
      name,
      path: path.join(workspace, name),
    }));
    return NextResponse.json(result);
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
