<template>
    <div class="hello">
        <h1>{{ msg }}1</h1>
        <h2>{{$store.state.count}}</h2>
        <h3>最近记录：{{$store.state.history}}</h3>
        <button @click="increment">加1</button>
        <button @click="decrement">减1</button>
        <button @click="incrementIfOdd">奇数加1</button>
        <button @click="incrementAsync">异步加1</button>
        <input v-model.number="num" type="number" placeholder="输入数字">
        <button @click="incrementNum(num)">加输入框的数字</button>
    </div>
</template>
<script>
export default {
    name: 'hello',
    data() {
        return {
            msg: 'A Vuex Example Project !',
            num: '',
        }
    },
    methods: {
        increment() {
            this.$store.dispatch('increment');
        },
        decrement() {
            this.$store.dispatch('decrement');
        },
        incrementIfOdd() {
            this.$store.dispatch('incrementIfOdd');
        },
        incrementAsync() {
            this.$store.dispatch('incrementAsync');
        },
        incrementNum() {
            this.$store.dispatch('incrementNum', this.num);
        },
    },
    mounted() {
        console.log(this.$store.state.history);
    }
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
