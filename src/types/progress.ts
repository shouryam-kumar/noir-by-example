/**
 * Represents the progress for a single challenge
 */
export interface ChallengeProgress {
  /** The unique identifier of the challenge */
  challengeId: string;
  
  /** Whether the challenge has been completed successfully */
  completed: boolean;
  
  /** The timestamp when the challenge was completed */
  completedAt?: Date;
  
  /** The number of attempts made on this challenge */
  attempts: number;
  
  /** The timestamp of the last attempt */
  lastAttempt: Date;
}

/**
 * Represents the overall progress for a user
 */
export interface UserProgress {
  /** The unique identifier of the user */
  userId: string;
  
  /** Array of challenges the user has attempted or completed */
  challenges: ChallengeProgress[];
  
  /** The total number of completed challenges */
  totalCompleted: number;
  
  /** The timestamp of the user's last activity */
  lastActive: Date;
} 