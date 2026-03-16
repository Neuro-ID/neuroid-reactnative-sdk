import { NativeModules, Platform } from "react-native";
import { NeuroID } from "../index";
import { version } from "../../package.json";

// ─── Mock react-native ────────────────────────────────────────────────────────
// All NeuroidReactnativeSdk native methods are replaced with jest.fn() so no
// real native bridge code is invoked during tests.

jest.mock("react-native", () => ({
  NativeModules: {
    NeuroidReactnativeSdk: {
      configure: jest.fn(),
      enableLogging: jest.fn(),
      excludeViewByTestID: jest.fn(),
      getClientID: jest.fn(),
      getEnvironment: jest.fn(),
      getScreenName: jest.fn(),
      getSessionID: jest.fn(),
      getUserID: jest.fn(),
      getRegisteredUserID: jest.fn(),
      isStopped: jest.fn(),
      setScreenName: jest.fn(),
      setSiteId: jest.fn(),
      setUserID: jest.fn(),
      setRegisteredUserID: jest.fn(),
      attemptedLogin: jest.fn(),
      setVerifyIntegrationHealth: jest.fn(),
      setVariable: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
      registerPageTargets: jest.fn(),
      startSession: jest.fn(),
      stopSession: jest.fn(),
      pauseCollection: jest.fn(),
      resumeCollection: jest.fn(),
      startAppFlow: jest.fn(),
    },
  },
  Platform: {
    OS: "ios",
    select: (obj: Record<string, unknown>) => obj["ios"] ?? obj["default"],
    constants: {
      reactNativeVersion: { major: 0, minor: 76, patch: 0 },
    },
  },
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Typed shortcut to all mock functions on the native module */
const native = NativeModules.NeuroidReactnativeSdk as Record<string, jest.Mock>;

const VALID_LIVE_KEY = "key_live_abc123";
const VALID_TEST_KEY = "key_test_abc123";
const INVALID_KEY = "not_a_valid_key";

const DEFAULT_CONFIG = {
  usingReactNavigation: false,
  isAdvancedDevice: false,
  environment: "test",
  useAdvancedDeviceProxy: false,
};

// ─── Global setup ─────────────────────────────────────────────────────────────

beforeAll(() => {
  // Suppress NeuroIDLog console output so test results stay clean
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "debug").mockImplementation(() => {});
  jest.spyOn(console, "info").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

beforeEach(async () => {
  // Reset module-level usingRNNavigation flag to false before every test.
  // clearMocks (jest config) already cleared call counts; this resets SDK state.
  native["configure"]!.mockResolvedValue(true);
  await NeuroID.configure(VALID_LIVE_KEY, DEFAULT_CONFIG);
  // Clear the counts produced by the state-reset configure call above
  jest.clearAllMocks();
  // Default platform to iOS
  (Platform as unknown as { OS: string }).OS = "ios";
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("NeuroID SDK", () => {
  // ── configure ──────────────────────────────────────────────────────────────
  describe("configure", () => {
    it("returns false for an invalid API key without calling native", async () => {
      const result = await NeuroID.configure(INVALID_KEY, DEFAULT_CONFIG);
      expect(result).toBe(false);
      expect(native["configure"]).not.toHaveBeenCalled();
    });

    it("accepts a valid live key and calls native", async () => {
      native["configure"]!.mockResolvedValue(true);
      const result = await NeuroID.configure(VALID_LIVE_KEY, DEFAULT_CONFIG);
      expect(result).toBe(true);
      expect(native["configure"]).toHaveBeenCalledTimes(1);
    });

    it("accepts a valid test key and calls native", async () => {
      native["configure"]!.mockResolvedValue(true);
      const result = await NeuroID.configure(VALID_TEST_KEY, DEFAULT_CONFIG);
      expect(result).toBe(true);
      expect(native["configure"]).toHaveBeenCalledTimes(1);
    });

    it("returns false when native configure returns false", async () => {
      native["configure"]!.mockResolvedValue(false);
      const result = await NeuroID.configure(VALID_LIVE_KEY, DEFAULT_CONFIG);
      expect(result).toBe(false);
    });

    it("auto-injects the detected React Native version into options", async () => {
      native["configure"]!.mockResolvedValue(true);
      await NeuroID.configure(VALID_LIVE_KEY, DEFAULT_CONFIG);
      expect(native["configure"]).toHaveBeenCalledWith(
        VALID_LIVE_KEY,
        expect.objectContaining({ rnVersion: "0.76.0" })
      );
    });

    it("preserves all caller-provided config options alongside the injected version", async () => {
      native["configure"]!.mockResolvedValue(true);
      const opts = {
        ...DEFAULT_CONFIG,
        isAdvancedDevice: true,
        environment: "production",
      };
      await NeuroID.configure(VALID_LIVE_KEY, opts);
      expect(native["configure"]).toHaveBeenCalledWith(
        VALID_LIVE_KEY,
        expect.objectContaining({
          isAdvancedDevice: true,
          environment: "production",
          rnVersion: "0.76.0",
        })
      );
    });
  });

  // ── getSDKVersion ───────────────────────────────────────────────────────────
  describe("getSDKVersion", () => {
    it("returns the JS-side React Native SDK version string without calling native", async () => {
      const result = await NeuroID.getSDKVersion();
      expect(result).toBe(`React-Native:${version}`);
      expect(Object.values(native).every((m) => !m.mock.calls.length)).toBe(
        true
      );
    });
  });

  // ── setEnvironmentProduction (deprecated) ───────────────────────────────────
  describe("setEnvironmentProduction", () => {
    it("resolves void without calling any native methods", async () => {
      await expect(
        NeuroID.setEnvironmentProduction(true)
      ).resolves.toBeUndefined();
      const anyCalled = Object.values(native).some(
        (m) => m.mock.calls.length > 0
      );
      expect(anyCalled).toBe(false);
    });
  });

  // ── start ───────────────────────────────────────────────────────────────────
  describe("start", () => {
    it("resolves the native result when start succeeds", async () => {
      native["start"]!.mockResolvedValue(true);
      native["getSessionID"]!.mockResolvedValue("sid-123");
      const result = await NeuroID.start();
      expect(result).toBe(true);
      expect(native["start"]).toHaveBeenCalled();
    });

    it("resolves false (does not throw) when native start rejects", async () => {
      native["start"]!.mockRejectedValue(new Error("device error"));
      const result = await NeuroID.start();
      expect(result).toBe(false);
    });
  });

  // ── stop ────────────────────────────────────────────────────────────────────
  describe("stop", () => {
    it("resolves the native result when stop succeeds", async () => {
      native["stop"]!.mockResolvedValue(true);
      const result = await NeuroID.stop();
      expect(result).toBe(true);
    });

    it("resolves false (does not throw) when native stop rejects", async () => {
      native["stop"]!.mockRejectedValue(new Error("device error"));
      const result = await NeuroID.stop();
      expect(result).toBe(false);
    });
  });

  // ── setUserID ───────────────────────────────────────────────────────────────
  describe("setUserID", () => {
    it("resolves true when native returns truthy", async () => {
      native["setUserID"]!.mockReturnValue(true);
      await expect(NeuroID.setUserID("user-123")).resolves.toBe(true);
      expect(native["setUserID"]).toHaveBeenCalledWith("user-123");
    });

    it("rejects false when native returns falsy", async () => {
      native["setUserID"]!.mockReturnValue(null);
      await expect(NeuroID.setUserID("user-123")).rejects.toBe(false);
    });
  });

  // ── setRegisteredUserID ─────────────────────────────────────────────────────
  describe("setRegisteredUserID", () => {
    it("resolves true when native returns truthy", async () => {
      native["setRegisteredUserID"]!.mockReturnValue(true);
      await expect(NeuroID.setRegisteredUserID("reg-user")).resolves.toBe(true);
      expect(native["setRegisteredUserID"]).toHaveBeenCalledWith("reg-user");
    });

    it("rejects false when native returns falsy", async () => {
      native["setRegisteredUserID"]!.mockReturnValue(null);
      await expect(NeuroID.setRegisteredUserID("reg-user")).rejects.toBe(false);
    });
  });

  // ── attemptedLogin ──────────────────────────────────────────────────────────
  describe("attemptedLogin", () => {
    it("resolves true when native returns truthy", async () => {
      native["attemptedLogin"]!.mockReturnValue(true);
      await expect(NeuroID.attemptedLogin("login-user")).resolves.toBe(true);
      expect(native["attemptedLogin"]).toHaveBeenCalledWith("login-user");
    });

    it("falls back to empty string when userID is nullish", async () => {
      native["attemptedLogin"]!.mockReturnValue(true);
      await NeuroID.attemptedLogin(undefined as unknown as string);
      expect(native["attemptedLogin"]).toHaveBeenCalledWith("");
    });

    it("rejects false when native returns falsy", async () => {
      native["attemptedLogin"]!.mockReturnValue(null);
      await expect(NeuroID.attemptedLogin("user")).rejects.toBe(false);
    });
  });

  // ── registerPageTargets ─────────────────────────────────────────────────────
  describe("registerPageTargets", () => {
    it("calls native on iOS when not using React Navigation", async () => {
      native["registerPageTargets"]!.mockReturnValue(undefined);
      await NeuroID.registerPageTargets();
      expect(native["registerPageTargets"]).toHaveBeenCalled();
    });

    it("does NOT call native on iOS when using React Navigation", async () => {
      native["configure"]!.mockResolvedValue(true);
      await NeuroID.configure(VALID_LIVE_KEY, {
        ...DEFAULT_CONFIG,
        usingReactNavigation: true,
      });
      jest.clearAllMocks();

      await NeuroID.registerPageTargets();
      expect(native["registerPageTargets"]).not.toHaveBeenCalled();
    });

    it("calls native on Android regardless of the React Navigation setting", async () => {
      (Platform as unknown as { OS: string }).OS = "android";
      native["registerPageTargets"]!.mockReturnValue(undefined);
      await NeuroID.registerPageTargets();
      expect(native["registerPageTargets"]).toHaveBeenCalled();
    });
  });

  // ── setupPage ───────────────────────────────────────────────────────────────
  describe("setupPage", () => {
    it("calls setScreenName then registerPageTargets with the screen name", async () => {
      native["setScreenName"]!.mockReturnValue(true);
      native["registerPageTargets"]!.mockReturnValue(undefined);
      await NeuroID.setupPage("HomeScreen");
      expect(native["setScreenName"]).toHaveBeenCalledWith("HomeScreen");
      expect(native["registerPageTargets"]).toHaveBeenCalled();
    });
  });
});
