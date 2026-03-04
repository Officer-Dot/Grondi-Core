import { canAccessModule, tenantCollectionPath } from "@/lib/domain";
import { describe, expect, it } from "vitest";

describe("domain helpers", () => {
  it("bouwt correcte tenant collection path", () => {
    expect(tenantCollectionPath("tenant-1", "tasks")).toBe("tenants/tenant-1/tasks");
  });

  it("geeft planner toegang tot planning", () => {
    expect(canAccessModule("planner", "planning")).toBe(true);
  });

  it("weigert medewerker voor assets module", () => {
    expect(canAccessModule("medewerker", "assets")).toBe(false);
  });
});
