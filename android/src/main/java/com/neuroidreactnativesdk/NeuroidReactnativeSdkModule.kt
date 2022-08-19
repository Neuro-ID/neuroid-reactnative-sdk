package com.neuroidreactnativesdk

import android.app.Application
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.neuroid.tracker.NeuroID

class NeuroidReactnativeSdkModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var reactApplicationCtx: ReactApplicationContext = reactContext
    private var application: Application? = reactContext.applicationContext as Application

    override fun getName(): String {
        return "NeuroidReactnativeSdk"
    }

    @ReactMethod
    fun configure(key: String) {
        val activityCaller = reactApplicationCtx.currentActivity
        val neuroID = NeuroID.Builder(application, key).build()
        NeuroID.setNeuroIdInstance(neuroID)
    }

    @ReactMethod
    fun configureWithOptions(key: String, endpoint: String) {
        val activityCaller = reactApplicationCtx.currentActivity
        val neuroID = NeuroID.Builder(application, key).build()
        NeuroID.setNeuroIdInstance(neuroID)
        NeuroID.getInstance()?.configureWithOptions(key, endpoint)
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
    fun formSubmit() {
        NeuroID.getInstance()?.formSubmit()
    }

    @ReactMethod
    fun formSubmitSuccess() {
        NeuroID.getInstance()?.formSubmitSuccess()
    }

    @ReactMethod
    fun formSubmitFailure() {
        NeuroID.getInstance()?.formSubmitFailure()
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
        val environment = if(isProd) {
            "PRODUCTION"
        } else {
            "TEST"
        }

        NeuroID.getInstance()?.setEnvironment(environment)
    }

    @ReactMethod
    fun setSiteId(siteId: String) {
        NeuroID.getInstance()?.setSiteId(siteId)
    }

}
