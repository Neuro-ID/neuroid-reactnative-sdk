package com.neuroidreactnativesdk

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NeuroidReactnativeSdkModule(
    reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {

    private val impl = NeuroidReactnativeSdkModuleImpl(reactContext)

    override fun getName(): String = NeuroidReactnativeSdkModuleImpl.NAME

    @ReactMethod
    fun configure(key: String, options: ReadableMap?, promise: Promise) =
        impl.configure(key, options, promise)

    @ReactMethod
    fun enableLogging(enable: Boolean, promise: Promise) = impl.enableLogging(enable, promise)

    @ReactMethod
    fun excludeViewByTestID(id: String, promise: Promise) =
        impl.excludeViewByTestID(id, promise)

    @ReactMethod
    fun getClientID(promise: Promise) = impl.getClientID(promise)

    @ReactMethod
    fun getEnvironment(promise: Promise) = impl.getEnvironment(promise)

    @ReactMethod
    fun getScreenName(promise: Promise) = impl.getScreenName(promise)

    @ReactMethod
    fun getSessionID(promise: Promise) = impl.getSessionID(promise)

    @ReactMethod
    fun getUserID(promise: Promise) = impl.getUserID(promise)

    @ReactMethod
    fun getRegisteredUserID(promise: Promise) = impl.getRegisteredUserID(promise)

    @ReactMethod
    fun isStopped(promise: Promise) = impl.isStopped(promise)

    @ReactMethod
    fun setScreenName(screen: String, promise: Promise) = impl.setScreenName(screen, promise)

    @ReactMethod
    fun setUserID(id: String, promise: Promise) = impl.setUserID(id, promise)

    @ReactMethod
    fun identify(sessionID: String, promise: Promise) = impl.identify(sessionID, promise)

    @ReactMethod
    fun setRegisteredUserID(id: String, promise: Promise) =
        impl.setRegisteredUserID(id, promise)

    @ReactMethod
    fun attemptedLogin(id: String?, promise: Promise) = impl.attemptedLogin(id, promise)

    @ReactMethod
    fun setVariable(key: String, value: String, promise: Promise) =
        impl.setVariable(key, value, promise)

    @ReactMethod
    fun start(promise: Promise) = impl.start(promise)

    @ReactMethod
    fun stop(promise: Promise) = impl.stop(promise)

    @ReactMethod
    fun registerPageTargets(promise: Promise) = impl.registerPageTargets(promise)

    @ReactMethod
    fun startSession(sessionID: String?, promise: Promise) =
        impl.startSession(sessionID, promise)

    @ReactMethod
    fun stopSession(promise: Promise) = impl.stopSession(promise)

    @ReactMethod
    fun pauseCollection(promise: Promise) = impl.pauseCollection(promise)

    @ReactMethod
    fun resumeCollection(promise: Promise) = impl.resumeCollection(promise)

    @ReactMethod
    fun startAppFlow(siteId: String, userId: String?, promise: Promise) =
        impl.startAppFlow(siteId, userId, promise)
}
