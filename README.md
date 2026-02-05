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

This project can be deployed to any static hosting service:

- **Netlify**: Connect your repo and set build command to `npm run build` with publish directory `dist`
- **Vercel**: Import project and it will auto-detect Vite
- **GitHub Pages**: Use `gh-pages` package with `dist` directory
- **Any CDN/Static Host**: Upload the contents of the `dist` folder

## 📝 License

This is a personal portfolio project.
