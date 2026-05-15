import { FaceAvatar, ROLE_FACES, type FaceId } from "./FaceAvatar";
import type { Role } from "../data/characters";

interface AvatarPickerProps {
  role: Role;
  selected: string;
  onSelect: (faceId: string) => void;
}

export function AvatarPicker({ role, selected, onSelect }: AvatarPickerProps) {
  const faces = ROLE_FACES[role] as FaceId[];

  return (
    <div className="grid grid-cols-4 gap-3">
      {faces.map((faceId) => (
        <button
          key={faceId}
          type="button"
          onClick={() => onSelect(faceId)}
          className="relative rounded-lg overflow-hidden transition-all"
          style={{
            background: selected === faceId ? "var(--cream)" : "var(--paper)",
            border: selected === faceId ? "2px solid var(--ink)" : "2px solid var(--border)",
            transform: selected === faceId ? "scale(1.06)" : "scale(1)",
            boxShadow: selected === faceId ? "0 4px 12px rgba(24,21,15,0.15)" : "none",
          }}
        >
          <FaceAvatar faceId={faceId} size={72} />
          {selected === faceId && (
            <div
              className="absolute bottom-0 left-0 right-0 py-0.5 text-center"
              style={{
                background: "var(--ink)",
                color: "var(--paper)",
                fontSize: "8px",
                letterSpacing: "0.12em",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              SELECTED
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
