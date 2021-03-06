!function(t,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var e=n();for(var r in e)("object"==typeof exports?exports:t)[r]=e[r]}}(window,(function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=0)}([function(t,n,e){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var n,e=1,r=arguments.length;e<r;e++)for(var o in n=arguments[e])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t}).apply(this,arguments)},o=this&&this.__spreadArrays||function(){for(var t=0,n=0,e=arguments.length;n<e;n++)t+=arguments[n].length;var r=Array(t),o=0;for(n=0;n<e;n++)for(var i=arguments[n],u=0,a=i.length;u<a;u++,o++)r[o]=i[u];return r};Object.defineProperty(n,"__esModule",{value:!0}),n.reaction=n.watch=n.computed=n.runInSandbox=n.sandbox=n.runInAction=n.action=n.runInAtom=n.atom=n.autorun=n.observable=n.Subscriber=n.Observer=void 0;var i=[],u=[],a=[],c=[],f=new WeakMap,s=[],l=["iterate"],h=["undefined"],p=function(){function t(t){var n=this;this.target=t,this.refmap=new Map,this.ownmap=new Map,this._has=function(t){return t in n.target},this._val=function(t){return n.target[t]},this._del=function(t){return delete n.target[t]},this._set=function(t,e){return n.target[t]=e},this._proxy_handler={get:function(t,e){var r=t[e];return"__proto__"!==e&&(r=b(r),n.collect(e)),r},set:function(t,e,r){var o=t[e],i=f.get(r),u=i?i.target:r,a=t.hasOwnProperty(e),c=O(o,u);return c&&a||(t[e]=u),a||(n.notify(e,!1,1),n.notify(l,l,1)),c||n.notify(e,o),!0},ownKeys:function(t){return n.collect(l,1),v(t)},has:function(t,e){return n.collect(e,1),e in t},deleteProperty:function(t,e){return _((function(){return t.hasOwnProperty(e)&&(n.notify(e,t[e]),n.notify(e,!0,1),n.notify(l,l,1)),delete t[e]}))}};var e=f.get(t);if(e)return e;switch(!0){case t instanceof WeakSet:case t instanceof WeakMap:case t instanceof Map:case t instanceof Set:j(this);break;case t[Symbol.iterator]:case t instanceof Array:!function(t){var n=t.target,e=n.__proto__,r=t._proxy_handler.set;n.__proto__=Object.create(e,Array.prototype.concat.call(["push","pop","shift","unshift","splice","sort","reverse"].map((function(t){var n=e[t];return n&&[t,function(){var t=this,e=arguments;return _((function(){return n.apply(t,e)}))}]})),["values",Symbol.iterator].map((function(r){var o=e[r];return o&&[r,function(){return t.collect(l,1),S(o.call(n))}]}))).reduce((function(t,n){return n&&(t[n[0]]={value:n[1]}),t}),{})),t._proxy_handler.set=function(e,o,i){var u=n.length;return _((function(){var a=r(e,o,i);return n.length!==u&&t.notify("length",u,10),a}))}}(this)}this.proxy=new Proxy(t,this._proxy_handler),f.set(this.proxy,this),f.set(t,this)}return t.prototype.collect=function(t,n){void 0===n&&(n=2);var e=i[0];if(e){var r=this._map(n),o=r.get(t);o||r.set(t,o=new Set),e.depend(o)}},t.prototype.release=function(){for(var t=0,n=[this.refmap,this.ownmap];t<n.length;t++){var e=n[t];e.forEach((function(t){t.forEach((function(n){return n.undepend(t)}))})),e.clear()}},t.prototype.notify=function(t,n,e){void 0===e&&(e=2);var r=[this,t,n,e];if(s.length&&s[0][0].push(r),null!==c[0]){var o=this._map(e).get(t);o&&o.size&&w(Array.from(o),c.length&&r)}},t.prototype._map=function(t){return 2&t?this.refmap:this.ownmap},t}();n.Observer=p;var d=function(){function t(t){this.fn=t,this.children=[],this._deps=new Set,this.is_run=!1}return t.prototype.undepend=function(t){this._deps.delete(t),t.delete(this)},t.prototype.depend=function(t){this._deps.add(t),t.add(this)},t.prototype.clear=function(t){var n=this;if(this._deps.forEach((function(t){return t.delete(n)})),this._deps.clear(),!t)for(var e=0,r=this.children;e<r.length;e++){var o=r[e];o.clear(),o.parent=void 0}this.children.length=0},t.prototype.unmount=function(t){var n;if(this.clear(t),!t){var e=null===(n=this.parent)||void 0===n?void 0:n.children;if(e&&e.splice(e.indexOf(this),1),this._sandbox){var r=this._sandbox[1].indexOf(this);r>=0&&this._sandbox[1].splice(r,1)}}this._sandbox=void 0,this.parent=void 0},t.prototype.mount=function(){return void 0!==this.parent?new t(this.fn).mount():(s.length&&(this._sandbox=s[0],this._sandbox[1].push(this)),this.parent=i[0]||null,this.parent&&this.parent.children.push(this),this._run(),this)},t.prototype.update=function(){return this.clear(),this._run()},t.prototype.addRecord=function(t){var n=c[0][0],e=a.indexOf(this);e<0||u[e][0]<n?(u.unshift([n,[t]]),a.unshift(this)):u[e][1].push(t)},t.prototype._run=function(){this.is_run=!0,i.unshift(this);try{return this.fn()}catch(t){throw t}finally{i.shift(),this.is_run=!1}},t}();function v(t){return Array.prototype.concat.call(Object.getOwnPropertySymbols(t),Object.getOwnPropertyNames(t))}function y(t,n){!function(t){var n=c[0],e=void 0===t&&n?1&n[1]:t?1:0;c.unshift([t&&n?n[0]:c.length,e])}(n);try{return t()}catch(t){throw t}finally{!function(){var t=[],n=c.shift(),e=n[0];if(1&n[1]&&0!==c.length)return;for(;a.length&&u[0][0]>=e;){var r=a.shift(),o=u.shift();if(t.indexOf(r)<0&&x(o[1])){for(var i=void 0;(i=a.lastIndexOf(r))>=0;)a.splice(i,1),u.splice(i,1);t.unshift(r)}}w(t)}()}}function _(t){return y(t,!0)}function g(t){i.unshift(null),s.unshift([[],[]]);try{return t()}catch(t){throw t}finally{var n=s.shift(),e=[];x(n[0],(function(t){var n=t[0],r=t[1],o=t[3];if(1&o)n._del(r);else if(4&~o){if(8&o)return void e.push(t);n._set(r,t[2])}}));for(var r=0,o=e;r<o.length;r++){var u=o[r];u[0]._set(u[1],u[2])}for(var a=0,c=n[1];a<c.length;a++){c[a].unmount(!0)}i.shift()}}function b(t){return t&&"object"==typeof t?new p(t).proxy:t}function m(t,n){var e=[],r=new d((function(){e.unshift(t()),e.length>1&&(n(e[0],e[1]),e.length=1)}));return r.mount(),function(){r.unmount()}}function x(t,n){for(var e=new Map,r=!1,o=0,i=t;o<i.length;o++){var u=i[o],a=u[0],c=u[1],f=e.get(a);if(f){if(f.has(c))continue;f.add(c)}else e.set(a,new Set([c]));if(!O(1!==u[3]?a._val(c):a._has(c),u[2])){if(!n)return!0;-1===n(u)&&f.delete(c),r=!0}}return r}function w(t,n){var e=[];t:for(var r=0,o=void 0;r<t.length;r++){for(o=t[r];o=o.parent;)if(t.indexOf(o)>=0){t.splice(r--,1);continue t}(o=t[r]).is_run||e.push(t[r])}for(var i=0,u=e;i<u.length;i++){o=u[i];n?o.addRecord(n):o.update()}}function O(t,n){return t===n||t!=t&&n!=n}function j(t){var n,e=t.target,i=e.__proto__,u=new p({}),a=(null===(n=Object.getOwnPropertyDescriptor(i,"size"))||void 0===n?void 0:n.get.bind(e))||function(){};t.release=function(){return u.release(),t.release()},u._has=i.has.bind(e),u._val=e instanceof Map||e instanceof WeakMap?function(t){return i.get.call(e,t)}:function(t){return i.has.call(e,t)?t:h},u._del=function(t){return i.delete.call(e,t)},u._set=i.set?function(t,n){return i.set.call(e,t,n)}:function(t,n){return i.add.call(e,t)};for(var c=r({get:function(t){return u.collect(t),b(i.get.call(e,t))},set:function(t,n){var r=i.has.call(e,t),o=r?i.get.call(e,t):void 0;return i.set.call(e,t,n),r||u.notify(t,!1,1),u.notify(t,o),this},add:function(n){return i.has.call(e,n)||_((function(){var r=a();i.add.call(e,n),void 0!==r&&t.notify("size",r,6),u.notify(n,!1,1),u.notify(n,h),u.notify(l,l,1)})),this},delete:function(n){var r=i.get,o=r?r.call(e,n):n,c=a(),f=i.delete.call(e,n);return f&&_((function(){u.notify(n,o),u.notify(n,!0,1),u.notify(l,l,1),void 0!==c&&t.notify("size",c,6)})),f},clear:function(){var n=a();n&&_((function(){i.forEach.call(e,(function(t,n){u.notify(n,t),u.notify(n,!0,1)})),u.notify(l,l,1),t.notify("size",n,6),i.clear.call(e)}))},forEach:function(t){for(var n,r=[],a=1;a<arguments.length;a++)r[a-1]=arguments[a];return u.collect(l,1),(n=i.forEach).call.apply(n,o([e,function(n){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];t.apply(void 0,o([b(n)],e))}],r))},has:function(t){return u.collect(t,1),i.has.call(e,t)},size:a},["keys","entries","values",Symbol.iterator].reduce((function(t,n){var r=i[n];return r&&(t[n]=function(){return u.collect(l,1),S(r.apply(e,arguments))}),t}),{})),f={},s=0,d=v(i);s<d.length;s++){var y=d[s],g=c[y],m=Object.getOwnPropertyDescriptor(i,y);g&&(void 0!==m.value?m.value=g:m.get=g),f[y]=m}e.__proto__=Object.create(e.__proto__.__proto__,f)}function S(t){var n=t.next.bind(t);return t.next=function(){var t=n(),e=t.done,r=t.value;return e||(r=b(r)),{done:e,value:r}},t}n.Subscriber=d,n.atom=function(t){return y.bind(null,t,!0)},n.runInAtom=_,n.action=function(t){return y.bind(null,t)},n.runInAction=function(t){return y(t)},n.sandbox=function(t){return g.bind(null,t)},n.runInSandbox=g,n.autorun=function(t){var n=new d(t);return n.mount(),function(){n.unmount()}},n.observable=b,n.computed=function(t){var n,e=0,r=new d((function(){(e^=1)&&(n=t())}));return function(){return e||r.update(),n}},n.watch=m,n.reaction=function(t,n){return m(t,(function(t,e){O(t,e)||n(t)}))}}])}));
//# sourceMappingURL=obb.js.map