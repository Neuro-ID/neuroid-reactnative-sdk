import NeuroID
import SwiftUI

@objc(NeuroidReactnativeSdk)
class NeuroidReactnativeSdk: NSObject {
    @objc(configure:parameters:withResolver:withRejecter:)
    func configure(apiKey: String, parameters: [String: Any], resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let result = NeuroID.configure(clientKey: apiKey, rnOptions: parameters)
        NeuroID.setIsRN()
        resolve(result)
    }

    @objc(enableLogging:withResolver:withRejecter:)
    func enableLogging(value: Bool, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.enableLogging(value)
        resolve(true)
    }

    @objc(excludeViewByTestID:withResolver:withRejecter:)
    func excludeViewByTestID(excludedView: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.excludeViewByTestID(excludedView: excludedView)
        resolve(true)
    }

    @objc(getClientID:withRejecter:)
    func getClientID(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let cid = NeuroID.getClientID()
        resolve(cid)
    }

    @objc(getEnvironment:withRejecter:)
    func getEnvironment(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let env = NeuroID.getEnvironment()
        resolve(env)
    }

    @objc(getScreenName:withRejecter:)
    func getScreenName(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let screen = NeuroID.getScreenName()
        resolve(screen)
    }

    @objc(getSessionID:withRejecter:)
    func getSessionID(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let sid = NeuroID.getSessionID()
        resolve(sid)
    }

    @objc(getUserID:withRejecter:)
    func getUserID(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let uid = NeuroID.getUserID()
        resolve(uid)
    }

    @objc(getRegisteredUserID:withRejecter:)
    func getRegisteredUserID(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let uid = NeuroID.getRegisteredUserID()
        resolve(uid)
    }

    @objc(isStopped:withRejecter:)
    func isStopped(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let stopped = NeuroID.isStopped()
        resolve(stopped)
    }

    @objc(setScreenName:withResolver:withRejecter:)
    func setScreenName(screenName: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let setResult = NeuroID.setScreenName(screenName)
        resolve(setResult)
    }

    @objc(setSiteId:withResolver:withRejecter:)
    func setSiteId(siteId: NSString, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.setSiteId(siteId: siteId as String)
        resolve(true)
    }

    @objc(setUserID:withResolver:withRejecter:)
    func setUserID(userID: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let setResult = NeuroID.setUserID(userID)
        resolve(setResult)
    }

    @objc(setRegisteredUserID:withResolver:withRejecter:)
    func setRegisteredUserID(userID: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let setResult = NeuroID.setRegisteredUserID(userID)
        resolve(setResult)
    }
    
    @objc(attemptedLogin:withResolver:withRejecter:)
    func attemptedLogin(userID: String?, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let setResult = NeuroID.attemptedLogin(userID)
        resolve(setResult)
    }

    @objc(setVerifyIntegrationHealth:withResolver:withRejecter:)
    func setVerifyIntegrationHealth(value: Bool, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.setVerifyIntegrationHealth(value)
        resolve(true)
    }

    @objc(setVariable:value:withResolver:withRejecter:)
    func setVariable(key: String, value:String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.setVariable(key: key, value: value)
        resolve(true)
    }

    @objc(start:withRejecter:)
    func start(resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.start() { result in 
            resolve(result)
        }
    }

    @objc(stop:withRejecter:)
    func stop(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let result = NeuroID.stop()
        resolve(result)
    }

    @objc(registerPageTargets:withRejecter:)
    func registerPageTargets(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.registerPageTargets()
        resolve(true)
    }

    @objc(pauseCollection:withRejecter:)
    func pauseCollection(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.pauseCollection()
        resolve(true)
    }

    @objc(resumeCollection:withRejecter:)
    func resumeCollection(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.resumeCollection()
        resolve(true)
    }

    @objc(stopSession:withRejecter:)
    func stopSession(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let result = NeuroID.stopSession()
        resolve(result)
    }

    @objc(startSession:withResolver:withRejecter:)
    func startSession(sessionID: String?, resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.startSession(sessionID)  { result in
            let resultData: [String: Any] = ["sessionID": result.sessionID, "started": result.started]
            resolve(resultData)
        }
    }
    
    @objc(startAppFlow:userID:withResolver:withRejecter:)
    func startAppFlow(siteID: String, userID: String?, resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.startAppFlow(siteID: siteID, userID: userID) { result in
            let resultData: [String: Any] = ["sessionID": result.sessionID, "started": result.started]
            resolve(resultData)
        }
    }
}
