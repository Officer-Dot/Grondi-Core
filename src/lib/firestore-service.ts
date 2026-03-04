import { tenantCollectionPath } from "@/lib/domain";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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

export async function createObject(input: CreateObjectInput) {
  if (!db) {
    return false;
  }

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
}

export async function createTask(input: CreateTaskInput) {
  if (!db) {
    return false;
  }

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
}

export async function registerTime(input: RegisterTimeInput) {
  if (!db) {
    return false;
  }

  await addDoc(collection(db, tenantCollectionPath(input.tenantId, "timeEntries")), {
    taskId: input.taskId,
    userId: input.userId,
    minutes: input.minutes,
    note: input.note,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return true;
}