import { BarChart2, AlertCircle, ClipboardList, PackageSearch } from "lucide-react";

export default function Dashboard({ stats, chartData }) {
  return (
    <div className="p-8">
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
          <BarChart2 size={36} className="text-blue-400" />
          <div className="font-bold text-3xl">{stats.tasks}</div>
          <div className="text-gray-500">Zadania</div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
          <AlertCircle size={36} className="text-red-400" />
          <div className="font-bold text-3xl">{stats.defects}</div>
          <div className="text-gray-500">Usterki otwarte</div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
          <ClipboardList size={36} className="text-green-500" />
          <div className="font-bold text-3xl">{stats.completed}</div>
          <div className="text-gray-500">Wykonane</div>
        </div>
        <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
          <PackageSearch size={36} className="text-yellow-500" />
          <div className="font-bold text-3xl">{stats.materials}</div>
          <div className="text-gray-500">Braki materiałów</div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-bold mb-2">Historia usterek (dziennie)</div>
        <svg width="100%" height="160">
          {chartData.map((item, idx) =>
            <rect key={item.day} x={idx * 50 + 50} y={130 - item.count * 10} width="35" height={item.count * 10} fill="#60a5fa" />
          )}
          {chartData.map((item, idx) =>
            <text key={item.day} x={idx * 50 + 67} y={150} fontSize="12" textAnchor="middle">{item.day.slice(-5)}</text>
          )}
        </svg>
      </div>
    </div>
  );
}
