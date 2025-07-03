export default function StoreList({ data }) {
  return (
    <div className="p-8">
      <div className="text-2xl font-bold mb-4">Magazyn materiałów</div>
      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="py-3 px-2">Nazwa</th>
            <th className="py-3 px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(m => (
            <tr key={m.id}>
              <td className="px-2">{m.name}</td>
              <td className="px-2">{m.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
