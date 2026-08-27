import { create } from "zustand";
import { createKeyedDebouncer } from "./debounce";
import { makeId } from "./id";
import {
  deleteProjectRow,
  fetchProjects,
  insertProject,
  updateProjectRow,
} from "./supabase/queries";
import { ALL_DELIVERABLES } from "./workflow/config";
import { createInitialData } from "./workflow/data";
import type {
  DeliverableState,
  DeliverableStatus,
  Project,
} from "./workflow/types";

function freshDeliverables(): Record<string, DeliverableState> {
  const now = new Date().toISOString();
  const map: Record<string, DeliverableState> = {};
  ALL_DELIVERABLES.forEach((config) => {
    map[config.id] = {
      status: "not-started",
      data: createInitialData(config),
      updatedAt: now,
    };
  });
  return map;
}

function logSyncError(action: string, error: unknown) {
  console.error(
    `UX Launchsite: failed to sync "${action}" to the server.`,
    error,
  );
}

const debounceWrite = createKeyedDebouncer(600);

interface StoreState {
  projects: Project[];
  hasHydrated: boolean;
  userId: string | null;
  setUserId: (id: string | null) => void;
  loadProjects: () => Promise<void>;
  reset: () => void;
  createProject: (
    name: string,
    details?: Partial<Pick<Project, "avatar" | "startDate" | "dueDate">>,
  ) => string;
  updateProjectDetails: (
    id: string,
    patch: Partial<Pick<Project, "name" | "avatar" | "startDate" | "dueDate">>,
  ) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  updateDeliverableData: (
    projectId: string,
    deliverableId: string,
    data: unknown,
  ) => void;
  setDeliverableStatus: (
    projectId: string,
    deliverableId: string,
    status: DeliverableStatus,
  ) => void;
  importProject: (project: Project) => string;
}

export const useStore = create<StoreState>()((set, get) => ({
  projects: [],
  hasHydrated: false,
  userId: null,
  setUserId: (id) => set({ userId: id }),

  loadProjects: async () => {
    const userId = get().userId;
    if (!userId) {
      set({ projects: [], hasHydrated: true });
      return;
    }
    try {
      const projects = await fetchProjects();
      set({ projects, hasHydrated: true });
    } catch (error) {
      logSyncError("load projects", error);
      set({ hasHydrated: true });
    }
  },

  reset: () => set({ projects: [], hasHydrated: false, userId: null }),

  createProject: (name, details) => {
    const userId = get().userId;
    const id = makeId();
    const now = new Date().toISOString();
    const project: Project = {
      id,
      name: name.trim() || "Untitled project",
      startDate: now.slice(0, 10),
      createdAt: now,
      updatedAt: now,
      deliverables: freshDeliverables(),
      ...details,
    };
    set((s) => ({ projects: [project, ...s.projects] }));
    if (userId) {
      insertProject(project, userId).catch((error) =>
        logSyncError("create project", error),
      );
    }
    return id;
  },

  updateProjectDetails: (id, patch) => {
    const updatedAt = new Date().toISOString();
    set((s) => ({
      projects: s.projects.map((p) =>
        p.id === id
          ? {
              ...p,
              ...patch,
              name:
                patch.name !== undefined ? patch.name.trim() || p.name : p.name,
              updatedAt,
            }
          : p,
      ),
    }));
    updateProjectRow(id, { ...patch, updatedAt }).catch((error) =>
      logSyncError("update project", error),
    );
  },

  deleteProject: (id) => {
    set((s) => ({ projects: s.projects.filter((p) => p.id !== id) }));
    deleteProjectRow(id).catch((error) =>
      logSyncError("delete project", error),
    );
  },

  duplicateProject: (id) => {
    const userId = get().userId;
    const source = get().projects.find((p) => p.id === id);
    if (!source) return;
    const now = new Date().toISOString();
    const copy: Project = {
      ...structuredClone(source),
      id: makeId(),
      name: `${source.name} (Copy)`,
      createdAt: now,
      updatedAt: now,
    };
    set((s) => ({ projects: [copy, ...s.projects] }));
    if (userId) {
      insertProject(copy, userId).catch((error) =>
        logSyncError("duplicate project", error),
      );
    }
  },

  updateDeliverableData: (projectId, deliverableId, data) => {
    const updatedAt = new Date().toISOString();
    let nextDeliverables: Project["deliverables"] | undefined;
    set((s) => ({
      projects: s.projects.map((p) => {
        if (p.id !== projectId) return p;
        const current = p.deliverables[deliverableId];
        const nextStatus: DeliverableStatus =
          current?.status === "not-started"
            ? "in-progress"
            : (current?.status ?? "in-progress");
        nextDeliverables = {
          ...p.deliverables,
          [deliverableId]: { status: nextStatus, data, updatedAt },
        };
        return { ...p, updatedAt, deliverables: nextDeliverables };
      }),
    }));
    if (nextDeliverables) {
      const deliverables = nextDeliverables;
      debounceWrite(`${projectId}:${deliverableId}`, () => {
        updateProjectRow(projectId, { deliverables, updatedAt }).catch(
          (error) => logSyncError("save deliverable", error),
        );
      });
    }
  },

  setDeliverableStatus: (projectId, deliverableId, status) => {
    const updatedAt = new Date().toISOString();
    let nextDeliverables: Project["deliverables"] | undefined;
    set((s) => ({
      projects: s.projects.map((p) => {
        if (p.id !== projectId) return p;
        const current = p.deliverables[deliverableId];
        nextDeliverables = {
          ...p.deliverables,
          [deliverableId]: { status, data: current?.data, updatedAt },
        };
        return { ...p, updatedAt, deliverables: nextDeliverables };
      }),
    }));
    if (nextDeliverables) {
      updateProjectRow(projectId, {
        deliverables: nextDeliverables,
        updatedAt,
      }).catch((error) => logSyncError("update deliverable status", error));
    }
  },

  importProject: (project) => {
    const userId = get().userId;
    const id = makeId();
    const now = new Date().toISOString();
    const imported: Project = {
      ...project,
      id,
      createdAt: now,
      updatedAt: now,
    };
    set((s) => ({ projects: [imported, ...s.projects] }));
    if (userId) {
      insertProject(imported, userId).catch((error) =>
        logSyncError("import project", error),
      );
    }
    return id;
  },
}));

export function useProject(id: string): Project | undefined {
  return useStore((s) => s.projects.find((p) => p.id === id));
}
