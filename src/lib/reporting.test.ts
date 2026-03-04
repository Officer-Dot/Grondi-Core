import { calculateTenantKpis, tasksToCsv } from "@/lib/reporting";
import { describe, expect, it } from "vitest";

describe("reporting helpers", () => {
  it("berekent tenant KPI waarden correct", () => {
    const result = calculateTenantKpis({
      objects: [
        {
          id: "o1",
          tenantId: "t1",
          createdAt: "2026-01-01",
          updatedAt: "2026-01-01",
          name: "Obj",
          type: "Park",
          status: "actief",
          historie: [],
          fotos: [],
          onderhoudslog: [],
        },
      ],
      assets: [
        {
          id: "a1",
          tenantId: "t1",
          createdAt: "2026-01-01",
          updatedAt: "2026-01-01",
          name: "Maaier",
          category: "machine",
          status: "beschikbaar",
          onderhoudsintervalDagen: 30,
          storingen: 2,
          qrCode: "QR",
          urenregistratie: 12,
        },
      ],
      tasks: [
        {
          id: "tsk1",
          tenantId: "t1",
          createdAt: "2026-01-01",
          updatedAt: "2026-01-01",
          objectId: "o1",
          description: "Test",
          checklist: [],
          status: "afgerond",
          fotoUrls: [],
          materiaalgebruik: [],
          auditlog: [],
        },
      ],
      timeEntries: [
        {
          id: "te1",
          tenantId: "t1",
          createdAt: "2026-01-01",
          updatedAt: "2026-01-01",
          taskId: "tsk1",
          userId: "u1",
          minutes: 45,
          note: "done",
        },
      ],
    });

    expect(result.objectenTotaal).toBe(1);
    expect(result.assetsTotaal).toBe(1);
    expect(result.takenAfgerond).toBe(1);
    expect(result.openStoringen).toBe(2);
    expect(result.urenTotaal).toBe(45);
  });

  it("genereert CSV met header en data", () => {
    const csv = tasksToCsv([
      {
        id: "tsk1",
        tenantId: "t1",
        createdAt: "2026-01-01",
        updatedAt: "2026-01-01",
        objectId: "o1",
        description: "Inspectie",
        checklist: [],
        status: "nieuw",
        fotoUrls: [],
        materiaalgebruik: [],
        auditlog: [],
      },
    ]);

    expect(csv).toContain("\"id\",\"objectId\",\"description\",\"status\",\"tenantId\"");
    expect(csv).toContain("\"tsk1\",\"o1\",\"Inspectie\",\"nieuw\",\"t1\"");
  });
});
