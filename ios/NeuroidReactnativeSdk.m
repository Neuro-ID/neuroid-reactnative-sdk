#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NeuroidReactnativeSdk, NSObject)

RCT_EXTERN_METHOD(configure:(NSString)apiKey
                 parameters:(NSDictionary *)parameters
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(enableLogging:(BOOL)value
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(excludeViewByTestID:(NSString)excludedView
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getClientID: (RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getEnvironment: (RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getScreenName: (RCTPromiseResolveBlock)resolve
withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getSessionID: (RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getUserID: (RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(isStopped: (RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setScreenName:(NSString)screenName
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setSiteId:(NSString)siteId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setUserID:(NSString)userID
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setRegisteredUserID:(NSString)userID
                withResolver:(RCTPromiseResolveBlock)resolve
                withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setVerifyIntegrationHealth:(BOOL)value
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)                 

RCT_EXTERN_METHOD(start: (RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(stop: (RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(registerPageTargets: (RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

// missing setupPage?

@end
