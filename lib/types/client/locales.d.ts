/**
 * harness-title locale dictionaries (zh/en).
 * @module harness-title/client/locales
 */
/** Dictionary namespace this package registers. */
export declare const NS = "harness-title";
/** Chinese copy. */
export declare const zh: {
    readonly 'settings.title': "Harness 標題";
    readonly 'settings.description': "在畫面上顯示大字標題，用於識別目前正在使用哪一台機器的 Harness。";
    readonly 'settings.enabled': "啟用標題";
    readonly 'settings.enabledHint': "關閉後標題隱藏；可隨時在此重新啟用。";
    readonly 'settings.text': "標題文字";
    readonly 'settings.textHint': "留空則不顯示。預設為本機 hostname（未覆寫時）。";
    readonly 'settings.color': "文字顏色";
    readonly 'settings.colorHint': "從十款預設色中選擇，或點「自訂」輸入任意 CSS 色值（如 rgb(255 255 255)）。";
    readonly 'settings.backgroundColor': "背景色";
    readonly 'settings.backgroundColorHint': "從十款預設色中選擇，或點「自訂」輸入任意 CSS 色值或主題變數；transparent 為無背景。";
    readonly 'settings.color.custom': "自訂…";
    readonly 'settings.color.preset.themeLabel': "主題文字色";
    readonly 'settings.color.preset.themeSurface': "主題底色";
    readonly 'settings.color.preset.transparent': "透明";
    readonly 'settings.color.preset.nearWhite': "近白";
    readonly 'settings.color.preset.nearBlack': "近黑";
    readonly 'settings.color.preset.red': "紅";
    readonly 'settings.color.preset.yellow': "黃";
    readonly 'settings.color.preset.lightGreen': "淺綠";
    readonly 'settings.color.preset.lightBlue': "淺藍";
    readonly 'settings.color.preset.pink': "粉紅";
    readonly 'settings.fontSize': "字體大小（px）";
    readonly 'settings.fontSizeHint': "範圍 10–72。";
    readonly 'settings.position': "顯示位置";
    readonly 'settings.positionHint': "預設在 New Session 按鈕上方；側欄收起成 rail 時該位置會自動隱藏。";
    readonly 'settings.position.aboveNewSession': "New Session 按鈕上方";
    readonly 'settings.position.topRight': "右上角";
    readonly 'settings.position.topLeft': "左上角";
    readonly 'settings.position.topCenter': "頂部居中";
    readonly 'settings.workspaceEnabled': "啟用工作區名稱";
    readonly 'settings.workspaceEnabledHint': "關閉後不顯示工作區名稱；獨立於標題總開關。";
    readonly 'settings.workspaceMode': "工作區名稱來源";
    readonly 'settings.workspaceModeHint': "自動：跟隨目前 workspace 的名稱，切換 session／workspace 時自動更新；手動：使用下方輸入的文字。";
    readonly 'settings.workspaceMode.auto': "自動（目前 workspace）";
    readonly 'settings.workspaceMode.manual': "手動輸入";
    readonly 'settings.workspaceText': "工作區名稱（手動）";
    readonly 'settings.workspaceTextHint': "顯示於方括號內，例如 [harness-title]；僅在「手動輸入」來源時使用，留空則不顯示。";
    readonly 'settings.workspaceFontSize': "工作區字體大小（px）";
    readonly 'settings.workspaceFontSizeHint': "範圍 10–72；獨立於標題字體大小。";
    readonly 'settings.workspacePosition': "工作區名稱位置";
    readonly 'settings.workspacePositionHint': "相對於標題文字的位置：左側、右側或下方。";
    readonly 'settings.workspacePosition.left': "標題左側";
    readonly 'settings.workspacePosition.right': "標題右側";
    readonly 'settings.workspacePosition.below': "標題下方";
    readonly 'settings.inherit': "繼承";
    readonly 'settings.on': "開";
    readonly 'settings.off': "關";
    readonly 'settings.overridden': "已覆寫";
    readonly 'settings.reset': "恢復預設";
    readonly 'settings.notExposed': "目前 DSH 版本未向設定頁暴露本插件的設定命名空間，表單不可用。可直接編輯 ~/.dsh/settings.yaml 的 harness-title: 區段，或為 dsh-host-apiproxy 的 WEB_SETTINGS_NAMESPACES 白名單補充本命名空間後重啟。";
    readonly 'settings.readOnly': "目前部署的設定為唯讀。";
    readonly 'settings.expand': "展開設定";
    readonly 'settings.collapse': "收起設定";
    readonly 'settings.save': "儲存";
    readonly 'settings.saving': "儲存中…";
    readonly 'settings.discard': "放棄";
    readonly 'settings.unsaved': "未儲存";
    readonly 'settings.saveFailed': "部署未接受這些值，已保留供你修改。";
    readonly 'settings.invalidNumber': "請輸入數字，留空則使用預設值。";
    readonly 'settings.invalidColor': "請輸入有效的 CSS 色值（如 #f0f0f0），留空則使用預設值。";
};
/** English copy. */
export declare const en: {
    readonly 'settings.title': "Harness Title";
    readonly 'settings.description': "Shows a large title on the GUI so you can tell which machine’s Harness instance you are using.";
    readonly 'settings.enabled': "Enable the title";
    readonly 'settings.enabledHint': "When off, the title hides; re-enable it here.";
    readonly 'settings.text': "Title text";
    readonly 'settings.textHint': "Leave empty to hide. Defaults to this machine’s hostname (until overridden).";
    readonly 'settings.color': "Text color";
    readonly 'settings.colorHint': "Pick one of ten preset colors, or choose Custom to enter any CSS color value (e.g. rgb(255 255 255)).";
    readonly 'settings.backgroundColor': "Background color";
    readonly 'settings.backgroundColorHint': "Pick one of ten preset colors, or choose Custom to enter any CSS color value or theme token; transparent disables the background.";
    readonly 'settings.color.custom': "Custom…";
    readonly 'settings.color.preset.themeLabel': "Theme text";
    readonly 'settings.color.preset.themeSurface': "Theme surface";
    readonly 'settings.color.preset.transparent': "Transparent";
    readonly 'settings.color.preset.nearWhite': "Near white";
    readonly 'settings.color.preset.nearBlack': "Near black";
    readonly 'settings.color.preset.red': "Red";
    readonly 'settings.color.preset.yellow': "Yellow";
    readonly 'settings.color.preset.lightGreen': "Light green";
    readonly 'settings.color.preset.lightBlue': "Light blue";
    readonly 'settings.color.preset.pink': "Pink";
    readonly 'settings.fontSize': "Font size (px)";
    readonly 'settings.fontSizeHint': "Range 10–72.";
    readonly 'settings.position': "Position";
    readonly 'settings.positionHint': "Above the New Session button by default; that position auto-hides while the sidebar is collapsed to the rail.";
    readonly 'settings.position.aboveNewSession': "Above the New Session button";
    readonly 'settings.position.topRight': "Top right";
    readonly 'settings.position.topLeft': "Top left";
    readonly 'settings.position.topCenter': "Top center";
    readonly 'settings.workspaceEnabled': "Enable the workspace name";
    readonly 'settings.workspaceEnabledHint': "When off, the workspace name hides; independent of the title switch.";
    readonly 'settings.workspaceMode': "Workspace name source";
    readonly 'settings.workspaceModeHint': "Auto: follow the current workspace’s name, updating live as you switch sessions or workspaces; Manual: use the text below.";
    readonly 'settings.workspaceMode.auto': "Auto (current workspace)";
    readonly 'settings.workspaceMode.manual': "Manual text";
    readonly 'settings.workspaceText': "Workspace name (manual)";
    readonly 'settings.workspaceTextHint': "Shown in brackets, e.g. [harness-title]; used only in Manual mode; leave empty to hide.";
    readonly 'settings.workspaceFontSize': "Workspace font size (px)";
    readonly 'settings.workspaceFontSizeHint': "Range 10–72; independent of the title font size.";
    readonly 'settings.workspacePosition': "Workspace position";
    readonly 'settings.workspacePositionHint': "Where the workspace name sits relative to the title: left, right, or below.";
    readonly 'settings.workspacePosition.left': "Left of the title";
    readonly 'settings.workspacePosition.right': "Right of the title";
    readonly 'settings.workspacePosition.below': "Below the title";
    readonly 'settings.inherit': "Inherit";
    readonly 'settings.on': "On";
    readonly 'settings.off': "Off";
    readonly 'settings.overridden': "Overridden";
    readonly 'settings.reset': "Reset to default";
    readonly 'settings.notExposed': "This DSH version does not expose this plugin’s settings namespace to the configuration page, so the form is unavailable. Edit the harness-title: section of ~/.dsh/settings.yaml directly, or add the namespace to dsh-host-apiproxy’s WEB_SETTINGS_NAMESPACES allowlist and restart.";
    readonly 'settings.readOnly': "This deployment stores settings read-only.";
    readonly 'settings.expand': "Show settings";
    readonly 'settings.collapse': "Hide settings";
    readonly 'settings.save': "Save";
    readonly 'settings.saving': "Saving…";
    readonly 'settings.discard': "Discard";
    readonly 'settings.unsaved': "Unsaved";
    readonly 'settings.saveFailed': "The deployment did not accept these values; they were left for you to correct.";
    readonly 'settings.invalidNumber': "Enter a number, or leave blank to use the default.";
    readonly 'settings.invalidColor': "Enter a valid CSS color (e.g. #f0f0f0), or leave blank to use the default.";
};
/** Key union for this namespace. */
export type TitleKey = keyof typeof zh;
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        /** harness-title UI copy. */
        'harness-title': TitleKey;
    }
}
//# sourceMappingURL=locales.d.ts.map