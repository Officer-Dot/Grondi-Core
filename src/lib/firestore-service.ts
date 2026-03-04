import { tenantCollectionPath } from "@/lib/domain";
import { db } from "@/lib/firebase";
import { AssetItem, ObjectItem, TaskItem, TimeEntry } from "@/lib/domain";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

interface CreateObjectInput {
  tenantId: string;
  name: string;
  type: string;
}

interface CreateTaskInput {
  tenantId: string;
  objectId: string;
  description: string;
}

interface RegisterTimeInput {
  tenantId: string;
  taskId: string;
  userId: string;
  minutes: number;
  note: string;
}

interface CreateAssetInput {
  tenantId: string;
  name: string;
  category: "machine" | "robot" | "voertuig" | "gereedschap" | "materiaal";
}

type SnapshotCallback<T> = (items: T[]) => void;

function mapDate(value: unknown) {
  if (!value) {
    return new Date(0).toISOString();
  }

  if (typeof value === "object" && value !== null && "toDate" in value) {
    const asTimestamp = value as { toDate: () => Date };
    return asTimestamp.toDate().toISOString();
  }

  return typeof value === "string" ? value : new Date(0).toISOString();
}

export async function createObject(input: CreateObjectInput) {
  if (!db) {
    return false;
  }

  try {
    await addDoc(collection(db, tenantCollectionPath(input.tenantId, "objects")), {
      name: input.name,
      type: input.type,
      status: "actief",
      historie: [],
      fotos: [],
      onderhoudslog: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch {
    return false;
  }
}

export async function createTask(input: CreateTaskInput) {
  if (!db) {
    return false;
  }

  try {
    await addDoc(collection(db, tenantCollectionPath(input.tenantId, "tasks")), {
      objectId: input.objectId,
      description: input.description,
      checklist: [],
      status: "nieuw",
      fotoUrls: [],
      materiaalgebruik: [],
      auditlog: ["Taak aangemaakt"],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch {
    return false;
  }
}

export async function registerTime(input: RegisterTimeInput) {
  if (!db) {
    return false;
  }

  try {
    await addDoc(collection(db, tenantCollectionPath(input.tenantId, "timeEntries")), {
      taskId: input.taskId,
      userId: input.userId,
      minutes: input.minutes,
      note: input.note,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch {
    return false;
  }
}

export async function createAsset(input: CreateAssetInput) {
  if (!db) {
    return false;
  }

  try {
    await addDoc(collection(db, tenantCollectionPath(input.tenantId, "assets")), {
      name: input.name,
      category: input.category,
      status: "beschikbaar",
      onderhoudsintervalDagen: 30,
      storingen: 0,
      qrCode: `QR-${Date.now()}`,
      urenregistratie: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch {
    return false;
  }
}

export async function updateTaskStatus(
  tenantId: string,
  taskId: string,
  status: TaskItem["status"]
) {
  if (!db) {
    return false;
  }

  try {
    await updateDoc(doc(db, tenantCollectionPath(tenantId, "tasks"), taskId), {
      status,
      updatedAt: serverTimestamp(),
      auditlog: [`Status gewijzigd naar ${status}`],
    });

    return true;
  } catch {
    return false;
  }
}

export function subscribeObjects(tenantId: string, callback: SnapshotCallback<ObjectItem>) {
  if (!db) {
    callback([]);
    return () => undefined;
  }

  const objectsQuery = query(
    collection(db, tenantCollectionPath(tenantId, "objects")),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(objectsQuery, (snapshot) => {
    const rows = snapshot.docs.map((entry) => {
      const data = entry.data();
      return {
        id: entry.id,
        tenantId,
        createdAt: mapDate(data.createdAt),
        updatedAt: mapDate(data.updatedAt),
        name: String(data.name ?? "Onbekend object"),
        type: String(data.type ?? "Onbekend"),
        status: (data.status as ObjectItem["status"]) ?? "actief",
        historie: Array.isArray(data.historie) ? data.historie : [],
        fotos: Array.isArray(data.fotos) ? data.fotos : [],
        onderhoudslog: Array.isArray(data.onderhoudslog) ? data.onderhoudslog : [],
      } satisfies ObjectItem;
    });

    callback(rows);
  });
}

export function subscribeTasks(tenantId: string, callback: SnapshotCallback<TaskItem>) {
  if (!db) {
    callback([]);
    return () => undefined;
  }

  const tasksQuery = query(
    collection(db, tenantCollectionPath(tenantId, "tasks")),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(tasksQuery, (snapshot) => {
    const rows = snapshot.docs.map((entry) => {
      const data = entry.data();
      return {
        id: entry.id,
        tenantId,
        createdAt: mapDate(data.createdAt),
        updatedAt: mapDate(data.updatedAt),
        objectId: String(data.objectId ?? "onbekend"),
        description: String(data.description ?? "Geen beschrijving"),
        checklist: Array.isArray(data.checklist) ? data.checklist : [],
        status: (data.status as TaskItem["status"]) ?? "nieuw",
        fotoUrls: Array.isArray(data.fotoUrls) ? data.fotoUrls : [],
        materiaalgebruik: Array.isArray(data.materiaalgebruik) ? data.materiaalgebruik : [],
        auditlog: Array.isArray(data.auditlog) ? data.auditlog : [],
      } satisfies TaskItem;
    });

    callback(rows);
  });
}

export function subscribeAssets(tenantId: string, callback: SnapshotCallback<AssetItem>) {
  if (!db) {
    callback([]);
    return () => undefined;
  }

  const assetsQuery = query(
    collection(db, tenantCollectionPath(tenantId, "assets")),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(assetsQuery, (snapshot) => {
    const rows = snapshot.docs.map((entry) => {
      const data = entry.data();
      return {
        id: entry.id,
        tenantId,
        createdAt: mapDate(data.createdAt),
        updatedAt: mapDate(data.updatedAt),
        name: String(data.name ?? "Onbekende asset"),
        category: (data.category as AssetItem["category"]) ?? "machine",
        status: (data.status as AssetItem["status"]) ?? "beschikbaar",
        onderhoudsintervalDagen: Number(data.onderhoudsintervalDagen ?? 30),
        storingen: Number(data.storingen ?? 0),
        qrCode: String(data.qrCode ?? "QR-UNKNOWN"),
        urenregistratie: Number(data.urenregistratie ?? 0),
      } satisfies AssetItem;
    });

    callback(rows);
  });
}

export function subscribeTimeEntries(tenantId: string, callback: SnapshotCallback<TimeEntry>) {
  if (!db) {
    callback([]);
    return () => undefined;
  }

  const entriesQuery = query(
    collection(db, tenantCollectionPath(tenantId, "timeEntries")),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(entriesQuery, (snapshot) => {
    const rows = snapshot.docs.map((entry) => {
      const data = entry.data();
      return {
        id: entry.id,
        tenantId,
        createdAt: mapDate(data.createdAt),
        updatedAt: mapDate(data.updatedAt),
        taskId: String(data.taskId ?? "onbekend"),
        userId: String(data.userId ?? "onbekend"),
        minutes: Number(data.minutes ?? 0),
        note: String(data.note ?? ""),
      } satisfies TimeEntry;
    });

    callback(rows);
  });
}