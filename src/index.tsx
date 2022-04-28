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

// function androidCheck(): Boolean {
//   if (Platform.OS !== 'ios') {
//     return true;
//   }
//   return false;
// }

export function configure(apiKey: String): Promise<number> | null {
  return NeuroidReactnativeSdk.configure(apiKey);
}
export function start(): Promise<void> | null {
  return NeuroidReactnativeSdk.start();
}
export function stop(): Promise<void> | null {
  return NeuroidReactnativeSdk.stop();
}
export function getSessionID(): Promise<String> | null {
  return NeuroidReactnativeSdk.getSessionID();
}
export function setUserID(userID: String): Promise<void> | null {
  return NeuroidReactnativeSdk.setUserID(userID);
}
export function excludeViewByTestID(
  excludedView: String
): Promise<void> | null {
  return NeuroidReactnativeSdk.excludeViewByTestID(excludedView);
}
export function setScreenName(screenName: String): Promise<void> | null {
  return NeuroidReactnativeSdk.setScreenName(screenName);
}
export function formSubmit(): Promise<void> | null {
  return NeuroidReactnativeSdk.formSubmit();
}
export function formSubmitSuccess(): Promise<void> | null {
  return NeuroidReactnativeSdk.formSubmitSuccess();
}
export function formSubmitFailure(): Promise<void> | null {
  return NeuroidReactnativeSdk.formSubmitFailure();
}
export function isStopped(): Promise<boolean> | null {
  // if (androidCheck()) return null;
  return NeuroidReactnativeSdk.isStopped();
}
