import { TurboModuleRegistry, type TurboModule } from "react-native";
import type { UnsafeObject } from "react-native/Libraries/Types/CodegenTypes";

export interface NeuroIDConfigOptions {
  usingReactNavigation?: boolean;
  isAdvancedDevice?: boolean;
  environment?: string;
  advancedDeviceKey?: string;
  useAdvancedDeviceProxy?: boolean;
}

export interface Spec extends TurboModule {
  configure(apiKey: string, options: UnsafeObject): Promise<boolean>;
  enableLogging(enable: boolean): Promise<void>;
  excludeViewByTestID(excludedView: string): Promise<void>;
  getClientID(): Promise<string>;
  getEnvironment(): Promise<string>;
  getScreenName(): Promise<string>;
  getSessionID(): Promise<string>;
  getUserID(): Promise<string>;
  getRegisteredUserID(): Promise<string>;
  isStopped(): Promise<boolean>;
  setScreenName(screenName: string): Promise<boolean>;
  setUserID(userID: string): Promise<boolean>;
  identify(sessionID: string): Promise<boolean>;
  setRegisteredUserID(userID: string): Promise<boolean>;
  attemptedLogin(userID?: string): Promise<boolean>;
  setVariable(key: string, value: string): Promise<void>;
  start(): Promise<boolean>;
  stop(): Promise<boolean>;
  registerPageTargets(): Promise<void>;
  startSession(
    sessionID?: string
  ): Promise<{ sessionID: string; started: boolean }>;
  stopSession(): Promise<boolean>;
  pauseCollection(): Promise<void>;
  resumeCollection(): Promise<void>;
  startAppFlow(
    siteID: string,
    userID?: string
  ): Promise<{ sessionID: string; started: boolean }>;
}

export default TurboModuleRegistry.getEnforcing<Spec>("NeuroidReactnativeSdk");
