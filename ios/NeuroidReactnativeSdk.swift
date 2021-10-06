
@objc(NeuroidReactnativeSdk)
class NeuroidReactnativeSdk: NSObject {

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        
        resolve(a*b + 2)
    }
    
    @objc(configure:withResolver:withRejecter:)
    func configure(apiKey: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
//        Neuro
        NeuroID.configure(clientKey: "key_test_vtotrandom_form_mobilesandbox")
        resolve(true)
    }
    
//    @objc(configure:withResolver:withRejecter:)
//    func configure(apiKey: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
//        resolve("Horray!")
//    }
    
}
