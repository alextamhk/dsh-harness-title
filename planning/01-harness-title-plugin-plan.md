# Harness Title 插件 — 開發計劃

> 在 DeepSeek Harness（DSH）Web GUI 顯示自訂 Name Title，用於識別目前正在使用哪一台機器／哪一個 Harness 實例。
> 狀態：**實作完成（M1–M6 已交付，等待重啟驗證）** ｜ 版本：v2 ｜ 日期：依工作區檔案時間

---

## 1. 目標與背景

### 1.1 問題

多台電腦都安裝了 DeepSeek Harness，skin 與 layout 幾乎一樣，難以分辨「現在開著的是哪一台」。

### 1.2 目標

開發一個 DSH Web 插件（純 Client 為主，含最小 Host 設定註冊），在 GUI 的固定位置顯示一個**大字、可設色、可設背景色**的自訂 Title：

- 預設顯示在 **New Session 按鈕正上方**（sidebar 頂部字標區域）
- 可切換位置（右上角 / 左上角 / 頂中）
- Title 文字、文字顏色、背景色、字體大小均可透過 **GUI 設定頁**調整
- 設定**持久化到 `~/.dsh/settings.yaml`**（每台機器一份 → 各機器各自設定自己的 Title）

### 1.3 已確認的設計決策（用戶拍板）

| 項目 | 決策 |
|---|---|
| 顯示位置 | 可設定，**預設在 New Session 按鈕上方**（另有右上角／左上角／頂中） |
| 設定方式 | **GUI 設定頁**（Settings 側欄新增一頁）＋ 持久化到 settings.yaml |
| 部署方式 | **先獨立開發**（本工作區），穩定後再合入 dsh-web-ui 全家桶 repo |

---

## 2. 需求摘要

### 2.1 功能需求（Must）

- [ ] GUI 右上側固定顯示 Title 字樣（預設：sidebar 頂部、New Session 按鈕正上方）
- [ ] Title 字體大（預設約 22px，可設 10–72px）
- [ ] 文字顏色可設定
- [ ] 背景色可設定
- [ ] 可在 GUI 設定頁修改（Settings → 新增「Harness Title」設定頁）
- [ ] 設定持久化，重啟後保留（存 `~/.dsh/settings.yaml` 的 `harness-title:` namespace）
- [ ] 多台機器各自設定（settings.yaml 為每 profile／每機器一份）

### 2.2 非功能需求（Should）

- [ ] 不阻擋任何 UI 操作（pointer-events: none；滑鼠穿透）
- [ ] 側欄收起成 56px rail 時自動隱藏 Title（避免擠壓）
- [ ] 跟隨主題（dark/light）至少不突兀；用戶自訂色優先
- [ ] 開箱可用：設定留空時可選顯示機器 hostname（Host 端注入 base value）
- [ ] 中英雙語（zh/en，沿用 dsh-web-ui 家族慣例）

---

## 3. 研究發現（DSH 插件架構實況，已於本機驗證）

### 3.1 環境

- DSH CLI：`@deepseek-ai/dsh` **v0.1.0-rc.7**（`dsh --version` → pnpm 11.22.0）
- 使用中 profile：`~/.dsh/profiles/web`（是一個 pnpm workspace）
  - `package.json`：`dependencies: { "@linxin666/dsh-web-ui-all": "^0.2.0" }`；`dsh.profile.bundles: ["@deepseek-ai/dsh-base", "@deepseek-ai/dsh-web-app", "@linxin666/dsh-web-ui-all"]`
  - `cordis.patch.yml`：使用者 patch 層（skin-harbor 自動管理區段 + 使用者自訂區段）
  - `node_modules`：`@linxin666/*` 全家桶（dsh-ssh、dsh-task-board、dsh-pet、dsh-liangshen、dsh-web-ui-all…）+ `dsh-better-sidebar`
- 目前執行的 GUI：`http://127.0.0.1:3080`（web profile）
- 全家桶 repo：`https://github.com/zhu1090093659/dsh-web-ui.git`（本計劃第 8 節合入對象）

