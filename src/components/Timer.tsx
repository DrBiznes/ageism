import { useEffect, useState } from "react";

interface TimerProps {
  startTime: number;
  durationMs: number;
  large?: boolean;
}

export function Timer({ startTime, durationMs, large }: TimerProps) {
  const [remaining, setRemaining] = useState(durationMs);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, durationMs - (Date.now() - startTime)));
    tick();
    const id = setInterval(tick, 200);
    return () => clearInterval(id);
  }, [startTime, durationMs]);

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  const display = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const isWarning = remaining < 60000 && remaining > 0;
  const isDone = remaining === 0;

  const color = isDone ? "var(--ink-faint)" : isWarning ? "var(--accent)" : large ? "var(--display-text)" : "var(--ink)";

  return (
    <span
      className="mono tabular-nums font-semibold"
      style={{
        color,
        fontSize: large ? "6rem" : "1.5rem",
        lineHeight: 1,
        letterSpacing: large ? "-0.02em" : "0",
      }}
    >
      {isDone ? "0:00" : display}
    </span>
  );
}
