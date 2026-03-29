export const earlyAccessAudienceValues = ["pilot", "developer"] as const;

export type EarlyAccessAudience = (typeof earlyAccessAudienceValues)[number];

export const earlyAccessFleetValues = [
  "dji",
  "autel",
  "parrot",
  "skydio",
  "px4",
  "ardupilot",
  "inav",
  "mixed-fleet",
  "other",
] as const;

export type EarlyAccessFleet = (typeof earlyAccessFleetValues)[number];

export const earlyAccessFleetOptions: ReadonlyArray<{
  label: string;
  value: EarlyAccessFleet;
}> = [
  { label: "DJI", value: "dji" },
  { label: "Autel", value: "autel" },
  { label: "Parrot", value: "parrot" },
  { label: "Skydio", value: "skydio" },
  { label: "PX4", value: "px4" },
  { label: "ArduPilot", value: "ardupilot" },
  { label: "INAV", value: "inav" },
  { label: "Mixed fleet", value: "mixed-fleet" },
  { label: "Other", value: "other" },
] as const;

export const pilotPainPointValues = [
  "manual-setup-before-flight",
  "software-does-not-fit-workflow",
  "hard-to-connect-data",
  "repeatable-workflows-across-missions",
  "pilot-other",
] as const;

export type PilotPainPoint = (typeof pilotPainPointValues)[number];

export const developerPainPointValues = [
  "new-hardware-too-much-rework",
  "control-stacks-too-fragmented",
  "deployment-and-packaging-are-brittle",
  "telemetry-and-data-integration-are-inconsistent",
  "developer-other",
] as const;

export type DeveloperPainPoint = (typeof developerPainPointValues)[number];

export type EarlyAccessPainPoint = PilotPainPoint | DeveloperPainPoint;

type AudienceContent = {
  ctaLabel: string;
  formDescription: string;
  heading: string;
  homeTitle: string;
  intro: string;
  kicker: string;
  submitLabel: string;
  successBody: string;
  successTitle: string;
  supportCopy: string;
  textareaPlaceholder: string;
};

type PainPointOption = {
  audience: EarlyAccessAudience;
  label: string;
  value: EarlyAccessPainPoint;
};

export const betaAccessAudienceContent: Record<EarlyAccessAudience, AudienceContent> = {
  pilot: {
    ctaLabel: "Pilot access",
    formDescription:
      "Tell us which fleets you already fly, where the friction shows up, and why you want early access.",
    heading: "Pilot beta access",
    homeTitle: "For pilot teams",
    intro:
      "Five fields. Two minutes. Enough for us to understand your current setup and workflow pressure.",
    kicker: "Pilot path",
    submitLabel: "Request pilot access",
    successBody:
      "We will review your current setup and pain points, then follow up if Cirro looks like a strong fit for your team.",
    successTitle: "Pilot beta request received",
    supportCopy:
      "Access a universe of software with your current setup. No configuration required.",
    textareaPlaceholder:
      "Tell us what workflow you want to unlock with Cirro and where your current tooling slows you down.",
  },
  developer: {
    ctaLabel: "Developer access",
    formDescription:
      "Tell us which fleets you need to reach, where compatibility hurts, and why this beta matters to your software roadmap.",
    heading: "Developer beta access",
    homeTitle: "For software teams",
    intro:
      "Five fields. Two minutes. Enough for us to understand your target hardware and deployment pressure.",
    kicker: "Developer path",
    submitLabel: "Request developer access",
    successBody:
      "We will review the hardware reach and integration pressure behind your request, then follow up if Cirro looks like a strong fit.",
    successTitle: "Developer beta request received",
    supportCopy:
      "Allow your software to reach entirely new hardware with minimal changes.",
    textareaPlaceholder:
      "Tell us what software you want to ship, what hardware you need to support, and where the current process breaks down.",
  },
};

export const genericBetaAccessContent = {
  formDescription:
    "Tell us what you are flying or building, where the friction is, and why you want in.",
  heading: "Join the Cirro beta",
  intro: "This takes about two minutes. Choose one role or both and we will route it from there.",
  kicker: "Beta access",
  submitLabel: "Request beta access",
  supportCopy:
    "Bring your current setup, your biggest pain point, and the reason you want access now.",
  successBody:
    "We will review the pilot and developer context behind your request, then follow up if Cirro looks like a strong fit.",
  successTitle: "Beta request received",
  textareaPlaceholder:
    "Tell us what you want to unlock with Cirro and where your current setup or software path is slowing you down.",
} as const;

