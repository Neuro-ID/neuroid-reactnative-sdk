package com.example.neuroidreactnativesdk;

import android.app.Activity;
import android.app.Application;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.neuroid.tracker.NeuroID;

public class NeuroIDModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactApplicationCtx;
    private final Application application;

    public NeuroIDModule(ReactApplicationContext context) {
        super(context);
        application = (Application) context.getApplicationContext();
        reactApplicationCtx = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "NeuroidReactnativeSdk";
    }

    @ReactMethod
    public void configure(String key) {
        Activity activityCaller = reactApplicationCtx.getCurrentActivity();
        NeuroID neuroID = new NeuroID.Builder(application, key).build();
        NeuroID.setNeuroIdInstance(neuroID);
        if (activityCaller != null) {
            NeuroID.getInstance().registerAllViewsForCallerActivity(activityCaller);
        }
    }

    @ReactMethod
    public void start() {
        NeuroID.getInstance().start();
    }

    @ReactMethod
    public void formSubmit() {
        NeuroID.getInstance().formSubmit();
    }

    @ReactMethod
    public void formSuccess() {
        NeuroID.getInstance().formSubmitSuccess();
    }

    @ReactMethod
    public void formFailure() {
        NeuroID.getInstance().formSubmitFailure();
    }

    @ReactMethod
    public void captureEvent(String event, String tags) {
        NeuroID.getInstance().captureEvent(event, tags);
    }

    @ReactMethod
    public void setUserID(String id) {
        NeuroID.getInstance().setUserID(id);
    }

    @ReactMethod
    public void getSessionID(Promise promise) {
        promise.resolve(NeuroID.getInstance().getSessionId());
    }

    @ReactMethod
    public void excludeViewByTestID(String id) {
        //TODO (Diego Maldonado): Pending definition on Android
    }
}
