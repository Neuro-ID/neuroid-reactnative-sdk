import { NativeModules, Platform } from "react-native";
import type {
  NeuroIDClass,
  NeuroIDConfigOptions,
  SessionStartResult,
} from "./types";
import { version } from "../package.json";
import NeuroIDLog from "./logger";

const getLinkingError = () =>
  `The package 'neuroid-reactnative-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: "" }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo managed workflow\n";

const NeuroidReactnativeSdk = NativeModules.NeuroidReactnativeSdk
  ? NativeModules.NeuroidReactnativeSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(getLinkingError());
        },
      }
    );

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
export const NeuroID: NeuroIDClass = {
  configure: async function configure(
    apiKey: string,
    configOptions?: NeuroIDConfigOptions
  ): Promise<boolean> {
    usingRNNavigation = !!configOptions?.usingReactNavigation;

    const pattern = /key_(live|test)_[A-Za-z0-9]+/;
    if (!pattern.test(apiKey)) {
      NeuroIDLog.e("Invalid API Key");
      return Promise.resolve(false);
    }

    // Get the runtime React Native version from Platform constants
    const rnVersionObj = Platform.constants?.reactNativeVersion;
    const detectedVersion = `${rnVersionObj.major}.${rnVersionObj.minor}.${rnVersionObj.patch}`;

    const optionsWithRNVersion: NativeConfigOptions = {
      ...configOptions,
      rnVersion: detectedVersion,
    };

    return NeuroidReactnativeSdk.configure(apiKey, optionsWithRNVersion);
  },

  enableLogging: function enableLogging(enable?: boolean): Promise<void> {
    NeuroIDLog.enableLogging(enable);

    if (enable) {
      NeuroIDLog.i("Logging Enabled");
    }

    return Promise.resolve(NeuroidReactnativeSdk.enableLogging(enable));
  },

  excludeViewByTestID: function excludeViewByTestID(
    excludedView: string
  ): Promise<void> {
    return NeuroidReactnativeSdk.excludeViewByTestID(excludedView);
  },

  getClientID: function getClientID(): Promise<string> {
    return NeuroidReactnativeSdk.getClientID();
  },

  getEnvironment: function getEnvironment(): Promise<string> {
    return NeuroidReactnativeSdk.getEnvironment();
  },

  getSDKVersion: function getSDKVersion(): Promise<string> {
    return Promise.resolve(`React-Native:${version}`);
  },

  getScreenName: function getScreenName(): Promise<string> {
    return NeuroidReactnativeSdk.getScreenName();
  },

  getSessionID: function getSessionID(): Promise<string> {
    return NeuroidReactnativeSdk.getSessionID();
  },

  /** @deprecated Use getSessionId() instead. */
  getUserID: function getUserID(): Promise<string> {
    NeuroIDLog.w(
      "getUserId() is deprecated and will be removed in the next major version. Replace with getSessionID()"
    );
    return NeuroidReactnativeSdk.getUserID();
  },

  getRegisteredUserID: function getUserID(): Promise<string> {
    return NeuroidReactnativeSdk.getRegisteredUserID();
  },

  isStopped: function isStopped(): Promise<boolean> {
    return NeuroidReactnativeSdk.isStopped();
  },

  setScreenName: function setScreenName(screenName: string): Promise<boolean> {
    NeuroIDLog.d("setScreenName()", screenName);
    return NeuroidReactnativeSdk.setScreenName(screenName);
  },

  /** @deprecated Use identify(userID) instead. */
  setUserID: function setUserID(userID: string): Promise<boolean> {
    NeuroIDLog.w(
      "setUserID() is deprecated and will be removed in the next major version. Replace with identify()"
    );
    NeuroIDLog.i("Setting User ID: ", userID);

    return new Promise((resolve, reject) => {
      const result = NeuroidReactnativeSdk.setUserID(userID);

      if (result) {
        resolve(true);
      } else {
        NeuroIDLog.e("Failed to set user ID");
        reject(false);
      }
    });
  },

  identify: function identify(sessionID: string): Promise<boolean> {
    NeuroIDLog.i("Identify : ", sessionID);
    return NeuroidReactnativeSdk.identify(sessionID);
  },

  setRegisteredUserID: function setRegisteredUserID(
    userID: string
  ): Promise<boolean> {
    NeuroIDLog.i("Setting Registered User ID: ", userID);

    return new Promise((resolve, reject) => {
      const result = NeuroidReactnativeSdk.setRegisteredUserID(userID);

      if (result) {
        resolve(true);
      } else {
        NeuroIDLog.e("Failed to set registered user ID");
        reject(false);
      }
    });
  },

  /** @deprecated */
  attemptedLogin: function attemptedLogin(userID: string): Promise<boolean> {
    NeuroIDLog.w(
      "attemptedLogin() is deprecated and will be removed in the next major version."
    );
    NeuroIDLog.i("Attempted Login User ID: ", userID);

    return new Promise((resolve, reject) => {
      const result = NeuroidReactnativeSdk.attemptedLogin(userID ?? "");

      if (result) {
        resolve(true);
      } else {
        NeuroIDLog.e("Failed to set attmpted login user ID");
        reject(false);
      }
    });
  },

  setVariable: async function setVariable(
    key: string,
    value: string
  ): Promise<void> {
    NeuroIDLog.d(`Setting Variable - ${key}: ${value}`);
    await NeuroidReactnativeSdk.setVariable(key, value);
  },

  start: async function start(): Promise<boolean> {
    try {
      const result = await Promise.resolve(NeuroidReactnativeSdk.start());
      const _cid = await NeuroidReactnativeSdk.getSessionID();

      NeuroIDLog.d("NeuroID Started: ", result);
      NeuroIDLog.i("Client ID:", _cid);
      return result;
    } catch (e: unknown) {
      NeuroIDLog.e("Failed to start NID", String(e));
      return false;
    }
  },

  stop: async function stop(): Promise<boolean> {
    try {
      const result = await Promise.resolve(NeuroidReactnativeSdk.stop());
      NeuroIDLog.d("NeuroID Stopped: ", result);
      return result;
    } catch (e: unknown) {
      NeuroIDLog.e("Failed to stop NID", String(e));
      return false;
    }
  },

  registerPageTargets: function registerPageTargets(): Promise<void> {
    NeuroIDLog.w(
      "registerPageTargets() is deprecated and will be removed in the next major version. /n Use setupScreen() independently to replicate this functionality."
    );
    return registerPageTargetsInternal();
  },

  setupPage: async function setupPage(screenName: string): Promise<void> {
    NeuroIDLog.w(
      "setupPage() is deprecated and will be removed in the next major version. /n Use setupScreen() independently to replicate this functionality."
    );
    await NeuroidReactnativeSdk.setScreenName(screenName);

    return registerPageTargetsInternal();
  },

  startSession: async function startSession(
    sessionID?: string
  ): Promise<SessionStartResult> {
    const result = await NeuroidReactnativeSdk.startSession(sessionID);
    NeuroIDLog.d("startSession(): " + result.sessionID + " " + result.started);
    return Promise.resolve({
      sessionID: result.sessionID as string,
      started: result.started as boolean,
    } as SessionStartResult);
  },

  stopSession: async function stopSession(): Promise<boolean> {
    const result = await NeuroidReactnativeSdk.stopSession();
    NeuroIDLog.d("stopSession(): " + result);
    return Promise.resolve(result);
  },

  pauseCollection: async function pauseCollection(): Promise<void> {
    NeuroidReactnativeSdk.pauseCollection();
    NeuroIDLog.d("pauseCollection()");
    return Promise.resolve();
  },

  resumeCollection: async function resumeCollection(): Promise<void> {
    NeuroidReactnativeSdk.resumeCollection();
    NeuroIDLog.d("resumeCollection()");
    return Promise.resolve();
  },

  /** @deprecated */
  startAppFlow: async function startAppFlow(
    siteID: string,
    userID?: string
  ): Promise<SessionStartResult> {
    NeuroIDLog.w(
      "startAppFlow() is deprecated and will be removed in the next major version."
    );
    const result = await NeuroidReactnativeSdk.startAppFlow(siteID, userID);
    NeuroIDLog.d("startAppFlow(): " + result.sessionID + " " + result.started);
    return Promise.resolve({
      sessionID: result.sessionID as string,
      started: result.started as boolean,
    } as SessionStartResult);
  },
};

export default NeuroID;
