import { CHARACTERS, type Role } from "../data/characters";
import type { ScenarioRoleBrief } from "../data/scenarios";
import { FaceAvatar, type FaceId } from "./FaceAvatar";

interface CharacterSheetProps {
  role: Role;
  name: string;
  faceId: string;
  groupNumber?: number;
  scenarioTitle?: string;
  scenarioBrief?: ScenarioRoleBrief;
  showSecret?: boolean;
}

export function CharacterSheet({
  role,
  name,
  faceId,
  groupNumber,
  scenarioTitle,
  scenarioBrief,
  showSecret,
}: CharacterSheetProps) {
  const char = CHARACTERS[role];

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: "1.5px solid var(--border)", background: "white" }}
    >
      {/* Header strip */}
      <div
        className="px-4 py-2 flex items-center justify-between"
        style={{ background: char.bgVar, borderBottom: "1.5px solid var(--border)" }}
      >
        <div>
          <div className="text-xs uppercase tracking-widest" style={{ color: char.colorVar, fontFamily: "'IBM Plex Mono', monospace" }}>
            {role.replace("-", " ")}
          </div>
          <div className="text-lg font-semibold" style={{ color: char.colorVar, fontFamily: "'EB Garamond', serif" }}>
            {char.roleLabel}
          </div>
          <div className="text-xs" style={{ color: "var(--ink-muted)" }}>{char.ageRange}</div>
        </div>
        {groupNumber && (
          <div className="text-center ml-4">
            <div className="text-xs uppercase tracking-widest" style={{ color: "var(--ink-muted)", fontFamily: "'IBM Plex Mono', monospace" }}>Group</div>
            <div className="text-3xl font-bold" style={{ color: char.colorVar, fontFamily: "'EB Garamond', serif", lineHeight: 1 }}>{groupNumber}</div>
          </div>
        )}
      </div>

      {/* Face + name */}
      <div className="flex items-center gap-4 px-4 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <FaceAvatar faceId={faceId as FaceId} size={72} />
        <div>
          <div className="text-2xl font-semibold" style={{ fontFamily: "'EB Garamond', serif", color: "var(--ink)" }}>{name}</div>
          {scenarioTitle && (
            <div className="text-sm mt-0.5" style={{ color: "var(--ink-muted)" }}>Scenario: {scenarioTitle}</div>
          )}
        </div>
      </div>

      <div className="px-4 py-3 space-y-3">
        {/* Background */}
        <div>
          <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--ink-faint)", fontFamily: "'IBM Plex Mono', monospace" }}>Background</div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>{char.background}</p>
        </div>

        {scenarioBrief ? (
          <>
            <div>
              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--ink-faint)", fontFamily: "'IBM Plex Mono', monospace" }}>Roleplay focus</div>
              <div className="space-y-2">
                <BriefCard
                  label="Motivation"
                  text={scenarioBrief.motivation}
                  accent={char.colorVar}
                  emphasis
                />
                <BriefCard
                  label="Interaction cue"
                  text={scenarioBrief.interactionCue}
                  accent="var(--border-strong)"
                />
              </div>
            </div>

            {showSecret && (
              <div
                className="rounded p-3"
                style={{ background: "#fdf8e8", border: "1px solid #e0d080" }}
              >
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: "#8a7a10", fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  Hidden fear
                </div>
                <p className="text-sm italic leading-snug" style={{ color: "#5a5010" }}>{scenarioBrief.hiddenFear}</p>
              </div>
            )}
          </>
        ) : (
          <>
            <div>
              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--ink-faint)", fontFamily: "'IBM Plex Mono', monospace" }}>Objectives</div>
              <div className="space-y-2">
                {char.objectives.map((obj, i) => (
                  <div
                    key={i}
                    className="rounded p-3 flex gap-3"
                    style={{
                      background: obj.negotiable ? "var(--paper)" : "var(--accent-light)",
                      border: `1px solid ${obj.negotiable ? "var(--border)" : "#e8b0b0"}`,
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-2 mt-1 rounded-full self-stretch"
                      style={{ background: obj.negotiable ? "var(--border-strong)" : "var(--accent)" }}
                    />
                    <div>
                      <div
                        className="text-xs uppercase tracking-wide mb-0.5"
                        style={{
                          color: obj.negotiable ? "var(--ink-muted)" : "var(--accent)",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        {obj.negotiable ? "Open to compromise" : "Non-negotiable"}
                      </div>
                      <p className="text-sm leading-snug" style={{ color: "var(--ink)" }}>{obj.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {showSecret && (
              <div
                className="rounded p-3"
                style={{ background: "#fdf8e8", border: "1px solid #e0d080" }}
              >
                <div
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: "#8a7a10", fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  Only you know this
                </div>
                <p className="text-sm italic leading-snug" style={{ color: "#5a5010" }}>{char.hiddenDynamic}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function BriefCard({
  label,
  text,
  accent,
  emphasis,
}: {
  label: string;
  text: string;
  accent: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className="rounded p-3 flex gap-3"
      style={{
        background: emphasis ? "var(--accent-light)" : "var(--paper)",
        border: `1px solid ${emphasis ? "#e8b0b0" : "var(--border)"}`,
      }}
    >
      <div
        className="flex-shrink-0 w-2 mt-1 rounded-full self-stretch"
        style={{ background: accent }}
      />
      <div>
        <div
          className="text-xs uppercase tracking-wide mb-0.5"
          style={{
            color: emphasis ? "var(--accent)" : "var(--ink-muted)",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {label}
        </div>
        <p className="text-sm leading-snug" style={{ color: "var(--ink)" }}>{text}</p>
      </div>
    </div>
  );
}
