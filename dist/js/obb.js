!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.reaction=e.watch=e.computed=e.runAction=e.action=e.runAtomic=e.atomic=e.autorun=e.observable=e.Subscriber=e.Observer=void 0;const r=[],o=[],i=[],l=[],a=new WeakMap,c=["iterate"],s=["undefined"];class u{constructor(t){this.target=t,this.refmap=new Map,this.ownmap=new Map,this._has=t=>t in this.target,this._val=t=>this.target[t],this._proxy_handler={get:(t,e)=>{let n=t[e];return"__proto__"!==e&&(n=y(n),this.collect(e)),n},set:(t,e,n)=>{let r=t[e],o=a.get(n),i=o?o.target:n,l=t.hasOwnProperty(e),s=b(r,i);return s&&l||(t[e]=i),s||this.notify(e,r),l||(this.notify(e,!1,1),this.notify(c,c,1)),!0},ownKeys:t=>(this.collect(c,1),h(t)),has:(t,e)=>(this.collect(e,1),e in t),deleteProperty:(t,e)=>d(()=>(t.hasOwnProperty(e)&&(this.notify(e,t[e]),this.notify(e,!0,1),this.notify(c,c,1)),delete t[e]))};let e=a.get(t);if(e)return e;switch(!0){case t instanceof WeakSet:case t instanceof WeakMap:case t instanceof Map:case t instanceof Set:!function(t){var e;let n=t.target,r=n.__proto__,o=new u({}),i=(null===(e=Object.getOwnPropertyDescriptor(r,"size"))||void 0===e?void 0:e.get.bind(n))||function(){};t.release=function(){return o.release(),t.release()},o._val=n instanceof Map||n instanceof WeakMap?function(t){return r.get.call(n,t)}:function(t){return r.has.call(n,t)?t:s};let l=Object.assign({get:t=>(o.collect(t),y(r.get.call(n,t))),set(t,e){let i=r.get.call(n,t);return r.set.call(n,t,e),o.notify(t,i),this},add(e){return r.has.call(n,e)||d(()=>{let l=i();r.add.call(n,e),o.notify(e,s),void 0!==l&&t.notify("size",l),o.notify(c,c)}),this},delete(e){let l=r.delete.call(n,e);return l&&d(()=>{let n=i();o.notify(e,e),void 0!==n&&t.notify("size",n),o.notify(c,c)}),l},clear(){let e=i();if(!e)return;let l=Array.from(r.values.call(n)),a=arguments;d(()=>{r.clear.apply(n,a);for(let t of l)o.notify(t,t);t.notify("size",e),o.notify(c,c)})},forEach:(t,...e)=>(o.collect(c),r.forEach.call(n,(function(e,...n){t(y(e),...n)}),...e)),has:t=>(o.collect(t),r.has.call(n,t)),size:i},["keys","entries","values",Symbol.iterator].reduce((function(t,e){let i=r[e];return i&&(t[e]=function(){return o.collect(c),y(i.apply(n,arguments))}),t}),{})),a={},f=h(r);for(let t of f){let e=l[t],n=Object.getOwnPropertyDescriptor(r,t);e&&(void 0!==n.value?n.value=e:n.get=e),a[t]=n}n.__proto__=Object.create(n.__proto__.__proto__,a)}(this);break;case t[Symbol.iterator]:case t instanceof Array:!function(t){let e=t.target,n=e.__proto__,r=t._proxy_handler.set;e.__proto__=Object.create(n,Array.prototype.concat.call(["push","pop","shift","unshift","splice","sort","reverse"].map((function(t){const e=n[t];return e&&[t,function(){let t=arguments;return d(()=>e.apply(this,t))}]})),["values",Symbol.iterator].map((function(r){const o=n[r];return o&&[r,function(){return t.collect(c,1),function(t){let e=t.next.bind(t);return t.next=function(){let{done:t,value:n}=e();return t||(n=y(n)),{done:t,value:n}},t}(o.call(e))}]}))).reduce((function(t,e){return e&&(t[e[0]]={value:e[1]}),t}),{})),t._proxy_handler.set=function(n,o,i){let l=e.length;return d((function(){let a=r(n,o,i);return e.length!==l&&t.notify("length",l),a}))}}(this)}this.proxy=new Proxy(t,this._proxy_handler),a.set(this.proxy,this),a.set(t,this)}collect(t,e){let n=r[0];if(n){let r=this._map(e),o=r.get(t);o||r.set(t,o=new Set),n.depend(o)}}release(){for(let t of[this.refmap,this.ownmap])t.forEach(t=>{t.forEach(e=>e.undepend(t))}),t.clear()}notify(t,e,n=2){let o=this._map(n).get(t);if(o&&o.size){let i=[this,t,e,n];for(let t of Array.from(o))r.indexOf(t)<0&&t.notify(i)}}_map(t){return 1!==t?this.refmap:this.ownmap}}e.Observer=u;class f{constructor(t){this.fn=t,this._deps=new Set}undepend(t){this._deps.delete(t),t.delete(this)}depend(t){this._deps.add(t),t.add(this)}release(){this._deps.forEach(t=>t.delete(this)),this._deps.clear()}update(){this.release(),r.unshift(this);try{return this.fn()}catch(t){throw t}finally{r.shift()}}notify(t){if(!l.length)return this.update();let e=l[0][0],n=i.indexOf(this);n<0||o[n][0]<e?(o.unshift([e,[t]]),i.unshift(this)):o[n][1].push(t)}}function h(t){return Array.prototype.concat.call(Object.getOwnPropertySymbols(t),Object.getOwnPropertyNames(t))}function p(t,e){!function(t){let e=l[0];t=void 0===t&&e?e[1]:!!t,l.unshift([t&&e?e[0]:l.length,t])}(e);try{return t()}catch(t){throw t}finally{!function(){let t=[],e=l.shift(),n=e[0];if(e[1]&&0!==l.length)return;for(;i.length;){let e=o[0];if(e[0]<n)break;let r=i[0];if(t.indexOf(r)<0){let n=new Map;for(let l of e[1]){let e,a=l[0],c=l[1],s=1!==l[3]?a._val(c):a._has(c),u=n.get(a);if(u){if(u.has(c))continue;u.add(c)}else n.set(a,new Set([c]));if(!b(s,l[2])){for(t.unshift(r);(e=i.lastIndexOf(r))>0;)i.splice(e,1),o.splice(e,1);break}}}i.shift(),o.shift()}for(let e of t)r.indexOf(e)<0&&e.update()}()}}function d(t){return p(t,!0)}function y(t){return t&&"object"==typeof t?new u(t).proxy:t}function _(t,e){let n=[],r=new f((function(){n.unshift(t()),n.length>1&&(e(n[0],n[1]),n.length=1)}));return r.update(),function(){r.release()}}function b(t,e){return t===e||t!=t&&e!=e}e.Subscriber=f,e.atomic=function(t){return p.bind(null,t,!0)},e.runAtomic=d,e.action=function(t){return p.bind(null,t)},e.runAction=function(t){return p(t)},e.autorun=function(t){let e=new f(t);return e.update(),function(){e.release()}},e.observable=y,e.computed=function(t){let e,n=0,r=new f((function(){(n^=1)&&(e=t())}));return function(){return n||r.update(),e}},e.watch=_,e.reaction=function(t,e){return _(t,(function(t,n){b(t,n)||e(t)}))}}]);
//# sourceMappingURL=obb.js.map