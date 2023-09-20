import NeuroID
import SwiftUI

@objc(NeuroidReactnativeSdk)
class NeuroidReactnativeSdk: NSObject {

    @objc(configure:withResolver:withRejecter:)
    func configure(apiKey: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.configure(clientKey: apiKey)
        resolve(true)
    }
    
    @objc(setEnvironmentProduction:withResolver:withRejecter:)
    func setEnvironmentProduction(value: Bool, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.setEnvironmentProduction(value)
        resolve(true)
    }

    @objc(setVerifyIntegrationHealth:withResolver:withRejecter:)
    func setVerifyIntegrationHealth(value: Bool, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.setVerifyIntegrationHealth(value)
        resolve(true)
    }
    
    @objc(setSiteId:withResolver:withRejecter:)
    func setSiteId(siteId: NSString, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.setSiteId(siteId: siteId as String)
        resolve(true)
    }
    
    @objc(start:withRejecter:)
    func start(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.start()
        resolve(true)
    }
    
    @objc(stop:withRejecter:)
    func stop(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.stop()
        resolve(true)
    }
    
    @objc(getSessionID:withRejecter:)
    func getSessionID(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        var sid = NeuroID.getSessionID()
        resolve(sid)
    }
    
    @objc(setUserID:withResolver:withRejecter:)
    func setUserID(userID: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        try? NeuroID.setUserID(userID)
        resolve(true)
    }
    
    @objc(excludeViewByTestID:withResolver:withRejecter:)
    func excludeViewByTestID(excludedView: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.excludeViewByTestID(excludedView: excludedView)
        resolve(true)
    }
    
    @objc(setScreenName:withResolver:withRejecter:)
    func setScreenName(screenName: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        try? NeuroID.setScreenName(screen: screenName)
        resolve(true)
    }

    @objc(registerPageTargets:withRejecter:)
    func registerPageTargets(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(true)
    }

}
