import React, { useEffect, useState } from "react";

// Link do CSV z Google Sheets
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/1gduTrxhu4I7Z8CKcBtxmia3_4-7GopgM/export?format=csv&id=1gduTrxhu4I7Z8CKcBtxmia3_4-7GopgM&gid=770254744";

// Funkcja do parsowania CSV
function parseCSV(csv) {
  const lines = csv.split("\n").map(line => line.replace(/\r/g, "")).filter(Boolean);
  const headers = lines[0].split(",");
  const rows = lines.slice(1).map(l => l.split(","));
  return { headers, rows };
}

// Zwraca true jeśli string to data w formacie "1.07.2024", "2.07.2024" itd.
function isDayCol(str) {
  return /^\d{1,2}\.\d{2}\.\d{4}$/.test(str.trim());
}

function getCurrentMonthYear() {
  const now = new Date();
  const m = (now.getMonth() + 1).toString().padStart(2, "0");
  return { month: m, year: now.getFullYear() };
}

export default function Grafik() {
  const [loading, setLoading] = useState(true);
  const [dayHeaders, setDayHeaders] = useState([]);
  const [people, setPeople] = useState([]);
  const [grafik, setGrafik] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(CSV_URL)
      .then(r => r.text())
      .then(csv => {
        const { headers, rows } = parseCSV(csv);
        // Szukamy kolumn z dniami bieżącego miesiąca:
        const { month, year } = getCurrentMonthYear();
        const dayIdx = headers
          .map((h, i) =>
            isDayCol(h) && h.split(".")[1] === month && h.split(".")[2] === String(year)
              ? i
              : null
          )
          .filter(i => i !== null);

        // Dla uproszczenia: przyjmujemy że pierwszy wiersz to nagłówki ("Imię", "Nazwisko", "Stanowisko", ...dni)
        const imieIdx = headers.findIndex(h => /imie|imię/i.test(h));
        const nazwIdx = headers.findIndex(h => /nazw/i.test(h));
        const peopleList = rows.map(row => ({
          name: row[imieIdx] + " " + (row[nazwIdx] || ""),
          data: dayIdx.map(i => row[i] || "")
        }));

        setDayHeaders(dayIdx.map(i => headers[i]));
        setPeople(peopleList.map(p => p.name));
        setGrafik(peopleList.map(p => p.data));
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-7">
      <div className="font-bold text-blue-900 mb-5 text-xl text-center">Grafik techników – {new Date().toLocaleString('pl-PL', { month: 'long', year: 'numeric' })}</div>
      {loading ? (
        <div className="glass p-10 rounded-2xl text-blue-700 text-center shadow-lg">Ładowanie grafiku…</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 shadow-lg rounded-2xl glass text-center">
            <thead>
              <tr>
                <th className="sticky left-0 bg-blue-50/80 font-semibold px-3 py-2 text-blue-900 z-10">Technik</th>
                {dayHeaders.map((d, i) => (
                  <th key={i} className="px-2 py-2 bg-blue-50 font-semibold text-blue-900">
                    {parseInt(d)} {/* dzień miesiąca */}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {people.map((person, rIdx) => (
                <tr key={person}>
                  <td className="sticky left-0 bg-blue-50/80 font-semibold px-3 py-2 text-blue-800 z-10 border-r border-blue-200">{person}</td>
                  {grafik[rIdx].map((val, cIdx) => (
                    <td key={cIdx} className="px-2 py-1">
                      {val.trim() ? (
                        <span
                          className={
                            "inline-block min-w-[60px] px-2 py-1 rounded-xl font-medium " +
                            (val.toLowerCase().includes("dzień") ? "bg-yellow-200 text-yellow-800" :
                              val.toLowerCase().includes("noc") ? "bg-indigo-300 text-indigo-900" :
                              val.toLowerCase().includes("urlop") ? "bg-pink-200 text-pink-800" :
                              val.toLowerCase().includes("wolne") ? "bg-gray-200 text-gray-700" :
                              "bg-blue-100 text-blue-900")
                          }
                        >
                          {val}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-xs text-slate-400 mt-2 text-center">
            Podświetlenie: dzień (żółty), nocka (niebieski), urlop (różowy), wolne (szary).
          </div>
        </div>
      )}
    </div>
  );
}
