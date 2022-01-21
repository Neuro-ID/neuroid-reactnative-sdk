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

export function configure(apiKey: String): Promise<number> {
  return NeuroidReactnativeSdk.configure(apiKey);
}
export function start(): Promise<void> {
  return NeuroidReactnativeSdk.start();
}
export function stop(): Promise<void> {
  return NeuroidReactnativeSdk.stop();
}
export function setUserID(userID: String): Promise<void> {
  return NeuroidReactnativeSdk.setUserID(userID);
}
export function formSubmit(): Promise<void> {
  return NeuroidReactnativeSdk.formSubmit();
}
export function formSubmitSuccess(): Promise<void> {
  return NeuroidReactnativeSdk.formSubmitSuccess();
}
export function formSubmitFailure(): Promise<void> {
  return NeuroidReactnativeSdk.formSubmitFailure();
}
export function isStopped(): Promise<boolean> {
  return NeuroidReactnativeSdk.isStopped();
}
