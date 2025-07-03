import { Trash2, RotateCcw } from "lucide-react";

export default function ArchiveList({ archivedTasks, archivedDefects, archivedMaterials, onRestore }) {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Archiwum zrealizowanych</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Zadania</h3>
          <ul>
            {archivedTasks.map(t => (
              <li key={t.id} className="flex justify-between items-center border-b py-2 text-green-700">
                <span>{t.desc}</span>
                <button title="Przywróć" onClick={() => onRestore("task", t.id)}>
                  <RotateCcw className="text-blue-500 hover:text-blue-700" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Usterki</h3>
          <ul>
            {archivedDefects.map(d => (
              <li key={d.id} className="flex justify-between items-center border-b py-2 text-green-700">
                <span>{d.desc}</span>
                <button title="Przywróć" onClick={() => onRestore("defect", d.id)}>
                  <RotateCcw className="text-blue-500 hover:text-blue-700" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Materiały</h3>
          <ul>
            {archivedMaterials.map(m => (
              <li key={m.id} className="flex justify-between items-center border-b py-2 text-green-700">
                <span>{m.name}</span>
                <button title="Przywróć" onClick={() => onRestore("material", m.id)}>
                  <RotateCcw className="text-blue-500 hover:text-blue-700" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
