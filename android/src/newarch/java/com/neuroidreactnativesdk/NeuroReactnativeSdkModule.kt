package com.neuroidreactnativesdk

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = NeuroidReactnativeSdkModuleImpl.NAME)
class NeuroidReactnativeSdkModule(
    reactContext: ReactApplicationContext,
) : NativeNeuroidReactnativeSdkSpec(reactContext) {

    private val impl = NeuroidReactnativeSdkModuleImpl(reactContext)

    override fun getName(): String = NeuroidReactnativeSdkModuleImpl.NAME

    override fun configure(key: String, options: ReadableMap?, promise: Promise) =
        impl.configure(key, options, promise)

    override fun enableLogging(enable: Boolean, promise: Promise) = impl.enableLogging(enable, promise)

    override fun excludeViewByTestID(id: String, promise: Promise) =
        impl.excludeViewByTestID(id, promise)

    override fun getClientID(promise: Promise) = impl.getClientID(promise)

    override fun getEnvironment(promise: Promise) = impl.getEnvironment(promise)

    override fun getScreenName(promise: Promise) = impl.getScreenName(promise)

    override fun getIdentityId(promise: Promise) = impl.getIdentityId(promise)

    override fun identify(identityId: String, promise: Promise) = impl.identify(identityId, promise)

    override fun getRegisteredUserID(promise: Promise) = impl.getRegisteredUserID(promise)

    override fun isStopped(promise: Promise) = impl.isStopped(promise)

    override fun setScreenName(screen: String, promise: Promise) = impl.setScreenName(screen, promise)

    override fun setRegisteredUserID(id: String, promise: Promise) =
        impl.setRegisteredUserID(id, promise)

    override fun setVariable(key: String, value: String, promise: Promise) =
        impl.setVariable(key, value, promise)

    override fun start(promise: Promise) = impl.start(promise)

    override fun stop(promise: Promise) = impl.stop(promise)

    override fun registerPageTargets(promise: Promise) = impl.registerPageTargets(promise)

    override fun startSession(identityId: String?, promise: Promise) =
        impl.startSession(identityId, promise)

    override fun stopSession(promise: Promise) = impl.stopSession(promise)

    override fun pauseCollection(promise: Promise) = impl.pauseCollection(promise)

    override fun resumeCollection(promise: Promise) = impl.resumeCollection(promise)

    override fun startAppFlow(siteId: String, userId: String?, promise: Promise) =
        impl.startAppFlow(siteId, userId, promise)
}
