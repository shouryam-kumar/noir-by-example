import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, challengeId } = body;

    // Placeholder for actual Noir verification
    const isValid = code.includes('fn main()');

    return NextResponse.json({ success: isValid });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
  }
} 