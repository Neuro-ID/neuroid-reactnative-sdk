#!/bin/bash

echo "Updating Libraries"

# Update iOS Podfile to use NeuroID/Advanced 
version=$(sed -n "s/.*'NeuroID', '\([^']*\)'.*/\1/p" neuroid-reactnative-sdk.podspec)

if [ -n "$version" ]; then
    sed -i='' 's/s.dependency "React-Core"/s.dependency "NeuroID\/AdvancedDevice", '"'$version'"' \n  s.dependency "React-Core"/' neuroid-reactnative-sdk.podspec
else
    sed -i='' 's/s.dependency "React-Core"/s.dependency "NeuroID\/AdvancedDevice" \n  s.dependency "React-Core"/' neuroid-reactnative-sdk.podspec
fi

# Update Android Libraries 
sed -i='' 's/neuroid-android-sdk:react-android-sdk/neuroid-android-sdk:react-android-advanced-device-sdk/' android/build.gradle


# Implement code for iOS header and actual
sed -i='' 's/start:/startAdv:(BOOL)advancedDeviceSignals\n                 withResolver:/' ios/NeuroidReactnativeSdk.m
sed -i='' 's/startSession: (NSString)sessionID /startSessionAdv: (NSString)sessionID \n                 advancedDeviceSignals: (BOOL)advancedDeviceSignals/' ios/NeuroidReactnativeSdk.m

# Add to ios function file
sed -i='' 's/@objc(start:withRejecter:)/@objc(startAdv:withResolver:withRejecter:)/' ios/NeuroidReactnativeSdk.swift
sed -i='' 's/func start(resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {/func startAdv(advancedDeviceSignals: Bool, resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {/' ios/NeuroidReactnativeSdk.swift
sed -i='' 's/NeuroID.start() { result in/NeuroID.start(advancedDeviceSignals) { result in/' ios/NeuroidReactnativeSdk.swift

sed -i='' 's/@objc(startSession:withResolver:withRejecter:)/@objc(startSessionAdv:advancedDeviceSignals:withResolver:withRejecter:)/' ios/NeuroidReactnativeSdk.swift
sed -i='' 's/func startSession(sessionID: String?, resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {/func startSessionAdv(sessionID: String?, advancedDeviceSignals: Bool, resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {/' ios/NeuroidReactnativeSdk.swift
sed -i='' 's/NeuroID.startSession(sessionID)  { result in/NeuroID.startSession(sessionID, advancedDeviceSignals)  { result in/' ios/NeuroidReactnativeSdk.swift


# Implement code for Android actual 
sed -i='' '/import com.neuroid.tracker.extensions.setVerifyIntegrationHealth/i \
import com.neuroid.tracker.extensions.start\
import com.neuroid.tracker.extensions.startSession\
' android/src/main/java/com/neuroidreactnativesdk/NeuroidReactnativeSdkModule.kt

sed -i='' '/fun start(promise: Promise) {/i \
    fun startAdv(advancedDeviceSignals: Boolean, promise: Promise) { \
        NeuroID.getInstance()?.start(advancedDeviceSignals) { \
            if (it != null){ \
                promise.resolve(it) \
            } else { \
                promise.resolve(false) \
            } \
        }\
    }\
\
    @ReactMethod\
' android/src/main/java/com/neuroidreactnativesdk/NeuroidReactnativeSdkModule.kt

sed -i='' '/fun startSession(sessionID: String? = null, promise: Promise) {/i \
    fun startSessionAdv(sessionID: String? = null, advancedDeviceSignals: Boolean, promise: Promise) {\
        NeuroID.getInstance()?.startSession(sessionID, advancedDeviceSignals) {\
            val resultData = Arguments.createMap()\
            resultData.putString("sessionID", it.sessionID)\
            resultData.putBoolean("started", it.started)\
            promise.resolve(resultData)\
        }\
    }\
\
    @ReactMethod\
' android/src/main/java/com/neuroidreactnativesdk/NeuroidReactnativeSdkModule.kt


# update types
sed -i='' 's/start: ()/start: (advancedDeviceSignals?: Boolean)/' src/types.ts
sed -i='' 's/startSession: (sessionID?: string)/startSession: (\n    sessionID?: string,\n    advancedDeviceSignals?: Boolean\n  )/' src/types.ts

# update index
sed -i='' 's/start(): /start(advancedDeviceSignals?: Boolean): /' src/index.tsx
sed -i='' 's/NeuroidReactnativeSdk.start()/\n          NeuroidReactnativeSdk.startAdv(!!advancedDeviceSignals)\n        /' src/index.tsx
sed -i='' 's/sessionID?: string/sessionID?: string,\n    advancedDeviceSignals?: Boolean/' src/index.tsx
sed -i='' 's/NeuroidReactnativeSdk.startSession(sessionID)/NeuroidReactnativeSdk.startSessionAdv(\n      sessionID,\n      !!advancedDeviceSignals\n    )/' src/index.tsx


# update package.json for new module name and description
sed -i='' 's/"name": "neuroid-reactnative-sdk"/"name": "neuroid-reactnative-sdk-advanced-device"/' package.json
sed -i='' 's/"description": "Official NeuroID React Native SDK"/"description": "Official NeuroID React Native SDK for Advanced Device Tracking"/' package.json
