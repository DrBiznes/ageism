import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { QRCodeSVG } from "qrcode.react";
import { api } from "../../convex/_generated/api";
import { Timer } from "../components/Timer";
import { FaceAvatar, type FaceId } from "../components/FaceAvatar";
import { SCENARIOS } from "../data/scenarios";
import { CHARACTERS, type Role } from "../data/characters";
import type { Id } from "../../convex/_generated/dataModel";

const GROUP_ACCENT_COLORS = [
  "#c8a060", "#7a9eb8", "#8aaa78", "#b87878",
  "#8878aa", "#7aaa98", "#b89860", "#88a0b8",
];

export function DisplayPage() {
  const { sessionId } = useParams<{ sessionId: string }>();

  const session = useQuery(api.sessions.get, { sessionId: sessionId as Id<"sessions"> });
  const players = useQuery(api.players.list, { sessionId: sessionId as Id<"sessions"> });
  const groups = useQuery(api.players.listGroups, { sessionId: sessionId as Id<"sessions"> });

  if (!session) return <D><p className="mono text-lg" style={{ color: "var(--display-muted)" }}>Loading…</p></D>;

  const joinUrl = `${window.location.origin}/join/${session.code}`;
  const status = session.status;

  // ── Lobby ────────────────────────────────────────────────────────────
  if (status === "lobby") {
    const roleCount = { "early-career": 0, "mid-career": 0, senior: 0 };
    players?.forEach((p) => { if (p.role in roleCount) roleCount[p.role as Role]++; });

    return (
      <D>
        <div className="flex flex-col items-center justify-center h-screen gap-12 px-16">
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest mono mb-3" style={{ color: "var(--display-muted)" }}>
              PPPM 494 — Age Matters
            </div>
            <h1 className="font-normal" style={{ fontFamily: "'EB Garamond', serif", color: "var(--display-text)", fontSize: "5rem", lineHeight: 1.05 }}>
              Generation Goggles
            </h1>
            <p className="text-2xl mt-2" style={{ color: "var(--display-muted)", fontFamily: "'EB Garamond', serif" }}>
              Scan to join and pick your character
            </p>
          </div>

          <div className="flex items-center gap-20">
            <div style={{ background: "white", borderRadius: "12px", padding: "16px" }}>
              <QRCodeSVG value={joinUrl} size={180} />
            </div>
            <div className="space-y-2">
              <div className="mono text-lg" style={{ color: "var(--display-muted)" }}>{window.location.host}/join/</div>
              <div className="mono font-semibold tracking-widest" style={{ color: "var(--display-text)", fontSize: "6rem", lineHeight: 1 }}>
                {session.code}
              </div>
            </div>
          </div>

          <div className="flex gap-10">
            {(["early-career", "mid-career", "senior"] as Role[]).map((r) => {
              const char = CHARACTERS[r];
              return (
                <div
                  key={r}
                  className="rounded-lg px-8 py-4 text-center"
                  style={{ background: "var(--display-surface)", border: "1px solid var(--display-border)", minWidth: "180px" }}
                >
                  <div className="text-xs uppercase tracking-widest mono mb-1" style={{ color: "var(--display-muted)" }}>
                    {r.replace("-", " ")}
                  </div>
                  <div style={{ fontFamily: "'EB Garamond', serif", color: "var(--display-text)", fontSize: "1.1rem" }}>
                    {char.roleLabel}
                  </div>
                  <div className="mono font-semibold mt-2" style={{ color: char.colorVar, fontSize: "3rem", lineHeight: 1 }}>
                    {roleCount[r]}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mono text-lg" style={{ color: "var(--display-muted)" }}>
            {players?.length ?? 0} participant{players?.length !== 1 ? "s" : ""} joined
          </div>
        </div>
      </D>
    );
  }

  // ── Groups ────────────────────────────────────────────────────────────
  if (status === "activity1-groups" || status === "activity1-move") {
    return (
      <D>
        <div className="flex flex-col items-center h-screen py-12 px-16 gap-8">
          <div className="text-center">
            <div className="text-xs uppercase tracking-widest mono mb-2" style={{ color: "var(--display-muted)" }}>
              {status === "activity1-move" ? "Find your group" : "Groups assigned"}
            </div>
            <h2 style={{ fontFamily: "'EB Garamond', serif", color: "var(--display-text)", fontSize: "3.5rem", lineHeight: 1, margin: 0 }}>
              {status === "activity1-move" ? "Move to your group now" : "Groups Assigned"}
            </h2>
            {status === "activity1-move" && (
              <p className="text-xl mt-2" style={{ color: "var(--display-muted)", fontFamily: "'EB Garamond', serif" }}>
                Check your phone for your character sheet and scenario
              </p>
            )}
          </div>

          <div className="grid gap-4 w-full" style={{ gridTemplateColumns: `repeat(${Math.min(groups?.length ?? 4, 4)}, 1fr)` }}>
            {groups?.map((g) => {
              const accent = GROUP_ACCENT_COLORS[(g.groupNumber - 1) % GROUP_ACCENT_COLORS.length];
              const scenario = SCENARIOS[g.scenarioId as keyof typeof SCENARIOS];
              const groupPlayers = players?.filter((p) => p.groupNumber === g.groupNumber) ?? [];
              return (
                <div
                  key={g._id}
                  className="rounded-lg overflow-hidden"
                  style={{ background: "var(--display-surface)", border: "1px solid var(--display-border)" }}
                >
                  <div className="px-4 py-2" style={{ borderBottom: `2px solid ${accent}` }}>
                    <div className="mono text-xs" style={{ color: accent }}>GROUP {g.groupNumber}</div>
                    <div style={{ color: "var(--display-text)", fontFamily: "'EB Garamond', serif", fontSize: "1.1rem" }}>
                      {scenario.title}
                    </div>
                  </div>
                  <div className="px-4 py-2 space-y-2">
                    {groupPlayers.map((p) => (
                      <div key={p._id} className="flex items-center gap-2">
                        <div style={{ width: 36, height: 36, flexShrink: 0 }}>
                          <FaceAvatar faceId={p.avatar as FaceId} size={36} />
                        </div>
                        <div>
                          <div className="text-sm font-medium" style={{ color: "var(--display-text)", fontFamily: "'EB Garamond', serif", lineHeight: 1.2 }}>{p.name}</div>
                          <div className="mono text-xs" style={{ color: "var(--display-muted)" }}>{p.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </D>
    );
  }

  // ── Round 1 ───────────────────────────────────────────────────────────
  if (status === "activity1-round1" && session.round1StartTime) {
    return (
      <D>
        <div className="flex flex-col items-center justify-center h-screen gap-8">
          <div className="text-center">
            <div className="mono text-sm uppercase tracking-widest mb-3" style={{ color: "var(--display-muted)" }}>Round 1 of 2</div>
            <h2 style={{ fontFamily: "'EB Garamond', serif", color: "var(--display-text)", fontSize: "4rem", margin: 0, fontWeight: 400 }}>
              Play it out naturally
            </h2>
            <p className="text-2xl mt-2" style={{ color: "var(--display-muted)", fontFamily: "'EB Garamond', serif" }}>
              Note the tensions that emerge but do not correct them yet
            </p>
          </div>
          <Timer startTime={session.round1StartTime} durationMs={5 * 60 * 1000} large />
        </div>
      </D>
    );
  }

  // ── Round 2 ───────────────────────────────────────────────────────────
  if (status === "activity1-round2" && session.round2StartTime) {
    return (
      <D>
        <div className="flex flex-col items-center justify-center h-screen gap-8">
          <div className="text-center">
            <div className="mono text-sm uppercase tracking-widest mb-3" style={{ color: "var(--display-muted)" }}>Round 2 of 2</div>
            <h2 style={{ fontFamily: "'EB Garamond', serif", color: "var(--display-text)", fontSize: "4rem", margin: 0, fontWeight: 400 }}>
              Intentional Communication
            </h2>
          </div>
          <Timer startTime={session.round2StartTime} durationMs={5 * 60 * 1000} large />
          <div
            className="grid grid-cols-4 gap-4 w-full max-w-4xl"
          >
            {[
              ["I-Statements", "Speak from your own experience, not assumptions about others"],
              ["Common Ground", "Find shared interests before stating differences"],
              ["Full Attention", "Let people finish completely before you speak"],
              ["All Voices", "Every person must speak at least once"],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-lg px-4 py-3 text-center"
                style={{ background: "var(--display-surface)", border: "1px solid var(--display-border)" }}
              >
                <div style={{ color: "var(--display-text)", fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", marginBottom: "4px" }}>{title}</div>
                <div className="text-xs" style={{ color: "var(--display-muted)" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </D>
    );
  }

  // ── Debrief ───────────────────────────────────────────────────────────
  if (status === "activity1-debrief") {
    return (
      <D>
        <div className="flex flex-col items-center h-screen py-16 px-16 gap-10">
          <div className="text-center">
            <div className="mono text-xs uppercase tracking-widest mb-2" style={{ color: "var(--display-muted)" }}>Whole-class discussion</div>
            <h2 style={{ fontFamily: "'EB Garamond', serif", color: "var(--display-text)", fontSize: "4rem", margin: 0, fontWeight: 400 }}>
              Debrief
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5 w-full max-w-4xl">
            {[
              ["Q1", "What assumptions did you make the first time?"],
              ["Q2", "Where did the conversation or compromise break down?"],
              ["Q3", "What changed between Round 1 and Round 2?"],
              ["Q4", "How can this apply in real settings for you or your workplace?"],
            ].map(([label, q]) => (
              <div
                key={label}
                className="rounded-lg px-6 py-5"
                style={{ background: "var(--display-surface)", border: "1px solid var(--display-border)" }}
              >
                <div className="mono text-xs mb-2" style={{ color: "var(--display-muted)" }}>{label}</div>
                <p style={{ color: "var(--display-text)", fontFamily: "'EB Garamond', serif", fontSize: "1.4rem", lineHeight: 1.4, margin: 0 }}>{q}</p>
              </div>
            ))}
          </div>
        </div>
      </D>
    );
  }

  return (
    <D>
      <div className="text-center space-y-3">
        <h2 style={{ fontFamily: "'EB Garamond', serif", color: "var(--display-text)", fontSize: "4rem", margin: 0, fontWeight: 400 }}>
          Session complete.
        </h2>
        <p className="text-2xl" style={{ color: "var(--display-muted)", fontFamily: "'EB Garamond', serif" }}>
          Thank you for participating.
        </p>
      </div>
    </D>
  );
}

function D({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--display-bg)" }}>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
