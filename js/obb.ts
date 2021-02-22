


export {
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
    reaction,
};


type IOBInternalObject = Set<any> | Map<any, any> | WeakSet<any> | WeakMap<any, any>
type IOBTarget = Object | IOBInternalObject;


const enum RECORD {
    OBSERVER = 0,
    KEY = 1,
    VALUE = 2,
    TYPE = 3
}
interface IRecord {
    [RECORD.OBSERVER]: Observer,
    [RECORD.KEY]: any,
    [RECORD.VALUE]: any,
    [RECORD.TYPE]: RECORD_TYPE,
}

const enum REACTION_STATE {
    DEPTH = 0,
    RECORDS = 1
}
interface IReactionState {
    [REACTION_STATE.DEPTH]: number,
    [REACTION_STATE.RECORDS]: Array<IRecord>
}

const enum ACTION {
    DEPTH = 0,
    IS_ATOM = 1,
}
interface IAction {
    [ACTION.DEPTH]: number,
    [ACTION.IS_ATOM]: boolean,
}

const enum RECORD_TYPE {
    OWN = 1,
    REF = 2
}


type ISubscriberSet = Set<Subscriber>;


// ------------------------------------------------------

const SUBSCRIBER_STACK: Array<Subscriber> = [];

const REACTION_STATE_LIST: Array<IReactionState> = [];
const REACTION_TARGET_LIST: Array<Subscriber> = [];

const ACTION_STACK: Array<IAction> = []

const OBSERVER_MAP: WeakMap<any, Observer> = new WeakMap();


const MASK_ITERATE = ["iterate"];
const MASK_UNDEFINED = ["undefined"];


class Observer<T extends object = any> {
    readonly proxy: any;
    readonly refmap: Map<any, ISubscriberSet> = new Map();
    readonly ownmap: Map<any, ISubscriberSet> = new Map();
    constructor(readonly target: T) {
        let ob = OBSERVER_MAP.get(target);
        if (ob) {
            return ob;
        }

        switch (true) {
            case target instanceof WeakSet:
            case target instanceof WeakMap:
            case target instanceof Map:
            case target instanceof Set:

                obInternalData(this as Observer<IOBInternalObject>);
                break;

            case target[Symbol.iterator]:// array-like
            case target instanceof Array:

                obArray(this as Observer<ArrayLike<any>>);

                break;

        }
        this.proxy = new Proxy(target, this._proxy_handler);


        OBSERVER_MAP.set(this.proxy, this);
        OBSERVER_MAP.set(target, this);

    }
    collect(prop: any, type?: RECORD_TYPE) {
        let subscriber = SUBSCRIBER_STACK[0];
        if (subscriber) {
            let map = this._map(type);
            let ref = map.get(prop);
            ref || map.set(prop, ref = new Set());
            subscriber.depend(ref);
        }
    }
    release() {
        for (let map of [this.refmap, this.ownmap]) {
            map.forEach(set => {
                set.forEach(sub => sub.undepend(set))
            });
            map.clear();
        }
    }
    notify(prop: any, value: any, type: RECORD_TYPE = RECORD_TYPE.REF) {

        let set = this._map(type).get(prop);
        if (set && set.size) {
            let record: IRecord = [this, prop, value, type];

            for (let subscriber of Array.from(set)) {
                if (SUBSCRIBER_STACK.indexOf(subscriber) < 0) {
                    subscriber.notify(record);
                } else {
                    // may be err
                }
            }
        }
    }


    _has = (key: any) => {
        return key in this.target
    }
    _val = (key: any) => {
        return this.target[key];
    }
    _map(type?: RECORD_TYPE) {
        return type !== RECORD_TYPE.OWN ? this.refmap : this.ownmap;
    }

