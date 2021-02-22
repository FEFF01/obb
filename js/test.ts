
import {
    Observer,
    Subscriber,
    observable,
    autorun,
    atomic,
    runAtomic,
    action,
    runAction,
    computed,
    watch,
    reaction
} from './obb'

let array = observable([{ a: 1 }, 2, 3]);
let json = observable({ a: [1], b: 2, c: 3, [Symbol("test")]: 4 });
let set = observable(new Set([1, 2, 3]));
let map = observable(
    new Map(
        [
            ["a", [1]],
            ["b", 2],
            ["c", 3]
        ] as Iterable<readonly [any, any]>
    )
);


let weakset = observable(new WeakSet());
let weakmap = observable(new WeakMap());

let f32arr = observable(new Float32Array(10));



function log(expr: any, ...values: any) {
    values.length && values.unshift("->")
    console.log(expr, ...values);
}
// -------------

autorun(() => {
    log("array[Symbol.iterator]().next().value", array[Symbol.iterator]().next());
})

autorun(() => {
    log(" array.indexOf(2)", array.indexOf(2));
})
autorun(() => {
    log("array.values()", array.values());
})
autorun(() => {
    log("array[0].a", array[0].a);
})
autorun(() => {
    log("array.length", array.length);
})

array.unshift(array[0])
array.unshift({ a: 1.1 });

runAtomic(() => {
    runAction(() => {
        array.unshift({ a: 0 });
    })
    array.shift()
})
array[0].a = 1.2;

autorun(() => {
    log("array[1], json.a[0]", array[1], json.a[0]);
})
autorun(() => {
    log("array[3]", array[3]);
})



runAction(() => {
    console.log("runInAction1", "===========");
    array[1] = { a: 1.3 };

    runAction(() => {
        console.log("runInAction2", "===========");
        array[1] = { a: 1.4 };
        json.a[0] += 0.1;
    })
    console.log("runInAction3", "===========");
    array[3] += 0.1;
});
console.log("runInAction4", "===========");

console.log("array", "->", JSON.stringify(array));

log("------------------")


autorun(() => {
    log("weakset.a", weakset.a)
})
autorun(() => {
    log(`"a" in weakset`, "a" in weakset)
})
weakset.a = 3

delete weakset.a

autorun(() => {
    log("weakset.has(f32arr)", weakset.has(f32arr))
})
weakset.add(f32arr)
weakset.delete(f32arr);


autorun(() => {
    log(weakmap, weakmap.get(f32arr))
})
weakmap.set(f32arr, 33)

weakmap.delete(f32arr)

log(set[Symbol.toStringTag])


autorun(() => {
    //log(`"d" in json`, "d" in json);
    //Reflect.ownKeys(json)
    log(Object.keys(json))

})
json.d = 2;
delete json.d;
autorun(() => {
    log(`"2" in array`, "2" in array)
})

log("3333", json.d)

autorun(() => {
    log("set.size", set.size);
})
autorun(() => {
    log("set.has(2)", set.has(2));
})
autorun(() => {
    log("set.has(4)", set.has(4));
})
/*
autorun(() => {
    log("set.forEach((value) => {");
    set.forEach((value) => {
        log("set.forEach", value);
    })
    log("})");
})
*/
set.add(4);
set.delete(2);

set.clear()

log("---------------------");





