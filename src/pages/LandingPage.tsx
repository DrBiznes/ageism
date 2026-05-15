import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export function LandingPage() {
  const navigate = useNavigate();
  const createSession = useMutation(api.sessions.create);
  const [code, setCode] = useState("");
  const [creating, setCreating] = useState(false);

  async function handleHost() {
    setCreating(true);
    const { sessionId } = await createSession();
    navigate(`/host/${sessionId}`);
  }

  function handleJoin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (code.trim()) navigate(`/join/${code.trim().toUpperCase()}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--paper)" }}>
      <div className="w-full max-w-xs space-y-10">
        <div>
          <div className="text-xs uppercase tracking-widest mb-2 mono" style={{ color: "var(--ink-faint)" }}>
            PPPM 494 — Age Matters
          </div>
          <h1 className="text-5xl font-normal leading-none" style={{ fontFamily: "'EB Garamond', serif", color: "var(--ink)" }}>
            Generation<br />
            <span style={{ color: "var(--accent)" }}>Goggles</span>
          </h1>
          <p className="mt-3 text-base" style={{ color: "var(--ink-muted)" }}>
            A role-play exercise in intergenerational communication.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleHost}
            disabled={creating}
            className="w-full py-3 px-5 text-base font-medium transition-all"
            style={{
              background: "var(--ink)", color: "var(--paper)",
              borderRadius: "6px", opacity: creating ? 0.6 : 1,
            }}
          >
            {creating ? "Creating session…" : "Open as Facilitator"}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="text-xs mono" style={{ color: "var(--ink-faint)" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          <form onSubmit={handleJoin} className="space-y-3">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="SESSION CODE"
              maxLength={6}
              className="w-full text-center py-3 px-4 tracking-widest text-xl outline-none mono"
              style={{
                background: "white", borderRadius: "6px", color: "var(--ink)",
                border: "1.5px solid var(--border)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--ink)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
            <button
              type="submit"
              disabled={code.length < 4}
              className="w-full py-3 px-5 text-base font-medium transition-all"
              style={{
                background: code.length >= 4 ? "var(--accent)" : "var(--cream)",
                color: code.length >= 4 ? "white" : "var(--ink-faint)",
                borderRadius: "6px",
              }}
            >
              Join Session
            </button>
          </form>
        </div>

        <p className="text-xs text-center mono" style={{ color: "var(--ink-faint)" }}>
          Scan the QR code on the board to join automatically
        </p>
      </div>
    </div>
  );
}
