# Eneba-style game search

React + Vite frontend and Express + SQLite backend with fuzzy search (Fuse.js). Matches an Eneba-like search results layout (purple theme, top bar, card grid).

## Run locally

**Prerequisites:** Node.js 18+

**Terminal 1 – API and DB:**

```bash
cd server
npm install
npm run seed
npm start
```

API runs at `http://localhost:3000`. Seed creates SQLite DB and 3 games (FIFA 23, Red Dead Redemption 2, Split Fiction).

**Terminal 2 – Frontend:**

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`. Search is proxied to the API; game images are served from the server at `/images`.

## Deploy

- **Backend:** Deploy `server/` to Render, Railway, or Fly.io (Node, `npm install && npm run seed && npm start`). Set `PORT` if required. Use a persistent disk or external DB if you need the seed data to persist.
- **Frontend:** Build with `cd client && npm run build`. Serve the `client/dist` folder (e.g. Vercel, Netlify, or same host as API). Set API base URL via env (e.g. `VITE_API_URL`) and use it for `fetch` and image `src` if the API is on another origin.
- **Simple option:** Run both on one host (e.g. Render): serve `client/dist` with Express and run API routes and `/images` from the same server.

## API

- `GET /list` – all games.
- `GET /list?search=<query>` – fuzzy search by game title (Fuse.js).

Response: `{ count: number, items: Game[] }`. Game: `id`, `title`, `platform`, `region`, `price_eur`, `old_price_eur`, `discount_percent`, `cashback_eur`, `likes`, `image_url`.