### 3.2 Layout 與 Slot 系統（關鍵）

- Shell 三欄 grid：`grid-template-columns: <sidebar>px minmax(0,1fr) <details>px`
  - **sidebar 在左**（264–420px、可收成 56px rail）、**conversation 在中央**、**details 在右**（0–520px）
  - **New Session 按鈕在左側 sidebar 頂部**：上方是 60px 高的 logoRow（字標 + 收起按鈕），下方才是 New Session 按鈕
- Slot 註冊機制：`@deepseek-ai/dsh-client-ui-slots`（`ctx.slots.register` / `ctx.slots.inject`）；只能註冊進**已被宣告**的 slot
- Layout 插件（`@deepseek-ai/dsh-client-ui-layout`）在 `root` slot 宣告的 children：
  - `sidebar`（single, root）
  - `conversation`（single, session-maybe）
  - `details`（single, session）
  - **`shell.overlay`（list, root）** ← 本插件的主要掛載點
    - 渲染在整個 frame 之上：`position:absolute; inset:0; z-index:20; pointer-events:none`（子元素 `pointer-events:auto`）
- 其他可用 slot（參考）：`settings.section`（設定頁，每功能一頁）、`conversation.session.header`、`sidebar.workspaces`、`sidebar.settings` 等
- sidebar 收起狀態可經由 CSS 祖先選擇器得知：frame 有 `data-sidebar-collapsed` attribute

### 3.3 為何選 `shell.overlay`

- sidebar 是 **single slot**，已被官方 sidebar 插件佔用 → 無法直接插進 sidebar 內部
- `shell.overlay` 是 root scope 的 **list slot**，可多個插件並存；絕對定位覆蓋整個 frame，適合做「固定角落的 badge」
- 元件內用 `position: fixed` ＋ 設定座標即可覆蓋到 sidebar 頂部（`left: 12px; top: 8px`）或視窗右上角（`right: 12px; top: 8px`）
- 搭配 `pointer-events: none` 保證不擋 New Session 按鈕

### 3.4 設定（Settings）機制

- Client 端：`ctx.settingsScope.bind<{namespace}>(spec)` 取得持久化 scope（`@deepseek-ai/dsh-client-ui-settings` 提供 `ctx.settingsScope`）
- Host 端：`installSettingsSection(ctx, settingsNamespace('harness-title'), schema, entry, hooks)`（`@deepseek-ai/dsh-settings`）
  - namespace 必須由 Host 註冊，client 的 scope 才會 `ready`（「exposed」）
  - 解析層級：schema 預設值 → 插件 composition base → **user 文件（settings.yaml）**；寫入只改 user 層
- 設定頁 UI：註冊進 `settings.section` slot（`{id, order, label, locale, inject}`），渲染成 Settings 側欄的一級頁面
- 家族慣例（參考 `dsh-pet`）：
  - `const binder = ctx.get('webUiSettings') ?? ctx.settingsScope`（相容 dsh-web-ui-settings 的 bridge scope，支援批次寫入）
  - `CardForm` 模式：staged form（`textField` / `numberField` / `booleanField` / `choiceField`），Save 才寫入、revision-fenced
- 持久化位置：`~/.dsh/settings.yaml`（每 profile 一份 → 每台機器可各自設定）

### 3.5 插件套件形狀（參考 `dsh-pet` / `dsh-better-sidebar`）

```jsonc
// package.json
{
  "name": "harness-title",            // 或 @linxin666/dsh-harness-title（合入全家桶時）
  "type": "module",
  "main": "lib/index.js",             // Host 端入口
  "exports": { ".": "./lib/index.js", "./client": "./lib/client.js", ... },
  "dsh": {
    "bundle": { "patch": "./cordis.patch.yml" },   // Host 端 bundle patch
    "client": { "inject": ["@deepseek-ai/dsh-client-runtime", "@deepseek-ai/dsh-client-locale", "@deepseek-ai/dsh-client-ui-slots", "@deepseek-ai/dsh-client-ui-settings", "@deepseek-ai/dsh-client-ui-layout"], "platform": "web" }
  },
  "scripts": { "build": "tsc -b && tsdown", "watch": "tsdown --watch", ... }
}
```

