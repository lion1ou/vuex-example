//用于操作state的唯一途径

export const increment = state => {
    state.count++;
    state.history.push('increment');
    console.log('increment');
}

export const decrement = state => {
    state.count--;
    state.history.push('decrement');
    console.log('decrement');
}

export const incrementNum = (state, data) => { //传递参数
    state.count = state.count + data;
    state.history.push('incrementNum');
    console.log('incrementNum');
}
