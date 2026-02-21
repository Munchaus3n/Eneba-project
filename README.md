# Eneba Search App

Live demo: https://eneba-project-2kfy.onrender.com/

## What it is
Web app with game search (React frontend + Node/Express backend + SQLite database).

Required games included:
- FIFA 23
- Red Dead Redemption 2
- Split Fiction

## API
- `GET /list` — returns all games
- `GET /list?search=<gamename>` — fuzzy search by game name

Example:
- `/list?search=fifa`

## Run locally
From the project root:

```bash
npm install
npm run install:all
npm run seed
npm run start