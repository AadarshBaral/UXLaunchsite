import type { PhaseConfig } from "./types";

export const PHASES: PhaseConfig[] = [
  {
    id: "phase-1",
    index: 1,
    title: "Business Framing & Strategy",
    subtitle: "Ground the project before any research begins.",
    deliverables: [
      {
        id: "kickoff-canvas",
        title: "Kickoff Canvas",
        description: "Frame the project context, goals, constraints, and stakeholders.",
        type: "doc",
        exportFormats: ["Markdown", "PDF", "Copy to Notion"],
        doc: {
          sections: [
            { id: "context", heading: "Project Context", placeholder: "What is this project and why now?" },
            { id: "goals", heading: "Business Goals", placeholder: "What outcomes define success for the business?" },
            { id: "constraints", heading: "Constraints", placeholder: "Timeline, budget, technical or legal constraints." },
            { id: "stakeholders", heading: "Stakeholders", placeholder: "Who is sponsoring, contributing, and approving?" },
          ],
        },
      },
      {
        id: "scope-matrix",
        title: "Scope Matrix",
        description: "Decide what's explicitly in and out of scope, and why.",
        type: "table",
        exportFormats: ["Markdown", "PDF"],
        table: {
          columns: [
            { key: "item", label: "Item" },
            { key: "status", label: "In / Out" },
            { key: "rationale", label: "Rationale" },
          ],
        },
      },
      {
        id: "hmw-generator",
        title: "Problem Statement Generator (HMW)",
        description: "Turn observations into a problem statement and How Might We questions.",
        type: "doc",
        exportFormats: ["Markdown", "PDF", "Copy to Notion"],
        doc: {
          sections: [
            { id: "problem", heading: "Problem Statement", placeholder: "Who has what problem, and why does it matter?" },
            { id: "hmw", heading: "How Might We Questions", placeholder: "How might we help [user] achieve [goal] by...?" },
            { id: "assumptions", heading: "Assumptions to Validate", placeholder: "What are we assuming that research should test?" },
          ],
        },
      },
      {
        id: "heart-metrics",
        title: "Success Metrics Table (HEART Framework)",
        description: "Define measurable goals and signals per HEART dimension.",
        type: "table",
        exportFormats: ["Markdown", "PDF"],
        table: {
          columns: [
            { key: "dimension", label: "Dimension" },
            { key: "goal", label: "Goal" },
            { key: "signal", label: "Signal" },
            { key: "metric", label: "Metric" },
          ],
          seedRows: [
            { dimension: "Happiness", goal: "", signal: "", metric: "" },
            { dimension: "Engagement", goal: "", signal: "", metric: "" },
            { dimension: "Adoption", goal: "", signal: "", metric: "" },
            { dimension: "Retention", goal: "", signal: "", metric: "" },
            { dimension: "Task Success", goal: "", signal: "", metric: "" },
          ],
        },
      },
    ],
  },
  {
    id: "phase-2",
    index: 2,
    title: "Exploratory Research",
    subtitle: "Interviews, competitor audits, and affinity mapping.",
    deliverables: [
      {
        id: "competitor-audit",
        title: "Competitor Audit Table",
        description: "Catalog direct and indirect competitors and where the opportunity lies.",
        type: "table",
        exportFormats: ["CSV", "Markdown"],
        table: {
          columns: [
            { key: "competitor", label: "Competitor" },
            { key: "strengths", label: "Strengths" },
            { key: "weaknesses", label: "Weaknesses" },
            { key: "opportunity", label: "Opportunity" },
          ],
        },
      },
      {
        id: "interview-builder",
        title: "User Interview Builder",
        description: "Track who you talked to and what you learned.",
        type: "table",
        exportFormats: ["CSV", "JSON"],
        table: {
          columns: [
            { key: "participant", label: "Participant" },
            { key: "segment", label: "Segment" },
            { key: "date", label: "Date" },
            { key: "quote", label: "Key Quote" },
            { key: "insight", label: "Insight" },
          ],
        },
      },
      {
        id: "interview-script",
        title: "5-Step Interview Script Template",
        description: "A structured script from intro through wrap-up.",
        type: "script",
        exportFormats: ["Markdown"],
        script: {
          sections: [
            { id: "intro", heading: "1. Intro & Consent", placeholder: "Introduce yourself, purpose, and get consent to record." },
            { id: "warmup", heading: "2. Warm-up", placeholder: "Easy background questions to build rapport." },
            { id: "core", heading: "3. Core Questions", placeholder: "The main questions tied to your research goals." },
            { id: "probing", heading: "4. Probing Follow-ups", placeholder: "\"Tell me more about that\" style follow-ups." },
            { id: "wrapup", heading: "5. Wrap-up", placeholder: "Thank the participant, ask for referrals, next steps." },
          ],
        },
      },
      {
        id: "survey-builder",
        title: "Quantitative Survey Builder",
        description: "Draft survey questions and response types.",
        type: "table",
        exportFormats: ["CSV", "JSON"],
        table: {
          columns: [
            { key: "question", label: "Question" },
            { key: "type", label: "Type" },
            { key: "options", label: "Options" },
          ],
        },
      },
      {
        id: "affinity-map",
        title: "Affinity Mapping Canvas",
        description: "Cluster raw research notes into emerging themes.",
        type: "groupboard",
        exportFormats: ["CSV", "JSON", "Markdown"],
        groupboard: {
          itemLabel: "Note",
          groupLabel: "Theme",
          seedGroups: ["Ungrouped"],
        },
      },
    ],
  },
  {
    id: "phase-3",
    index: 3,
    title: "Synthesis & Scope",
    subtitle: "Personas and an impact-vs-effort prioritization matrix.",
    deliverables: [
      {
        id: "persona-builder",
        title: "Lean Persona Builder",
        description: "Lean UX personas: goals, frustrations, and behaviors.",
        type: "persona",
        exportFormats: ["Markdown", "PDF"],
      },
      {
        id: "impact-effort-matrix",
        title: "Impact vs. Effort Prioritization Matrix",
        description: "Plot opportunities by impact and effort to prioritize scope.",
        type: "matrix2x2",
        exportFormats: ["PNG", "PDF", "Markdown"],
        matrix2x2: { xLabel: "Effort", yLabel: "Impact" },
      },
    ],
  },
  {
    id: "phase-4",
    index: 4,
    title: "Architecture & Flows",
    subtitle: "Sitemaps, task flows, card sorting, and user flow diagrams.",
    deliverables: [
      {
        id: "sitemap-tree",
        title: "Sitemap Tree",
        description: "Map the information architecture as a nested tree.",
        type: "sitemap",
        exportFormats: ["Markdown"],
      },
      {
        id: "task-flow-mapper",
        title: "Task Flow Mapper",
        description: "Sequence the steps and decision points for a key task.",
        type: "taskflow",
        exportFormats: ["Mermaid.js code"],
      },
      {
        id: "card-sorting",
        title: "Card-Sorting Matrix",
        description: "Group content cards into candidate categories.",
        type: "groupboard",
        exportFormats: ["CSV"],
        groupboard: {
          itemLabel: "Card",
          groupLabel: "Category",
          seedGroups: ["Unsorted"],
        },
      },
      {
        id: "user-flow-generator",
        title: "User Flow Diagram Generator",
        description: "Build a standard-node user flow: start, screens, decisions, end.",
        type: "userflow",
        exportFormats: ["SVG", "Mermaid.js code"],
      },
    ],
  },
  {
    id: "phase-5",
    index: 5,
    title: "Concept Exploration & Pre-Figma Gate",
    subtitle: "Paper testing, design principles, and the Figma readiness gate.",
    deliverables: [
      {
        id: "paper-testing",
        title: "Paper Testing Tracker",
        description: "Log low-fidelity concept tests before moving to Figma.",
        type: "table",
        exportFormats: ["CSV"],
        table: {
          columns: [
            { key: "tester", label: "Tester" },
            { key: "task", label: "Task" },
            { key: "outcome", label: "Outcome" },
            { key: "notes", label: "Notes" },
          ],
        },
      },
      {
        id: "readiness-checklist",
        title: "Readiness Checklist",
        description: "General sanity checks before entering concept work.",
        type: "checklist",
        exportFormats: ["Markdown"],
        checklist: {
          seedItems: [
            "Research findings are synthesized and shared",
            "Personas reflect real interview data",
            "Priorities are agreed with stakeholders",
            "Information architecture is validated",
          ],
        },
      },
      {
        id: "design-principles",
        title: "Core Design Principles",
        description: "3–4 principles that will guide concept decisions.",
        type: "principles",
        exportFormats: ["Markdown", "PDF"],
        principles: { max: 4 },
      },
      {
        id: "figma-preflight",
        title: "Figma Pre-Flight Checklist",
        description: "The final gate — 100% required before opening Figma.",
        type: "checklist",
        exportFormats: ["Copyable Figma Spec Document"],
        checklist: {
          seedItems: [
            "User flows are finalized for core tasks",
            "Sitemap reflects agreed information architecture",
            "Personas and priorities are signed off",
            "Design principles are documented",
            "Paper concepts have been tested with users",
          ],
        },
      },
    ],
  },
];

export const ALL_DELIVERABLES = PHASES.flatMap((p) => p.deliverables);

export function getPhase(phaseId: string): PhaseConfig | undefined {
  return PHASES.find((p) => p.id === phaseId);
}

export function getDeliverableConfig(deliverableId: string) {
  return ALL_DELIVERABLES.find((d) => d.id === deliverableId);
}

export function phaseOfDeliverable(deliverableId: string): PhaseConfig | undefined {
  return PHASES.find((p) => p.deliverables.some((d) => d.id === deliverableId));
}
