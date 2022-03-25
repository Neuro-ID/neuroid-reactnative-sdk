package com.example.neuroidreactnativesdk;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.neuroid.tracker.NeuroID;

public class NeuroIDModule extends ReactContextBaseJavaModule {
    public NeuroIDModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "NeuroIDModule";
    }

    @ReactMethod
    public void startNID() {
        NeuroID.Companion.getInstance().start();
    }

    @ReactMethod
    public void formSubmit() {
        NeuroID.Companion.getInstance().formSubmit();
    }

    @ReactMethod
    public void formSuccess() {
        NeuroID.Companion.getInstance().formSubmitSuccess();
    }

    @ReactMethod
    public void formFailure() {
        NeuroID.Companion.getInstance().formSubmitFailure();
    }

    @ReactMethod
    public void captureEvent(String event, String tags) {
        NeuroID.Companion.getInstance().captureEvent(event, tags);
    }

    @ReactMethod
    public void setUserID(String id) {
        NeuroID.Companion.getInstance().setUserID(id);
    }
}
