import { useEffect, useState } from "react";

export default function Grafik() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRMfOVD7vMfD43qN3uOo5Sp2yiEGDRpNVqRvgHjL9ZavLjdw0pykq6Vjc4vWWsYJQ/pub?gid=1550371029&single=true&output=csv")
      .then(r => r.text())
      .then(csv => {
        const lines = csv.split("\n").filter(Boolean);
        const [header, ...body] = lines;
        const keys = header.split(",");
        setRows(body.map(line => {
          const cols = line.split(",");
          return Object.fromEntries(cols.map((val, i) => [keys[i], val]));
        }));
      });
  }, []);
  return (
    <div className="p-8">
      <div className="text-2xl font-bold mb-4">Grafik pracy</div>
      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            {rows[0] && Object.keys(rows[0]).map(k => <th className="py-2 px-3" key={k}>{k}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((v, j) => <td className="px-3 py-2" key={j}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
