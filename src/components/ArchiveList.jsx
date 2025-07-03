export default function ArchiveList({ archivedTasks, archivedDefects, archivedMaterials, onRestore }) {
  return (
    <div className="p-8">
      <div className="text-2xl font-bold mb-6">Archiwum zrealizowanych</div>
      <Section title="Zadania" data={archivedTasks} type="task" onRestore={onRestore} fields={["desc", "date", "assignedTo"]} />
      <Section title="Usterki" data={archivedDefects} type="defect" onRestore={onRestore} fields={["desc", "location"]} />
      <Section title="Materiały" data={archivedMaterials} type="material" onRestore={onRestore} fields={["name"]} />
    </div>
  );
}
function Section({ title, data, type, onRestore, fields }) {
  return (
    <div className="mb-8">
      <div className="font-bold mb-2">{title}</div>
      <table className="w-full bg-white rounded-xl shadow overflow-hidden mb-2">
        <thead className="bg-blue-50">
          <tr>
            {fields.map(f => <th className="py-2 px-3" key={f}>{f}</th>)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              {fields.map(f => <td className="px-2" key={f}>{item[f]}</td>)}
              <td><button className="text-xs text-blue-600 underline" onClick={() => onRestore(type, item.id)}>Przywróć</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
