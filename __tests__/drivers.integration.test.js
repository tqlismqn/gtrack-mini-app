const fs = require("fs");
const path = require("path");

const htmlPath = path.resolve(__dirname, "../index.html");
const rawHtml = fs.readFileSync(htmlPath, "utf8");
const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
const bodyHtml = bodyMatch ? bodyMatch[1].replace(/<script[^>]*src="main\.js"[^>]*><\/script>/i, "") : "";

describe("Drivers module integrations", () => {
  let api;
  let sendDataMock;

  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-09-01T12:00:00Z"));

    document.head.innerHTML = "";
    document.body.innerHTML = bodyHtml;

    sendDataMock = jest.fn();
    window.Telegram = { WebApp: { expand: jest.fn(), sendData: sendDataMock } };
    window.requestAnimationFrame = (cb) => {
      if (typeof cb === "function") {
        cb();
      }
    };

    api = require("../main.js");
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    document.body.innerHTML = "";
    document.head.innerHTML = "";
    delete window.Telegram;
    delete window.__GTRACK__;
    delete window.requestAnimationFrame;
  });

  test("EU-only filter narrows the list to drivers with EU citizenship", () => {
    const euIds = api.driversData
      .filter((driver) => api.getDriverCitizenshipInfo(driver)?.isEu)
      .map((driver) => driver.id)
      .sort();

    expect(euIds.length).toBeGreaterThan(0);

    const checkbox = document.getElementById("euOnlyFilter");
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("change", { bubbles: true }));

    const renderedIds = Array.from(document.querySelectorAll("#driversTableBody tr[data-driver-id]"))
      .map((row) => row.dataset.driverId)
      .sort();

    expect(renderedIds).toEqual(euIds);
    expect(api.state.filteredDrivers.map((driver) => driver.id).sort()).toEqual(euIds);
  });

  test("Psihotest expiry reflects driver age thresholds", () => {
    const driver = api.driversData.find((item) =>
      (item.documents || []).some((doc) => doc.type === "psihotest")
    );

    expect(driver).toBeDefined();

    api.openDriverModal(driver.id);

    const findPsihotestRow = () => {
      const rows = Array.from(document.querySelectorAll(".documents-table tbody tr"));
      return rows.find((row) => row.cells[0].textContent.includes("Психотест"));
    };

    let psihotestRow = findPsihotestRow();
    expect(psihotestRow).toBeDefined();

    const psihotestDoc = driver.documents.find((doc) => doc.type === "psihotest");
    const initialExpiry = api.formatDate(api.getDocumentEffectiveExpiry(psihotestDoc, driver));

    expect(psihotestRow.cells[3].textContent.trim()).toBe(initialExpiry);
    expect(psihotestRow.cells[7].textContent).toContain(`Следующее прохождение до ${initialExpiry}`);

    driver.personal.birthDate = "1950-03-15";
    api.openDriverModal(driver.id);

    psihotestRow = findPsihotestRow();
    expect(psihotestRow).toBeDefined();

    const seniorExpiry = api.formatDate(api.getDocumentEffectiveExpiry(psihotestDoc, driver));
    expect(seniorExpiry).not.toBe(initialExpiry);
    expect(psihotestRow.cells[3].textContent.trim()).toBe(seniorExpiry);
    expect(psihotestRow.cells[7].textContent).toContain(`Следующее прохождение до ${seniorExpiry}`);
  });

  test("Reminder payload includes expiring documents for selected drivers", () => {
    const driverNeedingAttention = api.driversData.find((driver) =>
      (driver.documents || []).some(
        (doc) =>
          !api.isDocumentEmpty(doc) &&
          ["expired", "soon", "warning"].includes(api.getDocumentStatus(doc, driver))
      )
    );

    expect(driverNeedingAttention).toBeDefined();

    const checkbox = document.querySelector(
      `tr[data-driver-id="${driverNeedingAttention.id}"] input[type="checkbox"]`
    );
    expect(checkbox).toBeTruthy();

    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("change", { bubbles: true }));

    const reminderButton = document.getElementById("sendReminderBtn");
    expect(reminderButton.disabled).toBe(false);

    reminderButton.click();

    expect(sendDataMock).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(sendDataMock.mock.calls[0][0]);

    expect(payload.action).toBe("send_document_reminders");
    expect(payload.drivers).toHaveLength(1);
    expect(payload.drivers[0].id).toBe(driverNeedingAttention.id);

    const expectedDocs = (driverNeedingAttention.documents || [])
      .filter(
        (doc) =>
          !api.isDocumentEmpty(doc) &&
          ["expired", "soon", "warning"].includes(api.getDocumentStatus(doc, driverNeedingAttention))
      )
      .map((doc) => ({
        type: doc.type,
        label: api.DOCUMENT_LABELS[doc.type] || doc.type,
        status: api.getDocumentStatus(doc, driverNeedingAttention),
        expiryDate: api.getDocumentEffectiveExpiry(doc, driverNeedingAttention) || null
      }));

    expect(payload.drivers[0].documents).toEqual(expectedDocs);
  });
});