- `cordis.patch.yml`：單列一行
  ```yaml
  - insert:
      - id: harness-title
        name: 'harness-title'
  ```
- Host 端 `src/index.ts`：`export const name = 'harness-title'`（與 insert id 一致）＋ `inject` ＋ `apply(ctx)`（註冊 settings namespace）
- Client 端 `src/client/index.ts`：`export const inject = ['slots', 'locale', 'connection', 'settingsScope', 'remote', ...]` ＋ `apply(ctx)`（註冊 `shell.overlay` 與 `settings.section`）
- Build：`tsc -b`（型別）＋ `tsdown`（產出 `lib/client.js`、`lib/index.js`）

### 3.6 安裝機制

- 本機安裝：`dsh plugin --profile web add link:<本套件路徑>`（`dsh plugin` 是 pnpm add 的薄轉發 + bundle reconcile）
- 驗證：`dsh plugin --profile web list`；manifest `dsh.profile.bundles` 含套件名；`node_modules/<name>` 存在且 `dsh.bundle.patch` 指向 cordis.patch.yml
- ⚠️ 安裝後 **必須重啟 dsh web 進程**（Host 端 cordis 載入）＋ 瀏覽器硬刷新；agent 不得未經用戶同意自行重啟
- ⚠️ pnpm 在 sandbox 執行環境可能缺 `LOCALAPPDATA` / `USERPROFILE` / `APPDATA` 導致 `ERR_PNPM_UNEXPECTED_STORE`：執行 `dsh plugin` 時注入完整環境變數

---

## 4. 技術方案

### 4.1 設定 Schema（Host + Client 共用）

```ts
// src/settings.ts（schemastery）
const TitleSettings = z.object({
  enabled:        z.boolean().default(true),        // 總開關
  text:           z.string().default(''),           // Title 文字；空字串 = 不顯示
  color:          z.string().default('#f0f0f0'),    // 文字顏色（CSS 色值）
  backgroundColor: z.string().default('transparent'),// 背景色（CSS 色值）
  fontSize:       z.number().default(22).min(10).max(72),  // 字體大小 px
  position:       z.union([
                    z.literal('above-new-session'),  // 預設：New Session 按鈕上方
                    z.literal('top-right'),
                    z.literal('top-left'),
                    z.literal('top-center'),
                  ]).default('above-new-session'),
  // 可選擴充：fontWeight / padding / borderRadius / opacity / 字型
})
```

- Host 端 `installSettingsSection(..., entry, ...)` 的 **base entry 預設 `text: os.hostname()`** → 開箱即顯示機器名，用戶可在設定頁覆蓋

### 4.2 Client 渲染（TitleBadge）

- 註冊進 `shell.overlay`（list slot，id `harness-title`）：
  ```ts
  ctx.slots.inject('shell.overlay', () => {
    const unregister = ctx.slots.register({
      name: 'shell.overlay', id: 'harness-title', order: 0,
      inject: () => ({ hooks: { titleSettings: store } }),
    }, TitleBadge)
    return () => { /* dispose store */ unregister() }
  })
  ```
- `TitleBadge` 元件：
  - 讀設定 scope snapshot（`enabled` / `text` / `color` / `backgroundColor` / `fontSize` / `position`）
  - `position: fixed` 依設定座標：
    - `above-new-session`：`left: 12px; top: 8px; max-width: ~200px`（對齊 sidebar 內容；New Session 按鈕上方是 60px logoRow）
    - `top-right`：`right: 12px; top: 8px`
    - `top-left`：`left: 12px; top: 8px`（同 above-new-session 但不等寬）
    - `top-center`：`left: 50%; transform: translateX(-50%); top: 8px`
  - `pointer-events: none`（保證不擋按鈕）
  - 樣式：`fontSize` 由設定注入；文字色/背景色由設定注入；其餘（內距、圓角、字重）用固定樣式或 `--dsw-alias-*` 主題變數
  - **側欄收起隱藏**：CSS 祖先選擇器 `.frame[data-sidebar-collapsed]`（僅 `above-new-session` 位置需要）
  - `text` 為空或 `enabled=false` → 不渲染

