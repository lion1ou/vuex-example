import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Hello1 from '@/components/Hello1'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Hello',
        component: Hello
    }, {
        path: '/1',
        name: 'Hello1',
        component: Hello1
    }]
})
