!function(n,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e=t();for(var o in e)("object"==typeof exports?exports:n)[o]=e[o]}}(window,(function(){return function(n){var t={};function e(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return n[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}return e.m=n,e.c=t,e.d=function(n,t,o){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:o})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var r in n)e.d(o,r,function(t){return n[t]}.bind(null,r));return o},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=1)}([function(n,t,e){"use strict";var o,r=this&&this.__assign||function(){return(r=Object.assign||function(n){for(var t,e=1,o=arguments.length;e<o;e++)for(var r in t=arguments[e])Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}).apply(this,arguments)},i=this&&this.__spreadArrays||function(){for(var n=0,t=0,e=arguments.length;t<e;t++)n+=arguments[t].length;var o=Array(n),r=0;for(t=0;t<e;t++)for(var i=arguments[t],a=0,u=i.length;a<u;a++,r++)o[r]=i[a];return o};Object.defineProperty(t,"__esModule",{value:!0}),t.reaction=t.watch=t.computed=t.SANDOBX_OPTION=t.runInSandbox=t.sandbox=t.runInAction=t.action=t.runInAtom=t.atom=t.autorun=t.observable=t.Subscriber=t.Observer=void 0,function(n){n[n.PREVENT_COLLECT=1]="PREVENT_COLLECT",n[n.CLEAN_SUBSCRIBE=2]="CLEAN_SUBSCRIBE",n[n.CLEAN_CHANGE=4]="CLEAN_CHANGE",n[n.DEFAULT=7]="DEFAULT",n[n.NORMAL=0]="NORMAL"}(o||(o={})),t.SANDOBX_OPTION=o;var a=[],u=[],c=[],s=[],f=new WeakMap,l=[],h=["iterate"],p=["undefined"],d=function(){function n(n){var t=this;switch(this.target=n,this.refmap=new Map,this.ownmap=new Map,this._has=function(n){return n in t.target},this._val=function(n){return t.target[n]},this._del=function(n){return delete t.target[n]},this._set=function(n,e){return t.target[n]=e},this._proxy_handler={get:function(n,e){var o=n[e];return"__proto__"!==e&&(o=A(o),t.collect(e)),o},set:function(n,e,o){var r=n[e],i=f.get(o),a=i?i.target:o,u=n.hasOwnProperty(e),c=N(r,a);return c&&u||(n[e]=a),u||(t.notify(e,!1,1),t.notify(h,h,1)),c||t.notify(e,r),!0},ownKeys:function(n){return t.collect(h,1),y(n)},has:function(n,e){return t.collect(e,1),e in n},deleteProperty:function(n,e){return _((function(){return n.hasOwnProperty(e)&&(t.notify(e,n[e]),t.notify(e,!0,1),t.notify(h,h,1)),delete n[e]}))}},!0){case n instanceof WeakSet:case n instanceof WeakMap:case n instanceof Map:case n instanceof Set:E(this);break;case n[Symbol.iterator]:case n instanceof Array:!function(n){var t=n.target,e=t.__proto__,o=n._proxy_handler.set;t.__proto__=Object.create(e,Array.prototype.concat.call(["push","pop","shift","unshift","splice","sort","reverse"].map((function(n){var t=e[n];return t&&[n,function(){var n=this,e=arguments;return _((function(){return t.apply(n,e)}))}]})),["values",Symbol.iterator].map((function(o){return e[o]&&[o,function(){n.collect(h,1);var e=0,o=n.proxy;return{next:function(){var n,r=e>=t.length;return r||(n=o[e++]),{done:r,value:n}}}}]}))).reduce((function(n,t){return t&&(n[t[0]]={value:t[1]}),n}),{})),n._proxy_handler.set=function(e,r,i){var a=t.length;return _((function(){var u=o(e,r,i);return t.length!==a&&n.notify("length",a,10),u}))}}(this)}this.proxy=new Proxy(n,this._proxy_handler),f.set(this.proxy,this),f.set(n,this)}return n.prototype.collect=function(n,t){void 0===t&&(t=2);var e=a[0];if(e&&!e.passive){var o=this._map(t),r=o.get(n);r||o.set(n,r=new Set),e.depend(r)}},n.prototype.release=function(){for(var n=0,t=[this.refmap,this.ownmap];n<t.length;n++){var e=t[n];e.forEach((function(n){n.forEach((function(t){return t.undepend(n)}))})),e.clear()}},n.prototype.notify=function(n,t,e){void 0===e&&(e=2);var o=[this,n,t,e];l.length&&l[0][0].push(o);var r=this._map(e).get(n);r&&r.size&&m(Array.from(r),s.length&&o)},n.prototype._map=function(n){return 2&n?this.refmap:this.ownmap},n}();t.Observer=d;var v=function(){function n(n,t){this.fn=n,this.passive=t,this.children=[],this._deps=new Set,this.is_run=!1}return n.prototype.undepend=function(n){this._deps.delete(n),n.delete(this)},n.prototype.depend=function(n){this._deps.add(n),n.add(this)},n.prototype.clear=function(n){var t=this;if(this._deps.forEach((function(n){return n.delete(t)})),this._deps.clear(),!n)for(var e=0,o=this.children;e<o.length;e++){var r=o[e];r.clear(),r.parent=void 0}this.children.length=0},n.prototype.unmount=function(n){var t;if(this.clear(n),!n){var e=null===(t=this.parent)||void 0===t?void 0:t.children;if(e&&e.splice(e.indexOf(this),1),this._sandbox){var o=this._sandbox[1].indexOf(this);o>=0&&this._sandbox[1].splice(o,1)}}this._sandbox=void 0,this.parent=void 0},n.prototype.mount=function(){return void 0!==this.parent?new n(this.fn).mount():(l.length&&(this._sandbox=l[0],this._sandbox[1].push(this)),this.parent=a[0]||null,this.parent&&this.parent.children.push(this),this._run(),this)},n.prototype.update=function(){return this.clear(),this._run()},n.prototype.addRecord=function(n){var t=s[0][0],e=c.indexOf(this);e<0||u[e][0]<t?(u.unshift([t,[n]]),c.unshift(this)):u[e][1].push(n)},n.prototype._run=function(){this.is_run=!0,a.unshift(this);try{return this.res=this.fn()}catch(n){throw n}finally{a.shift(),this.is_run=!1}},n}();function y(n){return Array.prototype.concat.call(Object.getOwnPropertySymbols(n),Object.getOwnPropertyNames(n))}function g(n,t){!function(n){var t=s[0],e=void 0===n&&t?1&t[1]:n?1:0;s.unshift([n&&t?t[0]:s.length,e])}(t);try{return n()}catch(n){throw n}finally{!function(){var n=[],t=s.shift(),e=t[0];if(1&t[1]&&0!==s.length)return;for(;c.length&&u[0][0]>=e;){var o=c.shift(),r=u.shift();if(n.indexOf(o)<0&&x(r[1])){for(var i=void 0;(i=c.lastIndexOf(o))>=0;)c.splice(i,1),u.splice(i,1);n.unshift(o)}}m(n)}()}}function _(n){return g(n,!0)}function b(n,t){void 0===t&&(t=o.DEFAULT);var e=l[0],r=a[0],i=r&&r.passive,u=t&o.CLEAN_CHANGE||!e?[]:e[1],c=u.length,s=t&o.CLEAN_CHANGE||!e?[]:e[0];r&&(r.passive=t&o.PREVENT_COLLECT),l.unshift([s,u,t|(e&&e[2]&o.CLEAN_CHANGE)]);try{return n()}catch(n){throw n}finally{if(l.shift(),t&o.CLEAN_CHANGE&&function(n){var t=[];x(n,(function(n){var e=n[0],o=n[1],r=n[3];if(1&r)e._del(o);else if(4&~r){if(8&r)return void t.push(n);e._set(o,n[2])}}));for(var e=0,o=t;e<o.length;e++){var r=o[e];r[0]._set(r[1],r[2])}}(s),t&o.CLEAN_SUBSCRIBE){for(var f=u.length-1;f>=c;f--){var h=u[f];h.unmount(h.parent!==r)}u.length=c}else e&&t&o.CLEAN_CHANGE&&Array.prototype.push.apply(e[1],u);r&&(r.passive=i)}}t.Subscriber=v,t.atom=function(n){return g.bind(null,n,!0)},t.runInAtom=_,t.action=function(n){return g.bind(null,n)},t.runInAction=function(n){return g(n)},t.sandbox=function(n){return b.bind(null,n)},t.runInSandbox=b,t.autorun=function(n,t){void 0===t&&(t=!1);var e=new v(n,t);return e.mount(),function(){e.unmount()}};var O=new Set([Date,RegExp]);function A(n){if(n&&"object"==typeof n){var t=f.get(n);t?n=t.proxy:O.has(n.constructor)||(n=new d(n).proxy)}return n}function S(n,t){var e=[],o=new v((function(){e.unshift(n()),e.length>1&&(t(e[0],e[1]),e.length=1)}));return o.mount(),function(){o.unmount()}}function x(n,t){for(var e=new Map,o=!1,r=0,i=n;r<i.length;r++){var a=i[r],u=a[0],c=a[1],s=e.get(u);if(s){if(s.has(c))continue;s.add(c)}else e.set(u,new Set([c]));if(!N(1!==a[3]?u._val(c):u._has(c),a[2])){if(!t)return!0;-1===t(a)&&s.delete(c),o=!0}}return o}function m(n,t){var e=l[0],r=e&&e[2]&o.CLEAN_CHANGE&&e[1];function i(n){return!r||r.indexOf(n)>=0}n:for(var a=0;a<n.length;a++){for(var u=n[a];(u=u.parent)&&!u.is_run&&i(u);)if(n.indexOf(u)>=0){n.splice(a--,1);continue n}!(u=n[a]).is_run&&i(u)||n.splice(a--,1)}n.forEach(t?function(n){return n.addRecord(t)}:function(n){return n.update()})}function N(n,t){return n===t||n!=n&&t!=t}function E(n){var t,e=n.target,o=e.__proto__,a=new d({}),u=(null===(t=Object.getOwnPropertyDescriptor(o,"size"))||void 0===t?void 0:t.get.bind(e))||function(){};n.release=function(){return a.release(),n.release()},a._has=o.has.bind(e),e instanceof Map||e instanceof WeakMap?a._val=function(n){return o.get.call(e,n)}:a._val=function(n){return o.has.call(e,n)?n:p},a._del=function(n){return o.delete.call(e,n)},a._set=o.set?function(n,t){return o.set.call(e,n,t)}:function(n,t){return o.add.call(e,n)};for(var c=r({get:function(n){return a.collect(n),A(o.get.call(e,n))},set:function(n,t){var r=f.get(n);r&&(n=r.target);var i=o.has.call(e,n),u=i?o.get.call(e,n):void 0;return o.set.call(e,n,t),i||a.notify(n,!1,1),a.notify(n,u),this},add:function(t){return o.has.call(e,t)||_((function(){var r=u();o.add.call(e,t),void 0!==r&&n.notify("size",r,6),a.notify(t,!1,1),a.notify(t,p),a.notify(h,h,1)})),this},delete:function(t){var r=o.get,i=r?r.call(e,t):t,c=u(),s=o.delete.call(e,t);return s&&_((function(){a.notify(t,i),a.notify(t,!0,1),a.notify(h,h,1),void 0!==c&&n.notify("size",c,6)})),s},clear:function(){var t=u();t&&_((function(){o.forEach.call(e,(function(n,t){a.notify(t,n),a.notify(t,!0,1)})),a.notify(h,h,1),n.notify("size",t,6),o.clear.call(e)}))},forEach:function(n){for(var t,r=[],u=1;u<arguments.length;u++)r[u-1]=arguments[u];return a.collect(h,1),(t=o.forEach).call.apply(t,i([e,function(t){for(var e=[],o=1;o<arguments.length;o++)e[o-1]=arguments[o];n.apply(void 0,i([A(t)],e))}],r))},has:function(n){return a.collect(n,1),o.has.call(e,n)},size:u},[["keys",function(n){return n[0]}],["entries",function(n){return[n[0],A(n[1])]}],["values",function(n){return A(n[1])}],[Symbol.iterator,function(n){return A(n[1])}]].reduce((function(n,t){var r=t[0],i=t[1],u=o.entries;return u&&(n[r]=function(){a.collect(h,1);var n=u.call(e),t=n.next.bind(n);return n.next=function(){var n=t(),e=n.done,o=n.value;return e||(a.collect(o[0]),a.collect(o[0],1),o=i(o)),{done:e,value:o}},n}),n}),{})),s={},l=0,v=y(o);l<v.length;l++){var g=v[l],b=c[g],O=Object.getOwnPropertyDescriptor(o,g);b&&(void 0!==O.value?O.value=b:O.get=b),s[g]=O}e.__proto__=Object.create(e.__proto__.__proto__,s)}t.observable=A,t.computed=function(n){var t,e=0,o=new v((function(){(e^=1)&&(t=n())}));return function(){return e||o.update(),t}},t.watch=S,t.reaction=function(n,t){return S(n,(function(n,e){N(n,e)||t(n)}))}},function(n,t,e){"use strict";var o,r=this&&this.__spreadArrays||function(){for(var n=0,t=0,e=arguments.length;t<e;t++)n+=arguments[t].length;var o=Array(n),r=0;for(t=0;t<e;t++)for(var i=arguments[t],a=0,u=i.length;a<u;a++,r++)o[r]=i[a];return o};Object.defineProperty(t,"__esModule",{value:!0});var i=e(0),a=i.observable([{a:1},2,3]),u=i.observable(((o={a:[1],b:2,c:3})[Symbol("test")]=4,o)),c=i.observable(new Set([1,2,3])),s=i.observable(new Map([["a",[1]],["b",2],["c",3]])),f=i.observable(new WeakSet),l=i.observable(new WeakMap),h=i.observable(new Float32Array(10));function p(n){for(var t=[],e=1;e<arguments.length;e++)t[e-1]=arguments[e];t.length&&t.unshift("->"),console.log.apply(console,r([n],t))}console.log(""+i.observable(new Date));var d=i.observable([1,2,3]);i.runInSandbox((function(){i.autorun((function(){console.log("a[0]",d[0])})),d.unshift(111),i.runInSandbox((function(){d.unshift(222),i.autorun((function(){console.log("a[1]",d[1])})),d.unshift(333)})),console.log("JSON.stringify(a)",JSON.stringify(d)),i.runInAction((function(){d.unshift(1,2,3),d.splice(0,3)})),i.runInAction((function(){d[0]+=1,d[0]+=1})),i.autorun((function(){i.runInSandbox((function(){console.log("a[1]",d[1]),i.runInSandbox((function(){console.log("a[2]",d[2])}),i.SANDOBX_OPTION.NORMAL)}),i.SANDOBX_OPTION.PREVENT_COLLECT)})),d[1]+=1,console.log("-----------------"),d[2]+=1})),console.log("================="),console.log("JSON.stringify(a)",JSON.stringify(d)),i.autorun((function(){console.log("000000001111",s.get("a"))})),i.runInSandbox((function(){i.autorun((function(){console.log("1111",s.get("a")),i.runInSandbox((function(){console.log("222",s.get("b")),i.runInSandbox((function(){console.log("333",s.get("c"))}),i.SANDOBX_OPTION.CLEAN_SUBSCRIBE)}))})),s.set("a",[333]),i.runInSandbox((function(){s.set("a",[444])}),i.SANDOBX_OPTION.NORMAL),i.runInSandbox((function(){s.set("a",[555])})),s.set("c",["cccccccccc"])})),s.set("a",[666]),i.autorun((function(){console.log(111,s.get("a")),i.autorun((function(){console.log(111,s.keys());for(var n=function(n){i.autorun((function(){var t=s.get(n);console.log(111,n,t,t instanceof Array&&t[0])}))},t=0,e=Array.from(s.keys());t<e.length;t++){n(e[t])}}))})),p("-------------"),i.runInSandbox((function(){console.log(s),i.autorun((function(){console.log(s.get("a")),i.autorun((function(){console.log(s.keys());for(var n=function(n){i.autorun((function(){var t=s.get(n);console.log(n,t,t instanceof Array&&t[0])}))},t=0,e=Array.from(s.keys());t<e.length;t++)n(e[t])}))})),p("-------------",'map.get("a")[0] = 2'),s.get("a")[0]=2,p("-------------",'map.set("a", [3]);'),s.set("a",[3]),p("-------------",'map.set("b", [4]);'),s.set("b",[4]),p("-------------"),i.autorun((function(){p("array[Symbol.iterator]().next().value",a[Symbol.iterator]().next())})),i.autorun((function(){p(" array.indexOf(2)",a.indexOf(2))})),i.autorun((function(){p("array.values()",a.values())})),i.autorun((function(){p("array[0].a",a[0].a)})),i.autorun((function(){p("array.length",a.length)})),a.unshift(a[0]),a.unshift({a:1.1}),i.runInAtom((function(){i.runInAction((function(){a.unshift({a:0})})),a.shift()})),a[0].a=1.2,i.autorun((function(){p("array[1], json.a[0]",a[1],u.a[0])})),i.autorun((function(){p("array[3]",a[3])})),i.runInAction((function(){console.log("runInAction1","==========="),a[1]={a:1.3},i.runInAction((function(){console.log("runInAction2","==========="),a[1]={a:1.4},u.a[0]+=.1})),console.log("runInAction3","==========="),a[3]+=.1})),console.log("runInAction4","==========="),console.log("array","->",JSON.stringify(a)),p("------------------"),i.autorun((function(){p("weakset.a",f.a)})),i.autorun((function(){p('"a" in weakset',"a"in f)})),f.a=3,delete f.a,i.autorun((function(){p("weakset.has(f32arr)",f.has(h))})),f.add(h),f.delete(h),i.autorun((function(){p(l,l.get(h))})),l.set(h,33),l.delete(h),p(c[Symbol.toStringTag]),i.autorun((function(){p(Object.keys(u))})),u.d=2,delete u.d,i.autorun((function(){p('"2" in array',"2"in a)})),p("3333",u.d),i.autorun((function(){p("set.size",c.size)})),i.autorun((function(){p("set.has(2)",c.has(2))})),i.autorun((function(){p("set.has(4)",c.has(4))})),p("---------------------set.add(4);"),c.add(4),p("---------------------set.delete(2);"),c.delete(2),p("---------------------set.clear()"),c.clear(),p("---------------------")})),console.log(a,u,c,s,f,l,h),p("-------------",'map.set("a", [3]);'),s.set("a",[3]),p("-------------",'map.set("b", [4]);'),s.set("b",[4]),p("-------------"),p("-------------",'map.get("a")[0] = 3'),s.get("a")[0]=4,i.autorun((function(){i.runInSandbox((function(){console.log("Sandbox",s.get("b")),i.runInSandbox((function(){console.log("NORMAL",s.get("a"))}),i.SANDOBX_OPTION.NORMAL)}))})),p("-------------",'map.set("a", [5]);'),s.set("a",[5]),p("-------------",'map.set("b", [6]);'),s.set("b",[6])}])}));
//# sourceMappingURL=test.js.map