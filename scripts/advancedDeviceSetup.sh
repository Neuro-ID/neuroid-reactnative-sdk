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
sed -i='' 's/start:/start:(BOOL)advancedDeviceSignals\n                 withResolver:/' ios/NeuroidReactnativeSdk.m
sed -i='' 's/startSession: (NSString)sessionID /startSession: (NSString)sessionID \n                 advancedDeviceSignals: (BOOL)advancedDeviceSignals/' ios/NeuroidReactnativeSdk.m

# Add to ios function file
sed -i='' 's/@objc(start:withRejecter:)/@objc(start:withResolver:withRejecter:)/' ios/NeuroidReactnativeSdk.swift
sed -i='' 's/func start(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {/func start(advancedDeviceSignals: Bool, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {/' ios/NeuroidReactnativeSdk.swift
sed -i='' 's/NeuroID.start()/NeuroID.start(advancedDeviceSignals)/' ios/NeuroidReactnativeSdk.swift

sed -i='' 's/@objc(startSession:withResolver:withRejecter:)/@objc(startSession:advancedDeviceSignals:withResolver:withRejecter:)/' ios/NeuroidReactnativeSdk.swift
sed -i='' 's/func startSession(sessionID: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {/func startSession(sessionID: String, advancedDeviceSignals: Bool, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {/' ios/NeuroidReactnativeSdk.swift
sed -i='' 's/let result = NeuroID.startSession(sessionID)/let result = NeuroID.startSession(sessionID, advancedDeviceSignals)/' ios/NeuroidReactnativeSdk.swift


# Implement code for Android actual 
sed -i='' '/import com.neuroid.tracker.extensions.setVerifyIntegrationHealth/i \
import com.neuroid.tracker.extensions.start\
import com.neuroid.tracker.extensions.startSession\
' android/src/main/java/com/neuroidreactnativesdk/NeuroidReactnativeSdkModule.kt

sed -i='' '/fun start(promise: Promise) {/i \
    fun start(advancedDeviceSignals: Boolean, promise: Promise) {\
        val started = NeuroID.getInstance()?.start(advancedDeviceSignals); \
\
        if (started != null){ \
            promise.resolve(started) \
        } else { \
            promise.resolve(false) \
        } \
    }\
\
    @ReactMethod\
' android/src/main/java/com/neuroidreactnativesdk/NeuroidReactnativeSdkModule.kt

sed -i='' '/fun startSession(sessionID: String? = null, promise: Promise) {/i \
    fun startSession(sessionID: String? = null, advancedDeviceSignals: Boolean, promise: Promise) {\
        val result = NeuroID.getInstance()?.startSession(sessionID, advancedDeviceSignals) \
        val resultData = Arguments.createMap() \
        result?.let { \
            resultData.putString("sessionID", it.sessionID) \
            resultData.putBoolean("started", it.started) \
        } \
        promise.resolve(resultData) \
    }\
\
    @ReactMethod\
' android/src/main/java/com/neuroidreactnativesdk/NeuroidReactnativeSdkModule.kt


# update types
sed -i='' 's/start: ()/start: (advancedDeviceSignals?: Boolean)/' src/types.ts
sed -i='' 's/startSession: (sessionID?: string)/startSession: (\n    sessionID?: string,\n    advancedDeviceSignals?: Boolean\n  )/' src/types.ts

# update index
sed -i='' 's/start(): /start(advancedDeviceSignals?: Boolean): /' src/index.tsx
sed -i='' 's/NeuroidReactnativeSdk.start()/\n          NeuroidReactnativeSdk.start(!!advancedDeviceSignals)\n        /' src/index.tsx
sed -i='' 's/sessionID?: string/sessionID?: string,\n    advancedDeviceSignals?: Boolean/' src/index.tsx
sed -i='' 's/NeuroidReactnativeSdk.startSession(sessionID)/NeuroidReactnativeSdk.startSession(\n      sessionID,\n      !!advancedDeviceSignals\n    )/' src/index.tsx


# update package.json for new module name and description
sed -i='' 's/"name": "neuroid-reactnative-sdk"/"name": "neuroid-reactnative-sdk-advanced-device"/' package.json
sed -i='' 's/"description": "Official NeuroID React Native SDK"/"description": "Official NeuroID React Native SDK for Advanced Device Tracking"/' package.json
