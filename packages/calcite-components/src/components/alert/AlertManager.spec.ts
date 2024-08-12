import AlertManager, { alertQueueTimeoutMs } from "./AlertManager";

describe("AlertManager", () => {
  let alertManager: AlertManager;
  let mockAlert1: HTMLCalciteAlertElement;
  let mockAlert2: HTMLCalciteAlertElement;

  beforeEach(() => {
    alertManager = new AlertManager();

    mockAlert1 = {
      active: false,
      urgent: false,
      activeAlertCount: 0,
    } as HTMLCalciteAlertElement;

    mockAlert2 = {
      active: false,
      urgent: false,
      activeAlertCount: 0,
    } as HTMLCalciteAlertElement;
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

  it("should set the activeAlertCount correctly", () => {
    alertManager.registerElement(mockAlert1);
    alertManager.registerElement(mockAlert2);

    expect(mockAlert1.activeAlertCount).toBe(2);
    expect(mockAlert2.activeAlertCount).toBe(2);
  });
});
