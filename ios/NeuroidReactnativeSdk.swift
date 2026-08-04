import Foundation
import NeuroID
import React

@objc(NeuroidReactnativeSdk)
class NeuroidReactnativeSdk: NSObject {
    @objc(configure:options:resolve:reject:)
    func configure(apiKey: String, options: [String: Any], resolve: RCTPromiseResolveBlock, _: RCTPromiseRejectBlock) {
        let result = NeuroID.configure(clientKey: apiKey, rnOptions: options)
        resolve(result)
    }

    @objc(enableLogging:resolve:reject:)
    func enableLogging(value: Bool, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.enableLogging(value)
        resolve(true)
    }

    @objc(excludeViewByTestID:resolve:reject:)
    func excludeViewByTestID(excludedView: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.excludeViewByTestID(excludedView)
        resolve(true)
    }

    @objc(getClientID:reject:)
    func getClientID(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let cid = NeuroID.getClientID()
        resolve(cid)
    }

    @objc(getEnvironment:reject:)
    func getEnvironment(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let env = NeuroID.getEnvironment()
        resolve(env)
    }

    @objc(getScreenName:reject:)
    func getScreenName(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let screen = NeuroID.getScreenName()
        resolve(screen)
    }

    @objc(getIdentityId:reject:)
    func getIdentityId(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let identityId = NeuroID.getIdentityId()
        resolve(identityId)
    }

    @objc(getSessionID:reject:)
    func getSessionID(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let sid = NeuroID.getSessionID()
        resolve(sid)
    }

    @objc(getUserID:reject:)
    func getUserID(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let uid = NeuroID.getUserID()
        resolve(uid)
    }

    @objc(identify:resolve:reject:)
    func identify(sessionID: String, resolve: RCTPromiseResolveBlock, _: RCTPromiseRejectBlock) {
        let identifyResult = NeuroID.identify(sessionID)
        resolve(identifyResult)
    }

    @objc(setUserID:resolve:reject:)
    func setUserID(userID: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let setResult = NeuroID.setUserID(userID)
        resolve(setResult)
    }

    @objc(getRegisteredUserID:reject:)
    func getRegisteredUserID(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let uid = NeuroID.getRegisteredUserID()
        resolve(uid)
    }

    @objc(isStopped:reject:)
    func isStopped(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let stopped = NeuroID.isStopped()
        resolve(stopped)
    }

    @objc(setScreenName:resolve:reject:)
    func setScreenName(screenName: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let setResult = NeuroID.setScreenName(screenName)
        resolve(setResult)
    }

    @objc(setRegisteredUserID:resolve:reject:)
    func setRegisteredUserID(userID: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let setResult = NeuroID.setRegisteredUserID(userID)
        resolve(setResult)
    }
    
    @objc(attemptedLogin:resolve:reject:)
    func attemptedLogin(userID: String?, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let setResult = NeuroID.attemptedLogin(userID)
        resolve(setResult)
    }

    @objc(setVariable:value:resolve:reject:)
    func setVariable(key: String, value:String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.setVariable(key: key, value: value)
        resolve(true)
    }

    @objc(start:reject:)
    func start(resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.start() { result in 
            resolve(result)
        }
    }

    @objc(stop:reject:)
    func stop(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let result = NeuroID.stop()
        resolve(result)
    }

    @objc(registerPageTargets:reject:)
    func registerPageTargets(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.registerPageTargets()
        resolve(true)
    }

    @objc(pauseCollection:reject:)
    func pauseCollection(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.pauseCollection()
        resolve(true)
    }

    @objc(resumeCollection:reject:)
    func resumeCollection(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.resumeCollection()
        resolve(true)
    }

    @objc(stopSession:reject:)
    func stopSession(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        let result = NeuroID.stopSession()
        resolve(result)
    }

    @objc(startSession:resolve:reject:)
    func startSession(sessionID: String?, resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.startSession(sessionID)  { result in
            let resultData: [String: Any] = ["sessionID": result.sessionID, "started": result.started]
            resolve(resultData)
        }
    }
    
    @objc(startAppFlow:userID:resolve:reject:)
    func startAppFlow(siteID: String, userID: String?, resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        NeuroID.startAppFlow(siteID: siteID, sessionID: userID) { result in
            let resultData: [String: Any] = ["sessionID": result.sessionID, "started": result.started]
            resolve(resultData)
        }
    }
}
