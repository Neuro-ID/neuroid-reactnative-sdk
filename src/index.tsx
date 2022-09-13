import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'neuroid-reactnative-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const NeuroidReactnativeSdk = NativeModules.NeuroidReactnativeSdk
  ? NativeModules.NeuroidReactnativeSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function configure(apiKey: String): Promise<void> {
  return Promise.resolve(NeuroidReactnativeSdk.configure(apiKey));
}

export function configureWithOptions(
  apiKey: String,
  collectorEndPoint?: String
): Promise<void> {
  return Promise.resolve(
    NeuroidReactnativeSdk.configureWithOptions(apiKey, collectorEndPoint)
  );
}

export function start(): Promise<Boolean> {
  return new Promise(async function (resolve) {
    try {
      await Promise.resolve(NeuroidReactnativeSdk.start());
      resolve(true);
    } catch (e) {
      console.warn('Failed to start NID', e);
      resolve(false);
    }
  });
}
export function stop(): Promise<Boolean> {
  return new Promise(async function (resolve) {
    try {
      await Promise.resolve(NeuroidReactnativeSdk.stop());
      resolve(true);
    } catch (e) {
      console.warn('Failed to stop NID', e);
      resolve(false);
    }
  });
}

export function getSessionID(): Promise<String> {
  return Promise.resolve(NeuroidReactnativeSdk.getSessionID());
}
export function setUserID(userID: String): Promise<void> {
  return Promise.resolve(NeuroidReactnativeSdk.setUserID(userID));
}
export function excludeViewByTestID(excludedView: String): Promise<void> {
  return Promise.resolve(
    NeuroidReactnativeSdk.excludeViewByTestID(excludedView)
  );
}
export function setEnvironmentProduction(value: Boolean) {
  // Pre-release
  console.log('NeuroID environment set: ', value);
  return Promise.resolve(NeuroidReactnativeSdk.setEnvironmentProduction(value));
}

export function setSiteId(siteId: String): Promise<void> {
  // Pre-release
  console.log('SiteID set ', siteId);
  return Promise.resolve(NeuroidReactnativeSdk.setSiteId(siteId));
}
export function setScreenName(screenName: String): Promise<void> {
  return Promise.resolve(NeuroidReactnativeSdk.setScreenName(screenName));
}
export function formSubmit(): Promise<void> {
  return Promise.resolve(NeuroidReactnativeSdk.formSubmit());
}
export function formSubmitSuccess(): Promise<void> {
  return Promise.resolve(NeuroidReactnativeSdk.formSubmitSuccess());
}
export function formSubmitFailure(): Promise<void> {
  return Promise.resolve(NeuroidReactnativeSdk.formSubmitFailure());
}
export function isStopped(): Promise<boolean> {
  return Promise.resolve(NeuroidReactnativeSdk.isStopped());
}
