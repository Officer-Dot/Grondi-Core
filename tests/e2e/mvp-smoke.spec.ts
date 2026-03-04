import { expect, test } from "@playwright/test";

test("MVP smoke flow works", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Operationeel Kernplatform")).toBeVisible();

  await page.locator("select").first().selectOption("admin");

  await page.getByRole("link", { name: "Objecten" }).click();
  await expect(page.getByRole("heading", { name: "Objecten" })).toBeVisible();

  const uniqueName = `E2E Object ${Date.now()}`;
  await page.getByPlaceholder("Objectnaam").fill(uniqueName);
  await page.getByPlaceholder("Type").fill("Parken");
  await page.getByRole("button", { name: "Object aanmaken" }).click();
  await expect(page.getByText(uniqueName)).toBeVisible();

  await page.getByRole("link", { name: "Taken" }).click();
  await expect(page.getByRole("heading", { name: "Taken" })).toBeVisible();

  const uniqueTask = `E2E Taak ${Date.now()}`;
  await page.getByPlaceholder("Object ID").fill("obj-e2e");
  await page.getByPlaceholder("Taakbeschrijving").fill(uniqueTask);
  await page.getByRole("button", { name: "Taak aanmaken" }).click();
  await expect(page.getByText(/Taak opgeslagen|Taak lokaal toegevoegd/)).toBeVisible();
});