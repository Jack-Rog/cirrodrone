import { expect, test } from "@playwright/test";

test("landing page pivots to beta access capture", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /Appstore for drones/i })
  ).toBeVisible();

  const heroBetaLink = page.getByRole("link", { name: /^Request beta access$/i }).first();
  await expect(heroBetaLink).toHaveAttribute("href", /\/beta-access$/);

  await expect(page.getByRole("link", { name: /Open pilot preview/i })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Open developer preview/i })).toHaveCount(0);

  const pilotPathSection = page.locator("#how-it-fits");
  const betaSection = page.locator("#beta-access");

  const pilotPathBox = await pilotPathSection.boundingBox();
  const betaBox = await betaSection.boundingBox();
  expect(pilotPathBox?.y ?? 0).toBeLessThan(betaBox?.y ?? 0);

  await expect(
    pilotPathSection.getByText("Download Cirro", { exact: true }).first()
  ).toBeVisible();
  await expect(
    pilotPathSection.getByText("Plug in your remote", { exact: true }).first()
  ).toBeVisible();
  await expect(
    pilotPathSection.getByText("Unlock your drone's potential", { exact: true }).first()
  ).toBeVisible();
  await expect(
    pilotPathSection.getByText(
      "Cirro turns your regular drone into a smart drone with one click",
      { exact: true }
    )
  ).toBeVisible();
  await expect(
    pilotPathSection.getByText(
      "Turn your dumb drone into a smart drone with Cirro. Explore the appstore, build your own software or connect to existing workflows.",
      { exact: true }
    )
  ).toHaveCount(0);
  await expect(page.getByTestId("pilot-path-visual-desktop")).toBeVisible();
  await expect(page.getByText("System architecture", { exact: true })).toHaveCount(0);
  await expect(
    page.getByText("Cirro bridges the local drone stack and your cloud environment", { exact: true })
  ).toHaveCount(0);
  await expect(
    page.getByText(
      "Cirro runs locally on the computer / ground station, standardises incoming telemetry, video, and state for cloud use, and translates generic cloud workflows back into drone-specific commands.",
      { exact: true }
    )
  ).toHaveCount(0);

  await expect(page.getByText("Access a universe of software with your current setup. No configuration required.")).toBeVisible();
  await expect(page.getByText("Allow your software to reach entirely new hardware with minimal changes.")).toBeVisible();
  await expect(page.getByText("Mapping, inspection, patrol, or survey work")).toHaveCount(0);
  await expect(page.getByText("An app, repo, or integration in motion")).toHaveCount(0);

  await page.getByRole("link", { name: /^Pilot access$/i }).scrollIntoViewIfNeeded();
  await page.getByRole("link", { name: /^Pilot access$/i }).click();
  await expect(page).toHaveURL(/\/beta-access\/pilot$/);
  await page.goBack();

  await page.getByRole("link", { name: /^Developer access$/i }).scrollIntoViewIfNeeded();
  await page.getByRole("link", { name: /^Developer access$/i }).click();
  await expect(page).toHaveURL(/\/beta-access\/developer$/);
  await page.goBack();

  await heroBetaLink.click();
  await expect(page).toHaveURL(/\/beta-access$/);
  await page.goBack();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByTestId("pilot-path-visual-mobile")).toBeVisible();
  const mobileSectionText = await page.locator("#how-it-fits").textContent();
  expect(mobileSectionText?.indexOf("Download Cirro") ?? -1).toBeGreaterThanOrEqual(0);
  expect(mobileSectionText?.indexOf("Plug in your remote") ?? -1).toBeGreaterThan(
    mobileSectionText?.indexOf("Download Cirro") ?? -1
  );
  expect(mobileSectionText?.indexOf("Unlock your drone's potential") ?? -1).toBeGreaterThan(
    mobileSectionText?.indexOf("Plug in your remote") ?? -1
  );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)
  ).toBeTruthy();

  const pilotCardBox = await page.getByRole("link", { name: /^Pilot access$/i }).boundingBox();
  const developerCardBox = await page.getByRole("link", { name: /^Developer access$/i }).boundingBox();
  expect((pilotCardBox?.y ?? 0) + (pilotCardBox?.height ?? 0)).toBeLessThan(
    developerCardBox?.y ?? Number.POSITIVE_INFINITY
  );
});

