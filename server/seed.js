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
    // ── FIFA 23 ──────────────────────────────────────────────
    {
      title: "FIFA 23",
      platform: "EA App",
      region: "EUROPE",
      price_eur: 40.93,
      old_price_eur: 49.99,
      discount_percent: 18,
      cashback_eur: 4.5,
      likes: 626,
      image_url: "/images/fifa23.jpg"
    },
    {
      title: "FIFA 23 Xbox Live Key GLOBAL",
      platform: "Xbox Live",
      region: "GLOBAL",
      price_eur: 38.49,
      old_price_eur: 49.99,
      discount_percent: 23,
      cashback_eur: 4.23,
      likes: 381,
      image_url: "/images/fifa23.jpg"
    },

    // ── Red Dead Redemption 2 ─────────────────────────────────
    {
      title: "Red Dead Redemption 2 Steam Key EUROPE",
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
      title: "Red Dead Redemption 2 Steam Key GLOBAL",
      platform: "Steam",
      region: "GLOBAL",
      price_eur: 21.49,
      old_price_eur: 59.99,
      discount_percent: 64,
      cashback_eur: 1.61,
      likes: 874,
      image_url: "/images/rdr2.jpg"
    },
    {
      title: "Red Dead Redemption 2 Xbox Live Key EUROPE",
      platform: "Xbox Live",
      region: "EUROPE",
      price_eur: 17.89,
      old_price_eur: 59.99,
      discount_percent: 70,
      cashback_eur: 1.34,
      likes: 612,
      image_url: "/images/rdr2.jpg"
    },
    {
      title: "Red Dead Redemption 2 Xbox Live Key GLOBAL",
      platform: "Xbox Live",
      region: "GLOBAL",
      price_eur: 18.99,
      old_price_eur: 59.99,
      discount_percent: 68,
      cashback_eur: 1.42,
      likes: 503,
      image_url: "/images/rdr2.jpg"
    },
    {
      title: "Red Dead Redemption 2 PS5 Key EUROPE",
      platform: "PSN",
      region: "EUROPE",
      price_eur: 23.99,
      old_price_eur: 59.99,
      discount_percent: 60,
      cashback_eur: 1.8,
      likes: 298,
      image_url: "/images/rdr2.jpg"
    },
    {
      title: "Red Dead Redemption 2 PS5 Key GLOBAL",
      platform: "PSN",
      region: "GLOBAL",
      price_eur: 25.49,
      old_price_eur: 59.99,
      discount_percent: 58,
      cashback_eur: 1.91,
      likes: 187,
      image_url: "/images/rdr2.jpg"
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
      title: "Red Dead Redemption 2",
      platform: "Steam",
      region: "GLOBAL",
      price_eur: 19.99,
      old_price_eur: 59.99,
      discount_percent: 67,
      cashback_eur: 1.5,
      likes: 1039,
      image_url: "/images/rdr2.jpg"
    },

    // ── Split Fiction ───────
    {
      title: "Split Fiction EA App Key (PC) GLOBAL",
      platform: "EA App",
      region: "GLOBAL",
      price_eur: 40.93,
      old_price_eur: 49.99,
      discount_percent: 18,
      cashback_eur: 4.5,
      likes: 626,
      image_url: "/images/split-fiction.jpg"
    },
    {
      title: "Split Fiction (Xbox Series X|S) XBOX LIVE Key EUROPE",
      platform: "Xbox Live",
      region: "EUROPE",
      price_eur: 34.14,
      old_price_eur: 49.99,
      discount_percent: 32,
      cashback_eur: 3.76,
      likes: 500,
      image_url: "/images/split-fiction.jpg"
    },
    {
      title: "Split Fiction (Xbox Series X|S) XBOX LIVE Key GLOBAL",
      platform: "Xbox Live",
      region: "GLOBAL",
      price_eur: 35.15,
      old_price_eur: 49.99,
      discount_percent: 30,
      cashback_eur: 3.87,
      likes: 1039,
      image_url: "/images/split-fiction.jpg"
    },
    {
      title: "Split Fiction Nintendo Switch 2 eShop Key EUROPE",
      platform: "Nintendo",
      region: "EUROPE",
      price_eur: 36.25,
      old_price_eur: 49.99,
      discount_percent: 27,
      cashback_eur: 3.99,
      likes: 288,
      image_url: "/images/split-fiction.jpg"
    },
    {
      title: "Split Fiction PS5 Key EUROPE",
      platform: "PS5",
      region: "EUROPE",
      price_eur: 37.49,
      old_price_eur: 49.99,
      discount_percent: 25,
      cashback_eur: 4.12,
      likes: 412,
      image_url: "/images/split-fiction.jpg"
    },
    {
      title: "Split Fiction PS5 Key GLOBAL",
      platform: "PS5",
      region: "GLOBAL",
      price_eur: 38.15,
      old_price_eur: 49.99,
      discount_percent: 24,
      cashback_eur: 4.2,
      likes: 317,
      image_url: "/images/split-fiction.jpg"
    },
    {
      title: "Split Fiction EA App Key (PC) EUROPE",
      platform: "EA App",
      region: "EUROPE",
      price_eur: 39.49,
      old_price_eur: 49.99,
      discount_percent: 21,
      cashback_eur: 4.34,
      likes: 198,
      image_url: "/images/split-fiction.jpg"
    },
    {
      title: "Split Fiction Steam Key GLOBAL",
      platform: "Steam",
      region: "GLOBAL",
      price_eur: 33.29,
      old_price_eur: 49.99,
      discount_percent: 33,
      cashback_eur: 3.66,
      likes: 754,
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

  console.log("Seeded:", rows.length, "games");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});