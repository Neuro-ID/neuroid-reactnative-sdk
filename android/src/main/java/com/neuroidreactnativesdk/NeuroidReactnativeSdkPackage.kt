package com.neuroidreactnativesdk

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NeuroidReactnativeSdkPackage : TurboReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
        when (name) {
            NeuroidReactnativeSdkModuleImpl.NAME -> NeuroidReactnativeSdkModule(reactContext)
            else -> null
        }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider = ReactModuleInfoProvider {
        val isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        mapOf(
            NeuroidReactnativeSdkModuleImpl.NAME to
                ReactModuleInfo(
                    NeuroidReactnativeSdkModuleImpl.NAME,
                    NeuroidReactnativeSdkModule::class.java.name,
                    false,
                    false,
                    false,
                    false,
                    isTurboModule,
                )
        )
    }
}
