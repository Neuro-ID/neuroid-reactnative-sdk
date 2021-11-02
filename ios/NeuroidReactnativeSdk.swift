
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

//    @objc//(stop:resolve:withRejecter:)
//    func stop(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
//        NeuroID.stop()
//        resolve(true)
//    }
//
//    @objc//(isStopped:resolve:withRejecter:)
//    func isStopped(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
//        resolve(NeuroID.isStopped())
//    }
    
}
