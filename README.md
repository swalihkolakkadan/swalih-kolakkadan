# Swalih Kolakkadan - Portfolio

A modern personal portfolio website built with Vite, React 18, TypeScript, and Tailwind CSS.

## 🚀 Quick start

1.  **Install dependencies**

    ```shell
    npm install
    ```

2.  **Start developing**

    Navigate into your site's directory and start the development server.

    ```shell
    npm run dev
    ```

3.  **Open the site**

    Your site is now running at http://localhost:3000!

    Edit `src/pages/index.tsx` to see your site update in real-time with Hot Module Replacement (HMR)!

4.  **Build for production**

    ```shell
    npm run build
    ```

    The production-ready files will be in the `dist/` directory.

5.  **Preview production build**

    ```shell
    npm run preview
    ```

## 📦 Tech Stack

- **Vite** - Next generation frontend tooling
- **React 18** - UI framework with the latest features
- **TypeScript** - Type safety and better developer experience
- **React Router v6** - Client-side routing
- **Tailwind CSS v3** - Utility-first CSS framework
- **React Helmet Async** - SEO meta tag management
- **FontAwesome** - Icon library

## 📁 Project Structure

```
├── public/              # Static assets (images, fonts)
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components (routes)
│   ├── styles/         # Global CSS styles
│   ├── utils/          # Utility functions and constants
│   ├── App.tsx         # Main app component with routing
│   └── main.tsx        # Application entry point
├── index.html          # HTML entry point
├── vite.config.ts      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🎨 Features

- ⚡️ Lightning-fast development with Vite
- 🎯 Type-safe development with TypeScript
- 🎨 Modern, responsive design with Tailwind CSS
- 🌓 Dark mode support
- 📱 Mobile-friendly interface
- ♿️ Accessible components
- 🚀 Optimized production builds
- 🔄 Fast refresh for instant feedback

## 🚢 Deployment

This project is configured and ready to deploy to **Vercel**.

### Deploy to Vercel ⭐

The easiest and recommended way to deploy this portfolio. See detailed step-by-step instructions: [.agent/workflows/deploy-vercel.md](.agent/workflows/deploy-vercel.md)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/swalihkolakkadan/swalih-kolakkadan)

**Quick 3-Step Setup:**

1. Sign up at [vercel.com](https://vercel.com) with your GitHub account
2. Import your `swalih-kolakkadan` repository
3. Click "Deploy" - Vercel auto-detects Vite configuration!

**What's Included:**

- ✅ `vercel.json` - Pre-configured routing and security headers
- ✅ Automatic deployments on every push to main branch
- ✅ Preview deployments for all pull requests
- ✅ Custom domain support (free)
- ✅ SSL certificate (automatic)

### Build Configuration

Vercel will automatically detect these settings:

- **Framework:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 18.x

### Preview Production Build Locally

Before deploying, you can test the production build:

```bash
npm run build      # Create production build
npm run preview    # Test it locally at http://localhost:4173
```

### Alternative Hosting Options

While optimized for Vercel, this project can also be deployed to:

- **Cloudflare Pages** - Fast CDN with unlimited bandwidth
- **Netlify** - Another excellent platform with similar features
- **GitHub Pages** - Free hosting directly from GitHub
- **Any Static Host** - Upload the `dist/` folder contents

## 📝 License

This is a personal portfolio project.