test("beta pages capture minimal intake with shared role selection", async ({ page }) => {
  const roleCases = [
    {
      audience: "pilot",
      fleetLabel: "DJI",
      heading: "Join the Cirro beta",
      submitLabel: "Request beta access",
      successHeading: "Pilot beta request received",
    },
    {
      audience: "developer",
      fleetLabel: "ArduPilot",
      heading: "Join the Cirro beta",
      submitLabel: "Request beta access",
      successHeading: "Developer beta request received",
    },
  ] as const;

  await page.goto("/beta-access");
  await expect(page.getByRole("heading", { level: 1, name: "Join the Cirro beta" })).toBeVisible();
  await expect(page.getByText("Are you a Pilot or Developer?", { exact: true })).toBeVisible();

  const sharedPilotToggle = page.locator("button[aria-pressed]").filter({ hasText: "Pilot" });
  const sharedDeveloperToggle = page
    .locator("button[aria-pressed]")
    .filter({ hasText: "Developer" });

  await expect(sharedPilotToggle).toHaveAttribute("aria-pressed", "false");
  await expect(sharedDeveloperToggle).toHaveAttribute("aria-pressed", "false");

  await sharedPilotToggle.click();
  await sharedDeveloperToggle.click();

  await expect(sharedPilotToggle).toHaveAttribute("aria-pressed", "true");
  await expect(sharedDeveloperToggle).toHaveAttribute("aria-pressed", "true");

  for (const roleCase of roleCases) {
    await page.goto(`/beta-access/${roleCase.audience}`);

    const pilotToggle = page.locator("button[aria-pressed]").filter({ hasText: "Pilot" });
    const developerToggle = page.locator("button[aria-pressed]").filter({ hasText: "Developer" });

    await expect(page.getByRole("heading", { level: 1, name: roleCase.heading })).toBeVisible();
    await expect(
      page.getByText(
        "Bring your current setup, your biggest pain point, and the reason you want access now.",
        { exact: true }
      )
    ).toBeVisible();
    await expect(page.getByText("Are you a Pilot or Developer?", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByText("Current platforms", { exact: true })).toBeVisible();
    await expect(page.getByLabel("What is the biggest pain right now?")).toBeVisible();
    await expect(page.getByLabel("Why do you want beta access now?")).toBeVisible();

    if (roleCase.audience === "pilot") {
      await expect(pilotToggle).toHaveAttribute("aria-pressed", "true");
      await expect(developerToggle).toHaveAttribute("aria-pressed", "false");
    } else {
      await expect(pilotToggle).toHaveAttribute("aria-pressed", "false");
      await expect(developerToggle).toHaveAttribute("aria-pressed", "true");
    }

    await page.getByRole("button", { name: roleCase.submitLabel }).click();
    await expect(page.getByText("Please share your name.")).toBeVisible();
    await expect(page.getByText("Choose at least one fleet you currently fly.").first()).toBeVisible();

    await page.getByLabel("Name").fill("Jamie Test");
    await page.getByLabel("Email").fill(`jamie-${roleCase.audience}@example.com`);
    await page.getByLabel(roleCase.fleetLabel).check();
    await page
      .getByLabel("What is the biggest pain right now?")
      .fill("The current workflow is too fragmented and takes too much manual setup.");
    await page
      .getByLabel("Why do you want beta access now?")
      .fill("We want to test Cirro against our current workflow pressure.");

    await page.getByRole("button", { name: roleCase.submitLabel }).click();
    await expect(page).toHaveURL(
      new RegExp(`/thank-you\\?type=early-access&audience=${roleCase.audience}$`)
    );
    await expect(page.getByRole("heading", { name: roleCase.successHeading })).toBeVisible();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/beta-access/${roleCase.audience}`);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)
    ).toBeTruthy();
    await expect(page.getByRole("button", { name: roleCase.submitLabel })).toBeVisible();
  }
});

test("developer stream walks from home into the publish flow", async ({ page }) => {
  await page.goto("/developer");

  await page.getByRole("link", { name: "Start Building" }).click();
  await expect(page).toHaveURL(/\/developer\/console\/connect-repo$/);
  await expect(
    page.getByRole("heading", { name: "Link your source code." })
  ).toBeVisible();

  await page.getByRole("link", { name: /Continue to Capabilities/i }).click();
  await expect(page).toHaveURL(/\/developer\/console\/capabilities$/);

  await page.getByRole("link", { name: /Continue to App Config/i }).click();
  await expect(page).toHaveURL(/\/developer\/console\/app-config$/);

  await page.getByRole("link", { name: /Continue to Publish/i }).click();
  await expect(page).toHaveURL(/\/developer\/console\/publish$/);
  await expect(page.getByText("Approval State")).toBeVisible();
});

test("pilot stream walks from app browsing into a live mission and session history", async ({
  page,
}) => {
  await page.goto("/pilot/apps");

  await expect(page.getByRole("heading", { name: "Explore Apps" })).toBeVisible();
  await page.getByRole("link", { name: /Cirro Inspect/i }).click();
  await expect(page).toHaveURL(/\/pilot\/apps\/cirro-inspect$/);

  await page.getByRole("link", { name: "Launch App" }).click();
  await expect(page).toHaveURL(/\/pilot\/apps\/cirro-inspect\/setup$/);

  await page.getByRole("link", { name: /Next: Route Review/i }).click();
  await expect(page).toHaveURL(/\/pilot\/apps\/cirro-inspect\/route-review$/);

  await page.getByRole("link", { name: /Run Mission/i }).click();
  await expect(page).toHaveURL(/\/pilot\/apps\/cirro-inspect\/live$/);

  await page.getByRole("link", { name: /Review Session Log/i }).click();
  await expect(page).toHaveURL(/\/pilot\/sessions$/);
  await expect(
    page.getByRole("heading", { name: "Sessions History" })
  ).toBeVisible();
});

test("legacy routes redirect into the new branch-based information architecture", async ({
  page,
}) => {
  await page.goto("/product/app-library");
  await expect(page).toHaveURL(/\/pilot\/apps$/);

  await page.goto("/submit-repo");
  await expect(page).toHaveURL(/\/developer\/console\/connect-repo$/);

  await page.goto("/sessions");
  await expect(page).toHaveURL(/\/pilot\/sessions$/);
});
