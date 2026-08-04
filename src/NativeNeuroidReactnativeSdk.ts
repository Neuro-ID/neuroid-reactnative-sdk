import { TurboModuleRegistry, type TurboModule } from "react-native";
import type { UnsafeObject } from "react-native/Libraries/Types/CodegenTypes";

export interface NeuroIDConfigOptions {
  usingReactNavigation?: boolean;
  isAdvancedDevice?: boolean;
  environment?: string;
  advancedDeviceKey?: string;
  useAdvancedDeviceProxy?: boolean;
  region?: string;
}
export interface NeuroIDLogClass {
  enableLogging: (enable?: boolean) => void;
  log: (...message: string[]) => void;
  d: (...message: string[]) => void;
  i: (...message: string[]) => void;
  e: (...message: string[]) => void;
  w: (...message: string[]) => void;
}

export interface SessionStartResult {
  started: boolean;
  sessionID: string;
}

export interface Spec extends TurboModule {
  configure(apiKey: string, options?: UnsafeObject): Promise<boolean>;
  enableLogging(enable: boolean): Promise<void>;
  excludeViewByTestID(excludedView: string): Promise<void>;
  getClientID(): Promise<string>;
  getEnvironment(): Promise<string>;
  getScreenName(): Promise<string>;
  getIdentityId(): Promise<string>;
  /** @deprecated Use getIdentityId() instead. */
  getSessionID(): Promise<string>;
  /** @deprecated Use getIdentityId() instead. */
  getUserID(): Promise<string>;
  identify(sessionID: string): Promise<boolean>;
  /** @deprecated Use identify(sessionId) instead. */
  setUserID(userID: string): Promise<boolean>;
  getRegisteredUserID(): Promise<string>;
  isStopped(): Promise<boolean>;
  setScreenName(screenName: string): Promise<boolean>;
  setRegisteredUserID(userID: string): Promise<boolean>;
  /** @deprecated */
  attemptedLogin(userID?: string): Promise<boolean>;
  setVariable(key: string, value: string): Promise<void>;
  start(): Promise<boolean>;
  stop(): Promise<boolean>;
  /** @deprecated Use setScreenName(sessionId) instead. */
  registerPageTargets(): Promise<void>;
  startSession(
    sessionID?: string
  ): Promise<{ sessionID: string; started: boolean }>;
  stopSession(): Promise<boolean>;
  pauseCollection(): Promise<void>;
  resumeCollection(): Promise<void>;
  /** @deprecated */
  startAppFlow(
    siteID: string,
    userID?: string
  ): Promise<{ sessionID: string; started: boolean }>;
}
export interface NeuroIDClass extends Spec {
  /** @deprecated Use setScreenName(sessionId) instead. */
  setupPage: (screenName: string) => Promise<void>;
  getSDKVersion: () => Promise<string>;
}
export default TurboModuleRegistry.getEnforcing<Spec>("NeuroidReactnativeSdk");
