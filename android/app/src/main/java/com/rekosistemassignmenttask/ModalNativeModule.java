package com.rekosistemassignmenttask;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import androidx.appcompat.app.AlertDialog;
import android.content.DialogInterface;

public class ModalNativeModule extends ReactContextBaseJavaModule {

    public ModalNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ModalNativeModule";
    }

    @ReactMethod
    public void show(String title, String message) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getCurrentActivity());
        builder.setTitle(title);
        builder.setMessage(message);
        builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                dialog.dismiss();
            }
        });
        AlertDialog dialog = builder.create();
        dialog.show();
    }
}
