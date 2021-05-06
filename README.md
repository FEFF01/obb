# obb
 
 体积较小，逻辑利用率较高，覆盖较全面，控制粒度较高，灵活度较高的状态管理工具库

 > 提供如下方法，作用与一般状态管理库类似：
 >* `
    observable,
    autorun,
    action,
    runInAction,
    computed,
    watch,
    reaction,
    `

> 提供沙盒操作方法
>* `
    sandbox,
    runInSandbox
    `
>* 默认模式下沙盒内对任意对可观测对象的更改，都会在执行结束后恢复
>* 默认模式下沙盒内所作的所有引用不会为当前订阅环境（如果存在）产生订阅操作
>* 可通过 `SANDOBX_OPTION` 按需自由组合各种配置 


> 支持嵌套的 `action` ,
>* 对于嵌套的 `action` 不同于一般状态管理库的做法，内部 `action` 产生的变更会在该 `action` 过程结束后执行对应的响应，即使当前还处于外部 `action` 过程中
>* `atom` 则可以用于做与 `action` 之外的更多控制，在 `atom` 内的所有变更只有最外层 `atom` 退出后才会做出响应

> 提供精细粒度控制方法：
>* `
    atom,
    runInAtom,
    `
>* `atom` 的表现为仅当最后一级 `atom` 结束时，其产生的变更才会得到响应

> 支持嵌套的订阅逻辑（例如嵌套的 `autorun` ）
>* 对于嵌套的 `autorun` 当内层 `autorun` 与 外层 `autorun` 都得到相应时最终只调用外层 `autorun` 
>* `autorun` 在下一次回调时会自动清除内部所有产生的订阅

> 不做太多无用功
>* 例如一个 `action` 内有如下逻辑 `a.push(1),a.pop(),b.c++,b.c--` 那该逻辑将不会产生任何后果（与之相关的订阅者不会得到任何变更通知）



### Examples

>* [test.ts](./js/test.ts)

```bash
    yarn add obb --dev
    npm i obb --save-dev
```

```javascript

import  {
    Observer,
    Subscriber,
    observable,
    autorun,
    atom,
    runInAtom,
    action,
    runInAction,
    sandbox,
    runInSandbox,
    SANDOBX_OPTION,
    computed,
    watch,
    reaction,
} from 'obb'

let a = observable([1, 2, 3]);

/**
 * 默认配置的 sandbox 内部产生的可观测变更
 * 都会在 sandbox 执行结束后得到还原
 */
runInSandbox(() => {

    autorun(() => {
        console.log("a[0]", a[0]);  // a[0] 1
    });

    a.unshift(111); // a[0] 111  

    runInSandbox(() => {
        a.unshift(222); // 
        autorun(() => {
            console.log("a[1]", a[1]);  // a[1] 111
        })
        a.unshift(333); // a[1],222
    });

    console.log(
        "JSON.stringify(a)",
        JSON.stringify(a)
    );  // JSON.stringify(a) [111,1,2,3]

    runInAction(() => {
        a.unshift(1, 2, 3);
        a.splice(0, 3);
    });  // 

    runInAction(() => {
        a[0] += 1;
        a[0] += 1;
    });  // a[0] 113

    autorun(() => {
        /**
         * 利用 SANDOBX_OPTION.PREVENT_COLLECT 
         * 和 SANDOBX_OPTION.NORMAL 做依赖穿透
         * 当前 autorun 中，只依赖 a[2] 
         * 不会产生对 a[1] 的订阅   
         */
        sandbox(() => {
            console.log("a[1]", a[1]);  // a[1] 1
            sandbox(() => {
                console.log(
                    "a[2]",
                    a[2]
                );  // a[2] 2
            }, SANDOBX_OPTION.NORMAL)()
        }, SANDOBX_OPTION.PREVENT_COLLECT)();
    });

    a[1] += 1;  //
    console.log("-----------------");
    a[2] += 1;  // a[1] 2 \n a[2] 3

});

console.log("=================")
console.log(
    "JSON.stringify(a)",
    JSON.stringify(a)
);  // JSON.stringify(a) [1,2,3]
```

