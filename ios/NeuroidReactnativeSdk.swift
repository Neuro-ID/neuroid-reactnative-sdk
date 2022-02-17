@objc(NeuroidReactnativeSdk)
class NeuroidReactnativeSdk: NSObject {

    @objc(configure:withResolver:withRejecter:)
    func configure(apiKey: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        NeuroID.configure(clientKey: apiKey)
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
        NeuroID.setUserID(userID)
        resolve(true)
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
