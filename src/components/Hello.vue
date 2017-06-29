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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
