!function(n,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e=t();for(var o in e)("object"==typeof exports?exports:n)[o]=e[o]}}(window,(function(){return function(n){var t={};function e(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return n[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}return e.m=n,e.c=t,e.d=function(n,t,o){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:o})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var r in n)e.d(o,r,function(t){return n[t]}.bind(null,r));return o},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=2)}([function(n,t,e){"use strict";(function(n){var e,o=this&&this.__assign||function(){return(o=Object.assign||function(n){for(var t,e=1,o=arguments.length;e<o;e++)for(var r in t=arguments[e])Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}).apply(this,arguments)},r=this&&this.__spreadArrays||function(){for(var n=0,t=0,e=arguments.length;t<e;t++)n+=arguments[t].length;var o=Array(n),r=0;for(t=0;t<e;t++)for(var i=arguments[t],a=0,u=i.length;a<u;a++,r++)o[r]=i[a];return o};Object.defineProperty(t,"__esModule",{value:!0}),t.MASK_UNDEFINED=t.MASK_ITERATE=t.reaction=t.watch=t.computed=t.SUBSCRIBE_OPTION=t.transacts=t.runInSandbox=t.sandbox=t.runInAction=t.action=t.runInAtom=t.atom=t.autorun=t.observable=t.Subscriber=t.Observer=void 0,function(n){n[n.DEFAULT=0]="DEFAULT",n[n.PREVENT_COLLECT=1]="PREVENT_COLLECT",n[n.COMPUTED=2]="COMPUTED"}(e||(e={})),t.SUBSCRIBE_OPTION=e;var i="object"==typeof window?window:n,a=[],u=[],c=[],s=[],f=new WeakMap,l=[],h=["iterate"];t.MASK_ITERATE=h;var p=["undefined"];t.MASK_UNDEFINED=p;var d=function(){function n(n){var t=this;switch(this.target=n,this.refmap=new Map,this.ownmap=new Map,this._has=function(n){return n in t.target},this._val=function(n){return t.target[n]},this._del=function(n){return delete t.target[n]},this._set=function(n,e){return t.target[n]=e},this._proxy_handler={get:function(n,e){var o=n[e];return"__proto__"!==e&&(o=E(o),t.collect(e)),o},set:function(n,e,o){var r=n[e],i=f.get(o),a=i?i.target:o,u=n.hasOwnProperty(e),c=j(r,a);return c&&u||_((function(){n[e]=a,u||(t.notify(e,!1,1),t.notify(h,h,1)),c||t.notify(e,r)})),!0},ownKeys:function(n){return t.collect(h,1),y(n)},has:function(n,e){return t.collect(e,1),e in n},deleteProperty:function(n,e){return _((function(){return n.hasOwnProperty(e)&&(t.notify(e,n[e]),t.notify(e,!0,1),t.notify(h,h,1)),delete n[e]}))}},!0){case n instanceof WeakSet:case n instanceof WeakMap:case n instanceof Map:case n instanceof Set:N(this);break;case n[Symbol.iterator]:case n instanceof Array:!function(n){var t=n.target,e=t.__proto__,o=n._proxy_handler.set;t.__proto__=Object.create(e,Array.prototype.concat.call(["push","pop","shift","unshift","splice","sort","reverse"].map((function(n){var t=e[n];return t&&[n,function(){var n=this,e=arguments;return _((function(){return t.apply(n,e)}))}]})),["values",Symbol.iterator].map((function(o){return e[o]&&[o,function(){n.collect(h,1);var e=0,o=n.proxy;return{next:function(){var r,i=e>=t.length;return i||(n.collect(e),r=o[e++]),{done:i,value:r}}}}]}))).reduce((function(n,t){return t&&(n[t[0]]={value:t[1]}),n}),{})),n._proxy_handler.set=function(e,r,i){var a=t.length;return _((function(){var u=o(e,r,i);return t.length!==a&&n.notify("length",a,10),u}))}}(this)}this.proxy=new Proxy(n,this._proxy_handler),f.set(this.proxy,this),f.set(n,this)}return n.TO_RAW=function(n){var t=f.get(n);return t?t.target:n},n.TO_OB=function(n){return f.get(n)},n.prototype.collect=function(n,t){void 0===t&&(t=2);var o=a[0];if(o&&!(o.option&e.PREVENT_COLLECT)){var r=this._map(t),i=r.get(n);i||r.set(n,i=new Set),o.depend(i)}},n.prototype.release=function(){for(var n=0,t=[this.refmap,this.ownmap];n<t.length;n++){var e=t[n];e.forEach((function(n){n.forEach((function(t){return t.undepend(n)}))})),e.clear()}},n.prototype.notify=function(n,t,e){void 0===e&&(e=2);var o=[this,n,t,e];l.length&&l[0][0].push(o);var r=this._map(e).get(n);if(r&&r.size)if(s.length)r.forEach((function(n){return n.addRecord(o)}));else{var i=Number.MAX_SAFE_INTEGER;r.forEach((function(n){(void 0).push(n),i>n.depth&&(i=n.depth)})),P(void 0,i)}},n.prototype._map=function(n){return 2&n?this.refmap:this.ownmap},n}();t.Observer=d;var v=function(){function n(n,t){void 0===t&&(t=e.DEFAULT),this.fn=n,this.option=t,this.depth=0,this.children=[],this._deps=new Set,this.is_run=!1,this.brokens=[],this.accu=0}return Object.defineProperty(n,"PARENT",{get:function(){return a[0]},enumerable:!1,configurable:!0}),n.prototype.undepend=function(n){this._deps.delete(n),n.delete(this)},n.prototype.depend=function(n){this._deps.add(n),n.add(this),this.option&e.COMPUTED&&this.parent&&void 0!==this.parent.parent&&this.parent.depend(n)},n.prototype.clear=function(n){var t=this;if(this._deps.forEach((function(n){return n.delete(t)})),this._deps.clear(),!n)for(var e=0,o=this.children;e<o.length;e++){var r=o[e];r.clear(),r.parent=void 0}this.children.length=0},n.prototype.unmount=function(n){if(this.clear(n),!n){var t=this.parent&&this.parent.children;if(t&&t.splice(t.indexOf(this),1),this._sandbox){var e=this._sandbox[1].indexOf(this);e>=0&&this._sandbox[1].splice(e,1)}}this._sandbox=void 0,this.parent=void 0},n.prototype.mount=function(t){if(void 0!==this.parent)return new n(this.fn).mount(t);if(this.parent=t||a[0],this.parent){if(void 0===this.parent.parent)return this.parent=void 0,this;this.depth=this.parent.depth+1}else this.parent=null;return l.length&&(this._sandbox=l[0],this._sandbox[1].push(this)),this.parent&&this.parent.children.push(this),this._run(),this},n.prototype.update=function(){return this.clear(),this._run()},n.prototype.addRecord=function(n){var t=s[0][0],o=c.indexOf(this);o<0||u[o][0]<t?(u.unshift([t,[n]]),c.unshift(this)):u[o][1].push(n),this.option&e.COMPUTED&&this.parent&&void 0!==this.parent.parent&&this.parent.addRecord(n)},n.prototype._run=function(){this.is_run=!0,a.unshift(this),this.accu+=1;try{return this.res=this.fn()}catch(n){throw n}finally{a.shift(),this.is_run=!1,this.brokens.length=0}},n}();function y(n){return Array.prototype.concat.call(Object.getOwnPropertySymbols(n),Object.getOwnPropertyNames(n))}function g(n,t){for(var e=[],o=2;o<arguments.length;o++)e[o-2]=arguments[o];I(n);try{return t.apply(void 0,e)}catch(n){throw n}finally{T()}}t.Subscriber=v,t.transacts=g,t.atom=function(n){return g.bind(null,n,2)};var b=g.bind(null,2);t.runInAtom=b;var _=g.bind(null,18);t.action=function(n){return g.bind(null,1,n)};var m=g.bind(null,1);t.runInAction=m,t.sandbox=function(n,t){return void 0===t&&(t=7),x.bind(null,t,n)};var O=x.bind(null,7);function x(n,t){for(var o=[],r=2;r<arguments.length;r++)o[r-2]=arguments[r];var i=l[0],u=a[0],c=u&&u.option,s=4&n||!i?[]:i[1],f=s.length,h=4&n||!i?[]:i[0];u&&(u.option=1&n?c|e.PREVENT_COLLECT:c&~e.PREVENT_COLLECT),l.unshift([h,s,n|(i&&4&i[2])]);try{return t.apply(void 0,o)}catch(n){throw n}finally{if(l.shift(),4&n&&w(h),2&n){for(var p=s.length-1;p>=f;p--){var d=s[p];d.unmount(d.parent!==u)}s.length=f}else i&&4&n&&Array.prototype.push.apply(i[1],s);u&&(u.option=c)}}function w(n){var t=[];M(n,(function(n){var e=n[0],o=n[1],r=n[3];if(1&r)e._del(o);else if(4&~r){if(8&r)return void t.push(n);e._set(o,n[2])}}));for(var e=0,o=t;e<o.length;e++){var r=o[e];r[0]._set(r[1],r[2])}}t.runInSandbox=O,t.autorun=function(n){var t=new v(n);return t.mount(),function(){t.unmount()}};var S=new Set([Object,Array,Map,Set,WeakMap,WeakSet]);function E(n){if(n&&"object"==typeof n){var t=f.get(n);if(t)n=t.proxy;else{var e=n.constructor;(S.has(e)||i[e.name]!==e)&&(n=new d(n).proxy)}}return n}function A(n,t,e){var o=[],r=new v((function(){if(o.unshift(n()),o.length>1){var r=o[0],i=o[1];j(r,i)||t(r,i)}else 1===o.length&&e&&t(o[0]);o.length=1}));return r.mount(),function(){r.unmount()}}function I(n){var t,e=s[0];void 0===n?n=e?2&e[1]:1:"number"!=typeof n&&(t=n.hook,n=n.option),s.unshift([s.length,n,t])}function M(n,t){for(var e=new Map,o=!1,r=0,i=n;r<i.length;r++){var a=i[r],u=a[0],c=a[1],s=e.get(u);if(s){if(s.has(c))continue;s.add(c)}else e.set(u,new Set([c]));if(!j(1!==a[3]?u._val(c):u._has(c),a[2])){if(!t)return!0;-1===t(a)&&s.delete(c),o=!0}}return o}function T(){var n=[],t=Number.MAX_SAFE_INTEGER,e=s.shift(),o=e[0],r=e[2];if(0===s.length||!(16&e[1]||2&e[1]&&2&s[0][1])){for(;c.length&&u[0][0]>=o;){var i=c.shift(),a=u.shift();if(n.indexOf(i)<0&&M(a[1])){for(var f=void 0;(f=c.lastIndexOf(i))>=0;)c.splice(f,1),u.splice(f,1);t=Math.min(t,i.depth),n.unshift(i)}}r&&r(n),n.length&&(8&e[1]?m((function(){P(n,t)})):P(n,t))}}function P(n,t){void 0===t&&(t=0);var o,r,i=l[0],a=i&&4&i[2]&&i[1],u=function(n){return!a||a.indexOf(n)>=0};n:for(var c=n.length-1;c>=0;c--)if((o=n[c]).option&e.COMPUTED)n.splice(c,1),o.update();else{for(;(o=o.parent)&&o.depth>=t&&!o.is_run&&u(o);)if((r=n.indexOf(o))>=0){n[r].brokens.unshift(n[c]),n.splice(c,1);continue n}!(o=n[c]).is_run&&u(o)||n.splice(c,1)}for(c=0;c<n.length;c++)void 0!==(o=n[c]).parent&&o.update()}function j(n,t){return n===t||n!=n&&t!=t}function N(n){var t,e=n.target,i=e.__proto__,a=new d({}),u=(null===(t=Object.getOwnPropertyDescriptor(i,"size"))||void 0===t?void 0:t.get.bind(e))||function(){},c=e instanceof Map||e instanceof WeakMap;function s(n){return a.collect(n[0]),[n[0],E(n[1])]}function l(n){return a.collect(n[0]),E(n[1])}n.release=function(){return a.release(),n.release()},a._has=i.has.bind(e),a._val=c?function(n){return i.get.call(e,n)}:function(n){return i.has.call(e,n)?n:p},a._del=function(n){return i.delete.call(e,n)},a._set=i.set?function(n,t){return i.set.call(e,n,t)}:function(n,t){return i.add.call(e,n)};for(var v=o({get:function(n){return a.collect(n),E(i.get.call(e,n))},set:function(n,t){var o=f.get(n);o&&(n=o.target);var r=i.has.call(e,n),u=r?i.get.call(e,n):p;return r&&j(u,t)||_((function(){i.set.call(e,n,t),r||(a.notify(n,!1,1),a.notify(h,h,1)),a.notify(n,u)})),this},add:function(t){return i.has.call(e,t)||_((function(){var o=u();i.add.call(e,t),void 0!==o&&n.notify("size",o,6),a.notify(t,!1,1),a.notify(t,p),a.notify(h,h,1)})),this},delete:function(t){var o=i.get,r=o?o.call(e,t):t,c=u(),s=i.delete.call(e,t);return s&&_((function(){a.notify(t,r),a.notify(t,!0,1),a.notify(h,h,1),void 0!==c&&n.notify("size",c,6)})),s},clear:function(){var t=u();t&&_((function(){i.forEach.call(e,(function(n,t){a.notify(t,n),a.notify(t,!0,1)})),a.notify(h,h,1),n.notify("size",t,6),i.clear.call(e)}))},forEach:function(n){for(var t,o=[],u=1;u<arguments.length;u++)o[u-1]=arguments[u];return a.collect(h,1),(t=i.forEach).call.apply(t,r([e,function(t){for(var e=[],o=1;o<arguments.length;o++)e[o-1]=arguments[o];n.apply(void 0,r([E(t)],e))}],o))},has:function(n){return a.collect(n,1),i.has.call(e,n)},size:u},[["keys",function(n){return n[0]}],["entries",s],["values",l],[Symbol.iterator,c?s:l]].reduce((function(n,t){var o=t[0],r=t[1],u=i.entries;return u&&(n[o]=function(){a.collect(h,1);var n=u.call(e),t=n.next.bind(n);return n.next=function(){var n=t(),e=n.done,o=n.value;return e||(o=r(o)),{done:e,value:o}},n}),n}),{})),g={},b=0,m=y(i);b<m.length;b++){var O=m[b],x=v[O],w=Object.getOwnPropertyDescriptor(i,O);x&&(void 0!==w.value?w.value=x:w.get=x),g[O]=w}e.__proto__=Object.create(e.__proto__.__proto__,g)}t.observable=E,t.computed=function(n,t){var o;void 0===t&&(t=null);var r=0,i=new v((function(){(r^=1)&&(o=n())}),e.COMPUTED);return i.parent=t,function(){return r||i.update(),o}},t.watch=A,t.reaction=function(n,t){return A(n,(function(n,e){j(n,e)||t(n)}))}}).call(this,e(1))},function(n,t){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(n){"object"==typeof window&&(e=window)}n.exports=e},function(n,t,e){"use strict";var o,r=this&&this.__spreadArrays||function(){for(var n=0,t=0,e=arguments.length;t<e;t++)n+=arguments[t].length;var o=Array(n),r=0;for(t=0;t<e;t++)for(var i=arguments[t],a=0,u=i.length;a<u;a++,r++)o[r]=i[a];return o};Object.defineProperty(t,"__esModule",{value:!0});var i=e(0),a=i.observable([{a:1},2,3]),u=i.observable(((o={a:[1],b:2,c:3})[Symbol("test")]=4,o)),c=i.observable(new Set([1,2,3])),s=i.observable(new Map([["a",[1]],["b",2],["c",3]])),f=i.observable(new WeakSet),l=i.observable(new WeakMap),h=i.observable(new Float32Array(10));function p(n){for(var t=[],e=1;e<arguments.length;e++)t[e-1]=arguments[e];t.length&&t.unshift("->"),console.log.apply(console,r([n],t))}console.log(""+i.observable(new Date)),i.autorun((function(){console.log(i.Subscriber.PARENT)}));var d=i.observable([1,2,3]);i.runInSandbox((function(){i.autorun((function(){console.log("a[0]",d[0])})),d.unshift(111),i.runInSandbox((function(){d.unshift(222),i.autorun((function(){console.log("a[1]",d[1])})),d.unshift(333)})),console.log("JSON.stringify(a)",JSON.stringify(d)),i.runInAction((function(){d.unshift(1,2,3),d.splice(0,3)})),i.runInAction((function(){d[0]+=1,d[0]+=1})),i.autorun((function(){i.sandbox((function(){console.log("a[1]",d[1]),i.sandbox((function(){console.log("a[2]",d[2])}),0)()}),1)()})),d[1]+=1,console.log("-----------------"),d[2]+=1})),console.log("================="),console.log("JSON.stringify(a)",JSON.stringify(d)),i.autorun((function(){p("----------");for(var n=0,t=d;n<t.length;n++){p(t[n])}p("----------")})),i.autorun((function(){p("a[1] = a[2] + "),d[1]=d[2]+Math.random()})),i.autorun((function(){p("a[2] = a[1] + "),d[2]=d[1]+Math.random()})),i.runInAction((function(){i.transacts(8,(function(){p("a[1] = 16;"),d[1]=16,p("a[2] = 6;"),d[2]=6})),p(333)})),i.autorun((function(){console.log("000000001111",s.get("a"))})),i.runInSandbox((function(){i.autorun((function(){console.log("1111",s.get("a")),i.runInSandbox((function(){console.log("222",s.get("b")),i.sandbox((function(){console.log("333",s.get("c"))}),2)()}))})),s.set("a",[333]),i.sandbox((function(){s.set("a",[444])}),0)(),i.runInSandbox((function(){s.set("a",[555])})),s.set("c",["cccccccccc"])})),s.set("a",[666]),i.autorun((function(){console.log(111,s.get("a")),i.autorun((function(){console.log(111,s.keys());for(var n=function(n){i.autorun((function(){var t=s.get(n);console.log(111,n,t,t instanceof Array&&t[0])}))},t=0,e=Array.from(s.keys());t<e.length;t++){n(e[t])}}))})),p("-------------"),i.runInSandbox((function(){console.log(s),i.autorun((function(){console.log(s.get("a")),i.autorun((function(){console.log(s.keys());for(var n=function(n){i.autorun((function(){var t=s.get(n);console.log(n,t,t instanceof Array&&t[0])}))},t=0,e=Array.from(s.keys());t<e.length;t++)n(e[t])}))})),p("-------------",'map.get("a")[0] = 2'),s.get("a")[0]=2,p("-------------",'map.set("a", [3]);'),s.set("a",[3]),p("-------------",'map.set("b", [4]);'),s.set("b",[4]),p("-------------"),i.autorun((function(){p("array[Symbol.iterator]().next().value",a[Symbol.iterator]().next())})),i.autorun((function(){p(" array.indexOf(2)",a.indexOf(2))})),i.autorun((function(){p("array.values()",a.values())})),i.autorun((function(){p("array[0].a",a[0].a)})),i.autorun((function(){p("array.length",a.length)})),a.unshift(a[0]),a.unshift({a:1.1}),i.runInAtom((function(){i.runInAction((function(){a.unshift({a:0})})),a.shift()})),a[0].a=1.2,i.autorun((function(){p("array[1], json.a[0]",a[1],u.a[0])})),i.autorun((function(){p("array[3]",a[3])})),i.runInAction((function(){console.log("runInAction1","==========="),a[1]={a:1.3},i.runInAction((function(){console.log("runInAction2","==========="),a[1]={a:1.4},u.a[0]+=.1})),console.log("runInAction3","==========="),a[3]+=.1})),console.log("runInAction4","==========="),console.log("array","->",JSON.stringify(a)),p("------------------"),i.autorun((function(){p("weakset.a",f.a)})),i.autorun((function(){p('"a" in weakset',"a"in f)})),f.a=3,delete f.a,i.autorun((function(){p("weakset.has(f32arr)",f.has(h))})),f.add(h),f.delete(h),i.autorun((function(){p(l,l.get(h))})),l.set(h,33),l.delete(h),p(c[Symbol.toStringTag]),i.autorun((function(){p(Object.keys(u))})),u.d=2,delete u.d,i.autorun((function(){p('"2" in array',"2"in a)})),p("3333",u.d),i.autorun((function(){p("set.size",c.size)})),i.autorun((function(){p("set.has(2)",c.has(2))})),i.autorun((function(){p("set.has(4)",c.has(4))})),p("---------------------set.add(4);"),c.add(4),p("---------------------set.delete(2);"),c.delete(2),p("---------------------set.clear()"),c.clear(),p("---------------------")})),console.log(a,u,c,s,f,l,h),p("-------------",'map.set("a", [3]);'),s.set("a",[3]),p("-------------",'map.set("b", [4]);'),s.set("b",[4]),p("-------------"),p("-------------",'map.get("a")[0] = 3'),s.get("a")[0]=4,i.autorun((function(){i.runInSandbox((function(){console.log("Sandbox",s.get("b")),i.sandbox((function(){console.log("NORMAL",s.get("a"))}),0)()}))})),p("-------------",'map.set("a", [5]);'),s.set("a",[5]),p("-------------",'map.set("b", [6]);'),s.set("b",[6])}])}));
//# sourceMappingURL=test.js.map