!function(n,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e=t();for(var o in e)("object"==typeof exports?exports:n)[o]=e[o]}}(window,(function(){return function(n){var t={};function e(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return n[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}return e.m=n,e.c=t,e.d=function(n,t,o){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:o})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var r in n)e.d(o,r,function(t){return n[t]}.bind(null,r));return o},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=2)}([function(n,t,e){"use strict";(function(n){var e,o=this&&this.__assign||function(){return(o=Object.assign||function(n){for(var t,e=1,o=arguments.length;e<o;e++)for(var r in t=arguments[e])Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}).apply(this,arguments)},r=this&&this.__spreadArrays||function(){for(var n=0,t=0,e=arguments.length;t<e;t++)n+=arguments[t].length;var o=Array(n),r=0;for(t=0;t<e;t++)for(var a=arguments[t],i=0,u=a.length;i<u;i++,r++)o[r]=a[i];return o};Object.defineProperty(t,"__esModule",{value:!0}),t.reaction=t.watch=t.computed=t.SUBSCRIBE_OPTION=t.transacts=t.runInSandbox=t.sandbox=t.runInAction=t.action=t.runInAtom=t.atom=t.autorun=t.observable=t.Subscriber=t.Observer=void 0,function(n){n[n.DEFAULT=0]="DEFAULT",n[n.PREVENT_COLLECT=1]="PREVENT_COLLECT"}(e||(e={})),t.SUBSCRIBE_OPTION=e;var a="object"==typeof window?window:n,i=[],u=[],c=[],s=[],f=new WeakMap,l=[],h=["iterate"],p=["undefined"],d=function(){function n(n){var t=this;switch(this.target=n,this.refmap=new Map,this.ownmap=new Map,this._has=function(n){return n in t.target},this._val=function(n){return t.target[n]},this._del=function(n){return delete t.target[n]},this._set=function(n,e){return t.target[n]=e},this._proxy_handler={get:function(n,e){var o=n[e];return"__proto__"!==e&&(o=A(o),t.collect(e)),o},set:function(n,e,o){var r=n[e],a=f.get(o),i=a?a.target:o,u=n.hasOwnProperty(e),c=k(r,i);return c&&u||(n[e]=i),u||(t.notify(e,!1,1),t.notify(h,h,1)),c||t.notify(e,r),!0},ownKeys:function(n){return t.collect(h,1),y(n)},has:function(n,e){return t.collect(e,1),e in n},deleteProperty:function(n,e){return _((function(){return n.hasOwnProperty(e)&&(t.notify(e,n[e]),t.notify(e,!0,1),t.notify(h,h,1)),delete n[e]}))}},!0){case n instanceof WeakSet:case n instanceof WeakMap:case n instanceof Map:case n instanceof Set:T(this);break;case n[Symbol.iterator]:case n instanceof Array:!function(n){var t=n.target,e=t.__proto__,o=n._proxy_handler.set;t.__proto__=Object.create(e,Array.prototype.concat.call(["push","pop","shift","unshift","splice","sort","reverse"].map((function(n){var t=e[n];return t&&[n,function(){var n=this,e=arguments;return _((function(){return t.apply(n,e)}))}]})),["values",Symbol.iterator].map((function(o){return e[o]&&[o,function(){n.collect(h,1);var e=0,o=n.proxy;return{next:function(){var n,r=e>=t.length;return r||(n=o[e++]),{done:r,value:n}}}}]}))).reduce((function(n,t){return t&&(n[t[0]]={value:t[1]}),n}),{})),n._proxy_handler.set=function(e,r,a){var i=t.length;return _((function(){var u=o(e,r,a);return t.length!==i&&n.notify("length",i,10),u}))}}(this)}this.proxy=new Proxy(n,this._proxy_handler),f.set(this.proxy,this),f.set(n,this)}return n.prototype.collect=function(n,t){void 0===t&&(t=2);var o=i[0];if(o&&!(o.option&e.PREVENT_COLLECT)){var r=this._map(t),a=r.get(n);a||r.set(n,a=new Set),o.depend(a)}},n.prototype.release=function(){for(var n=0,t=[this.refmap,this.ownmap];n<t.length;n++){var e=t[n];e.forEach((function(n){n.forEach((function(t){return t.undepend(n)}))})),e.clear()}},n.prototype.notify=function(n,t,e){void 0===e&&(e=2);var o=[this,n,t,e];l.length&&l[0][0].push(o);var r=this._map(e).get(n);r&&r.size&&M(Array.from(r),s.length&&o)},n.prototype._map=function(n){return 2&n?this.refmap:this.ownmap},n}();t.Observer=d;var v=function(){function n(n,t){void 0===t&&(t=e.DEFAULT),this.fn=n,this.option=t,this.children=[],this._deps=new Set,this.is_run=!1}return n.prototype.undepend=function(n){this._deps.delete(n),n.delete(this)},n.prototype.depend=function(n){this._deps.add(n),n.add(this)},n.prototype.clear=function(n){var t=this;if(this._deps.forEach((function(n){return n.delete(t)})),this._deps.clear(),!n)for(var e=0,o=this.children;e<o.length;e++){var r=o[e];r.clear(),r.parent=void 0}this.children.length=0},n.prototype.unmount=function(n){var t;if(this.clear(n),!n){var e=null===(t=this.parent)||void 0===t?void 0:t.children;if(e&&e.splice(e.indexOf(this),1),this._sandbox){var o=this._sandbox[1].indexOf(this);o>=0&&this._sandbox[1].splice(o,1)}}this._sandbox=void 0,this.parent=void 0},n.prototype.mount=function(t){return void 0!==this.parent?new n(this.fn).mount(t):(l.length&&(this._sandbox=l[0],this._sandbox[1].push(this)),this.parent=t||i[0]||null,this.parent&&this.parent.children.push(this),this._run(),this)},n.prototype.update=function(){return this.clear(),this._run()},n.prototype.addRecord=function(n){var t=s[0][0],e=c.indexOf(this);e<0||u[e][0]<t?(u.unshift([t,[n]]),c.unshift(this)):u[e][1].push(n)},n.prototype._run=function(){this.is_run=!0,i.unshift(this);try{return this.res=this.fn()}catch(n){throw n}finally{i.shift(),this.is_run=!1}},n}();function y(n){return Array.prototype.concat.call(Object.getOwnPropertySymbols(n),Object.getOwnPropertyNames(n))}function g(n,t){for(var e=[],o=2;o<arguments.length;o++)e[o-2]=arguments[o];E(n);try{return t.apply(void 0,e)}catch(n){throw n}finally{P()}}t.Subscriber=v,t.transacts=g,t.atom=function(n){return g.bind(null,n,2)};var b=g.bind(null,2);t.runInAtom=b;var _=g.bind(null,18);t.action=function(n){return g.bind(null,1,n)};var m=g.bind(null,1);t.runInAction=m,t.sandbox=function(n,t){return void 0===t&&(t=7),w.bind(null,t,n)};var x=w.bind(null,7);function w(n,t){for(var o=[],r=2;r<arguments.length;r++)o[r-2]=arguments[r];var a=l[0],u=i[0],c=u&&u.option,s=4&n||!a?[]:a[1],f=s.length,h=4&n||!a?[]:a[0];u&&(u.option=1&n?c|e.PREVENT_COLLECT:c&~e.PREVENT_COLLECT),l.unshift([h,s,n|(a&&4&a[2])]);try{return t.apply(void 0,o)}catch(n){throw n}finally{if(l.shift(),4&n&&O(h),2&n){for(var p=s.length-1;p>=f;p--){var d=s[p];d.unmount(d.parent!==u)}s.length=f}else a&&4&n&&Array.prototype.push.apply(a[1],s);u&&(u.option=c)}}function O(n){var t=[];j(n,(function(n){var e=n[0],o=n[1],r=n[3];if(1&r)e._del(o);else if(4&~r){if(8&r)return void t.push(n);e._set(o,n[2])}}));for(var e=0,o=t;e<o.length;e++){var r=o[e];r[0]._set(r[1],r[2])}}t.runInSandbox=x,t.autorun=function(n){var t=new v(n);return t.mount(),function(){t.unmount()}};var S=new Set([Object,Array,Map,Set,WeakMap,WeakSet]);function A(n){if(n&&"object"==typeof n){var t=f.get(n);if(t)n=t.proxy;else{var e=n.constructor;(S.has(e)||a[e.name]!==e)&&(n=new d(n).proxy)}}return n}function I(n,t){var e=[],o=new v((function(){e.unshift(n()),e.length>1&&(t(e[0],e[1]),e.length=1)}));return o.mount(),function(){o.unmount()}}function E(n){var t=s[0];void 0===n&&(n=t?2&t[1]:1),s.unshift([s.length,n])}function j(n,t){for(var e=new Map,o=!1,r=0,a=n;r<a.length;r++){var i=a[r],u=i[0],c=i[1],s=e.get(u);if(s){if(s.has(c))continue;s.add(c)}else e.set(u,new Set([c]));if(!k(1!==i[3]?u._val(c):u._has(c),i[2])){if(!t)return!0;-1===t(i)&&s.delete(c),o=!0}}return o}function P(){var n=[],t=s.shift(),e=t[0];if(0===s.length||!(16&t[1]||2&t[1]&&2&s[0][1])){for(;c.length&&u[0][0]>=e;){var o=c.shift(),r=u.shift();if(n.indexOf(o)<0&&j(r[1])){for(var a=void 0;(a=c.lastIndexOf(o))>=0;)c.splice(a,1),u.splice(a,1);n.unshift(o)}}n.length&&(8&t[1]?m((function(){M(n)})):M(n))}}function M(n,t){var e=l[0],o=e&&4&e[2]&&e[1];function r(n){return!o||o.indexOf(n)>=0}n:for(var a=0;a<n.length;a++){for(var i=n[a];(i=i.parent)&&!i.is_run&&r(i);)if(n.indexOf(i)>=0){n.splice(a--,1);continue n}!(i=n[a]).is_run&&r(i)||n.splice(a--,1)}n.forEach(t?function(n){return n.addRecord(t)}:function(n){void 0!==n.parent&&n.update()})}function k(n,t){return n===t||n!=n&&t!=t}function T(n){var t,e=n.target,a=e.__proto__,i=new d({}),u=(null===(t=Object.getOwnPropertyDescriptor(a,"size"))||void 0===t?void 0:t.get.bind(e))||function(){};n.release=function(){return i.release(),n.release()},i._has=a.has.bind(e),e instanceof Map||e instanceof WeakMap?i._val=function(n){return a.get.call(e,n)}:i._val=function(n){return a.has.call(e,n)?n:p},i._del=function(n){return a.delete.call(e,n)},i._set=a.set?function(n,t){return a.set.call(e,n,t)}:function(n,t){return a.add.call(e,n)};for(var c=o({get:function(n){return i.collect(n),A(a.get.call(e,n))},set:function(n,t){var o=f.get(n);o&&(n=o.target);var r=a.has.call(e,n),u=r?a.get.call(e,n):void 0;return a.set.call(e,n,t),r||i.notify(n,!1,1),i.notify(n,u),this},add:function(t){return a.has.call(e,t)||_((function(){var o=u();a.add.call(e,t),void 0!==o&&n.notify("size",o,6),i.notify(t,!1,1),i.notify(t,p),i.notify(h,h,1)})),this},delete:function(t){var o=a.get,r=o?o.call(e,t):t,c=u(),s=a.delete.call(e,t);return s&&_((function(){i.notify(t,r),i.notify(t,!0,1),i.notify(h,h,1),void 0!==c&&n.notify("size",c,6)})),s},clear:function(){var t=u();t&&_((function(){a.forEach.call(e,(function(n,t){i.notify(t,n),i.notify(t,!0,1)})),i.notify(h,h,1),n.notify("size",t,6),a.clear.call(e)}))},forEach:function(n){for(var t,o=[],u=1;u<arguments.length;u++)o[u-1]=arguments[u];return i.collect(h,1),(t=a.forEach).call.apply(t,r([e,function(t){for(var e=[],o=1;o<arguments.length;o++)e[o-1]=arguments[o];n.apply(void 0,r([A(t)],e))}],o))},has:function(n){return i.collect(n,1),a.has.call(e,n)},size:u},[["keys",function(n){return n[0]}],["entries",function(n){return[n[0],A(n[1])]}],["values",function(n){return A(n[1])}],[Symbol.iterator,function(n){return A(n[1])}]].reduce((function(n,t){var o=t[0],r=t[1],u=a.entries;return u&&(n[o]=function(){i.collect(h,1);var n=u.call(e),t=n.next.bind(n);return n.next=function(){var n=t(),e=n.done,o=n.value;return e||(i.collect(o[0]),i.collect(o[0],1),o=r(o)),{done:e,value:o}},n}),n}),{})),s={},l=0,v=y(a);l<v.length;l++){var g=v[l],b=c[g],m=Object.getOwnPropertyDescriptor(a,g);b&&(void 0!==m.value?m.value=b:m.get=b),s[g]=m}e.__proto__=Object.create(e.__proto__.__proto__,s)}t.observable=A,t.computed=function(n){var t,e=0,o=new v((function(){(e^=1)&&(t=n())}));return function(){return e||o.update(),t}},t.watch=I,t.reaction=function(n,t){return I(n,(function(n,e){k(n,e)||t(n)}))}}).call(this,e(1))},function(n,t){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(n){"object"==typeof window&&(e=window)}n.exports=e},function(n,t,e){"use strict";var o,r=this&&this.__spreadArrays||function(){for(var n=0,t=0,e=arguments.length;t<e;t++)n+=arguments[t].length;var o=Array(n),r=0;for(t=0;t<e;t++)for(var a=arguments[t],i=0,u=a.length;i<u;i++,r++)o[r]=a[i];return o};Object.defineProperty(t,"__esModule",{value:!0});var a=e(0),i=a.observable([{a:1},2,3]),u=a.observable(((o={a:[1],b:2,c:3})[Symbol("test")]=4,o)),c=a.observable(new Set([1,2,3])),s=a.observable(new Map([["a",[1]],["b",2],["c",3]])),f=a.observable(new WeakSet),l=a.observable(new WeakMap),h=a.observable(new Float32Array(10));function p(n){for(var t=[],e=1;e<arguments.length;e++)t[e-1]=arguments[e];t.length&&t.unshift("->"),console.log.apply(console,r([n],t))}console.log(""+a.observable(new Date));var d=a.observable([1,2,3]);a.runInSandbox((function(){a.autorun((function(){console.log("a[0]",d[0])})),d.unshift(111),a.runInSandbox((function(){d.unshift(222),a.autorun((function(){console.log("a[1]",d[1])})),d.unshift(333)})),console.log("JSON.stringify(a)",JSON.stringify(d)),a.runInAction((function(){d.unshift(1,2,3),d.splice(0,3)})),a.runInAction((function(){d[0]+=1,d[0]+=1})),a.autorun((function(){a.sandbox((function(){console.log("a[1]",d[1]),a.sandbox((function(){console.log("a[2]",d[2])}),0)()}),1)()})),d[1]+=1,console.log("-----------------"),d[2]+=1})),console.log("================="),console.log("JSON.stringify(a)",JSON.stringify(d)),a.autorun((function(){p("----------");for(var n=0,t=d;n<t.length;n++){p(t[n])}p("----------")})),a.autorun((function(){p("a[1] = a[2] + "),d[1]=d[2]+Math.random()})),a.autorun((function(){p("a[2] = a[1] + "),d[2]=d[1]+Math.random()})),a.runInAction((function(){a.transacts(8,(function(){p("a[1] = 16;"),d[1]=16,p("a[2] = 6;"),d[2]=6})),p(333)})),a.autorun((function(){console.log("000000001111",s.get("a"))})),a.runInSandbox((function(){a.autorun((function(){console.log("1111",s.get("a")),a.runInSandbox((function(){console.log("222",s.get("b")),a.sandbox((function(){console.log("333",s.get("c"))}),2)()}))})),s.set("a",[333]),a.sandbox((function(){s.set("a",[444])}),0)(),a.runInSandbox((function(){s.set("a",[555])})),s.set("c",["cccccccccc"])})),s.set("a",[666]),a.autorun((function(){console.log(111,s.get("a")),a.autorun((function(){console.log(111,s.keys());for(var n=function(n){a.autorun((function(){var t=s.get(n);console.log(111,n,t,t instanceof Array&&t[0])}))},t=0,e=Array.from(s.keys());t<e.length;t++){n(e[t])}}))})),p("-------------"),a.runInSandbox((function(){console.log(s),a.autorun((function(){console.log(s.get("a")),a.autorun((function(){console.log(s.keys());for(var n=function(n){a.autorun((function(){var t=s.get(n);console.log(n,t,t instanceof Array&&t[0])}))},t=0,e=Array.from(s.keys());t<e.length;t++)n(e[t])}))})),p("-------------",'map.get("a")[0] = 2'),s.get("a")[0]=2,p("-------------",'map.set("a", [3]);'),s.set("a",[3]),p("-------------",'map.set("b", [4]);'),s.set("b",[4]),p("-------------"),a.autorun((function(){p("array[Symbol.iterator]().next().value",i[Symbol.iterator]().next())})),a.autorun((function(){p(" array.indexOf(2)",i.indexOf(2))})),a.autorun((function(){p("array.values()",i.values())})),a.autorun((function(){p("array[0].a",i[0].a)})),a.autorun((function(){p("array.length",i.length)})),i.unshift(i[0]),i.unshift({a:1.1}),a.runInAtom((function(){a.runInAction((function(){i.unshift({a:0})})),i.shift()})),i[0].a=1.2,a.autorun((function(){p("array[1], json.a[0]",i[1],u.a[0])})),a.autorun((function(){p("array[3]",i[3])})),a.runInAction((function(){console.log("runInAction1","==========="),i[1]={a:1.3},a.runInAction((function(){console.log("runInAction2","==========="),i[1]={a:1.4},u.a[0]+=.1})),console.log("runInAction3","==========="),i[3]+=.1})),console.log("runInAction4","==========="),console.log("array","->",JSON.stringify(i)),p("------------------"),a.autorun((function(){p("weakset.a",f.a)})),a.autorun((function(){p('"a" in weakset',"a"in f)})),f.a=3,delete f.a,a.autorun((function(){p("weakset.has(f32arr)",f.has(h))})),f.add(h),f.delete(h),a.autorun((function(){p(l,l.get(h))})),l.set(h,33),l.delete(h),p(c[Symbol.toStringTag]),a.autorun((function(){p(Object.keys(u))})),u.d=2,delete u.d,a.autorun((function(){p('"2" in array',"2"in i)})),p("3333",u.d),a.autorun((function(){p("set.size",c.size)})),a.autorun((function(){p("set.has(2)",c.has(2))})),a.autorun((function(){p("set.has(4)",c.has(4))})),p("---------------------set.add(4);"),c.add(4),p("---------------------set.delete(2);"),c.delete(2),p("---------------------set.clear()"),c.clear(),p("---------------------")})),console.log(i,u,c,s,f,l,h),p("-------------",'map.set("a", [3]);'),s.set("a",[3]),p("-------------",'map.set("b", [4]);'),s.set("b",[4]),p("-------------"),p("-------------",'map.get("a")[0] = 3'),s.get("a")[0]=4,a.autorun((function(){a.runInSandbox((function(){console.log("Sandbox",s.get("b")),a.sandbox((function(){console.log("NORMAL",s.get("a"))}),0)()}))})),p("-------------",'map.set("a", [5]);'),s.set("a",[5]),p("-------------",'map.set("b", [6]);'),s.set("b",[6])}])}));
//# sourceMappingURL=test.js.map