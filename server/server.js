import express from "express";
import Fuse from "fuse.js";
import { all } from "./db.js";

const app = express();
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "public", "images")));
app.use(express.json());
const clientDist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDist));

app.get("/list", async (req, res) => {
  try {
    const search = (req.query.search ?? "").toString().trim();
    const games = await all(`SELECT * FROM games ORDER BY id DESC;`);

    if (!search) {
      return res.json({ count: games.length, items: games });
    }

    const fuse = new Fuse(games, {
      keys: ["title"],
      threshold: 0.35,
      ignoreLocation: true
    });

    const results = fuse.search(search).slice(0, 20).map(r => r.item);
    return res.json({ count: results.length, items: results });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));