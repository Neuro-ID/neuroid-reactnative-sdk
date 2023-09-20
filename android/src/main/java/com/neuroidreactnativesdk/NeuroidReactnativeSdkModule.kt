package com.neuroidreactnativesdk

import android.app.Application
import com.facebook.react.bridge.*
import com.neuroid.tracker.NeuroID
import com.neuroid.tracker.extensions.setVerifyIntegrationHealth

class NeuroidReactnativeSdkModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        @JvmStatic
        fun configure(application: Application, key: String) {
            configure(application, key, null)
        }

        @JvmStatic
        fun configure(application: Application, key: String, endpoint: String?) {
            if (NeuroID.getInstance() == null) {
                val neuroID = NeuroID.Builder(application, key).build()
                NeuroID.setNeuroIdInstance(neuroID)
            }
            NeuroID.getInstance()?.configureWithOptions(key, endpoint)
        }
    }

    private var reactApplicationCtx: ReactApplicationContext = reactContext
    private var application: Application? = reactContext.applicationContext as Application

    override fun getName(): String {
        return "NeuroidReactnativeSdk"
    }

    @ReactMethod
    fun configure(key: String) {
        if (NeuroID.getInstance() == null) {
            val neuroID = NeuroID.Builder(application, key).build()
            NeuroID.setNeuroIdInstance(neuroID)
        }
        NeuroID.getInstance()?.configureWithOptions(key, null)

        val reactCurrentActivity = currentActivity
        if (reactCurrentActivity != null) {
            NeuroID.getInstance()?.setForceStart(reactCurrentActivity)
        }
    }
    
    @ReactMethod
    fun start() {
        NeuroID.getInstance()?.start()
    }

    @ReactMethod
    fun stop() {
        NeuroID.getInstance()?.stop()
    }


    @ReactMethod
    fun captureEvent(event: String, tags: String) {
        NeuroID.getInstance()?.captureEvent(event, tags)
    }

    @ReactMethod
    fun setUserID(id: String) {
        NeuroID.getInstance()?.setUserID(id)
    }

    @ReactMethod
    fun setScreenName(screen: String) {
        NeuroID.getInstance()?.setScreenName(screen)
    }

    @ReactMethod
    fun getSessionID(promise: Promise) {
        promise.resolve(NeuroID.getInstance()?.getSessionId())
    }

    @ReactMethod
    fun excludeViewByTestID(id: String) {
        NeuroID.getInstance()?.excludeViewByResourceID(id)
    }

    @ReactMethod
    fun setEnvironmentProduction(isProd: Boolean) {
        val environment = if (isProd) {
            "LIVE"
        } else {
            "TEST"
        }

        NeuroID.getInstance()?.setEnvironment(environment)
    }

    @ReactMethod
    fun setVerifyIntegrationHealth(enable: Boolean) {
        NeuroID.getInstance()?.setVerifyIntegrationHealth(enable)       
    }

    @ReactMethod
    fun setSiteId(siteId: String) {
        NeuroID.getInstance()?.setSiteId(siteId)
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
    fun registerPageTargets(promise: Promise){
        val reactCurrentActivity = currentActivity
        if (reactCurrentActivity != null) {
            NeuroID.getInstance()?.setForceStart(reactCurrentActivity)
        }

          promise.resolve(true)
    }
}
