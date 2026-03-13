export interface NeuroIDClass {
  configure: (
    apiKey: string,
    options: NeuroIDConfigOptions
  ) => Promise<boolean>;
  enableLogging: (enable?: boolean) => Promise<void>;
  excludeViewByTestID: (excludedView: string) => Promise<void>;

  getClientID: () => Promise<string>;
  getEnvironment: () => Promise<string>;
  getSDKVersion: () => Promise<string>; // JS side not native
  getScreenName: () => Promise<string>; // ios, NOT Android
  getSessionID: () => Promise<string>;
  getUserID: () => Promise<string>;
  getRegisteredUserID: () => Promise<string>;

  isStopped: () => Promise<boolean>;
  setEnvironmentProduction: (value: boolean) => Promise<void>; // deprecated
  setScreenName: (screenName: string) => Promise<boolean>;
  setSiteId: (siteId: string) => Promise<void>; // deprecated
  setUserID: (userID: string) => Promise<boolean>;
  setRegisteredUserID: (userID: string) => Promise<boolean>;
  attemptedLogin: (userID: string) => Promise<boolean>;
  setVerifyIntegrationHealth: (value: boolean) => Promise<void>;
  setVariable(key: string, value: string): Promise<void>;

  start: () => Promise<boolean>;
  stop: () => Promise<boolean>;

  registerPageTargets: () => Promise<void>;
  setupPage: (screenName: string) => Promise<void>;
  startSession: (sessionID?: string) => Promise<SessionStartResult>;
  stopSession: () => Promise<boolean>;
  resumeCollection: () => Promise<void>;
  pauseCollection: () => Promise<void>;
  startAppFlow: (
    siteID: string,
    userID?: string
  ) => Promise<SessionStartResult>;
}

export interface NeuroIDConfigOptions {
  usingReactNavigation: boolean;
  isAdvancedDevice: boolean;
  environment: string;
  advancedDeviceKey?: string;
  useAdvancedDeviceProxy: boolean;
}

export interface NeuroIDLogClass {
  enableLogging: (enable?: boolean) => void;
  log: (...message: string[]) => void;
  d: (...message: string[]) => void;
  i: (...message: string[]) => void;
  e: (...message: string[]) => void;
}

export interface SessionStartResult {
  started: boolean;
  sessionID: string;
}
