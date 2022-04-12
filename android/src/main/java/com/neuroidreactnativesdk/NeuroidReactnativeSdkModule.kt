package com.neuroidreactnativesdk

import android.app.Application
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.neuroid.tracker.NeuroID

class NeuroidReactnativeSdkModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

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
        if (activityCaller != null) {
            NeuroID.getInstance().registerAllViewsForCallerActivity(activityCaller)
        }
    }

    @ReactMethod
    fun start() {
        NeuroID.getInstance().start()
    }

    @ReactMethod
    fun formSubmit() {
        NeuroID.getInstance().formSubmit()
    }

    @ReactMethod
    fun formSuccess() {
        NeuroID.getInstance().formSubmitSuccess()
    }

    @ReactMethod
    fun formFailure() {
        NeuroID.getInstance().formSubmitFailure()
    }

    @ReactMethod
    fun captureEvent(event: String, tags: String) {
        NeuroID.getInstance().captureEvent(event, tags)
    }

    @ReactMethod
    fun setUserID(id: String) {
        NeuroID.getInstance().setUserID(id)
    }

    @ReactMethod
    fun getSessionID(promise: Promise) {
        promise.resolve(NeuroID.getInstance().getSessionId())
    }

    @ReactMethod
    fun excludeViewByTestID(id: String?) {
        //TODO (Diego Maldonado): Pending definition on Android
    }

}
