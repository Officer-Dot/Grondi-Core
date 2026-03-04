export type PlanningStatus = "nieuw" | "gepland" | "bezig" | "afgerond";

export interface PlanningTask {
  id: string;
  title: string;
  medewerker: string;
  machine: string;
  route: string;
  status: PlanningStatus;
}

export const planningColumns: PlanningStatus[] = ["nieuw", "gepland", "bezig", "afgerond"];

export function groupPlanningTasks(items: PlanningTask[]) {
  return planningColumns.reduce<Record<PlanningStatus, PlanningTask[]>>(
    (acc, column) => {
      acc[column] = items.filter((item) => item.status === column);
      return acc;
    },
    { nieuw: [], gepland: [], bezig: [], afgerond: [] }
  );
}

export function movePlanningTask(
  items: PlanningTask[],
  taskId: string,
  target: PlanningStatus
) {
  return items.map((item) => (item.id === taskId ? { ...item, status: target } : item));
}
