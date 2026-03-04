import {
  groupPlanningTasks,
  movePlanningTask,
  PlanningTask,
  planningColumns,
} from "@/lib/planning";
import { describe, expect, it } from "vitest";

const sample: PlanningTask[] = [
  {
    id: "p-1",
    title: "Taak 1",
    medewerker: "A",
    machine: "M1",
    route: "R1",
    status: "nieuw",
  },
  {
    id: "p-2",
    title: "Taak 2",
    medewerker: "B",
    machine: "M2",
    route: "R2",
    status: "bezig",
  },
];

describe("planning helpers", () => {
  it("heeft vaste kolomvolgorde", () => {
    expect(planningColumns).toEqual(["nieuw", "gepland", "bezig", "afgerond"]);
  });

  it("groepeert taken per status", () => {
    const grouped = groupPlanningTasks(sample);
    expect(grouped.nieuw).toHaveLength(1);
    expect(grouped.bezig).toHaveLength(1);
    expect(grouped.afgerond).toHaveLength(0);
  });

  it("verplaatst taak naar target status", () => {
    const moved = movePlanningTask(sample, "p-1", "afgerond");
    expect(moved.find((task) => task.id === "p-1")?.status).toBe("afgerond");
  });
});
