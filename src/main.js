import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import swal from 'sweetalert2'

import pt_BR from 'vee-validate/dist/locale/pt_BR';
import VeeValidate, { Validator } from 'vee-validate';

// Localize takes the locale object as the second argument (optional) and merges it.
Validator.localize('pt_BR', pt_BR);
Vue.use(VeeValidate);

Vue.config.productionTip = false

import vSelect from 'vue-select'
Vue.component('v-select', vSelect);

import {VueMaskDirective} from 'v-mask'
Vue.directive('mask', VueMaskDirective);

import VDragged from 'v-dragged'
Vue.use(VDragged);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

// navigation guards before each
router.beforeEach((to, from, next) => {
    if (to.path !== '/login') {
        if (to.meta.enabled) {
            if (to.meta.requiresAuth) {
                let token = window.localStorage.token;
                let authorized = getAuthorization(to);
                if (token && authorized) {
                    next()
                } else {
                    next(from.path);
                    // if (window.localStorage.token) {
                    //     swal({
                    //         toast: true,
                    //         timer: 3000,
                    //         type: 'error',
                    //         showConfirmButton: false,
                    //         title: 'Acesso restrito.'
                    //     });
                    // }
                }
            } else {
                // Route dont require authentication
                next()
            }
        } else {
            swal({
                toast: true,
                timer: 3000,
                showConfirmButton: false,
                title: 'Esta funcionalidade não está disponível no momento.'
            });
            next(from.path)
        }
    } else {
        next()
    }
});

function getClaims(){
    let claims = JSON.parse( window.localStorage.claims);
    let claimsOb = {
        Recortar:false,
        Classificar:false
    };
    claims.map( claim => {
        if(claim.ClaimType === "Recortar"){
            claimsOb = {...claimsOb, Recortar: true}
        }else if(claim.ClaimType === "Classificar"){
            claimsOb = {...claimsOb, Classificar: true}
        }
    });
    return claimsOb;
}

function getAuthorization(route){
    // Se rota possui permissão de acesso, valida se usuário logado tem os privilégios
    if(route.meta.claim){
        let claims = getClaims();
        if(claims[route.meta.claim]){
            return true;
        }else{
            return false;
        }
    }
    return true;
}