### 4.3 設定頁 UI（TitleSettingsCard）

- 註冊進 `settings.section`（id `harness-title`，order 建議 150 附近，與家族插件錯開）
- 用家族共用 `CardForm` 模式（staged form）：
  - `textField('text')`
  - 自訂 `colorField`（hex/CSS 色值文字 + 預覽色塊；可複用 `textField` 加驗證）
  - `numberField('fontSize', { integer: true, min: 10, max: 72 })`
  - `choiceField('position', ['above-new-session', 'top-right', 'top-left', 'top-center'])`
  - `booleanField('enabled')`
- 儲存 → `scope.set/unset`（或 bridge scope 的 `mutate` 批次）→ 寫入 `~/.dsh/settings.yaml`
- 即時生效：scope 訂閱 → TitleBadge 立即更新（不需要刷新）

### 4.4 Host 端（src/index.ts）

```ts
import { installSettingsSection, settingsNamespace } from '@deepseek-ai/dsh-settings'
export const name = 'harness-title'
export const inject = ['settings']      // 視 dsh-settings service 需要
export function apply(ctx) {
  installSettingsSection(ctx, settingsNamespace('harness-title'), TitleSettings, { text: os.hostname() }, hooks)
}
```

---

## 5. 檔案結構（目標）

```
U:\Projects\ai\deepseek-harness\Plugin\harness-title\
├── planning\
│   └── 01-harness-title-plugin-plan.md      ← 本計劃
├── package.json
├── tsconfig.json
├── cordis.patch.yml
├── README.md                                # 安裝/使用說明
├── src\
│   ├── settings.ts                          # 共用設定 schema（Host+Client）
│   ├── index.ts                             # Host 端：註冊 settings namespace
│   └── client\
│       ├── index.ts                         # Client 主體：shell.overlay + settings.section
│       ├── TitleBadge.tsx                   # Title 顯示元件
│       ├── TitleSettingsCard.tsx            # 設定頁元件（CardForm 模式）
│       ├── settings-form.ts                 # 家族共用 staged form（複製自 dsh-pet 慣例）
│       ├── title.module.css                 # badge 樣式
│       └── locales.ts                       # zh/en 字典
└── lib\                                    # tsdown 產出（build 後生成，不入版控）
```

---

## 6. 實作里程碑

| # | 里程碑 | 內容 | 驗收 |
|---|---|---|---|
| M1 | Scaffold | package.json（dsh.client/bundle 欄位）、tsconfig、cordis.patch.yml、tsdown 設定、README 骨架 | ✅ `tsdown` 產出 `lib/client.js`、`lib/index.js` |
| M2 | Host 端 | `src/index.ts` ＋ `src/settings.ts`：註冊 `harness-title` namespace，base entry 帶 hostname | ✅ `dsh web --dump-config` 組合樹含 harness-title；host 模組 import 冒煙測試通過 |
| M3 | Client 渲染 | `TitleBadge` 註冊進 `shell.overlay`，依設定顯示（含 pointer-events、收起隱藏） | ✅ 已建置進 bundle（等重啟後 GUI 驗證四種位置） |
| M4 | 設定頁 | `TitleSettingsCard` 註冊進 `settings.section`（文字/顏色/背景色/字體大小/位置/開關） | ✅ 已建置進 bundle（等重啟後 GUI 驗證儲存與持久化） |
| M5 | 安裝與手動測試 | `dsh plugin --profile web add link:<路徑>` → 重啟 → 驗證全流程 | ✅ 已安裝（link:）＋ `dsh.profile.bundles` 已含 harness-title；**等用戶重啟 dsh web 後跑 7.2 測試清單** |
| M6 | 收尾 | i18n、README、hostname 預設、CSS 主題相容、edge cases（字串過長截斷等） | ✅ zh/en 雙語、README、max-width + ellipsis、顏色驗證、`[data-sidebar-collapsed]` 隱藏 |
| M7（後續） | 合入全家桶 | clone dsh-web-ui → `packages/harness-title` → aggregate.yml ＋ `scripts/aggregate.mjs` 重產 cordis.patch.yml → 發佈 `@linxin666/dsh-harness-title` → 加入 dsh-web-ui-all 依賴 | 全家桶更新後所有機器一鍵安裝 |

