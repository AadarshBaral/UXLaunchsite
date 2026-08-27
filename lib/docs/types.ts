export interface DocBullet {
  label?: string;
  text: string;
  formula?: boolean;
}

export interface DocBlock {
  label: string;
  items: DocBullet[];
}

export interface DocStep {
  id: string;
  number: number;
  title: string;
  blocks: DocBlock[];
  workspaceAction: string;
  /** Overrides the default "Workspace Action" callout label (used by the usage guide's "Try it in the app" entries). */
  calloutLabel?: string;
}

export interface DocPhase {
  id: string;
  index: number;
  title: string;
  steps: DocStep[];
}
