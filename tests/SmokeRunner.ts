import NeuroID from "neuroid-reactnative-sdk";

type SmokeCall =
  | { name: string; run: () => void }
  | { name: string; run: () => Promise<unknown> };

export async function runSmoke(): Promise<void> {
  console.log("NeuroID SDK Smoke Test Running");

  const calls: SmokeCall[] = [
    {
      name: "configure",
      run: () =>
        NeuroID.configure("key_test_123456", {
          usingReactNavigation: true,
          isAdvancedDevice: true,
          environment: "live",
          advancedDeviceKey: "",
          useAdvancedDeviceProxy: true,
        }),
    },
    { name: "enableLogging", run: () => NeuroID.enableLogging(true) },
    {
      name: "excludeViewByTestID",
      run: () => NeuroID.excludeViewByTestID("excludedView"),
    },
    { name: "getClientID", run: () => NeuroID.getClientID() },
    { name: "getSDKVersion", run: () => NeuroID.getSDKVersion() },
    { name: "getEnvironment", run: () => NeuroID.getEnvironment() },
    { name: "getUserID", run: () => NeuroID.getUserID() },
    { name: "getRegisteredUserID", run: () => NeuroID.getRegisteredUserID() },
    { name: "setUserID", run: () => NeuroID.setUserID("smoke_user_123") },
    {
      name: "setRegisteredUserID",
      run: () => NeuroID.setRegisteredUserID("smoke_registered_123"),
    },
    {
      name: "attemptedLogin",
      run: () => NeuroID.attemptedLogin("smoke_login_123"),
    },
    {
      name: "setVariable",
      run: () => NeuroID.setVariable("smokeKey", "smokeValue"),
    },
    { name: "startSession", run: () => NeuroID.startSession() },
    { name: "setScreenName", run: () => NeuroID.setScreenName("TestScreen") },
    { name: "getScreenName", run: () => NeuroID.getScreenName() },
    { name: "getSessionID", run: () => NeuroID.getSessionID() },
    { name: "registerPageTargets", run: () => NeuroID.registerPageTargets() },
    { name: "setupPage", run: () => NeuroID.setupPage("SetupPageScreen") },
    { name: "isStopped", run: () => !NeuroID.isStopped() },
    { name: "pauseCollection", run: () => NeuroID.pauseCollection() },
    { name: "resumeCollection", run: () => NeuroID.resumeCollection() },
    { name: "stopSession", run: () => NeuroID.stopSession() },
    { name: "isStopped2", run: () => NeuroID.isStopped() },
    { name: "start", run: () => NeuroID.start() },
    { name: "stop", run: () => NeuroID.stop() },
    {
      name: "startAppFlow",
      run: () => NeuroID.startAppFlow("smoke_site_1234", "smoke_user_123"),
    },
  ];

  // Basic API surface check
  for (const call of calls) {
    if (typeof call.run !== "function") {
      console.log("NID_RN_SDK_FAIL");
      throw new Error(`Smoke Test: Call ${call.name} is not a function`);
    }
  }

  for (const call of calls) {
    try {
      console.log(`Smoke Test: Running call ${call.name}`);
      const result = call.run();
      if (result instanceof Promise) {
        const awaitedResult = await result;
        if (awaitedResult === false) {
          throw new Error(`${call.name} returned false`);
        }
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      console.log(`Smoke Test: Call ${call.name} failed with error: ${msg}`);
      console.log("NID_RN_SDK_FAIL");
      throw error;
    }
  }

  console.log("NeuroID SDK Smoke Test Passed");
  console.log("NID_RN_SDK_PASS");
}
