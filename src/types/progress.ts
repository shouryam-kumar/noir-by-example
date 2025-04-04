export interface ChallengeProgress {
  challengeId: string;
  completed: boolean;
  completedAt?: Date;
  attempts: number;
  lastAttempt?: Date;
}

export interface UserProgress {
  userId: string;
  challenges: ChallengeProgress[];
  totalCompleted: number;
  lastActive: Date;
} 