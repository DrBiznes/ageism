const COLORS = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-lime-500", "bg-green-500"];
const LABELS = ["Strongly\nDisagree", "Slightly\nDisagree", "Neutral", "Slightly\nAgree", "Strongly\nAgree"];
const EMOJIS = ["😤", "🙁", "😐", "🙂", "😄"];

interface ResultsChartProps {
  counts: number[];
  total: number;
}

export function ResultsChart({ counts, total }: ResultsChartProps) {
  const max = Math.max(...counts, 1);

  return (
    <div className="space-y-3">
      {counts.map((count, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-6 text-xl text-center">{EMOJIS[i]}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div
                className={`${COLORS[i]} rounded-full h-8 transition-all duration-700`}
                style={{ width: `${(count / max) * 100}%`, minWidth: count > 0 ? "2rem" : "0" }}
              />
              <span className="font-bold text-white text-lg">{count}</span>
            </div>
          </div>
          <div className="w-20 text-right text-xs text-gray-300 whitespace-pre-line leading-tight">
            {LABELS[i]}
          </div>
        </div>
      ))}
      <div className="text-gray-400 text-sm text-center pt-1">
        {total} response{total !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
