# 🎮 Checkpoint

**Checkpoint** is a modern game tracking web app built with React.
Discover titles, organize your library, and track your gaming progress — all in a clean, structured dashboard.

Inspired by the simplicity of Letterboxd, but designed for video games.

---

## 🚧 Status

This project is currently a **Work in Progress (WIP)**.

The current focus is on:

* Frontend architecture
* Scalable component structure
* Clean design system
* Preparing for API and backend integration

---

## ✨ Features (Current)

* Dark-themed dashboard UI
* Featured Game hero section
* Popular Games list
* New Releases list
* Top Rated section with rating badges
* Reusable card components
* Responsive layout foundation
* Design token-based theming system

---

## 🛠 Planned Features

### Phase 1 — API Integration

* Integrate RAWG API
* Dynamic game data
* Game detail pages (`/game/:id`)
* Search functionality
* Loading and error states

### Phase 2 — Local Tracking

* Add to Library
* Track play status (Playing / Completed)
* Start & finish dates
* 1–5 star ratings
* Short text reviews (stored locally)

### Phase 3 — Full Stack

* User authentication
* Database persistence
* Public reviews
* User profiles
* Social features

---

## 🧱 Tech Stack

**Frontend**

* React (Vite)
* React Router
* CSS Custom Properties (Design Tokens)

**Planned Backend**

* Node.js + Express (or similar)
* PostgreSQL / MongoDB
* JWT Authentication

---

## 🎨 Design System

Checkpoint uses a structured dark theme built with CSS variables.

```css
--bg-main: #190019;
--bg-surface: #2b124c;
--bg-panel: #522b5b;
--bg-accent: #854f6c;
--text-primary: #fbe4d8;
--text-secondary: #dfb6b2;
```

### Design Principles

* Layered dark theme
* Clear visual hierarchy
* Minimal and distraction-free layout
* Reusable UI components
* Scalable architecture

---

## 📁 Project Structure

```
src/
│
├── api/              // API utilities (planned)
├── components/       // Reusable UI components
│   ├── common/
│   └── game/
├── pages/            // Route-level components
├── hooks/            // Custom React hooks
├── context/          // Global state
├── utils/            // Helper functions
│
├── App.jsx
└── main.jsx
```

This structure is designed to scale cleanly as the project grows into a full-stack application.

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Run Development Server

```bash
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 🎯 Project Goals

* Build a production-style React application
* Practice scalable frontend architecture
* Integrate external APIs
* Implement authentication and persistence
* Develop a portfolio-ready full-stack project

---

## 📌 Long-Term Vision

Checkpoint aims to become:

* A centralized hub for tracking games across platforms
* A clean alternative to cluttered gaming databases
* A social review ecosystem for gamers
* A polished full-stack portfolio project

---

