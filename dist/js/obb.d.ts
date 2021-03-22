export { Observer, Subscriber, observable, autorun, atom, runInAtom, action, runInAction, sandbox, runInSandbox, SANDOBX_OPTION, computed, watch, reaction, };
declare type IOBInternalObject = Set<any> | Map<any, any> | WeakSet<any> | WeakMap<any, any>;
declare type IOBTarget = object | IOBInternalObject | Iterable<any> | ArrayLike<any>;
declare const enum RECORD {
    OBSERVER = 0,
    KEY = 1,
    VALUE = 2,
    TYPE = 3
}
interface IRecord {
    [RECORD.OBSERVER]: Observer;
    [RECORD.KEY]: any;
    [RECORD.VALUE]: any;
    [RECORD.TYPE]: RECORD_TYPE;
}
declare const enum RECORD_TYPE {
    OWN = 1,
    REF = 2,
    READONLY = 4,
    VOLATILE = 8,
    REF_AND_READONLY = 6,
    REF_AND_VOLATILE = 10
}
declare enum SANDOBX_OPTION {
    PREVENT_COLLECT = 1,
    CLEAN_SUBSCRIBE = 2,
    CLEAN_CHANGE = 4,
    DEFAULT = 7,
    NORMAL = 0
}
declare type ISubscriberSet = Set<Subscriber>;
declare class Observer<T extends object = any> {
    readonly target: T;
    readonly proxy: any;
    readonly refmap: Map<any, ISubscriberSet>;
    readonly ownmap: Map<any, ISubscriberSet>;
    constructor(target: T);
    collect(prop: any, type?: RECORD_TYPE): void;
    release(): void;
    notify(prop: any, value: any, type?: RECORD_TYPE): void;
    _has: (key: any) => boolean;
    _val: (key: any) => any;
    _del: (key: any) => boolean;
    _set: (key: any, value: any) => any;
    _map(type: RECORD_TYPE): Map<any, ISubscriberSet>;
    _proxy_handler: {
        get: (target: IOBTarget, prop: string | symbol) => any;
        set: (target: IOBTarget, prop: string, value: any) => boolean;
        ownKeys: (target: IOBTarget) => any;
        has: (target: IOBTarget, key: string) => boolean;
        deleteProperty: (target: IOBTarget, key: string) => any;
    };
}
declare class Subscriber {
    fn: Function;
    passive?: boolean | number;
    parent: Subscriber;
    children: Array<Subscriber>;
    constructor(fn: Function, passive?: boolean | number);
    private _deps;
    undepend(set: ISubscriberSet): void;
    depend(set: ISubscriberSet): void;
    clear(shallow?: boolean): void;
    unmount(shallow?: boolean): void;
    private _sandbox;
    mount(): any;
    update(): any;
    addRecord(record: IRecord): void;
    is_run: boolean;
    res: any;
    private _run;
}
declare function atom(fn: Function): any;
declare function runInAtom(fn: Function): any;
declare function action(fn: Function): any;
declare function runInAction(fn: Function): any;
declare function sandbox(fn: Function): any;
declare function runInSandbox(fn: Function, option?: SANDOBX_OPTION): any;
declare function autorun(fn: Function, passive?: boolean | number): () => void;
declare function observable(obj: any): any;
declare function computed(calc: Function): () => any;
declare function watch(handle: Function, watcher: (new_value: any, old_value: any) => void): () => void;
declare function reaction(handle: Function, watcher: (val: any) => void): () => void;
