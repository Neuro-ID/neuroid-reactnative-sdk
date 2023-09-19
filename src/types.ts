export interface NeuroIDClass {
  configure: (apiKey: String) => Promise<void>;
  start: () => Promise<Boolean>;
  stop: () => Promise<Boolean>;
  getSessionID: () => Promise<String>;
  setUserID: (userID: String) => Promise<void>;
  excludeViewByTestID: (excludedView: String) => Promise<void>;
  setEnvironmentProduction: (value: Boolean) => Promise<void>;
  setVerifyIntegrationHealth: (value: Boolean) => Promise<void>;
  setSiteId: (siteId: String) => Promise<void>;
  setScreenName: (screenName: String) => Promise<void>;
  isStopped: () => Promise<boolean>;
}
