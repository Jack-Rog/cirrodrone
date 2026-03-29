import type {
  EarlyAccessAudience,
  EarlyAccessFleet,
} from "@/lib/early-access";

export type AppCategorySlug =
  | "inspection"
  | "agriculture"
  | "survey"
  | "operations";

export type CompatibilityTone = "sky" | "slate" | "amber" | "emerald";

export type CompatibilityTag = {
  id: string;
  label: string;
  tone: CompatibilityTone;
};

export type AppCategory = {
  slug: AppCategorySlug;
  label: string;
  description: string;
};

export type LaunchStateStatus = "complete" | "current" | "upcoming";

export type LaunchState = {
  id: string;
  label: string;
  description: string;
  status: LaunchStateStatus;
};

export type TelemetryCard = {
  label: string;
  value: string;
  detail: string;
  trend: "steady" | "improving" | "alert";
};

export type MockApp = {
  title: string;
  slug: string;
  oneLineValueProp: string;
  summary: string;
  category: AppCategorySlug;
  featured: boolean;
  curated: boolean;
  readyLabel: string;
  operatorComplexity: "guided" | "moderate" | "advanced";
  controlStyle: "mission-first" | "mixed" | "continuous";
  usesVideo: boolean;
  firmware: string;
  workflowSummary: string;
  missionFit: string;
  operatorStory: string;
  developerValue: string;
  outputPanelTitle: string;
  outputPanelSummary: string;
  tags: string[];
  appOutputs: string[];
  checklist: string[];
  launchStates: LaunchState[];
  telemetry: TelemetryCard[];
};

export type EarlyAccessLeadInput = {
  audiences: EarlyAccessAudience[];
  currentFleets: EarlyAccessFleet[];
  name: string;
  email: string;
  painPoint: string;
  whyBetaAccess: string;
};

export type RepoSubmissionInput = {
  repoUrl: string;
  workflowGoal: string;
  firmware: string;
  controlStyle: "mission-first" | "mixed" | "continuous";
  usesVideo: "yes" | "no";
  painPoint: string;
  wantsDesignPartner: "yes" | "no";
};

export type DesignPartnerApplicationInput = {
  name: string;
  email: string;
  role: string;
  repoOrWorkflowLink: string;
  buildDescription: string;
  packagingMotivation: string;
  willingToTestPilotBuilds: "yes" | "no";
};

export type FormActionState = {
  status: "idle" | "success" | "error";
  message: string;
  redirectTo?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};
