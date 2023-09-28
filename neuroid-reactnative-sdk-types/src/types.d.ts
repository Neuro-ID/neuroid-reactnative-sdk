export interface NeuroIDClass {
    configure: (apiKey: string) => Promise<void>;
    start: () => Promise<Boolean>;
    stop: () => Promise<Boolean>;
    setUserID: (userID: string) => Promise<void>;
    excludeViewByTestID: (excludedView: string) => Promise<void>;
    setEnvironmentProduction: (value: Boolean) => Promise<void>;
    setVerifyIntegrationHealth: (value: Boolean) => Promise<void>;
    setSiteId: (siteId: string) => Promise<void>;
    setScreenName: (screenName: string) => Promise<void>;
    isStopped: () => Promise<boolean>;
    registerPageTargets: () => Promise<void>;
    setupPage: (screenName: string) => Promise<void>;
    getClientID: () => Promise<string>;
    getSessionID: () => Promise<string>;
    getUserID: () => Promise<string>;
    getSDKVersion: () => Promise<string>;
    getScreenName: () => Promise<string>;
}
