# Checkpoint

Checkpoint is a full-stack game tracking app for discovering, organizing, and reviewing games in one place. Built with React on the frontend and Express + MongoDB on the backend, it helps users browse games from RAWG, save titles to a personal library, and track status, dates, ratings, and progress.

## Overview

The app combines a modern gaming discovery experience with personal library management. Users can:

- Browse popular and newly released games
- Search for games by title
- View detailed game pages with metadata from RAWG
- Register and log in to a personal account
- Save games to a library with statuses such as wishlist, backlog, playing, completed, and dropped
- Track completion dates, start dates, ratings, and notes
- Monitor dashboard stats such as total games and completion rate

## Features

### Frontend

- Responsive dark-themed UI
- Game discovery pages for popular games and new releases
- Search results and detail pages
- Auth screens for login and registration
- User dashboard with library summaries and categorized game sections
- Toast notifications and loading states

### Backend

- JWT-based authentication
- User registration and login flow
- Protected library API routes
- Game library CRUD operations
- MongoDB persistence via Mongoose
- Library stats endpoint for dashboard summaries

### Library Tracking

Each saved game can include:

- Game ID and cover image
- Status: wishlist, backlog, playing, completed, dropped
- Started/completed dates
- Personal rating
- Review text
- Timestamp metadata

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Lucide React

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs

### APIs

- RAWG Video Games Database API

## Project Structure

```text
video-game-tracker/
├── client/                 # React frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── README.md
└── .gitignore
```

## Environment Variables

Create a `.env` file inside the `server/` folder with:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/video-game-tracker
JWT_SECRET=your_super_secret_key
```

Create a `.env` file inside the `client/` folder with:

```env
VITE_RAWG_API_KEY=your_rawg_api_key
```

You can get a RAWG API key from the official RAWG website.

## Getting Started

### 1. Install frontend dependencies

```bash
cd client
npm install
```

### 2. Install backend dependencies

```bash
cd ../server
npm install
```

### 3. Start the backend

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

### 4. Start the frontend

```bash
cd ../client
npm run dev
```

The app will run on:

```text
http://localhost:5173
```

## API Overview

### Authentication

- `POST /api/auth/register` — create a new user
- `POST /api/auth/login` — log in and receive a JWT

### Library

- `GET /api/library` — fetch the authenticated user's games
- `GET /api/library/stats` — fetch library statistics
- `POST /api/library` — add a game to the library
- `PUT /api/library/:id` — update a tracked game
- `DELETE /api/library/:id` — remove a game from the library

## Usage Notes

- Users must sign in before accessing private library routes.
- The app uses the RAWG API for discovery and game metadata.
- Library data is stored in MongoDB, allowing persistent game tracking across sessions.

## Current Status

This project is an active full-stack MVP focused on:

- game discovery
- user authentication
- personal library tracking
- dashboard analytics

## Roadmap

Planned improvements include:

- richer review and profile features
- better filtering and sorting in the dashboard
- improved game detail interactions
- social/community features
- polish and optimization across the app

## License

This project is currently unlicensed unless otherwise specified.

## Contributing

Contributions are welcome. If you'd like to improve the app, feel free to fork the repository and open a pull request with your changes.

