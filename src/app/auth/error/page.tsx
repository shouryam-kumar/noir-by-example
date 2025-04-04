'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  // Custom error messages for specific errors
  const errorMessages: Record<string, string> = {
    'AccessDenied': 'You do not have permission to sign in',
    'Configuration': 'There is a problem with the server configuration',
    'Verification': 'The verification link may have been expired or already used',
    'Default': 'An authentication error occurred. Please try again later',
    'OAuthSignin': 'Error in the OAuth signin process',
    'OAuthCallback': 'Error in the OAuth callback process',
    'OAuthCreateAccount': 'Could not create OAuth provider account',
    'OAuthAccountNotLinked': 'This account is already linked to another user',
    'EmailCreateAccount': 'Could not create email provider account',
    'Callback': 'Error in the OAuth callback',
    'EmailSignin': 'Check your email address',
    'CredentialsSignin': 'The credentials you provided are invalid',
    'SessionRequired': 'You need to be signed in to access this page',
  };

  const errorMessage = error && errorMessages[error] 
    ? errorMessages[error] 
    : errorMessages.Default;

  // For demo and development environments: additional guidance about missing OAuth credentials
  const isOAuthError = error === 'OAuthSignin' || error === 'Configuration';
  const envHelp = isOAuthError && process.env.NODE_ENV !== 'production';

  return (
    <div className={styles.container}>
      <div className={styles.errorCard}>
        <h1 className={styles.errorTitle}>Authentication Error</h1>
        
        <div className={styles.errorMessage}>
          <p>{errorMessage}</p>
          {error && <p className={styles.errorCode}>Error code: {error}</p>}
        </div>

        {envHelp && (
          <div className={styles.developerInfo}>
            <h2>Developer Information</h2>
            <p>This error might be caused by missing OAuth credentials in your environment.</p>
            <ol>
              <li>Create a <code>.env.local</code> file in your project root</li>
              <li>Add your OAuth provider credentials (GitHub, Google, etc.)</li>
              <li>Make sure to include <code>NEXTAUTH_URL</code> and <code>NEXTAUTH_SECRET</code></li>
              <li>Restart your development server</li>
            </ol>
          </div>
        )}

        <div className={styles.actions}>
          <Link href="/auth/signin" className={styles.primaryButton}>
            Try Again
          </Link>
          <Link href="/" className={styles.secondaryButton}>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 