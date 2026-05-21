import type { Role } from "./characters";

export type ScenarioId = "A" | "B" | "C" | "D" | "E";

export interface ScenarioRoleBrief {
  motivation: string;
  hiddenFear: string;
  interactionCue: string;
}

export interface Scenario {
  id: ScenarioId;
  title: string;
  emoji: string;
  setup: string;
  incident: string;
  goal: string;
  roleBriefs: Record<Role, ScenarioRoleBrief>;
}

export const SCENARIOS: Record<ScenarioId, Scenario> = {
  A: {
    id: "A",
    title: "AI Grant Writing",
    emoji: "🤖",
    setup: "Your nonprofit team is preparing a major grant proposal with a deadline later this week.",
    incident:
      "The early-career coordinator used an AI tool to draft a strong first version of the proposal. The senior board chair worries the draft sounds generic and risks the organization's trusted voice. The mid-career director sees both the time savings and the need for clear standards.",
    goal: "Discuss how the team should handle speed, ethics, trust, and organizational voice.",
    roleBriefs: {
      "early-career": {
        motivation:
          "You want the team to recognize that new tools can free staff time for relationship-building and community work.",
        hiddenFear:
          "You worry that if people reject the AI draft, they are really rejecting your judgment because you are younger.",
        interactionCue:
          "Push for experimentation, but notice when your confidence starts to sound like impatience with older colleagues.",
      },
      "mid-career": {
        motivation:
          "You want a practical process: use the draft if it helps, but add human review, donor context, and quality checks.",
        hiddenFear:
          "You are afraid of becoming the person who has to clean up everyone else's risk-taking without getting credit.",
        interactionCue:
          "Translate concerns into workable guardrails without taking ownership away from either side.",
      },
      senior: {
        motivation:
          "You want to protect the organization's credibility, voice, and long-standing donor relationships.",
        hiddenFear:
          "You worry that your experience is being treated as fear of technology instead of care for the organization.",
        interactionCue:
          "Raise real concerns about trust and reputation without dismissing the younger staff member's competence.",
      },
    },
  },
  B: {
    id: "B",
    title: "Hybrid Work Policy",
    emoji: "🏠",
    setup: "Your nonprofit team is revisiting its work policy after several staff members requested more flexibility.",
    incident:
      "Early-career staff want a formal hybrid policy. The senior board chair believes in-person work builds trust, mentorship, and commitment. The mid-career director is managing performance expectations while also juggling caregiving and burnout across the team.",
    goal: "Talk through what fairness, accountability, mentorship, and flexibility should mean across life stages.",
    roleBriefs: {
      "early-career": {
        motivation:
          "You want flexibility treated as a normal professional need, not as proof that younger workers lack commitment.",
        hiddenFear:
          "You worry that asking for hybrid work will confirm stereotypes that people your age are entitled or less serious.",
        interactionCue:
          "Speak from concrete needs and outcomes, not just preference, and resist making older colleagues sound outdated.",
      },
      "mid-career": {
        motivation:
          "You want a policy that is measurable, fair, and realistic for staff with different home and caregiving demands.",
        hiddenFear:
          "You are stretched thin and afraid both sides will assume you can absorb whatever policy gaps remain.",
        interactionCue:
          "Name tradeoffs clearly and invite both sides to define accountability beyond physical presence.",
      },
      senior: {
        motivation:
          "You want to preserve mentorship, team cohesion, and the informal learning that happens when people share space.",
        hiddenFear:
          "You worry that the workplace culture you helped build is being reduced to an obstacle.",
        interactionCue:
          "Defend the value of presence while staying curious about needs you may not have had at the same career stage.",
      },
    },
  },
  C: {
    id: "C",
    title: "Grant Demographics Language",
    emoji: "📊",
    setup: "Your team is reviewing demographic language for an upcoming grant report.",
    incident:
      'The senior board chair reads from an older template that uses the phrase "colored families." The room tightens. The early-career coordinator is unsure how directly to respond, and the mid-career director needs the report finished without ignoring the harm or embarrassing anyone.',
    goal: "Discuss how to repair the moment, update the language, and keep the grant work moving.",
    roleBriefs: {
      "early-career": {
        motivation:
          "You want the organization to use respectful language and stop treating outdated wording as a minor detail.",
        hiddenFear:
          "You are afraid that speaking up will make you seem oversensitive or disrespectful to senior leadership.",
        interactionCue:
          "Address the impact directly, but try not to turn the conversation into a public trial of one person.",
      },
      "mid-career": {
        motivation:
          "You want to repair the language, preserve working relationships, and make sure the final report is credible.",
        hiddenFear:
          "You worry that if you soften the moment, younger staff will see you as complicit; if you confront it, senior leaders will see you as disloyal.",
        interactionCue:
          "Slow the room down, separate intent from impact, and invite a concrete revision path.",
      },
      senior: {
        motivation:
          "You want the team to understand you were using an old document, not trying to disrespect the community.",
        hiddenFear:
          "You worry one mistake will make people see you as prejudiced, irrelevant, or unable to adapt.",
        interactionCue:
          "Avoid defensiveness and show whether you can learn without making others comfort you first.",
      },
    },
  },
  D: {
    id: "D",
    title: "Board Recruitment",
    emoji: "🪑",
    setup: "Your organization is trying to recruit new board members before the next fiscal year.",
    incident:
      "The early-career coordinator proposes adding younger community members to the board. The senior board chair questions whether they have the networks, experience, or donation capacity to govern effectively. The mid-career director sees a chance to widen leadership but worries about tokenizing young recruits.",
    goal: "Explore who gets seen as legitimate leadership and what board contribution should count.",
    roleBriefs: {
      "early-career": {
        motivation:
          "You want younger community members to have real power, not just advisory roles or photo-op representation.",
        hiddenFear:
          "You worry the board will never see people your age as ready unless they already have wealth and status.",
        interactionCue:
          "Challenge gatekeeping, but be ready to define what support new board members would need to succeed.",
      },
      "mid-career": {
        motivation:
          "You want a recruitment model that expands access while preparing board members for real responsibilities.",
        hiddenFear:
          "You fear being stuck between symbolic inclusion and board expectations that were built for wealthier people.",
        interactionCue:
          "Ask what the organization actually needs from governance and which expectations are traditions, not necessities.",
      },
      senior: {
        motivation:
          "You want a board that can protect the organization financially and make serious long-term decisions.",
        hiddenFear:
          "You worry that hard-earned governance experience is being dismissed as elitism or age bias.",
        interactionCue:
          "Test ideas for readiness without assuming age, income, or old networks are the only signs of leadership.",
      },
    },
  },
  E: {
    id: "E",
    title: "Gala vs. Mutual Aid",
    emoji: "🎟️",
    setup: "Your team is deciding how to focus its biggest fundraising push this year.",
    incident:
      "The annual gala reliably brings in major gifts, but younger staff argue it feels disconnected from the community. They propose shifting energy toward a mutual aid campaign. The senior board chair sees the gala as a trusted tradition and a major revenue source. The mid-career director is trying to protect both community trust and the budget.",
    goal: "Discuss tradition, donor power, community trust, and financial risk without reducing any side to a stereotype.",
    roleBriefs: {
      "early-career": {
        motivation:
          "You want fundraising to reflect community dignity and participation, not just access to wealthy donors.",
        hiddenFear:
          "You worry that if money wins every argument, younger staff and community members are only being asked to decorate old systems.",
        interactionCue:
          "Push for a values-based shift while acknowledging the real fear of losing program funding.",
      },
      "mid-career": {
        motivation:
          "You want to protect revenue while making the organization's fundraising feel more accountable to the community.",
        hiddenFear:
          "You are afraid any compromise will be read as cowardice by younger staff and recklessness by the board.",
        interactionCue:
          "Keep both values and numbers in the room, and watch for moments when you minimize someone's concern to move faster.",
      },
      senior: {
        motivation:
          "You want to preserve a fundraising tradition that has kept programs alive and built donor trust for years.",
        hiddenFear:
          "You worry that people see your loyalty to the gala as nostalgia instead of responsibility.",
        interactionCue:
          "Explain the stakes behind tradition while listening for how the event may land with people outside the donor circle.",
      },
    },
  },
};

export const GROUP_COLORS: Record<number, { bg: string; text: string; border: string; emoji: string }> = {
  1: { bg: "bg-red-100",    text: "text-red-700",    border: "border-red-300",    emoji: "🔴" },
  2: { bg: "bg-blue-100",   text: "text-blue-700",   border: "border-blue-300",   emoji: "🔵" },
  3: { bg: "bg-green-100",  text: "text-green-700",  border: "border-green-300",  emoji: "🟢" },
  4: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300", emoji: "🟡" },
  5: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300", emoji: "🟣" },
  6: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300", emoji: "🟠" },
  7: { bg: "bg-pink-100",   text: "text-pink-700",   border: "border-pink-300",   emoji: "🩷" },
  8: { bg: "bg-teal-100",   text: "text-teal-700",   border: "border-teal-300",   emoji: "🩵" },
};
