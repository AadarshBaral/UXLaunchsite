import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { makeId } from "./id";
import { ALL_DELIVERABLES } from "./workflow/config";
import { createInitialData } from "./workflow/data";
import type { DeliverableState, DeliverableStatus, Project } from "./workflow/types";

function freshDeliverables(): Record<string, DeliverableState> {
  const now = new Date().toISOString();
  const map: Record<string, DeliverableState> = {};
  ALL_DELIVERABLES.forEach((config) => {
    map[config.id] = { status: "not-started", data: createInitialData(config), updatedAt: now };
  });
  return map;
}

interface StoreState {
  projects: Project[];
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  createProject: (name: string) => string;
  updateProjectDetails: (
    id: string,
    patch: Partial<Pick<Project, "name" | "avatar" | "startDate" | "dueDate">>
  ) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  updateDeliverableData: (projectId: string, deliverableId: string, data: unknown) => void;
  setDeliverableStatus: (projectId: string, deliverableId: string, status: DeliverableStatus) => void;
  importProject: (project: Project) => string;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      projects: [],
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

      createProject: (name) => {
        const id = makeId();
        const now = new Date().toISOString();
        const project: Project = {
          id,
          name: name.trim() || "Untitled project",
          startDate: now.slice(0, 10),
          createdAt: now,
          updatedAt: now,
          deliverables: freshDeliverables(),
        };
        set((s) => ({ projects: [project, ...s.projects] }));
        return id;
      },

      updateProjectDetails: (id, patch) => {
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...patch,
                  name: patch.name !== undefined ? patch.name.trim() || p.name : p.name,
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        }));
      },

      deleteProject: (id) => {
        set((s) => ({ projects: s.projects.filter((p) => p.id !== id) }));
      },

      duplicateProject: (id) => {
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
      },

      updateDeliverableData: (projectId, deliverableId, data) => {
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== projectId) return p;
            const current = p.deliverables[deliverableId];
            const nextStatus: DeliverableStatus =
              current?.status === "not-started" ? "in-progress" : current?.status ?? "in-progress";
            return {
              ...p,
              updatedAt: new Date().toISOString(),
              deliverables: {
                ...p.deliverables,
                [deliverableId]: { status: nextStatus, data, updatedAt: new Date().toISOString() },
              },
            };
          }),
        }));
      },

      setDeliverableStatus: (projectId, deliverableId, status) => {
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== projectId) return p;
            const current = p.deliverables[deliverableId];
            return {
              ...p,
              updatedAt: new Date().toISOString(),
              deliverables: {
                ...p.deliverables,
                [deliverableId]: {
                  status,
                  data: current?.data,
                  updatedAt: new Date().toISOString(),
                },
              },
            };
          }),
        }));
      },

      importProject: (project) => {
        const id = makeId();
        const now = new Date().toISOString();
        const imported: Project = { ...project, id, createdAt: now, updatedAt: now };
        set((s) => ({ projects: [imported, ...s.projects] }));
        return id;
      },
    }),
    {
      name: "ux-launchpad-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export function useProject(id: string): Project | undefined {
  return useStore((s) => s.projects.find((p) => p.id === id));
}
