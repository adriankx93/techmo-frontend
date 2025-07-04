import React, { useState } from "react";

export default function StoreList({ data, onAdd, onEdit, onRemove, onChangeQty }) {
  const [newItem, setNewItem] = useState({
    name: "",
    qty: "",
    unit: "",
    type: "",
    desc: ""
  });

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <form
          className="glass p-4 rounded-xl flex flex-col gap-2 shadow border"
          onSubmit={e => {
            e.preventDefault();
            if (!newItem.name || !newItem.qty || !newItem.unit) return;
            onAdd({ ...newItem, qty: Number(newItem.qty) });
            setNewItem({ name: "", qty: "", unit: "", type: "", desc: "" });
          }}
        >
          <div className="font-bold text-blue-900 mb-1">Dodaj materiał do magazynu</div>
          <input
            className="input px-3 py-2 rounded border outline-blue-400"
            placeholder="Nazwa materiału"
            value={newItem.name}
            onChange={e => setNewItem(v => ({ ...v, name: e.target.value }))}
            required
          />
          <div className="flex gap-2">
            <input
              className="input px-3 py-2 rounded border outline-blue-400 w-1/2"
              type="number"
              placeholder="Stan (ilość)"
              value={newItem.qty}
              onChange={e => setNewItem(v => ({ ...v, qty: e.target.value }))}
              min="0"
              required
            />
            <input
              className="input px-3 py-2 rounded border outline-blue-400 w-1/2"
              placeholder="Jednostka (np. szt, m, l)"
              value={newItem.unit}
              onChange={e => setNewItem(v => ({ ...v, unit: e.target.value }))}
              required
            />
          </div>
          <input
            className="input px-3 py-2 rounded border outline-blue-400"
            placeholder="Typ/kategoria (opcjonalnie)"
            value={newItem.type}
            onChange={e => setNewItem(v => ({ ...v, type: e.target.value }))}
          />
          <input
            className="input px-3 py-2 rounded border outline-blue-400"
            placeholder="Opis (opcjonalnie)"
            value={newItem.desc}
            onChange={e => setNewItem(v => ({ ...v, desc: e.target.value }))}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-xl px-4 py-2 font-bold hover:bg-blue-700 mt-2 transition"
          >
            Dodaj materiał
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {data.length === 0 && (
          <div className="text-gray-500 col-span-full">Brak materiałów w magazynie.</div>
        )}
        {data.map(item => (
          <div key={item.id} className="glass p-5 rounded-2xl shadow flex flex-col gap-2 border">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-lg text-blue-900">{item.name}</span>
              <button
                className="bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 text-sm"
                onClick={() => onRemove(item.id)}
                title="Usuń z magazynu"
              >Usuń</button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-800">
              <div>
                <div className="text-xs text-gray-500">Stan</div>
                <div className="font-semibold text-base flex items-center gap-2">
                  {item.qty}
                  <span className="text-xs text-gray-600">{item.unit}</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Typ</div>
                <div className="text-base">{item.type || <span className="text-gray-400">—</span>}</div>
              </div>
              <div className="col-span-2">
                <div className="text-xs text-gray-500">Opis</div>
                <div className="text-base">{item.desc || <span className="text-gray-400">—</span>}</div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm"
                onClick={() => onChangeQty(item.id, 1)}
                title="Dodaj 1"
              >+1</button>
              <button
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-sm"
                onClick={() => onChangeQty(item.id, -1)}
                disabled={item.qty <= 0}
                title="Zabierz 1"
              >-1</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
