# Node.js 併發任務模擬器

這個 Node.js 程序使用生成器（Generators）和異步編程來模擬併發任務的執行。它展示了如何在 Node.js 中實現協程（coroutine）風格的併發，這是一種有效管理和執行多個任務的方法，尤其是在需要模擬操作系統內核或複雜的任務調度器時。

## 功能

程序包括兩個主要部分：`taskGenerator` 和 `runTasks`。

- `taskGenerator`: 一個生成器函數，用於創建具有多個步驟的任務。每個步驟都有其指定的持續時間。
- `runTasks`: 一個異步函數，用於運行多個任務。它會等待所有任務完成後再打印出一個消息表示所有任務已完成。

## 如何使用

確保你的系統已安裝 Node.js。
```javascript
node MiniCoroutineOS.js
```

## 示例

```javascript
// 示例任務
const tasks = [
    { name: '你的播放器', steps: [300, 500, 200, 7000] },
    { name: '你的瀏覽器', steps: [400, 1400, 400, 600, 200] },
    // 可以新增更多任務
];

runTasks(tasks);
```
