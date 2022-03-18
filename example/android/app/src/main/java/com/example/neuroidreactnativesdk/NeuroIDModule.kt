package com.example.neuroidreactnativesdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.neuroid.tracker.NeuroID

class NeuroIDModule(context: ReactApplicationContext): ReactContextBaseJavaModule(context) {
    override fun getName(): String {
        return "NeuroIDModule"
    }

    @ReactMethod
    fun startNID() {
        NeuroID.getInstance().start()
    }

    @ReactMethod
    fun formSubmit() {
        NeuroID.getInstance().formSubmit()
    }

    @ReactMethod
    fun formSuccess() {
        NeuroID.Companion.getInstance().formSubmitSuccess()
    }

    @ReactMethod
    fun formFailure() {
        NeuroID.Companion.getInstance().formSubmitFailure()
    }

    @ReactMethod
    fun captureEvent(event: String, tags: String) {
        NeuroID.Companion.getInstance().captureEvent(event, tags)
    }

    @ReactMethod
    fun setUserID(id: String) {
        NeuroID.getInstance().setUserID(id)
    }
}