---

## 7. 安裝與測試

### 7.1 本機開發安裝

```bash
# 在 profile 目錄執行（需完整環境變數，見 3.6）
dsh plugin --profile web add link:C:/Users/<user>/Projects/ai/deepseek-harness/Plugin/harness-title
```

- 開發迭代：改碼 → `tsdown --watch` 重建 `lib/` → 瀏覽器硬刷新（Client 端變更；若啟用 dev watcher 可 HMR）
- **Host 端變更（cordis/namespace）→ 需重啟 dsh web 進程**（徵求用戶同意後再執行）
- 驗證：`dsh plugin --profile web list`、`~/.dsh/profiles/web/node_modules/harness-title`、boot 頁面 `/plugins/harness-title/client.js` 存在

### 7.2 手動測試清單

- [ ] 安裝後重啟，GUI 顯示 Title（預設在 New Session 按鈕上方）
- [ ] Title 不擋 New Session 按鈕點擊（pointer-events）
- [ ] 設定頁改文字 → 即時更新
- [ ] 改文字顏色／背景色 → 即時更新
- [ ] 改字體大小（10–72）→ 即時更新
- [ ] 切換四種位置 → 即時更新
- [ ] 關閉 enabled → Title 消失；重開 → 恢復
- [ ] 側欄收起成 rail → `above-new-session` 位置自動隱藏
- [ ] 重新整理頁面 → 設定仍在（持久化）
- [ ] 重啟 dsh web → 設定仍在（settings.yaml）
- [ ] 多機器情境：本機設定 A Title，另一台設定 B Title（各自 settings.yaml）
- [ ] 深/淺主題下 Title 皆可讀（自訂色優先，主題色兜底）
- [ ] `dsh plugin --profile web remove harness-title` 後一切恢復原狀（無殘留）

---

## 8. 風險與注意事項

| 風險 | 影響 | 緩解 |
|---|---|---|
| `shell.overlay` slot 屬 rc.7 實作，未來 DSH 版本可能變動 | 掛載點失效 | 程式碼把 slot 名稱集中為常數；升級時快速定位；備案＝仿 `dsh-pet` 直接掛 `document.body` |
| Host 端變更需重啟 dsh web 進程 | 打斷使用者 | 明確告知；agent 不擅自重啟 |
| pnpm 安裝環境變數缺失（ERR_PNPM_UNEXPECTED_STORE） | 安裝失敗 | 執行 `dsh plugin` 時注入 `USERPROFILE/LOCALAPPDATA/APPDATA/HOME` |
| Client bundle 每次改碼要重建才生效 | 看不到效果 | 用 `tsdown --watch`；明確「改 Client → 刷新即可，改 Host → 需重啟」 |
| 位置重疊（sidebar 收合時 badge 壓到內容） | 視覺遮擋 | `data-sidebar-collapsed` 祖先選擇器隱藏；badge 一律 `pointer-events:none` |
| settings namespace 命名衝突 | 註冊失敗 fail loud | 用唯一名稱 `harness-title` |
| 字串過長撐爆 sidebar | 版面破裂 | `max-width` + `text-overflow: ellipsis` + `white-space: nowrap`；可選 title tooltip |
| 顏色值不合法 | 樣式失效 | 設定頁 colorField 驗證（CSS 色值/hex），不合法阻擋儲存 |

