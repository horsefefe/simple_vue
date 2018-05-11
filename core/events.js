export function toArray(list, start) {
    start = start || 0;
    let i = list.length - start;
    const ret = new Array(i);
    while (i--) {
        ret[i] = list[i + start];
    }
    return ret;
}
export function cached(fn) {
    const cache = Object.create(null);
    return function cachedFn(str) {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}

const _toString = Object.prototype.toString;
export function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]';
}

export function isUndef(v) {
    return v === undefined || v === null;
}

const normalizeEvent = cached(name => {
    const passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    const once = name.charAt(0) === '~'; // Prefixed last, checked first
    name = once ? name.slice(1) : name;
    const capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
        name,
        once,
        capture,
        passive
    };
});

export function createFnInvoker(fns) {
    function invoker() {
        const fns = invoker.fns;
        if (Array.isArray(fns)) {
            const cloned = fns.slice();
            for (let i = 0; i < cloned.length; i++) {
                cloned[i].apply(null, arguments);
            }
        } else {
            // return handler return value for single handlers
            return fns.apply(null, arguments);
        }
    }
    invoker.fns = fns;
    return invoker;
}

export function updateListeners(on, oldOn, add, remove, instance) {
    let name, def, cur, old, event;
    for (name in on) {
        def = cur = on[name];
        old = oldOn[name];
        event = normalizeEvent(name);
        if (isPlainObject(def)) {
            cur = def.handler;
            event.params = def.params;
        }
        if (isUndef(old)) {
            if (isUndef(cur.fns)) {
                cur = on[name] = createFnInvoker(cur);
            }
            add(event.name, cur, event.once, event.capture, event.passive, event.params);
        } else if (cur !== old) {
            old.fns = cur;
            on[name] = old;
        }
    }
    for (name in oldOn) {
        if (isUndef(on[name])) {
            event = normalizeEvent(name);
            remove(event.name, oldOn[name], event.capture);
        }
    }
}

export function initEvents(instance) {
    instance._events = Object.create(null);
    instance._hasHookEvent = false;
    // init parent attached events
    const listeners = instance.$options._parentListeners;
    if (listeners) {
        updateComponentListeners(instance, listeners);
    }
}

let target;

function add(event, fn, once) {
    if (once) {
        target.$once(event, fn);
    } else {
        target.$on(event, fn);
    }
}

function remove(event, fn) {
    target.$off(event, fn);
}

export function updateComponentListeners(instance, listeners, oldListeners) {
    debugger;
    target = instance;
    updateListeners(listeners, oldListeners || {}, add, remove, instance);
    target = undefined;
}

export function eventsMixin(Component) {
    const hookRE = /^hook:/;
    Component.prototype.$on = function(event, fn) {
        const instance = this;
        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l; i++) {
                this.$on(event[i], fn);
            }
        } else {
            (instance._events[event] || (instance._events[event] = [])).push(fn);
            // optimize hook:event cost by using a boolean flag marked at registration
            // instead of a hash lookup
            if (hookRE.test(event)) {
                instance._hasHookEvent = true;
            }
        }
        return instance;
    };

    Component.prototype.$once = function(event, fn) {
        const instance = this;
        function on() {
            instance.$off(event, on);
            fn.apply(instance, arguments);
        }
        on.fn = fn;
        instance.$on(event, on);
        return instance;
    };

    Component.prototype.$off = function(event, fn) {
        const instance = this;
        // all
        if (!arguments.length) {
            instance._events = Object.create(null);
            return instance;
        }
        // array of events
        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l; i++) {
                this.$off(event[i], fn);
            }
            return instance;
        }
        // specific event
        const cbs = instance._events[event];
        if (!cbs) {
            return instance;
        }
        if (!fn) {
            instance._events[event] = null;
            return instance;
        }
        if (fn) {
            // specific handler
            let cb;
            let i = cbs.length;
            while (i--) {
                cb = cbs[i];
                if (cb === fn || cb.fn === fn) {
                    cbs.splice(i, 1);
                    break;
                }
            }
        }
        return instance;
    };

    Component.prototype.$emit = function(event) {
        const instance = this;
        let cbs = instance._events[event];
        if (cbs) {
            cbs = cbs.length > 1 ? toArray(cbs) : cbs;
            const args = toArray(arguments, 1);
            for (let i = 0, l = cbs.length; i < l; i++) {
                try {
                    cbs[i].apply(instance, args);
                } catch (e) {
                    console.log(e, instance, `event handler for "${event}"`);
                }
            }
        }
        return instance;
    };
}
