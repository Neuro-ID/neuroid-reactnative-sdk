#import <React/RCTBridgeModule.h>

#import <React/RCTLog.h>

@interface RCT_EXTERN_MODULE(NeuroidReactnativeSdk, NSObject)

RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(configure:(NSString)apiKey
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

//RCT_EXTERN_METHOD(configure:(NSString)withApiKey)

@end
