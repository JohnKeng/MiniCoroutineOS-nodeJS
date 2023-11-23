const util = require('util')
// 使用 util.promisify 將 setTimeout 函數轉換為返回 Promise 的版本
const setTimeoutPromise = util.promisify(setTimeout)


/**
 * taskGenerator 是一個 generator 函數，用於創建一個任務。
 * @param {string} name - 任務的名稱。
 * @param {Array<number>} steps - 一個包含多個步驟的陣列，每個步驟都是一個數字，表示該步驟需要的時間（以毫秒為單位）。
 * @yields {Promise} - 返回一個 Promise 對象，該對象在指定的時間後解析。
 */
function* taskGenerator(name, steps) {
    // 遍歷 steps 陣列中的每一個元素
    for (let i = 0; i < steps.length; i++) {
        // 使用 yield 關鍵字來暫停執行，並返回一個 Promise 對象
        // 這個 Promise 對象會在指定的時間後解析
        yield setTimeoutPromise(steps[i]).then(() => {
            // 當 Promise 被解析時，輸出一條包含任務名稱、步驟索引和持續時間的消息
            let message = `任務 ${name}: 步驟 ${i + 1}, 期間: ${steps[i]}ms`
            console.log(message)
        })
    }
}

/**
 * runTasks 是一個異步函數，用於運行一組任務。
 * @param {Array<Object>} tasks - 一個包含多個任務的陣列。每個任務都是一個對象，包含名稱和步驟的陣列。
 * @returns {Promise} - 當所有任務都完成時，返回一個解析的 Promise。
 */
async function runTasks(tasks) {
    let generators = tasks.map(task => ({
        gen: taskGenerator(task.name, task.steps),
        done: false
    }))

    while (generators.some(g => !g.done)) {
        await Promise.all(generators.map(g => {
            if (!g.done) {
                let result = g.gen.next()
                g.done = result.done
                return result.value
            }
        }))
    }

    console.log('所有任務完成')
}

// 示例任務
const tasks = [
    { name: '你的播放器', steps: [300, 500, 200, 7000] },
    { name: '你的瀏覽器', steps: [400, 1400, 400, 600, 200] },
    // 可以新增更多任務
]

runTasks(tasks)
