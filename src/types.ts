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
  setEnvironmentProduction: (value: Boolean) => Promise<void>; // deprecated
  setScreenName: (screenName: string) => Promise<boolean>;
  setSiteId: (siteId: string) => Promise<void>; // deprecated
  setUserID: (userID: string) => Promise<boolean>;
  setRegisteredUserID: (userID: string) => Promise<boolean>;
  attemptedLogin: (userID: string) => Promise<boolean>;
  setVerifyIntegrationHealth: (value: Boolean) => Promise<void>;
  setVariable(key: string, value: string): Promise<void>;

  start: () => Promise<Boolean>;
  stop: () => Promise<Boolean>;

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
<<<<<<< HEAD
  useAdvancedDeviceProxy: boolean;
=======
>>>>>>> 20b2da87c9c54a2bcf03ef2850e179b9f27e1a33
}

export interface NeuroIDLogClass {
  enableLogging: (enable?: boolean) => void;
  log: (...message: String[]) => void;
  d: (...message: String[]) => void;
  i: (...message: String[]) => void;
  e: (...message: String[]) => void;
}

export interface SessionStartResult {
  started: boolean;
  sessionID: String;
}
