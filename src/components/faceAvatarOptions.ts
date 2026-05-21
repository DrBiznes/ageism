export type FaceId =
  | "early-a" | "early-b" | "early-c" | "early-d" | "early-e" | "early-f" | "early-g" | "early-h"
  | "mid-a"   | "mid-b"   | "mid-c"   | "mid-d"   | "mid-e"   | "mid-f"   | "mid-g"   | "mid-h"
  | "senior-a"| "senior-b"| "senior-c"| "senior-d"| "senior-e"| "senior-f"| "senior-g"| "senior-h";

export const ROLE_FACES: Record<string, FaceId[]> = {
  "early-career": ["early-a", "early-b", "early-e", "early-f", "early-c", "early-d", "early-g", "early-h"],
  "mid-career": ["mid-a", "mid-b", "mid-e", "mid-f", "mid-c", "mid-d", "mid-g", "mid-h"],
  senior: ["senior-a", "senior-b", "senior-e", "senior-f", "senior-c", "senior-d", "senior-g", "senior-h"],
};
