!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["gmail-foreground"]=t():e["gmail-foreground"]=t()}("undefined"!=typeof self?self:this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([,function(e,t,n){"use strict";n.r(t);const r=Symbol("privApi"),a=Symbol("privServiceId"),s=Symbol("privIsDestroyed");var o=class{constructor(e,t){this[r]=e,this[a]=t,this[s]=!1}destroy(){this[s]||(this[s]=!0)}get appVersion(){return this[r].appVersion}get api(){return this[r]}isDestroyed(){return this[s]}};var i=class{static getUnreadCount(){const e=document.querySelector('div[role=navigation] [href*="#inbox"]');if(e){let t;if(/\d/.test(e.parentElement.parentElement.textContent)?t=e.parentElement.parentElement.textContent:/\d/.test(e.getAttribute("aria-label")||"")&&(t=e.getAttribute("aria-label")),t)return t.split(":").reduce((e,t)=>{const n=parseInt(t.replace(/[^0-9]/g,""));return isNaN(n)?e:e+n},0)}return 0}static getUserAvatar(){const e=document.querySelector(".gb_ya.gbii, .gb_xa.gbii, .gbii");if(!e)return;const t=window.getComputedStyle(e,":before");if(!t.content)return;const n=t.content.slice(5,-2);return n.startsWith("http://")||n.startsWith("https://")?-1===n.indexOf("/s32-c-mo/")?n:n.replace("/s32-c-mo/","/s256-c-mo/"):void 0}static reloadEmails(){const e=document.querySelector('[href*="mail.google"][href*="'+window.location.hash+'"]');e&&e.click()}static getNewestComposeElements(){const e=Array.from(document.querySelectorAll('[name="subjectbox"]')).slice(-1)[0];if(!e)return;const t=e.closest('[role="dialog"]');if(!t)return;const n=t.querySelector('[g_editable="true"][role="textbox"]'),r=t.querySelector('[name="to"]');return{subject:e,dialog:t,body:n,recipient:r}}static populateNewestComposeWindow(e,t,n,r){const a=this.getNewestComposeElements();if(!a)return!1;let s;return t&&a.recipient&&(a.recipient.value=e.LIBS.escapeHTML(t),s=a.subject),n&&a.subject&&(a.subject.value=e.LIBS.escapeHTML(n),s=a.body),r&&a.body&&(a.body.innerHTML=e.LIBS.escapeHTML(r)+a.body.innerHTML,s=a.body),s&&setTimeout(()=>s.focus(),500),!0}static composeMessage(e,t){const n=document.querySelector(".T-I.J-J5-Ji.T-I-KE.L3");if(!n)return!1;const r=document.createEvent("MouseEvents");r.initEvent("mousedown",!0,!1),n.dispatchEvent(r);const a=document.createEvent("MouseEvents");return a.initEvent("mouseup",!0,!1),n.dispatchEvent(a),(t.recipient||t.subject||t.body)&&setTimeout(()=>{if(!this.populateNewestComposeWindow(e,t.recipient,t.subject,t.body)){let n=0;const r=setInterval(()=>{n++,(this.populateNewestComposeWindow(e,t.recipient,t.subject,t.body)||n>20)&&clearInterval(r)},100)}},1),!0}};function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=class extends o{constructor(...e){super(...e),c(this,"_checkUnreadCount",()=>{const e=this.state.count,t=i.getUnreadCount();t!==e&&(this.state.count=t,this.sendBackgroundMessage("count-changed",e,t))}),c(this,"_checkAvatar",()=>{const e=this.state.avatar,t=i.getUserAvatar();t!==e&&t&&(this.state.avatar=t,this.sendBackgroundMessage("avatar-changed",this.state.avatar))}),c(this,"_checkAvatarOnStart",()=>{this.state.avatarStartChecks>3?clearInterval(this.pollers.avatarStart):(this.state.avatarStartChecks++,this._checkAvatar(),this.state.avatar&&clearInterval(this.pollers.avatarStart))}),c(this,"_handleDocumentVisibilityChange",e=>{document.hidden||i.reloadEmails()}),c(this,"_handleCompose",(e,t)=>{i.composeMessage(this.api,t)}),c(this,"_handleOpen",(e,t)=>{window.location.hash="inbox/"+t.messageId}),this.state={count:i.getUnreadCount(),avatar:i.getUserAvatar(),avatarStartChecks:0},this.pollers={count:setInterval(this._checkUnreadCount,500),avatar:setInterval(this._checkAvatar,6e4),avatarStart:setInterval(this._checkAvatarOnStart,3e3)},this.api.on("compose-item",this._handleCompose),this.api.on("open-item",this._handleOpen),document.addEventListener("visibilitychange",this._handleDocumentVisibilityChange,!1),this.sendBackgroundMessage("count-changed",this.state.count),this.state.avatar&&this.sendBackgroundMessage("avatar-changed",this.state.avatar)}destroy(){super.destroy(),clearInterval(this.pollers.count),clearInterval(this.pollers.avatar),clearInterval(this.pollers.avatarStart),this.api.removeListener("compose-item",this._handleCompose),this.api.removeListener("open-item",this._handleOpen),document.removeEventListener("visibilitychange",this._handleDocumentVisibilityChange)}sendBackgroundMessage(...e){(window.location.pathname.endsWith("/u/0/")||window.location.pathname.endsWith("/u/0"))&&this.api.sendBackgroundMessage(...e)}};t.default=u}])});