import type { DocPhase } from "./types";

export const DOC_PHASES: DocPhase[] = [
  {
    id: "phase-1",
    index: 1,
    title: "Business Alignment & Framing",
    steps: [
      {
        id: "stakeholder-kickoff",
        number: 1,
        title: "Stakeholder Kickoff",
        blocks: [
          {
            label: "Preparation",
            items: [
              {
                text: "Agenda set for 45 minutes with 3 core roles (Product Manager, Lead Engineer, Business Sponsor).",
              },
            ],
          },
          {
            label: "Execution",
            items: [
              {
                text: "Ask target-focused, open-ended questions across 3 buckets:",
              },
              {
                label: "Business",
                text: "“What specific business metric must this product move in the next 6 months?”",
              },
              {
                label: "Tech",
                text: "“What third-party APIs, legacy databases, or framework limits are non-negotiable?”",
              },
              {
                label: "Constraints",
                text: "“What is our absolute drop-dead date for an MVP launch?”",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "A kickoff aligns everyone on constraints before research starts, preventing rework later when a design solution turns out to violate a technical or business limit nobody mentioned up front.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Letting the loudest stakeholder set the agenda instead of covering all 3 buckets.",
              },
              {
                text: "Treating the kickoff as a status update instead of a working session.",
              },
              {
                text: "Not writing down constraints where the whole team can reference them later.",
              },
            ],
          },
        ],
        workspaceAction:
          "Log technical limits, business targets, and hard deadlines into the Kickoff Question Bank.",
      },
      {
        id: "draft-problem-statement",
        number: 2,
        title: "Draft Problem Statement",
        blocks: [
          {
            label: "Preparation",
            items: [
              {
                text: "Extract raw pain points gathered during the kickoff call.",
              },
            ],
          },
          {
            label: "Execution",
            items: [
              {
                text: "Draft 3 variations using the How Might We (HMW) syntax:",
              },
              {
                text: "How Might We [Action] for [Target User] so that [Desired Outcome]?",
                formula: true,
              },
            ],
          },
          {
            label: "Refinement Filter",
            items: [
              {
                text: "Reject HMWs that are too broad (“How might we make map discovery better?”) or too narrow (“How might we add a green button for voting?”). Target mid-level clarity (“How might we help rural travelers discover hidden local spots based on verified visit ratings?”).",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "How Might We statements reframe a problem as an open invitation to design, avoiding premature solutioning while staying specific enough to actually generate ideas.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Writing an HMW that already contains the solution (“How might we add a filter dropdown?”).",
              },
              {
                text: "Skipping the assumptions list, so nobody knows what research actually needs to validate.",
              },
              {
                text: "Locking the HMW before any research — treat it as a hypothesis until Phase 2 confirms it.",
              },
            ],
          },
        ],
        workspaceAction:
          "Lock your final approved framing phrase into the HMW Generator.",
      },
      {
        id: "establish-success-metrics",
        number: 3,
        title: "Establish Success Metrics",
        blocks: [
          {
            label: "Preparation",
            items: [
              {
                text: "Select the HEART Framework as your evaluation structure.",
              },
            ],
          },
          {
            label: "Execution",
            items: [
              { text: "Select maximum 3 concrete metrics to track:" },
              {
                label: "Happiness",
                text: "Target System Usability Scale (SUS) score ≥ 80.",
              },
              {
                label: "Engagement",
                text: "Average verified votes cast per active user per week ≥ 3.",
              },
              {
                label: "Task Success",
                text: "Time-to-first-discovery under 45 seconds.",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "The HEART framework (Happiness, Engagement, Adoption, Retention, Task Success) forces the team to define success in measurable terms before design starts, so “did this work?” has a real answer later.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Picking metrics that are easy to measure instead of ones that matter to the business goal.",
              },
              {
                text: "Setting more than 3 metrics, which dilutes focus and makes trade-offs impossible to reason about.",
              },
              {
                text: "Never revisiting the thresholds after launch to see if they were realistic.",
              },
            ],
          },
        ],
        workspaceAction:
          "Set quantitative pass/fail thresholds inside the HEART Matrix Sheet.",
      },
    ],
  },
  {
    id: "phase-2",
    index: 2,
    title: "Exploratory Research",
    steps: [
      {
        id: "competitive-matrix-audit",
        number: 1,
        title: "Competitive Matrix & Audit",
        blocks: [
          {
            label: "Preparation",
            items: [
              {
                text: "Select 3 direct competitors (e.g., Google Maps, TripAdvisor, AllTrails) and 2 indirect competitors (e.g., Strava, Foursquare).",
              },
            ],
          },
          {
            label: "Execution",
            items: [
              {
                text: "Score each platform on a 1–5 scale across 5 UX parameters:",
              },
              { text: "Information Architecture clarity" },
              { text: "Trust/Verification mechanics" },
              { text: "Onboarding friction" },
              { text: "Map screen interaction density" },
              { text: "Content freshness" },
            ],
          },
          {
            label: "Synthesis",
            items: [
              {
                text: "Identify strategic feature gaps (e.g., “Competitors rely on unverified reviews; zero platforms use location-gated binary voting”).",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "Direct competitors show the baseline users already expect; indirect competitors reveal adjacent behaviors and interaction patterns users will unconsciously compare you against.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Auditing only direct competitors and missing indirect ones that shape user expectations.",
              },
              {
                text: "Scoring based on opinion instead of walking through real tasks in each product.",
              },
              {
                text: "Treating the audit as a one-time exercise instead of revisiting it before high-fidelity design.",
              },
            ],
          },
        ],
        workspaceAction:
          "Record scores and functional gaps in the Competitor Audit Spreadsheet.",
      },
      {
        id: "exploratory-user-interviews",
        number: 2,
        title: "Exploratory User Interviews",
        blocks: [
          {
            label: "Preparation",
            items: [
              {
                text: "Recruit 5–8 active travelers who fit your target user profiles.",
              },
            ],
          },
          {
            label: "Execution",
            items: [
              {
                text: "Conduct 30-minute 1-on-1 sessions using a semi-structured script:",
              },
              {
                label: "Warm-up (5 mins)",
                text: "General travel/exploration habits.",
              },
              {
                label: "Behavioral Deep-Dive (15 mins)",
                text: "“Walk me through the last time you found a spot that wasn’t on major travel lists.”",
              },
              {
                label: "Pain Points (10 mins)",
                text: "“What frustrates you most about current map ratings or reviews?”",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "Semi-structured interviews surface real behaviors and language, which is what separates evidence-based design decisions from guesses dressed up as personas.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Asking leading questions that confirm what the team already believes.",
              },
              {
                text: "Recruiting only easy-to-reach users instead of the actual target segments.",
              },
              {
                text: "Interviewing without recording quotes, so insights get diluted into vague paraphrases.",
              },
            ],
          },
        ],
        workspaceAction:
          "Transcribe real quotes and behavioral observations into the 5-Step Script Template.",
      },
      {
        id: "validation-survey",
        number: 3,
        title: "Validation Survey",
        blocks: [
          {
            label: "Preparation",
            items: [
              {
                text: "Build a 10-question survey split into two distinct parts.",
              },
            ],
          },
          {
            label: "Execution",
            items: [
              {
                label: "Part A (Blind Baseline)",
                text: "Ask unprompted questions about current tool reliance, trust level in current ratings, and mobile usage while exploring.",
              },
              {
                label: "Part B (Concept Reaction)",
                text: "Describe the verified-vote map concept neutrally without naming your product or showing visual designs.",
              },
            ],
          },
          {
            label: "Distribution",
            items: [
              {
                text: "Gather at least 50 responses from targeted, non-biased communities.",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "A blind-baseline-then-concept-reaction structure separates “what do people do today” from “how do they react to our idea,” so the demand signal isn’t contaminated by leading questions.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Describing the concept with your own product’s name or branding, which biases responses.",
              },
              {
                text: "Distributing only to your own audience/network, inflating demand estimates.",
              },
              {
                text: "Treating survey opinions as a substitute for behavioral interview data rather than a complement to it.",
              },
            ],
          },
        ],
        workspaceAction:
          "Input data into the Quantitative Survey Analyzer to verify overall market demand.",
      },
      {
        id: "affinity-mapping",
        number: 4,
        title: "Affinity Mapping",
        blocks: [
          {
            label: "Preparation",
            items: [
              {
                text: "Import raw quotes, survey data, and observation notes.",
              },
            ],
          },
          {
            label: "Execution",
            items: [
              {
                text: "Transfer discrete observations onto individual digital sticky notes.",
              },
              {
                text: "Group notes naturally by themes (e.g., Trust Issues, Map Clutter, Offline Needs).",
              },
              {
                text: "Write 3–5 core insight statements summarizing each cluster (e.g., “Users ignore 4-star ratings if there are fewer than 50 reviews”).",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "Affinity mapping turns dozens of individual observations into a small number of defensible themes — the bridge between raw research and a synthesized point of view.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Grouping notes by who said them instead of by the underlying theme.",
              },
              {
                text: "Stopping at grouping without writing the insight sentence for each cluster.",
              },
              {
                text: "Letting one strong opinion dominate a cluster instead of looking for patterns across multiple sources.",
              },
            ],
          },
        ],
        workspaceAction:
          "Organize notes and write synthesized insights within the Affinity Canvas Drawer.",
      },
    ],
  },
  {
    id: "phase-3",
    index: 3,
    title: "Synthesis & Scope",
    steps: [
      {
        id: "lean-user-personas",
        number: 1,
        title: "Lean User Personas",
        blocks: [
          {
            label: "Preparation",
            items: [
              {
                text: "Group interview subjects into 1–2 behavioral archetypes.",
              },
            ],
          },
          {
            label: "Execution",
            items: [
              {
                text: "Build functional persona cards containing only execution-critical data:",
              },
              {
                label: "Primary Goal",
                text: "e.g., “Find uncrowded, high-quality viewpoints without sorting through ad-promoted listings.”",
              },
              {
                label: "Main Trigger",
                text: "e.g., “Arriving in a new city with 3 hours of free time.”",
              },
              {
                label: "Core Friction",
                text: "e.g., “Cannot tell if a top-rated spot is actually good or just heavily marketed.”",
              },
              {
                label: "Tech Context",
                text: "e.g., “One-handed mobile operation while walking outside in bright sunlight.”",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "A lean persona captures only what changes a design decision — goal, trigger, friction, context — instead of biographical filler that never gets used.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Inventing details that weren’t observed in research, turning the persona into fiction.",
              },
              {
                text: "Building a persona for every interviewee instead of grouping into 1–2 real archetypes.",
              },
              {
                text: "Writing a persona once and never updating it as research continues.",
              },
            ],
          },
        ],
        workspaceAction:
          "Fill out the data fields in the Lean Persona Builder.",
      },
      {
        id: "user-journey-mapping",
        number: 2,
        title: "User Journey Mapping",
        blocks: [
          {
            label: "Preparation",
            items: [{ text: "Select a single persona and a specific goal." }],
          },
          {
            label: "Execution",
            items: [
              {
                text: "Map out 5 sequential phases: Discovery → Evaluation → Navigation → Visit/Verification → Voting.",
              },
              { text: "Document User Actions at each phase." },
              {
                text: "Document Pain Points & Anxieties (e.g., “Is this place actually accessible?”).",
              },
              { text: "Identify Opportunity Areas for your app to intervene." },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "Mapping the journey phase-by-phase reveals where friction and anxiety actually occur, which is where design effort should concentrate — not just on the “main” screen.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Mapping the ideal journey instead of what real users described.",
              },
              {
                text: "Skipping the emotional/anxiety layer and only documenting steps.",
              },
              {
                text: "Mapping a journey with no specific persona or goal attached to it.",
              },
            ],
          },
        ],
        workspaceAction:
          "Build the step-by-step visual map in the Journey Canvas.",
      },
      {
        id: "feature-prioritization-matrix",
        number: 3,
        title: "Feature Prioritization Matrix",
        blocks: [
          {
            label: "Preparation",
            items: [
              {
                text: "List every feature idea generated during research and framing.",
              },
            ],
          },
          {
            label: "Execution",
            items: [
              { text: "Plot every feature onto a 2x2 Matrix:" },
              {
                label: "High Value / Low Effort (Must-Haves)",
                text: "Place in the MVP V1.0 scope (e.g., Map canvas, GPS-verified voting button, basic filter toolbar).",
              },
              {
                label: "High Value / High Effort (V2.0 Core)",
                text: "Schedule for post-launch (e.g., Offline map downloads, algorithmic discovery feed).",
              },
              {
                label: "Low Value / Low Effort (Nice-to-Haves)",
                text: "Backlog.",
              },
              {
                label: "Low Value / High Effort (Out of Scope)",
                text: "Cut completely (e.g., Social feed, direct messaging).",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "Plotting features on impact vs. effort makes trade-offs visible and defensible to stakeholders, instead of prioritization happening by opinion or seniority.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              { text: "Estimating effort without involving engineering." },
              {
                text: "Letting scope creep back in after V1 is defined by re-litigating cut features.",
              },
              {
                text: "Treating the matrix as a one-time exercise instead of revisiting it as new information arrives.",
              },
            ],
          },
        ],
        workspaceAction:
          "Drag and drop items into the 2x2 Prioritization Board.",
      },
    ],
  },
  {
    id: "phase-4",
    index: 4,
    title: "System Architecture & Flows",
    steps: [
      {
        id: "information-architecture",
        number: 1,
        title: "Information Architecture (IA)",
        blocks: [
          {
            label: "Preparation",
            items: [
              {
                text: "List all core content types (e.g., Map view, Location details, Vote validation sheet, User settings).",
              },
            ],
          },
          {
            label: "Execution",
            items: [
              {
                text: "Conduct an open card-sorting exercise with 5 participants to determine logical navigation groupings.",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "Card sorting reveals how users naturally group content, which is often different from how the internal team organizes it.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Designing the sitemap before doing a card sort, then using the sort to confirm bias.",
              },
              { text: "Sorting with teammates instead of real target users." },
              {
                text: "Ignoring outlier groupings instead of investigating why users placed a card there.",
              },
            ],
          },
        ],
        workspaceAction:
          "Define primary menu tiers and content hierarchy in the Card Sorting Matrix.",
      },
      {
        id: "app-sitemap",
        number: 2,
        title: "App Sitemap",
        blocks: [
          {
            label: "Preparation",
            items: [
              {
                text: "Gather your finalized navigation tiers from your IA exercise.",
              },
            ],
          },
          {
            label: "Execution",
            items: [
              {
                text: "Construct a visual tree diagram mapping out screen relationships:",
              },
              { label: "Level 0", text: "Main Map Canvas (Root Entry)" },
              {
                label: "Level 1",
                text: "Location Sheet (Slide-over / Bottom sheet)",
              },
              { label: "Level 1", text: "Search & Filter Modal" },
              {
                label: "Level 2",
                text: "Verification / Vote Confirmation Screen",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "A sitemap defines the skeleton every downstream flow and wireframe hangs on — get this wrong and everything built on top needs rework.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Going more than 3 levels deep, which usually signals the IA needs to be flattened.",
              },
              {
                text: "Designing the sitemap around your database schema instead of user mental models.",
              },
              {
                text: "Skipping validation with users before moving to detailed flows.",
              },
            ],
          },
        ],
        workspaceAction: "Render your app hierarchy using the Sitemap Builder.",
      },
      {
        id: "task-user-flows",
        number: 3,
        title: "Task & User Flows",
        blocks: [
          {
            label: "Preparation",
            items: [
              {
                text: "Identify the primary golden path (e.g., User discovers spot → Travels to spot → System verifies location → User casts vote).",
              },
            ],
          },
          {
            label: "Execution",
            items: [
              {
                text: "Diagram the flow using standardized UX node conventions:",
              },
              { label: "Rectangle", text: "Screen or visual view state" },
              {
                label: "Diamond",
                text: "System or user decision point (Is GPS within 50m radius?)",
              },
              { label: "Arrow", text: "User action / transition path" },
              { label: "Circle", text: "Start / End node" },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "Standardized node conventions make flows readable by engineers and stakeholders without a walkthrough, and force explicit handling of decision and error states before a single pixel is drawn.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Only diagramming the happy path and skipping error/edge-case branches.",
              },
              {
                text: "Mixing node conventions inconsistently across diagrams, making them hard to read.",
              },
              {
                text: "Treating the flow as final instead of updating it after paper prototype testing.",
              },
            ],
          },
        ],
        workspaceAction:
          "Export flow code using the Mermaid.js Flow Diagram Generator.",
      },
    ],
  },
  {
    id: "phase-5",
    index: 5,
    title: "Concept Exploration & Pre-Figma Gate",
    steps: [
      {
        id: "rapid-sketching",
        number: 1,
        title: "Rapid Pen-and-Paper Sketching",
        blocks: [
          {
            label: "Preparation",
            items: [{ text: "Grab paper, a marker, and set a timer." }],
          },
          {
            label: "Execution",
            items: [
              {
                text: "Use the Crazy Eights exercise for the primary map view:",
              },
              { text: "Fold paper into 8 sections." },
              {
                text: "Draw 1 layout variation per section (60 seconds per section).",
              },
              {
                text: "Select the top 2 layout options that best solve screen density and voting access.",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "Crazy Eights forces quantity over premature perfection, surfacing more layout ideas in 8 minutes than a single polished mockup would in an hour.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Refining the first idea instead of generating 8 distinct ones.",
              },
              {
                text: "Skipping straight to Figma because sketching feels slow.",
              },
              {
                text: "Picking the winning layout by vote instead of by how well it solves the stated problem.",
              },
            ],
          },
        ],
        workspaceAction: "Upload layout sketches into the Concept Drawer.",
      },
      {
        id: "paper-prototype-testing",
        number: 2,
        title: "Paper Prototype Usability Testing",
        blocks: [
          {
            label: "Preparation",
            items: [{ text: "Draw core user flow screens on index cards." }],
          },
          {
            label: "Execution",
            items: [
              { text: "Test with 3–5 target users:" },
              { text: "Place the main map card in front of the user." },
              {
                text: "Give a specific scenario (“You just arrived at this viewpoint. Show me how you’d vote for it.”).",
              },
              {
                text: "Manually swap paper cards based on where the user physically taps.",
              },
              {
                text: "Note where users pause, misinterpret UI controls, or hit dead ends.",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "Testing on paper catches major flow and IA problems before a single hour of high-fidelity design time is spent on the wrong structure.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Explaining the interface instead of letting the user figure it out.",
              },
              { text: "Testing with teammates instead of real target users." },
              {
                text: "Fixing the prototype after every session instead of finishing the round first.",
              },
            ],
          },
        ],
        workspaceAction:
          "Record task success rates and flow friction points in the Usability Test Sheet.",
      },
      {
        id: "core-design-principles",
        number: 3,
        title: "Define Core Design Principles",
        blocks: [
          {
            label: "Preparation",
            items: [
              {
                text: "Synthesize research insights and structural decisions into operational rules.",
              },
            ],
          },
          {
            label: "Execution",
            items: [
              {
                text: "Write 3–4 explicit interaction rules to govern all high-fidelity UI design:",
              },
              {
                label: "Principle 1: Map-First Centricity",
                text: "The map canvas is the main workspace; secondary controls live in light overlay sheets.",
              },
              {
                label: "Principle 2: Zero-Friction Verification",
                text: "Voting requires a maximum of 2 taps once location proximity is established.",
              },
              {
                label: "Principle 3: High-Contrast Scanability",
                text: "Design layout UI to remain legible outdoors in direct sunlight.",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "Explicit principles let anyone on the team make small design decisions consistently without escalating every choice back to research.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Writing generic principles (“be simple”) that don’t actually constrain any decision.",
              },
              {
                text: "Defining principles before synthesis is complete, so they don’t reflect real research.",
              },
              {
                text: "Writing more than 4, which dilutes them into a list nobody remembers.",
              },
            ],
          },
        ],
        workspaceAction: "Save your principles to the Design Principles Card.",
      },
      {
        id: "final-preflight-gate",
        number: 4,
        title: "Final Pre-Flight Gate Check",
        blocks: [
          {
            label: "Preparation",
            items: [{ text: "Complete all steps across Phases 1 through 5." }],
          },
          {
            label: "Execution",
            items: [
              {
                text: "Run through the automated system check in the app UI. Verify that every prerequisite asset (HMW, HEART metrics, Competitive Audit, Personas, User Flows, Sketches) displays a green status dot (● Complete).",
              },
            ],
          },
          {
            label: "Why It Matters",
            items: [
              {
                text: "A hard gate prevents the most common failure mode in fast-moving teams — jumping into Figma with unresolved research questions that resurface expensively during development.",
              },
            ],
          },
          {
            label: "Common Pitfalls",
            items: [
              {
                text: "Marking an item complete without a real deliverable behind it, just to unlock the gate.",
              },
              {
                text: "Skipping the gate under deadline pressure — this is exactly when it matters most.",
              },
              {
                text: "Treating the gate as a one-time check instead of re-verifying it if scope changes.",
              },
            ],
          },
        ],
        workspaceAction:
          "Click the unlocked “Export Figma Prep Package” CTA to generate your project design brief and safely begin high-fidelity UI layout.",
      },
    ],
  },
  {
    id: "guide",
    index: 0,
    title: "Using UX Launchsite",
    steps: [
      {
        id: "managing-projects",
        number: 1,
        title: "Creating & Managing Projects",
        calloutLabel: "Try it in the app",
        blocks: [
          {
            label: "What It Does",
            items: [
              {
                text: "Each project is a fully isolated 5-phase workspace stored locally in your browser — no account, no server, no sync between devices.",
              },
            ],
          },
          {
            label: "How To Use It",
            items: [
              {
                text: "Click + New project on the Projects page and give it a name.",
              },
              {
                text: "Use the row/card menu (⋯) to open Settings, duplicate, export as JSON, or delete a project.",
              },
              {
                text: "Import a previously exported .json file to restore or share a project.",
              },
            ],
          },
          {
            label: "Good To Know",
            items: [
              {
                text: "Data lives in this browser’s local storage only — clearing site data or switching browsers loses it unless you’ve exported a JSON backup first.",
              },
            ],
          },
        ],
        workspaceAction:
          "Export a project as JSON if you want a backup that lives outside the browser.",
      },
      {
        id: "list-card-view",
        number: 2,
        title: "Switching Between List and Card View",
        calloutLabel: "Try it in the app",
        blocks: [
          {
            label: "What It Does",
            items: [
              {
                text: "The Projects page can display your work as a dense table (List) or as visual tiles with avatars (Card).",
              },
            ],
          },
          {
            label: "How To Use It",
            items: [
              {
                text: "Use the List/Grid toggle next to the search bar. Search and project data are shared between both views — only the layout changes.",
              },
            ],
          },
          {
            label: "Good To Know",
            items: [
              {
                text: "List view is better for scanning many projects at once; Card view surfaces the project photo and dates more prominently.",
              },
            ],
          },
        ],
        workspaceAction:
          "Switch to Card view when you want to see project photos and due dates at a glance.",
      },
      {
        id: "working-a-phase",
        number: 3,
        title: "Working Through a Phase",
        calloutLabel: "Try it in the app",
        blocks: [
          {
            label: "What It Does",
            items: [
              {
                text: "Each of the 5 phases contains a fixed set of deliverables. Status — Not started, In progress, Complete — is always shown as a colored dot, never a colored badge.",
              },
            ],
          },
          {
            label: "How To Use It",
            items: [
              {
                text: "Click a deliverable row to open its dedicated page and fill in the template.",
              },
              {
                text: "A deliverable automatically moves to In progress the first time you edit it.",
              },
              {
                text: "Use Mark complete in the top-right once the deliverable is genuinely finished — this is what the Pre-Figma Gate checks.",
              },
            ],
          },
          {
            label: "Good To Know",
            items: [
              {
                text: "Marking something complete is manual and reversible — click it again to reopen a deliverable if you need to revise it.",
              },
            ],
          },
        ],
        workspaceAction:
          "Open any deliverable and use Mark complete once it reflects real findings — not just to unlock the gate faster.",
      },
      {
        id: "editable-templates",
        number: 4,
        title: "The Editable Templates",
        calloutLabel: "Try it in the app",
        blocks: [
          {
            label: "What It Does",
            items: [
              {
                text: "Every deliverable uses one of 11 interactive templates matched to the kind of artifact it produces — tables, documents, group boards, personas, a 2x2 matrix, a sitemap tree, flow builders, checklists, and principle cards.",
              },
            ],
          },
          {
            label: "How To Use It",
            items: [
              {
                label: "Tables",
                text: "competitor audits, surveys, metrics — add/remove rows freely, click any cell to edit.",
              },
              {
                label: "Group boards",
                text: "affinity mapping, card sorting — drag cards between named groups, or use the group dropdown.",
              },
              {
                label: "Impact vs. Effort matrix",
                text: "drag a dot to reposition it on the quadrant; hover to remove an item.",
              },
              {
                label: "Sitemap / Task / User Flow builders",
                text: "add child nodes and reorder them to sketch structure without leaving the browser.",
              },
            ],
          },
          {
            label: "Good To Know",
            items: [
              {
                text: "Every template auto-saves as you type — there’s no separate save button inside a deliverable page.",
              },
            ],
          },
        ],
        workspaceAction:
          "Open the Impact vs. Effort matrix and drag a few opportunities onto the grid to see the quadrant labels update live.",
      },
      {
        id: "exporting-work",
        number: 5,
        title: "Exporting Your Work",
        calloutLabel: "Try it in the app",
        blocks: [
          {
            label: "What It Does",
            items: [
              {
                text: "Each deliverable’s Export menu (the download icon) offers the formats relevant to that content — Markdown, CSV, JSON, Mermaid.js code, SVG, PNG, or a Notion-ready copy.",
              },
            ],
          },
          {
            label: "How To Use It",
            items: [
              {
                label: "Markdown / Copy to Notion",
                text: "downloads or copies a formatted write-up of the deliverable.",
              },
              {
                label: "CSV / JSON",
                text: "for table and group-board data — useful for spreadsheets or re-importing elsewhere.",
              },
              {
                label: "Mermaid.js code",
                text: "copies flow diagrams as text you can paste into any Mermaid-compatible renderer.",
              },
              {
                label: "SVG",
                text: "downloads a real rendered diagram from the User Flow Generator.",
              },
              {
                label: "PNG",
                text: "renders the Impact vs. Effort matrix as an image; other formats fall back to your browser’s print dialog for a PDF.",
              },
            ],
          },
          {
            label: "Good To Know",
            items: [
              {
                text: "Exports are generated entirely client-side — nothing is uploaded anywhere.",
              },
            ],
          },
        ],
        workspaceAction:
          "Open the Impact vs. Effort matrix and export it as PNG to see a rendered image of your prioritization.",
      },
      {
        id: "project-details",
        number: 6,
        title: "Project Details: Photo & Dates",
        calloutLabel: "Try it in the app",
        blocks: [
          {
            label: "What It Does",
            items: [
              {
                text: "Each project can have a profile photo, a start date, and an optional due date, editable from Project Settings.",
              },
            ],
          },
          {
            label: "How To Use It",
            items: [
              {
                text: "Open Settings from the row/card menu, or the pencil icon in the project sidebar.",
              },
              {
                text: "Upload a photo, then drag and zoom to crop it into a circle.",
              },
              {
                text: "Set a start date (defaults to the day the project was created) and, optionally, a due date.",
              },
            ],
          },
          {
            label: "Good To Know",
            items: [
              {
                text: "A due date that’s passed shows in red across list, card, and sidebar views — but only while the project isn’t already fully complete.",
              },
            ],
          },
        ],
        workspaceAction:
          "Set a due date on an active project and watch it turn red once the date passes, as a built-in deadline reminder.",
      },
      {
        id: "pre-figma-gate-guide",
        number: 7,
        title: "The Pre-Figma Gate",
        calloutLabel: "Try it in the app",
        blocks: [
          {
            label: "What It Does",
            items: [
              {
                text: "The gate aggregates completion across all 5 phases and blocks the Figma handoff until every deliverable in every phase is marked complete.",
              },
            ],
          },
          {
            label: "How To Use It",
            items: [
              {
                text: "Open Pre-Figma Gate from the sidebar to see per-phase completion and jump to any phase that still needs work.",
              },
              {
                text: "Once all 5 phases show 100%, Copy Figma handoff summary unlocks — it compiles every deliverable into one Markdown document and copies it to your clipboard.",
              },
            ],
          },
          {
            label: "Good To Know",
            items: [
              {
                text: "The gate re-locks automatically if you reopen a completed deliverable — it always reflects the project’s real current state.",
              },
            ],
          },
        ],
        workspaceAction:
          "Visit the Pre-Figma Gate early in a project to see exactly which deliverables still stand between you and Figma.",
      },
    ],
  },
];

export function getDocPhase(phaseId: string): DocPhase | undefined {
  return DOC_PHASES.find((p) => p.id === phaseId);
}
