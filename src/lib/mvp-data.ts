import { AssetItem, ObjectItem, ProjectItem, TaskItem } from "@/lib/domain";

const now = new Date().toISOString();

export const initialObjects: ObjectItem[] = [
  {
    id: "obj-001",
    projectId: "prj-eemshaven",
    tenantId: "demo-tenant",
    createdAt: now,
    updatedAt: now,
    name: "Sportveld Noord",
    type: "Sportvelden",
    status: "actief",
    polygon: [
      { lat: 53.4415, lng: 6.8382 },
      { lat: 53.4412, lng: 6.8394 },
      { lat: 53.4403, lng: 6.8391 },
      { lat: 53.4406, lng: 6.8380 },
    ],
    historie: ["Inspectie uitgevoerd"],
    fotos: [],
    onderhoudslog: ["Belijning gecontroleerd"],
  },
  {
    id: "obj-002",
    projectId: "prj-maastricht",
    tenantId: "demo-tenant",
    createdAt: now,
    updatedAt: now,
    name: "Gemeentevak Centrum",
    type: "Gemeentevakken",
    status: "in_onderhoud",
    polygon: [
      { lat: 50.8511, lng: 5.6909 },
      { lat: 50.8510, lng: 5.6921 },
      { lat: 50.8502, lng: 5.6918 },
      { lat: 50.8503, lng: 5.6907 },
    ],
    historie: ["Melding onkruidgroei"],
    fotos: [],
    onderhoudslog: ["Beurt ingepland"],
  },
];

export const initialProjects: ProjectItem[] = [
  {
    id: "prj-eemshaven",
    tenantId: "demo-tenant",
    createdAt: now,
    updatedAt: now,
    name: "Eemshaven",
    description: "Gemeente A",
    polygon: [
      { lat: 53.443, lng: 6.834 },
      { lat: 53.443, lng: 6.846 },
      { lat: 53.437, lng: 6.846 },
      { lat: 53.437, lng: 6.834 },
    ],
    allowedUserIds: ["usr-001", "usr-groningen"],
  },
  {
    id: "prj-maastricht",
    tenantId: "demo-tenant",
    createdAt: now,
    updatedAt: now,
    name: "Maastricht Centrum",
    description: "Gemeente B",
    polygon: [
      { lat: 50.854, lng: 5.685 },
      { lat: 50.854, lng: 5.699 },
      { lat: 50.847, lng: 5.699 },
      { lat: 50.847, lng: 5.685 },
    ],
    allowedUserIds: ["usr-002"],
  },
];

export const initialUserProjectAccess: Record<string, string[]> = {
  "usr-001": ["prj-eemshaven"],
  "usr-groningen": ["prj-eemshaven"],
  "usr-002": ["prj-maastricht"],
};

export const initialAssets: AssetItem[] = [
  {
    id: "ast-001",
    tenantId: "demo-tenant",
    createdAt: now,
    updatedAt: now,
    name: "Maaimachine A1",
    category: "machine",
    status: "beschikbaar",
    onderhoudsintervalDagen: 30,
    storingen: 0,
    qrCode: "QR-A1",
    urenregistratie: 12,
  },
  {
    id: "ast-002",
    tenantId: "demo-tenant",
    createdAt: now,
    updatedAt: now,
    name: "Servicebus 03",
    category: "voertuig",
    status: "in_gebruik",
    onderhoudsintervalDagen: 90,
    storingen: 1,
    qrCode: "QR-BUS03",
    urenregistratie: 84,
  },
];

export const initialTasks: TaskItem[] = [
  {
    id: "tsk-001",
    tenantId: "demo-tenant",
    createdAt: now,
    updatedAt: now,
    objectId: "obj-001",
    description: "Maai veld en verwijder zwerfvuil",
    checklist: ["Veiligheidscheck", "Maaien", "Eindcontrole"],
    status: "gepland",
    medewerker: "Lars",
    machine: "Maaier A1",
    route: "Noordroute",
    herhaling: "Wekelijks",
    fotoUrls: [],
    materiaalgebruik: ["Brandstof"],
    auditlog: ["Taak aangemaakt"],
  },
  {
    id: "tsk-002",
    tenantId: "demo-tenant",
    createdAt: now,
    updatedAt: now,
    objectId: "obj-002",
    description: "Snoeiwerk en kantafwerking",
    checklist: ["PBM check", "Snoeien", "Afvoer groen"],
    status: "bezig",
    medewerker: "Mila",
    machine: "Bus 03",
    route: "Centrumroute",
    herhaling: "Eenmalig",
    fotoUrls: [],
    materiaalgebruik: ["Snoeidraad"],
    auditlog: ["Status naar bezig"],
  },
];