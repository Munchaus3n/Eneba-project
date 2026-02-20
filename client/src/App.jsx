import { useEffect, useMemo, useState } from "react";
import "./styles.css";

function useDebouncedValue(value, delayMs) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

function formatEur(n) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(n);
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
      } catch (e) {
        setErr("Failed to load results.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [debounced]);

  return (
    <div className="page">
      <div className="promoBar">🕹️ Games, Gift Cards, Top-Ups & More | Best Deals</div>
      <header className="topbar">
        <div className="brand">eneba</div>

        <div className="searchWrap">
          <span className="searchIcon" aria-hidden>⌕</span>
          <input
            className="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games..."
          />
          <button className="clear" onClick={() => setQuery("")} aria-label="Clear">
            ✕
          </button>
        </div>

        <div className="right">
          <span className="flagIcon" aria-hidden />
          <span className="rightText">English EU | EUR</span>
          <span className="iconBtn" aria-hidden>♡</span>
          <span className="iconBtn" aria-hidden>🛒</span>
          <span className="iconBtn avatar" aria-hidden />
        </div>
      </header>

      <main className="content">
        <div className="meta">
          {loading ? "Loading..." : `Results found: ${count}`}
          {err ? <span className="err"> — {err}</span> : null}
        </div>

        <div className={`grid${loading ? " is-loading" : ""}`}>
          {items.map((g) => (
            <div className="card" key={g.id}>
              <div className="imgWrap">
                {g.cashback_eur ? <div className="badge">CASHBACK</div> : null}
                <img src={g.image_url} alt={g.title} />
              </div>

              <div className="cardBody">
                <div className="title">{g.title}</div>

                <div className="sub">
                  <span className="muted platformTag">{g.platform}</span>
                  <span className="dot">•</span>
                  <span className="tag">{g.region}</span>
                </div>

                {(g.old_price_eur != null && g.discount_percent != null) ? (
                  <div className="originalPriceLine">
                    From <span className="oldPrice">{formatEur(g.old_price_eur)}</span>
                    {" "}<span className="discount">-{g.discount_percent}%</span>
                  </div>
                ) : null}
                <div className="priceRow">
                  <div className="price">{formatEur(g.price_eur)}</div>
                  <span className="priceInfo" aria-hidden>ⓘ</span>
                </div>

                {g.cashback_eur ? (
                  <div className="cashback">Cashback: {formatEur(g.cashback_eur)}</div>
                ) : null}

                <div className="likes">♡ {g.likes ?? 0}</div>
              </div>
            </div>
          ))}
        </div>
        <a href="#report" className="reportLink">Report a problem</a>
      </main>
    </div>
  );
}