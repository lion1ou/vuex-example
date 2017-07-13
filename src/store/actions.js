//不改变状态，只提交(commit) mutation。

export const increment = ({ commit }) => commit('increment') //加1
export const decrement = ({ commit }) => commit('decrement') //减1

export const incrementIfOdd = ({ commit, state }) => { //奇数加1
    if ((state.count + 1) % 2 === 0) {
        commit('increment')
    }
}

export const incrementAsync = ({ commit }) => { //模拟异步加1
    setTimeout(() => {
        commit('increment')
    }, 1000)
}

export const incrementNum = ({ commit }, data) => { //传递参数-加参数
    console.log('ss', data);
    commit('incrementNum', data);
}
