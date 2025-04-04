'use client';

import { use, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ChallengeContent from './ChallengeContent.client';
import styles from './page.module.css';

export default function ChallengePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = use(params);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      // If coming from the "Enter Demo Mode" button
      const fromDemo = localStorage.getItem('demoMode') === 'true';
      
      if (fromDemo) {
        setIsDemoMode(true);
      } else {
        router.push('/auth/signin');
      }
    }
  }, [status, router]);
  
  // When user clicks "Enter Demo Mode" on signin page
  useEffect(() => {
    // Check if this is a direct navigation to challenges from the demo button
    const path = window.location.pathname;
    if (path.includes('/challenges') && !session && status === 'unauthenticated') {
      localStorage.setItem('demoMode', 'true');
      setIsDemoMode(true);
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
      <ChallengeContent id={id} demoMode={isDemoMode} />
    </div>
  );
} 