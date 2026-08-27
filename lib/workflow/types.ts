export type DeliverableStatus = "not-started" | "in-progress" | "complete";

export type TemplateType =
  | "doc"
  | "table"
  | "script"
  | "groupboard"
  | "persona"
  | "matrix2x2"
  | "sitemap"
  | "taskflow"
  | "userflow"
  | "checklist"
  | "principles";

export interface DocSection {
  id: string;
  heading: string;
  placeholder: string;
}

export interface TableColumn {
  key: string;
  label: string;
}

export interface DeliverableConfig {
  id: string;
  title: string;
  description: string;
  type: TemplateType;
  exportFormats: string[];
  doc?: { sections: DocSection[] };
  table?: { columns: TableColumn[]; seedRows?: Record<string, string>[] };
  script?: { sections: DocSection[] };
  groupboard?: { itemLabel: string; groupLabel: string; seedGroups: string[] };
  checklist?: { seedItems: string[] };
  matrix2x2?: { xLabel: string; yLabel: string };
  principles?: { max: number };
}

export interface PhaseConfig {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  deliverables: DeliverableConfig[];
}

export interface DeliverableState {
  status: DeliverableStatus;
  data: unknown;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  avatar?: string;
  startDate?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  deliverables: Record<string, DeliverableState>;
}

// --- template-specific data shapes ---

export interface DocData {
  values: Record<string, string>;
}

export interface TableData {
  rows: Record<string, string>[];
}

export interface ScriptData {
  values: Record<string, string[]>;
}

export interface GroupBoardItem {
  id: string;
  text: string;
  groupId: string | null;
}
export interface GroupBoardGroup {
  id: string;
  name: string;
}
export interface GroupBoardData {
  items: GroupBoardItem[];
  groups: GroupBoardGroup[];
}

export interface PersonaField {
  id: string;
  name: string;
  role: string;
  quote: string;
  bio: string;
  goals: string[];
  frustrations: string[];
  behaviors: string[];
}
export interface PersonaData {
  personas: PersonaField[];
}

export interface MatrixItem {
  id: string;
  label: string;
  impact: number; // 0-100, higher = top
  effort: number; // 0-100, higher = right
}
export interface Matrix2x2Data {
  items: MatrixItem[];
}

export interface SitemapNode {
  id: string;
  label: string;
  children: SitemapNode[];
}
export interface SitemapData {
  root: SitemapNode;
}

export interface TaskFlowStep {
  id: string;
  label: string;
  type: "step" | "decision";
  branches: { label: string }[];
}
export interface TaskFlowData {
  steps: TaskFlowStep[];
}

export type UserFlowNodeType = "start" | "screen" | "decision" | "end";
export interface UserFlowNode {
  id: string;
  label: string;
  type: UserFlowNodeType;
}
export interface UserFlowData {
  nodes: UserFlowNode[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}
export interface ChecklistData {
  items: ChecklistItem[];
}

export interface PrincipleCard {
  id: string;
  title: string;
  description: string;
}
export interface PrinciplesData {
  principles: PrincipleCard[];
}
