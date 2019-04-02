package com.rn59;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.ViewGroup;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.util.HashMap;
import java.util.Map;

import jp.wasabeef.richeditor.RichEditor;

public class RichTextManager extends SimpleViewManager<RichEditor> {
    private static final int COMMAND_BOLD = 0;
    private static final int COMMAND_ITALIC = 1;
    private static final int COMMAND_UNDERLINE = 13;
    private static final int COMMAND_STRIKE = 12;

    private static final int COMMAND_UNDO = 2;
    private static final int COMMAND_REDO = 3;

    private static final int COMMAND_ALIGN_LEFT = 4;
    private static final int COMMAND_ALIGN_RIGHT = 5;
    private static final int COMMAND_ALIGN_CENTER = 6;

    private static final int COMMAND_INDENT = 15;
    private static final int COMMAND_OUTDENT = 16;

    private static final int COMMAND_TEXT_COLOR = 7;
    private static final int COMMAND_TEXT_SIZE = 8;
    private static final int COMMAND_TEXT_BACKGROUND = 14;

    private static final int COMMAND_EDITOR_FONT_SIZE = 9;
    private static final int COMMAND_EDITOR_FONT_COLOR = 10;
    private static final int COMMAND_EDITOR_BACKGROUND_COLOR = 11;

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        Map map = new HashMap();
        map.put("bold",COMMAND_BOLD);
        map.put("italic",COMMAND_ITALIC);
        map.put("underline",COMMAND_UNDERLINE);
        map.put("strike",COMMAND_STRIKE);

        map.put("undo",COMMAND_UNDO);
        map.put("redo",COMMAND_REDO);

        map.put("alignLeft",COMMAND_ALIGN_LEFT);
        map.put("alignRight",COMMAND_ALIGN_RIGHT);
        map.put("alignCenter",COMMAND_ALIGN_CENTER);

        map.put("indent",COMMAND_INDENT);
        map.put("outdent",COMMAND_OUTDENT);

        map.put("textColor",COMMAND_TEXT_COLOR);
        map.put("textSize", COMMAND_TEXT_SIZE);
        map.put("textBackground", COMMAND_TEXT_BACKGROUND);

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
            case COMMAND_UNDERLINE:
                view.setUnderline();
                break;
            case COMMAND_STRIKE:
                view.setStrikeThrough();
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

            case COMMAND_INDENT:
                view.setIndent();
                break;
            case COMMAND_OUTDENT:
                view.setOutdent();
                break;

            case COMMAND_TEXT_COLOR:
                view.setTextColor(args.getInt(0));
                break;
            case COMMAND_TEXT_SIZE:
                view.setEditorFontSize(args.getInt(0));
                break;
            case COMMAND_TEXT_BACKGROUND:
                view.setTextBackgroundColor(args.getInt(0));
                break;

            case COMMAND_EDITOR_FONT_SIZE:
                view.setEditorFontSize(args.getInt(0));
                break;
            case COMMAND_EDITOR_FONT_COLOR:
                view.setEditorFontColor(args.getInt(0));
                break;
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
