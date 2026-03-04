import { AssetItem, ObjectItem, TaskItem, TimeEntry } from "@/lib/domain";

export interface TenantKpis {
  objectenTotaal: number;
  assetsTotaal: number;
  takenTotaal: number;
  takenAfgerond: number;
  openStoringen: number;
  urenTotaal: number;
}

export function calculateTenantKpis(input: {
  objects: ObjectItem[];
  assets: AssetItem[];
  tasks: TaskItem[];
  timeEntries: TimeEntry[];
}): TenantKpis {
  return {
    objectenTotaal: input.objects.length,
    assetsTotaal: input.assets.length,
    takenTotaal: input.tasks.length,
    takenAfgerond: input.tasks.filter((task) => task.status === "afgerond").length,
    openStoringen: input.assets.reduce((acc, asset) => acc + asset.storingen, 0),
    urenTotaal: input.timeEntries.reduce((acc, entry) => acc + entry.minutes, 0),
  };
}

export function tasksToCsv(tasks: TaskItem[]) {
  const headers = ["id", "objectId", "description", "status", "tenantId"];
  const rows = tasks.map((task) => [task.id, task.objectId, task.description, task.status, task.tenantId]);
  return [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\n");
}