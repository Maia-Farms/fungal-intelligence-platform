# Fungal Intelligence Platform

A modern web application bootstrapped with **React (Vite)**, **TypeScript**, **Tailwind CSS**, and **React Router**.

## Table of Contents

- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
- [Routing](#routing)
- [Using Tailwind](#using-tailwind)
- [Development Tips](#development-tips)
- [Available Scripts](#available-scripts)
- [Directory Structure](#directory-structure)
- [Resources](#resources)
- [License](#license)

## Getting Started

1. **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/fungal-intelligence-platform.git
    cd fungal-intelligence-platform
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Start the Development Server**
    ```bash
    npm run dev
    ```
    The app runs at: [http://localhost:5173/](http://localhost:5173/)

## Tech Stack

- **React 19**
- **TypeScript** (strictly typed)
- **Vite** (fast dev/build)
- **Tailwind CSS** (utility-first styling)
- **React Router v6+** (SPA navigation)

## Project Setup

### 1. Initialize Vite + React + TypeScript
Project created with:
```bash
npm create vite@latest . -- --template react-ts
```

### 2. Tailwind CSS Integration
Installed dependencies:
```bash
npm install tailwindcss @tailwindcss/vite
```
Tailwind is set up in the main CSS file:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. React Router Setup
Installed:
```bash
npm install react-router-dom
```
Routing managed with ``, ``, and `` in your main components.

## Routing

This project uses [React Router v6+](https://reactrouter.com) for single-page app navigation.

Define routes in `App.tsx`:

```tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    
      } />
      } />
    
  );
}

export default App;
```

For navigation (e.g., in a navbar):

```tsx
import { Link } from "react-router-dom";

Home
About
```

## Using Tailwind

All styling uses Tailwind utility classes, for example:

```tsx

  Hello World!

```
Customize styles in `src/index.css` using Tailwind’s layers.

## Development Tips

- Keep React components in `src/components` and route pages in `src/pages`.
- Use TypeScript interfaces/types for props and state.
- Utilize Tailwind classes for rapid styling.
- Organize routes and navigation links in a central `Navbar` or `Layout` component.

## Available Scripts

- `npm run dev` – Start the development server (hot reload)
- `npm run build` – Production build
- `npm run preview` – Preview the built app locally
- `npm run lint` – Lint your code (optional)

## Directory Structure

```
.
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── About.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js (if present)
├── package.json
└── README.md
```

## Resources

- [Vite Documentation](https://vite.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License

[Your preferred license here]

This README is designed to evolve as your project grows.  
Feel free to expand sections as you add features and libraries!