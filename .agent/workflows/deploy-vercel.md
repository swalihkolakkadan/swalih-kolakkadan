---
description: Deploy to Vercel
---

# Deploy Your Portfolio to Vercel

## Prerequisites

- Git repository (GitHub, GitLab, or Bitbucket)
- Code pushed to your repository

## Steps

### 1. Initial Setup

1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Sign up using your GitHub account
3. Authorize Vercel to access your repositories

### 2. Import Your Project

1. Click **"Add New Project"** from your Vercel dashboard
2. Select **"Import Git Repository"**
3. Find and select your `swalih-kolakkadan` repository
4. Click **"Import"**

### 3. Configure Build Settings

Vercel will auto-detect Vite, but verify these settings:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

These should be auto-filled. Click **"Deploy"** if everything looks good.

### 4. Deploy

1. Click the **"Deploy"** button
2. Wait 1-2 minutes for the build to complete
3. You'll get a live URL like: `https://swalih-kolakkadan.vercel.app`

### 5. Custom Domain (Optional)

1. Go to your project settings
2. Navigate to **"Domains"**
3. Add your custom domain (e.g., `swalihkolakkadan.com`)
4. Follow the DNS configuration instructions

## Automatic Deployments

Every time you push to your main branch:

- Vercel automatically rebuilds and redeploys
- You get a preview URL for every pull request
- No manual work needed!

## Environment Variables (If Needed)

If your app needs environment variables:

1. Go to **Project Settings** → **Environment Variables**
2. Add variables for Production, Preview, and Development
3. Prefix browser-accessible variables with `VITE_`

## Useful Commands

Preview your production build locally before deploying:

```bash
npm run build
npm run preview
```

## Troubleshooting

If the build fails:

1. Check the build logs in Vercel dashboard
2. Ensure `npm run build` works locally
3. Check for TypeScript errors: `npm run typecheck`

---

**That's it!** Your portfolio will be live at `https://your-project.vercel.app` 🎉
