import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function GET() {
  try {
    const output = execSync('openclaw cron list --json').toString();
    const data = JSON.parse(output);
    return NextResponse.json(data.jobs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch processes' }, { status: 500 });
  }
}
