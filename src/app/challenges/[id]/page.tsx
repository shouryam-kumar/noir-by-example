'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { challenges } from '../../../data/challenges';
import styles from './page.module.css';
import ChallengeContent from '../../../components/Challenge';
import { useProgress } from '../../../contexts/ProgressContext';

export default function ChallengePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const challenge = challenges.find(c => c.id === id);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const { isCompleted, updateProgress, isDemoMode: progressIsDemoMode } = useProgress();
  const completed = isCompleted(id);

  useEffect(() => {
    // Check if the user has enabled demo mode in localStorage
    const demoMode = localStorage.getItem('demoMode') === 'true';
    
    if (status === 'unauthenticated' && !demoMode) {
      router.push('/auth/signin');
    } else if (status === 'unauthenticated' && demoMode) {
      setIsDemoMode(true);
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Allow access if authenticated or in demo mode
  if (!session && !isDemoMode && !progressIsDemoMode) {
    return null;
  }

  if (!challenge) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>Challenge Not Found</h1>
          <p>We couldn't find the challenge you're looking for.</p>
          <Link href="/challenges" className={styles.backButton}>
            Return to Challenges
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmissionSuccess = () => {
    // Mark challenge as completed
    updateProgress(id, true);
  };

  return (
    <div className={styles.container}>
      {(isDemoMode || progressIsDemoMode) && (
        <div className={styles.demoBar}>
          <p>You're in Demo Mode. <a href="/auth/signin">Sign in</a> to save your progress.</p>
        </div>
      )}
      
      <div className={styles.header}>
        <Link href="/challenges" className={styles.backButton}>
          ← Back to Challenges
        </Link>
        
        {completed && (
          <div className={styles.completedBadge}>
            <svg className={styles.completedIcon} viewBox="0 0 24 24" width="24" height="24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            Challenge Completed
          </div>
        )}
      </div>

      <h1 className={styles.title}>
        {challenge.title}
        <span className={`${styles.difficulty} ${styles[challenge.difficulty]}`}>
          {challenge.difficulty}
        </span>
      </h1>
      
      <p className={styles.description}>{challenge.description}</p>
      
      <ChallengeContent 
        challenge={challenge} 
        onSuccess={handleSubmissionSuccess}
        isCompleted={completed}
      />
    </div>
  );
} 