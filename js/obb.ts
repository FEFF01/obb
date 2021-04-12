


type IOBInternalObject = Iterable<any> | ArrayLike<any>;
type IOBTarget = object | IOBInternalObject;


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



const enum TRANSACTS_OPTION {
    ACTION = 1,
    DEFAULT = ACTION,
    ATOM = 2,
    SANDBOX = 4,
    ATOM_AND_SANDBOX = ATOM | SANDBOX,
    WRAPUP = 8,
    PLAIN = 16 | ATOM
}
type TRANSACTS_CONFIG = TRANSACTS_OPTION | {
    option: TRANSACTS_OPTION,
    hook?: (reactions: Array<Subscriber>) => void
}
const enum ACTION {
    DEPTH = 0,
    TYPE = 1,
    HOOK = 2
}
interface IAction {
    [ACTION.DEPTH]: number,
    [ACTION.TYPE]: TRANSACTS_OPTION,
}

const enum RECORD_TYPE {
    OWN = 1,
    REF = 2,
    READONLY = 4,
    VOLATILE = 8,
    REF_AND_READONLY = REF | READONLY,
    REF_AND_VOLATILE = REF | VOLATILE
}
const enum SANDOBX_OPTION {   // 非 const 使得外部非 ts 环境能正常使用
    PREVENT_COLLECT = 0b01,
    CLEAN_SUBSCRIBE = 0b010,
    CLEAN_CHANGE = 0b0100,
    DEFAULT = PREVENT_COLLECT | CLEAN_SUBSCRIBE | CLEAN_CHANGE,
    NORMAL = 0b0,
}
enum SUBSCRIBE_OPTION {
    DEFAULT = 0,
    PREVENT_COLLECT = 1,
    COMPUTED = 2
}

const enum SANDBOX {
    RECORDS = 0,
    SUBSCRIBERS = 1,
    OPTION = 2
}
interface ISandbox {
    [SANDBOX.RECORDS]: Array<IRecord>,
    [SANDBOX.SUBSCRIBERS]: Array<Subscriber>
    [SANDBOX.OPTION]: SANDOBX_OPTION
}

type ISubscriberSet = Set<Subscriber>;

// ------------------------------------------------------

const GLOBAL = typeof window === "object" ? window : global;

const SUBSCRIBER_STACK: Array<Subscriber> = [];

const REACTION_STATE_LIST: Array<IReactionState> = [];
const REACTION_TARGET_LIST: Array<Subscriber> = [];

const ACTION_STACK: Array<IAction> = []

const OBSERVER_MAP: WeakMap<any, Observer> = new WeakMap();

const SANDBOX_STACK: Array<ISandbox> = [];

const MASK_ITERATE = ["iterate"];
const MASK_UNDEFINED = ["undefined"];


