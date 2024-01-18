package com.neuroidreactnativesdk

import android.app.Application
import com.facebook.react.bridge.*
import com.facebook.react.bridge.ReadableMap
import com.neuroid.tracker.NeuroID
import com.neuroid.tracker.extensions.setVerifyIntegrationHealth
import com.facebook.react.bridge.Arguments

class NeuroidReactnativeSdkModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        @JvmStatic
        fun configure(application: Application, key: String) {
            if (NeuroID.getInstance() == null) {
                val neuroID = NeuroID.Builder(application, key).build()
                NeuroID.setNeuroIDInstance(neuroID)
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
            NeuroID.setNeuroIDInstance(neuroID)

            NeuroID.getInstance()?.setIsRN()
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
        promise.resolve(NeuroID.getInstance()?.getClientID())
    }

    @ReactMethod
    fun getEnvironment(promise: Promise){
        promise.resolve(NeuroID.getInstance()?.getEnvironment())
    }

    @ReactMethod
    fun getScreenName(promise: Promise) {
        promise.resolve(NeuroID.getInstance()?.getScreenName())
    }

    @ReactMethod
    fun getSessionID(promise: Promise) {
        promise.resolve(NeuroID.getInstance()?.getSessionID())
    }

    @ReactMethod
    fun getUserID(promise: Promise) {
        promise.resolve(NeuroID.getInstance()?.getUserID())
    }

    @ReactMethod
    fun getRegisteredUserID(promise: Promise) {
        promise.resolve(NeuroID.getInstance()?.getRegisteredUserID())
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
    fun setScreenName(screen: String, promise: Promise) {
        val result = NeuroID.getInstance()?.setScreenName(screen)

        if (result != null){
            promise.resolve(result)
        } else {
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun setSiteId(siteId: String) {
        // deprecated so no need to replace with ID
        NeuroID.getInstance()?.setSiteId(siteId)
    }

    @ReactMethod
    fun setUserID(id: String, promise: Promise) {
        var result = NeuroID.getInstance()?.setUserID(id)
        result?.let {
            promise.resolve(it)
        }
        promise.resolve(false)
    }

    @ReactMethod
    fun setRegisteredUserID(id: String, promise: Promise)  {
        var result = NeuroID.getInstance()?.setRegisteredUserID(id)
        result?.let {
            promise.resolve(it)
        }
        promise.resolve(false)
    }

    @ReactMethod
    fun setVerifyIntegrationHealth(enable: Boolean) {
        NeuroID.getInstance()?.setVerifyIntegrationHealth(enable)       
    }

    @ReactMethod
    fun start(promise: Promise) {
        val started = NeuroID.getInstance()?.start();

        if (started != null){
            promise.resolve(started)
        } else {
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun stop(promise: Promise) {
        val stopped = NeuroID.getInstance()?.stop()

        if (stopped != null){
            promise.resolve(stopped)
        } else {
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun registerPageTargets(promise: Promise){
        val reactCurrentActivity = currentActivity
        if (reactCurrentActivity != null) {
            NeuroID.getInstance()?.registerPageTargets(reactCurrentActivity)
        }

        promise.resolve(true)
    }

    @ReactMethod
    fun startSession(sessionID: String, promise: Promise) {
        val result = NeuroID.getInstance()?.startSession(sessionID)
        val resultData = Arguments.createMap()
        result?.let {
            resultData.putString("sessionID", it.sessionID)
            resultData.putBoolean("started", it.started)
        }
        promise.resolve(resultData)
    }

     @ReactMethod
    fun stopSession(promise: Promise) {
        val result = NeuroID.getInstance()?.stopSession()
        promise.resolve(result)
    }

    @ReactMethod
    fun pauseCollection() {
        NeuroID.getInstance()?.pauseCollection()
    }

    @ReactMethod
    fun resumeCollection() {
        NeuroID.getInstance()?.resumeCollection()
    }

    // setup page mising?
}