    _proxy_handler = {
        get: (target: IOBTarget, prop: string) => {

            //console.log("get", target, prop);
            let value = target[prop];
            if (prop !== "__proto__") {//target.hasOwnProperty(prop) // 允许收集未定义属性
                value = observable(value);
                this.collect(prop);
            }
            return value;
        },
        set: (target: IOBTarget, prop: string, value: any) => {

            //console.log("set", prop, target, prop);
            let bak_value = target[prop];
            let ob = OBSERVER_MAP.get(value);
            let raw_value = ob ? ob.target : value;
            let own = target.hasOwnProperty(prop);
            let eq = equal(bak_value, raw_value);

            eq && own || (target[prop] = raw_value);
            eq || this.notify(prop, bak_value);
            if (!own) {
                this.notify(prop, false, RECORD_TYPE.OWN);
                this.notify(MASK_ITERATE, MASK_ITERATE, RECORD_TYPE.OWN);
            }
            return true;
        },
        ownKeys: (target: IOBTarget) => {
            this.collect(MASK_ITERATE, RECORD_TYPE.OWN);
            return ownKeys(target);
        },
        has: (target: IOBTarget, key: string) => {
            this.collect(key, RECORD_TYPE.OWN);
            return key in target;
        },
        deleteProperty: (target: IOBTarget, key: string) => {

            return runAtomic(() => {
                if (target.hasOwnProperty(key)) {
                    this.notify(key, target[key]);
                    this.notify(key, true, RECORD_TYPE.OWN);
                    this.notify(MASK_ITERATE, MASK_ITERATE, RECORD_TYPE.OWN);
                }
                return delete target[key];
            });
        },
    }



}


class Subscriber {
    constructor(public fn: Function) {
    }
    private _deps: Set<ISubscriberSet> = new Set();
    undepend(set: ISubscriberSet) {
        this._deps.delete(set);
        set.delete(this);
    }
    depend(set: ISubscriberSet) {
        this._deps.add(set);
        set.add(this);
    }
    release() {
        this._deps.forEach(ref => ref.delete(this));
        this._deps.clear();
    }
    update() {
        this.release();

        SUBSCRIBER_STACK.unshift(this);
        try {
            return this.fn();
        } catch (e) {
            throw e;
        } finally {
            SUBSCRIBER_STACK.shift();
        }
    }
    notify(record?: IRecord) {

        if (!ACTION_STACK.length) {
            return this.update();
        }

        let depth = ACTION_STACK[0][ACTION.DEPTH];
        let index = REACTION_TARGET_LIST.indexOf(this);

        if (index < 0 || REACTION_STATE_LIST[index][REACTION_STATE.DEPTH] < depth) {
            REACTION_STATE_LIST.unshift([depth, [record]]);
            REACTION_TARGET_LIST.unshift(this);
        } else {
            REACTION_STATE_LIST[index][REACTION_STATE.RECORDS].push(record);
        }
    }
}


function ownKeys(obj: any) {
    //return Reflect.ownKeys(target);
    return Array.prototype.concat.call(
        Object.getOwnPropertySymbols(obj),
        Object.getOwnPropertyNames(obj)
    )
}


function transacts(fn: Function, is_atom?: boolean) {
    transacting(is_atom);
    try {
        return fn();
    } catch (e) {
        throw e;
    } finally {
        transacted();
    }
}

function atomic(fn: Function) {
    return transacts.bind(null, fn, true);
}
function runAtomic(fn: Function) {
    return transacts(fn, true);
}
function action(fn: Function) {
    return transacts.bind(null, fn);
}
function runAction(fn: Function) {
    return transacts(fn);
}

function autorun(fn: Function) {
    let sub = new Subscriber(fn);
    sub.update();
    return function disposer() {
        sub.release();
    };
}

function observable(obj: IOBTarget | any) {
    return obj && typeof obj === "object" ? new Observer(obj).proxy : obj;
}

function computed(calc: Function) {
    let value: any;
    let changed = 0;
    let subscriber = new Subscriber(
        function () {
            (changed ^= 1) && (value = calc());
        }
    );
    return function () {
        changed || subscriber.update();
        return value;
    }
}