export const earlyAccessAudienceOptions: ReadonlyArray<{
  description: string;
  label: string;
  value: EarlyAccessAudience;
}> = [
  {
    description: "I fly missions and want better software on my current drone setup.",
    label: "Pilot",
    value: "pilot",
  },
  {
    description: "I build software and want it to reach more drone hardware.",
    label: "Developer",
    value: "developer",
  },
] as const;

const pilotPainPointOptions: readonly PainPointOption[] = [
  {
    audience: "pilot",
    label: "Too much manual setup before flight",
    value: "manual-setup-before-flight",
  },
  {
    audience: "pilot",
    label: "Current software does not fit my workflow",
    value: "software-does-not-fit-workflow",
  },
  {
    audience: "pilot",
    label: "Hard to connect drone data into my tools",
    value: "hard-to-connect-data",
  },
  {
    audience: "pilot",
    label: "I need repeatable workflows across missions",
    value: "repeatable-workflows-across-missions",
  },
  {
    audience: "pilot",
    label: "Other",
    value: "pilot-other",
  },
] as const;

const developerPainPointOptions: readonly PainPointOption[] = [
  {
    audience: "developer",
    label: "Supporting new hardware takes too much rework",
    value: "new-hardware-too-much-rework",
  },
  {
    audience: "developer",
    label: "Drone control stacks are too fragmented",
    value: "control-stacks-too-fragmented",
  },
  {
    audience: "developer",
    label: "Deployment and packaging are brittle",
    value: "deployment-and-packaging-are-brittle",
  },
  {
    audience: "developer",
    label: "Telemetry and data integration are inconsistent",
    value: "telemetry-and-data-integration-are-inconsistent",
  },
  {
    audience: "developer",
    label: "Other",
    value: "developer-other",
  },
] as const;

function optionsForAudience(audience: EarlyAccessAudience) {
  return audience === "pilot" ? pilotPainPointOptions : developerPainPointOptions;
}

export function normalizeEarlyAccessAudiences(
  values: ReadonlyArray<string | EarlyAccessAudience>
): EarlyAccessAudience[] {
  const normalized = values.filter(isEarlyAccessAudience);

  return earlyAccessAudienceValues.filter((audience) => normalized.includes(audience));
}

export function getEarlyAccessPainPointOptions(
  audienceOrAudiences: EarlyAccessAudience | ReadonlyArray<EarlyAccessAudience>
): ReadonlyArray<{
  audience: EarlyAccessAudience;
  label: string;
  value: EarlyAccessPainPoint;
}> {
  const audiences =
    typeof audienceOrAudiences === "string"
      ? [audienceOrAudiences]
      : normalizeEarlyAccessAudiences(audienceOrAudiences);
  const shouldPrefix = audiences.length > 1;

  return audiences.flatMap((audience) =>
    optionsForAudience(audience).map((option) => ({
      ...option,
      label: shouldPrefix
        ? `${audience === "pilot" ? "Pilot" : "Developer"}: ${option.label}`
        : option.label,
    }))
  );
}

export function getEarlyAccessSubmitLabel(
  audiences: ReadonlyArray<EarlyAccessAudience>
) {
  if (audiences.length === 1) {
    return betaAccessAudienceContent[audiences[0]].submitLabel;
  }

  return genericBetaAccessContent.submitLabel;
}

export function isEarlyAccessAudience(value: string): value is EarlyAccessAudience {
  return earlyAccessAudienceValues.includes(value as EarlyAccessAudience);
}

export function isEarlyAccessFleet(value: string): value is EarlyAccessFleet {
  return earlyAccessFleetValues.includes(value as EarlyAccessFleet);
}

export function isEarlyAccessPainPoint(
  value: string,
  audienceOrAudiences: EarlyAccessAudience | ReadonlyArray<EarlyAccessAudience>
): value is EarlyAccessPainPoint {
  const audiences =
    typeof audienceOrAudiences === "string"
      ? [audienceOrAudiences]
      : normalizeEarlyAccessAudiences(audienceOrAudiences);

  return audiences.some((audience) =>
    optionsForAudience(audience).some((option) => option.value === value)
  );
}
