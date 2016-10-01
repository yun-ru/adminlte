import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Platform from './containers/Platform.vue'
import Login from './containers/Login.vue'
import NotFound from './components/pages/ui/NotFound.vue'
import PageGeneral from './components/pages/ui/General.vue'
import PageIcons from './components/pages/ui/Icons.vue'
import PageButtons from './components/pages/ui/Buttons.vue'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'

// Pages
import Currency from './components/pages/base/Currency.vue'
import Role from './components/pages/base/Role.vue'
import Permission from './components/pages/base/Permission.vue'
import Theme from './components/pages/base/Theme.vue'


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueValidator)



// routing
export var router = new VueRouter({ linkActiveClass: 'active' })

router.map({
    '*': {
        component: NotFound
    },
    '/': {
        name: 'main',
        component: Platform,
        subRoutes: {
            '/': {
                component: Currency
            },

            '/role/setting/getList': {
                component: Role
            },
            '/role/assign/show': {
                component: Permission
            },
            '/currency/setting/getList': {
                component: Currency
            },
            '/theme/setting/getList': {
                component: Theme
            },
            '/language/setting/getList': {
                component: Currency
            },




            '/base/payment': {
                component: Currency
            },

            '/member/:level': {
                component: Currency
            },
            '/member/service': {
                component: PageIcons
            },
            '/member/login-log': {
                component: PageButtons
            },
        }
    },
    '/login': {
        component: Login
    }
})

router.start(App, 'body')
