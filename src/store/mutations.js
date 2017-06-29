//用于操作state的唯一途径

export const increment = state => {
    state.count++;
    state.history.push('increment');
}

export const decrement = state => {
    state.count--;
    state.history.push('decrement');
}
