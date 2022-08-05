package com.neuroidreactnativesdk

import android.app.Application
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.neuroid.tracker.NeuroID


class NeuroidReactnativeSdkPackage(
    application: Application,
    private val key: String,
    private val endpoint: String? = null
) : ReactPackage {

    init {
        val neuroID = NeuroID.Builder(application, key).build()
        NeuroID.setNeuroIdInstance(neuroID)
        endpoint?.let {
            NeuroID.getInstance()?.configureWithOptions(key, it)
        }
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(NeuroidReactnativeSdkModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
