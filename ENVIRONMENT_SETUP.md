# Environment Variables Setup for Supabase

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

### 1. NextAuth.js Configuration
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-generate-a-random-string
```

### 2. Supabase PostgreSQL Database
```env
# Format: postgresql://username:password@host:port/database_name
DATABASE_URL=postgresql://postgres:your-password@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
```

### 3. Optional: Supabase Client Configuration
```env
# Get these from Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 4. Optional: Email Provider (for email verification)
```env
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
```

### 5. Optional: OAuth Providers
```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## How to Get Supabase Credentials

### Database URL:
1. Go to Supabase Dashboard
2. Select your project
3. Go to Settings → Database
4. Copy the connection string and replace `[YOUR-PASSWORD]` with your actual password

### Supabase API Keys:
1. Go to Settings → API
2. Copy the Project URL and anon/public key
3. For service role key, use it only in server-side code (never expose to client)

## Security Notes:
- Never commit `.env.local` to version control
- Use strong, random strings for `NEXTAUTH_SECRET`
- The service role key has admin privileges - keep it secure
- Use environment-specific URLs for production