function watch(handle: Function, watcher: (new_value: any, old_value: any) => void) {
    let value_stack: Array<any> = [];

    let subscriber = new Subscriber(function () {
        value_stack.unshift(handle());
        if (value_stack.length > 1) {
            watcher(value_stack[0], value_stack[1]);
            value_stack.length = 1;
        }
    });
    subscriber.update();

    return function disposer() {
        subscriber.release();
    }
}

function reaction(handle: Function, watcher: (val: any) => void) {
    return watch(
        handle,
        function (new_val, old_val) {
            equal(new_val, old_val) || watcher(new_val);
        }
    )
}


function transacting(
    is_atom?: boolean
) {
    let action = ACTION_STACK[0];
    is_atom = is_atom === undefined && action ? action[ACTION.IS_ATOM] : !!is_atom;

    ACTION_STACK.unshift([is_atom && action ? action[ACTION.DEPTH] : ACTION_STACK.length, is_atom]);
}


function transacted() {

    let reactions = [];

    let action = ACTION_STACK.shift();
    let depth = action[ACTION.DEPTH];

    if (action[ACTION.IS_ATOM] && ACTION_STACK.length !== 0) {
        return;
    }

    while (REACTION_TARGET_LIST.length) {
        let state = REACTION_STATE_LIST[0];

        if (state[REACTION_STATE.DEPTH] < depth) {
            break;
        }
        let subscriber = REACTION_TARGET_LIST[0];
        if (reactions.indexOf(subscriber) < 0) {
            let obj_map: Map<any, Set<string>> = new Map();

            for (let record of state[REACTION_STATE.RECORDS]) {
                let ob = record[RECORD.OBSERVER];
                let key = record[RECORD.KEY];
                let value = record[RECORD.TYPE] !== RECORD_TYPE.OWN ? ob._val(key) : ob._has(key);

                let key_set = obj_map.get(ob);
                if (key_set) {
                    if (key_set.has(key)) {
                        continue;
                    } else {
                        key_set.add(key);
                    }
                } else {
                    obj_map.set(ob, new Set([key]))
                }

                if (equal(value, record[RECORD.VALUE])) {
                    continue;
                }
                reactions.unshift(subscriber);

                let index: number;
                while (
                    (index = REACTION_TARGET_LIST.lastIndexOf(subscriber)) > 0
                ) {
                    REACTION_TARGET_LIST.splice(index, 1);
                    REACTION_STATE_LIST.splice(index, 1);
                }
                break;
            }
        }
        REACTION_TARGET_LIST.shift();
        REACTION_STATE_LIST.shift();
    }

    for (let subscriber of reactions) {
        if (SUBSCRIBER_STACK.indexOf(subscriber) < 0) {
            subscriber.update();
        } else {
            // may be err
        }
    }

}

function equal(a: any, b: any) {
    return a === b || a !== a && b !== b;
}



function obArray(ob: Observer<ArrayLike<any>>) {
    let target = ob.target;
    let prototype = target.__proto__;
    let original = ob._proxy_handler.set;

    target.__proto__ = Object.create(
        prototype,
        Array.prototype.concat.call(
            ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].map(
                // 一个方法可能产生多次变更，这里使可能的多次变更最多对应一次订阅响应
                function (key) {
                    const original = prototype[key];
                    return original && [key, function () {
                        let args = arguments;
                        return runAtomic(() => original.apply(this, args));
                    }]
                }
            ),
            ["values", Symbol.iterator].map(
                // 对于内部隐藏实现，这里使之产生相应的订阅
                function (key) {
                    const original = prototype[key];
                    return original && [key, function () {
                        ob.collect(MASK_ITERATE, RECORD_TYPE.OWN);
                        return obIterator(original.call(target));
                    }]
                }
            )
        ).reduce(
            function (prototype, patch: [any, any] | undefined) {
                patch && (prototype[patch[0]] = { value: patch[1] });
                return prototype;
            }, {}
        )
    );

    ob._proxy_handler.set = function (_target: IOBTarget, key: any, value: any) {
        let length = target.length;
        return runAtomic(function () {
            let res = original(_target, key, value);
            target.length !== length
                && ob.notify("length", length);

            return res;
        })
    }
}


