(function(e,n){typeof exports=="object"&&typeof module<"u"?module.exports=n(require("vue")):typeof define=="function"&&define.amd?define(["vue"],n):(e=typeof globalThis<"u"?globalThis:e||self,e.DoonceUniversalVueCompExample=n(e.Vue))})(this,function(e){"use strict";const n=e.defineComponent({__name:"UniversalVueCompExample",setup(t){e.onMounted(()=>{console.log("mounted")});let o=e.ref(!1);const l=()=>{o.value=!o.value};return(p,u)=>(e.openBlock(),e.createElementBlock("button",{class:"doonce-UniversalVueCompExample",type:"button",onClick:l,value:"hello"}," UniversalVueCompExample "))}}),i="";return{install(t,o){t.component("DoonceUniversalVueCompExample",n)}}});
