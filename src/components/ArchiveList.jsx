import { ClipboardList, Wrench, Package, Undo2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ArchiveList({ archivedTasks, archivedDefects, archivedMaterials, onRestore }) {
  return (
    <motion.div className="p-4 md:p-8 glass animate-fade-in shadow-glass">
      <div className="text-2xl font-bold text-blue-900 mb-6">Archiwum</div>
      <div className="grid md:grid-cols-3 gap-8">
        <ArchiveSection
          icon={<ClipboardList size={20} />}
          label="Zadania"
          data={archivedTasks}
          restore={id => onRestore("task", id)}
          getDesc={t => t.desc}
        />
        <ArchiveSection
          icon={<Wrench size={20} />}
          label="Usterki"
          data={archivedDefects}
          restore={id => onRestore("defect", id)}
          getDesc={d => d.desc}
        />
        <ArchiveSection
          icon={<Package size={20} />}
          label="Materiały"
          data={archivedMaterials}
          restore={id => onRestore("material", id)}
          getDesc={m => m.name}
        />
      </div>
    </motion.div>
  );
}

function ArchiveSection({ icon, label, data, restore, getDesc }) {
  return (
    <div>
      <div className="flex gap-2 items-center mb-2 font-bold text-blue-900">{icon} {label}</div>
      <ul className="glass p-3 rounded-xl min-h-[90px] shadow-glass">
        {data.length === 0 && <li className="text-gray-400 text-sm">Brak</li>}
        {data.map(item =>
          <li key={item.id} className="flex justify-between items-center border-b last:border-b-0 py-2">
            <span>{getDesc(item)}</span>
            <button
              className="ml-3 px-3 py-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg text-xs font-semibold hover:from-blue-700 hover:to-blue-500"
              onClick={() => restore(item.id)}>
              <Undo2 size={16} className="inline" /> Przywróć
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
