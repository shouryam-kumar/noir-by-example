'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { challenges } from '../../data/challenges';
import styles from './page.module.css';

export default function ChallengesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Check if the user has enabled demo mode
    const demoMode = localStorage.getItem('demoMode') === 'true';
    
    if (status === 'unauthenticated' && !demoMode) {
      router.push('/auth/signin');
    } else if (status === 'unauthenticated' && demoMode) {
      setIsDemoMode(true);
    }
  }, [status, router]);
  
  // When user navigates directly to the challenges page
  useEffect(() => {
    // Check if this is a direct navigation from the demo button
    if (!session && status === 'unauthenticated') {
      const fromDemo = window.location.pathname === '/challenges' && 
        document.referrer.includes('/auth/signin');
      
      if (fromDemo) {
        localStorage.setItem('demoMode', 'true');
        setIsDemoMode(true);
      }
    }
  }, [session, status]);

  if (status === 'loading') {
    return <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p>Loading...</p>
    </div>;
  }

  // Allow access if authenticated or in demo mode
  if (!session && !isDemoMode) {
    return null;
  }

  return (
    <div className={styles.container}>
      {isDemoMode && (
        <div className={styles.demoBar}>
          <p>You're in Demo Mode. <a href="/auth/signin">Sign in</a> to save your progress.</p>
        </div>
      )}
      <h1 className={styles.title}>Challenges</h1>
      <div className={styles.challengesGrid}>
        {challenges.map((challenge) => (
          <Link
            key={challenge.id}
            href={`/challenges/${challenge.id}`}
            className={styles.challengeCard}
          >
            <div className={styles.challengeHeader}>
              <h2 className={styles.challengeTitle}>{challenge.title}</h2>
              <span className={`${styles.difficulty} ${styles[challenge.difficulty]}`}>
                {challenge.difficulty}
              </span>
            </div>
            <p className={styles.challengeDescription}>{challenge.description}</p>
            <div className={styles.concepts}>
              <h3>Concepts Covered:</h3>
              <div className={styles.conceptsList}>
                {challenge.concepts.map((concept, index) => (
                  <span key={index} className={styles.concept}>
                    {concept.title}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 