class Observer<T extends object = any> {
    static TO_RAW(obj: any) {
        let ob = OBSERVER_MAP.get(obj);
        return ob ? ob.target : obj;
    }
    static TO_OB(obj: any) {
        return OBSERVER_MAP.get(obj);
    }
    readonly proxy: any;
    readonly refmap: Map<any, ISubscriberSet> = new Map();
    readonly ownmap: Map<any, ISubscriberSet> = new Map();
    constructor(readonly target: T) {

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
    collect(prop: any, type: RECORD_TYPE = RECORD_TYPE.REF) {
        let subscriber = SUBSCRIBER_STACK[0];
        if (subscriber && !(subscriber.option & SUBSCRIBE_OPTION.PREVENT_COLLECT)) {
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

        let record: IRecord = [this, prop, value, type];
        SANDBOX_STACK.length && SANDBOX_STACK[0][SANDBOX.RECORDS].push(record);

        let set = this._map(type).get(prop);
        if (set && set.size) {
            let reactions = Array.from(set);
            ACTION_STACK.length
                ? addRecord(reactions, record)
                : deepReactive(reactions);
        }
    }


    _has = (key: any) => {
        return key in this.target
    }
    _val = (key: any) => {
        return this.target[key];
    }
    _del = (key: any) => {
        return delete this.target[key];
    }
    _set = (key: any, value: any) => {
        return this.target[key] = value;
    }
    _map(type: RECORD_TYPE) {
        return type & RECORD_TYPE.REF ? this.refmap : this.ownmap;
    }

    _proxy_handler = {
        get: (target: IOBTarget, prop: string | symbol) => {

            //console.log("get", target, prop);
            let value = target[prop];
            if (prop !== "__proto__") {//target.hasOwnProperty(prop) // 允许收集未定义属性
                value = observable(value);
                this.collect(prop);
            }
            return value;
        },
        set: (target: IOBTarget, prop: string, value: any) => {

            //console.log("set", target, prop, value);
            let bak_value = target[prop];
            let ob = OBSERVER_MAP.get(value);
            let raw_value = ob ? ob.target : value;
            let own = target.hasOwnProperty(prop);
            let eq = equal(bak_value, raw_value);

            if (!eq || !own) {
                _runInPlain(() => {
                    target[prop] = raw_value;
                    if (!own) {
                        this.notify(prop, false, RECORD_TYPE.OWN);
                        this.notify(MASK_ITERATE, MASK_ITERATE, RECORD_TYPE.OWN);
                    }
                    eq || this.notify(prop, bak_value);
                    (eq && own) || this.notify(MASK_ITERATE, MASK_ITERATE, RECORD_TYPE.REF);
                })
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
            //console.log("deleteProperty",target,key);
            return _runInPlain(() => {
                if (target.hasOwnProperty(key)) {
                    this.notify(key, target[key]);
                    this.notify(key, true, RECORD_TYPE.OWN);
                    this.notify(MASK_ITERATE, MASK_ITERATE, RECORD_TYPE.OWN);
                    this.notify(MASK_ITERATE, MASK_ITERATE, RECORD_TYPE.REF);
                }
                return delete target[key];
            });
        },
    }

}

class Subscriber {
    static get PARENT() {
        return SUBSCRIBER_STACK[0];
    }
    parent: Subscriber;
    children: Array<Subscriber> = [];
    constructor(
        public fn: Function,
        public option: SUBSCRIBE_OPTION = SUBSCRIBE_OPTION.DEFAULT
    ) {
    }
    private _deps: Set<ISubscriberSet> = new Set();
    undepend(set: ISubscriberSet) {
        this._deps.delete(set);
        set.delete(this);
    }
    depend(set: ISubscriberSet) {
        this._deps.add(set);
        set.add(this);
        if (
            this.option & SUBSCRIBE_OPTION.COMPUTED
            && SUBSCRIBER_STACK.length > 1
            && !(SUBSCRIBER_STACK[1].option & SUBSCRIBE_OPTION.PREVENT_COLLECT)
        ) {
            SUBSCRIBER_STACK[1].depend(set);    // 0 为 computed 的当前订阅
        }
    }
    clear(shallow?: boolean) {
        this._deps.forEach(ref => ref.delete(this));
        this._deps.clear();
        if (!shallow) {
            for (let child of this.children) {
                child.clear();
                child.parent = undefined;
            }
        }
        this.children.length = 0;
    }
    unmount(shallow?: boolean) {    // shallow 参数暂时用于节省不必要的消耗
        this.clear(shallow);
        if (!shallow) {
            let siblings = this.parent && this.parent.children;
            siblings && siblings.splice(siblings.indexOf(this), 1);
            if (this._sandbox) {
                let index = this._sandbox[SANDBOX.SUBSCRIBERS].indexOf(this);
                index >= 0 && this._sandbox[SANDBOX.SUBSCRIBERS].splice(index, 1);
            }
        }
        this._sandbox = undefined;
        this.parent = undefined;
    }
    private _sandbox: ISandbox;

    mount(parent?: Subscriber): Subscriber {
        if (this.parent !== undefined) {
            // 可能存者一个 Subscriber 实例发生递归 mount 或其他复用执行的情况
            return new Subscriber(this.fn).mount(parent);
        }
        this.parent = parent || SUBSCRIBER_STACK[0];
        if (this.parent) {
            if (this.parent.parent === undefined) {
                /**
                 * 可能存在挂载下一个子订阅时当前订阅已被释放（当前订阅方法执行过程中产生更改导致上级订阅刷新）
                 * 这不一定是使用放方发生错误，但挂载方不应该错误的允许此行为
                 */
                this.parent = undefined;
                return this;
            }
        } else {
            this.parent = null
        }

        if (SANDBOX_STACK.length) {
            this._sandbox = SANDBOX_STACK[0];
            this._sandbox[SANDBOX.SUBSCRIBERS].push(this);
        }
        this.parent && this.parent.children.push(this);
        this._run();
        return this;
    }
    update() {
        this.clear();
        return this._run();
    }
    addRecord(record: IRecord) {

        let depth = ACTION_STACK[0][ACTION.DEPTH];
        let index = REACTION_TARGET_LIST.indexOf(this);

        if (index < 0 || REACTION_STATE_LIST[index][REACTION_STATE.DEPTH] < depth) {
            REACTION_STATE_LIST.unshift([depth, [record]]);
            REACTION_TARGET_LIST.unshift(this);
        } else {
            REACTION_STATE_LIST[index][REACTION_STATE.RECORDS].push(record);
        }
    }
    is_run = false;
    res: any;
    brokens: Array<Subscriber> = [];
    accu = 0;
    private _run() {
        this.is_run = true;
        SUBSCRIBER_STACK.unshift(this);
        this.accu += 1;
        try {
            return this.res = this.fn();
        } catch (e) {
            throw e;
        } finally {
            SUBSCRIBER_STACK.shift();
            this.is_run = false;
            this.brokens.length = 0;
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


function transacts(option: TRANSACTS_CONFIG, fn: Function, ...args: Array<any>) {
    transacting(option);
    try {
        return fn(...args);
    } catch (e) {
        throw e;
    } finally {
        transacted();
    }
}


type ReflectCall = (fn: Function, ...args: Array<any>) => any;

function atom<T = Function>(fn: T): T {
    return transacts.bind(null, fn, TRANSACTS_OPTION.ATOM);
}


const runInAtom: ReflectCall = transacts.bind(null, TRANSACTS_OPTION.ATOM);


const _runInPlain: ReflectCall = transacts.bind(null, TRANSACTS_OPTION.PLAIN);

function action<T = Function>(fn: T): T {
    return transacts.bind(null, TRANSACTS_OPTION.ACTION, fn);
}


const runInAction: ReflectCall = transacts.bind(null, TRANSACTS_OPTION.ACTION)


function sandbox<T = Function>(fn: T, option: SANDOBX_OPTION = SANDOBX_OPTION.DEFAULT): T {
    return _runInSandbox.bind(null, option, fn);
}
const runInSandbox: ReflectCall = _runInSandbox.bind(null, SANDOBX_OPTION.DEFAULT);

function _runInSandbox(
    option: SANDOBX_OPTION,
    fn: Function,
    ...args: Array<any>
) {
    let parent_sandbox = SANDBOX_STACK[0];
    let parent_subscrber = SUBSCRIBER_STACK[0];
    let bakopt = parent_subscrber && parent_subscrber.option;
    let subs = option & SANDOBX_OPTION.CLEAN_CHANGE || !parent_sandbox
        ? []
        : parent_sandbox[SANDBOX.SUBSCRIBERS];
    let start = subs.length;
    let records = option & SANDOBX_OPTION.CLEAN_CHANGE || !parent_sandbox
        ? []
        : parent_sandbox[SANDBOX.RECORDS];
    parent_subscrber && (
        parent_subscrber.option = option & SANDOBX_OPTION.PREVENT_COLLECT
            ? (bakopt | SUBSCRIBE_OPTION.PREVENT_COLLECT)
            : (bakopt & ~SUBSCRIBE_OPTION.PREVENT_COLLECT)
    );

    SANDBOX_STACK.unshift(
        [
            records,
            subs,
            option | (
                // 用于外部判断逻辑，使能根据上层 sandbox 配置过滤掉不应当的订阅响应
                parent_sandbox
                && parent_sandbox[SANDBOX.OPTION] & SANDOBX_OPTION.CLEAN_CHANGE
            )
        ]
    );

    try {
        return fn(...args);
    } catch (e) {
        throw e;
    } finally {

        SANDBOX_STACK.shift();

        if (option & SANDOBX_OPTION.CLEAN_CHANGE) {
            cleanChanges(records);
        }
        if (option & SANDOBX_OPTION.CLEAN_SUBSCRIBE) {
            for (let i = subs.length - 1; i >= start; i--) {
                let sub = subs[i];
                sub.unmount(sub.parent !== parent_subscrber);
            }
            subs.length = start;    //节省消耗，unmount 参数 1 不一定都是 true
        } else if (parent_sandbox && option & SANDOBX_OPTION.CLEAN_CHANGE) {
            Array.prototype.push.apply(
                parent_sandbox[SANDBOX.SUBSCRIBERS],
                subs
            )
        }
        parent_subscrber && (parent_subscrber.option = bakopt);
    }
}
function cleanChanges(records: Array<IRecord>) {
    let volatile_records: Array<IRecord> = [];
    diffRecords(
        records,
        function (record: IRecord) {
            let ob = record[RECORD.OBSERVER];
            let key = record[RECORD.KEY];
            let type = record[RECORD.TYPE];
            if (type & RECORD_TYPE.OWN) {
                // 当前方法非返回 -1 则不会出现 type === RECORD_TYPE.OWN 
                // 而 value 不为 false 的情况
                ob._del(key);
            } else if (~type & RECORD_TYPE.READONLY) {
                if (type & RECORD_TYPE.VOLATILE) {
                    volatile_records.push(record);
                    return;
                }
                ob._set(key, record[RECORD.VALUE]);
            }
        }
    );
    for (let record of volatile_records) {
        record[RECORD.OBSERVER]._set(
            record[RECORD.KEY],
            record[RECORD.VALUE]
        );
    }
}


function autorun(fn: Function): () => void {
    let sub = new Subscriber(fn);
    sub.mount();
    return function disposer() {
        sub.unmount();
    };
}

/*
const BUILTIN_LITERAL_SET = new Set(
    [Date, RegExp, Number, String, Blob]
);//[Date, RegExp, Number, String], GLOBAL.BigInt
*/

const SHOULD_OBSERVABLE_SET: Set<Function> = new Set([
    Object, Array, Map, Set, WeakMap, WeakSet,
    /*  
    // 有些内构方法或对象传入这些实例的 Proxy 值会出现问题
    Float32Array, Float64Array,
    Int8Array, Int16Array, Int32Array,
    Uint8Array, Uint16Array, Uint32Array,
    Uint8ClampedArray,
    */
]);

function observable<T = IOBTarget>(obj: T): T {
    if (obj && typeof obj === "object") {
        let ob = OBSERVER_MAP.get(obj);
        if (ob) {
            obj = ob.proxy;
        } else {
            let constructor = obj.constructor;
            if (
                SHOULD_OBSERVABLE_SET.has(constructor)
                || GLOBAL[constructor.name] !== constructor
            ) {
                obj = new Observer(obj as any).proxy;
            }
        }
    }
    return obj;
}

function computed(calc: Function) {
    let value: any;
    let changed = 0;
    let subscriber = new Subscriber(
        function () {
            (changed ^= 1) && (value = calc());
        }, SUBSCRIBE_OPTION.COMPUTED
    );
    subscriber.parent = null;
    return function () {
        changed || subscriber.update();
        return value;
    }
}

function watch(
    handle: Function,
    watcher: (new_value: any, old_value: any) => void,
    immediately?: boolean
) {
    let value_stack: Array<any> = [];

    let subscriber = new Subscriber(function () {
        value_stack.unshift(handle());
        if (immediately || value_stack.length > 1) {
            let [new_val, old_val] = value_stack;
            equal(new_val, old_val) || watcher(new_val, old_val);
        }
        value_stack.length = 1;
    });
    subscriber.mount();

    return function disposer() {
        subscriber.unmount();
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
    option?: TRANSACTS_CONFIG
) {
    let action = ACTION_STACK[0];
    let hook: Function;
    if (option === undefined) {
        option = action
            ? action[ACTION.TYPE] & TRANSACTS_OPTION.ATOM
            : TRANSACTS_OPTION.DEFAULT;
    } else if (typeof option !== "number") {
        hook = option.hook;
        option = option.option;
    }

    ACTION_STACK.unshift([
        ACTION_STACK.length,
        option,
        hook
    ]);

}

function diffRecords(records: Array<IRecord>, callback?: Function) {
    let obj_map: Map<any, Set<string>> = new Map();
    let res = false;
    for (let record of records) {
        let ob = record[RECORD.OBSERVER];
        let key = record[RECORD.KEY];
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
        if (
            equal(
                record[RECORD.TYPE] !== RECORD_TYPE.OWN
                    ? ob._val(key)
                    : ob._has(key)
                , record[RECORD.VALUE]
            )
        ) {
            continue;
        }
        if (!callback) {
            return true;
        } else if (callback(record) === -1) {
            key_set.delete(key);
        }
        res = true;
    }
    return res;
}

function transacted() {

    let reactions = [];

    let action = ACTION_STACK.shift();
    let depth = action[ACTION.DEPTH];
    let hook = action[ACTION.HOOK];
    if (
        ACTION_STACK.length !== 0
        && (
            action[ACTION.TYPE] & (TRANSACTS_OPTION.PLAIN & ~TRANSACTS_OPTION.ATOM)
            || action[ACTION.TYPE] & TRANSACTS_OPTION.ATOM
            && ACTION_STACK[0][ACTION.TYPE] & TRANSACTS_OPTION.ATOM
        )
    ) {
        return;
    }
    while (
        REACTION_TARGET_LIST.length
        && REACTION_STATE_LIST[0][REACTION_STATE.DEPTH] >= depth
    ) {

        let subscriber = REACTION_TARGET_LIST.shift();
        let state = REACTION_STATE_LIST.shift();

        if (reactions.indexOf(subscriber) < 0
            && diffRecords(state[REACTION_STATE.RECORDS])
        ) {
            let index: number;
            while (
                (index = REACTION_TARGET_LIST.lastIndexOf(subscriber)) >= 0
            ) {
                REACTION_TARGET_LIST.splice(index, 1);
                REACTION_STATE_LIST.splice(index, 1);
            }
            reactions.unshift(subscriber);
        }
    }

    hook && hook(reactions);
    if (reactions.length) {
        if (action[ACTION.TYPE] & TRANSACTS_OPTION.WRAPUP) {
            runInAction(function () {
                deepReactive(reactions);
            });
        } else {
            deepReactive(reactions);
        }
    }
}

function addRecord(reactions: Array<Subscriber>, record: IRecord) {
    for (let i = 0; i < reactions.length; i++) {
        reactions[i].addRecord(record);
    }
}

function deepReactive(reactions: Array<Subscriber>) {

    let sandbox = SANDBOX_STACK[0];
    let includes = sandbox
        && sandbox[SANDBOX.OPTION] & SANDOBX_OPTION.CLEAN_CHANGE
        && sandbox[SANDBOX.SUBSCRIBERS];
    const inScoped = function (sub: Subscriber) {
        return !includes || includes.indexOf(sub) >= 0;
    }

    let sub: Subscriber;
    let index: number;
    next: for (let i = reactions.length - 1; i >= 0; i--) {
        sub = reactions[i];
        if (sub.option & SUBSCRIBE_OPTION.COMPUTED) {
            reactions.splice(i, 1);
            sub.update();
            continue;
        }
        while ((sub = sub.parent)) {
            if (sub.is_run || !inScoped(sub)) {
                break;
            }
            index = reactions.indexOf(sub)
            if (index >= 0) {
                reactions[index].brokens.unshift(reactions[i]);
                //reactions[i].brokens.length = 0;
                reactions.splice(i, 1);
                continue next;
            }
        }
        sub = reactions[i];

        if (sub.is_run || !inScoped(sub)) {
            reactions.splice(i, 1);
        }
    }

    for (let i = 0; i < reactions.length; i++) {
        sub = reactions[i];
        sub.parent !== undefined && sub.update();
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
                        return _runInPlain(() => original.apply(this, args));
                    }]
                }
            ),
            ["values", Symbol.iterator].map(
                // 对于内部隐藏实现，这里使之产生相应的订阅
                function (key) {
                    const original = prototype[key];
                    return original && [key, function () {
                        ob.collect(MASK_ITERATE, RECORD_TYPE.REF);
                        let index = 0;
                        let proxy = ob.proxy;
                        return {
                            next() {
                                let done = index >= target.length;
                                let value: any;
                                done || (value = proxy[index++]);
                                return { done, value }
                            }
                        }
                        //return obIterator(target, original);
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
        return _runInPlain(function () {
            let res = original(_target, key, value);
            target.length !== length
                && ob.notify("length", length, RECORD_TYPE.REF_AND_VOLATILE);

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

    internal_ob._has = prototype.has.bind(target);

    if (target instanceof Map || target instanceof WeakMap) {

        internal_ob._val = function (key: any) {
            return prototype.get.call(target, key);;
        };
    } else {
        internal_ob._val = function (value: any) {
            return prototype.has.call(target, value) ? value : MASK_UNDEFINED;
        };
    }

    internal_ob._del = function (key: any) {
        return prototype.delete.call(target, key);
    }
    internal_ob._set = prototype.set
        ? function (key: any, value: any) {
            return prototype.set.call(target, key, value);
        } : function (key: any, value: any) {
            return prototype.add.call(target, key);
        }

    let proxyMethods = {
        get(key: any) {
            /*let kob = OBSERVER_MAP.get(key);
            kob && (key = kob.target);*/

            internal_ob.collect(key);
            return observable(prototype.get.call(target, key));
        },
        set(key: any, value: any) {
            let kob = OBSERVER_MAP.get(key);
            kob && (key = kob.target);
            let has_key = prototype.has.call(target, key);
            let bak_value = has_key ? prototype.get.call(target, key) : MASK_UNDEFINED;

            if (!has_key || !equal(bak_value, value)) {
                _runInPlain(() => {
                    prototype.set.call(target, key, value);
                    if (!has_key) {
                        internal_ob.notify(key, false, RECORD_TYPE.OWN);
                        internal_ob.notify(MASK_ITERATE, MASK_ITERATE, RECORD_TYPE.OWN);
                    }
                    internal_ob.notify(MASK_ITERATE, MASK_ITERATE, RECORD_TYPE.REF);
                    internal_ob.notify(key, bak_value);
                });
            }
            return this;
        },
        add(key: any) {

            if (!prototype.has.call(target, key)) {
                _runInPlain(() => {
                    let size = _size();
                    prototype.add.call(target, key);
                    size !== undefined && ob.notify("size", size, RECORD_TYPE.REF_AND_READONLY);
                    internal_ob.notify(key, false, RECORD_TYPE.OWN)
                    internal_ob.notify(key, MASK_UNDEFINED);
                    internal_ob.notify(MASK_ITERATE, MASK_ITERATE, RECORD_TYPE.OWN);
                    internal_ob.notify(MASK_ITERATE, MASK_ITERATE, RECORD_TYPE.REF);
                });
            }
            return this;
        },
        delete(key: any) {

            let get = prototype.get;
            let value = get ? get.call(target, key) : key;
            let size = _size();
            let res = prototype.delete.call(target, key);
            if (res) {
                _runInPlain(() => {
                    internal_ob.notify(key, value);
                    internal_ob.notify(key, true, RECORD_TYPE.OWN);
                    internal_ob.notify(MASK_ITERATE, MASK_ITERATE, RECORD_TYPE.OWN);
                    internal_ob.notify(MASK_ITERATE, MASK_ITERATE, RECORD_TYPE.REF);

                    size !== undefined && ob.notify("size", size, RECORD_TYPE.REF_AND_READONLY);
                });
            }
            return res;
        },
        clear() {
            let size = _size();
            if (!size) {
                return;
            }
            _runInPlain(() => {
                prototype.forEach.call(
                    target,
                    (value: any, key: any) => {
                        internal_ob.notify(key, value);
                        internal_ob.notify(key, true, RECORD_TYPE.OWN);
                    }
                )
                internal_ob.notify(MASK_ITERATE, MASK_ITERATE, RECORD_TYPE.OWN);
                internal_ob.notify(MASK_ITERATE, MASK_ITERATE, RECORD_TYPE.REF);
                ob.notify("size", size, RECORD_TYPE.REF_AND_READONLY);

                prototype.clear.call(target);
            })
        },
        forEach(cb: Function, ...args: any) {
            internal_ob.collect(MASK_ITERATE, RECORD_TYPE.OWN);
            internal_ob.collect(MASK_ITERATE, RECORD_TYPE.REF);
            return prototype.forEach.call(target, function (value: any, ...rest: any) {
                cb(observable(value), ...rest)
            }, ...args);

        },
        has(value: any) {

            internal_ob.collect(value, RECORD_TYPE.OWN);
            let res = prototype.has.call(target, value);
            return res;
        },
        size: _size,
        ...[
            [
                "keys",
                (value: [any, any]) => value[0],
                [RECORD_TYPE.OWN]
            ],
            [
                "entries",
                (value: [any, any]) => [value[0], observable(value[1])],
                [RECORD_TYPE.OWN, RECORD_TYPE.REF]
            ],
            [
                "values",
                (value: [any, any]) => observable(value[1]),
                [RECORD_TYPE.REF]
            ],
            [
                Symbol.iterator,
                (value: [any, any]) => observable(value[1]),
                [RECORD_TYPE.OWN, RECORD_TYPE.REF]
            ]
        ].reduce(
            function (res, [key, _value, types]: [string | symbol, any, any]) {
                let original = prototype["entries"/*key*/];
                if (original) {
                    res[key] = function () {
                        for (let type of types) {
                            internal_ob.collect(MASK_ITERATE, type);
                        }

                        let iterator = original.call(target);
                        let originalNext = iterator.next.bind(iterator);
                        iterator.next = function () {
                            let { done, value } = originalNext();

                            if (!done) {
                                value = _value(value);
                            }
                            return { done, value };
                        }
                        return iterator;
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


export {
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
    SUBSCRIBE_OPTION,
    computed,
    watch,
    reaction,
    MASK_ITERATE,
    MASK_UNDEFINED,
    RECORD_TYPE
};
