export type Role = "early-career" | "mid-career" | "senior";

export interface Objective {
  text: string;
  negotiable: boolean;
}

export interface CharacterData {
  roleLabel: string;
  ageRange: string;
  colorVar: string;
  bgVar: string;
  background: string;
  objectives: Objective[];
  hiddenDynamic: string;
  nameSuggestions: string[];
}

export const CHARACTERS: Record<Role, CharacterData> = {
  "early-career": {
    roleLabel: "Early-Career Program Coordinator",
    ageRange: "Mid-20s",
    colorVar: "var(--role-early)",
    bgVar: "var(--role-early-bg)",
    background:
      "You joined 18 months ago — first-generation college grad, digital native. You have great ideas but often feel dismissed before you finish a sentence.",
    objectives: [
      {
        text: 'Launch an Instagram/TikTok outreach strategy. "We\'re invisible to anyone under 40."',
        negotiable: false,
      },
      {
        text: "Establish a formal hybrid/remote work policy for the organization.",
        negotiable: true,
      },
    ],
    hiddenDynamic:
      "You sometimes over-explain your ideas to sound more credible. You're anxious about not being taken seriously — and it shows.",
    nameSuggestions: [
      "Zephyr", "Aiden", "Brayden", "Madison", "Skyler",
      "Jayden", "Bryce", "Chloe", "Ayla", "Tyler",
      "Kai", "Nova", "River", "Sage", "Quinn",
    ],
  },

  "mid-career": {
    roleLabel: "Mid-Career Development Director",
    ageRange: "Late 30s",
    colorVar: "var(--role-mid)",
    bgVar: "var(--role-mid-bg)",
    background:
      "You've been in nonprofits for 10 years. Data-driven bridge-builder, frustrated by both ends of the generational divide. People come to you to translate.",
    objectives: [
      {
        text: "Any new initiative must run a 90-day pilot with measurable metrics before full rollout.",
        negotiable: false,
      },
      {
        text: "Expand the professional development budget equally for all staff levels.",
        negotiable: true,
      },
    ],
    hiddenDynamic:
      "You sometimes 'translate' younger colleagues' ideas to senior leadership in ways that subtly reframe them — you don't realize this is itself a form of age bias.",
    nameSuggestions: [
      "Jennifer", "Todd", "Karen", "Brian", "Stacy",
      "Michael", "Ashley", "Kevin", "Rachel", "Mark",
      "Dana", "Chris", "Morgan", "Jamie", "Alex",
    ],
  },

  senior: {
    roleLabel: "Senior Board Chair",
    ageRange: "Early 60s",
    colorVar: "var(--role-senior)",
    bgVar: "var(--role-senior-bg)",
    background:
      "You co-founded this organization 25 years ago. Deep donor relationships built over decades. You believe in institutional memory and earned authority.",
    objectives: [
      {
        text: "Preserve the annual gala. It generates 38% of annual revenue and is a 20-year tradition.",
        negotiable: false,
      },
      {
        text: "Require that the founding executive director (your longtime peer) be consulted on decisions above $5,000.",
        negotiable: true,
      },
    ],
    hiddenDynamic:
      "You sometimes say things like 'when you've been around as long as I have...' without noticing that it shuts the conversation down.",
    nameSuggestions: [
      "Dorothy", "Walter", "Gertrude", "Eugene", "Mildred",
      "Harold", "Ethel", "Bernard", "Phyllis", "Mortimer",
      "Dolores", "Clarence", "Beatrice", "Reginald", "Constance",
    ],
  },
};

export const ROLE_ORDER: Role[] = ["early-career", "mid-career", "senior"];
