import type {
  AppCategory,
  CompatibilityTag,
  MockApp,
  TelemetryCard,
} from "@/lib/types";

export const appCategories: AppCategory[] = [
  {
    slug: "inspection",
    label: "Inspection",
    description: "Workflows that turn repeat inspection routines into guided launches.",
  },
  {
    slug: "agriculture",
    label: "Agriculture",
    description: "Field passes built around repeatable crop and orchard missions.",
  },
  {
    slug: "survey",
    label: "Survey",
    description: "Coverage workflows for mapping, perimeter awareness, and capture loops.",
  },
  {
    slug: "operations",
    label: "Operations",
    description: "Mission support utilities that help teams run focused operational tasks.",
  },
];

export const compatibilityTags: CompatibilityTag[] = [
  { id: "px4-first", label: "PX4-first", tone: "sky" },
  { id: "mission-ready", label: "Mission-ready", tone: "emerald" },
  { id: "python-compatible", label: "Python-compatible", tone: "slate" },
  { id: "video-assisted", label: "Video-assisted", tone: "amber" },
  { id: "curated", label: "Curated", tone: "sky" },
  { id: "field-tested-concept", label: "Field-tested concept", tone: "emerald" },
];

const telemetryBase: TelemetryCard[] = [
  { label: "Link health", value: "98%", detail: "steady on launch handoff", trend: "steady" },
  { label: "Mission progress", value: "06 / 12", detail: "waypoints validated", trend: "improving" },
  { label: "Operator prompts", value: "2", detail: "one readiness check pending", trend: "alert" },
];