---

## 9. 後續擴展（暫不納入本版）

- 多 profile 共用設定（例如 global settings 層）
- Title 加上機器的其他識別資訊（IP、profile 名、git branch）
- 進階外觀：漸層背景、邊框、陰影、透明度、字型選擇
- 合入 dsh-web-ui 全家桶（M7），所有機器一鍵更新

---

## 附錄：本機實測的關鍵事實（供實作時引用）

1. `~/.dsh/profiles/web/cordis.patch.yml` 是 profile 的 patch 層；**不要**在裡面重複手動加同一插件的 entry（會重複掛載）
2. 全家桶 `dsh-web-ui-all` 的 `cordis.patch.yml` 由 `scripts/aggregate.mjs` 從 `aggregate.yml` 自動產生（合入時要改 aggregate.yml）
3. 參考實作：
   - `~/.dsh/profiles/web/node_modules/@linxin666/dsh-pet/src/`（含完整 TS 原始碼：client 掛載、settings 卡、CardForm）
   - `~/.dsh/profiles/web/node_modules/@linxin666/dsh-web-ui-all/package.json`（bundle 聚合範例）
   - `~/.dsh/profiles/web/node_modules/dsh-better-sidebar/`（client inject 清單範例）
4. 官方 shell 三欄順序（`@deepseek-ai/dsh-client-ui-layout/lib/client.js` 的 AppFrame）：
   `gridTemplateColumns: ${sidebar}px minmax(0,1fr) ${details}px` — sidebar 左、conversation 中、details 右
5. New Session 按鈕位於 sidebar 頂部（logoRow 60px 之下），sidebar 寬 264–420px、收起 rail 56px

## 附錄 B：實作紀錄（v2，與計劃的差異）

- `shell.overlay` 容器 CSS：`position:absolute; inset:0; z-index:20; pointer-events:none`，
  但 **直接子元素會被設回 `pointer-events:auto`** → badge 根元素必須自設 `pointer-events:none`
- schemastery **沒有 `z.literal`**：官方慣例是 `z.union(['a', 'b', ...])`（dsh-client-locale/theme 同款）
- `installSettingsSection` 的 T 需顯式指定（`installSettingsSection<TitleSettings>(...)`），
  否則 TS 會從 schema 推斷出 `ObjectS`（含 `| null`）導致 setSource 型別錯誤
- 背景色預設從計劃的 `transparent` 改為 `var(--dsw-alias-bg-layer-3)`（主題感知底色）：
  badge 預設覆蓋在 sidebar wordmark 之上，透明底會讓字標穿透造成文字疊字；
  計劃 §2.2「跟隨主題不突兀」的 Should 要求優先於 schema 字面預設
- `dsh plugin add link:` 只更新 `dsh.profile.bundles`（loader 讀取各套件 `dsh.bundle.patch`），
  **不會**寫入 profile 的 cordis.patch.yml（那是 user patch 層，正確行為）
- tsdown 0.22 對 `external`/`noExternal` 有 deprecation 警告（建議 `deps.neverBundle/alwaysBundle`），
  功能正常，暫不改寫（與家族 shared/tsdown.client.ts 同款 API）
- 安裝驗證：`dsh --profile web --dump-config` 輸出含
  `# == harness-title` / `- id: harness-title` / `name: harness-title`（組合樹確認，無需重啟即可驗證）
- v3（用戶追加需求）：文字顏色／背景色由純文字輸入改為 **預設色票＋「自訂」展開文字輸入**；
  預設色＝主題文字色、主題底色、透明、近白、近黑、紅、黃、淺綠、淺藍、粉紅（共十款，
  綠→淺綠、藍→淺藍 為用戶指定調整）（`src/client/ColorField.tsx` + `color-field.module.css`，
  schema 不變，值仍為 CSS 色值字串；沿用 CardForm staged form：選色票＝暫存值，按「儲存」才寫入）
