'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserProgress, ChallengeProgress } from '../types/progress';

interface ProgressContextType {
  progress: UserProgress | null;
  updateProgress: (challengeId: string, completed: boolean) => void;
  isLoading: boolean;
  isDemoMode: boolean;
  isCompleted: (challengeId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
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
        const storedProgress = localStorage.getItem('demoProgress');
        const demoProgress = storedProgress 
          ? JSON.parse(storedProgress) 
          : {
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

  // Fetch user progress when session is available
  useEffect(() => {
    async function fetchProgress() {
      if (session?.user?.id && !isDemoMode) {
        setIsLoading(true);
        try {
          const response = await fetch('/api/progress');
          
          if (!response.ok) {
            throw new Error('Failed to fetch progress');
          }
          
          const data = await response.json();
          
          // Format the data to match our UserProgress type
          const formattedProgress: UserProgress = {
            userId: data.userId,
            challenges: data.progress.map((p: any) => ({
              challengeId: p.challengeId,
              completed: p.completed,
              completedAt: p.lastAttempt,
              attempts: p.attempts,
              lastAttempt: p.lastAttempt
            })),
            totalCompleted: data.totalCompleted,
            lastActive: new Date(),
          };
          
          setProgress(formattedProgress);
        } catch (error) {
          console.error('Error fetching progress:', error);
          // Initialize with empty progress on error
          setProgress({
            userId: session.user.id,
            challenges: [],
            totalCompleted: 0,
            lastActive: new Date(),
          });
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchProgress();
    
    // If we have a real user, turn off demo mode
    if (session?.user?.id && isDemoMode) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('demoMode');
        localStorage.removeItem('demoProgress');
        setIsDemoMode(false);
      }
    }
  }, [session, isDemoMode]);

  // Function to check if a challenge is completed
  const isCompleted = (challengeId: string): boolean => {
    if (!progress) return false;
    
    const challenge = progress.challenges.find(
      (c) => c.challengeId === challengeId
    );
    
    return !!challenge?.completed;
  };

  const updateProgress = async (challengeId: string, completed: boolean) => {
    if (!progress) return;

    // Create updated progress data
    const updatedChallenges = [...progress.challenges];
    const existingChallenge = updatedChallenges.find(
      (challenge) => challenge.challengeId === challengeId
    );

    const now = new Date();

    if (existingChallenge) {
      existingChallenge.completed = completed;
      existingChallenge.completedAt = completed ? now : undefined;
      existingChallenge.attempts += 1;
      existingChallenge.lastAttempt = now;
    } else {
      updatedChallenges.push({
        challengeId,
        completed,
        completedAt: completed ? now : undefined,
        attempts: 1,
        lastAttempt: now,
      });
    }

    const updatedProgress = {
      ...progress,
      challenges: updatedChallenges,
      totalCompleted: updatedChallenges.filter((c) => c.completed).length,
      lastActive: now,
    };

    // Update local state
    setProgress(updatedProgress);

    // In demo mode, save to localStorage
    if (isDemoMode) {
      localStorage.setItem('demoProgress', JSON.stringify(updatedProgress));
      return;
    }

    // For authenticated users, save to the database
    if (session?.user?.id) {
      try {
        const response = await fetch('/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            challengeId,
            completed,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update progress');
        }
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, isLoading, isDemoMode, isCompleted }}>
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