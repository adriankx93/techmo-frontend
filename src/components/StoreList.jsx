import { useState } from "react";
import { Plus, Edit, Trash, AlertCircle } from "lucide-react";

export default function StoreList({ data, onAdd, onEdit, onRemove, onChangeQty }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", qty: 0, min: 1, location: "" });

  const lowStock = data.filter(item => item.qty <= item.min);

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-blue-900">Stan magazynowy</h2>
        <button className="ml-auto bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1 hover:bg-blue-800"
          onClick={() => setModal(true)}>
          <Plus size={18} /> Dodaj materiał
        </button>
      </div>
      {lowStock.length > 0 && (
        <div className="mb-4 bg-yellow-100 text-yellow-800 p-2 rounded flex items-center gap-2">
          <AlertCircle size={18}/> Alert! Braki magazynowe:
          {lowStock.map(m => (
            <span key={m.id} className="font-bold">{m.name} ({m.qty} szt.)</span>
          ))}
        </div>
      )}
      <table className="w-full bg-white shadow-glass glass rounded-2xl overflow-hidden">
        <thead>
          <tr className="bg-blue-50 text-blue-900">
            <th className="p-2">Nazwa</th>
            <th>Stan</th>
            <th>Min.</th>
            <th>Lokalizacja</th>
            <th>+</th>
            <th>-</th>
            <th>Edytuj</th>
            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {data.map(m => (
            <tr key={m.id} className={m.qty <= m.min ? "bg-yellow-50" : ""}>
              <td className="p-2">{m.name}</td>
              <td>{m.qty}</td>
              <td>{m.min}</td>
              <td>{m.location}</td>
              <td>
                <button className="bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                  onClick={() => onChangeQty(m.id, 1)}>+1</button>
              </td>
              <td>
                <button className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                  onClick={() => onChangeQty(m.id, -1)} disabled={m.qty === 0}>-1</button>
              </td>
              <td>
                <button className="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                  onClick={() => { setModal(true); setForm(m); }}><Edit size={16}/></button>
              </td>
              <td>
                <button className="bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                  onClick={() => onRemove(m.id)}><Trash size={16}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl min-w-[340px] glass">
            <h3 className="font-bold text-lg mb-4">{form.id ? "Edytuj materiał" : "Dodaj nowy materiał"}</h3>
            <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Nazwa"
              value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input className="w-full border rounded px-3 py-2 mb-2" type="number" placeholder="Stan początkowy"
              value={form.qty} onChange={e => setForm(f => ({ ...f, qty: parseInt(e.target.value) || 0 }))} />
            <input className="w-full border rounded px-3 py-2 mb-2" type="number" placeholder="Minimum"
              value={form.min} onChange={e => setForm(f => ({ ...f, min: parseInt(e.target.value) || 0 }))} />
            <input className="w-full border rounded px-3 py-2 mb-2" placeholder="Lokalizacja"
              value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
            <div className="flex gap-2 mt-2">
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
                onClick={() => {
                  form.id ? onEdit(form) : onAdd(form);
                  setModal(false);
                  setForm({ name: "", qty: 0, min: 1, location: "" });
                }}>
                {form.id ? "Zapisz" : "Dodaj"}
              </button>
              <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => { setModal(false); setForm({ name: "", qty: 0, min: 1, location: "" }); }}>Anuluj</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
