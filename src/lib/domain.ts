export type UserRole = "medewerker" | "planner" | "beheerder" | "admin";

export type CoreModule = "objecten" | "planning" | "assets" | "taken";

export interface TenantScoped {
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ObjectItem extends TenantScoped {
  id: string;
  projectId: string;
  name: string;
  category: "sport" | "groen" | "infra" | "water" | "overig";
  type: string;
  status: "actief" | "in_onderhoud" | "gesloten";
  polygon: Array<{ lat: number; lng: number }>;
  historie: string[];
  fotos: string[];
  onderhoudslog: string[];
}

export interface ProjectItem extends TenantScoped {
  id: string;
  name: string;
  description: string;
  polygon: Array<{ lat: number; lng: number }>;
  allowedUserIds: string[];
}

export interface AssetItem extends TenantScoped {
  id: string;
  name: string;
  category: "machine" | "robot" | "voertuig" | "gereedschap" | "materiaal";
  status: "beschikbaar" | "in_gebruik" | "storing";
  onderhoudsintervalDagen: number;
  storingen: number;
  qrCode: string;
  urenregistratie: number;
}

export interface TaskItem extends TenantScoped {
  id: string;
  objectId: string;
  description: string;
  checklist: string[];
  status: "nieuw" | "gepland" | "bezig" | "afgerond";
  fotoUrls: string[];
  materiaalgebruik: string[];
  afgerondDoor?: string;
  medewerker?: string;
  machine?: string;
  route?: string;
  herhaling?: string;
  auditlog: string[];
}

export interface TimeEntry extends TenantScoped {
  id: string;
  taskId: string;
  userId: string;
  minutes: number;
  note: string;
}

export const tenantRoot = (tenantId: string) => `tenants/${tenantId}`;
export const tenantCollectionPath = (
  tenantId: string,
  collection: "users" | "objects" | "assets" | "tasks" | "timeEntries" | "projects"
) => `${tenantRoot(tenantId)}/${collection}`;

export const projectObjectsCollectionPath = (tenantId: string, projectId: string) =>
  `${tenantRoot(tenantId)}/projects/${projectId}/objects`;

export const roleCapabilities: Record<UserRole, string[]> = {
  medewerker: ["taken.zien", "fotos.uploaden", "uren.registreren", "status.wijzigen"],
  planner: ["planning.beheren", "taken.aanmaken", "medewerkers.koppelen"],
  beheerder: ["assets.beheren", "objecten.beheren", "rapportages.genereren"],
  admin: ["rechten.instellen", "vestigingen.beheren", "abonnementen.beheren"],
};

export type RoleCapability =
  | "taken.zien"
  | "fotos.uploaden"
  | "uren.registreren"
  | "status.wijzigen"
  | "planning.beheren"
  | "taken.aanmaken"
  | "medewerkers.koppelen"
  | "assets.beheren"
  | "objecten.beheren"
  | "rapportages.genereren"
  | "rechten.instellen"
  | "vestigingen.beheren"
  | "abonnementen.beheren";

export const moduleAccess: Record<CoreModule, UserRole[]> = {
  objecten: ["beheerder", "admin"],
  planning: ["planner", "beheerder", "admin"],
  assets: ["beheerder", "admin"],
  taken: ["medewerker", "planner", "beheerder", "admin"],
};

export function canAccessModule(role: UserRole, module: CoreModule) {
  return moduleAccess[module].includes(role);
}

export function hasCapability(role: UserRole, capability: RoleCapability) {
  return roleCapabilities[role].includes(capability);
}

export const objectCategories: Array<ObjectItem["category"]> = [
  "sport",
  "groen",
  "infra",
  "water",
  "overig",
];