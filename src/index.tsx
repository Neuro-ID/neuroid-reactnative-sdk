import { NativeModules, Platform } from 'react-native';
import type { NeuroIDClass, NeuroIDConfigOptions } from './types';
import { version } from '../package.json';

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

var usingRNNavigation = false;

export const NeuroID: NeuroIDClass = {
  configure: function configure(
    apiKey: string,
    configOptions?: NeuroIDConfigOptions
  ): Promise<void> {
    usingRNNavigation = !!configOptions?.usingReactNavigation;
    return Promise.resolve(
      NeuroidReactnativeSdk.configure(apiKey, configOptions)
    );
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
  setUserID: function setUserID(userID: string): Promise<void> {
    console.log('Setting User ID: ' + userID);
    return Promise.resolve(NeuroidReactnativeSdk.setUserID(userID));
  },
  excludeViewByTestID: function excludeViewByTestID(
    excludedView: string
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
  setSiteId: function setSiteId(siteId: string): Promise<void> {
    // Pre-release
    console.log('SiteID set ', siteId);
    return Promise.resolve(NeuroidReactnativeSdk.setSiteId(siteId));
  },
  setScreenName: function setScreenName(screenName: string): Promise<void> {
    return Promise.resolve(NeuroidReactnativeSdk.setScreenName(screenName));
  },
  isStopped: function isStopped(): Promise<boolean> {
    return Promise.resolve(NeuroidReactnativeSdk.isStopped());
  },
  registerPageTargets: function isStopped(): Promise<void> {
    if (Platform.OS === 'ios') {
      if (!usingRNNavigation) {
        return Promise.resolve(NeuroidReactnativeSdk.registerPageTargets());
      } else {
        return Promise.resolve();
      }
    }
    return Promise.resolve(NeuroidReactnativeSdk.registerPageTargets());
  },
  setupPage: async function setupPage(screenName: string): Promise<void> {
    await Promise.resolve(NeuroidReactnativeSdk.setScreenName(screenName));

    return Promise.resolve(NeuroidReactnativeSdk.registerPageTargets());
  },

  getClientID: function getClientID(): Promise<string> {
    return Promise.resolve(NeuroidReactnativeSdk.getClientID());
  },
  getSessionID: function getSessionID(): Promise<string> {
    return Promise.resolve(NeuroidReactnativeSdk.getSessionID());
  },
  getUserID: function getUserID(): Promise<string> {
    return Promise.resolve(NeuroidReactnativeSdk.getUserID());
  },
  getSDKVersion: function getSDKVersion(): Promise<string> {
    return new Promise((res) => res(`React-Native:${version}`));
  },
  getScreenName: function getScreenName(): Promise<string> {
    return Promise.resolve(NeuroidReactnativeSdk.getScreenName());
  },
};

export default NeuroID;
