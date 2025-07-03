export default function Header({ title }) {
  return (
    <header className="bg-white shadow px-8 py-4 flex items-center justify-between">
      <div className="text-xl font-bold text-blue-900">{title}</div>
      <img src="https://randomuser.me/api/portraits/men/85.jpg" className="rounded-full w-10 border" alt="user" />
    </header>
  );
}
