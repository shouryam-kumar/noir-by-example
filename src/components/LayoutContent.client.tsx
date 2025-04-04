'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { ThemeProvider, useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { ProgressProvider } from '../contexts/ProgressContext';
import Background3D from './Background3D.client';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../app/layout.module.css';

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={styles.themeToggle}
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className={styles.nav}>
      <div className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <Link href="/" className={styles.logo}>
            <span>Noir</span>
            <span className={styles.logoAccent}>ByExample</span>
          </Link>
          <div className={styles.navLinks}>
            <Link href="/challenges" className={styles.navLink}>
              Challenges
            </Link>
            <Link href="/learn" className={styles.navLink}>
              Learn
            </Link>
            <Link href="/docs" className={styles.navLink}>
              Docs
            </Link>
          </div>
        </div>
        <div className={styles.navbarRight}>
          <ThemeToggle />
          {session ? (
            <div className={styles.userSection}>
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User avatar'}
                  width={32}
                  height={32}
                  className={styles.userAvatar}
                  priority
                />
              )}
              <span className={styles.userName}>
                {session.user?.name || 'User'}
              </span>
            </div>
          ) : (
            <Link href="/auth/signin" className={styles.signInButton}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <ProgressProvider>
          <Background3D />
          <Navbar />
          <main className={styles.main}>{children}</main>
        </ProgressProvider>
      </SessionProvider>
    </ThemeProvider>
  );
} 