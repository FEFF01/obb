export { Observer, Subscriber, observable, autorun, atomic, runAtomic, action, runAction, computed, watch, reaction, };
declare type IOBInternalObject = Set<any> | Map<any, any> | WeakSet<any> | WeakMap<any, any>;
declare type IOBTarget = Object | IOBInternalObject;
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
    REF = 2
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
    _map(type?: RECORD_TYPE): Map<any, ISubscriberSet>;
    _proxy_handler: {
        get: (target: IOBTarget, prop: string) => any;
        set: (target: IOBTarget, prop: string, value: any) => boolean;
        ownKeys: (target: IOBTarget) => any;
        has: (target: IOBTarget, key: string) => boolean;
        deleteProperty: (target: IOBTarget, key: string) => any;
    };
}
declare class Subscriber {
    fn: Function;
    parent: Subscriber;
    children: Array<Subscriber>;
    constructor(fn: Function);
    private _deps;
    undepend(set: ISubscriberSet): void;
    depend(set: ISubscriberSet): void;
    release(): void;
    unmount(): void;
    mount(): any;
    update(): any;
    addRecord(record: IRecord): void;
    is_run: boolean;
    private _run;
}
declare function atomic(fn: Function): any;
declare function runAtomic(fn: Function): any;
declare function action(fn: Function): any;
declare function runAction(fn: Function): any;
declare function autorun(fn: Function): () => void;
declare function observable(obj: IOBTarget | any): any;
declare function computed(calc: Function): () => any;
declare function watch(handle: Function, watcher: (new_value: any, old_value: any) => void): () => void;
declare function reaction(handle: Function, watcher: (val: any) => void): () => void;
