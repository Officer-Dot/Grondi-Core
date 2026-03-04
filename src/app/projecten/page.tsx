"use client";

import { AppShell } from "@/components/app-shell";
import { ModuleGuard } from "@/components/module-guard";
import { useRuntime } from "@/components/runtime-context";
import { ObjectItem, ProjectItem, objectCategories } from "@/lib/domain";
import {
  createProject,
  createProjectObject,
  subscribeProjectObjects,
  subscribeProjects,
  subscribeUserProjectIds,
} from "@/lib/firestore-service";
import { db } from "@/lib/firebase";
import {
  initialObjects,
  initialProjects,
  initialUserProjectAccess,
} from "@/lib/mvp-data";
import dynamic from "next/dynamic";
import { FormEvent, useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";

const ProjectMap = dynamic(
  () => import("@/components/project-map").then((module) => module.ProjectMap),
  { ssr: false }
);

export default function ProjectenPage() {
  const { tenantId, userId } = useRuntime();

  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [accessibleProjectIds, setAccessibleProjectIds] = useState<string[]>(
    initialUserProjectAccess[userId] || []
  );
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [objects, setObjects] = useState<ObjectItem[]>([]);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectUsers, setProjectUsers] = useState(userId);
  const [projectPolygonPoints, setProjectPolygonPoints] = useState<
    Array<{ lat: number; lng: number }>
  >([]);

  const [objectName, setObjectName] = useState("");
  const [objectCategory, setObjectCategory] = useState<ObjectItem["category"]>("sport");
  const [objectType, setObjectType] = useState("Sportveld");
  const [polygonPoints, setPolygonPoints] = useState<Array<{ lat: number; lng: number }>>([]);
  const [message, setMessage] = useState("Projecten met toegangscontrole en polygon-objecten.");

  useEffect(() => {
    const unsubProjects = subscribeProjects(tenantId, (rows) => {
      if (rows.length > 0) {
        setProjects(rows);
      } else if (!db) {
        setProjects(initialProjects.filter((project) => project.tenantId === tenantId));
      } else {
        setProjects([]);
      }
    });

    const unsubUserAccess = subscribeUserProjectIds(tenantId, userId, (projectIds) => {
      if (projectIds.length > 0) {
        setAccessibleProjectIds(projectIds);
      } else if (!db) {
        setAccessibleProjectIds(initialUserProjectAccess[userId] || []);
      } else {
        setAccessibleProjectIds([]);
      }
    });

    return () => {
      unsubProjects();
      unsubUserAccess();
    };
  }, [tenantId, userId]);

  const accessibleProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          accessibleProjectIds.includes(project.id) || project.allowedUserIds.includes(userId)
      ),
    [projects, accessibleProjectIds, userId]
  );

  const activeProjectId = selectedProjectId || accessibleProjects[0]?.id || "";

  useEffect(() => {
    if (!activeProjectId) {
      return;
    }

    const unsubObjects = subscribeProjectObjects(tenantId, activeProjectId, (rows) => {
      if (rows.length > 0) {
        setObjects(rows);
      } else if (!db) {
        setObjects(
          initialObjects.filter(
            (object) =>
              object.tenantId === tenantId && object.projectId === activeProjectId
          )
        );
      } else {
        setObjects([]);
      }
    });

    return () => unsubObjects();
  }, [tenantId, activeProjectId]);

  const handleCreateProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (projectPolygonPoints.length < 3) {
      setMessage("Projectgebied vereist minimaal 3 polygonpunten op de kaart.");
      return;
    }

    const allowedUserIds = projectUsers
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!allowedUserIds.includes(userId)) {
      allowedUserIds.push(userId);
    }

    const createdProjectId = await createProject({
      tenantId,
      name: projectName,
      description: projectDescription,
      polygon: projectPolygonPoints,
      allowedUserIds,
    });

    if (!createdProjectId) {
      const now = new Date().toISOString();
      const localProject: ProjectItem = {
        id: `prj-${Date.now()}`,
        tenantId,
        createdAt: now,
        updatedAt: now,
        name: projectName,
        description: projectDescription,
        polygon: projectPolygonPoints,
        allowedUserIds,
      };
      setProjects((current) => [localProject, ...current]);
      setAccessibleProjectIds((current) =>
        current.includes(localProject.id) ? current : [localProject.id, ...current]
      );
      setSelectedProjectId(localProject.id);
      setMessage("Project lokaal toegevoegd (Firestore niet actief).");
    } else {
      setSelectedProjectId(createdProjectId);
      setMessage("Project opgeslagen in Firestore.");
    }

    setProjectName("");
    setProjectDescription("");
    setProjectUsers(userId);
    setProjectPolygonPoints([]);
  };

  const selectedProject = accessibleProjects.find(
    (project) => project.id === selectedProjectId
  );

  const handleCreateObject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedProjectId) {
      if (!activeProjectId) {
        setMessage("Selecteer eerst een project.");
        return;
      }
    }

    const projectId = selectedProjectId || activeProjectId;

    if (!projectId) {
      setMessage("Selecteer eerst een project.");
      return;
    }

    if (polygonPoints.length < 3) {
      setMessage("Polygon vereist minimaal 3 punten op de kaart.");
      return;
    }

    const created = await createProjectObject({
      tenantId,
      projectId,
      name: objectName,
      category: objectCategory,
      type: objectType,
      polygon: polygonPoints,
    });

    if (!created) {
      const now = new Date().toISOString();
      setObjects((current) => [
        {
          id: `obj-${Date.now()}`,
          projectId,
          tenantId,
          createdAt: now,
          updatedAt: now,
          name: objectName,
          category: objectCategory,
          type: objectType,
          status: "actief",
          polygon: polygonPoints,
          historie: [],
          fotos: [],
          onderhoudslog: [],
        },
        ...current,
      ]);
      setMessage("Object lokaal toegevoegd (Firestore niet actief).");
    } else {
      setMessage("Object opgeslagen in Firestore.");
    }

    setObjectName("");
    setObjectCategory("sport");
    setObjectType("Sportveld");
    setPolygonPoints([]);
  };

  return (
    <AppShell>
      <ModuleGuard module="objecten">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Projecten</h2>
          <p className="text-sm text-neutral-700">Gebruiker: {userId} • Tenant: {tenantId}</p>
          <p className="text-sm text-neutral-700">{message}</p>

          <form
            onSubmit={handleCreateProject}
            className="grid gap-2 rounded-lg border border-neutral-200 p-4 sm:grid-cols-2"
          >
            <input
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              className="rounded-md border border-neutral-300 px-3 py-2"
              placeholder="Projectnaam"
              required
            />
            <input
              value={projectDescription}
              onChange={(event) => setProjectDescription(event.target.value)}
              className="rounded-md border border-neutral-300 px-3 py-2"
              placeholder="Omschrijving"
              required
            />
            <input
              value={projectUsers}
              onChange={(event) => setProjectUsers(event.target.value)}
              className="rounded-md border border-neutral-300 px-3 py-2 sm:col-span-2"
              placeholder="Toegang gebruikers IDs (comma separated)"
              required
            />
            <div className="sm:col-span-2">
              <ProjectMap
                polygonPoints={projectPolygonPoints}
                existingPolygons={[]}
                onAddPoint={(point) =>
                  setProjectPolygonPoints((current) => [...current, point])
                }
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setProjectPolygonPoints([])}
                  className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100"
                >
                  Projectgebied leegmaken
                </button>
                <p className="self-center text-xs text-neutral-600">
                  Polygonpunten project: {projectPolygonPoints.length}
                </p>
              </div>
            </div>
            <button className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-100 sm:col-span-2">
              Project aanmaken
            </button>
          </form>

          <section className="rounded-lg border border-neutral-200 p-4">
            <h3 className="text-sm font-semibold">Projectlijst (toegang op gebruiker)</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {accessibleProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`rounded-md border px-3 py-1 text-sm ${
                    activeProjectId === project.id
                      ? "border-neutral-900 bg-neutral-100"
                      : "border-neutral-300"
                  }`}
                >
                  {project.name}
                </button>
              ))}
            </div>
          </section>

          <form
            onSubmit={handleCreateObject}
            className="grid gap-2 rounded-lg border border-neutral-200 p-4"
          >
            <h3 className="text-sm font-semibold">Object in project met polygon</h3>
            <input
              value={objectName}
              onChange={(event) => setObjectName(event.target.value)}
              className="rounded-md border border-neutral-300 px-3 py-2"
              placeholder="Objectnaam (bijv. Voetbalveld 1)"
              required
            />
            <select
              value={objectCategory}
              onChange={(event) =>
                setObjectCategory(event.target.value as ObjectItem["category"])
              }
              className="rounded-md border border-neutral-300 px-3 py-2"
            >
              {objectCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              value={objectType}
              onChange={(event) => setObjectType(event.target.value)}
              className="rounded-md border border-neutral-300 px-3 py-2"
              placeholder="Type"
              required
            />

            <ProjectMap
              polygonPoints={polygonPoints}
              existingPolygons={[
                ...(selectedProject?.polygon ? [selectedProject.polygon] : []),
                ...objects.map((object) => object.polygon),
              ]}
              onAddPoint={(point) => setPolygonPoints((current) => [...current, point])}
            />

            <p className="text-xs text-neutral-600">
              Klik op de kaart om polygonpunten toe te voegen. Minimaal 3 punten.
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPolygonPoints([])}
                className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100"
              >
                Polygon leegmaken
              </button>
              <button className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-100">
                Object toevoegen aan project
              </button>
            </div>
          </form>

          <section className="rounded-lg border border-neutral-200 p-4">
            <h3 className="text-sm font-semibold">Objecten in geselecteerd project</h3>
            <p className="mt-1 text-xs text-neutral-600">
              Alleen objecten van project: {selectedProject?.name || "geen project geselecteerd"}
            </p>
            <div className="mt-2 space-y-2">
              {objects.map((object) => (
                <article key={object.id} className="rounded-md border border-neutral-200 p-3">
                  <h4 className="font-semibold">{object.name}</h4>
                  <p className="text-sm text-neutral-700">
                    {object.category}/{object.type} • status: {object.status} • polygonpunten: {object.polygon.length}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </section>
      </ModuleGuard>
    </AppShell>
  );
}
