import { NativeModules, Platform } from "react-native";

import NativeModule, {
  NeuroIDClass,
  NeuroIDConfigOptions,
  SessionStartResult,
} from "./NativeNeuroidReactnativeSdk";
import { version } from "../package.json";
import NeuroIDLog from "./logger";

const getLinkingError = () =>
  `The package 'neuroid-reactnative-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo managed workflow\n";

// Fallback chain: TurboModuleRegistry.getEnforcing() → NativeModules fallback → Proxy error
const NeuroidReactnativeSdk: NeuroIDClass =
  NativeModule ??
  (NativeModules?.NeuroidReactnativeSdk as NeuroIDClass | null) ??
  (new Proxy(
    {},
    {
      get() {
        throw new Error(getLinkingError());
      },
    }
  ) as NeuroIDClass);

let usingRNNavigation = false;

type NativeConfigOptions = Partial<NeuroIDConfigOptions> & {
  rnVersion: string;
};
const registerPageTargetsInternal = (): Promise<void> => {
  if (Platform.OS === "ios" && usingRNNavigation) {
    return Promise.resolve();
  }

  return NeuroidReactnativeSdk.registerPageTargets();
};

const logNativeError = (operation: string, error: unknown): void => {
  NeuroIDLog.e(`${operation} failed`, String(error));
};

export const NeuroID: NeuroIDClass = {
  configure: async function configure(
    apiKey: string,
    configOptions?: NeuroIDConfigOptions
  ): Promise<boolean> {
    usingRNNavigation = !!configOptions?.usingReactNavigation;
    const pattern = /key_(live|test)_[A-Za-z0-9]+/;
    if (!pattern.test(apiKey)) {
      NeuroIDLog.e("Invalid API Key");
      return false;
    }

    // Get the runtime React Native version from Platform constants
    const rnVersionObj = Platform.constants?.reactNativeVersion;
    const detectedVersion = rnVersionObj
      ? `${rnVersionObj.major}.${rnVersionObj.minor}.${rnVersionObj.patch}`
      : version;

    const optionsWithRNVersion: NativeConfigOptions = {
      ...configOptions,
      rnVersion: detectedVersion,
    };

    return NeuroidReactnativeSdk.configure(apiKey, optionsWithRNVersion).catch(
      (error) => {
        logNativeError("configure", error);
        return false;
      }
    );
  },

  enableLogging: function enableLogging(enable?: boolean): Promise<void> {
    NeuroIDLog.enableLogging(enable);

    if (enable) {
      NeuroIDLog.i("Logging Enabled");
    }

    return NeuroidReactnativeSdk.enableLogging(enable ?? false).catch(
      (error) => {
        logNativeError("enableLogging", error);
      }
    );
  },

  excludeViewByTestID: function excludeViewByTestID(
    excludedView: string
  ): Promise<void> {
    return NeuroidReactnativeSdk.excludeViewByTestID(excludedView).catch(
      (error) => {
        logNativeError("excludeViewByTestID", error);
      }
    );
  },

  getClientID: function getClientID(): Promise<string> {
    return NeuroidReactnativeSdk.getClientID().catch((error) => {
      logNativeError("getClientID", error);
      return "";
    });
  },

  getEnvironment: function getEnvironment(): Promise<string> {
    return NeuroidReactnativeSdk.getEnvironment().catch((error) => {
      logNativeError("getEnvironment", error);
      return "";
    });
  },

  getSDKVersion: function getSDKVersion(): Promise<string> {
    return Promise.resolve(`React-Native:${version}`);
  },

  getScreenName: function getScreenName(): Promise<string> {
    return NeuroidReactnativeSdk.getScreenName().catch((error) => {
      logNativeError("getScreenName", error);
      return "";
    });
  },

  getSessionID: function getSessionID(): Promise<string> {
    return NeuroidReactnativeSdk.getSessionID().catch((error) => {
      logNativeError("getSessionID", error);
      return "";
    });
  },

  /** @deprecated Use getSessionId() instead. */
  getUserID: function getUserID(): Promise<string> {
    NeuroIDLog.w(
      "getUserId() is deprecated and will be removed in the next major version. Replace with getSessionID()"
    );
    return NeuroidReactnativeSdk.getUserID().catch((error) => {
      logNativeError("getUserID", error);
      return "";
    });
  },

  getRegisteredUserID: function getUserID(): Promise<string> {
    return NeuroidReactnativeSdk.getRegisteredUserID().catch((error) => {
      logNativeError("getRegisteredUserID", error);
      return "";
    });
  },

  isStopped: function isStopped(): Promise<boolean> {
    return NeuroidReactnativeSdk.isStopped().catch((error) => {
      logNativeError("isStopped", error);
      return true;
    });
  },

  setScreenName: function setScreenName(screenName: string): Promise<boolean> {
    NeuroIDLog.d("setScreenName()", screenName);
    registerPageTargetsInternal().catch((err) => {
      NeuroIDLog.e("registerPageTargets failed", err);
    });
    return NeuroidReactnativeSdk.setScreenName(screenName).catch((error) => {
      logNativeError("setScreenName", error);
      return false;
    });
  },

  /** @deprecated Use identify(userID) instead. */
  setUserID: async function setUserID(userID: string): Promise<boolean> {
    NeuroIDLog.w(
      "setUserID() is deprecated and will be removed in the next major version. Replace with identify()"
    );
    NeuroIDLog.i("Setting User ID: ", userID);

    try {
      const result = await NeuroidReactnativeSdk.setUserID(userID);
      if (!result) {
        NeuroIDLog.e("Failed to set user ID");
      }
      return !!result;
    } catch (error) {
      logNativeError("setUserID", error);
      return false;
    }
  },

  identify: function identify(sessionID: string): Promise<boolean> {
    NeuroIDLog.i("Identify : ", sessionID);
    return NeuroidReactnativeSdk.identify(sessionID).catch((error) => {
      logNativeError("identify", error);
      return false;
    });
  },

  setRegisteredUserID: async function setRegisteredUserID(
    userID: string
  ): Promise<boolean> {
    NeuroIDLog.i("Setting Registered User ID: ", userID);

    try {
      const result = await NeuroidReactnativeSdk.setRegisteredUserID(userID);
      if (!result) {
        NeuroIDLog.e("Failed to set registered user ID");
      }
      return !!result;
    } catch (error) {
      logNativeError("setRegisteredUserID", error);
      return false;
    }
  },

  /** @deprecated */
  attemptedLogin: async function attemptedLogin(
    userID: string
  ): Promise<boolean> {
    NeuroIDLog.w(
      "attemptedLogin() is deprecated and will be removed in the next major version."
    );
    NeuroIDLog.i("Attempted Login User ID: ", userID);

    try {
      const result = await NeuroidReactnativeSdk.attemptedLogin(userID ?? "");
      if (!result) {
        NeuroIDLog.e("Failed to set attempted login user ID");
      }
      return !!result;
    } catch (error) {
      logNativeError("attemptedLogin", error);
      return false;
    }
  },

  setVariable: async function setVariable(
    key: string,
    value: string
  ): Promise<void> {
    NeuroIDLog.d(`Setting Variable - ${key}: ${value}`);
    try {
      await NeuroidReactnativeSdk.setVariable(key, value);
    } catch (error) {
      logNativeError("setVariable", error);
    }
  },

  start: async function start(): Promise<boolean> {
    try {
      const result = await NeuroidReactnativeSdk.start();
      const _cid = await NeuroidReactnativeSdk.getSessionID();

      NeuroIDLog.d("NeuroID Started: " + String(result));
      NeuroIDLog.i("Session ID:", _cid);
      return result;
    } catch (e: unknown) {
      NeuroIDLog.e("Failed to start NID", String(e));
      return false;
    }
  },

  stop: async function stop(): Promise<boolean> {
    try {
      const result = await NeuroidReactnativeSdk.stop();
      NeuroIDLog.d("NeuroID Stopped: " + String(result));
      return result;
    } catch (e: unknown) {
      NeuroIDLog.e("Failed to stop NID", String(e));
      return false;
    }
  },

  registerPageTargets: function registerPageTargets(): Promise<void> {
    NeuroIDLog.w(
      "registerPageTargets() is deprecated and will be removed in the next major version. Use setScreenName() independently to replicate this functionality."
    );
    return registerPageTargetsInternal().catch((error) => {
      logNativeError("registerPageTargets", error);
    });
  },
  /** @deprecated Use setScreenName(sessionId) instead. */
  setupPage: async function setupPage(screenName: string): Promise<void> {
    NeuroIDLog.w(
      "setupPage() is deprecated and will be removed in the next major version. Use setScreenName() independently to replicate this functionality."
    );
    try {
      await NeuroidReactnativeSdk.setScreenName(screenName);
      return registerPageTargetsInternal().catch((error) => {
        logNativeError("setupPage/registerPageTargets", error);
      });
    } catch (error) {
      logNativeError("setupPage/setScreenName", error);
    }
  },

  startSession: async function startSession(
    sessionID?: string
  ): Promise<SessionStartResult> {
    try {
      const result = await NeuroidReactnativeSdk.startSession(sessionID);
      NeuroIDLog.d(
        "startSession(): " + result.sessionID + " " + result.started
      );
      return {
        sessionID: result.sessionID,
        started: result.started,
      };
    } catch (error) {
      logNativeError("startSession", error);
      return {
        sessionID: "",
        started: false,
      };
    }
  },

  stopSession: async function stopSession(): Promise<boolean> {
    try {
      const result = await NeuroidReactnativeSdk.stopSession();
      NeuroIDLog.d("stopSession(): " + result);
      return result;
    } catch (error) {
      logNativeError("stopSession", error);
      return false;
    }
  },

  pauseCollection: async function pauseCollection(): Promise<void> {
    try {
      await NeuroidReactnativeSdk.pauseCollection();
      NeuroIDLog.d("pauseCollection()");
      return;
    } catch (error) {
      logNativeError("pauseCollection", error);
      return;
    }
  },

  resumeCollection: async function resumeCollection(): Promise<void> {
    try {
      await NeuroidReactnativeSdk.resumeCollection();
      NeuroIDLog.d("resumeCollection()");
      return;
    } catch (error) {
      logNativeError("resumeCollection", error);
      return;
    }
  },

  /** @deprecated */
  startAppFlow: async function startAppFlow(
    siteID: string,
    userID?: string
  ): Promise<SessionStartResult> {
    NeuroIDLog.w(
      "startAppFlow() is deprecated and will be removed in the next major version."
    );
    try {
      const result = await NeuroidReactnativeSdk.startAppFlow(siteID, userID);
      NeuroIDLog.d(
        "startAppFlow(): " + result.sessionID + " " + result.started
      );
      return {
        sessionID: result.sessionID,
        started: result.started,
      };
    } catch (error) {
      logNativeError("startAppFlow", error);
      return {
        sessionID: "",
        started: false,
      };
    }
  },
};

export default NeuroID;
