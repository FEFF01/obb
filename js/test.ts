
import {
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
    transacts,
    TRANSACTS_OPTION,
    SANDOBX_OPTION,
    computed,
    watch,
    reaction,
} from './obb'

/*
import {
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
    computed,
    watch,
    reaction,
} from '../dist/js/obb.js'
*/

let array = observable<Array<any>>([{ a: 1 }, 2, 3]);
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


let weakset = observable<any>(new WeakSet());
let weakmap = observable(new WeakMap());

let f32arr = observable(new Float32Array(10));


function log(expr: any, ...values: any) {
    values.length && values.unshift("->")
    console.log(expr, ...values);
}
// -------------

console.log("" + observable(new Date()))




let a = observable([1, 2, 3]);
autorun(() => {
    log("----------")
    for (let v of a) {
        log(v);
    }
    log("----------")
})


autorun(
    () => {
        log("a[1] = a[2] + ")
        a[1] = a[2] + Math.random();
    }
)
autorun(
    () => {
        log("a[2] = a[1] + ")
        a[2] = a[1] + Math.random();
    }
)
runInAction(() => {
    //debugger;
    transacts(
        () => {
            log("a[1] = 16;")
            a[1] = 16;
            log("a[2] = 6;")
            a[2] = 6;
        },
        TRANSACTS_OPTION.WRAPUP
    )
    log(333);
    //debugger;
})


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
        runInSandbox(() => {
            console.log("a[1]", a[1]);  // a[1] 1
            runInSandbox(() => {
                console.log(
                    "a[2]",
                    a[2]
                );  // a[2] 2
            }, SANDOBX_OPTION.NORMAL)
        }, SANDOBX_OPTION.PREVENT_COLLECT);
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

//throw ""
autorun(function () {
    console.log("000000001111", map.get("a"))
})

runInSandbox(function () {
    autorun(function () {
        console.log("1111", map.get("a"))
        runInSandbox(function () {
            console.log("222", map.get("b"));
            runInSandbox(function () {
                console.log("333", map.get("c"));
            }, SANDOBX_OPTION.CLEAN_SUBSCRIBE)

        })
    })
    map.set("a", [333])
    runInSandbox(function () {
        map.set("a", [444])
    }, SANDOBX_OPTION.NORMAL)
    runInSandbox(function () {
        map.set("a", [555])
    })
    //map.set("b", ["bbbbbbbbbb"])
    map.set("c", ["cccccccccc"])
})
map.set("a", [666])



autorun(() => {
    console.log(111, map.get("a"))
    autorun(() => {
        console.log(111, map.keys());
        for (let key of Array.from(map.keys())) {//target es5
            autorun(() => {
                let value = map.get(key);
                console.log(111, key, value, value instanceof Array && value[0]);
            })
        }
    })
})

log("-------------")
runInSandbox(function () {
    test();
})
//test();


console.log(array, json, set, map, weakset, weakmap, f32arr);


log("-------------", `map.set("a", [3]);`)
map.set("a", [3]);
log("-------------", `map.set("b", [4]);`)
map.set("b", [4]);
log("-------------")

log("-------------", `map.get("a")[0] = 3`)
map.get("a")[0] = 4;



autorun(function () {
    runInSandbox(function () {
        console.log("Sandbox", map.get("b"))
        runInSandbox(function () {
            console.log("NORMAL", map.get("a"))
        }, SANDOBX_OPTION.NORMAL)
    })
})

log("-------------", `map.set("a", [5]);`)
map.set("a", [5]);
log("-------------", `map.set("b", [6]);`)
map.set("b", [6]);




function test() {
    console.log(map)
    autorun(() => {
        console.log(map.get("a"))
        autorun(() => {
            console.log(map.keys());
            for (let key of Array.from(map.keys())) {//target es5
                autorun(() => {
                    let value = map.get(key);
                    console.log(key, value, value instanceof Array && value[0]);
                })
            }
        })
    })
    log("-------------", `map.get("a")[0] = 2`)
    map.get("a")[0] = 2;

    log("-------------", `map.set("a", [3]);`)
    map.set("a", [3]);
    log("-------------", `map.set("b", [4]);`)
    map.set("b", [4]);
    log("-------------")


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

    runInAtom(() => {
        runInAction(() => {
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



    runInAction(() => {
        console.log("runInAction1", "===========");
        array[1] = { a: 1.3 };

        runInAction(() => {
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
    log("---------------------set.add(4);");
    set.add(4);
    log("---------------------set.delete(2);");
    set.delete(2);
    log("---------------------set.clear()");
    set.clear()

    log("---------------------");



}



