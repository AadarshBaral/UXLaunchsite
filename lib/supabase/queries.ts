import { createClient } from "./client";
import type { Project } from "@/lib/workflow/types";

interface ProjectRow {
  id: string;
  user_id: string;
  name: string;
  avatar: string | null;
  start_date: string | null;
  due_date: string | null;
  deliverables: Project["deliverables"];
  created_at: string;
  updated_at: string;
}

function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    avatar: row.avatar ?? undefined,
    startDate: row.start_date ?? undefined,
    dueDate: row.due_date ?? undefined,
    deliverables: row.deliverables,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function projectToRow(project: Project, userId: string): ProjectRow {
  return {
    id: project.id,
    user_id: userId,
    name: project.name,
    avatar: project.avatar ?? null,
    start_date: project.startDate ?? null,
    due_date: project.dueDate ?? null,
    deliverables: project.deliverables,
    created_at: project.createdAt,
    updated_at: project.updatedAt,
  };
}

export async function fetchProjects(): Promise<Project[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as ProjectRow[]).map(rowToProject);
}

export async function insertProject(project: Project, userId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("projects").insert(projectToRow(project, userId));
  if (error) throw error;
}

export async function updateProjectRow(
  id: string,
  patch: Partial<Pick<Project, "name" | "avatar" | "startDate" | "dueDate" | "deliverables">> & {
    updatedAt: string;
  }
): Promise<void> {
  const supabase = createClient();
  const row: Record<string, unknown> = { updated_at: patch.updatedAt };
  if (patch.name !== undefined) row.name = patch.name;
  if (patch.avatar !== undefined) row.avatar = patch.avatar ?? null;
  if (patch.startDate !== undefined) row.start_date = patch.startDate ?? null;
  if (patch.dueDate !== undefined) row.due_date = patch.dueDate ?? null;
  if (patch.deliverables !== undefined) row.deliverables = patch.deliverables;

  const { error } = await supabase.from("projects").update(row).eq("id", id);
  if (error) throw error;
}

export async function deleteProjectRow(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}
