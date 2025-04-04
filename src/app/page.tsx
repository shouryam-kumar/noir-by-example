'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Learn Noir by Example</h1>
        <p className={styles.heroSubtitle}>
          Master zero-knowledge programming through interactive challenges
        </p>
        <div className={styles.heroButtons}>
          <Link href="/challenges" className={styles.primaryButton}>
            Start Learning
          </Link>
          <Link href="/learn" className={styles.secondaryButton}>
            Read Documentation
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Learn Noir?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>Zero-Knowledge Proofs</h3>
            <p>Learn to create privacy-preserving applications using ZKPs</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💻</div>
            <h3>Interactive Learning</h3>
            <p>Hands-on challenges to reinforce your understanding</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🚀</div>
            <h3>Real-World Applications</h3>
            <p>Build practical applications with real-world use cases</p>
          </div>
        </div>
      </section>

      <section className={styles.gettingStarted}>
        <h2 className={styles.sectionTitle}>Getting Started</h2>
        <div className={styles.steps}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <h3>Install Noir</h3>
            <p>Set up your development environment with Noir</p>
            <Link href="/docs/installation" className={styles.stepLink}>
              View Installation Guide →
            </Link>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <h3>Complete Challenges</h3>
            <p>Start with basic challenges and progress to advanced topics</p>
            <Link href="/challenges" className={styles.stepLink}>
              View Challenges →
            </Link>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <h3>Build Projects</h3>
            <p>Apply your knowledge to build real-world applications</p>
            <Link href="/projects" className={styles.stepLink}>
              View Projects →
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.community}>
        <h2 className={styles.sectionTitle}>Join the Community</h2>
        <div className={styles.communityGrid}>
          <div className={styles.communityCard}>
            <div className={styles.communityIcon}>💬</div>
            <h3>Discord</h3>
            <p>Join our Discord community to connect with other learners</p>
            <a
              href="https://discord.gg/noir"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.communityLink}
            >
              Join Discord →
            </a>
          </div>
          <div className={styles.communityCard}>
            <div className={styles.communityIcon}>📚</div>
            <h3>Documentation</h3>
            <p>Access comprehensive documentation and guides</p>
            <Link href="/docs" className={styles.communityLink}>
              View Docs →
            </Link>
          </div>
          <div className={styles.communityCard}>
            <div className={styles.communityIcon}>🌟</div>
            <h3>GitHub</h3>
            <p>Contribute to the project and share your solutions</p>
            <a
              href="https://github.com/noir-lang/noir"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.communityLink}
            >
              View GitHub →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 