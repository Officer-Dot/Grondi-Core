import { expect, test } from "@playwright/test";

test("MVP smoke flow works", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Operationeel Kernplatform")).toBeVisible();

  await page.locator("select").first().selectOption("admin");

  await page.getByRole("link", { name: "Projecten" }).click();
  await expect(page.getByRole("heading", { name: "Projecten" })).toBeVisible();

  const uniqueProject = `E2E Project ${Date.now()}`;
  await page.getByPlaceholder("Projectnaam").fill(uniqueProject);
  await page.getByPlaceholder("Omschrijving").fill("Gemeente E2E");
  await page
    .getByPlaceholder("Toegang gebruikers IDs (comma separated)")
    .fill("usr-001");

  const map = page.locator(".leaflet-container").first();
  await map.click({ position: { x: 80, y: 80 } });
  await map.click({ position: { x: 180, y: 80 } });
  await map.click({ position: { x: 130, y: 160 } });

  await page.getByRole("button", { name: "Project aanmaken" }).click();
  await expect(page.getByText(/Project opgeslagen|Project lokaal toegevoegd/)).toBeVisible();

  await page.getByRole("link", { name: "Taken" }).click();
  await expect(page.getByRole("heading", { name: "Taken" })).toBeVisible();

  const uniqueTask = `E2E Taak ${Date.now()}`;
  await page.getByPlaceholder("Object ID").fill("obj-e2e");
  await page.getByPlaceholder("Taakbeschrijving").fill(uniqueTask);
  await page.getByRole("button", { name: "Taak aanmaken" }).click();
  await expect(page.getByText(/Taak opgeslagen|Taak lokaal toegevoegd/)).toBeVisible();
});