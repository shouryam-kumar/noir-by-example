import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/progress
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You must be signed in to view progress' },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    // Get all completed challenges for the user
    const progress = await prisma.userProgress.findMany({
      where: {
        userId,
      },
    });
    
    return NextResponse.json({ 
      progress,
      userId,
      totalCompleted: progress.filter(p => p.completed).length
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

// POST /api/progress
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You must be signed in to update progress' },
        { status: 401 }
      );
    }
    
    const data = await request.json();
    const { challengeId, completed } = data;
    
    if (!challengeId) {
      return NextResponse.json(
        { error: 'Challenge ID is required' },
        { status: 400 }
      );
    }
    
    const userId = session.user.id;
    
    // Update or create progress entry
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_challengeId: {
          userId,
          challengeId,
        },
      },
      update: {
        completed,
      },
      create: {
        userId,
        challengeId,
        completed,
      },
    });
    
    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error('Error updating user progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
} 