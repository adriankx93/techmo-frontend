import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function Grafik() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ key: null, asc: true });

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const wb = XLSX.read(evt.target.result, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setHeaders(raw[0]);
      setData(raw.slice(1));
    };
    reader.readAsBinaryString(file);
  }

  function handleSort(idx) {
    setSort(s => ({
      key: idx,
      asc: s.key === idx ? !s.asc : true
    }));
  }

  let filtered = data.filter(
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
        <label className="block font-bold text-blue-900">
          Wczytaj grafik z Excela:{" "}
          <input type="file" accept=".xlsx,.xls" onChange={handleFile} className="ml-2" />
        </label>
        {data.length > 0 && (
          <input
            className="glass border px-3 py-2 rounded ml-auto"
            placeholder="Filtruj (imię/nazwisko/dzień...)"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        )}
      </div>
      {data.length === 0 && (
        <div className="glass p-6 text-center rounded-2xl text-slate-700">
          Przeciągnij plik Excel z grafikiem lub kliknij powyżej aby go wybrać.
        </div>
      )}
      {data.length > 0 && (
        <div className="overflow-x-auto mt-6 rounded-2xl shadow">
          <table className="min-w-full bg-white glass text-center">
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
            Wskazówka: Kliknij nagłówek kolumny aby sortować. Filtr działa na wszystko.
          </div>
        </div>
      )}
    </div>
  );
}
