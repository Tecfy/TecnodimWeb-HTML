(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b7f092a"],{"02f4":function(t,e,s){var a=s("4588"),i=s("be13");t.exports=function(t){return function(e,s){var n,l,o=String(i(e)),r=a(s),c=o.length;return r<0||r>=c?t?"":void 0:(n=o.charCodeAt(r),n<55296||n>56319||r+1===c||(l=o.charCodeAt(r+1))<56320||l>57343?t?o.charAt(r):n:t?o.slice(r,r+2):l-56320+(n-55296<<10)+65536)}}},"0390":function(t,e,s){"use strict";var a=s("02f4")(!0);t.exports=function(t,e,s){return e+(s?a(t,e).length:1)}},"0bfb":function(t,e,s){"use strict";var a=s("cb7c");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"214f":function(t,e,s){"use strict";s("b0c5");var a=s("2aba"),i=s("32e9"),n=s("79e5"),l=s("be13"),o=s("2b4c"),r=s("520a"),c=o("species"),d=!n(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),u=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var s="ab".split(t);return 2===s.length&&"a"===s[0]&&"b"===s[1]}();t.exports=function(t,e,s){var h=o(t),p=!n(function(){var e={};return e[h]=function(){return 7},7!=""[t](e)}),f=p?!n(function(){var e=!1,s=/a/;return s.exec=function(){return e=!0,null},"split"===t&&(s.constructor={},s.constructor[c]=function(){return s}),s[h](""),!e}):void 0;if(!p||!f||"replace"===t&&!d||"split"===t&&!u){var g=/./[h],m=s(l,h,""[t],function(t,e,s,a,i){return e.exec===r?p&&!i?{done:!0,value:g.call(e,s,a)}:{done:!0,value:t.call(s,e,a)}:{done:!1}}),v=m[0],b=m[1];a(String.prototype,t,v),i(RegExp.prototype,h,2==e?function(t,e){return b.call(t,this,e)}:function(t){return b.call(t,this)})}}},2169:function(t,e,s){},"36bd":function(t,e,s){"use strict";var a=s("4bf8"),i=s("77f1"),n=s("9def");t.exports=function(t){var e=a(this),s=n(e.length),l=arguments.length,o=i(l>1?arguments[1]:void 0,s),r=l>2?arguments[2]:void 0,c=void 0===r?s:i(r,s);while(c>o)e[o++]=t;return e}},"47a7":function(t,e,s){(function(e,s){t.exports=s()})(0,function(){return function(t){var e={};function s(a){if(e[a])return e[a].exports;var i=e[a]={i:a,l:!1,exports:{}};return t[a].call(i.exports,i,i.exports,s),i.l=!0,i.exports}return s.m=t,s.c=e,s.i=function(t){return t},s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:a})},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=1)}([function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){var s=[],a=!0,i=!1,n=void 0;try{for(var l,o=t[Symbol.iterator]();!(a=(l=o.next()).done);a=!0)if(s.push(l.value),e&&s.length===e)break}catch(r){i=!0,n=r}finally{try{!a&&o["return"]&&o["return"]()}finally{if(i)throw n}}return s}return function(e,s){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,s);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=function(){function t(t,e){for(var s=0;s<e.length;s++){var a=e[s];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,s,a){return s&&t(e.prototype,s),a&&t(e,a),e}}(),n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t){if(arguments.length>1)for(var e=1;e<arguments.length;e++)if("object"===n(arguments[e])&&null!==arguments[e])for(var s=Object.keys(arguments[e]),a=0;a<s.length;a++)t[s[a]]=arguments[e][s[a]];return t}e.objectAssignSimple=o;var r=Object.assign||o,c=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};l(this,t),this.selectBox=null,this.selectBoxSelector=".selection",this.rootElement=document,this.boundingBox=document,this.boundingBoxSelector=null,this.dragging=!1,this.startX=null,this.startY=null,this.endX=null,this.endY=null,this.selectables=[],this.selected=[],this.selectedSetter=null,this.selectedGetter=null,this.selectingSetter=null,this.selecting=[],this.addMode=!1,this.disableTextSelection=!0,this.handlers={mousedown:null,mouseup:null,mousemove:null},this.scrollingFrame=null,this.scrollSpeed=10,this.scrollDistance=10,this.scrollDocumentEnabled=!0,this.scrollRepeater=null,this.renderSelected=!1,this.renderSelecting=!1,this.overrideAddMode=!1,this.selectingClass="selecting",this.selectedClass="selected",this.firstRun=!0,this.handlers.mousedown=this.mouseDown.bind(this),this.handlers.mouseup=this.mouseUp.bind(this),this.handlers.mousemove=this.mouseMove.bind(this),r(this,e),this.attach()}return i(t,[{key:"attach",value:function(){var t=this;this.rootElement&&Object.keys(this.handlers).forEach(function(e){return t.rootElement.addEventListener(e,t.handlers[e])})}},{key:"detach",value:function(){var e=this;Object.keys(this.handlers).forEach(function(t){return e.rootElement.removeEventListener(t,e.handlers[t])}),this.disableTextSelection&&this.dragging&&this.rootElement.removeEventListener("selectstart",t.disableTextSelection),this.scrollRepeater&&clearInterval(this.scrollRepeater),this.selectables=[],this.selectBox=null,this.boundingBox=null,this.rootElement=null,this.scrollingFrame=null}},{key:"setSelectables",value:function(t){this.selectables=t,this.selected=t.map(function(t){return!1}),"function"===typeof this.selectedSetter&&this.selectedSetter(this.selected,this.selected)}},{key:"mouseDown",value:function(e){if(0===e.button){this.boundingBoxSelector&&(this.boundingBox=document.querySelector(this.boundingBoxSelector));var s=t.absBox(this.boundingBox);if(!(e.pageX<s.left||e.pageX>s.width+s.left||e.pageY<s.top||e.pageY>s.height+s.top)){this.disableTextSelection&&this.rootElement.addEventListener("selectstart",t.disableTextSelection),this.scrollRepeater&&(clearInterval(this.scrollRepeater),this.scrollRepeater=null);var i=this.bound(e),n=a(i,2),l=n[0],o=n[1];if(this.selectBox=document.querySelector(this.selectBoxSelector),this.scrollingFrame&&(o+=this.scrollingFrame.scrollTop),this.startX=l,this.startY=o,this.endX=l,this.endY=o,this.dragging=!0,this.selecting=this.selectables.map(function(t){return!1}),"function"===typeof this.selectingSetter&&this.selectingSetter(this.selecting),this.addMode=this.overrideAddMode||e.ctrlKey||e.metaKey,this.addMode){if("function"===typeof this.selectedGetter){var r=this.selectedGetter()||[];this.selected=this.selectables.map(function(t,e){return!!r[e]})}}else this.selected=this.selecting,"function"===typeof this.selectedSetter&&this.selectedSetter(this.selected,this.selecting);this.updateSelection(),this.render()}}}},{key:"mouseUp",value:function(e){var s=this;if(this.dragging){if(0!==e.button)return;this.disableTextSelection&&this.rootElement.removeEventListener("selectstart",t.disableTextSelection);var i=this.bound(e),n=a(i,2),l=n[0],o=n[1];if(this.endX=l,this.endY=o,this.scrollingFrame&&(this.endY+=this.scrollingFrame.scrollTop),this.scrollRepeater&&(clearInterval(this.scrollRepeater),this.scrollRepeater=null),this.dragging=!1,this.updateSelection(),"function"===typeof this.selectedGetter){var r=this.selectedGetter()||[];this.selected=this.selectables.map(function(t,e){return!!r[e]})}if(this.addMode){var c=this.selecting.reduce(function(t,e){return t+e?1:0},0),d=this.selecting.findIndex(function(t){return!!t});1===c&&this.selected[d]?this.selected[d]=!1:this.selected=this.selected.map(function(t,e){return t||s.selecting[e]})}else this.selected=this.selecting;"function"===typeof this.selectedSetter&&this.selectedSetter(this.selected,this.selecting),this.selecting=[],this.selectingSetter&&this.selectingSetter(this.selecting),this.render()}}},{key:"mouseMove",value:function(t){if(this.dragging){var e=this.bound(t),s=a(e,2),i=s[0],n=s[1];this.endX=i,this.endY=n,this.scrollRepeater&&(clearInterval(this.scrollRepeater),this.scrollRepeater=null),this.scrollingFrame?this.endY+=this.scrollFrame(t):this.scrollDocumentEnabled&&this.scrollDocument(t),this.updateSelection(),this.render()}}},{key:"scrollFrame",value:function(t){var e=this,s=this.scrollingFrame,a=s.getBoundingClientRect(),i=0;return t.pageY>=a.bottom-this.scrollDistance?i=this.scrollSpeed:t.pageY<=a.top+this.scrollDistance&&(i=-this.scrollSpeed),s.scrollTop+=i,(t.pageY>=a.bottom||t.pageY<=a.top)&&(this.scrollRepeater&&clearInterval(this.scrollRepeater),this.scrollRepeater=setInterval(function(){return e.mouseMove(t)},16)),s.scrollTop}},{key:"scrollDocument",value:function(t){var e=this,s=0;this.endY<=window.pageYOffset?s=-this.scrollSpeed:this.endY>=window.pageYOffset+window.innerHeight&&(s=this.scrollSpeed),0!==s&&(window.scrollBy(0,s),this.scrollRepeater&&clearInterval(this.scrollRepeater),this.scrollRepeater=setInterval(function(){return e.mouseMove(t)},16))}},{key:"bound",value:function(e){var s=t.absBox(this.boundingBox);return[Math.min(Math.max(s.left,e.pageX),s.width+s.left),Math.min(Math.max(s.top,e.pageY),s.height+s.top)]}},{key:"updateSelection",value:function(){var e=this.getSelectionBox();e.top-=this.scrollingFrame?this.scrollingFrame.scrollTop:0,this.selecting=this.selectables.map(t.absBox).map(function(t){return Math.abs(2*(e.left-t.left)+e.width-t.width)<e.width+t.width&&Math.abs(2*(e.top-t.top)+e.height-t.height)<e.height+t.height}),this.selectingSetter&&this.selectingSetter(this.selecting)}},{key:"getSelectionBox",value:function(){return{left:Math.min(this.startX,this.endX),top:Math.min(this.startY,this.endY),width:Math.abs(this.startX-this.endX),height:Math.abs(this.startY-this.endY)}}},{key:"renderSelection",value:function(){var t=this;(this.renderSelected||this.renderSelecting)&&this.selectables.forEach(function(e,s){t.renderSelecting&&(t.dragging&&t.selecting[s]?e.classList.add(t.selectingClass):e.classList.remove(t.selectingClass)),t.renderSelected&&(t.selected[s]?e.classList.add(t.selectedClass):e.classList.remove(t.selectedClass))})}},{key:"render",value:function(){var e=this.selectBox.style;if(this.dragging){var s=this.getSelectionBox(),a=t.absBox(this.boundingBox);if(e.display="block",this.firstRun){var i=t.absBox(this.selectBox);this.selectBoxStartX=a.left-i.left,this.selectBoxStartY=a.top-i.top,this.firstRun=!1}e.left=s.left-a.left+this.selectBoxStartX+"px",e.top=s.top-a.top+this.selectBoxStartY-(this.scrollingFrame?this.scrollingFrame.scrollTop:0)+"px",e.width=s.width+"px",e.height=s.height+"px"}else e.display="none";this.renderSelection()}}],[{key:"disableTextSelection",value:function(t){return t.preventDefault(),!1}},{key:"absBox",value:function(t){var e=t.getBoundingClientRect();return{top:e.top+window.pageYOffset,left:e.left+window.pageXOffset,width:e.width,height:e.height}}}]),t}();e.default=c},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.setSelectableItems=c,e.setOptions=d;var a=s(0),i=n(a);function n(t){return t&&t.__esModule?t:{default:t}}var l=Object.assign||a.objectAssignSimple;function o(t,e,s){t.selectable=new i.default(l({boundingBox:e.constraint?document.querySelector(e.constraint):t,selectBoxSelector:e.box||".selection",boundingBoxSelector:e.constraint},s)),t.selectable.setSelectables(Array.prototype.slice.call(t.querySelectorAll(e.items||".selectable")))}var r={twoWay:!1,params:["items","box","constraint"],bind:function(t,e){var s=void 0,a=void 0;t&&e&&(s=e.value,a=t.dataset,o(t,a,s))},update:function(t){this&&this.el&&!this.el.selectable&&o(this.el,this.el.dataset,t)},unbind:function(t){t||(t=this.el),t.selectable.detach(),t.selectable=null}};function c(t,e){if(t&&t.selectable&&"function"===typeof t.selectable.setSelectables){var s=Array.prototype.slice.call(t.querySelectorAll(e||t.dataset.items||".selectable"));return t.selectable.setSelectables(s),s.length}return-1}function d(t,e){if(t&&t.selectable&&"function"===typeof t.selectable.setSelectables){var s=null==t.selectable.rootElement&&null!=e.rootElement;l(t.selectable,e),s&&t.selectable.attach()}}e.default=r}])})},"4f73":function(t,e,s){"use strict";var a=s("2169"),i=s.n(a);i.a},"520a":function(t,e,s){"use strict";var a=s("0bfb"),i=RegExp.prototype.exec,n=String.prototype.replace,l=i,o="lastIndex",r=function(){var t=/a/,e=/b*/g;return i.call(t,"a"),i.call(e,"a"),0!==t[o]||0!==e[o]}(),c=void 0!==/()??/.exec("")[1],d=r||c;d&&(l=function(t){var e,s,l,d,u=this;return c&&(s=new RegExp("^"+u.source+"$(?!\\s)",a.call(u))),r&&(e=u[o]),l=i.call(u,t),r&&l&&(u[o]=u.global?l.index+l[0].length:e),c&&l&&l.length>1&&n.call(l[0],s,function(){for(d=1;d<arguments.length-2;d++)void 0===arguments[d]&&(l[d]=void 0)}),l}),t.exports=l},"5f1b":function(t,e,s){"use strict";var a=s("23c6"),i=RegExp.prototype.exec;t.exports=function(t,e){var s=t.exec;if("function"===typeof s){var n=s.call(t,e);if("object"!==typeof n)throw new TypeError("RegExp exec method returned something other than an Object or null");return n}if("RegExp"!==a(t))throw new TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},"6c7b":function(t,e,s){var a=s("5ca1");a(a.P,"Array",{fill:s("36bd")}),s("9c6c")("fill")},a481:function(t,e,s){"use strict";var a=s("cb7c"),i=s("4bf8"),n=s("9def"),l=s("4588"),o=s("0390"),r=s("5f1b"),c=Math.max,d=Math.min,u=Math.floor,h=/\$([$&`']|\d\d?|<[^>]*>)/g,p=/\$([$&`']|\d\d?)/g,f=function(t){return void 0===t?t:String(t)};s("214f")("replace",2,function(t,e,s,g){return[function(a,i){var n=t(this),l=void 0==a?void 0:a[e];return void 0!==l?l.call(a,n,i):s.call(String(n),a,i)},function(t,e){var i=g(s,t,this,e);if(i.done)return i.value;var u=a(t),h=String(this),p="function"===typeof e;p||(e=String(e));var v=u.global;if(v){var b=u.unicode;u.lastIndex=0}var C=[];while(1){var x=r(u,h);if(null===x)break;if(C.push(x),!v)break;var y=String(x[0]);""===y&&(u.lastIndex=o(h,n(u.lastIndex),b))}for(var w="",k=0,S=0;S<C.length;S++){x=C[S];for(var _=String(x[0]),P=c(d(l(x.index),h.length),0),E=[],I=1;I<x.length;I++)E.push(f(x[I]));var A=x.groups;if(p){var B=[_].concat(E,P,h);void 0!==A&&B.push(A);var R=String(e.apply(void 0,B))}else R=m(_,h,P,E,A,e);P>=k&&(w+=h.slice(k,P)+R,k=P+_.length)}return w+h.slice(k)}];function m(t,e,a,n,l,o){var r=a+t.length,c=n.length,d=p;return void 0!==l&&(l=i(l),d=h),s.call(o,d,function(s,i){var o;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,a);case"'":return e.slice(r);case"<":o=l[i.slice(1,-1)];break;default:var d=+i;if(0===d)return s;if(d>c){var h=u(d/10);return 0===h?s:h<=c?void 0===n[h-1]?i.charAt(1):n[h-1]+i.charAt(1):s}o=n[d-1]}return void 0===o?"":o})}})},b0c5:function(t,e,s){"use strict";var a=s("520a");s("5ca1")({target:"RegExp",proto:!0,forced:a!==/./.exec},{exec:a})},e063:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"cut-dossie"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-8"},[s("p",{staticClass:"content-heading pt-0"},[s("i",{staticClass:"si si-arrow-left"}),s("span",{staticClass:"h3"},[t._v("Recortar Dossiê")]),s("router-link",{staticClass:"btn btn-dark btn-lg float-right shadow-sm text-uppercase",attrs:{to:"/cut-dossie/"}},[s("i",{staticClass:"fa fa-arrow-left mr-10"}),t._v(" Voltar\n        ")])],1)])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-8 left-content"},[s("div",{staticClass:"block block-rounded shadow-sm pb-10 block-thumbails"},[s("div",{staticClass:"block-header"},[s("h3",{staticClass:"block-title"},[s("strong",[t._v("Recortes Pendentes\n            "),s("span",[t._v("("+t._s(t.numPendingPages())+")")])])])]),t.loading.pagesPdf?s("div",[t._m(1)]):s("div",{staticClass:"block-content"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 px-0"},[s("div",{directives:[{name:"selectable",rawName:"v-selectable",value:{selectedGetter:t.selectedGetter,selectedSetter:t.selectedSetter,selectingSetter:t.selectingSetter},expression:"{ selectedGetter, selectedSetter, selectingSetter }"}],staticClass:"container",attrs:{id:"vsel"}},[s("div",{staticClass:"row gutters-tiny js-gallery"},t._l(t.pages,function(e,a){return s("div",{key:a,staticClass:" col-sm-6 col-xl-3 mb-30 card-thumb",class:{selected:!!t.selected[a],selecting:!!t.selecting[a]}},[s("img",{staticClass:"selectable img-fluid shadow",attrs:{width:"200",src:t.pathThumb.replace("{0}",e),alt:"Pdf thumbnail",draggable:"false"},on:{mouseover:function(e){t.zoomImg("out")}}}),t._m(0,!0),s("div",{staticClass:"col-12"},[s("div",{staticClass:"zoom-content text-center"},[s("button",{staticClass:"btn btn-alt-primary btn-md px-4 text-uppercase my-5",attrs:{"data-toggle":"modal","data-target":"#modalZoomImg"},on:{click:function(s){t.zoomImg(e)},mouseover:function(e){t.zoomImg("over")}}},[s("i",{staticClass:"fa fa-search-plus"})])])])])}),0),s("div",{staticClass:"selection",attrs:{id:"selection-area"}})])])])])]),s("div",{staticClass:"block block-rounded shadow-sm pb-10 block-group",on:{mouseover:function(e){t.zoomImg("over")}}},[s("div",{staticClass:"block-header"},[s("h3",{staticClass:"block-title"},[s("strong",[t._v("Recortes Realizados\n            "),s("span",[t._v(" ("+t._s(t.numGroupCreated())+")")])])])]),t.loading.slicesCategory?s("div",[t._m(2)]):s("div",{staticClass:"block-content pt-0 pb-20",attrs:{"data-toggle":"slimscroll","data-height":"160px","data-color":"#37b78c","data-opacity":"1","data-size":"8px","data-always-visible":"true","data-rail-visible":"true","data-rail-color":"#eee","data-rail-opacity":"1"}},[s("div",{staticClass:"row"},t._l(t.slices,function(e,a){return s("div",{key:a,staticClass:"col-md-3"},[s("button",{staticClass:"btn btn-block btn-outline-primary my-3 text-left",attrs:{type:"button",title:e.name}},[s("i",{staticClass:"fa fa-folder mr-5"}),s("span",{staticClass:"text-black"},[t._v(t._s(e.name))])])])}),0)])])]),s("div",{staticClass:"col-md-4 right-content"},[s("div",{staticClass:"block block-rounded shadow bg-primary student-data "},[t._m(3),s("div",{staticClass:"block-content"},[s("p",{staticClass:"text-white"},[s("i",{staticClass:"fa fa-file-text-o mr-10"}),s("strong",[t._v("Número da\n            Matrícula:")]),t._v(" "+t._s(t.student.registration))]),s("p",{staticClass:"text-white"},[s("i",{staticClass:"fa fa-user mr-10"}),s("strong",[t._v("Nome:")]),t._v(" "+t._s(t.student.name)+"\n          ")]),s("p",{staticClass:"text-white"},[s("i",{staticClass:"fa fa-building mr-10"}),s("strong",[t._v("Unidade:")]),t._v("\n            "+t._s(t.student.unity))]),s("p",{staticClass:"text-white"},[s("i",{staticClass:"fa fa-graduation-cap mr-1"}),s("strong",[t._v("Curso:")]),t._v("\n            "+t._s(t.student.course))])])]),s("div",{staticClass:"block block-themed block-rounded shadow actions-content"},[t._m(4),s("div",{staticClass:"block-content bg-primary pt-30 pb-10"},[s("div",{staticClass:"form-group row actions-selected"},[s("div",{staticClass:"col-md-6"},[s("button",{staticClass:"btn btn-sm btn-block btn-gray-300 mr-5 mb-5 shadow",attrs:{type:"button"}},[s("b",[t._v("Selecionados: ")]),s("span",[t._v(t._s(t.numSelected()))])])]),s("div",{staticClass:"col-md-6"},[s("button",{staticClass:"btn btn-sm btn-block btn-gray-500 text-black mr-5 mb-5 shadow",attrs:{type:"button"}},[s("b",[t._v("Recortados: ")]),s("span",[t._v(t._s(t.numGroupCreated()))])])])]),s("div",{staticClass:"form-group row"},[t._m(5),s("div",{staticClass:"col-12 pt-20"},[s("button",{staticClass:"btn btn-alt-primary btn-lg btn-block text-uppercase",attrs:{type:"button","data-toggle":"modal","data-target":"#modalGroup",disabled:!t.numSelected()},on:{click:t.openModal}},[s("i",{staticClass:"fa fa-crop"}),t._v(" Recortar\n              ")])]),s("div",{staticClass:"col-12 pt-20 mt-5"},[s("button",{staticClass:"btn btn-alt-primary btn-lg btn-block text-uppercase",attrs:{type:"submit","data-toggle":"modal","data-target":"#modal-del-pages",disabled:!t.numSelected()},on:{click:t.openModal}},[s("i",{staticClass:"fa fa-trash"}),t._v(" Deletar\n              ")])])])])])])]),s("div",{ref:"modalTeste",staticClass:"modal fade",attrs:{id:"modalGroup",tabindex:"-1",role:"dialog","aria-labelledby":"modalGroup","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-dialog-slideup",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[s("form",[s("div",{staticClass:"block block-themed block-transparent mb-0 "},[s("div",{staticClass:"block-header p-0 pt-10 mb-30"},[t._m(6),s("div",{staticClass:"block-options mr-15"},[s("button",{staticClass:"btn-block-option text-dark",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"},on:{click:t.allowSelectPages}},[t._m(7)])])]),s("div",{staticClass:"block-content pt-0"},[s("div",{staticClass:"block block-themed block-rounded shadow actions-content"},[s("div",{staticClass:"block-header bg-white shadow"},[s("h4",{staticClass:"block-title text-center text-dark"},[t._v("Você tem "),s("strong",[t._v(t._s(t.numSelected()))]),t._v(" página"+t._s(t.pluralAditional())+" selecionada"+t._s(t.pluralAditional())+".")])])]),t._m(8),s("div",{staticClass:"form-group mb-3"},[s("label",{staticClass:"mr-2 font-weight-bold",attrs:{for:"newSlice"}},[t._v(t._s(t.slices.length+1)+" - ")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newGroupName,expression:"newGroupName"}],ref:"identificationField",staticClass:"form-control",attrs:{type:"text",placeholder:"Digite aqui...",tabindex:"1",id:"newSlice"},domProps:{value:t.newGroupName},on:{input:function(e){e.target.composing||(t.newGroupName=e.target.value)}}})])])]),s("div",{staticClass:"modal-footer text-center"},[s("button",{staticClass:"btn-dark btn-lg shadow-sm text-uppercase",attrs:{type:"submit","data-dismiss":"modal"},on:{click:function(e){t.createGroup()}}},[s("i",{staticClass:"si si-check mr-10"}),t._v(" Salvar Grupo\n            ")])])])])])]),s("div",{staticClass:"modal fade",attrs:{id:"modal-del-pages",tabindex:"-1",role:"dialog","aria-labelledby":"modal-del-pages","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-dialog-slideup",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[s("div",{staticClass:"block block-themed block-transparent mb-0 "},[s("div",{staticClass:"block-header p-0 pt-10 mb-30"},[t._m(9),s("div",{staticClass:"block-options mr-15"},[s("button",{staticClass:"btn-block-option text-dark",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"},on:{click:t.allowSelectPages}},[t._m(10)])])]),s("div",{staticClass:"block-content pt-0"},[s("div",{staticClass:"block block-themed block-rounded shadow actions-content"},[s("div",{staticClass:"block-header bg-white shadow"},[s("h4",{staticClass:"block-title text-center text-dark"},[t._v("Você tem "),s("strong",[t._v(t._s(t.numSelected()))]),t._v(" página"+t._s(t.pluralAditional())+" selecionada"+t._s(t.pluralAditional())+".")])])]),s("h6",{staticClass:"mb-20 mt-50"},[t._m(11),t._v("\n              Você tem "),s("b",[t._v("certeza")]),t._v(" que deseja exluir a"+t._s(t.pluralAditional())+" página"+t._s(t.pluralAditional())+"?\n            ")])])]),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn-dark btn-lg float-right shadow-sm text-uppercase",attrs:{type:"button","data-dismiss":"modal"},on:{click:t.deletePages}},[s("i",{staticClass:"si si-check mr-10"}),t._v(" Apagar\n            página"+t._s(t.pluralAditional())+"\n          ")])])])])]),s("div",{ref:"modalZoomImg",staticClass:"modal fade",attrs:{id:"modalZoomImg",tabindex:"-1",role:"dialog","aria-labelledby":"modalZoomImg","aria-hidden":"true"}},[t.loadImg?s("div",{staticClass:"col-1 loadImg vertical-align mx-auto"},[s("i",{staticClass:"fa fa-spinner fa-spin fa-4x text-white"})]):t._e(),s("a",{directives:[{name:"show",rawName:"v-show",value:t.activePrevArrow,expression:"activePrevArrow"}],staticClass:"btn btn-lg btn-alt-primary pt-3 nav prev vertical-align pl-20 mb-50",attrs:{"data-nav":"prev","data-toggle":"cropper","data-method":"prevPage",title:"Voltar página"},on:{click:function(e){t.navPage("prev")}}},[s("i",{staticClass:"fa fa-angle-double-left"})]),s("a",{directives:[{name:"show",rawName:"v-show",value:t.activeNextArrow,expression:"activeNextArrow"}],staticClass:"btn btn-lg btn-alt-primary pt-3 nav next vertical-align pl-20 mb-50",attrs:{"data-nav":"next","data-toggle":"cropper","data-method":"nextPage",title:"Avançar página"},on:{click:function(e){t.navPage("next")}}},[s("i",{staticClass:"fa fa-angle-double-right"})]),s("div",{staticClass:"block-options mr-15 pull-right"},[s("button",{staticClass:"btn-block-option btn-close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"},on:{click:t.allowSelectPages}},[s("i",{staticClass:"si si-close fa-3x text-white"})])]),s("div",{staticClass:"modal-dialog modal-dialog-slideup modal-lg",attrs:{role:"document"}},[s("div",{staticClass:"text-center"},[s("img",{directives:[{name:"show",rawName:"v-show",value:!t.loadImg,expression:"!loadImg"}],staticClass:"img-fluid",attrs:{src:t.linkImg},on:{load:t.imgLoaded}})])])])])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-group"},[s("div",{staticClass:"custom-control custom-checkbox custom-control-inline"},[s("input",{staticClass:"custom-control-input",attrs:{title:"check",type:"checkbox"}}),s("label",{staticClass:"custom-control-label"})])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h2",{staticClass:"text-center"},[s("i",{staticClass:"fa fa-spinner fa-spin"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h2",{staticClass:"text-center"},[s("i",{staticClass:"fa fa-spinner fa-spin"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"block-header"},[s("h4",{staticClass:"block-title text-center text-white"},[t._v("Dados do aluno")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"block-header bg-gd-emerald shadow"},[s("h4",{staticClass:"block-title text-center text-white"},[t._v("Ações")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-12 mt-5"},[s("hr")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",{staticClass:"text-white mx-auto pt-10 pl-50"},[s("b",[t._v("Identificar novo recorte")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h5",[s("i",{staticClass:"si si-close"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h6",{staticClass:"mb-10 mt-50"},[s("small",[s("i",{staticClass:"fa fa-chevron-right"})]),t._v("\n                Digite o "),s("b",[t._v("nome ")]),t._v("para identificação do novo recorte.\n              ")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h4",{staticClass:"text-white mx-auto pt-10 pl-50"},[s("b",[t._v("Deletar seleção?")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h5",[s("i",{staticClass:"si si-close"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("small",[s("i",{staticClass:"fa fa-chevron-right"})])}],n=(s("7f7f"),s("6c7b"),s("a481"),s("cadf"),s("551c"),s("097d"),s("47a7")),l=s.n(n),o=s("46f1"),r=s("f121"),c=s("3d20"),d=s.n(c),u={data:function(){return{selected:[],selecting:[],selectable:[],loading:{pagesPdf:!0,slicesCategory:!0},pages:[],path:"",pathThum:"",student:{name:"-",unity:"-",course:"-",registration:"-"},cutGroups:[],newGroupName:"",selectPage:!1,apiUrl:r["a"].apiUrl,slices:[],linkImg:"",linkPos:null,loadImg:!1,activeNextArrow:!0,activePrevArrow:!0}},methods:{zoomImg:function(t){var e=this;this.loadImg=!0;var s=this.pages.length-1;"over"===t?this.selectPage=!0:"out"===t?this.selectPage=!1:(this.linkImg=this.path.replace("{0}",t),this.loadImg=!1,this.linkPos=t,this.selectPage=!0,$("#modalZoomImg").modal({backdrop:"static"})),this.pages.map(function(t,a){e.linkPos===t&&(e.activePrevArrow=0!==a,e.activeNextArrow=a!==s)})},imgLoaded:function(){this.loadImg=!1},navPage:function(t){var e=this,s=this.pages.length;this.loadImg=!0,"prev"===t&&this.linkPos>0&&(this.linkPos--,this.linkImg=this.path.replace("{0}",this.linkPos)),"next"===t&&this.linkPos<s&&(this.linkPos++,this.linkImg=this.path.replace("{0}",this.linkPos)),this.pages.map(function(t,a){e.linkPos===t&&(e.activePrevArrow=0!==a,e.activeNextArrow=a!==s-1)})},getDetails:function(){var t=this,e=this.$route.params.id;o["default"].get("/documentDetails/GetDocumentDetailByDocumentId/"+e).then(function(e){var s=e.data;!0===s.success&&(t.student=s.result)})},getPdf:function(){var t=this,e=this.$route.params.id;this.loading.pagesPdf=!0,o["default"].get("/PDFs/GetPDFs/"+e).then(function(e){var s=e.data;if(!s.success){var a=s.messages[0];return d()({text:a,timer:3e3,type:"error"}).then(function(){return t.$router.push("/cut-dossie")})}t.pages=s.result.pages,t.path=s.result.path,t.pathThumb=s.result.pathThumb,t.loading.pagesPdf=!1})},getSlices:function(){var t=this,e=this.$route.params.id;this.loading.slicesCategory=!0,o["default"].get("/slices/getSlicesByDocumentId/"+e).then(function(e){var s=e.data;t.slices=s.result,t.loading.slicesCategory=!1})},selectedGetter:function(){return this.selected},selectedSetter:function(t){this.selectPage||(this.selected=t)},selectingSetter:function(t){this.selectPage||(this.selecting=t)},createGroup:function(){var t=this,e=[],s=[];this.pages.map(function(a,i){var n=t.selected[i];n?e.push(t.pages[i]):s.push(t.pages[i])}),this.pages=s;var a={name:this.slices.length+1+" - "+this.newGroupName,items:e};return this.cutGroups.push(a),this.selected=Array(this.pages.length).fill(!1),this.newGroupName="",this.selectPage=!1,this.postCut(a)},postCut:function(t){var e=this,s=[];t.items.map(function(t){s.push({page:t})});var a={documentId:this.$route.params.id,name:t.name,pages:s};this.loading.pagesPdf=!0,this.loading.slicesCategory=!0,o["default"].post("/slices",a).then(function(){if(e.loading.pagesPdf=!1,e.loading.slicesCategory=!1,e.getSlices(),0===e.pages.length){var t={documentId:e.$route.params.id,documentStatusId:3};return o["default"].post("/Documents/PostDocumentUpdateSatus",t).then(function(){}).catch(function(){}),d()({title:"Dossiê finalizado!",text:"Todas as páginas foram recortadas.",timer:3e3,type:"success"}).then(function(){return e.$router.push("/cut-dossie")})}return d()({title:"Recorte salvo com sucesso!",toast:!0,timer:3e3,type:"success",showConfirmButton:!1})}).catch(function(){return e.loading.pagesPdf=!1,e.loading.slicesCategory=!1,d()({title:"Erro ao salvar recorte!",toast:!0,timer:3e3,type:"error",showConfirmButton:!1}).then(function(){return window.location.reload()})})},deletePages:function(){var t=this,e=[],s=[];this.pages.map(function(a,i){var n=t.selected[i];n?e.push(t.pages[i]):s.push(t.pages[i])});var a=[];e.map(function(t){a.push({page:t.page})});var i={documentId:this.$route.params.id,pages:a};this.loading.pagesPdf=!0,this.loading.slicesCategory=!0,o["default"].post("/DeletedPages",i).then(function(){if(t.pages=s,t.loading.pagesPdf=!1,t.loading.slicesCategory=!1,t.selected=Array(t.pages.length).fill(!1),t.selectPage=!1,0===t.pages.length){var e=t.slices.length>0?3:8,a={documentId:t.$route.params.id,documentStatusId:e};o["default"].post("/Documents/PostDocumentUpdateSatus",a).then(function(){return t.slices.length>0?d()({title:"Dossiê finalizado!",text:"Todas as páginas foram recortadas.",timer:3e3,type:"success"}):d()({title:"Dossiê sem recorte",text:"Dossiê não possui páginas para recorte",timer:3e3,type:"error"})}).catch(function(){}).then(function(){return t.$router.push("/cut-dossie")})}return d()({title:"Página"+t.pluralAditional()+" apagada"+t.pluralAditional()+" com sucesso!",toast:!0,timer:3e3,type:"success",showConfirmButton:!1})}).catch(function(){return t.loading.pagesPdf=!1,t.loading.slicesCategory=!1,d()({title:"Erro ao apagar página",toast:!0,timer:3e3,type:"error",showConfirmButton:!1}).then(function(){return window.location.reload()})})},allowSelectPages:function(){this.newGroupName="",this.selectPage=!1},numSelected:function(){return this.selected.filter(function(t){return t}).length},numPendingPages:function(){return this.pages.length},numGroupCreated:function(){return this.slices.length},pluralAditional:function(){return 1===this.numSelected()?"":"s"},openModal:function(){setTimeout(function(){document.getElementById("newSlice").focus()},500),this.selectPage=!0},shortCut:function(t){if(t.shiftKey&&t.ctrlKey)switch(t.code){case"KeyZ":this.zoomPage("zoomIn");break;case"KeyX":this.zoomPage("zoomOut");break;case"Comma":this.pageRotate("l");break;case"Period":this.pageRotate("r");break;case"ArrowLeft":this.numPages>1&&this.navPage("prev");break;case"ArrowRight":this.numPages>1&&this.navPage("next");break;case"Backspace":this.numPages>1&&$("#modal-del-page").modal("show");break;case"Space":this.$refs.searchCode.focus();break;case"KeyS":this.sendClassification();break}}},directives:{selectable:l.a},mounted:function(){this.getDetails(),this.getPdf(),this.getSlices()},created:function(){window.addEventListener("keyup",this.shortCut)},beforeDestroy:function(){window.removeEventListener("keyup",this.shortCut)}},h=u,p=(s("4f73"),s("2877")),f=Object(p["a"])(h,a,i,!1,null,null,null);e["default"]=f.exports}}]);
//# sourceMappingURL=chunk-2b7f092a.fa190d7e.js.map