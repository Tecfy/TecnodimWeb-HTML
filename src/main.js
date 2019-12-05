import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import swal from 'sweetalert2'

import VeeValidate, { Validator } from 'vee-validate';
import pt_BR from 'vee-validate/dist/locale/pt_BR';

Validator.localize('pt_BR', pt_BR);
Vue.use(VeeValidate, {
  locale: 'pt_BR'
});

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
                }
            } else {
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
        Recortar: false,
        Classificar: false,
        Digitalizar: false,
        Reenviar: false
    };
    claims.map( claim => {
        if(claim.ClaimType === "Recortar"){
            claimsOb = {...claimsOb, Recortar: true}
        } else if(claim.ClaimType === "Classificar"){
            claimsOb = {...claimsOb, Classificar: true}
        } else if(claim.ClaimType === "Digitalizar"){
            claimsOb = {...claimsOb, Digitalizar: true}
        } else if(claim.ClaimType === "Reenviar"){
            claimsOb = {...claimsOb, Reenviar: true}
        }
    });
    return claimsOb;
}

function getAuthorization(route){
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