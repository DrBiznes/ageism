import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { CHARACTERS, type Role } from "../data/characters";
import { FaceAvatar } from "../components/FaceAvatar";
import type { FaceId } from "../components/faceAvatarOptions";
import { SCENARIOS } from "../data/scenarios";
import type { Id } from "../../convex/_generated/dataModel";

const STATUS_SEQUENCE = [
  "lobby",
  "activity1-groups",
  "activity1-move",
  "activity1-round1",
  "activity1-round2",
  "activity1-debrief",
  "ended",
];

const STATUS_LABELS: Record<string, string> = {
  lobby: "Lobby — players joining",
  "activity1-groups": "Groups revealed",
  "activity1-move": "Move to groups",
  "activity1-round1": "Round 1 — 5 min",
  "activity1-round2": "Round 2 — 5 min",
  "activity1-debrief": "Debrief",
  ended: "Session ended",
};

export function HostPage() {
  const { sessionId } = useParams<{ sessionId: string }>();

  const session = useQuery(api.sessions.get, { sessionId: sessionId as Id<"sessions"> });
  const players = useQuery(api.players.list, { sessionId: sessionId as Id<"sessions"> });
  const groups = useQuery(api.players.listGroups, { sessionId: sessionId as Id<"sessions"> });

  const advance = useMutation(api.sessions.advance);
  const revealGroups = useMutation(api.players.revealGroups);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--paper)" }}>
        <p className="mono text-sm" style={{ color: "var(--ink-faint)" }}>Loading…</p>
      </div>
    );
  }

  const currentIdx = STATUS_SEQUENCE.indexOf(session.status);
  const nextStatus = STATUS_SEQUENCE[currentIdx + 1];

  async function handleAdvance() {
    if (!nextStatus) return;
    if (nextStatus === "activity1-groups") {
      await revealGroups({ sessionId: sessionId as Id<"sessions"> });
    } else {
      await advance({ sessionId: sessionId as Id<"sessions">, status: nextStatus });
    }
  }

  const roleCount = { "early-career": 0, "mid-career": 0, senior: 0 };
  players?.forEach((p) => { if (p.role in roleCount) roleCount[p.role as Role]++; });

  return (
    <div className="min-h-screen px-4 py-6" style={{ background: "var(--paper)" }}>
      <div className="max-w-xl mx-auto space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest mono mb-1" style={{ color: "var(--ink-faint)" }}>
              Facilitator Panel
            </div>
            <h1 className="text-3xl font-normal" style={{ fontFamily: "'EB Garamond', serif", color: "var(--ink)" }}>
              Generation Goggles
            </h1>
            <div className="mono mt-1" style={{ color: "var(--ink-muted)", fontSize: "0.9rem" }}>
              Code:{" "}
              <span className="font-semibold tracking-widest" style={{ color: "var(--ink)", fontSize: "1.4rem" }}>
                {session.code}
              </span>
            </div>
          </div>
          <a
            href={`/display/${sessionId}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium px-4 py-2 mono transition-colors"
            style={{
              background: "var(--cream)",
              color: "var(--ink-muted)",
              border: "1.5px solid var(--border)",
              borderRadius: "6px",
            }}
          >
            Display Screen
          </a>
        </div>

        {/* Current status */}
        <div
          className="rounded-lg px-4 py-3"
          style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
        >
          <div className="text-xs uppercase tracking-widest mono mb-1" style={{ color: "var(--ink-faint)" }}>
            Current phase
          </div>
          <div className="text-lg" style={{ fontFamily: "'EB Garamond', serif", color: "var(--ink)" }}>
            {STATUS_LABELS[session.status] ?? session.status}
          </div>
        </div>

        {/* Advance button */}
        {nextStatus && (
          <button
            onClick={handleAdvance}
            className="w-full py-4 text-base font-medium transition-all"
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              borderRadius: "6px",
              fontFamily: "'EB Garamond', serif",
              fontSize: "1.2rem",
            }}
          >
            {nextStatus === "activity1-groups"
              ? "Reveal Groups"
              : `Advance → ${STATUS_LABELS[nextStatus] ?? nextStatus}`}
          </button>
        )}

        {/* Players */}
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: "1.5px solid var(--border)", background: "white" }}
        >
          <div
            className="px-4 py-2 flex items-center justify-between"
            style={{ borderBottom: "1px solid var(--border)", background: "var(--cream)" }}
          >
            <div className="text-xs uppercase tracking-widest mono" style={{ color: "var(--ink-faint)" }}>
              Players ({players?.length ?? 0})
            </div>
            <div className="flex gap-4">
              {(["early-career", "mid-career", "senior"] as Role[]).map((r) => {
                const char = CHARACTERS[r];
                return (
                  <span key={r} className="mono text-xs font-semibold" style={{ color: char.colorVar }}>
                    {char.roleLabel.split(" ")[0]}: {roleCount[r]}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="divide-y max-h-64 overflow-y-auto" style={{ borderColor: "var(--border)" }}>
            {players?.map((p) => {
              const char = CHARACTERS[p.role as Role];
              return (
                <div key={p._id} className="flex items-center gap-3 px-4 py-2">
                  <div style={{ width: 32, height: 32, flexShrink: 0 }}>
                    <FaceAvatar faceId={p.avatar as FaceId} size={32} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--ink)", fontFamily: "'EB Garamond', serif" }}>
                    {p.name}
                  </span>
                  <span className="mono text-xs ml-auto" style={{ color: char.colorVar }}>
                    {char.roleLabel}
                  </span>
                  {p.groupNumber && (
                    <span className="mono text-xs" style={{ color: "var(--ink-faint)" }}>
                      Grp {p.groupNumber}
                    </span>
                  )}
                </div>
              );
            })}
            {!players?.length && (
              <div className="px-4 py-6 text-center mono text-sm" style={{ color: "var(--ink-faint)" }}>
                No players yet
              </div>
            )}
          </div>
        </div>

        {/* Groups */}
        {groups && groups.length > 0 && (
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: "1.5px solid var(--border)", background: "white" }}
          >
            <div
              className="px-4 py-2 text-xs uppercase tracking-widest mono"
              style={{ borderBottom: "1px solid var(--border)", background: "var(--cream)", color: "var(--ink-faint)" }}
            >
              Groups ({groups.length})
            </div>
            <div className="grid grid-cols-2 gap-0 divide-x divide-y" style={{ borderColor: "var(--border)" }}>
              {groups.map((g) => {
                const groupPlayers = players?.filter((p) => p.groupNumber === g.groupNumber) ?? [];
                const scenario = SCENARIOS[g.scenarioId as keyof typeof SCENARIOS];
                return (
                  <div key={g._id} className="p-3">
                    <div className="mono text-xs font-semibold mb-0.5" style={{ color: "var(--ink-muted)" }}>
                      Group {g.groupNumber} — {scenario?.title ?? g.scenarioId}
                    </div>
                    {groupPlayers.map((p) => (
                      <div key={p._id} className="text-xs flex items-center gap-1.5 mt-1" style={{ color: "var(--ink)" }}>
                        <FaceAvatar faceId={p.avatar as FaceId} size={20} />
                        <span style={{ fontFamily: "'EB Garamond', serif" }}>{p.name}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
