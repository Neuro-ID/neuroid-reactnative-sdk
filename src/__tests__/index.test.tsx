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
      getRegisteredUserID: jest.fn(),
      getUserID: jest.fn(),
      isStopped: jest.fn(),
      setScreenName: jest.fn(),
      setUserID: jest.fn(),
      setRegisteredUserID: jest.fn(),
      attemptedLogin: jest.fn(),
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

  // ── enableLogging ───────────────────────────────────────────────────────────
  describe("enableLogging", () => {
    it("calls native enableLogging with true", async () => {
      native["enableLogging"]!.mockReturnValue(undefined);
      await NeuroID.enableLogging(true);
      expect(native["enableLogging"]).toHaveBeenCalledWith(true);
    });

    it("calls native enableLogging with false", async () => {
      native["enableLogging"]!.mockReturnValue(undefined);
      await NeuroID.enableLogging(false);
      expect(native["enableLogging"]).toHaveBeenCalledWith(false);
    });
  });

  // ── excludeViewByTestID ─────────────────────────────────────────────────────
  describe("excludeViewByTestID", () => {
    it("delegates to native with the provided view ID", async () => {
      native["excludeViewByTestID"]!.mockReturnValue(undefined);
      await NeuroID.excludeViewByTestID("my-test-id");
      expect(native["excludeViewByTestID"]).toHaveBeenCalledWith("my-test-id");
    });
  });

  // ── getClientID ─────────────────────────────────────────────────────────────
  describe("getClientID", () => {
    it("resolves the value returned by native", async () => {
      native["getClientID"]!.mockReturnValue("client-abc");
      const result = await NeuroID.getClientID();
      expect(result).toBe("client-abc");
    });
  });

  // ── getEnvironment ──────────────────────────────────────────────────────────
  describe("getEnvironment", () => {
    it("resolves the value returned by native", async () => {
      native["getEnvironment"]!.mockReturnValue("production");
      const result = await NeuroID.getEnvironment();
      expect(result).toBe("production");
    });
  });

  // ── getScreenName ───────────────────────────────────────────────────────────
  describe("getScreenName", () => {
    it("resolves the value returned by native", async () => {
      native["getScreenName"]!.mockReturnValue("HomeScreen");
      const result = await NeuroID.getScreenName();
      expect(result).toBe("HomeScreen");
    });
  });

  // ── getSessionID ────────────────────────────────────────────────────────────
  describe("getSessionID", () => {
    it("resolves the value returned by native", async () => {
      native["getSessionID"]!.mockReturnValue("session-xyz");
      const result = await NeuroID.getSessionID();
      expect(result).toBe("session-xyz");
    });
  });

  // ── getUserID ───────────────────────────────────────────────────────────────
  describe("getUserID", () => {
    it("resolves the value returned by native", async () => {
      native["getUserID"]!.mockReturnValue("user-123");
      const result = await NeuroID.getUserID();
      expect(result).toBe("user-123");
    });
  });

  // ── getRegisteredUserID ─────────────────────────────────────────────────────
  describe("getRegisteredUserID", () => {
    it("resolves the value returned by native", async () => {
      native["getRegisteredUserID"]!.mockReturnValue("reg-456");
      const result = await NeuroID.getRegisteredUserID();
      expect(result).toBe("reg-456");
    });
  });

  // ── isStopped ───────────────────────────────────────────────────────────────
  describe("isStopped", () => {
    it("resolves true when native returns true", async () => {
      native["isStopped"]!.mockReturnValue(true);
      const result = await NeuroID.isStopped();
      expect(result).toBe(true);
    });

    it("resolves false when native returns false", async () => {
      native["isStopped"]!.mockReturnValue(false);
      const result = await NeuroID.isStopped();
      expect(result).toBe(false);
    });
  });

  // ── setScreenName ───────────────────────────────────────────────────────────
  describe("setScreenName", () => {
    it("delegates to native with the screen name and resolves the result", async () => {
      native["setScreenName"]!.mockReturnValue(true);
      const result = await NeuroID.setScreenName("LoginScreen");
      expect(native["setScreenName"]).toHaveBeenCalledWith("LoginScreen");
      expect(result).toBe(true);
    });
  });

  // ── setUserID ───────────────────────────────────────────────────────────────
  describe("setUserID", () => {
    it("resolves true when native returns truthy", async () => {
      native["setUserID"]!.mockReturnValue(true);
      await expect(NeuroID.setUserID("user-abc")).resolves.toBe(true);
      expect(native["setUserID"]).toHaveBeenCalledWith("user-abc");
    });

    it("rejects false when native returns falsy", async () => {
      native["setUserID"]!.mockReturnValue(null);
      await expect(NeuroID.setUserID("user-abc")).rejects.toBe(false);
    });
  });

  // ── setVariable ─────────────────────────────────────────────────────────────
  describe("setVariable", () => {
    it("delegates key and value to native", async () => {
      native["setVariable"]!.mockResolvedValue(undefined);
      await NeuroID.setVariable("myKey", "myVal");
      expect(native["setVariable"]).toHaveBeenCalledWith("myKey", "myVal");
    });
  });

  // ── startSession ────────────────────────────────────────────────────────────
  describe("startSession", () => {
    it("resolves a SessionStartResult with sessionID and started flag", async () => {
      native["startSession"]!.mockResolvedValue({
        sessionID: "sess-001",
        started: true,
      });
      const result = await NeuroID.startSession();
      expect(result).toEqual({ sessionID: "sess-001", started: true });
    });

    it("passes an explicit sessionID to native when provided", async () => {
      native["startSession"]!.mockResolvedValue({
        sessionID: "custom-id",
        started: true,
      });
      await NeuroID.startSession("custom-id");
      expect(native["startSession"]).toHaveBeenCalledWith("custom-id");
    });
  });

  // ── stopSession ─────────────────────────────────────────────────────────────
  describe("stopSession", () => {
    it("resolves true when native returns true", async () => {
      native["stopSession"]!.mockResolvedValue(true);
      const result = await NeuroID.stopSession();
      expect(result).toBe(true);
    });

    it("resolves false when native returns false", async () => {
      native["stopSession"]!.mockResolvedValue(false);
      const result = await NeuroID.stopSession();
      expect(result).toBe(false);
    });
  });

  // ── pauseCollection ─────────────────────────────────────────────────────────
  describe("pauseCollection", () => {
    it("calls native pauseCollection", async () => {
      native["pauseCollection"]!.mockReturnValue(undefined);
      await NeuroID.pauseCollection();
      expect(native["pauseCollection"]).toHaveBeenCalled();
    });
  });

  // ── resumeCollection ────────────────────────────────────────────────────────
  describe("resumeCollection", () => {
    it("calls native resumeCollection", async () => {
      native["resumeCollection"]!.mockReturnValue(undefined);
      await NeuroID.resumeCollection();
      expect(native["resumeCollection"]).toHaveBeenCalled();
    });
  });

  // ── startAppFlow ────────────────────────────────────────────────────────────
  describe("startAppFlow", () => {
    it("resolves a SessionStartResult with siteID and optional userID", async () => {
      native["startAppFlow"]!.mockResolvedValue({
        sessionID: "app-sess-001",
        started: true,
      });
      const result = await NeuroID.startAppFlow("site-xyz", "user-abc");
      expect(native["startAppFlow"]).toHaveBeenCalledWith(
        "site-xyz",
        "user-abc"
      );
      expect(result).toEqual({ sessionID: "app-sess-001", started: true });
    });

    it("works without an optional userID", async () => {
      native["startAppFlow"]!.mockResolvedValue({
        sessionID: "app-sess-002",
        started: true,
      });
      const result = await NeuroID.startAppFlow("site-xyz");
      expect(native["startAppFlow"]).toHaveBeenCalledWith(
        "site-xyz",
        undefined
      );
      expect(result.started).toBe(true);
    });
  });
});
