'use client';

import { useState, useEffect } from 'react';
import { signIn, getProviders } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

export default function SignIn() {
  const [providers, setProviders] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  
  useEffect(() => {
    const loadProviders = async () => {
      const configuredProviders = await getProviders();
      setProviders(configuredProviders || {});
      setLoading(false);
    };
    
    loadProviders();
  }, []);
  
  const handleSignIn = (providerId: string) => {
    signIn(providerId, { callbackUrl: '/' });
  };
  
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading authentication options...</p>
        </div>
      </div>
    );
  }
  
  const hasProviders = providers && Object.keys(providers).length > 0;
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Sign In</h1>
        <p className={styles.description}>
          Sign in to track your progress and save your solutions.
        </p>
        
        {error && (
          <div className={styles.errorMessage}>
            {error === 'OAuthSignin' 
              ? 'Error starting sign in process. Please try again.' 
              : 'An error occurred during sign in. Please try again.'}
          </div>
        )}
        
        {!hasProviders && (
          <div className={styles.configWarning}>
            <h2>Authentication Not Configured</h2>
            <p>No authentication providers have been configured.</p>
            <div className={styles.devNote}>
              <p><strong>Developer Note:</strong></p>
              <p>To enable authentication, add your OAuth credentials to the <code>.env.local</code> file:</p>
              <pre>
{`GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret`}
              </pre>
            </div>
          </div>
        )}
        
        <div className={styles.providers}>
          {providers?.github && (
            <button
              className={styles.providerButton}
              onClick={() => handleSignIn('github')}
            >
              <svg className={styles.githubIcon} viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Sign in with GitHub
            </button>
          )}
          
          {providers?.google && (
            <button
              className={styles.providerButton}
              onClick={() => handleSignIn('google')}
            >
              <svg className={styles.googleIcon} viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              Sign in with Google
            </button>
          )}
          
          <button 
            className={`${styles.providerButton} ${styles.demoButton}`}
            onClick={() => window.location.href = '/challenges'}
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
} 