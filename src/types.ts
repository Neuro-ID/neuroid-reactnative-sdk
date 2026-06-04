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
  /** @deprecated Use getSessionID() instead. */
  getUserID: () => Promise<string>;
  getRegisteredUserID: () => Promise<string>;

  isStopped: () => Promise<boolean>;
  setScreenName: (screenName: string) => Promise<boolean>;
  /** @deprecated Use identify(sessionId) instead. */
  setUserID: (userID: string) => Promise<boolean>;
  identify: (sessionID: string) => Promise<boolean>;
  setRegisteredUserID: (userID: string) => Promise<boolean>;
  /** @deprecated */
  attemptedLogin: (userID: string) => Promise<boolean>;
  setVariable(key: string, value: string): Promise<void>;

  start: () => Promise<boolean>;
  stop: () => Promise<boolean>;
  /** @deprecated Use setScreenName(sessionId) instead. */
  registerPageTargets: () => Promise<void>;
  /** @deprecated Use setScreenName(sessionId) instead. */
  setupPage: (screenName: string) => Promise<void>;
  startSession: (sessionID?: string) => Promise<SessionStartResult>;
  stopSession: () => Promise<boolean>;
  resumeCollection: () => Promise<void>;
  pauseCollection: () => Promise<void>;
  /** @deprecated */
  startAppFlow: (
    siteID: string,
    userID?: string
  ) => Promise<SessionStartResult>;
}

export interface NeuroIDConfigOptions {
  usingReactNavigation?: boolean;
  isAdvancedDevice?: boolean;
  environment?: string;
  advancedDeviceKey?: string;
  useAdvancedDeviceProxy?: boolean;
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
