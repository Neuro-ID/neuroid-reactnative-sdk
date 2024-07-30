export interface NeuroIDClass {
    configure: (apiKey: string, options: NeuroIDConfigOptions) => Promise<boolean>;
    enableLogging: (enable?: boolean) => Promise<void>;
    excludeViewByTestID: (excludedView: string) => Promise<void>;
    getClientID: () => Promise<string>;
    getEnvironment: () => Promise<string>;
    getSDKVersion: () => Promise<string>;
    getScreenName: () => Promise<string>;
    getSessionID: () => Promise<string>;
    getUserID: () => Promise<string>;
    getRegisteredUserID: () => Promise<string>;
    isStopped: () => Promise<boolean>;
    setEnvironmentProduction: (value: Boolean) => Promise<void>;
    setScreenName: (screenName: string) => Promise<boolean>;
    setSiteId: (siteId: string) => Promise<void>;
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
    startAppFlow: (siteID: string, userID?: string) => Promise<SessionStartResult>;
}
export interface NeuroIDConfigOptions {
    usingReactNavigation: boolean;
    isAdvancedDevice: boolean;
    environment: string;
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
