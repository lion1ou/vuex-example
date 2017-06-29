# vuex-example

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```


Vuex 是 状态管理的编程模式 + 工具库，适用于 Vue.js 编写的应用。它作为一个集中化的 store （状态存储），服务于应用中的所有组件，其中的规则保证了状态只会在可预测的方式下修改。另外，它能与 Vue 官方提供的 devtools 扩展 集成，提供高级功能，如，无需配置就可以基于时间轴调试，以及状态快照的 导入 / 导出。

<!--more-->

如果你没有开发过大型的单页应用就立刻上 Vuex，可能会觉得繁琐然后排斥，这是很正常的 —— 如果是个简单的应用，大多数情况下，不用 Vuex 还好，你要的可能就是个简单的 全局事件总线。不过，如果你构建的是一个 中大型 单页应用，当你在考虑如何更好的在 Vue 组件外处理状态时，Vuex 自然就是你的下一步选择。Redux 的作者有一句话说的不错：

>Flux libraries are like glasses: you’ll know when you need them.（Flux 库正如眼镜：当你需要它们的时候，你就懂了。）

### 核心概念

![](https://ws1.sinaimg.cn/large/006tNc79gy1fh21jpvhk6j30jh0fb0sp.jpg)

#### state （ store 的 data）

存放整个应用状态，作为应用的唯一数据源驱动UI视图的更新
尽量初始化详细的state数据

* 组件中直接访问
```js
computed: {
  count () {
    return this.$store.state.count
  }
}
```

* 使用工具函数 mapSate 访问
用于将独立的state数据映射到组件的 computed 属性中
```js
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可以让代码非常简洁
    count: state => state.count,
    // 传入字符串 'count' 等同于 `state => state.count`
    countAlias: 'count',
    // 想访问局部状态，就必须借助于一个普通函数，函数中使用 `this` 获取局部状态
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

#### actions （ store 的 methods）

不改变状态，只提交(commit) mutation。
可以包含任意异步操作。

* 组件中直接访问
```js
mounted(){
    this.$store.dispatch('getUserData')
}
```

* 工具函数 mapActions 访问
用于将action方法映射到组件的 methods 中
```js
import { mapActions } from 'vuex'
export default {
  // ...
  methods: {
    ...mapActions([
      'increment' // 映射 this.increment() 到 this.$store.dispatch('increment')
    ]),
    ...mapActions({
      add: 'increment' // map this.add() to this.$store.dispatch('increment')
    })
  }
}
```

#### mutations （ store 的 methods）

定义了 同步 改变 state 的唯一方法
在store中，实际改变 状态(state) 的唯一方式是通过 提交(commit) 一个 mutation

* 组件中使用
```js
methods:{
    add(){
        this.$store.commit('ADD_NUMBER',{num: 1})
    }
}
```

* 使用工具函数 mapMutations
将mutation映射到组件的 methods 中
```js
import { mapMutations } from 'vuex'
export default {
  // ...
  methods: {
    ...mapMutations({
      add: 'increment' // 映射 this.add() 到 this.$store.commit('increment')
    })
  }
}
```

#### getters （ store 的 computed）

和计算属性功能相同，基于多个状态生成新的状态

* 组件中使用
```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

* 工具函数 mapGetters
用于将getter属性映射到组件的computed中
```js
import { mapGetters } from 'vuex'
export default {
  // ...
  computed: {
    // 使用对象扩展操作符把 getter 混入到 computed 中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

### 安装

* 直接引入

>在 Vue 后面加载 vuex，它会自动安装的：

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vuex.js"></script>
```

* NPM

```shell
npm install vuex 
#如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：
```

### 使用（这里提供的是个人使用方案，可能有不足，望留言提点）

创建store文件夹，在文件夹内新建index.js、actions.js、getters.js、mutations.js，具体内容如下：

>index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)//如果使用全局的 script 标签，则无须如此（手动安装）。

const state = {
  count: 0,
  history: []
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
```

>main.js

```js
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

```

>actions.js

```js
//不改变状态，只提交(commit) mutation。

export const increment = ({ commit }) => commit('increment')
export const decrement = ({ commit }) => commit('decrement')

export const incrementIfOdd = ({ commit, state }) => {
    if ((state.count + 1) % 2 === 0) {
        commit('increment')
    }
}

export const incrementAsync = ({ commit }) => {
    setTimeout(() => {
        commit('increment')
    }, 1000)
}

```

>getters.js

```js
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

```

>mutations.js

```js
//用于操作state的唯一途径
export const increment = state => {
    state.count++;
    state.history.push('increment');
}

export const decrement = state => {
    state.count--;
    state.history.push('decrement');
}
```

到这里vuex的基本准备都做完了，可以开始在组件内调用了。

>Hello.vue

```html
<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>{{count}}</h2>
        <h3>最近记录：{{recentHistory}}</h3>
        <button @click="increment">加1</button>
        <button @click="decrement">减1</button>
        <button @click="incrementIfOdd">奇数加1</button>
        <button @click="incrementAsync">异步加1</button>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    name: 'hello',
    data() {
        return {
            msg: 'A Vuex Example Project !'
        }
    },
    computed: mapGetters([
        'count',
        'recentHistory'
    ]),
    methods: mapActions([
        'increment',
        'decrement',
        'incrementIfOdd',
        'incrementAsync'
    ])

}
</script>
```

