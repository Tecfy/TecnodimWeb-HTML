(function(t){function e(e){for(var s,n,r=e[0],l=e[1],c=e[2],u=0,d=[];u<r.length;u++)n=r[u],i[n]&&d.push(i[n][0]),i[n]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);m&&m(e);while(d.length)d.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],s=!0,n=1;n<a.length;n++){var r=a[n];0!==i[r]&&(s=!1)}s&&(o.splice(e--,1),t=l(l.s=a[0]))}return t}var s={},n={app:0},i={app:0},o=[];function r(t){return l.p+"assets/app/js/"+({}[t]||t)+"."+{"2bf4":"a6dfb679","70a8":"18b47651",c7de:"3fc85192","chunk-2b49":"a4e06f2e","chunk-da53":"5ee019ff"}[t]+".js"}function l(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.e=function(t){var e=[],a={"chunk-2b49":1,"chunk-da53":1};n[t]?e.push(n[t]):0!==n[t]&&a[t]&&e.push(n[t]=new Promise(function(e,a){for(var s="assets/app/css/"+({}[t]||t)+"."+{"2bf4":"31d6cfe0","70a8":"31d6cfe0",c7de:"31d6cfe0","chunk-2b49":"319560fc","chunk-da53":"4ae69445"}[t]+".css",n=l.p+s,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var r=i[o],c=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(c===s||c===n))return e()}var u=document.getElementsByTagName("style");for(o=0;o<u.length;o++){r=u[o],c=r.getAttribute("data-href");if(c===s||c===n)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var s=e&&e.target&&e.target.src||n,i=new Error("Loading CSS chunk "+t+" failed.\n("+s+")");i.request=s,a(i)},d.href=n;var m=document.getElementsByTagName("head")[0];m.appendChild(d)}).then(function(){n[t]=0}));var s=i[t];if(0!==s)if(s)e.push(s[2]);else{var o=new Promise(function(e,a){s=i[t]=[e,a]});e.push(s[2]=o);var c,u=document.getElementsByTagName("head")[0],d=document.createElement("script");d.charset="utf-8",d.timeout=120,l.nc&&d.setAttribute("nonce",l.nc),d.src=r(t),c=function(e){d.onerror=d.onload=null,clearTimeout(m);var a=i[t];if(0!==a){if(a){var s=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src,o=new Error("Loading chunk "+t+" failed.\n("+s+": "+n+")");o.type=s,o.request=n,a[1](o)}i[t]=void 0}};var m=setTimeout(function(){c({type:"timeout",target:d})},12e4);d.onerror=d.onload=c,u.appendChild(d)}return Promise.all(e)},l.m=t,l.c=s,l.d=function(t,e,a){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)l.d(a,s,function(e){return t[e]}.bind(null,s));return a},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/",l.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var m=u;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"46f1":function(t,e,a){"use strict";a("ac6a"),a("456d");var s=a("bc3a"),n=a.n(s),i=a("3d20"),o=a.n(i),r=a("f121");function l(){return"undefined"===typeof window.localStorage.token&&(window.location.href="#/login"),window.localStorage.token}var c=n.a.create({baseURL:r["a"].apiUrl,headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+l()}});c.interceptors.response.use(function(t){return t},function(t){if(401===t.response.status)return window.location.href="#/login",Promise.reject(t);var e=t.response.data.hasOwnProperty("msg")?t.response.data.msg:t.response.data.message;return 422===t.response.status&&t.response.data.errors&&(e=t.response.data.errors[Object.keys(t.response.data.errors)[0]]),o()({type:"error",text:e||"Falha ao processar a requisição!",showConfirmButton:!1,toast:!0,timer:3e3}),Promise.reject(t)}),e["a"]=c},"56d7":function(t,e,a){"use strict";a.r(e);var s=a("c93e"),n=(a("cadf"),a("551c"),a("2b0e")),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sidebar-o enable-page-overlay side-scroll page-header-modern main-content-boxed",class:{notLogged:t.notLogged},attrs:{id:"page-container"}},[a("nav",{attrs:{id:"sidebar"}},[a("div",{attrs:{id:"sidebar-scroll"}},[a("div",{staticClass:"sidebar-content"},[a("div",{staticClass:"shadow content-header-fullrow px-15 pt-50 pb-50 bg-black-op-90"},[t._m(0),a("div",{staticClass:"content-header-section text-center align-parent sidebar-mini-hidden"},[t._m(1),a("div",{staticClass:"logo-content"},[a("router-link",{attrs:{to:"/home"}},[a("img",{staticClass:"img-fluid",attrs:{src:"assets/codebase/media/logo_tecfy.png",alt:"Tecfy - Business Solutions"}})])],1)])]),a("div",{staticClass:"content-side content-side-full bg-primary"},[a("ul",{staticClass:"nav-main"},[a("router-link",{attrs:{tag:"li",to:"/home","active-class":"active",exact:""}},[a("a",[a("span",[a("img",{attrs:{src:"assets/codebase/media/various/link-label.svg",alt:""}})]),a("i",{staticClass:"fa fa-home"}),a("span",{staticClass:"sidebar-mini-hide"},[t._v("Dashboard")])])]),t.claims.recortar?a("router-link",{attrs:{tag:"li",to:"/cut-dossie","active-class":"active"}},[a("a",[a("span",[a("img",{attrs:{src:"assets/codebase/media/various/link-label.svg",alt:""}})]),a("i",{staticClass:"fa fa-crop"}),a("span",{staticClass:"sidebar-mini-hide"},[t._v("Recortar Dossiê")])])]):t._e(),t.claims.classificar?a("router-link",{attrs:{tag:"li",to:"/rate-dossie","active-class":"active"}},[a("a",[a("span",[a("img",{attrs:{src:"assets/codebase/media/various/link-label.svg",alt:""}})]),a("i",{staticClass:"fa fa-file-text-o"}),a("span",{staticClass:"sidebar-mini-hide"},[t._v("Classificar Dossiê")])])]):t._e()],1)])])])]),a("main",{attrs:{id:"main-container"}},[t.notLogged?t._e():a("div",{staticClass:"row py-10 px-20 bg-black-op-90 top-menu"},[a("div",{staticClass:"col-11 pl-20 pt-5 text-white text-right"},[a("h6",{staticClass:"mb-0"},[a("i",{staticClass:"fa fa-graduation-cap text-primary"}),a("span",{staticClass:"text-primary"},[t._v(" "+t._s(t.unity))])])]),a("div",{staticClass:"col-1 text-right"},[a("div",{staticClass:"btn-group",attrs:{role:"group"}},[t._m(2),a("div",{staticClass:"dropdown-menu mr-20 mt-10 text-center p-0 pb-10",attrs:{"aria-labelledby":"btnGroupDrop1"}},[a("p",{staticClass:"mb-0 py-5 bg-primary p-0 text-white"},[t._v("\n                          "+t._s(t.fullName)+"\n                      ")]),a("hr",{staticClass:"m-0 py-5 "}),a("router-link",{staticClass:"btn link-effect",attrs:{to:"/select-unity"},on:{click:function(e){t.changeUnity()}}},[t._v("\n                          Alterar unidade\n                      ")]),a("hr",{staticClass:"mb-0 py-2"}),a("a",{staticClass:"link-effect",on:{click:t.logout}},[t._v("\n                          Sair\n                      ")])],1)])])]),a("div",{staticClass:"content"},[a("router-view")],1)]),t._m(3)])},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content-header-section sidebar-mini-visible-b"},[a("span",{staticClass:"content-header-item font-w700 font-size-xl float-left animated fadeIn"},[a("span",{staticClass:"text-dual-primary-dark"},[t._v("c")]),a("span",{staticClass:"text-primary"},[t._v("b")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"btn btn-circle btn-dual-secondary d-lg-none align-v-r",attrs:{type:"button","data-toggle":"layout","data-action":"sidebar_close"}},[a("i",{staticClass:"fa fa-times text-danger"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{staticClass:"dropdown-toggle h4 mb-0 text-primary",attrs:{id:"btnGroupDrop1","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[a("i",{staticClass:"fa fa-user-circle-o"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("footer",{staticClass:"opacity-0",attrs:{id:"page-footer"}},[a("div",{staticClass:"content py-20 font-size-xs clearfix"})])}],r=(a("7f7f"),a("ac6a"),a("456d"),a("46f1")),l={login:function(t,e){return r["a"].post("/Account/Login",{UserName:t,Password:e})},logout:function(){window.localStorage.removeItem("token"),window.localStorage.removeItem("units"),window.localStorage.removeItem("claims"),window.localStorage.removeItem("fullName")},changeUnity:function(){window.localStorage.removeItem("units"),window.localStorage.removeItem("fullName")},recoveryPassword:function(t,e){return window.axios.post("/password/recovery",t).then(e).catch(c)},profile:function(){return r["a"].get("/profile")}},c=function(t){var e=null;t.response&&401===t.response.status&&t&&(e=t.response.data.errors[Object.keys(t.response.data.errors)[0]]),window.swal({type:"error",text:e||"Falha ao processar a requisição!",showConfirmButton:!1,toast:!0,timer:3e3})},u={data:function(){return{notLogged:!window.localStorage.token,logged:!1,tokenAccess:!1,claims:{recortar:!1,classificar:!1},fullName:window.localStorage.fullName,units:[],unity:"",selectedUnit:null,loadingLogin:!1}},methods:{logout:function(){l.logout(),this.notLogged=!0,this.$router.push("login"),this.selectedUnit=0},changeUnity:function(){return alert("asas"),this.notLogged=!0,this.$router.push("select-unity"),this.selectedUnit=0,window.location.assign("select-unity")},classStyle:function(){window.localStorage.token?this.notLogged=!1:this.notLogged=!0},loadClaims:function(){var t=this,e=JSON.parse(window.localStorage.claims);e.map(function(e){"Recortar"===e.ClaimType?t.claims.recortar=!0:"Classificar"===e.ClaimType&&(t.claims.classificar=!0)})},loadUnitsFromStorage:function(){try{var t=window.localStorage.selectedUnit;this.units=JSON.parse(window.localStorage.units),null===t||"undefined"===t||"Selecione"===t?this.selectedUnit="Selecione":(this.selectedUnit=this.units[window.localStorage.selectedUnit-1].unityId,this.unity=this.units[this.selectedUnit-1].name)}catch(t){window.swal({type:"error",text:"Não foi possível carregar as unidades."})}}},mounted:function(){this.loadClaims(),this.loadUnitsFromStorage()},created:function(){this.classStyle()},watch:{selectedUnit:function(t){window.localStorage.setItem("selectedUnit",t),this.$router.push("/home")}}},d=u,m=(a("e564"),a("2877")),f=Object(m["a"])(d,i,o,!1,null,"5a1724d0",null),p=f.exports,h=a("8c4f"),g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login-page"},[a("div",{staticClass:"hero-static col-lg-6 col-xl-4 mx-auto"},[a("div",{staticClass:"content content-full overflow-hidden"},[t._m(0),a("form",{staticClass:"js-validation-signin",attrs:{method:"post",novalidate:"novalidate"},on:{click:t.onSubmit}},[t.loadingLogin?a("div",{staticClass:"block block-themed block-rounded block-shadow"},[t._m(1),a("div",{staticClass:"block-content"},[a("div",{staticClass:"form-group row"},[a("div",{staticClass:"col-12"},[a("label",{attrs:{for:"login-username"}},[t._v("Usuário")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"text",id:"login-username",name:"login-username"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})])]),a("div",{staticClass:"form-group row"},[a("div",{staticClass:"col-12"},[a("label",{attrs:{for:"login-password"}},[t._v("Senha")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",id:"login-password",name:"login-password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})])]),a("div",{staticClass:"form-group row"},[a("div",{staticClass:"col-6 offset-3 text-center"},[a("button",{staticClass:"btn btn-block btn-alt-primary",attrs:{type:"submit",disabled:!t.numSelected()},on:{click:t.loadLogin}},[a("i",{staticClass:"si si-login mr-10"}),t._v(" Entrar\n                                ")])])])])]):a("div",{staticClass:"block block-themed block-rounded block-shadow"},[t._m(2),t._m(3)])])])])])},v=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"py-30 text-center bg-black-op-90"},[a("img",{staticClass:"img-fluid",attrs:{src:"assets/codebase/media/logo_tecfy.png",alt:"Tecfy - Business Solutions"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"block-header bg-gd-dusk"},[a("h3",{staticClass:"block-title"},[a("i",{staticClass:"fa fa-chevron-right mr-5"}),t._v(" Faça seu login para\n                            prosseguir")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"block-header bg-gd-dusk"},[a("h3",{staticClass:"block-title"},[a("i",{staticClass:"fa fa-chevron-right mr-5"}),t._v(" Carregando usuário")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"block-content bg-white"},[a("div",{staticClass:"form-group row"},[a("h2",{staticClass:"text-center mx-auto"},[a("i",{staticClass:"fa fa-spinner fa-spin"})])])])}],b=a("3d20"),w=a.n(b),C={name:"login",data:function(){return{email:"",password:"",loadingLogin:!0,validaForm:!1}},methods:{onSubmit:function(t){var e=this;if(this.error=null,t.preventDefault(),this.email&&this.password){var a=l.login(this.email,this.password);a.then(function(t){var a=t.data;e.loadLogin=!1;var s=a.result.access_token,n=a.result.name;if(!s)throw new Error;var i=a.result.claims,o=JSON.stringify(a.result.units);window.localStorage.setItem("token",s),window.localStorage.setItem("claims",i),window.localStorage.setItem("units",o),window.localStorage.setItem("fullName",n),r["a"].defaults.headers.common["Authorization"]="Bearer "+s,e.$router.push("/select-unity")}).catch(function(){e.loadingLogin=!0,e.email="",e.password="",w()({type:"error",text:"Usuário ou senha inválidos!",showConfirmButton:!1,toast:!0,position:"top-end",timer:3e3})})}},loadLogin:function(){this.loadLogin?this.loadingLogin=!1:this.loadingLogin=!0},numSelected:function(){return""!==this.email&&""!==this.password}}},y=C,_=Object(m["a"])(y,g,v,!1,null,null,null),k=_.exports,S=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},x=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("div",{staticClass:"block block-rounded bg-gd-dusk mt-50"},[a("div",{staticClass:"block-content bg-white-op-5"},[a("div",{staticClass:"py-30 text-center"},[a("h1",{staticClass:"font-w700 text-white mb-10"},[t._v("Dashboard")]),a("h2",{staticClass:"h4 font-w400 text-white-op"},[t._v("Bem-vindo ao sistema TecFy de Classificação de Dossiês.")])])])])])}],U={name:"home"},E=U,L=Object(m["a"])(E,S,x,!1,null,null,null),j=L.exports,A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"select-unity-page"},[a("div",{staticClass:"hero-static col-lg-6 col-xl-4 mx-auto"},[a("div",{staticClass:"content content-full overflow-hidden"},[t._m(0),a("form",{staticClass:"js-validation-signin",attrs:{method:"post",novalidate:"novalidate"}},[a("div",{staticClass:"block block-themed block-rounded block-shadow"},[t._m(1),a("div",{staticClass:"block-content"},[a("div",{staticClass:"form-group row"},[a("div",{staticClass:"col-12"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedUnit,expression:"selectedUnit"}],staticClass:"form-control",attrs:{id:"exampleFormControlSelect1"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.selectedUnit=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"0",disabled:"",selected:""}},[t._v("Selecione")]),t._l(t.units,function(e,s){return a("option",{key:s,domProps:{value:e.unityId}},[t._v(t._s(e.name))])})],2)])])])])])])])])},O=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"py-30 text-center bg-black-op-90"},[a("img",{staticClass:"img-fluid",attrs:{src:"assets/codebase/media/logo_tecfy.png",alt:"Tecfy - Business Solutions"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"block-header bg-gd-dusk"},[a("h3",{staticClass:"block-title"},[a("i",{staticClass:"fa fa-chevron-right mr-5"}),t._v(" Selecione a Unidade para prosseguir")])])}],$={name:"select-unity",data:function(){return{units:[],selectedUnit:0,notLogged:!1}},methods:{loadUnitsFromStorage:function(){try{window.localStorage.selectedUnit;this.units=JSON.parse(window.localStorage.units),0===this.selectedUnit?this.units.push("Selecione"):(this.selectedUnit=this.units[window.localStorage.selectedUnit-1].unityId,this.$router.push("/home"),this.notLogged=!1)}catch(t){}}},mounted:function(){this.loadUnitsFromStorage()},watch:{selectedUnit:function(t){return window.localStorage.setItem("selectedUnit",t),this.$router.push("/home"),this.notLogged=!0,window.location.reload()}}},N=$,T=Object(m["a"])(N,A,O,!1,null,null,null),P=T.exports;n["a"].use(h["a"]);var B=new h["a"]({routes:[{path:"/login",name:"login",component:k,meta:{requiresAuth:!1,enabled:!0}},{path:"/select-unity",name:"select-unity",component:P,meta:{requiresAuth:!1,enabled:!0}},{path:"/home",name:"home",component:j,meta:{requiresAuth:!0,enabled:!0}},{path:"/cut-dossie",component:function(){return a.e("2bf4").then(a.bind(null,"2bf4"))},meta:{requiresAuth:!0,enabled:!0,claim:"Recortar"}},{path:"/cut-selected/:id",component:function(){return a.e("chunk-da53").then(a.bind(null,"e063"))},meta:{requiresAuth:!0,enabled:!0,claim:"Recortar"}},{path:"/rate-dossie",component:function(){return a.e("c7de").then(a.bind(null,"c7de"))},meta:{requiresAuth:!0,enabled:!0,claim:"Classificar"}},{path:"/rate-dossie-selected/:id",component:function(){return a.e("chunk-2b49").then(a.bind(null,"a84d"))},meta:{requiresAuth:!0,enabled:!0,claim:"Classificar"}},{path:"/rate-dossie-selected-single/:id",component:function(){return a.e("70a8").then(a.bind(null,"70a8"))},meta:{requiresAuth:!0,enabled:!0,claim:"Classificar"}},{path:"/rate-dossie-selected-group/:id/:slice_id",component:function(){return a.e("70a8").then(a.bind(null,"70a8"))},meta:{requiresAuth:!0,enabled:!0,claim:"Classificar"}}]}),I=a("2f62");n["a"].use(I["a"]);var q=new I["a"].Store({state:{},mutations:{},actions:{}}),F=a("229e"),R=a.n(F),D=a("7bb1"),J=a("4a7a"),z=a.n(J),M=a("b6d0"),G=a("0576"),H=a.n(G),K=void 0;function Q(){var t=JSON.parse(window.localStorage.claims),e={Recortar:!1,Classificar:!1};return t.map(function(t){"Recortar"===t.ClaimType?e=Object(s["a"])({},e,{Recortar:!0}):"Classificar"===t.ClaimType&&(e=Object(s["a"])({},e,{Classificar:!0}))}),e}function V(t){if(t.meta.claim){var e=Q();return!!e[t.meta.claim]}return!0}D["a"].localize("pt_BR",R.a),n["a"].use(D["b"]),n["a"].config.productionTip=!1,n["a"].component("v-select",z.a),n["a"].directive("mask",M["a"]),n["a"].use(H.a),new n["a"]({router:B,store:q,render:function(t){return t(p)}}).$mount("#app"),B.beforeEach(function(t,e,a){if("/login"!==t.path)if(t.meta.enabled)if(t.meta.requiresAuth){var s=window.localStorage.token,n=V(t);s&&n?a():(a(e.path),K.logged&&w()({toast:!0,timer:3e3,type:"error",showConfirmButton:!1,title:"Acesso restrito."}))}else a();else w()({toast:!0,timer:3e3,showConfirmButton:!1,title:"Esta funcionalidade não está disponível no momento."}),a(e.path);else a()})},7580:function(t,e,a){},e564:function(t,e,a){"use strict";var s=a("7580"),n=a.n(s);n.a},f121:function(t,e,a){"use strict";e["a"]={apiUrl:"http://adm.tecnodim.tecfy.com.br/Api"}}});
//# sourceMappingURL=app.6368985a.js.map