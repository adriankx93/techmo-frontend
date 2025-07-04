import React, { useState } from "react";

export default function StoreList({ data, onAdd, onEdit, onRemove, onChangeQty }) {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ key: "name", asc: true });
  const [newItem, setNewItem] = useState({
    name: "",
    qty: "",
    unit: "",
    type: "",
    desc: ""
  });

  const filtered = data
    .filter(
      item =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        (item.type && item.type.toLowerCase().includes(filter.toLowerCase())) ||
        (item.desc && item.desc.toLowerCase().includes(filter.toLowerCase()))
    )
    .sort((a, b) => {
      if (a[sort.key] > b[sort.key]) return sort.asc ? 1 : -1;
      if (a[sort.key] < b[sort.key]) return sort.asc ? -1 : 1;
      return 0;
    });

  function handleSort(key) {
    setSort(s => ({
      key,
      asc: s.key === key ? !s.asc : true
    }));
  }

  return (
    <div>
      <form
        className="glass p-4 rounded-xl flex flex-col md:flex-row gap-2 mb-6"
        onSubmit={e => {
          e.preventDefault();
          if (!newItem.name || !newItem.qty || !newItem.unit) return;
          onAdd({ ...newItem, qty: Number(newItem.qty) });
          setNewItem({ name: "", qty: "", unit: "", type: "", desc: "" });
        }}
      >
        <input
          className="input px-3 py-2 rounded border outline-blue-400"
          placeholder="Nazwa materiału"
          value={newItem.name}
          onChange={e => setNewItem(v => ({ ...v, name: e.target.value }))}
          required
        />
        <input
          className="input px-3 py-2 rounded border outline-blue-400 w-28"
          type="number"
          placeholder="Stan"
          value={newItem.qty}
          onChange={e => setNewItem(v => ({ ...v, qty: e.target.value }))}
          min="0"
          required
        />
        <input
          className="input px-3 py-2 rounded border outline-blue-400 w-20"
          placeholder="Jednostka"
          value={newItem.unit}
          onChange={e => setNewItem(v => ({ ...v, unit: e.target.value }))}
          required
        />
        <input
          className="input px-3 py-2 rounded border outline-blue-400"
          placeholder="Typ"
          value={newItem.type}
          onChange={e => setNewItem(v => ({ ...v, type: e.target.value }))}
        />
        <input
          className="input px-3 py-2 rounded border outline-blue-400 flex-1"
          placeholder="Opis"
          value={newItem.desc}
          onChange={e => setNewItem(v => ({ ...v, desc: e.target.value }))}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-xl px-4 py-2 font-bold hover:bg-blue-700 transition"
        >
          Dodaj
        </button>
        <input
          className="ml-auto border px-2 py-1 rounded"
          placeholder="Filtruj/wyszukaj"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </form>

      <div className="overflow-x-auto rounded-2xl shadow">
        <table className="min-w-full bg-white glass">
          <thead>
            <tr>
              <Th title="Nazwa" sortKey="name" sort={sort} onSort={handleSort} />
              <Th title="Stan" sortKey="qty" sort={sort} onSort={handleSort} />
              <Th title="Jednostka" sortKey="unit" sort={sort} onSort={handleSort} />
              <Th title="Typ" sortKey="type" sort={sort} onSort={handleSort} />
              <Th title="Opis" sortKey="desc" sort={sort} onSort={handleSort} />
              <th className="px-2 py-2 text-center">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-8">
                  Brak materiałów
                </td>
              </tr>
            ) : (
              filtered.map(item => (
                <tr key={item.id} className="hover:bg-blue-50 transition">
                  <td className="px-2 py-2 font-semibold text-blue-900">{item.name}</td>
                  <td className="px-2 py-2 text-center">{item.qty}</td>
                  <td className="px-2 py-2 text-center">{item.unit}</td>
                  <td className="px-2 py-2">{item.type}</td>
                  <td className="px-2 py-2">{item.desc}</td>
                  <td className="px-2 py-2 flex gap-1 justify-center">
                    <button
                      className="bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                      title="Dodaj 1"
                      onClick={() => onChangeQty(item.id, 1)}
                    >+1</button>
                    <button
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                      title="Zabierz 1"
                      onClick={() => onChangeQty(item.id, -1)}
                      disabled={item.qty <= 0}
                    >-1</button>
                    <button
                      className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                      title="Usuń"
                      onClick={() => onRemove(item.id)}
                    >🗑</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ title, sortKey, sort, onSort }) {
  return (
    <th
      className="px-2 py-2 text-left cursor-pointer select-none whitespace-nowrap"
      onClick={() => onSort(sortKey)}
    >
      {title}
      {sort.key === sortKey ? (
        <span>{sort.asc ? " ▲" : " ▼"}</span>
      ) : null}
    </th>
  );
}