function obInternalData(ob: Observer<IOBInternalObject>) {
    let target = ob.target;

    let prototype = target.__proto__;



    let internal_ob = new Observer({});


    let _size = Object.getOwnPropertyDescriptor(prototype, "size")
        ?.get.bind(target)
        || function () { };

    ob.release = function () {
        internal_ob.release();
        return ob.release();
    }
    internal_ob._val = target instanceof Map || target instanceof WeakMap
        ? function (key: any) {
            return prototype.get.call(target, key);;
        }
        : function (value: any) {
            return prototype.has.call(target, value) ? value : MASK_UNDEFINED;
        };

    let proxyMethods = {
        get(key: any) {
            internal_ob.collect(key);
            return observable(prototype.get.call(target, key));
        },
        set(key: any, value: any) {
            let bak_value = prototype.get.call(target, key);
            prototype.set.call(target, key, value);
            internal_ob.notify(key, bak_value);
            return this;
        },
        add(value: any) {
            if (!prototype.has.call(target, value)) {
                runAtomic(() => {
                    let size = _size();
                    prototype.add.call(target, value);
                    internal_ob.notify(value, MASK_UNDEFINED);
                    size !== undefined && ob.notify("size", size);
                    internal_ob.notify(MASK_ITERATE, MASK_ITERATE);
                });
            }
            return this;
        },
        delete(value: any) {
            let res = prototype.delete.call(target, value);
            if (res) {
                runAtomic(() => {
                    let size = _size();
                    internal_ob.notify(value, value);
                    size !== undefined && ob.notify("size", size);
                    internal_ob.notify(MASK_ITERATE, MASK_ITERATE);
                });
            }
            return res;
        },
        clear() {
            let size = _size();
            if (!size) {
                return;
            }
            let values_bak = Array.from(prototype.values.call(target));
            let args = arguments;
            runAtomic(() => {
                prototype.clear.apply(target, args);
                for (let value of values_bak) {
                    internal_ob.notify(value, value);
                }
                ob.notify("size", size);
                internal_ob.notify(MASK_ITERATE, MASK_ITERATE);
            })
        },
        forEach(cb: Function, ...args: any) {
            internal_ob.collect(MASK_ITERATE);
            return prototype.forEach.call(target, function (value: any, ...rest: any) {
                cb(observable(value), ...rest)
            }, ...args);

        },
        has(value: any) {
            internal_ob.collect(value);
            let res = prototype.has.call(target, value);
            return res;
        },
        size: _size,
        ...["keys", "entries", "values", Symbol.iterator].reduce(
            function (res, key) {
                let original = prototype[key];
                if (original) {
                    res[key] = function () {
                        internal_ob.collect(MASK_ITERATE);
                        return observable(original.apply(target, arguments));
                    }
                }
                return res;
            }, {}
        ),
    }

    let descriptors = {};// Object.getOwnPropertyDescriptors(prototype);
    let keys: Array<string | symbol> = ownKeys(prototype);

    for (let key of keys) {
        let proxy = proxyMethods[key];
        let descriptor = Object.getOwnPropertyDescriptor(prototype, key);
        if (proxy) {
            if (descriptor.value !== undefined) {
                descriptor.value = proxy;
            } else {
                descriptor.get = proxy;
            }
        }
        descriptors[key] = descriptor;
    }

    target.__proto__ = Object.create(target.__proto__.__proto__, descriptors);
}

function obIterator(iterator: any) {
    let originalNext = iterator.next.bind(iterator);
    iterator.next = function () {
        let { done, value } = originalNext();
        if (!done) {
            value = observable(value);
        }
        return { done, value };
    }
    return iterator;
}


