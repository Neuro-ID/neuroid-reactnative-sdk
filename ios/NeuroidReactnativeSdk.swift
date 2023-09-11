import SwiftUI
@objc(NeuroidReactnativeSdk)
class NeuroidReactnativeSdk: NSObject {

    @objc(configure:withResolver:withRejecter:)
    func configure(apiKey: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.configure(clientKey: apiKey)
        resolve(true)
    }
    
    @objc(configureWithOptions:collectorEndPoint:withResolver:withRejecter:)
    func configureWithOptions(apiKey: String, collectorEndPoint: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.configure(clientKey: apiKey, collectorEndPoint: collectorEndPoint)
        resolve(true)
    }
    
    @objc(setEnvironmentProduction:withResolver:withRejecter:)
    func setEnvironmentProduction(value: Bool, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.setEnvironmentProduction(true)
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
    
    @objc(manuallyRegisterRNTarget:className:screenName:placeHolder:)
    func manuallyRegisterRNTarget(id: String, className: String, screenName: String, placeHolder: String) -> Void {
        // Valid names for et field
        
        var types = ["UITextField::", "UITextView::", "UIButton::" ]
        var validType = false
        for t in types {
            if (className.contains(t)) {
                validType = true
                break;
            }
        }
        if (!validType){
            NIDPrintLog("INVALID CLASSNAME TYPE [\(className)]. Must be in \(types).")
            return
        }
        NeuroID.manuallyRegisterRNTarget(id: id, className: className, screenName: screenName, placeHolder: placeHolder)
    }
    
    @objc(formSubmit:withRejecter:)
    func formSubmit(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.formSubmit()
        resolve(true)
    }
    
    @objc(formSubmitSuccess:withRejecter:)
    func formSubmitSuccess(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.formSubmitSuccess()
        resolve(true)
    }
    
    @objc(formSubmitFailure:withRejecter:)
    func formSubmitFailure(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.formSubmitFailure()
        resolve(true)
    }
    
}
