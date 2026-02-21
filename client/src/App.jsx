import { useEffect, useState } from "react";
import enebaLogo from "./assets/eneba-logo.png";
import "./styles.css";

function useDebouncedValue(value, delayMs) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);

  return debounced;
}

function getPlatformDotClass(platform = "") {
  const p = platform.toLowerCase();
  if (p.includes("ea")) return "ea";
  if (p.includes("xbox") || p.includes("live")) return "xbox";
  if (p.includes("nintendo") || p.includes("switch")) return "nintendo";
  if (p.includes("steam")) return "steam";
  if (p.includes("psn") || p.includes("playstation")) return "psn";
  return "default";
}

export default function App() {
  const [query, setQuery] = useState("split fiction");
  const debounced = useDebouncedValue(query, 300);

  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr("");

      try {
        const q = debounced.trim();
        const url = q ? `/list?search=${encodeURIComponent(q)}` : "/list";
        const r = await fetch(url);

        if (!r.ok) throw new Error(`HTTP ${r.status}`);

        const data = await r.json();
        setItems(data.items);
        setCount(data.count);
      } catch {
        setErr("Failed to load results.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [debounced]);

  return (
    <div className="page">
      <div className="promoBar">
        <div className="container">
          🎮 Games, Gift Cards, Top-Ups &amp; More | Best Deals
        </div>
      </div>

      <header className="topbar">
        <div className="container topbarInner">
          <div className="brand">
            <img className="brandLogo" src={enebaLogo} alt="Eneba" />
          </div>

          <div className="searchWrap">
            <span className="searchIcon" aria-hidden="true">⌕</span>

            <input
              className="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search games..."
            />

            {query ? (
              <button
                className="clear"
                onClick={() => setQuery("")}
                aria-label="Clear"
                type="button"
              >
                ✕
              </button>
            ) : null}
          </div>

          <div className="langGroup">
            <span className="flagIcon" aria-hidden="true" />
            <span>English EU | EUR</span>
          </div>

          <div className="right">
            <span className="iconBtn" title="Favorites" aria-hidden="true">♡</span>
            <span className="iconBtn" title="Cart" aria-hidden="true">🛒</span>
            <span className="iconBtn avatar" title="Profile" aria-hidden="true" />
          </div>
        </div>
      </header>

      <main className="content">
        <div className="container">
          <div className="meta">
            {loading
              ? "Loading..."
              : <>Results found: <strong>{count}</strong></>}
            {err ? <span className="err"> — {err}</span> : null}
          </div>

          <div className={`grid ${loading ? "is-loading" : ""}`}>
            {items.map((g) => (
              <div className="card" key={g.id}>
                <div className="imgWrap">
                  <img src={g.image_url} alt={g.title} />

                  {/* CASHBACK badge */}
                  {g.cashback_eur ? (
                    <span className="badge">CASHBACK</span>
                  ) : null}

                  {/* Platform strip at bottom of image */}
                  <div className="platformStrip">
                    <span className={`platformDot ${getPlatformDotClass(g.platform)}`} />
                    {g.platform}
                  </div>
                </div>

                <div className="cardBody">
                  {/* Title */}
                  <div className="title">{g.title}</div>

                  {/* Region tag — teal */}
                  <div className="regionTag">{g.region}</div>

                  {/* Old price + discount */}
                  {g.old_price_eur != null && g.discount_percent != null ? (
                    <div className="originalPriceLine">
                      <span className="fromLabel">From</span>
                      <span className="oldPrice">€{g.old_price_eur}</span>
                      <span className="discount">-{g.discount_percent}%</span>
                    </div>
                  ) : (
                    <div className="originalPriceLine">
                      <span className="fromLabel">From</span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="priceRow">
                    <div className="price">€{g.price_eur}</div>
                    <div className="priceInfo" title="Price info">ⓘ</div>
                  </div>

                  {/* Cashback */}
                  {g.cashback_eur ? (
                    <div className="cashback">Cashback: €{g.cashback_eur}</div>
                  ) : null}

                  {/* Likes */}
                  <div className="likes">♡ {g.likes ?? 0}</div>
                </div>
              </div>
            ))}
          </div>

          <a className="reportLink" href="#" onClick={(e) => e.preventDefault()}>
            Report a problem
          </a>
        </div>
      </main>
    </div>
  );
}