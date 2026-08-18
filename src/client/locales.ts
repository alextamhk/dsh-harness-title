/**
 * harness-title locale dictionaries (zh/en).
 * @module harness-title/client/locales
 */

/** Dictionary namespace this package registers. */
export const NS = 'harness-title'

/** Chinese copy. */
export const zh = {
  // 一级设置页（settings.section 席位）。
  'settings.title': 'Harness 標題',
  'settings.description': '在畫面上顯示大字標題，用於識別目前正在使用哪一台機器的 Harness。',
  'settings.enabled': '啟用標題',
  'settings.enabledHint': '關閉後標題隱藏；可隨時在此重新啟用。',
  'settings.text': '標題文字',
  'settings.textHint': '留空則不顯示。預設為本機 hostname（未覆寫時）。',
  'settings.color': '文字顏色',
  'settings.colorHint': '從十款預設色中選擇，或點「自訂」輸入任意 CSS 色值（如 rgb(255 255 255)）。',
  'settings.backgroundColor': '背景色',
  'settings.backgroundColorHint': '從十款預設色中選擇，或點「自訂」輸入任意 CSS 色值或主題變數；transparent 為無背景。',
  'settings.color.custom': '自訂…',
  'settings.color.preset.themeLabel': '主題文字色',
  'settings.color.preset.themeSurface': '主題底色',
  'settings.color.preset.transparent': '透明',
  'settings.color.preset.nearWhite': '近白',
  'settings.color.preset.nearBlack': '近黑',
  'settings.color.preset.red': '紅',
  'settings.color.preset.yellow': '黃',
  'settings.color.preset.lightGreen': '淺綠',
  'settings.color.preset.lightBlue': '淺藍',
  'settings.color.preset.pink': '粉紅',
  'settings.fontSize': '字體大小（px）',
  'settings.fontSizeHint': '範圍 10–72。',
  'settings.position': '顯示位置',
  'settings.positionHint': '預設在 New Session 按鈕上方；側欄收起成 rail 時該位置會自動隱藏。',
  'settings.position.aboveNewSession': 'New Session 按鈕上方',
  'settings.position.topRight': '右上角',
  'settings.position.topLeft': '左上角',
  'settings.position.topCenter': '頂部居中',
  'settings.inherit': '繼承',
  'settings.on': '開',
  'settings.off': '關',
  'settings.overridden': '已覆寫',
  'settings.reset': '恢復預設',
  'settings.notExposed': '目前 DSH 版本未向設定頁暴露本插件的設定命名空間，表單不可用。可直接編輯 ~/.dsh/settings.yaml 的 harness-title: 區段，或為 dsh-host-apiproxy 的 WEB_SETTINGS_NAMESPACES 白名單補充本命名空間後重啟。',
  'settings.readOnly': '目前部署的設定為唯讀。',
  'settings.expand': '展開設定',
  'settings.collapse': '收起設定',
  'settings.save': '儲存',
  'settings.saving': '儲存中…',
  'settings.discard': '放棄',
  'settings.unsaved': '未儲存',
  'settings.saveFailed': '部署未接受這些值，已保留供你修改。',
  'settings.invalidNumber': '請輸入數字，留空則使用預設值。',
  'settings.invalidColor': '請輸入有效的 CSS 色值（如 #f0f0f0），留空則使用預設值。',
} as const

/** English copy. */
export const en = {
  // First-level settings section (the `settings.section` seat).
  'settings.title': 'Harness Title',
  'settings.description': 'Shows a large title on the GUI so you can tell which machine\u2019s Harness instance you are using.',
  'settings.enabled': 'Enable the title',
  'settings.enabledHint': 'When off, the title hides; re-enable it here.',
  'settings.text': 'Title text',
  'settings.textHint': 'Leave empty to hide. Defaults to this machine\u2019s hostname (until overridden).',
  'settings.color': 'Text color',
  'settings.colorHint': 'Pick one of ten preset colors, or choose Custom to enter any CSS color value (e.g. rgb(255 255 255)).',
  'settings.backgroundColor': 'Background color',
  'settings.backgroundColorHint': 'Pick one of ten preset colors, or choose Custom to enter any CSS color value or theme token; transparent disables the background.',
  'settings.color.custom': 'Custom\u2026',
  'settings.color.preset.themeLabel': 'Theme text',
  'settings.color.preset.themeSurface': 'Theme surface',
  'settings.color.preset.transparent': 'Transparent',
  'settings.color.preset.nearWhite': 'Near white',
  'settings.color.preset.nearBlack': 'Near black',
  'settings.color.preset.red': 'Red',
  'settings.color.preset.yellow': 'Yellow',
  'settings.color.preset.lightGreen': 'Light green',
  'settings.color.preset.lightBlue': 'Light blue',
  'settings.color.preset.pink': 'Pink',
  'settings.fontSize': 'Font size (px)',
  'settings.fontSizeHint': 'Range 10\u201372.',
  'settings.position': 'Position',
  'settings.positionHint': 'Above the New Session button by default; that position auto-hides while the sidebar is collapsed to the rail.',
  'settings.position.aboveNewSession': 'Above the New Session button',
  'settings.position.topRight': 'Top right',
  'settings.position.topLeft': 'Top left',
  'settings.position.topCenter': 'Top center',
  'settings.inherit': 'Inherit',
  'settings.on': 'On',
  'settings.off': 'Off',
  'settings.overridden': 'Overridden',
  'settings.reset': 'Reset to default',
  'settings.notExposed': 'This DSH version does not expose this plugin\u2019s settings namespace to the configuration page, so the form is unavailable. Edit the harness-title: section of ~/.dsh/settings.yaml directly, or add the namespace to dsh-host-apiproxy\u2019s WEB_SETTINGS_NAMESPACES allowlist and restart.',
  'settings.readOnly': 'This deployment stores settings read-only.',
  'settings.expand': 'Show settings',
  'settings.collapse': 'Hide settings',
  'settings.save': 'Save',
  'settings.saving': 'Saving\u2026',
  'settings.discard': 'Discard',
  'settings.unsaved': 'Unsaved',
  'settings.saveFailed': 'The deployment did not accept these values; they were left for you to correct.',
  'settings.invalidNumber': 'Enter a number, or leave blank to use the default.',
  'settings.invalidColor': 'Enter a valid CSS color (e.g. #f0f0f0), or leave blank to use the default.',
} as const

/** Key union for this namespace. */
export type TitleKey = keyof typeof zh

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** harness-title UI copy. */
    'harness-title': TitleKey
  }
}
