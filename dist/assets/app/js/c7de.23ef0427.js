(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["c7de"],{c7de:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"cut-dossie"},[t._m(0),a("div",{staticClass:"block block-themed block-rounded shadow-lg"},[t._m(1),a("div",{staticClass:"block-content bg-primary"},[a("form",{attrs:{action:"",method:"post",onsubmit:"return false;"}},[a("div",{staticClass:"form-group row"},[a("div",{staticClass:"col-md-6"},[a("label",{staticClass:"col-12 pl-0 text-white h5 mb-2",attrs:{for:"registration-number"}},[t._v("Número da\n                            matrícula")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchRegistration,expression:"searchRegistration"},{name:"mask",rawName:"v-mask",value:"#####################",expression:"'#####################'"}],staticClass:"form-control form-control-lg",attrs:{type:"text",id:"registration-number",name:"example-text-input"},domProps:{value:t.searchRegistration},on:{input:function(s){s.target.composing||(t.searchRegistration=s.target.value)}}})]),a("div",{staticClass:"col-md-6"},[a("label",{staticClass:"col-12 pl-0 text-white h5 mb-2",attrs:{for:"student-name"}},[t._v("Nome do aluno")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchName,expression:"searchName"}],staticClass:"form-control form-control-lg",attrs:{type:"text",id:"student-name",name:"example-text-input"},domProps:{value:t.searchName},on:{input:function(s){s.target.composing||(t.searchName=s.target.value)}}})])])])])]),a("div",{staticClass:"block mt-50"},[a("div",{staticClass:"block-content"},[t.loadingDossies?a("div",[t._m(3)]):a("table",{staticClass:"table table-vcenter"},[t._m(2),a("tbody",t._l(t.filteredCustomers,function(s){return 3===s.statusId||4===s.statusId?a("tr",[a("th",{attrs:{scope:"row"}},[t._v(t._s(s.registration))]),a("td",[t._v(t._s(s.name))]),a("td",{staticClass:"text-center"},[3===s.statusId?a("span",{staticClass:"badge badge-danger"},[t._v("Não iniciado")]):t._e(),4===s.statusId?a("span",{staticClass:"badge badge-warning"},[t._v("Iniciado")]):t._e()]),a("td",{staticClass:"text-right"},[a("div",{staticClass:"btn-group"},[3===s.statusId?a("router-link",{staticClass:"btn btn-lg btn-success js-tooltip-enabled",attrs:{to:"/rate-dossie-selected-single/"+s.documentId,"data-title":"Iniciar classificação"}},[a("i",{staticClass:"fa fa-file-text-o"})]):t._e()],1),a("div",{staticClass:"btn-group"},[4===s.statusId?a("router-link",{staticClass:"btn btn-lg btn-success js-tooltip-enabled",attrs:{to:"/rate-dossie-selected-single/"+s.documentId,"data-title":"Iniciar classificação"}},[a("i",{staticClass:"fa fa-file-text-o"})]):t._e()],1)])]):t._e()}))])])])])},i=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",{staticClass:"content-heading"},[a("i",{staticClass:"si si-arrow-left"}),a("span",{staticClass:"h3"},[t._v("Dossiês à classificar")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"block-header bg-gd-emerald shadow"},[a("h5",{staticClass:"text-black mb-0"},[t._v("Utilize a busca abaixo para localizar um dossiê por matrícula ou por\n                nome.")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("thead",{staticClass:"thead-light mb-50"},[a("tr",{staticClass:"p-50"},[a("th",{staticClass:"py-20",staticStyle:{width:"15%"}},[a("b",[t._v("Matrícula")])]),a("th",{staticClass:"py-20",staticStyle:{width:"45%"}},[a("b",[t._v("Nome")])]),a("th",{staticClass:"py-20",staticStyle:{width:"20%"}}),a("th",{staticClass:"py-20",staticStyle:{width:"15%"}}),a("th",{staticClass:"py-20",staticStyle:{width:"15%"}})])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("h2",{staticClass:"text-center"},[a("i",{staticClass:"fa fa-spinner fa-spin"})])}],n=(a("7f7f"),a("46f1")),o={data:function(){return{searchResult:[],searchField:"",loadingDossies:!0,searchName:"",searchRegistration:""}},methods:{getDocumentClassificateds:function(){var t=this,s=window.localStorage.selectedUnit;this.loadingDossies=!0,n["a"].get("/Documents/getDocumentClassificateds/?unityId="+s).then(function(s){var a=s.data;t.loadingDossies=!1,t.searchResult=a.result})}},computed:{filteredCustomers:function(){var t=this;return this.searchResult.filter(function(s){return t.searchName.length>0?s.name.toLowerCase().indexOf(t.searchName.toLowerCase())>=0:s.registration.toLowerCase().indexOf(t.searchRegistration.toLowerCase())>=0})}},mounted:function(){this.getDocumentClassificateds()}},r=o,c=a("2877"),l=Object(c["a"])(r,e,i,!1,null,null,null);s["default"]=l.exports}}]);
//# sourceMappingURL=c7de.23ef0427.js.map