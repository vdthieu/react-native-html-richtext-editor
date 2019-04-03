package com.rn59;

import android.content.Context;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;


import android.util.AttributeSet;
import android.util.Log;

import java.lang.reflect.Array;
import java.util.List;

import jp.wasabeef.richeditor.RichEditor;

public class RichTextView extends RichEditor{
    public RichTextView(Context context, AttributeSet attributes){
        super(context,attributes);
    }

    public RichTextView(ReactContext context){
        super(context,null);

        this.setOnTextChangeListener(new OnTextChangeListener() {
            @Override
            public void onTextChange(String content) {
                WritableMap event = Arguments.createMap();
                event.putString("html",content);
                ReactContext reactContext = (ReactContext)getContext();
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        getId(),
                        "onChangeText",
                        event
                );
            }
        });

        this.setOnDecorationChangeListener(new OnDecorationStateListener() {
            @Override
            public void onStateChangeListener(String text, List<Type> types) {
                WritableMap event = Arguments.createMap();
                WritableArray arrayTypes = Arguments.createArray();
                for(Type type:types){
                    arrayTypes.pushString(type.toString());
                }
                event.putArray("types",arrayTypes);
                ReactContext reactContext = (ReactContext)getContext();
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        getId(),
                        "onTypeChange",
                        event
                );
            }
        });
    }

    @Override
    public String getHtml(){
        String html = super.getHtml();
        WritableMap event = Arguments.createMap();
        event.putString("html",html);
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "onReturnHtml",
                event
        );
        return html;
    }
}