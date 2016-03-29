/**
 * 深度克隆
 * @author haili
 * */
function deepClone(obj) {
    var result = obj.constructor === Array ? [] : {},
        i;

    for (i in obj) {
        result[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
    }
    return result;
}

var myObj = {
    str: 'myString',
    num: 1,
    myArr: [
        30,
        {
            arrStr: 'myArrInnerStr'
        }
    ],
    myObj: {
        innerObj: {
            test: 25
        },
        innerStr: 'myObjInnerStr'
    },
    func: function() {
        console.log('function test.........');
    }
};

var s = deepClone(myObj);
s.func();
console.log(s);


/**
 * 事件绑定
 * @author
 * */
var EventUtil = {
    addHandler: function(elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + type, handler);
        } else {
            elem['on' + type] = handler;
        }
    },
    removeHandler: function(elem, type, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        } else if (elem.detachedRuleset) {
            elem.detachedRuleset('on' + type, handler);
        } else {
            elem['on' + type] = null;
        }
    },
    getEvent: function(event) {
        return event || window.event;
    },
    getTarget: function(event) {
        return event.target || window.srcElement;
    },
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble();
        }
    }
};
var body = document.getElementsByTagName("body");
console.log(body[0]);
EventUtil.addHandler(body[0], 'click', function() {
    console.log('body click');
});


/**
 * 原生getElementsByClassName
 *
 * */
function getElementsByClassName(className) {
    if (document.getElementsByClassName) {
        return document.getElemendtsByClassName(className);
    }
    var all = document.all || document.getElementsByTagName('*'),
        result = [];
    for (var i in all) {
        if (all[i].className.indexOf(className) >= 0) {
            result.push(all[i]);
        }
    }
    return result;
}

/**
 * 事件代理
 * */
var ul = document.getElementById('ul');
EventUtil.addHandler(ul, 'click', function(e) {
    var target, currentTarget;
    e = EventUtil.getEvent(e);
    target = EventUtil.getTarget(e);
    e.preventDefault();
    console.log(e.currentTarget);
    console.log(target);
});

/**
 *
 * */