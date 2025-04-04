'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { challenges } from '../../data/challenges';
import styles from './page.module.css';

export default function ChallengesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  return (
    <div className={styles.container}>
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