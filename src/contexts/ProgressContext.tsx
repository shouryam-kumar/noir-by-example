'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserProgress, ChallengeProgress } from '@/types/progress';

interface ProgressContextType {
  progress: UserProgress | null;
  updateProgress: (challengeId: string, completed: boolean) => void;
  isLoading: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      // In a real app, you would fetch the user's progress from your database
      // For now, we'll initialize with empty progress
      setProgress({
        userId: session.user.id,
        challenges: [],
        totalCompleted: 0,
        lastActive: new Date(),
      });
      setIsLoading(false);
    }
  }, [session]);

  const updateProgress = (challengeId: string, completed: boolean) => {
    if (!progress) return;

    const updatedChallenges = [...progress.challenges];
    const existingChallenge = updatedChallenges.find(
      (challenge) => challenge.challengeId === challengeId
    );

    if (existingChallenge) {
      existingChallenge.completed = completed;
      existingChallenge.completedAt = completed ? new Date() : undefined;
      existingChallenge.attempts += 1;
      existingChallenge.lastAttempt = new Date();
    } else {
      updatedChallenges.push({
        challengeId,
        completed,
        completedAt: completed ? new Date() : undefined,
        attempts: 1,
        lastAttempt: new Date(),
      });
    }

    setProgress({
      ...progress,
      challenges: updatedChallenges,
      totalCompleted: updatedChallenges.filter((c) => c.completed).length,
      lastActive: new Date(),
    });

    // In a real app, you would save the progress to your database here
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, isLoading }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
} 