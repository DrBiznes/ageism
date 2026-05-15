interface AgreementScaleProps {
  onSelect: (value: number) => void;
  selected?: number;
  disabled?: boolean;
}

const OPTIONS = [
  { value: 1, label: "Strongly\nDisagree", emoji: "😤", bg: "bg-red-500 hover:bg-red-600" },
  { value: 2, label: "Slightly\nDisagree", emoji: "🙁", bg: "bg-orange-400 hover:bg-orange-500" },
  { value: 3, label: "Neutral", emoji: "😐", bg: "bg-yellow-400 hover:bg-yellow-500" },
  { value: 4, label: "Slightly\nAgree", emoji: "🙂", bg: "bg-lime-500 hover:bg-lime-600" },
  { value: 5, label: "Strongly\nAgree", emoji: "😄", bg: "bg-green-500 hover:bg-green-600" },
];

export function AgreementScale({ onSelect, selected, disabled }: AgreementScaleProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {OPTIONS.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => !disabled && onSelect(opt.value)}
            disabled={disabled && !isSelected}
            className={`
              flex flex-col items-center justify-center rounded-xl py-4 px-1 transition-all
              ${opt.bg} text-white font-semibold
              ${isSelected ? "ring-4 ring-white ring-offset-2 scale-105 shadow-lg" : ""}
              ${disabled && !isSelected ? "opacity-40 cursor-not-allowed" : "cursor-pointer active:scale-95"}
            `}
          >
            <span className="text-2xl mb-1">{opt.emoji}</span>
            <span className="text-xs text-center leading-tight whitespace-pre-line">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
