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
import Home from './components/pages/base/Home.vue'
import Currency from './components/pages/base/Currency.vue'
import Role from './components/pages/base/Role.vue'
import Permission from './components/pages/base/Permission.vue'
import Theme from './components/pages/base/Theme.vue'
import Block from './components/pages/base/Block.vue'
import Advertising from './components/pages/base/Advertising.vue'
import CashFlow from './components/pages/base/CashFlow.vue'
import Languages from './components/pages/base/Languages.vue'
import Account from './components/pages/base/Account.vue'


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
                component: Home
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
            '/block/setting/getList': {
                component: Block
            },
            '/cashFlow/setting/getList': {
                component: CashFlow
            },
            '/languages/setting/getList': {
                component: Languages
            },
            '/advertising/setting/getList': {
                component: Advertising
            },
            '/account/master/getList': {
                component: Account
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
