# 🌠 Grok 互動流星雨與星雲背景

為 [Grok.com](https://grok.com) 網頁添加超自然的流星雨背景效果，提供沉浸式的視覺體驗。

## ✨ 功能特色

### 🌟 主要功能

- **互動式流星雨**：滑鼠點擊任意位置生成流星
- **自動流星雨**：每3-5秒自動生成流星
- **星雲漸層背景**：深空星雲效果，營造宇宙氛圍
- **背景層設計**：所有效果僅顯示在背景，不影響網頁操作

### 🎨 視覺效果

- **流星拖尾**：20個位置的漸變拖尾效果
- **光暈效果**：星星周圍的柔和光暈
- **星雲漸層**：從中心向外擴散的深空色彩

## 🚀 安裝指南

1. **安裝 Tampermonkey**

   - Chrome：[Tampermonkey Chrome 商店](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - Firefox：[Tampermonkey Firefox 附加元件](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - Edge：[Tampermonkey Edge 商店](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
2. **手動安裝**

   - 點擊瀏覽器工具列的 Tampermonkey 圖示
   - 選擇 "管理面板"
   - 點擊 "+" 新增腳本
   - 將 `grok_meteor_shower.js` 的內容貼上
   - 儲存 (Ctrl+S)

## 🎯 使用說明

### 基本操作

- **自動效果**：開啟 Grok.com 後，背景會自動顯示流星雨和星星
- **互動生成**：在頁面任意位置點擊滑鼠，會在該位置生成新的流星
- **無干擾設計**：所有效果都在背景層，不影響網頁的正常使用

### 控制台訊息

腳本運行時會在瀏覽器控制台顯示以下訊息：

- `小夜報告：Canvas成功初始化！準備點亮互動流星雨與星雲！🌠`
- `小夜報告：星星初始化完成，數量：100`
- `小夜報告：流星雨來啦！當前流星數：[數量]`

## ⚙️ 技術細節

### 檔案結構

```
grok_meteor_shower/
├── grok_meteor_shower.js  # 主要腳本檔案
└── README.md              # 說明文件
```

### 核心技術

- **Canvas 2D API**：用於繪製所有視覺效果
- **requestAnimationFrame**：60fps 流暢動畫
- **事件監聽**：滑鼠點擊事件處理
- **物件導向**：Star 和 Meteor 類別設計

### 效能優化

- **指標穿透**：`pointerEvents: none` 確保不影響網頁互動
- **背景層級**：`zIndex: -1` 確保效果在背景顯示
- **記憶體管理**：自動清理超出螢幕的流星物件
- **動畫優化**：使用 requestAnimationFrame 而非 setInterval

## 🛠️ 客製化設定

### 調整星星數量

在 `initStars()` 函數中修改迴圈次數：

```javascript
for (let i = 0; i < 100; i++) {  // 改為想要的數量
```

### 調整流星頻率

在 `animate()` 函數中修改機率值：

```javascript
if (Math.random() < 0.03) {  // 0.03 = 3% 機率
```

### 調整顏色主題

在程式碼中搜尋顏色相關的設定進行修改：

- 星星顏色：第58行 `colors` 陣列
- 背景漸層：第24行 `background` 設定
- 星雲顏色：第184-187行漸層設定

## 🔧 故障排除

### 常見問題

**問題：效果沒有顯示**

- 確認已安裝 Tampermonkey 或 Violentmonkey
- 檢查腳本是否已啟用
- 確認網址為 https://grok.com/*
- 檢查瀏覽器控制台是否有錯誤訊息

**問題：影響網頁操作**

- 確認腳本版本為 1.5 或更新版本
- 檢查 `zIndex` 和 `pointerEvents` 設定是否正確

**問題：效能問題**

- 降低星星數量（修改 `initStars()` 中的迴圈次數）
- 降低流星生成頻率（修改 `animate()` 中的機率值）
- 關閉其他可能影響效能的擴充功能

## 📋 系統需求

- **瀏覽器**：Chrome 88+, Firefox 85+, Edge 88+, Safari 14+
- **擴充功能**：Tampermonkey 或 Violentmonkey
- **網站**：僅在 https://grok.com/* 生效
