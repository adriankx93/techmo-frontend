import React, { useEffect, useState } from "react";

// URL do eksportu CSV z Google Sheets
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/1gduTrxhu4I7Z8CKcBtxmia3_4-7GopgM/export?format=csv&id=1gduTrxhu4I7Z8CKcBtxmia3_4-7GopgM&gid=770254744";

// Funkcja parsująca CSV (prosta wersja, bez zagnieżdżonych przecinków)
function parseCSV(csv) {
  const [headerLine, ...lines] = csv.split("\n").map(l => l.replace(/\r/g, ""));
  const headers = headerLine.split(",");
  const data = lines
    .filter(Boolean)
    .map(line => {
      // Obsługa przecinków w cudzysłowie
      const row = [];
      let val = "", inside = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') inside = !inside;
        else if (ch === "," && !inside) {
          row.push(val);
          val = "";
        } else {
          val += ch;
        }
      }
      row.push(val);
      return row;
    });
  return { headers, data };
}

export default function Grafik() {
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ key: null, asc: true });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(CSV_URL)
      .then(r => r.text())
      .then(csv => {
        const { headers, data } = parseCSV(csv);
        setHeaders(headers);
        setRows(data);
        setLoading(false);
      });
  }, []);

  function handleSort(idx) {
    setSort(s => ({
      key: idx,
      asc: s.key === idx ? !s.asc : true
    }));
  }

  let filtered = rows.filter(
    row => row.join(" ").toLowerCase().includes(filter.toLowerCase())
  );
  if (sort.key !== null) {
    filtered = [...filtered].sort((a, b) => {
      if ((a[sort.key] || "") > (b[sort.key] || "")) return sort.asc ? 1 : -1;
      if ((a[sort.key] || "") < (b[sort.key] || "")) return sort.asc ? -1 : 1;
      return 0;
    });
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-4 flex flex-col md:flex-row items-center gap-3">
        <span className="font-bold text-blue-900">
          Grafik techników (aktualny miesiąc)
        </span>
        {!loading && (
          <input
            className="glass border px-3 py-2 rounded ml-auto"
            placeholder="Filtruj (imię, dzień, itp.)"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        )}
      </div>
      {loading && <div className="glass p-8 rounded-2xl text-blue-800 text-center">Ładowanie grafiku…</div>}
      {!loading && (
        <div className="overflow-x-auto mt-6 rounded-2xl shadow">
          <table className="min-w-full glass bg-white text-center">
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-2 py-2 bg-blue-100 font-semibold text-blue-900 cursor-pointer select-none"
                    onClick={() => handleSort(i)}
                  >
                    {h}
                    {sort.key === i ? (sort.asc ? " ▲" : " ▼") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, r) => (
                <tr key={r} className="hover:bg-blue-50 transition">
                  {headers.map((_, c) => (
                    <td key={c} className="px-2 py-2 text-slate-700">{row[c]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-xs text-slate-400 mt-2">
            Kliknij nagłówek kolumny by sortować, wpisz tekst by filtrować. Dane z Google Sheets.
          </div>
        </div>
      )}
    </div>
  );
}
