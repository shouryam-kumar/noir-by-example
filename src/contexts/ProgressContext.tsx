'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserProgress, ChallengeProgress } from '../types/progress';

interface ProgressContextType {
  progress: UserProgress | null;
  updateProgress: (challengeId: string, completed: boolean) => void;
  isLoading: boolean;
  isDemoMode: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Check for demo mode on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const demoMode = localStorage.getItem('demoMode') === 'true';
      setIsDemoMode(demoMode);
      
      // If in demo mode, initialize with demo progress
      if (demoMode && !session) {
        const demoProgress = {
          userId: 'demo-user',
          challenges: [],
          totalCompleted: 0,
          lastActive: new Date(),
        };
        setProgress(demoProgress);
        setIsLoading(false);
      }
    }
  }, [session]);

  // Initialize user progress when session is available
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

      // If we have a real user, turn off demo mode
      if (typeof window !== 'undefined') {
        localStorage.removeItem('demoMode');
        setIsDemoMode(false);
      }
    }
  }, [session]);

  const updateProgress = (challengeId: string, completed: boolean) => {
    if (!progress) return;

    // If in demo mode, just store progress in memory (not persisted)
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
    // Only if not in demo mode
    if (!isDemoMode && session?.user?.id) {
      // API call to save progress would go here
      console.log('Saving progress for user:', session.user.id);
    }
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, isLoading, isDemoMode }}>
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