!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["trello-foreground"]=t():e["trello-foreground"]=t()}("undefined"!=typeof self?self:this,function(){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=1)}([,function(e,t,o){"use strict";o.r(t);const n=Symbol("privApi"),r=Symbol("privServiceId"),i=Symbol("privIsDestroyed");var s=class{constructor(e,t){this[n]=e,this[r]=t,this[i]=!1}destroy(){this[i]||(this[i]=!0)}get appVersion(){return this[n].appVersion}get api(){return this[n]}isDestroyed(){return this[i]}};function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var c=class extends s{constructor(...e){super(...e),a(this,"_checkNotifications",()=>{const e=this.state.hasNotifications,t=this.domHasNewNotifications();t!==e&&(this.state.hasNotifications=t,this.sendBackgroundMessage("has-notifications-changed",e,t))}),a(this,"_handleOpen",(e,t)=>{t.boardId&&t.cardId?window.location.href=`https://trello.com/card/board/a/${t.boardId}/${t.cardId}`:t.boardId&&(window.location.href=`https://trello.com/card/board/a/${t.boardId}`)}),this.state={hasNotifications:this.domHasNewNotifications()},this.pollers={notifications:setInterval(this._checkNotifications,1e3)},this.api.on("open-item",this._handleOpen),this.api.sendBackgroundMessage("connect-page")}destroy(){clearInterval(this.pollers.notifications),this.api.removeListener("open-item",this._handleOpen),super.destroy()}domHasNewNotifications(){const e=document.querySelector(".header-notifications");return!!e&&e.classList.contains("new-notifications")}};t.default=c}])});