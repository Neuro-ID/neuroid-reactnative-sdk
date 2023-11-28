export interface NeuroIDClass {
  configure: (apiKey: string, options: NeuroIDConfigOptions) => Promise<void>;
  enableLogging: (enable?: boolean) => Promise<void>;
  excludeViewByTestID: (excludedView: string) => Promise<void>;

  getClientID: () => Promise<string>;
  getEnvironment: () => Promise<string>;
  getSDKVersion: () => Promise<string>; // JS side not native
  getScreenName: () => Promise<string>; // ios, NOT Android
  getSessionID: () => Promise<string>;
  getUserID: () => Promise<string>;

  isStopped: () => Promise<boolean>;
  setEnvironmentProduction: (value: Boolean) => Promise<void>; // deprecated
  setScreenName: (screenName: string) => Promise<void>;
  setSiteId: (siteId: string) => Promise<void>; // deprecated
  setUserID: (userID: string) => Promise<void>;
  setRegisteredUserID: (userID: string) => Promise<void>;
  setVerifyIntegrationHealth: (value: Boolean) => Promise<void>;

  start: () => Promise<Boolean>;
  stop: () => Promise<Boolean>;

  registerPageTargets: () => Promise<void>;
  setupPage: (screenName: string) => Promise<void>;
}

export interface NeuroIDConfigOptions {
  usingReactNavigation: boolean;
}

export interface NeuroIDLogClass {
  enableLogging: (enable?: boolean) => void;
  log: (...message: String[]) => void;
  d: (...message: String[]) => void;
  i: (...message: String[]) => void;
  e: (...message: String[]) => void;
}
