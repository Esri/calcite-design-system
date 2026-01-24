import { describe, expect, it, beforeEach } from "vitest";
import AlertManager, { alertQueueTimeoutMs } from "./AlertManager";
import type { Alert } from "./alert";

describe("AlertManager", () => {
  let alertManager: AlertManager;
  let mockAlert1: Alert["el"];
  let mockAlert2: Alert["el"];

  beforeEach(() => {
    alertManager = new AlertManager();

    mockAlert1 = {
      active: false,
      queue: "last",
      openAlertCount: 0,
    } as Alert["el"];

    mockAlert2 = {
      active: false,
      queue: "last",
      openAlertCount: 0,
    } as Alert["el"];
  });

  it("should activate the first alert after a timeout", async () => {
    alertManager.registerElement(mockAlert1);

    expect(mockAlert1.active).toBe(false);

    await new Promise((resolve) => setTimeout(resolve, alertQueueTimeoutMs));

    expect(mockAlert1.active).toBe(true);
  });

  it("should deactivate subsequent alerts", async () => {
    alertManager.registerElement(mockAlert1);
    alertManager.registerElement(mockAlert2);

    expect(mockAlert1.active).toBe(false);
    expect(mockAlert2.active).toBe(false);

    await new Promise((resolve) => setTimeout(resolve, alertQueueTimeoutMs));

    expect(mockAlert1.active).toBe(true);
    expect(mockAlert2.active).toBe(false);
  });

  it("should set the openAlertCount correctly", () => {
    alertManager.registerElement(mockAlert1);
    alertManager.registerElement(mockAlert2);

    expect(mockAlert1.openAlertCount).toBe(2);
    expect(mockAlert2.openAlertCount).toBe(2);
  });
});
