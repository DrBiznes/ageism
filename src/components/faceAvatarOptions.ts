export type FaceId =
  | "early-a" | "early-b" | "early-c" | "early-d" | "early-e" | "early-f" | "early-g" | "early-h"
  | "mid-a"   | "mid-b"   | "mid-c"   | "mid-d"   | "mid-e"   | "mid-f"   | "mid-g"   | "mid-h"
  | "senior-a"| "senior-b"| "senior-c"| "senior-d"| "senior-e"| "senior-f"| "senior-g"| "senior-h";

export type GenderOption = "male" | "female";

export const ROLE_FACES: Record<string, FaceId[]> = {
  "early-career": ["early-a", "early-c", "early-e", "early-g", "early-b", "early-d", "early-f", "early-h"],
  "mid-career": ["mid-a", "mid-c", "mid-e", "mid-g", "mid-b", "mid-d", "mid-f", "mid-h"],
  senior: ["senior-a", "senior-c", "senior-e", "senior-g", "senior-b", "senior-d", "senior-f", "senior-h"],
};

export const FACE_GENDER: Record<FaceId, GenderOption> = {
  "early-a": "male", "early-c": "male", "early-e": "male", "early-g": "male",
  "early-b": "female", "early-d": "female", "early-f": "female", "early-h": "female",
  "mid-a": "male", "mid-c": "male", "mid-e": "male", "mid-g": "male",
  "mid-b": "female", "mid-d": "female", "mid-f": "female", "mid-h": "female",
  "senior-a": "male", "senior-c": "male", "senior-e": "male", "senior-g": "male",
  "senior-b": "female", "senior-d": "female", "senior-f": "female", "senior-h": "female",
};
