import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Home from './views/Home.vue'
import SelectUnity from './views/SelectUnity.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'redirect',
      component: Login,
      meta: {
        requiresAuth: false,
        enabled: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false,
        enabled: true
      }
    },
    {
      path: '/select-unity',
      name: 'select-unity',
      component: SelectUnity,
      meta: {
        requiresAuth: true,
        enabled: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
        enabled: true
      }
    },
    {
      path: '/cut-dossie',
      component: () => import('./views/CutDossie.vue'),
      meta: {
        requiresAuth: true,
        enabled: true,
        claim: "Recortar"
      }
    },
    {
      path: '/cut-selected/:id',
      component: () => import('./views/CutDossieSelected'),
      meta: {
        requiresAuth: true,
        enabled: true,
        claim: "Recortar"
      }
    },
    {
      path: '/rate-dossie',
      component: () => import('./views/RateDossie'),
      meta: {
        requiresAuth: true,
        enabled: true,
        claim: "Classificar"
      }
    },
    {
      path: '/rate-dossie-selected/:id',
      component: () => import('./views/RateDossieSelected'),
      meta: {
        requiresAuth: true,
        enabled: true,
        claim: "Classificar"
      }
    },
    {
      path: '/rate-dossie-selected-single/:id',
      component: () => import('./views/RateDossieSelectedGroup'),
      meta: {
        requiresAuth: true,
        enabled: true,
        claim: "Classificar"
      }
    },
    {
      path: '/rate-dossie-selected-group/:id/:slice_id',
      component: () => import('./views/RateDossieSelectedGroup'),
      meta: {
        requiresAuth: true,
        enabled: true,
        claim: "Classificar"
      }
    },
    {
      path: '/scanning',
      component: () => import('./views/Scanning'),
      meta: {
        requiresAuth: true,
        enabled: true,
        claim: "Digitalizar"
      }
    },
    {
      path: '/scanning-selected/:id',
      component: () => import('./views/ScanningSelected'),
      meta: {
        requiresAuth: true,
        enabled: true,
        claim: "Digitalizar"
      }
    },
    {
      path: '/scanned',
      component: () => import('./views/Scanned'),
      meta: {
        requiresAuth: true,
        enabled: true,
        claim: "Digitalizar"
      }
    },
    {
      path: '/scanned-selected/:id',
      component: () => import('./views/ScannedDossieSelected'),
      meta: {
        requiresAuth: true,
        enabled: true,
        claim: "Digitalizar"
      }
    }
  ]
})
