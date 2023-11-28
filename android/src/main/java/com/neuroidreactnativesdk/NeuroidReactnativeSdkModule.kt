package com.neuroidreactnativesdk

import android.app.Application
import com.facebook.react.bridge.*
import com.facebook.react.bridge.ReadableMap
import com.neuroid.tracker.NeuroID
import com.neuroid.tracker.extensions.setVerifyIntegrationHealth

class NeuroidReactnativeSdkModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        @JvmStatic
        fun configure(application: Application, key: String) {
            if (NeuroID.getInstance() == null) {
                val neuroID = NeuroID.Builder(application, key).build()
                NeuroID.setNeuroIdInstance(neuroID)
            }
        }
    }

    private var reactApplicationCtx: ReactApplicationContext = reactContext
    private var application: Application? = reactContext.applicationContext as Application

    override fun getName(): String {
        return "NeuroidReactnativeSdk"
    }

    @ReactMethod
    fun configure(key: String, options: ReadableMap) {
        if (NeuroID.getInstance() == null) {
            val neuroID = NeuroID.Builder(application, key).build()
            NeuroID.setNeuroIdInstance(neuroID)
        }

        val reactCurrentActivity = currentActivity
        if (reactCurrentActivity != null) {
            NeuroID.getInstance()?.registerPageTargets(reactCurrentActivity)
        }
    }

    @ReactMethod
    fun enableLogging(enable: Boolean) {
        NeuroID.getInstance()?.enableLogging(enable)
    }

    @ReactMethod
    fun excludeViewByTestID(id: String) {
        NeuroID.getInstance()?.excludeViewByTestID(id)
    }

    @ReactMethod
    fun getClientID(promise: Promise){
        promise.resolve(NeuroID.getInstance()?.getClientId())
    }

    @ReactMethod
    fun getEnvironment(promise: Promise){
        promise.resolve(NeuroID.getInstance()?.getEnvironment())
    }

    @ReactMethod
    fun getScreenName(promise: Promise) {
        // not exposed in Android
        promise.resolve(NeuroID.getInstance()?.getScreenName())
    }

    @ReactMethod
    fun getSessionID(promise: Promise) {
        promise.resolve(NeuroID.getInstance()?.getSessionId())
    }

    @ReactMethod
    fun getUserID(promise: Promise) {
        promise.resolve(NeuroID.getInstance()?.getUserId())
    }

    @ReactMethod
    fun isStopped(promise: Promise) {
        val instance = NeuroID.getInstance()
        if (instance == null)
            promise.resolve(true)
        else
            promise.resolve(instance.isStopped())
    }

    @ReactMethod
    fun setScreenName(screen: String) {
        NeuroID.getInstance()?.setScreenName(screen)
    }

    @ReactMethod
    fun setSiteId(siteId: String) {
        NeuroID.getInstance()?.setSiteId(siteId)
    }

    @ReactMethod
    fun setUserID(id: String) {
        NeuroID.getInstance()?.setUserID(id)
    }

    @ReactMethod
    fun setRegisteredUserID(id: String) {
        NeuroID.getInstance()?.setRegisteredUserID(id)
    }

    @ReactMethod
    fun setVerifyIntegrationHealth(enable: Boolean) {
        NeuroID.getInstance()?.setVerifyIntegrationHealth(enable)       
    }

    @ReactMethod
    fun start() {
        NeuroID.getInstance()?.setIsRN()
        NeuroID.getInstance()?.start()
    }

    @ReactMethod
    fun stop() {
        NeuroID.getInstance()?.stop()
    }

    @ReactMethod
    fun registerPageTargets(promise: Promise){
        val reactCurrentActivity = currentActivity
        if (reactCurrentActivity != null) {
            NeuroID.getInstance()?.registerPageTargets(reactCurrentActivity)
        }

        promise.resolve(true)
    }

    // setup page mising?
}
