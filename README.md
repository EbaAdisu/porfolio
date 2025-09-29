# Modern, Dynamic Personal Portfolio Website

This repository contains a fully-featured personal portfolio website built with a modern tech stack. It includes dynamic content management for projects and experiences, interactive animations, a game section, and a hidden admin dashboard for content management.

## Features

- **Dynamic Portfolio Section**: A grid of project cards with images, descriptions, and links, all managed via a JSON file.
- **Experiences & Education Timeline**: Chronological display of work and education history with scroll-triggered animations.
- **Games Tab**: A dedicated page featuring a playable "Snake" game built with HTML5 Canvas.
- **Hidden Admin Dashboard**: A secure area at `/admin/dashboard` for managing portfolio content (projects, experiences, etc.).
- **Token-Based Authentication**: The admin page is protected by a secret token stored in an environment variable.
- **Theme Switcher**: A UI toggle to switch between light and dark modes.
-**Modern Animations**: Smooth, interactive animations using GSAP for hover effects and scroll-triggered reveals.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui
- **Animations**: GSAP (GreenSock Animation Platform)
- **Data Management**: JSON files (`/src/data`)
- **Authentication**: Next.js Middleware with token-based logic
- **UI Notifications**: Sonner (for toast-style notifications)

## Project Structure

- `src/app/`: Main application routes, including the homepage, games page, and admin pages.
- `src/components/`: Reusable React components (Navbar, Footer, ProjectCard, etc.).
- `src/data/`: JSON files for managing dynamic content (projects, experience, education).
- `src/lib/`: Utility functions, including the `cn` helper from `shadcn/ui`.
- `docs/`: Markdown files detailing the progress and implementation of each development phase.

## Progress Tracking & Documentation

This project was developed in phases. Each phase is documented in detail in the `/docs` folder.

- **[Phase 1: Setup](./docs/phase-1.md)**: Project initialization, Tailwind & shadcn/ui setup, layout, and theme switcher.
- **[Phase 2: Core Portfolio](./docs/phase-2.md)**: Building the dynamic portfolio section.
- **[Phase 3: Experiences & Education](./docs/phase-3.md)**: Creating the timeline for work and education history.
- **[Phase 4: Games Tab](./docs/phase-4.md)**: Implementing the playable Snake game.
- **[Phase 5: Admin Page](./docs/phase-5.md)**: Building the hidden, authenticated admin dashboard with CRUD functionality.

## Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your secret admin token:
    ```
    ADMIN_TOKEN=your-super-secret-token
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. The admin login can be accessed at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).