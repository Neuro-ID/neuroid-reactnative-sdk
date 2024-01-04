import NeuroID
import SwiftUI

@objc(NeuroidReactnativeSdk)
class NeuroidReactnativeSdk: NSObject {

    @objc(configure:parameters:withResolver:withRejecter:)
    func configure(apiKey: String, parameters: [String: Any], resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.configure(clientKey: apiKey, rnOptions: parameters)
        resolve(true)
    }

    @objc(enableLogging:withResolver:withRejecter:)
    func enableLogging(value: Bool, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.enableLogging(value)
        resolve(true)
    }

    @objc(excludeViewByTestID:withResolver:withRejecter:)
    func excludeViewByTestID(excludedView: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.excludeViewByTestID(excludedView: excludedView)
        resolve(true)
    }

    @objc(getClientID:withRejecter:)
    func getClientID(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let cid = NeuroID.getClientID()
        resolve(cid)
    }

    @objc(getEnvironment:withRejecter:)
    func getEnvironment(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let env = NeuroID.getEnvironment()
        resolve(env)
    }

    @objc(getScreenName:withRejecter:)
    func getScreenName(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let screen = NeuroID.getScreenName()
        resolve(screen)
    }

    @objc(getSessionID:withRejecter:)
    func getSessionID(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let sid = NeuroID.getSessionID()
        resolve(sid)
    }

    @objc(getUserID:withRejecter:)
    func getUserID(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let uid = NeuroID.getUserID()
        resolve(uid)
    }

    @objc(isStopped:withRejecter:)
    func isStopped(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let stopped = NeuroID.isStopped()
        resolve(stopped)
    }

    @objc(setScreenName:withResolver:withRejecter:)
    func setScreenName(screenName: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Bool {
        let setResult = NeuroID.setScreenName(screenName)
        resolve(setResult)
    }

    @objc(setSiteId:withResolver:withRejecter:)
    func setSiteId(siteId: NSString, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.setSiteId(siteId: siteId as String)
        resolve(true)
    }

    @objc(setUserID:withResolver:withRejecter:)
    func setUserID(userID: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let setResult = NeuroID.setUserID(userID)
        resolve(setResult)
    }

    @objc(setRegisteredUserID:withResolver:withRejecter:)
    func setRegisteredUserID(userID: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let setResult = NeuroID.setRegisteredUserID(userID)
        resolve(setResult)
    }

    @objc(setVerifyIntegrationHealth:withResolver:withRejecter:)
    func setVerifyIntegrationHealth(value: Bool, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.setVerifyIntegrationHealth(value)
        resolve(true)
    }
    
    @objc(start:withRejecter:)
    func start(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Bool {
        NeuroID.setIsRN()
        let result = NeuroID.start()
        resolve(result)
    }
    
    @objc(stop:withRejecter:)
    func stop(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.stop()
        resolve(true)
    }
    
    @objc(registerPageTargets:withRejecter:)
    func registerPageTargets(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.registerPageTargets()
        resolve(true)
    }

    @objc(pauseCollection:withRejecter:)
    func pauseCollection(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.pauseCollection()
        resolve(true)
    }

    @objc(resumeCollection:withRejecter:)
    func resumeCollection(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.resumeCollection()
        resolve(true)
    }

    @objc(stopSession:withRejecter:)
    func stopSession(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let result = NeuroID.stopSession()
        resolve(result)
    }

    @objc(startSession:withResolver:withRejecter:)
    func startSession(sessionID:String, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        let result = NeuroID.startSession(sessionID)
        let resultData: [String: Any] = ["sessionID": result.sessionID, "started": result.started]
        resolve(resultData)
    }
    
    // missing setupPage?
}
