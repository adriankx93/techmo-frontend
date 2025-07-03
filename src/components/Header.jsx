// components/Header.jsx
export default function Header({ title, user }) {
  return (
    <header className="flex items-center justify-between mb-7 px-2">
      <div className="text-3xl font-extrabold tracking-tight text-blue-800 drop-shadow">{title}</div>
      <div className="text-lg bg-blue-100 rounded-2xl px-5 py-2 font-semibold shadow text-blue-900 flex items-center">
        <span className="mr-3">{user}</span>
        <span className="rounded-full bg-green-400 w-3 h-3 inline-block"></span>
      </div>
    </header>
  );
}
