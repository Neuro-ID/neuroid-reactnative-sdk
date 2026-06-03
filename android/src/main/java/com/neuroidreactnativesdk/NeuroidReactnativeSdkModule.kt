package com.neuroidreactnativesdk

import android.app.Application
import com.facebook.react.bridge.*
import com.neuroid.tracker.NeuroID
import com.neuroid.tracker.extensions.NIDRNBuilder

class NeuroidReactnativeSdkModuleImpl(
    private val reactApplicationCtx: ReactApplicationContext,
) {
    companion object {
        const val NAME = "NeuroidReactnativeSdk"
    }

    private val application: Application? = reactApplicationCtx.applicationContext as Application

    fun configure(key: String, options: ReadableMap?, promise: Promise) {
        try {
            if (NeuroID.getInstance() == null) {
                NIDRNBuilder(application, key, options).build()
            }

            val reactCurrentActivity = reactApplicationCtx.currentActivity
            if (reactCurrentActivity != null) {
                NeuroID.getInstance()?.registerPageTargets(reactCurrentActivity)
            }
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("ERR_CONFIGURE", e.message)
        }
    }

    fun enableLogging(enable: Boolean, promise: Promise) {
        try {
            NeuroID.getInstance()?.enableLogging(enable)
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ERR_ENABLE_LOGGING", e.message)
        }
    }

    fun excludeViewByTestID(id: String, promise: Promise) {
        try {
            NeuroID.getInstance()?.excludeViewByTestID(id)
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ERR_EXCLUDE_VIEW", e.message)
        }
    }

    fun getClientID(promise: Promise) {
        try {
            promise.resolve(NeuroID.getInstance()?.getClientID())
        } catch (e: Exception) {
            promise.reject("ERR_GET_CLIENT_ID", e.message)
        }
    }

    fun getEnvironment(promise: Promise) {
        try {
            promise.resolve(NeuroID.getInstance()?.getEnvironment())
        } catch (e: Exception) {
            promise.reject("ERR_GET_ENVIRONMENT", e.message)
        }
    }

    fun getScreenName(promise: Promise) {
        try {
            promise.resolve(NeuroID.getInstance()?.getScreenName())
        } catch (e: Exception) {
            promise.reject("ERR_GET_SCREEN_NAME", e.message)
        }
    }

    fun getSessionID(promise: Promise) {
        try {
            promise.resolve(NeuroID.getInstance()?.getSessionID())
        } catch (e: Exception) {
            promise.reject("ERR_GET_SESSION_ID", e.message)
        }
    }

    fun getUserID(promise: Promise) {
        try {
            promise.resolve(NeuroID.getInstance()?.getUserID())
        } catch (e: Exception) {
            promise.reject("ERR_GET_USER_ID", e.message)
        }
    }

    fun getRegisteredUserID(promise: Promise) {
        try {
            promise.resolve(NeuroID.getInstance()?.getRegisteredUserID())
        } catch (e: Exception) {
            promise.reject("ERR_GET_REGISTERED_USER_ID", e.message)
        }
    }

    fun isStopped(promise: Promise) {
        try {
            val instance = NeuroID.getInstance()
            promise.resolve(instance?.isStopped() ?: true)
        } catch (e: Exception) {
            promise.reject("ERR_IS_STOPPED", e.message)
        }
    }

    fun setScreenName(screen: String, promise: Promise) {
        try {
            val result = NeuroID.getInstance()?.setScreenName(screen)
            promise.resolve(result ?: false)
        } catch (e: Exception) {
            promise.reject("ERR_SET_SCREEN_NAME", e.message)
        }
    }

    fun setUserID(id: String, promise: Promise) {
        try {
            val result = NeuroID.getInstance()?.setUserID(id)
            promise.resolve(result ?: false)
        } catch (e: Exception) {
            promise.reject("ERR_SET_USER_ID", e.message)
        }
    }

    fun identify(sessionID: String, promise: Promise) {
        try {
            val result = NeuroID.getInstance()?.identify(sessionID)
            promise.resolve(result ?: false)
        } catch (e: Exception) {
            promise.reject("ERR_IDENTIFY", e.message)
        }
    }

    fun setRegisteredUserID(id: String, promise: Promise) {
        try {
            val result = NeuroID.getInstance()?.setRegisteredUserID(id)
            promise.resolve(result ?: false)
        } catch (e: Exception) {
            promise.reject("ERR_SET_REGISTERED_USER_ID", e.message)
        }
    }

    fun attemptedLogin(id: String?, promise: Promise) {
        try {
            val result = NeuroID.getInstance()?.attemptedLogin(id)
            promise.resolve(result ?: false)
        } catch (e: Exception) {
            promise.reject("ERR_ATTEMPTED_LOGIN", e.message)
        }
    }

    fun setVariable(key: String, value: String, promise: Promise) {
        try {
            NeuroID.getInstance()?.setVariable(key, value)
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ERR_SET_VARIABLE", e.message)
        }
    }

    fun start(promise: Promise) {
        try {
            NeuroID.getInstance()?.start() { started ->
                promise.resolve(started ?: false)
            }
        } catch (e: Exception) {
            promise.reject("ERR_START", e.message)
        }
    }

    fun stop(promise: Promise) {
        try {
            val stopped = NeuroID.getInstance()?.stop()
            promise.resolve(stopped ?: false)
        } catch (e: Exception) {
            promise.reject("ERR_STOP", e.message)
        }
    }

    fun registerPageTargets(promise: Promise) {
        try {
            val reactCurrentActivity = reactApplicationCtx.currentActivity
            if (reactCurrentActivity != null) {
                NeuroID.getInstance()?.registerPageTargets(reactCurrentActivity)
            }
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("ERR_REGISTER_PAGE_TARGETS", e.message)
        }
    }

    fun startSession(sessionID: String?, promise: Promise) {
        try {
            NeuroID.getInstance()?.startSession(sessionID) { result ->
                val resultData = Arguments.createMap()
                resultData.putString("sessionID", result.sessionID)
                resultData.putBoolean("started", result.started)
                promise.resolve(resultData)
            }
        } catch (e: Exception) {
            promise.reject("ERR_START_SESSION", e.message)
        }
    }

    fun stopSession(promise: Promise) {
        try {
            val result = NeuroID.getInstance()?.stopSession()
            promise.resolve(result ?: false)
        } catch (e: Exception) {
            promise.reject("ERR_STOP_SESSION", e.message)
        }
    }

    fun pauseCollection(promise: Promise) {
        try {
            NeuroID.getInstance()?.pauseCollection()
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ERR_PAUSE_COLLECTION", e.message)
        }
    }

    fun resumeCollection(promise: Promise) {
        try {
            NeuroID.getInstance()?.resumeCollection()
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ERR_RESUME_COLLECTION", e.message)
        }
    }

    fun startAppFlow(siteId: String, userId: String?, promise: Promise) {
        try {
            NeuroID.getInstance()?.startAppFlow(siteId, userId) { result ->
                val resultData = Arguments.createMap()
                resultData.putString("sessionID", result.sessionID)
                resultData.putBoolean("started", result.started)
                promise.resolve(resultData)
            }
        } catch (e: Exception) {
            promise.reject("ERR_START_APP_FLOW", e.message)
        }
    }
}
