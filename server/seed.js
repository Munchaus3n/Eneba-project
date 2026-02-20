import { run } from "./db.js";

async function seed() {
  await run(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      platform TEXT NOT NULL,
      region TEXT NOT NULL,
      price_eur REAL NOT NULL,
      old_price_eur REAL,
      discount_percent INTEGER,
      cashback_eur REAL,
      likes INTEGER DEFAULT 0,
      image_url TEXT NOT NULL
    );
  `);

  await run(`DELETE FROM games;`);

  const rows = [
    {
      title: "FIFA 23",
      platform: "EA App",
      region: "GLOBAL",
      price_eur: 40.93,
      old_price_eur: 49.99,
      discount_percent: 18,
      cashback_eur: 4.5,
      likes: 626,
      image_url: "/images/fifa23.jpg"
    },
    {
      title: "Red Dead Redemption 2",
      platform: "Steam",
      region: "EUROPE",
      price_eur: 19.99,
      old_price_eur: 59.99,
      discount_percent: 67,
      cashback_eur: 1.5,
      likes: 1039,
      image_url: "/images/rdr2.jpg"
    },
    {
      title: "Split Fiction",
      platform: "Xbox Live",
      region: "GLOBAL",
      price_eur: 35.15,
      old_price_eur: 49.99,
      discount_percent: 30,
      cashback_eur: 3.87,
      likes: 1039,
      image_url: "/images/split-fiction.jpg"
    }
  ];

  for (const g of rows) {
    await run(
      `INSERT INTO games (title, platform, region, price_eur, old_price_eur, discount_percent, cashback_eur, likes, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        g.title,
        g.platform,
        g.region,
        g.price_eur,
        g.old_price_eur,
        g.discount_percent,
        g.cashback_eur,
        g.likes,
        g.image_url
      ]
    );
  }

  console.log("Seeded:", rows.length);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});