export const mockApps: MockApp[] = [
  {
    title: "Cattle Count",
    slug: "cattle-count",
    oneLineValueProp: "Turn a repeat paddock count into a guided capture-and-review run.",
    summary:
      "A guided livestock pass that packages route setup, capture assumptions, and operator outputs into a launchable workflow.",
    category: "operations",
    featured: true,
    curated: true,
    readyLabel: "Ready for PX4-style workflow",
    operatorComplexity: "guided",
    controlStyle: "mission-first",
    usesVideo: false,
    firmware: "PX4",
    workflowSummary:
      "Load the paddock mission, confirm overlap settings, launch the route, and review the counted output in one guided flow.",
    missionFit: "Best for repeat livestock sweeps with predictable route geometry.",
    operatorStory:
      "Instead of reassembling a count run from scripts and field notes, the operator gets a mission card with launch checks and a plain-language outcome.",
    developerValue:
      "Shows how a repo can advertise its workflow intent, mission assumptions, and expected output without reading the entire codebase first.",
    outputPanelTitle: "Count output",
    outputPanelSummary: "Estimated herd count, confidence band, and flagged image clusters.",
    tags: ["px4-first", "mission-ready", "python-compatible", "curated"],
    appOutputs: ["Estimated count", "Confidence range", "Flagged image strip"],
    checklist: ["Confirm paddock boundary", "Validate capture overlap", "Arm route and run"],
    launchStates: [
      { id: "mission", label: "Mission profile loaded", description: "Target route and capture spacing confirmed.", status: "complete" },
      { id: "compatibility", label: "Compatibility check", description: "PX4 mission mode and payload assumptions validated.", status: "current" },
      { id: "runtime", label: "Runtime handoff", description: "Runtime panel receives telemetry and output expectations.", status: "upcoming" },
    ],
    telemetry: telemetryBase,
  },
  {
    title: "Roof Inspection Assist",
    slug: "roof-inspection-assist",
    oneLineValueProp: "Package repeat roof inspection routes into a calmer launch and review flow.",
    summary:
      "An inspection workflow that frames route checks, required media capture, and issue review before takeoff.",
    category: "inspection",
    featured: true,
    curated: true,
    readyLabel: "Ready for PX4-style workflow",
    operatorComplexity: "guided",
    controlStyle: "mixed",
    usesVideo: true,
    firmware: "PX4",
    workflowSummary:
      "Review compatibility tags, verify gimbal/video expectations, launch the inspection route, and watch issue prompts appear in the output rail.",
    missionFit: "Best for repeat roof or asset condition checks that need consistent coverage.",
    operatorStory:
      "Operators get clear setup prompts and a believable path from app card to runtime launch rather than a folder of scripts.",
    developerValue:
      "A strong example of how video dependencies and route intent can be expressed inside a future app packaging layer.",
    outputPanelTitle: "Inspection output",
    outputPanelSummary: "Issue markers, route completion, and media capture confirmation.",
    tags: ["px4-first", "mission-ready", "video-assisted", "curated"],
    appOutputs: ["Issue markers", "Capture confirmation", "Coverage gaps"],
    checklist: ["Confirm roof boundary", "Check video feed", "Run inspection route"],
    launchStates: [
      { id: "mission", label: "Inspection route selected", description: "Boundary and camera prompts loaded.", status: "complete" },
      { id: "compatibility", label: "Video + flight check", description: "Mixed-control assumptions reviewed.", status: "current" },
      { id: "runtime", label: "Output rail primed", description: "Findings panel waits for issue events.", status: "upcoming" },
    ],
    telemetry: [
      { label: "Video link", value: "Live", detail: "feed placeholder attached", trend: "steady" },
      { label: "Coverage", value: "84%", detail: "roof faces remaining", trend: "improving" },
      { label: "Flags", value: "3", detail: "surfaces marked for review", trend: "alert" },
    ],
  },
  {
    title: "Orchard Scan",
    slug: "orchard-scan",
    oneLineValueProp: "Guide a crop-health pass from row selection to output review.",
    summary:
      "A mission-first orchard workflow that connects route logic, payload expectations, and output review into one narrative launch surface.",
    category: "agriculture",
    featured: true,
    curated: true,
    readyLabel: "Ready for PX4-style workflow",
    operatorComplexity: "moderate",
    controlStyle: "mission-first",
    usesVideo: false,
    firmware: "PX4",
    workflowSummary:
      "Select the orchard block, confirm coverage spacing, launch the pass, and review row-level health summaries in the output panel.",
    missionFit: "Best for repeat orchard and crop-health passes with consistent route geometry.",
    operatorStory:
      "The operator sees launch intent, compatibility, and expected output in one place before committing the mission.",
    developerValue:
      "Shows how a Python-first workflow can become something operators can discover and run with far less context switching.",
    outputPanelTitle: "Crop health output",
    outputPanelSummary: "Row status summary, flagged anomalies, and export readiness.",
    tags: ["px4-first", "mission-ready", "python-compatible", "field-tested-concept"],
    appOutputs: ["Row health summary", "Anomaly clusters", "Export package"],
    checklist: ["Choose orchard block", "Validate overlap", "Run row sweep"],
    launchStates: [
      { id: "mission", label: "Block ready", description: "Route and block metadata selected.", status: "complete" },
      { id: "compatibility", label: "Payload assumptions checked", description: "Field package and mission mode aligned.", status: "current" },
      { id: "runtime", label: "Output channel open", description: "Runtime preview waits for row-level events.", status: "upcoming" },
    ],
    telemetry: [
      { label: "Coverage rows", value: "18", detail: "rows assigned", trend: "steady" },
      { label: "Scan quality", value: "High", detail: "capture overlap healthy", trend: "improving" },
      { label: "Anomaly prompts", value: "4", detail: "review queue seeded", trend: "alert" },
    ],
  },
  {
    title: "Site Perimeter Sweep",
    slug: "site-perimeter-sweep",
    oneLineValueProp: "Run repeat perimeter awareness missions with a clearer launch ritual.",
    summary:
      "A perimeter workflow that packages route checks, alert framing, and operator prompts into a single mission surface.",
    category: "survey",
    featured: false,
    curated: true,
    readyLabel: "Ready for PX4-style workflow",
    operatorComplexity: "moderate",
    controlStyle: "continuous",
    usesVideo: true,
    firmware: "PX4",
    workflowSummary:
      "Confirm alert zones, verify the mixed-control profile, then monitor perimeter events and video state in the runtime preview.",
    missionFit: "Best for ongoing site sweeps where live awareness matters more than one final export.",
    operatorStory:
      "Cirro frames the mission, the control style, and the expected output so the operator is not guessing what the repo was built to do.",
    developerValue:
      "Useful for validating how continuous or mixed-control workflows should be packaged differently from simple waypoint jobs.",
    outputPanelTitle: "Perimeter output",
    outputPanelSummary: "Alert stream, watchlist events, and link-state prompts.",
    tags: ["px4-first", "video-assisted", "field-tested-concept"],
    appOutputs: ["Alert stream", "Watchlist events", "Route health"],
    checklist: ["Set watch zones", "Check video", "Run sweep"],
    launchStates: [
      { id: "mission", label: "Sweep pattern loaded", description: "Watch zones and pass geometry confirmed.", status: "complete" },
      { id: "compatibility", label: "Continuous mode check", description: "Live awareness controls reviewed.", status: "current" },
      { id: "runtime", label: "Alert rail active", description: "Runtime output begins streaming perimeter events.", status: "upcoming" },
    ],
    telemetry: [
      { label: "Perimeter loops", value: "3", detail: "queued in runtime", trend: "steady" },
      { label: "Alert quality", value: "Good", detail: "watchlist tuned", trend: "improving" },
      { label: "Video prompts", value: "1", detail: "feed needs review", trend: "alert" },
    ],
  },
  {
    title: "Crop Health Pass",
    slug: "crop-health-pass",
    oneLineValueProp: "Give field teams a cleaner path from mission plan to crop-health review.",
    summary:
      "A mock workflow for agricultural passes that makes payload assumptions, route logic, and outputs explicit for operators.",
    category: "agriculture",
    featured: false,
    curated: true,
    readyLabel: "Ready for PX4-style workflow",
    operatorComplexity: "guided",
    controlStyle: "mission-first",
    usesVideo: false,
    firmware: "PX4",
    workflowSummary:
      "Load a repeat pass, validate the mission assumptions, and hand the operator a calm summary of what the workflow will produce.",
    missionFit: "Best for repeat field passes where launch consistency matters more than custom tuning every run.",
    operatorStory:
      "The packaging story is the product story: the operator understands the workflow without unpacking repo internals.",
    developerValue:
      "Demonstrates how a future library could explain workflow outputs, compatibility, and mission intent before install.",
    outputPanelTitle: "Pass output",
    outputPanelSummary: "Coverage health, anomaly prompts, and export status.",
    tags: ["px4-first", "mission-ready", "python-compatible"],
    appOutputs: ["Coverage health", "Anomaly prompts", "Export status"],
    checklist: ["Confirm field", "Validate mission file", "Run pass"],
    launchStates: [
      { id: "mission", label: "Pass loaded", description: "Mission file and field metadata ready.", status: "complete" },
      { id: "compatibility", label: "Mission assumptions checked", description: "Payload and PX4 expectations aligned.", status: "current" },
      { id: "runtime", label: "Output panel staged", description: "Review panel ready for pass results.", status: "upcoming" },
    ],
    telemetry: telemetryBase,
  },
  {
    title: "Construction Progress Capture",
    slug: "construction-progress-capture",
    oneLineValueProp: "Package recurring progress flights into a reusable app-style flow.",
    summary:
      "A project capture workflow that gives teams a clearer path from project template to launch-ready runtime view.",
    category: "inspection",
    featured: false,
    curated: true,
    readyLabel: "Ready for PX4-style workflow",
    operatorComplexity: "moderate",
    controlStyle: "mixed",
    usesVideo: true,
    firmware: "PX4",
    workflowSummary:
      "Select a construction template, confirm coverage and camera assumptions, and launch into a runtime preview with task-specific prompts.",
    missionFit: "Best for repeat progress flights where consistency and team handoff matter.",
    operatorStory:
      "This makes the future app-library-to-runtime journey feel credible for semi-technical field teams.",
    developerValue:
      "Good validation case for workflows that want launch consistency and later distribution to repeat operators.",
    outputPanelTitle: "Progress output",
    outputPanelSummary: "Coverage completion, issue notes, and export readiness.",
    tags: ["px4-first", "video-assisted", "curated"],
    appOutputs: ["Coverage completion", "Issue notes", "Export readiness"],
    checklist: ["Choose project template", "Verify video capture", "Launch capture route"],
    launchStates: [
      { id: "mission", label: "Template selected", description: "Project route and payload prompts loaded.", status: "complete" },
      { id: "compatibility", label: "Launch review", description: "Mixed-control and capture assumptions validated.", status: "current" },
      { id: "runtime", label: "Project rail armed", description: "Runtime preview awaits coverage milestones.", status: "upcoming" },
    ],
    telemetry: [
      { label: "Coverage", value: "62%", detail: "current project pass", trend: "improving" },
      { label: "Video feed", value: "Stable", detail: "placeholder connected", trend: "steady" },
      { label: "Issues", value: "2", detail: "notes for review", trend: "alert" },
    ],
  },
];

export const featuredApps = mockApps.filter((app) => app.featured);

export function getAppBySlug(slug: string) {
  return mockApps.find((app) => app.slug === slug);
}

export function getCategoryBySlug(slug: MockApp["category"]) {
  return appCategories.find((category) => category.slug === slug);
}
