import { eventsMixin, initEvents } from './events';
export function defineReactive(obj, key, val) {
    const property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
        return;
    }

    // cater for pre-defined getter/setters
    const getter = property && property.get;
    const setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
        val = obj[key];
    }
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            const value = getter ? getter.call(obj) : val;
            return value;
        },
        set: function reactiveSetter(newVal) {
            const value = getter ? getter.call(obj) : val;
            /* eslint-disable no-self-compare */
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return;
            }
            if (setter) {
                setter.call(obj, newVal);
            } else {
                val = newVal;
            }
            // 重新渲染
            if (obj.timer) {
                clearTimeout(obj.timer);
                obj.timer = null;
            }
            obj.timer = setTimeout(() => {
                obj.render();
            }, 0);
        }
    });
}
function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(',');
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val];
}
// label,p
var isReservedTag = makeMap(
    'template,script,style,element,content,slot,link,meta,svg,view,' +
        'a,div,img,image,text,span,input,switch,textarea,spinner,select,p,label,' +
        'slider,slider-neighbor,indicator,canvas,' +
        'list,cell,header,loading,loading-indicator,refresh,scrollable,scroller,' +
        'video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown',
    true
);
const isReservedEvent = makeMap('click,input,focus,blur,change', true);
function _c(tag, data, children) {
    if (!children && data && data.length) {
        children = data;
        data = {};
    } else if (!children && !data) {
        data = {};
    }
    if (isReservedTag(tag)) {
        let dom = document.createElement(tag);
        let classArr = [];
        if (data.staticClass) {
            classArr.push(data.staticClass);
        }
        // dynamic class
        if (data.class) {
            classArr = classArr.concat(data.class);
        }
        dom.className = classArr.join(' ');
        if (data.attrs) {
            for (let key in data.attrs) {
                dom.setAttribute(key, data.attrs[key]);
            }
        }
        if (data.on) {
            for (let key in data.on) {
                if (isReservedEvent(key)) {
                    // 浏览器事件
                    dom.addEventListener(key, data.on[key].bind(this), false);
                } else {
                    this.$on(key, data.on[key].bind(this));
                }
            }
        }
        if (data.ref) {
            this.$refs[data.ref] = dom;
        }
        if (Array.isArray(children)) {
            for (let i = 0; i < children.length; i++) {
                dom.appendChild(children[i]);
            }
        }
        return dom;
    } else {
        // 解析component
        if (data && data.on) {
            for (let key in data.on) {
                let _parentListeners = null;
                if (!isReservedEvent(key)) {
                    if (!_parentListeners) {
                        _parentListeners = {};
                    }
                    _parentListeners[key] = data.on[key].bind(this);
                }
                if (_parentListeners) {
                    data._parentListeners = _parentListeners;
                }
            }
        }
        return require_class.call(this, tag, data);
    }
}
// render static
function _m(index) {
    if (this.staticRenderFns && typeof this.staticRenderFns[index] === 'function') {
        return this.staticRenderFns[index].call(this);
    } else {
        return '';
    }
}
var classifyRE = /(?:^|[-_])(\w)/g;
var classify = function(str) {
    return str
        .replace(classifyRE, function(c) {
            return c.toUpperCase();
        })
        .replace(/[-_]/g, '');
};
function require_class(tag, data = {}) {
    const Class = require(`../dist/${classify(tag)}`)['default'];
    const instance = new Class(data);
    if (data.ref) {
        this.$refs[data.ref] = instance;
    }
    return instance.render();
}
function _v(text) {
    return document.createTextNode(text);
}
function _e(text) {
    return document.createComment(text || '');
}
function _s(val) {
    return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
}
class Component {
    constructor($options, extra) {
        this.$options = $options;
        if ($options.props) {
            for (var key2 in $options.props) {
                if (!this[key2]) {
                    let defaultObj = $options.props[key2]['default']();
                    this[key2] = defaultObj;
                }
                defineReactive(this, key2, this[key2]);
            }
        }
        if (extra && extra.attrs) {
            for (var key in extra.attrs) {
                this[key] = extra.attrs[key];
                defineReactive(this, key, extra.attrs[key]);
            }
        }
        if (extra && extra._parentListeners) {
            this.$options._parentListeners = extra._parentListeners;
        }
        // 绑定事件
        initEvents(this);
        this._init();
        this._initAppendCss();
    }
    _init() {
        const $options = this.$options;
        this.$refs = {};
        this.dom = null;
        this._initProp($options.prop);
        this._initData($options.data);
        this._initEvents($options.methods);
    }
    _hook(hookName) {
        let temp = this.$options[hookName];
        if (temp && typeof temp === 'function') {
            temp.call(this);
        }
    }
    // append css
    _initAppendCss() {
        if (this.style && this.constructor.isAppendStyle === false) {
            let style = document.createElement('style');
            style.innerText = this.style;
            document.getElementsByTagName('head')[0].appendChild(style);
            this.constructor.isAppendStyle = true;
        }
    }
    // 初始化 传入 prop
    _initProp(prop) {
        for (let key in prop) {
            this[key] = prop[key];
        }
    }
    // 初始化 data
    _initData(data) {
        if (typeof data === 'function') {
            data = data();
        }
        for (let key in data) {
            this[key] = data[key];
            defineReactive(this, key, data[key]);
        }
    }
    // 初始化 方法
    _initEvents(methods = {}) {
        for (let key in methods) {
            this[key] = methods[key];
        }
    }
    render() {
        let parentNode;
        let nextSibling;
        if (this.dom && this.dom.nextSibling) {
            nextSibling = this.dom.nextSibling;
        }
        if (this.dom && this.dom.parentNode) {
            parentNode = this.dom.parentNode;
            parentNode.removeChild(this.dom);
        }
        this._hook('beforeMounted');
        this.dom = this.renderDom();
        if (nextSibling) {
            parentNode.insertBefore(this.dom, nextSibling);
        } else if (parentNode) {
            parentNode.appendChild(this.dom);
        }
        this._hook('mounted');
        return this.dom;
    }
}
Component.prototype._c = _c;
Component.prototype._v = _v;
Component.prototype._m = _m;
Component.prototype._e = _e;
Component.prototype._s = _s;
eventsMixin(Component);
export default Component;
