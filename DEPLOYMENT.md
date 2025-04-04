# Deploying Noir by Example

This guide will help you deploy the Noir by Example application to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [GitHub account](https://github.com/signup) (for OAuth)
3. A PostgreSQL database (options below)

## Step 1: Set Up Your Database

You'll need a PostgreSQL database for your application. Here are some options:

### Option A: Neon (Recommended)
1. Sign up for a free account at [Neon](https://neon.tech/)
2. Create a new project
3. Get your database connection string from the dashboard
4. Make sure the connection string follows this format: `postgresql://username:password@hostname:port/database`

### Option B: Supabase
1. Sign up for a free account at [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Settings > Database to find your connection string
4. Enable "Realtime" features for your project

### Option C: Railway
1. Sign up for an account at [Railway](https://railway.app/)
2. Start a new PostgreSQL project
3. Get your connection string from the Connect tab

## Step 2: Set Up OAuth Providers

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: "Noir by Example"
   - Homepage URL: `https://your-vercel-domain.vercel.app`
   - Authorization callback URL: `https://your-vercel-domain.vercel.app/api/auth/callback/github`
4. Register the application to get your Client ID and Client Secret

### Google OAuth (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google+ API
4. Go to Credentials > Create Credentials > OAuth Client ID
5. Configure the consent screen
6. Create a Web Application OAuth client
7. Add authorized redirect URI: `https://your-vercel-domain.vercel.app/api/auth/callback/google`
8. Get your Client ID and Client Secret

## Step 3: Deploy to Vercel

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com/new) and import your repository
3. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

4. Add the following environment variables:
   - `NEXTAUTH_URL`: `https://your-vercel-domain.vercel.app`
   - `NEXTAUTH_SECRET`: Generate a random string (e.g., `openssl rand -base64 32`)
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `GITHUB_ID`: Your GitHub OAuth Client ID
   - `GITHUB_SECRET`: Your GitHub OAuth Client Secret
   - `GOOGLE_ID`: Your Google OAuth Client ID (if using Google)
   - `GOOGLE_SECRET`: Your Google OAuth Client Secret (if using Google)

5. Click "Deploy"

## Step 4: Run Database Migrations

After deployment, you need to run Prisma migrations on your database:

### Option 1: Run migrations from Vercel dashboard
1. Go to your project in Vercel dashboard
2. Go to Settings > Functions > Console
3. Run the following command:
   ```bash
   npx prisma migrate deploy
   ```

### Option 2: Run migrations locally
1. Make sure your `.env` file has the production `DATABASE_URL`
2. Run:
   ```bash
   npx prisma migrate deploy
   ```

## Step 5: Test Your Deployment

1. Visit your deployed application at `https://your-vercel-domain.vercel.app`
2. Verify that:
   - Sign-in with GitHub works
   - You can view and complete challenges
   - Progress is saved when authenticated

## Troubleshooting

### Database Connection Issues
- Check that your `DATABASE_URL` is correct
- Make sure your database is accessible from Vercel (may need to configure network access)
- Verify that Prisma migrations have been applied

### Authentication Issues
- Ensure OAuth callback URLs match your deployed domain
- Check that `NEXTAUTH_URL` matches your deployed domain
- Verify that `NEXTAUTH_SECRET` is set

### Deployment Issues
- Check Vercel build logs for errors
- Make sure all required environment variables are set
- If needed, run `vercel --prod` from your local machine to debug 