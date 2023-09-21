import { NativeModules, Platform } from 'react-native';
import type { NeuroIDClass } from './types';

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

export const NeuroID: NeuroIDClass = {
  configure: function configure(apiKey: String): Promise<void> {
    return Promise.resolve(NeuroidReactnativeSdk.configure(apiKey));
  },
  start: function start(): Promise<Boolean> {
    return new Promise(async function (resolve) {
      try {
        await Promise.resolve(NeuroidReactnativeSdk.start());
        let _cid = await NeuroidReactnativeSdk.getSessionID();

        console.log('Client ID:' + _cid);
        resolve(true);
      } catch (e) {
        console.warn('Failed to start NID', e);
        resolve(false);
      }
    });
  },
  stop: function stop(): Promise<Boolean> {
    return new Promise(async function (resolve) {
      try {
        await Promise.resolve(NeuroidReactnativeSdk.stop());
        resolve(true);
      } catch (e) {
        console.warn('Failed to stop NID', e);
        resolve(false);
      }
    });
  },
  getSessionID: function getSessionID(): Promise<String> {
    return Promise.resolve(NeuroidReactnativeSdk.getSessionID());
  },
  setUserID: function setUserID(userID: String): Promise<void> {
    console.log('Setting User ID: ' + userID);
    return Promise.resolve(NeuroidReactnativeSdk.setUserID(userID));
  },
  excludeViewByTestID: function excludeViewByTestID(
    excludedView: String
  ): Promise<void> {
    return Promise.resolve(
      NeuroidReactnativeSdk.excludeViewByTestID(excludedView)
    );
  },
  setEnvironmentProduction: function setEnvironmentProduction(value: Boolean) {
    // Pre-release
    console.log('NeuroID environment set: ', value);
    return Promise.resolve(
      NeuroidReactnativeSdk.setEnvironmentProduction(value)
    );
  },
  setVerifyIntegrationHealth: function setVerifyIntegrationHealth(
    value: Boolean
  ) {
    // Pre-release
    console.log('NeuroID setVerifyIntegrationHealth: ', value);
    return Promise.resolve(
      NeuroidReactnativeSdk.setVerifyIntegrationHealth(value)
    );
  },
  setSiteId: function setSiteId(siteId: String): Promise<void> {
    // Pre-release
    console.log('SiteID set ', siteId);
    return Promise.resolve(NeuroidReactnativeSdk.setSiteId(siteId));
  },
  setScreenName: function setScreenName(screenName: String): Promise<void> {
    return Promise.resolve(NeuroidReactnativeSdk.setScreenName(screenName));
  },
  isStopped: function isStopped(): Promise<boolean> {
    return Promise.resolve(NeuroidReactnativeSdk.isStopped());
  },
  registerPageTargets: function isStopped(): Promise<void> {
    return Promise.resolve(NeuroidReactnativeSdk.registerPageTargets());
  },
};

export default NeuroID;
