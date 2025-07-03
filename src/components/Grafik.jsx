export default function Grafik() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
      <div className="text-2xl font-bold text-blue-900 mb-6">Grafik pracy (aktualny miesiąc)</div>
      <div className="overflow-auto">
        <iframe
          title="Grafik Google Sheets"
          src="https://docs.google.com/spreadsheets/d/1gduTrxhu4I7Z8CKcBtxmia3_4-7GopgM/edit?usp=drive_link&ouid=111906618259999940133&rtpof=true&sd=true"
          width="100%" height="620px"
          style={{ border: 0, minWidth: 340 }}
        ></iframe>
      </div>
    </div>
  );
}
