/*
 * @Autor        : Pat
 * @Description  : Enums config
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-12-15 10:55:02
 */
let enums: any = {
    // Data source type
    _dataSourceType: [
        {
            label: 1,
            value: `内置数据源`
        },
        {
            label: 2,
            value: "影像数据源"
        },
        {
            label: 3,
            value: "矢量数据源"
        },
        {
            label: 4,
            value: "地形数据源"
        },
    ]
};

Object.keys(enums).forEach((enumItem: any) => {
    const newKey = `${enumItem.replace(/\_/g, "")}`;
    Object.defineProperty(enums, newKey, {
        get: function () {
            return this[enumItem];
        },
        set: function (val) {
            this[enumItem] = val;
        },
        configurable: true
    });
    enums[enumItem][`__proto__`].getValue = function (key: any) {
        return getValue(enumItem, key);
    }
    enums[enumItem][`__proto__`].getKey = function (value: any) {
        return getKey(enumItem, value);
    }
    enums[enumItem][`__proto__`].setKey = function (label: any, value: any) {
        setEnum(enumItem, value, label);
    }
});

export let Enums = enums;

/**
  * @description: Get enumeration value
  * @param {String} name enumeration value parameter name Enums[name]
  * @param {String} key enumeration value parameter value all all, 0 Get the label with vlaue equal to 0
  * @return: Array and String
  * @author: Pat
  */
export function getValue(name: any, key: any) {
    let POLICYTYPE = new Map(),
        value;
    for (let item of Enums[name]) {
        if (item.label === key) {
            value = item.value;
        }
        POLICYTYPE.set(item.value, item.label)
    }
    POLICYTYPE.set('all', Enums[name])
    return value ? value : POLICYTYPE.get(key === false || key === undefined || key === null || key === "" ? 'all' : key)
}
/**
  * @description: Get enumeration value
  * @param {String} name enumeration value parameter name Enums[name]
  * @param {String} value enumeration value parameter value all all, 0 Get the label with vlaue equal to 0
  * @return: Array and String
  * @author: Pat
  */
export function getKey(name: any, value: any) {
    let POLICYTYPE = new Map(),
        key;
    for (let item of Enums[name]) {
        if (item.value === value) {
            key = item.label;
        }
        POLICYTYPE.set(item.value, item.label)
    }
    POLICYTYPE.set('all', Enums[name]);
    return value ? value : POLICYTYPE.get(value === false || value === undefined || value === null || value === "" ? 'all' : value)
}
/**
  * @description: Set enumeration value
  * @param {String} name enumeration value parameter name Enums[name]
  * @param {String} value The value of the enumeration parameter value
  * @param {String} label enumeration value parameter value label
  * @author: Pat
  */
export function setEnum(name: any, value: any, label: any) {
    Enums[name].concat({
        label: label,
        value: value
    })
}