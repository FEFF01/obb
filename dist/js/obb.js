!function(t,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var e=n();for(var r in e)("object"==typeof exports?exports:t)[r]=e[r]}}(window,(function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=0)}([function(t,n,e){"use strict";(function(t){var e,r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var n,e=1,r=arguments.length;e<r;e++)for(var o in n=arguments[e])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t}).apply(this,arguments)},o=this&&this.__spreadArrays||function(){for(var t=0,n=0,e=arguments.length;n<e;n++)t+=arguments[n].length;var r=Array(t),o=0;for(n=0;n<e;n++)for(var i=arguments[n],a=0,u=i.length;a<u;a++,o++)r[o]=i[a];return r};Object.defineProperty(n,"__esModule",{value:!0}),n.MASK_UNDEFINED=n.MASK_ITERATE=n.reaction=n.watch=n.computed=n.SUBSCRIBE_OPTION=n.transacts=n.runInSandbox=n.sandbox=n.runInAction=n.action=n.runInAtom=n.atom=n.autorun=n.observable=n.Subscriber=n.Observer=void 0,function(t){t[t.DEFAULT=0]="DEFAULT",t[t.PREVENT_COLLECT=1]="PREVENT_COLLECT",t[t.COMPUTED=2]="COMPUTED"}(e||(e={})),n.SUBSCRIBE_OPTION=e;var i="object"==typeof window?window:t,a=[],u=[],c=[],f=[],s=new WeakMap,l=[],h=["iterate"];n.MASK_ITERATE=h;var p=["undefined"];n.MASK_UNDEFINED=p;var d=function(){function t(t){var n=this;switch(this.target=t,this.refmap=new Map,this.ownmap=new Map,this._has=function(t){return t in n.target},this._val=function(t){return n.target[t]},this._del=function(t){return delete n.target[t]},this._set=function(t,e){return n.target[t]=e},this._proxy_handler={get:function(t,e){var r=t[e];return"__proto__"!==e&&(r=T(r),n.collect(e)),r},set:function(t,e,r){var o=t[e],i=s.get(r),a=i?i.target:r,u=t.hasOwnProperty(e),c=C(o,a);return c&&u||b((function(){t[e]=a,u||(n.notify(e,!1,1),n.notify(h,h,1)),c||n.notify(e,o)})),!0},ownKeys:function(t){return n.collect(h,1),y(t)},has:function(t,e){return n.collect(e,1),e in t},deleteProperty:function(t,e){return b((function(){return t.hasOwnProperty(e)&&(n.notify(e,t[e]),n.notify(e,!0,1),n.notify(h,h,1)),delete t[e]}))}},!0){case t instanceof WeakSet:case t instanceof WeakMap:case t instanceof Map:case t instanceof Set:I(this);break;case t[Symbol.iterator]:case t instanceof Array:!function(t){var n=t.target,e=n.__proto__,r=t._proxy_handler.set;n.__proto__=Object.create(e,Array.prototype.concat.call(["push","pop","shift","unshift","splice","sort","reverse"].map((function(t){var n=e[t];return n&&[t,function(){var t=this,e=arguments;return b((function(){return n.apply(t,e)}))}]})),["values",Symbol.iterator].map((function(r){return e[r]&&[r,function(){t.collect(h,1);var e=0,r=t.proxy;return{next:function(){var o,i=e>=n.length;return i||(t.collect(e),o=r[e++]),{done:i,value:o}}}}]}))).reduce((function(t,n){return n&&(t[n[0]]={value:n[1]}),t}),{})),t._proxy_handler.set=function(e,o,i){var a=n.length;return b((function(){var u=r(e,o,i);return n.length!==a&&t.notify("length",a,10),u}))}}(this)}this.proxy=new Proxy(t,this._proxy_handler),s.set(this.proxy,this),s.set(t,this)}return t.TO_RAW=function(t){var n=s.get(t);return n?n.target:t},t.TO_OB=function(t){return s.get(t)},t.prototype.collect=function(t,n){void 0===n&&(n=2);var r=a[0];if(r&&!(r.option&e.PREVENT_COLLECT)){var o=this._map(n),i=o.get(t);i||o.set(t,i=new Set),r.depend(i)}},t.prototype.release=function(){for(var t=0,n=[this.refmap,this.ownmap];t<n.length;t++){var e=n[t];e.forEach((function(t){t.forEach((function(n){return n.undepend(t)}))})),e.clear()}},t.prototype.notify=function(t,n,e){void 0===e&&(e=2);var r=[this,t,n,e];l.length&&l[0][0].push(r);var o=this._map(e).get(t);if(o&&o.size)if(f.length)o.forEach((function(t){return t.addRecord(r)}));else{var i=Number.MAX_SAFE_INTEGER;o.forEach((function(t){(void 0).push(t),i>t.depth&&(i=t.depth)})),j(void 0,i)}},t.prototype._map=function(t){return 2&t?this.refmap:this.ownmap},t}();n.Observer=d;var v=function(){function t(t,n){void 0===n&&(n=e.DEFAULT),this.fn=t,this.option=n,this.depth=0,this.children=[],this._deps=new Set,this.is_run=!1,this.brokens=[],this.accu=0}return Object.defineProperty(t,"PARENT",{get:function(){return a[0]},enumerable:!1,configurable:!0}),t.prototype.undepend=function(t){this._deps.delete(t),t.delete(this)},t.prototype.depend=function(t){this._deps.add(t),t.add(this),this.option&e.COMPUTED&&this.parent&&void 0!==this.parent.parent&&this.parent.depend(t)},t.prototype.clear=function(t){var n=this;if(this._deps.forEach((function(t){return t.delete(n)})),this._deps.clear(),!t)for(var e=0,r=this.children;e<r.length;e++){var o=r[e];o.clear(),o.parent=void 0}this.children.length=0},t.prototype.unmount=function(t){if(this.clear(t),!t){var n=this.parent&&this.parent.children;if(n&&n.splice(n.indexOf(this),1),this._sandbox){var e=this._sandbox[1].indexOf(this);e>=0&&this._sandbox[1].splice(e,1)}}this._sandbox=void 0,this.parent=void 0},t.prototype.mount=function(n){if(void 0!==this.parent)return new t(this.fn).mount(n);if(this.parent=n||a[0],this.parent){if(void 0===this.parent.parent)return this.parent=void 0,this;this.depth=this.parent.depth+1}else this.parent=null;return l.length&&(this._sandbox=l[0],this._sandbox[1].push(this)),this.parent&&this.parent.children.push(this),this._run(),this},t.prototype.update=function(){return this.clear(),this._run()},t.prototype.addRecord=function(t){var n=f[0][0],r=c.indexOf(this);r<0||u[r][0]<n?(u.unshift([n,[t]]),c.unshift(this)):u[r][1].push(t),this.option&e.COMPUTED&&this.parent&&void 0!==this.parent.parent&&this.parent.addRecord(t)},t.prototype._run=function(){this.is_run=!0,a.unshift(this),this.accu+=1;try{return this.res=this.fn()}catch(t){throw t}finally{a.shift(),this.is_run=!1,this.brokens.length=0}},t}();function y(t){return Array.prototype.concat.call(Object.getOwnPropertySymbols(t),Object.getOwnPropertyNames(t))}function _(t,n){for(var e=[],r=2;r<arguments.length;r++)e[r-2]=arguments[r];P(t);try{return n.apply(void 0,e)}catch(t){throw t}finally{A()}}n.Subscriber=v,n.transacts=_,n.atom=function(t){return _.bind(null,t,2)};var g=_.bind(null,2);n.runInAtom=g;var b=_.bind(null,18);n.action=function(t){return _.bind(null,1,t)};var O=_.bind(null,1);n.runInAction=O,n.sandbox=function(t,n){return void 0===n&&(n=7),m.bind(null,n,t)};var E=m.bind(null,7);function m(t,n){for(var r=[],o=2;o<arguments.length;o++)r[o-2]=arguments[o];var i=l[0],u=a[0],c=u&&u.option,f=4&t||!i?[]:i[1],s=f.length,h=4&t||!i?[]:i[0];u&&(u.option=1&t?c|e.PREVENT_COLLECT:c&~e.PREVENT_COLLECT),l.unshift([h,f,t|(i&&4&i[2])]);try{return n.apply(void 0,r)}catch(t){throw t}finally{if(l.shift(),4&t&&w(h),2&t){for(var p=f.length-1;p>=s;p--){var d=f[p];d.unmount(d.parent!==u)}f.length=s}else i&&4&t&&Array.prototype.push.apply(i[1],f);u&&(u.option=c)}}function w(t){var n=[];M(t,(function(t){var e=t[0],r=t[1],o=t[3];if(1&o)e._del(r);else if(4&~o){if(8&o)return void n.push(t);e._set(r,t[2])}}));for(var e=0,r=n;e<r.length;e++){var o=r[e];o[0]._set(o[1],o[2])}}n.runInSandbox=E,n.autorun=function(t){var n=new v(t);return n.mount(),function(){n.unmount()}};var x=new Set([Object,Array,Map,Set,WeakMap,WeakSet]);function T(t){if(t&&"object"==typeof t){var n=s.get(t);if(n)t=n.proxy;else{var e=t.constructor;(x.has(e)||i[e.name]!==e)&&(t=new d(t).proxy)}}return t}function S(t,n,e){var r=[],o=new v((function(){if(r.unshift(t()),r.length>1){var o=r[0],i=r[1];C(o,i)||n(o,i)}else 1===r.length&&e&&n(r[0]);r.length=1}));return o.mount(),function(){o.unmount()}}function P(t){var n,e=f[0];void 0===t?t=e?2&e[1]:1:"number"!=typeof t&&(n=t.hook,t=t.option),f.unshift([f.length,t,n])}function M(t,n){for(var e=new Map,r=!1,o=0,i=t;o<i.length;o++){var a=i[o],u=a[0],c=a[1],f=e.get(u);if(f){if(f.has(c))continue;f.add(c)}else e.set(u,new Set([c]));if(!C(1!==a[3]?u._val(c):u._has(c),a[2])){if(!n)return!0;-1===n(a)&&f.delete(c),r=!0}}return r}function A(){var t=[],n=Number.MAX_SAFE_INTEGER,e=f.shift(),r=e[0],o=e[2];if(0===f.length||!(16&e[1]||2&e[1]&&2&f[0][1])){for(;c.length&&u[0][0]>=r;){var i=c.shift(),a=u.shift();if(t.indexOf(i)<0&&M(a[1])){for(var s=void 0;(s=c.lastIndexOf(i))>=0;)c.splice(s,1),u.splice(s,1);n=Math.min(n,i.depth),t.unshift(i)}}o&&o(t),t.length&&(8&e[1]?O((function(){j(t,n)})):j(t,n))}}function j(t,n){void 0===n&&(n=0);var r,o,i=l[0],a=i&&4&i[2]&&i[1],u=function(t){return!a||a.indexOf(t)>=0};t:for(var c=t.length-1;c>=0;c--)if((r=t[c]).option&e.COMPUTED)t.splice(c,1),r.update();else{for(;(r=r.parent)&&r.depth>=n&&!r.is_run&&u(r);)if((o=t.indexOf(r))>=0){t[o].brokens.unshift(t[c]),t.splice(c,1);continue t}!(r=t[c]).is_run&&u(r)||t.splice(c,1)}for(c=0;c<t.length;c++)void 0!==(r=t[c]).parent&&r.update()}function C(t,n){return t===n||t!=t&&n!=n}function I(t){var n,e=t.target,i=e.__proto__,a=new d({}),u=(null===(n=Object.getOwnPropertyDescriptor(i,"size"))||void 0===n?void 0:n.get.bind(e))||function(){},c=e instanceof Map||e instanceof WeakMap;function f(t){return a.collect(t[0]),[t[0],T(t[1])]}function l(t){return a.collect(t[0]),T(t[1])}t.release=function(){return a.release(),t.release()},a._has=i.has.bind(e),a._val=c?function(t){return i.get.call(e,t)}:function(t){return i.has.call(e,t)?t:p},a._del=function(t){return i.delete.call(e,t)},a._set=i.set?function(t,n){return i.set.call(e,t,n)}:function(t,n){return i.add.call(e,t)};for(var v=r({get:function(t){return a.collect(t),T(i.get.call(e,t))},set:function(t,n){var r=s.get(t);r&&(t=r.target);var o=i.has.call(e,t),u=o?i.get.call(e,t):p;return o&&C(u,n)||b((function(){i.set.call(e,t,n),o||(a.notify(t,!1,1),a.notify(h,h,1)),a.notify(t,u)})),this},add:function(n){return i.has.call(e,n)||b((function(){var r=u();i.add.call(e,n),void 0!==r&&t.notify("size",r,6),a.notify(n,!1,1),a.notify(n,p),a.notify(h,h,1)})),this},delete:function(n){var r=i.get,o=r?r.call(e,n):n,c=u(),f=i.delete.call(e,n);return f&&b((function(){a.notify(n,o),a.notify(n,!0,1),a.notify(h,h,1),void 0!==c&&t.notify("size",c,6)})),f},clear:function(){var n=u();n&&b((function(){i.forEach.call(e,(function(t,n){a.notify(n,t),a.notify(n,!0,1)})),a.notify(h,h,1),t.notify("size",n,6),i.clear.call(e)}))},forEach:function(t){for(var n,r=[],u=1;u<arguments.length;u++)r[u-1]=arguments[u];return a.collect(h,1),(n=i.forEach).call.apply(n,o([e,function(n){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];t.apply(void 0,o([T(n)],e))}],r))},has:function(t){return a.collect(t,1),i.has.call(e,t)},size:u},[["keys",function(t){return t[0]}],["entries",f],["values",l],[Symbol.iterator,c?f:l]].reduce((function(t,n){var r=n[0],o=n[1],u=i.entries;return u&&(t[r]=function(){a.collect(h,1);var t=u.call(e),n=t.next.bind(t);return t.next=function(){var t=n(),e=t.done,r=t.value;return e||(r=o(r)),{done:e,value:r}},t}),t}),{})),_={},g=0,O=y(i);g<O.length;g++){var E=O[g],m=v[E],w=Object.getOwnPropertyDescriptor(i,E);m&&(void 0!==w.value?w.value=m:w.get=m),_[E]=w}e.__proto__=Object.create(e.__proto__.__proto__,_)}n.observable=T,n.computed=function(t,n){var r;void 0===n&&(n=null);var o=0,i=new v((function(){(o^=1)&&(r=t())}),e.COMPUTED);return i.parent=n,function(){return o||i.update(),r}},n.watch=S,n.reaction=function(t,n){return S(t,(function(t,e){C(t,e)||n(t)}))}}).call(this,e(1))},function(t,n){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(t){"object"==typeof window&&(e=window)}t.exports=e}])}));
//# sourceMappingURL=obb.js.map