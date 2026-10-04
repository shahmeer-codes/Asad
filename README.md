# Asad Aziz - AI Engineer & Full-Stack Developer 3D Portfolio

A high-end, production-ready 3D interactive portfolio built with **Next.js 16**, **React 19**, **Three.js / React Three Fiber**, **Tailwind CSS v4**, **Framer Motion**, **GSAP**, and **Lenis Scroll**.

---

## 🚀 Getting Started

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build & Type Check

Validate that the application compiles without errors:

```bash
# Type check
npx tsc --noEmit

# Production build test
npm run build
```

---

## 🌐 Deploying to Vercel

This project is fully configured for seamless deployment on **Vercel**.

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub, GitLab, or Bitbucket.
2. Go to **[vercel.com/new](https://vercel.com/new)**.
3. Import your repository (`Asad`).
4. Vercel will automatically detect **Next.js** framework settings (`vercel.json`).
5. Click **Deploy**.

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI (if not installed):
   ```bash
   npm i -g vercel
   ```
2. Deploy to preview environment:
   ```bash
   vercel
   ```
3. Deploy to production:
   ```bash
   vercel --prod
   ```

---

## 📦 Project Structure & Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19, Tailwind CSS v4, Lucide Icons
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei, Postprocessing
- **Animations**: GSAP, Framer Motion, Lenis Smooth Scroll
- **API**: Next.js Serverless Contact Route (`/api/contact`)
