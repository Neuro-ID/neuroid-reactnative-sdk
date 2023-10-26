#!/bin/bash

echo "Updating Libraries"

# Update iOS Podfile to use NeuroID/Advanced 
version=$(sed -n "s/.*'NeuroID', '\([^']*\)'.*/\1/p" neuroid-reactnative-sdk.podspec)

if [ -n "$version" ]; then
    sed -i '' 's/s.dependency "React-Core"/s.dependency "NeuroID\/AdvancedDevice", '"'$version'"' \n  s.dependency "React-Core"/' neuroid-reactnative-sdk.podspec
else
    sed -i '' 's/s.dependency "React-Core"/s.dependency "NeuroID\/AdvancedDevice" \n  s.dependency "React-Core"/' neuroid-reactnative-sdk.podspec
fi

# Update Android Libraries 
sed -i '' 's/neuroid-android-sdk:react-android-sdk/neuroid-android-sdk:react-android-advanced-device-sdk/' android/build.gradle

# Implement code for iOS header and actual
sed -i '' 's/start:/start:(BOOL)advancedDeviceSignals\n                 withResolver:/' ios/NeuroidReactnativeSdk.m

# Add to ios function file
sed -i '' 's/@objc(start:withRejecter:)/@objc(start:withResolver:withRejecter:)/' ios/NeuroidReactnativeSdk.swift
sed -i '' 's/func start(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {/func start(advancedDeviceSignals: Bool, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {/' ios/NeuroidReactnativeSdk.swift
sed -i '' 's/NeuroID.start()/NeuroID.start(advancedDeviceSignals: advancedDeviceSignals)/' ios/NeuroidReactnativeSdk.swift


# Implement code for Android actual 
sed -i '' '/import com.neuroid.tracker.extensions.setVerifyIntegrationHealth/i \
import com.neuroid.tracker.extensions.start\
' android/src/main/java/com/neuroidreactnativesdk/NeuroidReactnativeSdkModule.kt

sed -i '' '/fun start() {/i \
    fun start(advancedDeviceSignals: Boolean) {\
        NeuroID.getInstance()?.setIsRN() \
        NeuroID.getInstance()?.start(advancedDeviceSignals)\
    }\
\
    @ReactMethod\
' android/src/main/java/com/neuroidreactnativesdk/NeuroidReactnativeSdkModule.kt


# update types
sed -i '' 's/start: ()/start: (advancedDeviceSignals?: Boolean)/' src/types.ts

# update index
sed -i '' 's/start(): /start(advancedDeviceSignals?: Boolean): /' src/index.tsx
sed -i '' 's/NeuroidReactnativeSdk.start()/NeuroidReactnativeSdk.start(!!advancedDeviceSignals)/' src/index.tsx

# update package.json for new module name and description
sed -i '' 's/"name": "neuroid-reactnative-sdk"/"name": "neuroid-reactnative-sdk-advanced-device"/' package.json
sed -i '' 's/"description": "Official NeuroID React Native SDK"/"description": "Official NeuroID React Native SDK for Advanced Device Tracking"/' package.json