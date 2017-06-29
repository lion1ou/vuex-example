//和计算属性功能相同，基于多个状态生成新的状态

export const count = state => state.count //当前数值

const limit = 5

export const recentHistory = state => { //近期历史记录
    const end = state.history.length
    const begin = end - limit < 0 ? 0 : end - limit
    return state.history
        .slice(begin, end)
        .toString()
        .replace(/,/g, ', ')
}
