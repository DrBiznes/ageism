import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { CharacterSheet } from "../components/CharacterSheet";
import { AvatarPicker } from "../components/AvatarPicker";
import { SCENARIOS } from "../data/scenarios";
import { CHARACTERS, type Role } from "../data/characters";
import { ROLE_FACES, type FaceId } from "../components/FaceAvatar";

const MAX_GROUPS = 5;

// Keep in sync with determineRole in convex/players.ts.
function determineRole(joinerIndex: number): Role {
  if (joinerIndex < MAX_GROUPS) return "senior";
  const slot = Math.floor((joinerIndex - MAX_GROUPS) / MAX_GROUPS);
  if (slot < 2) return "early-career";
  return slot % 2 === 0 ? "mid-career" : "early-career";
}

function getOrCreateToken(): string {
  let token = localStorage.getItem("gg_token");
  if (!token) {
    token = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("gg_token", token);
  }
  return token;
}

export function PlayerPage() {
  const { code } = useParams<{ code: string }>();
  const joinToken = getOrCreateToken();

  const session = useQuery(api.sessions.getByCode, { code: code ?? "" });
  const player = useQuery(
    api.players.getByToken,
    session ? { joinToken, sessionId: session._id } : "skip"
  );
  const groups = useQuery(api.players.listGroups, session ? { sessionId: session._id } : "skip");
  const players = useQuery(api.players.list, session ? { sessionId: session._id } : "skip");

  const joinMutation = useMutation(api.players.join);

  const [name, setName] = useState("");
  const [faceId, setFaceId] = useState("");
  const [joining, setJoining] = useState(false);
  const [previewRole, setPreviewRole] = useState<Role | null>(null);

  // Lock the preview role the first time players loads — never shifts as others join
  useEffect(() => {
    if (previewRole !== null || players === undefined) return;
    setPreviewRole(determineRole(players.length));
  }, [players]);

  // Seed default face once role is known
  useEffect(() => {
    if (previewRole && !faceId) setFaceId(ROLE_FACES[previewRole][0]);
  }, [previewRole]);

  if (session === undefined) return <Page><Centered><p className="text-base" style={{ color: "var(--ink-muted)" }}>Connecting…</p></Centered></Page>;
  if (session === null) return <Page><Centered><p style={{ color: "var(--accent)" }}>Session "{code}" not found.</p></Centered></Page>;

  const sessionId = session._id;
  const status = session.status;

  // ── Not yet joined ───────────────────────────────────────────────────
  if (!player) {
    if (previewRole === null) {
      return <Page><Centered><p className="mono text-sm" style={{ color: "var(--ink-faint)" }}>Loading…</p></Centered></Page>;
    }
    const char = CHARACTERS[previewRole];
    const currentFace = (faceId || ROLE_FACES[previewRole][0]) as FaceId;

    async function handleJoin(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (!name.trim()) return;
      setJoining(true);
      await joinMutation({ sessionId, name: name.trim(), avatar: currentFace, joinToken });
      setJoining(false);
    }

    return (
      <Page>
        <div className="w-full max-w-sm mx-auto space-y-6 py-6">
          <div>
            <div className="text-xs uppercase tracking-widest mono mb-1" style={{ color: "var(--ink-faint)" }}>
              Your assigned role
            </div>
            <div
              className="rounded-lg p-4"
              style={{ background: char.bgVar, border: "1.5px solid var(--border)" }}
            >
              <div className="text-xs uppercase tracking-widest mono mb-0.5" style={{ color: char.colorVar }}>
                {previewRole.replace("-", " ")}
              </div>
              <div className="text-xl font-semibold" style={{ color: char.colorVar }}>{char.roleLabel}</div>
              <div className="text-sm mt-1" style={{ color: "var(--ink-muted)" }}>{char.ageRange} — {char.background.slice(0, 80)}…</div>
            </div>
          </div>

          <form onSubmit={handleJoin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest mono mb-2" style={{ color: "var(--ink-faint)" }}>
                Choose your face
              </label>
              <AvatarPicker role={previewRole} selected={currentFace} onSelect={setFaceId} />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mono mb-2" style={{ color: "var(--ink-faint)" }}>
                Character name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={`e.g. ${char.nameSuggestions[0]}`}
                maxLength={30}
                className="w-full py-3 px-4 text-lg outline-none"
                style={{
                  background: "white", borderRadius: "6px", color: "var(--ink)",
                  border: "1.5px solid var(--border)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--ink)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {char.nameSuggestions.slice(0, 8).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setName(n)}
                    className="text-xs px-3 py-1 rounded transition-colors"
                    style={{
                      background: name === n ? "var(--ink)" : "var(--cream)",
                      color: name === n ? "var(--paper)" : "var(--ink-muted)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!name.trim() || joining}
              className="w-full py-3 px-5 text-base font-medium transition-all"
              style={{
                background: name.trim() ? "var(--ink)" : "var(--cream)",
                color: name.trim() ? "var(--paper)" : "var(--ink-faint)",
                borderRadius: "6px",
              }}
            >
              {joining ? "Joining…" : `Join as ${name || "…"}`}
            </button>
          </form>
        </div>
      </Page>
    );
  }

  const role = player.role as Role;
  const char = CHARACTERS[role];
  const myGroup = groups?.find((g) => g.groupNumber === player.groupNumber);

  // ── Lobby ───────────────────────────────────────────────────────────
  if (status === "lobby") {
    return (
      <Page>
        <Centered>
          <div className="text-center space-y-4 w-full max-w-xs mx-auto">
            <div className="text-xs uppercase tracking-widest mono" style={{ color: "var(--ink-faint)" }}>
              You're in
            </div>
            <div className="text-3xl font-semibold" style={{ fontFamily: "'EB Garamond', serif" }}>{player.name}</div>
            <div
              className="inline-block px-3 py-1 rounded text-sm"
              style={{ background: char.bgVar, color: char.colorVar, border: "1px solid var(--border)" }}
            >
              {char.roleLabel}
            </div>
            <div
              className="rounded-lg p-4 text-sm"
              style={{ background: "var(--cream)", border: "1px solid var(--border)", color: "var(--ink-muted)" }}
            >
              Waiting for the facilitator to begin…
              <div className="mono text-xs mt-1" style={{ color: "var(--ink-faint)" }}>
                {players?.length ?? 0} participant{players?.length !== 1 ? "s" : ""} joined
              </div>
            </div>
          </div>
        </Centered>
      </Page>
    );
  }

  // ── Groups revealed / Move ──────────────────────────────────────────
  if (status === "activity1-groups" || status === "activity1-move") {
    if (!player.groupNumber || !myGroup) {
      return <Page><Centered><p className="mono text-sm" style={{ color: "var(--ink-faint)" }}>Assigning groups…</p></Centered></Page>;
    }

    const scenario = SCENARIOS[myGroup.scenarioId as keyof typeof SCENARIOS];
    const teammates = players?.filter((p) => p.groupNumber === player.groupNumber && p._id !== player._id) ?? [];

    return (
      <Page>
        <div className="w-full max-w-sm mx-auto space-y-4 py-6">
          {status === "activity1-move" && (
            <div
              className="rounded-lg px-4 py-3 text-center"
              style={{ background: "var(--ink)", color: "var(--paper)" }}
            >
              <div className="text-xs uppercase tracking-widest mono mb-1" style={{ color: "var(--ink-faint)" }}>Action required</div>
              <div className="text-lg font-semibold">Find Group {player.groupNumber} and gather together</div>
            </div>
          )}

          <CharacterSheet
            role={role}
            name={player.name}
            faceId={player.avatar}
            groupNumber={player.groupNumber}
            scenarioTitle={scenario.title}
            showSecret
          />

          {teammates.length > 0 && (
            <div style={{ border: "1.5px solid var(--border)", borderRadius: "6px", background: "white" }}>
              <div className="px-4 py-2 text-xs uppercase tracking-widest mono" style={{ color: "var(--ink-faint)", borderBottom: "1px solid var(--border)" }}>
                Your teammates
              </div>
              <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                {teammates.map((t) => {
                  const tc = CHARACTERS[t.role as Role];
                  return (
                    <div key={t._id} className="flex items-center gap-3 px-4 py-2">
                      <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>{t.name}</span>
                      <span className="text-xs mono ml-auto" style={{ color: tc.colorVar }}>{tc.roleLabel}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Page>
    );
  }

  // ── Rounds ──────────────────────────────────────────────────────────
  if (status === "activity1-round1" || status === "activity1-round2") {
    const round = status === "activity1-round1" ? 1 : 2;
    const scenario = myGroup ? SCENARIOS[myGroup.scenarioId as keyof typeof SCENARIOS] : null;

    return (
      <Page>
        <div className="w-full max-w-sm mx-auto space-y-4 py-6">
          <div
            className="rounded px-3 py-2 text-center text-xs uppercase tracking-widest mono"
            style={{
              background: round === 1 ? "var(--cream)" : "#eef3f9",
              color: round === 1 ? "var(--ink-muted)" : "var(--role-early)",
              border: `1px solid ${round === 1 ? "var(--border)" : "#c0d0e8"}`,
            }}
          >
            Round {round} — {round === 1 ? "Play it out naturally" : "Intentional communication"}
          </div>

          {round === 2 && (
            <div style={{ background: "#eef3f9", border: "1.5px solid #c0d0e8", borderRadius: "6px", padding: "12px 16px" }}>
              <div className="text-xs uppercase tracking-widest mono mb-2" style={{ color: "var(--role-early)" }}>Communication tools</div>
              <ul className="text-sm space-y-1" style={{ color: "var(--ink-muted)" }}>
                <li>Use "I" statements</li>
                <li>Align on common interests first</li>
                <li>Let people finish before speaking</li>
                <li>Everyone must speak at least once</li>
              </ul>
            </div>
          )}

          {scenario && (
            <div style={{ background: "var(--accent-light)", border: "1.5px solid #e8b0b0", borderRadius: "6px", padding: "12px 16px" }}>
              <div className="text-xs uppercase tracking-widest mono mb-1" style={{ color: "var(--accent)" }}>Your scenario</div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{scenario.incident}</p>
              <p className="text-xs italic mt-2" style={{ color: "var(--ink-muted)" }}>{scenario.goal}</p>
            </div>
          )}

          <CharacterSheet role={role} name={player.name} faceId={player.avatar} showSecret={round === 1} />
        </div>
      </Page>
    );
  }

  // ── Debrief ─────────────────────────────────────────────────────────
  if (status === "activity1-debrief") {
    return (
      <Page>
        <div className="w-full max-w-sm mx-auto py-6 space-y-4">
          <h2 className="text-3xl font-semibold" style={{ fontFamily: "'EB Garamond', serif" }}>Debrief</h2>
          <div className="space-y-3">
            {[
              "What assumptions did you make the first time?",
              "Where did the conversation or compromise break down?",
              "What changed between Round 1 and Round 2?",
              "How can this apply in real settings for you or your workplace?",
            ].map((q, i) => (
              <div key={i} style={{ border: "1.5px solid var(--border)", borderRadius: "6px", background: "white", padding: "12px 16px" }}>
                <div className="text-xs mono mb-1" style={{ color: "var(--ink-faint)" }}>Q{i + 1}</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{q}</p>
              </div>
            ))}
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <Centered>
        <div className="text-center space-y-2">
          <div className="text-3xl font-semibold" style={{ fontFamily: "'EB Garamond', serif" }}>Session complete.</div>
          <p style={{ color: "var(--ink-muted)" }}>Thanks for participating, {player.name}.</p>
        </div>
      </Centered>
    </Page>
  );
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-4 py-4" style={{ background: "var(--paper)" }}>
      {children}
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center">{children}</div>
  );
}
