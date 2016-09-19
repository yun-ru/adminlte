import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Platform from './containers/Platform.vue'
import Account from './containers/Account.vue'
import NotFound from './components/pages/ui/NotFound.vue'
import PageGeneral from './components/pages/ui/General.vue'
import PageIcons from './components/pages/ui/Icons.vue'
import PageButtons from './components/pages/ui/Buttons.vue'
import Magic from './components/pages/tt/Magic.vue'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueValidator)



// routing
export var router = new VueRouter({ linkActiveClass: 'active', history: true })

router.map({
  '*': {
    component: NotFound
  },
  '/': {
    name: 'main',
    component: Platform,
    subRoutes: {
      '/': {
        component: Magic
      },

      '/ui/general': {
        component: PageGeneral
      },
      '/ui/icons': {
        component: PageIcons
      },
      '/ui/buttons': {
        component: PageButtons
      },

      '/base/role': {
        component: Magic
      },
      '/base/permission': {
        component: Magic
      },
      '/base/currency': {
        component: Magic
      },
      '/base/payment': {
        component: Magic
      },

      '/member/:level': {
        component: Magic
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
    component: Account
  }
})

router.start(App, 'body')
