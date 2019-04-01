package com.rn59;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.Layout;
import android.util.Log;
import android.view.ViewGroup;
import android.webkit.WebView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.annotations.ReactPropGroup;

import java.util.HashMap;
import java.util.Map;

import jp.wasabeef.richeditor.RichEditor;

public class RichTextManager extends SimpleViewManager<RichEditor> {
    private static final int COMMAND_BOLD = 0;
    private static final int COMMAND_ITALIC = 1;
    private static final int COMMAND_UNDO = 2;
    private static final int COMMAND_REDO = 3;
    private static final int COMMAND_ALIGN_LEFT = 4;
    private static final int COMMAND_ALIGN_RIGHT = 5;
    private static final int COMMAND_ALIGN_CENTER = 6;
    private static final int COMMAND_ALIGN_FULL = 12;
    private static final int COMMAND_TEXT_COLOR = 7;
    private static final int COMMAND_FONT_SIZE = 8;

    private static final int COMMAND_EDITOR_FONT_SIZE = 9;
    private static final int COMMAND_EDITOR_FONT_COLOR = 10;
    private static final int COMMAND_EDITOR_BACKGROUND_COLOR = 11;

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        Map map = new HashMap();
        map.put("bold",COMMAND_BOLD);
        map.put("italic",COMMAND_ITALIC);
        map.put("undo",COMMAND_UNDO);
        map.put("redo",COMMAND_REDO);
        map.put("alignLeft",COMMAND_ALIGN_LEFT);
        map.put("alginRight",COMMAND_ALIGN_RIGHT);
        map.put("alignCenter",COMMAND_ALIGN_CENTER);
        map.put("alignFull",COMMAND_ALIGN_FULL);
        map.put("textColor",COMMAND_TEXT_COLOR);
        map.put("fontSize",COMMAND_FONT_SIZE);

        map.put("editorSize",COMMAND_EDITOR_FONT_SIZE);
        map.put("editorColor",COMMAND_EDITOR_FONT_COLOR);
        map.put("editorBackground",COMMAND_EDITOR_BACKGROUND_COLOR);

        return map;
    }

    @Override
    public void receiveCommand(@NonNull final RichEditor view, int commandId, @Nullable ReadableArray args) {
        switch (commandId) {
            case COMMAND_BOLD:
                view.setBold();
                break;
            case COMMAND_ITALIC:
                view.setItalic();
                break;
            case COMMAND_UNDO:
                view.undo();
                break;
            case COMMAND_REDO:
                view.redo();
                break;
            case COMMAND_ALIGN_LEFT:
                view.setAlignLeft();
                break;
            case COMMAND_ALIGN_RIGHT:
                view.setAlignRight();
                break;
            case COMMAND_ALIGN_CENTER:
                view.setAlignCenter();
                break;
            case COMMAND_TEXT_COLOR:
                view.setTextColor(args.getInt(0));
                break;
            case COMMAND_FONT_SIZE:
                view.setEditorFontSize(args.getInt(0));
            case COMMAND_EDITOR_FONT_SIZE:
                view.setEditorFontSize(args.getInt(0));
            case COMMAND_EDITOR_FONT_COLOR:
                view.setEditorFontColor(args.getInt(0));
            case COMMAND_EDITOR_BACKGROUND_COLOR:
                view.setEditorBackgroundColor(args.getInt(0));
                break;
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "RichEditText";
    }

    @NonNull
    @Override
    public RichEditor createViewInstance(@NonNull ThemedReactContext context) {
        RichEditor editor = new RichEditor(context);
        editor.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        editor.setOnTextChangeListener(new RichEditor.OnTextChangeListener() {
            @Override
            public void onTextChange(String text) {
                Log.d("RichEditor", "Preview " + text);
            }
        });
        return editor;
    }
}
