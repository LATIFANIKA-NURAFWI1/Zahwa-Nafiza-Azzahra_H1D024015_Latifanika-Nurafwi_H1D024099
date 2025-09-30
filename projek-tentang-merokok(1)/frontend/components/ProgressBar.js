export default function ProgressBar({ value = 0, max = 100 }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
      <div
        className="h-3 bg-health transition-all duration-500"
        style={{ width: pct + '%' }}
      />
    </div>
  );
}
