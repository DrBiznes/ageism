export type ScenarioId = "A" | "B" | "C" | "D" | "E";

export interface Scenario {
  id: ScenarioId;
  title: string;
  emoji: string;
  setup: string;
  incident: string;
  goal: string;
}

export const SCENARIOS: Record<ScenarioId, Scenario> = {
  A: {
    id: "A",
    title: "No Cap, That's Fire",
    emoji: "🔥",
    setup: "Your nonprofit team is in a staff meeting planning a new youth outreach program.",
    incident:
      'Alex (early-career) pitches the concept: "It\'s lowkey fire, no cap this would slay — it\'s giving exactly what the community needs." Patricia interrupts: "I\'m sorry, I need you to speak professionally. I have no idea what you\'re saying."',
    goal: "Figure out how to move the planning forward despite the communication breakdown.",
  },
  B: {
    id: "B",
    title: "The Colored Comment",
    emoji: "📊",
    setup: "Your team is reviewing demographic data for an upcoming grant report.",
    incident:
      'Patricia (senior) presents program statistics and refers to a client population using an outdated term — "colored families." Sam visibly stiffens. Alex has never heard the term and isn\'t sure if it\'s offensive. Patricia doesn\'t realize anything is wrong and continues presenting.',
    goal: "Address what just happened and finish the grant report discussion.",
  },
  C: {
    id: "C",
    title: "OK Boomer",
    emoji: "💬",
    setup: "Your team is debating whether to adopt a new project management app.",
    incident:
      'The conversation gets tense as Patricia pushes back on the new tool. Alex, frustrated, mutters "ok boomer" under her breath. Patricia hears it and is genuinely stung but doesn\'t say so directly. Sam is caught between validating Patricia\'s hurt and defending Alex\'s frustration.',
    goal: "Get back on track and make a decision about the tool.",
  },
  D: {
    id: "D",
    title: "The Girls",
    emoji: "🙅",
    setup: "Your team is organizing logistics for the annual fundraising gala.",
    incident:
      'Patricia says, "I\'ll have my girls handle the table arrangements," referring to Alex and other younger female staff. Alex feels infantilized but isn\'t sure if she\'s overreacting. Sam notices but doesn\'t know whether to address it in the group or stay quiet.',
    goal: "Continue planning the gala while navigating what just happened.",
  },
  E: {
    id: "E",
    title: "Tech Speak",
    emoji: "📱",
    setup: "Your team is meeting to discuss a new social media strategy.",
    incident:
      'Alex presents a plan using terms like "shadowbanning," "algorithm farming," and "going viral organically." Patricia asks what shadowbanning means. Alex explains — but frames it in a way that accidentally implies older people can\'t understand social media. Patricia bristles. Sam tries to translate.',
    goal: "Align on a social media strategy everyone can support.",
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
