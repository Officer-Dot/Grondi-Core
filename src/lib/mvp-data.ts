import { AssetItem, ObjectItem, TaskItem } from "@/lib/domain";

const now = new Date().toISOString();

export const initialObjects: ObjectItem[] = [
  {
    id: "obj-001",
    tenantId: "demo-tenant",
    createdAt: now,
    updatedAt: now,
    name: "Sportveld Noord",
    type: "Sportvelden",
    status: "actief",
    historie: ["Inspectie uitgevoerd"],
    fotos: [],
    onderhoudslog: ["Belijning gecontroleerd"],
  },
  {
    id: "obj-002",
    tenantId: "demo-tenant",
    createdAt: now,
    updatedAt: now,
    name: "Gemeentevak Centrum",
    type: "Gemeentevakken",
    status: "in_onderhoud",
    historie: ["Melding onkruidgroei"],
    fotos: [],
    onderhoudslog: ["Beurt ingepland"],
  },
];

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
    fotoUrls: [],
    materiaalgebruik: ["Snoeidraad"],
    auditlog: ["Status naar bezig"],
  },
];