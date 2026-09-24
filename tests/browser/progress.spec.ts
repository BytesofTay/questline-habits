import { expect, test } from "@playwright/test";

test("create and complete quests, then recover progress after refresh", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Daily quests" })).toBeVisible();
  await page.screenshot({ path: "docs/screenshots/questline-dashboard.png", fullPage: true });

  await expect(page.locator("header").getByText("1,280")).toBeVisible();
  await page.getByRole("button", { name: "Complete Move for 30 minutes" }).click();
  await expect(page.locator("header").getByText("1,370")).toBeVisible();

  await page.getByRole("button", { name: "Add quest" }).click();
  await page.getByLabel("Quest name").fill("Practice piano");
  await page.getByRole("button", { name: "Add for +40 coins" }).click();
  await expect(page.getByText("Practice piano")).toBeVisible();
  await page.getByRole("button", { name: "Complete Practice piano" }).click();
  await expect(page.locator("header").getByText("1,410")).toBeVisible();

  await page.reload();
  await expect(page.getByText("Practice piano")).toBeVisible();
  await expect(page.locator("header").getByText("1,410")).toBeVisible();
  await expect(page.getByRole("button", { name: "Move for 30 minutes completed" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Practice piano completed" })).toBeDisabled();
});
