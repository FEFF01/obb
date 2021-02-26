# obb
 
 体积较小，逻辑利用率较高，覆盖较全面，控制粒度较高的状态管理工具库

 > 提供如下方法，作用与一般状态管理库类似：
 >* `
    observable, 
    autorun,
    action,
    runAction,
    computed,
    watch,
    reaction
    `

> 提供精细粒度控制方法：
>* `
    atomic,
    runAtomic
    `

> 支持嵌套的订阅逻辑（例如嵌套的 `autorun` ）

> 支持嵌套的 `action` ,
>* 对于嵌套的 `action` 不同于一般状态管理库的做法，内部 `action` 产生的变更会在该 `action` 过程结束后执行对应的响应，即使当前还处于外部 `action` 过程中
>* `atomic` 则可以用于做与 `action` 之外的更多控制，在 `atomic` 内的所有变更只有最外层 `atomic` 退出后才会做出响应

> 不做太多无用功
>* 例如一个 `action` 内有如下逻辑 `a.push(1),a.pop(),b.c++,b.c--` 那该逻辑将不会产生任何后果（与之相关的订阅者不会得到任何变更通知）

更多用法或测试案例参考 : [test.ts](./js/test.ts)