webpackJsonp([8],[
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = normalizeComponent;
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  scriptExports = scriptExports || {}

  // ES6 modules interop
  var type = typeof scriptExports.default
  if (type === 'object' || type === 'function') {
    scriptExports = scriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(63);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(47);
var isBuffer = __webpack_require__(153);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["epochToRelative"] = epochToRelative;
function epochToRelative(epochtime) {
    const lang = {
        postfixes: {
            '<': ' latter',
            '>': ' ago'
        },
        1000: {
            singular: 'a moment',
            plural: 'a moments'
        },
        60000: {
            singular: 'a minute',
            plural: '# minutes'
        },
        3600000: {
            singular: 'a hour',
            plural: '# hours'
        },
        86400000: {
            singular: 'a day',
            plural: '# days'
        },
        2592000000: {
            singular: 'a month',
            plural: '# months'
        },
        31540000000: {
            singular: 'a year',
            plural: '# years'
        }
    };
    const now = Date.now();
    const timespans = [1000, 60000, 3600000, 86400000, 2592000000, 31540000000];
    let timeDifference = now - epochtime * 1000;
    const postfix = lang.postfixes[timeDifference < 0 ? '<' : '>'];
    let timespan = timespans[0];
    if (timeDifference < 0)
        timeDifference = timeDifference * -1;
    for (let i = 1; i < timespans.length; i++) {
        if (timeDifference > timespans[i]) {
            timespan = timespans[i];
        }
    }
    const n = Math.round(timeDifference / timespan);
    return lang[timespan][n > 1 ? 'plural' : 'singular'].replace('#', n) + postfix;
}
// export function epochToCustom(epochtime: number): string {
// }


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
// export const REQUEST_AUTHOR = 'REQUEST_AUTHOR'
// export const GET_AUTHOR = 'GET_AUTHOR'
// symbol motivation: https://stackoverflow.com/a/22280202/2780875
// vuex post
const REQUEST_POST = 'REQUEST_POST';
/* harmony export (immutable) */ __webpack_exports__["REQUEST_POST"] = REQUEST_POST;

const GET_POST = 'GET_POST';
/* harmony export (immutable) */ __webpack_exports__["GET_POST"] = GET_POST;

const REQUEST_POSTS = 'REQUEST_POSTS';
/* harmony export (immutable) */ __webpack_exports__["REQUEST_POSTS"] = REQUEST_POSTS;

const GET_POSTS = 'GET_POSTS';
/* harmony export (immutable) */ __webpack_exports__["GET_POSTS"] = GET_POSTS;

const GET_MORE_POSTS = 'GET_MORE_POSTS';
/* harmony export (immutable) */ __webpack_exports__["GET_MORE_POSTS"] = GET_MORE_POSTS;

const DELETE_POST = 'DELETE_POST';
/* harmony export (immutable) */ __webpack_exports__["DELETE_POST"] = DELETE_POST;

// type to handle request create post / update post
const REQUEST_SUBMIT_POST = 'SUBMIT_POST';
/* harmony export (immutable) */ __webpack_exports__["REQUEST_SUBMIT_POST"] = REQUEST_SUBMIT_POST;

const SUBMIT_POST = 'SUBMIT_POST';
/* harmony export (immutable) */ __webpack_exports__["SUBMIT_POST"] = SUBMIT_POST;

// vuex tag
const GET_TAG = 'GET_TAG';
/* harmony export (immutable) */ __webpack_exports__["GET_TAG"] = GET_TAG;

// vuex auth
const LOGIN = 'LOGIN';
/* harmony export (immutable) */ __webpack_exports__["LOGIN"] = LOGIN;

const LOGOUT = 'LOGOUT';
/* harmony export (immutable) */ __webpack_exports__["LOGOUT"] = LOGOUT;

// vuex global
const API_FAILURE = 'API_FAILURE';
/* harmony export (immutable) */ __webpack_exports__["API_FAILURE"] = API_FAILURE;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_meta__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_meta___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_meta__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_router__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vuex_modules__ = __webpack_require__(148);






__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_3_vue_router__["default"]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["default"]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_2_vue_meta___default.a);
// initial router
const router = new __WEBPACK_IMPORTED_MODULE_3_vue_router__["default"]({
    mode: "history",
    routes: __WEBPACK_IMPORTED_MODULE_4__routes__["a" /* default */],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});
/* harmony export (immutable) */ __webpack_exports__["router"] = router;

// initial store
const store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["default"].Store({
    modules: __WEBPACK_IMPORTED_MODULE_5__vuex_modules__["a" /* default */]
});
/* harmony export (immutable) */ __webpack_exports__["store"] = store;

// initial app
const app = new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
    router,
    store,
    template: "<router-view />"
});
/* harmony export (immutable) */ __webpack_exports__["app"] = app;

app.$mount("#app");


/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["injectCss"] = injectCss;
/* harmony export (immutable) */ __webpack_exports__["injectScript"] = injectScript;
function injectCss(href, cb) {
    if (!isStyleLoaded(href)) {
        const l = document.createElement('link');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('href', href);
        if (cb)
            l.onload = cb();
        document.body.appendChild(l);
    }
}
function injectScript(src, args = null) {
    if (!isScriptLoaded(src)) {
        const s = document.createElement('script');
        s.setAttribute('src', src);
        if (args) {
            if (args.id)
                s.setAttribute('id', args.id);
            if (args.cb)
                s.onload = args.cb();
        }
        document.body.appendChild(s);
    }
}
function isScriptLoaded(src) {
    const scripts = document.getElementsByTagName('script');
    // is script available
    for (let i = scripts.length; i--;) {
        if (scripts[i].src == src)
            return true;
    }
    return false;
}
function isStyleLoaded(href) {
    const styles = document.querySelectorAll('link[rel=\'stylesheet\']');
    // is css loaded
    for (let i = styles.length; i--;) {
        if (styles[i].href == href)
            return true;
    }
}


/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(20);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_bbfd5856_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(61)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-bbfd5856"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_bbfd5856_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_bbfd5856_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/pages/error/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bbfd5856", Component.options)
  } else {
    hotAPI.reload("data-v-bbfd5856", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(4);
var normalizeHeaderName = __webpack_require__(155);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(48);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(48);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_44d86f85_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(109)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_44d86f85_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_44d86f85_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/loaders/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44d86f85", Component.options)
  } else {
    hotAPI.reload("data-v-44d86f85", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_navbar_vue__ = __webpack_require__(64);


__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('navbar', __WEBPACK_IMPORTED_MODULE_1__components_navbar_vue__["a" /* default */]);
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    name: 'error-page'
}));


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(9);


const popular_tags = ['ReactJS', 'VueJS', 'Python', 'Javascript', 'Firebase', 'Tensorflow', 'NodeJS', 'Github'];
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    name: 'navbar',
    data() {
        return {
            search: false,
            search_text: '',
            show_navbar: false,
            popular_tags
        };
    },
    props: {
        keyword: {
            type: String,
            default: ''
        }
    },
    watch: {
        keyword(nv, ov) {
            if (nv == '') {
                this.search = false;
                this.search_text = '';
            }
        }
    },
    methods: {
        toggleSearch() {
            this.search = !this.search;
            if (this.search === true) {
                setTimeout(() => {
                    const search_input = document.getElementById('search-input');
                    if (search_input)
                        search_input.focus();
                }, 300);
            }
            else {
                this.search_text = '';
                // if close on route /search - redirect to home
                if (this.$route.name == 'search')
                    __WEBPACK_IMPORTED_MODULE_1__index__["router"].push({ path: `/` });
            }
        },
        handleChangeSearch(e) {
            if (e.keyCode == 13 && this.search_text != '') {
                __WEBPACK_IMPORTED_MODULE_1__index__["router"].push({ path: `/search?q=${this.search_text}` });
            }
        },
        handleScroll() {
            document.addEventListener('scroll', (e) => {
                const position = window.scrollY;
                if (position > 218) {
                    // show navbar
                    this.show_navbar = true;
                }
                else {
                    // hide navbar
                    this.show_navbar = false;
                }
            });
        }
    },
    mounted() {
        // user is doing search, and access /search page
        if (this.keyword != '') {
            this.search_text = this.keyword;
            this.search = true;
        }
        // add scroll listener
        this.handleScroll();
    }
}));


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vuex_types__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_dom__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_string_manager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_string_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_string_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_datetime__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_v2_headings_box_title_vue__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_v2_blocks_RecommendedPostBlock_vue__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_boxs_comment_vue__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_boxs_post_meta_vue__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_boxs_post_vue__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__error_index_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_loaders_index_vue__ = __webpack_require__(16);






// components







__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("app-card", resolve => __webpack_require__.e/* import() */(7).then(__webpack_require__.bind(null, 172)));
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("comment", __WEBPACK_IMPORTED_MODULE_8__components_boxs_comment_vue__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("box-post", __WEBPACK_IMPORTED_MODULE_10__components_boxs_post_vue__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("box-meta", __WEBPACK_IMPORTED_MODULE_9__components_boxs_post_meta_vue__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("error-box", __WEBPACK_IMPORTED_MODULE_11__error_index_vue__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("Loader", __WEBPACK_IMPORTED_MODULE_12__components_loaders_index_vue__["default"]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("box-title", __WEBPACK_IMPORTED_MODULE_6__components_v2_headings_box_title_vue__["default"]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("recommended-post", __WEBPACK_IMPORTED_MODULE_7__components_v2_blocks_RecommendedPostBlock_vue__["default"]);
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    name: "post-detail",
    // metaInfo: this.meta,
    data() {
        // const title_arr = this.$route.params.title.split("-")
        return {
            link: `/post/${this.$route.params.title}`,
            meta: {
                title: "Yussan Academy - Tech from Engineer Perspective",
                description: "Here we are not only focused on making tech products. But it also makes technology accessible, affordable and easy for everyone to learn."
            },
            id: 0
        };
    },
    metaInfo() {
        if (typeof this.post.detail[this.id] !== "undefined") {
            if (this.post.detail[this.id].status === 200) {
                const description = Object(__WEBPACK_IMPORTED_MODULE_4_string_manager__["truncate"])(Object(__WEBPACK_IMPORTED_MODULE_4_string_manager__["stripTags"])(this.post.detail[this.id].content), 500, "...");
                return {
                    title: Object(__WEBPACK_IMPORTED_MODULE_4_string_manager__["toCamelCase"])(this.post.detail[this.id].title),
                    meta: [
                        {
                            vmid: "description",
                            name: "description",
                            content: description
                        }
                    ]
                };
            }
            else {
                return {
                    title: "Page Not Found",
                    meta: [
                        {
                            vmid: "description",
                            name: "description",
                            content: "Are you lost, click link bellow to acccess other page"
                        }
                    ]
                };
            }
        }
        else {
            return {};
        }
    },
    created() {
        // inject primsjs
        this.injectCss("/prismjs/prismjs.css");
        this.injectScript("/prismjs/prismjs.js");
        const title_arr = this.$route.params.title.split("-");
        const id = title_arr[title_arr.length - 1];
        this.fetchPostDetail(id);
        this.fetchPostRelated(id);
    },
    methods: {
        injectCss: __WEBPACK_IMPORTED_MODULE_2__modules_dom__["injectCss"],
        injectScript: __WEBPACK_IMPORTED_MODULE_2__modules_dom__["injectScript"],
        toCamelCase: __WEBPACK_IMPORTED_MODULE_4_string_manager__["toCamelCase"],
        epochToRelative: __WEBPACK_IMPORTED_MODULE_5__modules_datetime__["epochToRelative"],
        fetchPostDetail(id) {
            this.id = id;
            this.$store.dispatch(__WEBPACK_IMPORTED_MODULE_1__vuex_types__["GET_POST"], id);
        },
        fetchPostRelated(id) {
            this.$store.dispatch(__WEBPACK_IMPORTED_MODULE_1__vuex_types__["GET_POSTS"], {
                filter: "latest_detail",
                limit: 4,
                draft: false,
                notid: id
            });
        }
    },
    // beforeRouteUpdate(to, from, next) {
    //   // request post detail
    //   const title_arr = to.params.title.split("-")
    //   const id = title_arr[title_arr.length - 1]
    //   this.fetchPostDetail(id)
    //   this.fetchPostRelated(id)
    //   this.link = `/post/${to.params.title}`
    //   next()
    // },
    watch: {
        $route() {
            const { title } = this.$route.params;
            if (title != this.title) {
                this.title = title;
                this.link = `/post/${title}`;
                // request data
                const title_arr = this.$route.params.title.split("-");
                const id = title_arr[title_arr.length - 1];
                this.fetchPostDetail(id);
                this.fetchPostRelated(id);
            }
        }
    },
    computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["mapState"])(["post"]))
}));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var props = ["text"];

exports.default = {
  props: props
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _PostVerySmallCard = __webpack_require__(85);

var _PostVerySmallCard2 = _interopRequireDefault(_PostVerySmallCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//

var props = ["data"];

_vue2.default.component("post-card", _PostVerySmallCard2.default);

exports.default = {
  props: props
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datetime = __webpack_require__(5);

var props = ["data"]; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: props,
  methods: {
    epochToRelative: function epochToRelative(epochtime) {
      return (0, _datetime.epochToRelative)(epochtime);
    }
  }
};

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_dom__ = __webpack_require__(11);


function renderDisqus(target) {
    console.log("render DISQUS :", target);
    setTimeout(() => {
        if (window.DISQUS)
            window.DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = target;
                    this.page.url = target;
                }
            });
    }, 1000);
}
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    name: "comment",
    props: {
        link: {
            type: String,
            required: true
        }
    },
    watch: {
        link(val) {
            renderDisqus(`https://yussanacademy.com${val}`);
        }
    },
    created() {
        if (!window.DISQUS)
            Object(__WEBPACK_IMPORTED_MODULE_1__modules_dom__["injectScript"])("//yussan-academy.disqus.com/embed.js", {
                cb: () => {
                    // waiting for DISQUS initialized
                    renderDisqus(`https://yussanacademy.com${this.link}`);
                }
            });
        else
            renderDisqus(`https://yussanacademy.com${this.link}`);
    }
}));


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_dom__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_datetime__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_string_manager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_string_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_string_manager__);




// render disqus count
// see: https://help.disqus.com/developer/adding-comment-count-links-to-your-home-page
function renderDisqus(target = "") {
    console.log("render DISQUSWIDGETS :", target);
    setTimeout(() => {
        const { DISQUSWIDGETS } = window;
        if (DISQUSWIDGETS)
            DISQUSWIDGETS.getCount({ reset: true });
    }, 1500);
}
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    name: "post-meta",
    props: ["data", "link"],
    methods: {
        toCamelCase(str) {
            return Object(__WEBPACK_IMPORTED_MODULE_3_string_manager__["toCamelCase"])(str);
        },
        epochToRelative(epoch) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__modules_datetime__["epochToRelative"])(epoch);
        },
        viewComments() {
            const commentEl = document.getElementById("comment");
            commentEl.scrollIntoView({ behavior: "smooth" });
        }
    },
    watch: {
        link() {
            renderDisqus(`https://yussanacademy.com${this.link}`);
        }
    },
    created() {
        if (!window.DISQUSWIDGETS) {
            Object(__WEBPACK_IMPORTED_MODULE_1__modules_dom__["injectScript"])("//yussan-academy.disqus.com/count.js", {
                id: "dsq-count-scr",
                cb: () => {
                    // waiting for DISQUS initialized
                    renderDisqus(`https://yussanacademy.com${this.link}`);
                }
            });
        }
        else {
            renderDisqus(`https://yussanacademy.com${this.link}`);
        }
    }
}));


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cards_post_vue__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loaders_index_vue__ = __webpack_require__(16);



__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("post-card", __WEBPACK_IMPORTED_MODULE_1__cards_post_vue__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("loader", __WEBPACK_IMPORTED_MODULE_2__loaders_index_vue__["default"]);
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    name: "box-post",
    props: ["data"],
}));


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__buttons_BtnVideoPlay_vue__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_datetime__ = __webpack_require__(5);



__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("BtnPlay", __WEBPACK_IMPORTED_MODULE_1__buttons_BtnVideoPlay_vue__["a" /* default */]);
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    props: ["data"],
    methods: {
        epochToRelative(epochtime) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__modules_datetime__["epochToRelative"])(epochtime);
        }
    }
}));


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    name: "button-play",
    props: ["size"]
}));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//

exports.default = {};

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internals_static_data__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_datetime__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_string_manager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_string_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_string_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__error_index_vue__ = __webpack_require__(13);




// components

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("error-box", __WEBPACK_IMPORTED_MODULE_4__error_index_vue__["a" /* default */]);
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    name: "static-detail",
    data() {
        return {
            content: Object(__WEBPACK_IMPORTED_MODULE_1__internals_static_data__["a" /* getData */])(this.$route.params.title)
        };
    },
    metaInfo() {
        if (typeof this.content !== "undefined") {
            const { title, html } = this.content;
            const description = Object(__WEBPACK_IMPORTED_MODULE_3_string_manager__["truncate"])(Object(__WEBPACK_IMPORTED_MODULE_3_string_manager__["stripTags"])(html), 500, '...');
            return {
                title: Object(__WEBPACK_IMPORTED_MODULE_3_string_manager__["toCamelCase"])(title),
                meta: [
                    {
                        vmid: 'description',
                        name: "description",
                        content: description
                    }
                ]
            };
        }
        else {
            return {
                title: "Page Not Found",
                meta: [
                    {
                        vmid: 'description',
                        name: "description",
                        content: "Are you lost, click link bellow to acccess other page"
                    }
                ]
            };
        }
    },
    methods: {
        epochToRelative(epochtime) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__modules_datetime__["epochToRelative"])(epochtime);
        },
        toCamelCase(str) {
            return Object(__WEBPACK_IMPORTED_MODULE_3_string_manager__["toCamelCase"])(str);
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.content = Object(__WEBPACK_IMPORTED_MODULE_1__internals_static_data__["a" /* getData */])(to.params.title);
        next();
    }
}));


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "[class*=grid-],[class*=grid_],[class~=grid]{box-sizing:border-box;display:flex;flex-flow:row wrap;margin:0 -.5rem}[class*=col-],[class*=col_],[class~=col]{box-sizing:border-box;padding:0 .5rem 1rem;max-width:100%}[class*=col_],[class~=col]{flex:1 1 0%}[class*=col-]{flex:none}[class*=grid-][class*=col-],[class*=grid-][class*=col_],[class*=grid-][class~=col],[class*=grid_][class*=col-],[class*=grid_][class*=col_],[class*=grid_][class~=col],[class~=grid][class*=col-],[class~=grid][class*=col_],[class~=grid][class~=col]{margin:0;padding:0}[class*=grid-][class*=-noGutter]{margin:0}[class*=grid-][class*=-noGutter]>[class*=col-],[class*=grid-][class*=-noGutter]>[class~=col]{padding:0}[class*=grid-][class*=-noWrap]{flex-wrap:nowrap}[class*=grid-][class*=-center]{justify-content:center}[class*=grid-][class*=-right]{justify-content:flex-end;align-self:flex-end;margin-left:auto}[class*=grid-][class*=-top]{align-items:flex-start}[class*=grid-][class*=-middle]{align-items:center}[class*=grid-][class*=-bottom]{align-items:flex-end}[class*=grid-][class*=-reverse]{flex-direction:row-reverse}[class*=grid-][class*=-column]{flex-direction:column}[class*=grid-][class*=-column]>[class*=col-]{flex-basis:auto}[class*=grid-][class*=-column-reverse]{flex-direction:column-reverse}[class*=grid-][class*=-spaceBetween]{justify-content:space-between}[class*=grid-][class*=-spaceAround]{justify-content:space-around}[class*=grid-][class*=-equalHeight]>[class*=col-],[class*=grid-][class*=-equalHeight]>[class*=col_],[class*=grid-][class*=-equalHeight]>[class~=col]{align-self:stretch}[class*=grid-][class*=-equalHeight]>[class*=col-]>*,[class*=grid-][class*=-equalHeight]>[class*=col_]>*,[class*=grid-][class*=-equalHeight]>[class~=col]>*{height:100%}[class*=grid-][class*=-noBottom]>[class*=col-],[class*=grid-][class*=-noBottom]>[class*=col_],[class*=grid-][class*=-noBottom]>[class~=col]{padding-bottom:0}[class*=col-][class*=-top]{align-self:flex-start}[class*=col-][class*=-middle]{align-self:center}[class*=col-][class*=-bottom]{align-self:flex-end}[class*=col-][class*=-first]{order:-1}[class*=col-][class*=-last]{order:1}[class*=grid-1]>[class*=col-],[class*=grid-1]>[class*=col_],[class*=grid-1]>[class~=col]{flex-basis:100%;max-width:100%}[class*=grid-2]>[class*=col-],[class*=grid-2]>[class*=col_],[class*=grid-2]>[class~=col]{flex-basis:50%;max-width:50%}[class*=grid-3]>[class*=col-],[class*=grid-3]>[class*=col_],[class*=grid-3]>[class~=col]{flex-basis:33.33333%;max-width:33.33333%}[class*=grid-4]>[class*=col-],[class*=grid-4]>[class*=col_],[class*=grid-4]>[class~=col]{flex-basis:25%;max-width:25%}[class*=grid-5]>[class*=col-],[class*=grid-5]>[class*=col_],[class*=grid-5]>[class~=col]{flex-basis:20%;max-width:20%}[class*=grid-6]>[class*=col-],[class*=grid-6]>[class*=col_],[class*=grid-6]>[class~=col]{flex-basis:16.66667%;max-width:16.66667%}[class*=grid-7]>[class*=col-],[class*=grid-7]>[class*=col_],[class*=grid-7]>[class~=col]{flex-basis:14.28571%;max-width:14.28571%}[class*=grid-8]>[class*=col-],[class*=grid-8]>[class*=col_],[class*=grid-8]>[class~=col]{flex-basis:12.5%;max-width:12.5%}[class*=grid-9]>[class*=col-],[class*=grid-9]>[class*=col_],[class*=grid-9]>[class~=col]{flex-basis:11.11111%;max-width:11.11111%}[class*=grid-10]>[class*=col-],[class*=grid-10]>[class*=col_],[class*=grid-10]>[class~=col]{flex-basis:10%;max-width:10%}[class*=grid-11]>[class*=col-],[class*=grid-11]>[class*=col_],[class*=grid-11]>[class~=col]{flex-basis:9.09091%;max-width:9.09091%}[class*=grid-12]>[class*=col-],[class*=grid-12]>[class*=col_],[class*=grid-12]>[class~=col]{flex-basis:8.33333%;max-width:8.33333%}@media (max-width:80em){[class*=_lg-1]>[class*=col-],[class*=_lg-1]>[class*=col_],[class*=_lg-1]>[class~=col]{flex-basis:100%;max-width:100%}[class*=_lg-2]>[class*=col-],[class*=_lg-2]>[class*=col_],[class*=_lg-2]>[class~=col]{flex-basis:50%;max-width:50%}[class*=_lg-3]>[class*=col-],[class*=_lg-3]>[class*=col_],[class*=_lg-3]>[class~=col]{flex-basis:33.33333%;max-width:33.33333%}[class*=_lg-4]>[class*=col-],[class*=_lg-4]>[class*=col_],[class*=_lg-4]>[class~=col]{flex-basis:25%;max-width:25%}[class*=_lg-5]>[class*=col-],[class*=_lg-5]>[class*=col_],[class*=_lg-5]>[class~=col]{flex-basis:20%;max-width:20%}[class*=_lg-6]>[class*=col-],[class*=_lg-6]>[class*=col_],[class*=_lg-6]>[class~=col]{flex-basis:16.66667%;max-width:16.66667%}[class*=_lg-7]>[class*=col-],[class*=_lg-7]>[class*=col_],[class*=_lg-7]>[class~=col]{flex-basis:14.28571%;max-width:14.28571%}[class*=_lg-8]>[class*=col-],[class*=_lg-8]>[class*=col_],[class*=_lg-8]>[class~=col]{flex-basis:12.5%;max-width:12.5%}[class*=_lg-9]>[class*=col-],[class*=_lg-9]>[class*=col_],[class*=_lg-9]>[class~=col]{flex-basis:11.11111%;max-width:11.11111%}[class*=_lg-10]>[class*=col-],[class*=_lg-10]>[class*=col_],[class*=_lg-10]>[class~=col]{flex-basis:10%;max-width:10%}[class*=_lg-11]>[class*=col-],[class*=_lg-11]>[class*=col_],[class*=_lg-11]>[class~=col]{flex-basis:9.09091%;max-width:9.09091%}[class*=_lg-12]>[class*=col-],[class*=_lg-12]>[class*=col_],[class*=_lg-12]>[class~=col]{flex-basis:8.33333%;max-width:8.33333%}}@media (max-width:64em){[class*=_md-1]>[class*=col-],[class*=_md-1]>[class*=col_],[class*=_md-1]>[class~=col]{flex-basis:100%;max-width:100%}[class*=_md-2]>[class*=col-],[class*=_md-2]>[class*=col_],[class*=_md-2]>[class~=col]{flex-basis:50%;max-width:50%}[class*=_md-3]>[class*=col-],[class*=_md-3]>[class*=col_],[class*=_md-3]>[class~=col]{flex-basis:33.33333%;max-width:33.33333%}[class*=_md-4]>[class*=col-],[class*=_md-4]>[class*=col_],[class*=_md-4]>[class~=col]{flex-basis:25%;max-width:25%}[class*=_md-5]>[class*=col-],[class*=_md-5]>[class*=col_],[class*=_md-5]>[class~=col]{flex-basis:20%;max-width:20%}[class*=_md-6]>[class*=col-],[class*=_md-6]>[class*=col_],[class*=_md-6]>[class~=col]{flex-basis:16.66667%;max-width:16.66667%}[class*=_md-7]>[class*=col-],[class*=_md-7]>[class*=col_],[class*=_md-7]>[class~=col]{flex-basis:14.28571%;max-width:14.28571%}[class*=_md-8]>[class*=col-],[class*=_md-8]>[class*=col_],[class*=_md-8]>[class~=col]{flex-basis:12.5%;max-width:12.5%}[class*=_md-9]>[class*=col-],[class*=_md-9]>[class*=col_],[class*=_md-9]>[class~=col]{flex-basis:11.11111%;max-width:11.11111%}[class*=_md-10]>[class*=col-],[class*=_md-10]>[class*=col_],[class*=_md-10]>[class~=col]{flex-basis:10%;max-width:10%}[class*=_md-11]>[class*=col-],[class*=_md-11]>[class*=col_],[class*=_md-11]>[class~=col]{flex-basis:9.09091%;max-width:9.09091%}[class*=_md-12]>[class*=col-],[class*=_md-12]>[class*=col_],[class*=_md-12]>[class~=col]{flex-basis:8.33333%;max-width:8.33333%}}@media (max-width:48em){[class*=_sm-1]>[class*=col-],[class*=_sm-1]>[class*=col_],[class*=_sm-1]>[class~=col]{flex-basis:100%;max-width:100%}[class*=_sm-2]>[class*=col-],[class*=_sm-2]>[class*=col_],[class*=_sm-2]>[class~=col]{flex-basis:50%;max-width:50%}[class*=_sm-3]>[class*=col-],[class*=_sm-3]>[class*=col_],[class*=_sm-3]>[class~=col]{flex-basis:33.33333%;max-width:33.33333%}[class*=_sm-4]>[class*=col-],[class*=_sm-4]>[class*=col_],[class*=_sm-4]>[class~=col]{flex-basis:25%;max-width:25%}[class*=_sm-5]>[class*=col-],[class*=_sm-5]>[class*=col_],[class*=_sm-5]>[class~=col]{flex-basis:20%;max-width:20%}[class*=_sm-6]>[class*=col-],[class*=_sm-6]>[class*=col_],[class*=_sm-6]>[class~=col]{flex-basis:16.66667%;max-width:16.66667%}[class*=_sm-7]>[class*=col-],[class*=_sm-7]>[class*=col_],[class*=_sm-7]>[class~=col]{flex-basis:14.28571%;max-width:14.28571%}[class*=_sm-8]>[class*=col-],[class*=_sm-8]>[class*=col_],[class*=_sm-8]>[class~=col]{flex-basis:12.5%;max-width:12.5%}[class*=_sm-9]>[class*=col-],[class*=_sm-9]>[class*=col_],[class*=_sm-9]>[class~=col]{flex-basis:11.11111%;max-width:11.11111%}[class*=_sm-10]>[class*=col-],[class*=_sm-10]>[class*=col_],[class*=_sm-10]>[class~=col]{flex-basis:10%;max-width:10%}[class*=_sm-11]>[class*=col-],[class*=_sm-11]>[class*=col_],[class*=_sm-11]>[class~=col]{flex-basis:9.09091%;max-width:9.09091%}[class*=_sm-12]>[class*=col-],[class*=_sm-12]>[class*=col_],[class*=_sm-12]>[class~=col]{flex-basis:8.33333%;max-width:8.33333%}}@media (max-width:36em){[class*=_xs-1]>[class*=col-],[class*=_xs-1]>[class*=col_],[class*=_xs-1]>[class~=col]{flex-basis:100%;max-width:100%}[class*=_xs-2]>[class*=col-],[class*=_xs-2]>[class*=col_],[class*=_xs-2]>[class~=col]{flex-basis:50%;max-width:50%}[class*=_xs-3]>[class*=col-],[class*=_xs-3]>[class*=col_],[class*=_xs-3]>[class~=col]{flex-basis:33.33333%;max-width:33.33333%}[class*=_xs-4]>[class*=col-],[class*=_xs-4]>[class*=col_],[class*=_xs-4]>[class~=col]{flex-basis:25%;max-width:25%}[class*=_xs-5]>[class*=col-],[class*=_xs-5]>[class*=col_],[class*=_xs-5]>[class~=col]{flex-basis:20%;max-width:20%}[class*=_xs-6]>[class*=col-],[class*=_xs-6]>[class*=col_],[class*=_xs-6]>[class~=col]{flex-basis:16.66667%;max-width:16.66667%}[class*=_xs-7]>[class*=col-],[class*=_xs-7]>[class*=col_],[class*=_xs-7]>[class~=col]{flex-basis:14.28571%;max-width:14.28571%}[class*=_xs-8]>[class*=col-],[class*=_xs-8]>[class*=col_],[class*=_xs-8]>[class~=col]{flex-basis:12.5%;max-width:12.5%}[class*=_xs-9]>[class*=col-],[class*=_xs-9]>[class*=col_],[class*=_xs-9]>[class~=col]{flex-basis:11.11111%;max-width:11.11111%}[class*=_xs-10]>[class*=col-],[class*=_xs-10]>[class*=col_],[class*=_xs-10]>[class~=col]{flex-basis:10%;max-width:10%}[class*=_xs-11]>[class*=col-],[class*=_xs-11]>[class*=col_],[class*=_xs-11]>[class~=col]{flex-basis:9.09091%;max-width:9.09091%}[class*=_xs-12]>[class*=col-],[class*=_xs-12]>[class*=col_],[class*=_xs-12]>[class~=col]{flex-basis:8.33333%;max-width:8.33333%}}[class*=grid-]>[class*=col-1],[class*=grid_]>[class*=col-1],[class~=grid]>[class*=col-1]{flex-basis:8.33333%;max-width:8.33333%}[class*=grid-]>[class*=col-2],[class*=grid_]>[class*=col-2],[class~=grid]>[class*=col-2]{flex-basis:16.66667%;max-width:16.66667%}[class*=grid-]>[class*=col-3],[class*=grid_]>[class*=col-3],[class~=grid]>[class*=col-3]{flex-basis:25%;max-width:25%}[class*=grid-]>[class*=col-4],[class*=grid_]>[class*=col-4],[class~=grid]>[class*=col-4]{flex-basis:33.33333%;max-width:33.33333%}[class*=grid-]>[class*=col-5],[class*=grid_]>[class*=col-5],[class~=grid]>[class*=col-5]{flex-basis:41.66667%;max-width:41.66667%}[class*=grid-]>[class*=col-6],[class*=grid_]>[class*=col-6],[class~=grid]>[class*=col-6]{flex-basis:50%;max-width:50%}[class*=grid-]>[class*=col-7],[class*=grid_]>[class*=col-7],[class~=grid]>[class*=col-7]{flex-basis:58.33333%;max-width:58.33333%}[class*=grid-]>[class*=col-8],[class*=grid_]>[class*=col-8],[class~=grid]>[class*=col-8]{flex-basis:66.66667%;max-width:66.66667%}[class*=grid-]>[class*=col-9],[class*=grid_]>[class*=col-9],[class~=grid]>[class*=col-9]{flex-basis:75%;max-width:75%}[class*=grid-]>[class*=col-10],[class*=grid_]>[class*=col-10],[class~=grid]>[class*=col-10]{flex-basis:83.33333%;max-width:83.33333%}[class*=grid-]>[class*=col-11],[class*=grid_]>[class*=col-11],[class~=grid]>[class*=col-11]{flex-basis:91.66667%;max-width:91.66667%}[class*=grid-]>[class*=col-12],[class*=grid_]>[class*=col-12],[class~=grid]>[class*=col-12]{flex-basis:100%;max-width:100%}[class*=grid-]>[data-push-left*=off-0],[class*=grid_]>[data-push-left*=off-0],[class~=grid]>[data-push-left*=off-0]{margin-left:0}[class*=grid-]>[data-push-left*=off-1],[class*=grid_]>[data-push-left*=off-1],[class~=grid]>[data-push-left*=off-1]{margin-left:8.33333%}[class*=grid-]>[data-push-left*=off-2],[class*=grid_]>[data-push-left*=off-2],[class~=grid]>[data-push-left*=off-2]{margin-left:16.66667%}[class*=grid-]>[data-push-left*=off-3],[class*=grid_]>[data-push-left*=off-3],[class~=grid]>[data-push-left*=off-3]{margin-left:25%}[class*=grid-]>[data-push-left*=off-4],[class*=grid_]>[data-push-left*=off-4],[class~=grid]>[data-push-left*=off-4]{margin-left:33.33333%}[class*=grid-]>[data-push-left*=off-5],[class*=grid_]>[data-push-left*=off-5],[class~=grid]>[data-push-left*=off-5]{margin-left:41.66667%}[class*=grid-]>[data-push-left*=off-6],[class*=grid_]>[data-push-left*=off-6],[class~=grid]>[data-push-left*=off-6]{margin-left:50%}[class*=grid-]>[data-push-left*=off-7],[class*=grid_]>[data-push-left*=off-7],[class~=grid]>[data-push-left*=off-7]{margin-left:58.33333%}[class*=grid-]>[data-push-left*=off-8],[class*=grid_]>[data-push-left*=off-8],[class~=grid]>[data-push-left*=off-8]{margin-left:66.66667%}[class*=grid-]>[data-push-left*=off-9],[class*=grid_]>[data-push-left*=off-9],[class~=grid]>[data-push-left*=off-9]{margin-left:75%}[class*=grid-]>[data-push-left*=off-10],[class*=grid_]>[data-push-left*=off-10],[class~=grid]>[data-push-left*=off-10]{margin-left:83.33333%}[class*=grid-]>[data-push-left*=off-11],[class*=grid_]>[data-push-left*=off-11],[class~=grid]>[data-push-left*=off-11]{margin-left:91.66667%}[class*=grid-]>[data-push-right*=off-0],[class*=grid_]>[data-push-right*=off-0],[class~=grid]>[data-push-right*=off-0]{margin-right:0}[class*=grid-]>[data-push-right*=off-1],[class*=grid_]>[data-push-right*=off-1],[class~=grid]>[data-push-right*=off-1]{margin-right:8.33333%}[class*=grid-]>[data-push-right*=off-2],[class*=grid_]>[data-push-right*=off-2],[class~=grid]>[data-push-right*=off-2]{margin-right:16.66667%}[class*=grid-]>[data-push-right*=off-3],[class*=grid_]>[data-push-right*=off-3],[class~=grid]>[data-push-right*=off-3]{margin-right:25%}[class*=grid-]>[data-push-right*=off-4],[class*=grid_]>[data-push-right*=off-4],[class~=grid]>[data-push-right*=off-4]{margin-right:33.33333%}[class*=grid-]>[data-push-right*=off-5],[class*=grid_]>[data-push-right*=off-5],[class~=grid]>[data-push-right*=off-5]{margin-right:41.66667%}[class*=grid-]>[data-push-right*=off-6],[class*=grid_]>[data-push-right*=off-6],[class~=grid]>[data-push-right*=off-6]{margin-right:50%}[class*=grid-]>[data-push-right*=off-7],[class*=grid_]>[data-push-right*=off-7],[class~=grid]>[data-push-right*=off-7]{margin-right:58.33333%}[class*=grid-]>[data-push-right*=off-8],[class*=grid_]>[data-push-right*=off-8],[class~=grid]>[data-push-right*=off-8]{margin-right:66.66667%}[class*=grid-]>[data-push-right*=off-9],[class*=grid_]>[data-push-right*=off-9],[class~=grid]>[data-push-right*=off-9]{margin-right:75%}[class*=grid-]>[data-push-right*=off-10],[class*=grid_]>[data-push-right*=off-10],[class~=grid]>[data-push-right*=off-10]{margin-right:83.33333%}[class*=grid-]>[data-push-right*=off-11],[class*=grid_]>[data-push-right*=off-11],[class~=grid]>[data-push-right*=off-11]{margin-right:91.66667%}@media (max-width:80em){[class*=grid-]>[class*=_lg-1],[class*=grid_]>[class*=_lg-1],[class~=grid]>[class*=_lg-1]{flex-basis:8.33333%;max-width:8.33333%}[class*=grid-]>[class*=_lg-2],[class*=grid_]>[class*=_lg-2],[class~=grid]>[class*=_lg-2]{flex-basis:16.66667%;max-width:16.66667%}[class*=grid-]>[class*=_lg-3],[class*=grid_]>[class*=_lg-3],[class~=grid]>[class*=_lg-3]{flex-basis:25%;max-width:25%}[class*=grid-]>[class*=_lg-4],[class*=grid_]>[class*=_lg-4],[class~=grid]>[class*=_lg-4]{flex-basis:33.33333%;max-width:33.33333%}[class*=grid-]>[class*=_lg-5],[class*=grid_]>[class*=_lg-5],[class~=grid]>[class*=_lg-5]{flex-basis:41.66667%;max-width:41.66667%}[class*=grid-]>[class*=_lg-6],[class*=grid_]>[class*=_lg-6],[class~=grid]>[class*=_lg-6]{flex-basis:50%;max-width:50%}[class*=grid-]>[class*=_lg-7],[class*=grid_]>[class*=_lg-7],[class~=grid]>[class*=_lg-7]{flex-basis:58.33333%;max-width:58.33333%}[class*=grid-]>[class*=_lg-8],[class*=grid_]>[class*=_lg-8],[class~=grid]>[class*=_lg-8]{flex-basis:66.66667%;max-width:66.66667%}[class*=grid-]>[class*=_lg-9],[class*=grid_]>[class*=_lg-9],[class~=grid]>[class*=_lg-9]{flex-basis:75%;max-width:75%}[class*=grid-]>[class*=_lg-10],[class*=grid_]>[class*=_lg-10],[class~=grid]>[class*=_lg-10]{flex-basis:83.33333%;max-width:83.33333%}[class*=grid-]>[class*=_lg-11],[class*=grid_]>[class*=_lg-11],[class~=grid]>[class*=_lg-11]{flex-basis:91.66667%;max-width:91.66667%}[class*=grid-]>[class*=_lg-12],[class*=grid_]>[class*=_lg-12],[class~=grid]>[class*=_lg-12]{flex-basis:100%;max-width:100%}[class*=grid-]>[data-push-left*=_lg-0],[class*=grid_]>[data-push-left*=_lg-0],[class~=grid]>[data-push-left*=_lg-0]{margin-left:0}[class*=grid-]>[data-push-left*=_lg-1],[class*=grid_]>[data-push-left*=_lg-1],[class~=grid]>[data-push-left*=_lg-1]{margin-left:8.33333%}[class*=grid-]>[data-push-left*=_lg-2],[class*=grid_]>[data-push-left*=_lg-2],[class~=grid]>[data-push-left*=_lg-2]{margin-left:16.66667%}[class*=grid-]>[data-push-left*=_lg-3],[class*=grid_]>[data-push-left*=_lg-3],[class~=grid]>[data-push-left*=_lg-3]{margin-left:25%}[class*=grid-]>[data-push-left*=_lg-4],[class*=grid_]>[data-push-left*=_lg-4],[class~=grid]>[data-push-left*=_lg-4]{margin-left:33.33333%}[class*=grid-]>[data-push-left*=_lg-5],[class*=grid_]>[data-push-left*=_lg-5],[class~=grid]>[data-push-left*=_lg-5]{margin-left:41.66667%}[class*=grid-]>[data-push-left*=_lg-6],[class*=grid_]>[data-push-left*=_lg-6],[class~=grid]>[data-push-left*=_lg-6]{margin-left:50%}[class*=grid-]>[data-push-left*=_lg-7],[class*=grid_]>[data-push-left*=_lg-7],[class~=grid]>[data-push-left*=_lg-7]{margin-left:58.33333%}[class*=grid-]>[data-push-left*=_lg-8],[class*=grid_]>[data-push-left*=_lg-8],[class~=grid]>[data-push-left*=_lg-8]{margin-left:66.66667%}[class*=grid-]>[data-push-left*=_lg-9],[class*=grid_]>[data-push-left*=_lg-9],[class~=grid]>[data-push-left*=_lg-9]{margin-left:75%}[class*=grid-]>[data-push-left*=_lg-10],[class*=grid_]>[data-push-left*=_lg-10],[class~=grid]>[data-push-left*=_lg-10]{margin-left:83.33333%}[class*=grid-]>[data-push-left*=_lg-11],[class*=grid_]>[data-push-left*=_lg-11],[class~=grid]>[data-push-left*=_lg-11]{margin-left:91.66667%}[class*=grid-]>[data-push-right*=_lg-0],[class*=grid_]>[data-push-right*=_lg-0],[class~=grid]>[data-push-right*=_lg-0]{margin-right:0}[class*=grid-]>[data-push-right*=_lg-1],[class*=grid_]>[data-push-right*=_lg-1],[class~=grid]>[data-push-right*=_lg-1]{margin-right:8.33333%}[class*=grid-]>[data-push-right*=_lg-2],[class*=grid_]>[data-push-right*=_lg-2],[class~=grid]>[data-push-right*=_lg-2]{margin-right:16.66667%}[class*=grid-]>[data-push-right*=_lg-3],[class*=grid_]>[data-push-right*=_lg-3],[class~=grid]>[data-push-right*=_lg-3]{margin-right:25%}[class*=grid-]>[data-push-right*=_lg-4],[class*=grid_]>[data-push-right*=_lg-4],[class~=grid]>[data-push-right*=_lg-4]{margin-right:33.33333%}[class*=grid-]>[data-push-right*=_lg-5],[class*=grid_]>[data-push-right*=_lg-5],[class~=grid]>[data-push-right*=_lg-5]{margin-right:41.66667%}[class*=grid-]>[data-push-right*=_lg-6],[class*=grid_]>[data-push-right*=_lg-6],[class~=grid]>[data-push-right*=_lg-6]{margin-right:50%}[class*=grid-]>[data-push-right*=_lg-7],[class*=grid_]>[data-push-right*=_lg-7],[class~=grid]>[data-push-right*=_lg-7]{margin-right:58.33333%}[class*=grid-]>[data-push-right*=_lg-8],[class*=grid_]>[data-push-right*=_lg-8],[class~=grid]>[data-push-right*=_lg-8]{margin-right:66.66667%}[class*=grid-]>[data-push-right*=_lg-9],[class*=grid_]>[data-push-right*=_lg-9],[class~=grid]>[data-push-right*=_lg-9]{margin-right:75%}[class*=grid-]>[data-push-right*=_lg-10],[class*=grid_]>[data-push-right*=_lg-10],[class~=grid]>[data-push-right*=_lg-10]{margin-right:83.33333%}[class*=grid-]>[data-push-right*=_lg-11],[class*=grid_]>[data-push-right*=_lg-11],[class~=grid]>[data-push-right*=_lg-11]{margin-right:91.66667%}[class*=grid-] [class*=_lg-first],[class*=grid_] [class*=_lg-first],[class~=grid] [class*=_lg-first]{order:-1}[class*=grid-] [class*=_lg-last],[class*=grid_] [class*=_lg-last],[class~=grid] [class*=_lg-last]{order:1}}@media (max-width:64em){[class*=grid-]>[class*=_md-1],[class*=grid_]>[class*=_md-1],[class~=grid]>[class*=_md-1]{flex-basis:8.33333%;max-width:8.33333%}[class*=grid-]>[class*=_md-2],[class*=grid_]>[class*=_md-2],[class~=grid]>[class*=_md-2]{flex-basis:16.66667%;max-width:16.66667%}[class*=grid-]>[class*=_md-3],[class*=grid_]>[class*=_md-3],[class~=grid]>[class*=_md-3]{flex-basis:25%;max-width:25%}[class*=grid-]>[class*=_md-4],[class*=grid_]>[class*=_md-4],[class~=grid]>[class*=_md-4]{flex-basis:33.33333%;max-width:33.33333%}[class*=grid-]>[class*=_md-5],[class*=grid_]>[class*=_md-5],[class~=grid]>[class*=_md-5]{flex-basis:41.66667%;max-width:41.66667%}[class*=grid-]>[class*=_md-6],[class*=grid_]>[class*=_md-6],[class~=grid]>[class*=_md-6]{flex-basis:50%;max-width:50%}[class*=grid-]>[class*=_md-7],[class*=grid_]>[class*=_md-7],[class~=grid]>[class*=_md-7]{flex-basis:58.33333%;max-width:58.33333%}[class*=grid-]>[class*=_md-8],[class*=grid_]>[class*=_md-8],[class~=grid]>[class*=_md-8]{flex-basis:66.66667%;max-width:66.66667%}[class*=grid-]>[class*=_md-9],[class*=grid_]>[class*=_md-9],[class~=grid]>[class*=_md-9]{flex-basis:75%;max-width:75%}[class*=grid-]>[class*=_md-10],[class*=grid_]>[class*=_md-10],[class~=grid]>[class*=_md-10]{flex-basis:83.33333%;max-width:83.33333%}[class*=grid-]>[class*=_md-11],[class*=grid_]>[class*=_md-11],[class~=grid]>[class*=_md-11]{flex-basis:91.66667%;max-width:91.66667%}[class*=grid-]>[class*=_md-12],[class*=grid_]>[class*=_md-12],[class~=grid]>[class*=_md-12]{flex-basis:100%;max-width:100%}[class*=grid-]>[data-push-left*=_md-0],[class*=grid_]>[data-push-left*=_md-0],[class~=grid]>[data-push-left*=_md-0]{margin-left:0}[class*=grid-]>[data-push-left*=_md-1],[class*=grid_]>[data-push-left*=_md-1],[class~=grid]>[data-push-left*=_md-1]{margin-left:8.33333%}[class*=grid-]>[data-push-left*=_md-2],[class*=grid_]>[data-push-left*=_md-2],[class~=grid]>[data-push-left*=_md-2]{margin-left:16.66667%}[class*=grid-]>[data-push-left*=_md-3],[class*=grid_]>[data-push-left*=_md-3],[class~=grid]>[data-push-left*=_md-3]{margin-left:25%}[class*=grid-]>[data-push-left*=_md-4],[class*=grid_]>[data-push-left*=_md-4],[class~=grid]>[data-push-left*=_md-4]{margin-left:33.33333%}[class*=grid-]>[data-push-left*=_md-5],[class*=grid_]>[data-push-left*=_md-5],[class~=grid]>[data-push-left*=_md-5]{margin-left:41.66667%}[class*=grid-]>[data-push-left*=_md-6],[class*=grid_]>[data-push-left*=_md-6],[class~=grid]>[data-push-left*=_md-6]{margin-left:50%}[class*=grid-]>[data-push-left*=_md-7],[class*=grid_]>[data-push-left*=_md-7],[class~=grid]>[data-push-left*=_md-7]{margin-left:58.33333%}[class*=grid-]>[data-push-left*=_md-8],[class*=grid_]>[data-push-left*=_md-8],[class~=grid]>[data-push-left*=_md-8]{margin-left:66.66667%}[class*=grid-]>[data-push-left*=_md-9],[class*=grid_]>[data-push-left*=_md-9],[class~=grid]>[data-push-left*=_md-9]{margin-left:75%}[class*=grid-]>[data-push-left*=_md-10],[class*=grid_]>[data-push-left*=_md-10],[class~=grid]>[data-push-left*=_md-10]{margin-left:83.33333%}[class*=grid-]>[data-push-left*=_md-11],[class*=grid_]>[data-push-left*=_md-11],[class~=grid]>[data-push-left*=_md-11]{margin-left:91.66667%}[class*=grid-]>[data-push-right*=_md-0],[class*=grid_]>[data-push-right*=_md-0],[class~=grid]>[data-push-right*=_md-0]{margin-right:0}[class*=grid-]>[data-push-right*=_md-1],[class*=grid_]>[data-push-right*=_md-1],[class~=grid]>[data-push-right*=_md-1]{margin-right:8.33333%}[class*=grid-]>[data-push-right*=_md-2],[class*=grid_]>[data-push-right*=_md-2],[class~=grid]>[data-push-right*=_md-2]{margin-right:16.66667%}[class*=grid-]>[data-push-right*=_md-3],[class*=grid_]>[data-push-right*=_md-3],[class~=grid]>[data-push-right*=_md-3]{margin-right:25%}[class*=grid-]>[data-push-right*=_md-4],[class*=grid_]>[data-push-right*=_md-4],[class~=grid]>[data-push-right*=_md-4]{margin-right:33.33333%}[class*=grid-]>[data-push-right*=_md-5],[class*=grid_]>[data-push-right*=_md-5],[class~=grid]>[data-push-right*=_md-5]{margin-right:41.66667%}[class*=grid-]>[data-push-right*=_md-6],[class*=grid_]>[data-push-right*=_md-6],[class~=grid]>[data-push-right*=_md-6]{margin-right:50%}[class*=grid-]>[data-push-right*=_md-7],[class*=grid_]>[data-push-right*=_md-7],[class~=grid]>[data-push-right*=_md-7]{margin-right:58.33333%}[class*=grid-]>[data-push-right*=_md-8],[class*=grid_]>[data-push-right*=_md-8],[class~=grid]>[data-push-right*=_md-8]{margin-right:66.66667%}[class*=grid-]>[data-push-right*=_md-9],[class*=grid_]>[data-push-right*=_md-9],[class~=grid]>[data-push-right*=_md-9]{margin-right:75%}[class*=grid-]>[data-push-right*=_md-10],[class*=grid_]>[data-push-right*=_md-10],[class~=grid]>[data-push-right*=_md-10]{margin-right:83.33333%}[class*=grid-]>[data-push-right*=_md-11],[class*=grid_]>[data-push-right*=_md-11],[class~=grid]>[data-push-right*=_md-11]{margin-right:91.66667%}[class*=grid-] [class*=_md-first],[class*=grid_] [class*=_md-first],[class~=grid] [class*=_md-first]{order:-1}[class*=grid-] [class*=_md-last],[class*=grid_] [class*=_md-last],[class~=grid] [class*=_md-last]{order:1}}@media (max-width:48em){[class*=grid-]>[class*=_sm-1],[class*=grid_]>[class*=_sm-1],[class~=grid]>[class*=_sm-1]{flex-basis:8.33333%;max-width:8.33333%}[class*=grid-]>[class*=_sm-2],[class*=grid_]>[class*=_sm-2],[class~=grid]>[class*=_sm-2]{flex-basis:16.66667%;max-width:16.66667%}[class*=grid-]>[class*=_sm-3],[class*=grid_]>[class*=_sm-3],[class~=grid]>[class*=_sm-3]{flex-basis:25%;max-width:25%}[class*=grid-]>[class*=_sm-4],[class*=grid_]>[class*=_sm-4],[class~=grid]>[class*=_sm-4]{flex-basis:33.33333%;max-width:33.33333%}[class*=grid-]>[class*=_sm-5],[class*=grid_]>[class*=_sm-5],[class~=grid]>[class*=_sm-5]{flex-basis:41.66667%;max-width:41.66667%}[class*=grid-]>[class*=_sm-6],[class*=grid_]>[class*=_sm-6],[class~=grid]>[class*=_sm-6]{flex-basis:50%;max-width:50%}[class*=grid-]>[class*=_sm-7],[class*=grid_]>[class*=_sm-7],[class~=grid]>[class*=_sm-7]{flex-basis:58.33333%;max-width:58.33333%}[class*=grid-]>[class*=_sm-8],[class*=grid_]>[class*=_sm-8],[class~=grid]>[class*=_sm-8]{flex-basis:66.66667%;max-width:66.66667%}[class*=grid-]>[class*=_sm-9],[class*=grid_]>[class*=_sm-9],[class~=grid]>[class*=_sm-9]{flex-basis:75%;max-width:75%}[class*=grid-]>[class*=_sm-10],[class*=grid_]>[class*=_sm-10],[class~=grid]>[class*=_sm-10]{flex-basis:83.33333%;max-width:83.33333%}[class*=grid-]>[class*=_sm-11],[class*=grid_]>[class*=_sm-11],[class~=grid]>[class*=_sm-11]{flex-basis:91.66667%;max-width:91.66667%}[class*=grid-]>[class*=_sm-12],[class*=grid_]>[class*=_sm-12],[class~=grid]>[class*=_sm-12]{flex-basis:100%;max-width:100%}[class*=grid-]>[data-push-left*=_sm-0],[class*=grid_]>[data-push-left*=_sm-0],[class~=grid]>[data-push-left*=_sm-0]{margin-left:0}[class*=grid-]>[data-push-left*=_sm-1],[class*=grid_]>[data-push-left*=_sm-1],[class~=grid]>[data-push-left*=_sm-1]{margin-left:8.33333%}[class*=grid-]>[data-push-left*=_sm-2],[class*=grid_]>[data-push-left*=_sm-2],[class~=grid]>[data-push-left*=_sm-2]{margin-left:16.66667%}[class*=grid-]>[data-push-left*=_sm-3],[class*=grid_]>[data-push-left*=_sm-3],[class~=grid]>[data-push-left*=_sm-3]{margin-left:25%}[class*=grid-]>[data-push-left*=_sm-4],[class*=grid_]>[data-push-left*=_sm-4],[class~=grid]>[data-push-left*=_sm-4]{margin-left:33.33333%}[class*=grid-]>[data-push-left*=_sm-5],[class*=grid_]>[data-push-left*=_sm-5],[class~=grid]>[data-push-left*=_sm-5]{margin-left:41.66667%}[class*=grid-]>[data-push-left*=_sm-6],[class*=grid_]>[data-push-left*=_sm-6],[class~=grid]>[data-push-left*=_sm-6]{margin-left:50%}[class*=grid-]>[data-push-left*=_sm-7],[class*=grid_]>[data-push-left*=_sm-7],[class~=grid]>[data-push-left*=_sm-7]{margin-left:58.33333%}[class*=grid-]>[data-push-left*=_sm-8],[class*=grid_]>[data-push-left*=_sm-8],[class~=grid]>[data-push-left*=_sm-8]{margin-left:66.66667%}[class*=grid-]>[data-push-left*=_sm-9],[class*=grid_]>[data-push-left*=_sm-9],[class~=grid]>[data-push-left*=_sm-9]{margin-left:75%}[class*=grid-]>[data-push-left*=_sm-10],[class*=grid_]>[data-push-left*=_sm-10],[class~=grid]>[data-push-left*=_sm-10]{margin-left:83.33333%}[class*=grid-]>[data-push-left*=_sm-11],[class*=grid_]>[data-push-left*=_sm-11],[class~=grid]>[data-push-left*=_sm-11]{margin-left:91.66667%}[class*=grid-]>[data-push-right*=_sm-0],[class*=grid_]>[data-push-right*=_sm-0],[class~=grid]>[data-push-right*=_sm-0]{margin-right:0}[class*=grid-]>[data-push-right*=_sm-1],[class*=grid_]>[data-push-right*=_sm-1],[class~=grid]>[data-push-right*=_sm-1]{margin-right:8.33333%}[class*=grid-]>[data-push-right*=_sm-2],[class*=grid_]>[data-push-right*=_sm-2],[class~=grid]>[data-push-right*=_sm-2]{margin-right:16.66667%}[class*=grid-]>[data-push-right*=_sm-3],[class*=grid_]>[data-push-right*=_sm-3],[class~=grid]>[data-push-right*=_sm-3]{margin-right:25%}[class*=grid-]>[data-push-right*=_sm-4],[class*=grid_]>[data-push-right*=_sm-4],[class~=grid]>[data-push-right*=_sm-4]{margin-right:33.33333%}[class*=grid-]>[data-push-right*=_sm-5],[class*=grid_]>[data-push-right*=_sm-5],[class~=grid]>[data-push-right*=_sm-5]{margin-right:41.66667%}[class*=grid-]>[data-push-right*=_sm-6],[class*=grid_]>[data-push-right*=_sm-6],[class~=grid]>[data-push-right*=_sm-6]{margin-right:50%}[class*=grid-]>[data-push-right*=_sm-7],[class*=grid_]>[data-push-right*=_sm-7],[class~=grid]>[data-push-right*=_sm-7]{margin-right:58.33333%}[class*=grid-]>[data-push-right*=_sm-8],[class*=grid_]>[data-push-right*=_sm-8],[class~=grid]>[data-push-right*=_sm-8]{margin-right:66.66667%}[class*=grid-]>[data-push-right*=_sm-9],[class*=grid_]>[data-push-right*=_sm-9],[class~=grid]>[data-push-right*=_sm-9]{margin-right:75%}[class*=grid-]>[data-push-right*=_sm-10],[class*=grid_]>[data-push-right*=_sm-10],[class~=grid]>[data-push-right*=_sm-10]{margin-right:83.33333%}[class*=grid-]>[data-push-right*=_sm-11],[class*=grid_]>[data-push-right*=_sm-11],[class~=grid]>[data-push-right*=_sm-11]{margin-right:91.66667%}[class*=grid-] [class*=_sm-first],[class*=grid_] [class*=_sm-first],[class~=grid] [class*=_sm-first]{order:-1}[class*=grid-] [class*=_sm-last],[class*=grid_] [class*=_sm-last],[class~=grid] [class*=_sm-last]{order:1}}@media (max-width:36em){[class*=grid-]>[class*=_xs-1],[class*=grid_]>[class*=_xs-1],[class~=grid]>[class*=_xs-1]{flex-basis:8.33333%;max-width:8.33333%}[class*=grid-]>[class*=_xs-2],[class*=grid_]>[class*=_xs-2],[class~=grid]>[class*=_xs-2]{flex-basis:16.66667%;max-width:16.66667%}[class*=grid-]>[class*=_xs-3],[class*=grid_]>[class*=_xs-3],[class~=grid]>[class*=_xs-3]{flex-basis:25%;max-width:25%}[class*=grid-]>[class*=_xs-4],[class*=grid_]>[class*=_xs-4],[class~=grid]>[class*=_xs-4]{flex-basis:33.33333%;max-width:33.33333%}[class*=grid-]>[class*=_xs-5],[class*=grid_]>[class*=_xs-5],[class~=grid]>[class*=_xs-5]{flex-basis:41.66667%;max-width:41.66667%}[class*=grid-]>[class*=_xs-6],[class*=grid_]>[class*=_xs-6],[class~=grid]>[class*=_xs-6]{flex-basis:50%;max-width:50%}[class*=grid-]>[class*=_xs-7],[class*=grid_]>[class*=_xs-7],[class~=grid]>[class*=_xs-7]{flex-basis:58.33333%;max-width:58.33333%}[class*=grid-]>[class*=_xs-8],[class*=grid_]>[class*=_xs-8],[class~=grid]>[class*=_xs-8]{flex-basis:66.66667%;max-width:66.66667%}[class*=grid-]>[class*=_xs-9],[class*=grid_]>[class*=_xs-9],[class~=grid]>[class*=_xs-9]{flex-basis:75%;max-width:75%}[class*=grid-]>[class*=_xs-10],[class*=grid_]>[class*=_xs-10],[class~=grid]>[class*=_xs-10]{flex-basis:83.33333%;max-width:83.33333%}[class*=grid-]>[class*=_xs-11],[class*=grid_]>[class*=_xs-11],[class~=grid]>[class*=_xs-11]{flex-basis:91.66667%;max-width:91.66667%}[class*=grid-]>[class*=_xs-12],[class*=grid_]>[class*=_xs-12],[class~=grid]>[class*=_xs-12]{flex-basis:100%;max-width:100%}[class*=grid-]>[data-push-left*=_xs-0],[class*=grid_]>[data-push-left*=_xs-0],[class~=grid]>[data-push-left*=_xs-0]{margin-left:0}[class*=grid-]>[data-push-left*=_xs-1],[class*=grid_]>[data-push-left*=_xs-1],[class~=grid]>[data-push-left*=_xs-1]{margin-left:8.33333%}[class*=grid-]>[data-push-left*=_xs-2],[class*=grid_]>[data-push-left*=_xs-2],[class~=grid]>[data-push-left*=_xs-2]{margin-left:16.66667%}[class*=grid-]>[data-push-left*=_xs-3],[class*=grid_]>[data-push-left*=_xs-3],[class~=grid]>[data-push-left*=_xs-3]{margin-left:25%}[class*=grid-]>[data-push-left*=_xs-4],[class*=grid_]>[data-push-left*=_xs-4],[class~=grid]>[data-push-left*=_xs-4]{margin-left:33.33333%}[class*=grid-]>[data-push-left*=_xs-5],[class*=grid_]>[data-push-left*=_xs-5],[class~=grid]>[data-push-left*=_xs-5]{margin-left:41.66667%}[class*=grid-]>[data-push-left*=_xs-6],[class*=grid_]>[data-push-left*=_xs-6],[class~=grid]>[data-push-left*=_xs-6]{margin-left:50%}[class*=grid-]>[data-push-left*=_xs-7],[class*=grid_]>[data-push-left*=_xs-7],[class~=grid]>[data-push-left*=_xs-7]{margin-left:58.33333%}[class*=grid-]>[data-push-left*=_xs-8],[class*=grid_]>[data-push-left*=_xs-8],[class~=grid]>[data-push-left*=_xs-8]{margin-left:66.66667%}[class*=grid-]>[data-push-left*=_xs-9],[class*=grid_]>[data-push-left*=_xs-9],[class~=grid]>[data-push-left*=_xs-9]{margin-left:75%}[class*=grid-]>[data-push-left*=_xs-10],[class*=grid_]>[data-push-left*=_xs-10],[class~=grid]>[data-push-left*=_xs-10]{margin-left:83.33333%}[class*=grid-]>[data-push-left*=_xs-11],[class*=grid_]>[data-push-left*=_xs-11],[class~=grid]>[data-push-left*=_xs-11]{margin-left:91.66667%}[class*=grid-]>[data-push-right*=_xs-0],[class*=grid_]>[data-push-right*=_xs-0],[class~=grid]>[data-push-right*=_xs-0]{margin-right:0}[class*=grid-]>[data-push-right*=_xs-1],[class*=grid_]>[data-push-right*=_xs-1],[class~=grid]>[data-push-right*=_xs-1]{margin-right:8.33333%}[class*=grid-]>[data-push-right*=_xs-2],[class*=grid_]>[data-push-right*=_xs-2],[class~=grid]>[data-push-right*=_xs-2]{margin-right:16.66667%}[class*=grid-]>[data-push-right*=_xs-3],[class*=grid_]>[data-push-right*=_xs-3],[class~=grid]>[data-push-right*=_xs-3]{margin-right:25%}[class*=grid-]>[data-push-right*=_xs-4],[class*=grid_]>[data-push-right*=_xs-4],[class~=grid]>[data-push-right*=_xs-4]{margin-right:33.33333%}[class*=grid-]>[data-push-right*=_xs-5],[class*=grid_]>[data-push-right*=_xs-5],[class~=grid]>[data-push-right*=_xs-5]{margin-right:41.66667%}[class*=grid-]>[data-push-right*=_xs-6],[class*=grid_]>[data-push-right*=_xs-6],[class~=grid]>[data-push-right*=_xs-6]{margin-right:50%}[class*=grid-]>[data-push-right*=_xs-7],[class*=grid_]>[data-push-right*=_xs-7],[class~=grid]>[data-push-right*=_xs-7]{margin-right:58.33333%}[class*=grid-]>[data-push-right*=_xs-8],[class*=grid_]>[data-push-right*=_xs-8],[class~=grid]>[data-push-right*=_xs-8]{margin-right:66.66667%}[class*=grid-]>[data-push-right*=_xs-9],[class*=grid_]>[data-push-right*=_xs-9],[class~=grid]>[data-push-right*=_xs-9]{margin-right:75%}[class*=grid-]>[data-push-right*=_xs-10],[class*=grid_]>[data-push-right*=_xs-10],[class~=grid]>[data-push-right*=_xs-10]{margin-right:83.33333%}[class*=grid-]>[data-push-right*=_xs-11],[class*=grid_]>[data-push-right*=_xs-11],[class~=grid]>[data-push-right*=_xs-11]{margin-right:91.66667%}[class*=grid-] [class*=_xs-first],[class*=grid_] [class*=_xs-first],[class~=grid] [class*=_xs-first]{order:-1}[class*=grid-] [class*=_xs-last],[class*=grid_] [class*=_xs-last],[class~=grid] [class*=_xs-last]{order:1}}@media (max-width:80em){[class*=lg-hidden]{display:none}}@media (max-width:64em){[class*=md-hidden]{display:none}}@media (max-width:48em){[class*=sm-hidden]{display:none}}@media (max-width:36em){[class*=xs-hidden]{display:none}}", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".icono-areaChart,.icono-barChart,.icono-book,.icono-book:after,.icono-book:before,.icono-bookmarkEmpty,.icono-bookmarkEmpty:before,.icono-camera,.icono-chain:after,.icono-chain:before,.icono-clock,.icono-commentEmpty,.icono-creditCard,.icono-crop,.icono-crop:before,.icono-display,.icono-document,.icono-eye,.icono-file,.icono-flag:after,.icono-flag:before,.icono-folder,.icono-forbidden,.icono-frown,.icono-frown:after,.icono-headphone,.icono-heart,.icono-heart:after,.icono-heart:before,.icono-home,.icono-home:after,.icono-home:before,.icono-imac,.icono-imacBold,.icono-image,.icono-infinity:after,.icono-infinity:before,.icono-iphone,.icono-iphoneBold,.icono-keyboard,.icono-macbook:before,.icono-macbookBold:before,.icono-mail,.icono-mail:before,.icono-market,.icono-market:after,.icono-meh,.icono-meh:after,.icono-microphone,.icono-microphone:before,.icono-mouse,.icono-mouse:before,.icono-nexus,.icono-paperClip,.icono-paperClip:after,.icono-paperClip:before,.icono-piano,.icono-pin,.icono-pin:before,.icono-power,.icono-rename,.icono-ruler,.icono-search,.icono-signIn,.icono-signIn:before,.icono-signOut,.icono-signOut:before,.icono-smile,.icono-smile:after,.icono-stroke,.icono-sync,.icono-tag,.icono-tag:after,.icono-terminal,.icono-trash,.icono-user,.icono-user:before,.icono-video,.icono-volumeHigh:after,.icono-volumeHigh:before,.icono-volumeLow:before,.icono-volumeMedium:before,.icono-youtube,.icono-youtube:before,[class*=icono-][class*=Circle],[class*=icono-][class*=Square],[class*=icono-check][class*=Circle]{border:2px solid}.icono-chain:after,.icono-chain:before,.icono-downArrow:before,.icono-dropper:before,.icono-flickr:after,.icono-flickr:before,.icono-indent:before,.icono-leftArrow:before,.icono-list:before,.icono-outdent:before,.icono-paperClip:before,.icono-rename:before,.icono-rightArrow:before,.icono-upArrow:before,.icono-video:before,.icono-volumeDecrease:after,.icono-volumeDecrease:before,.icono-volumeHigh:after,.icono-volumeHigh:before,.icono-volumeIncrease:after,.icono-volumeIncrease:before,.icono-volumeLow:before,.icono-volumeMedium:before,.icono-volumeMute:after,.icono-volumeMute:before,.stickCenterV{position:absolute;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%)}.icono-cup:after,.icono-display:after,.icono-display:before,.icono-imac:after,.icono-imacBold:after,.icono-imacBold:before,.icono-iphone:after,.icono-iphone:before,.icono-macbook:before,.icono-macbookBold:before,.icono-market:after,.icono-microphone:after,.icono-microphone:before,.icono-mouse:after,.icono-mouse:before,.icono-search:before,.icono-sitemap:after,.icono-sitemap:before,.icono-tag:after,.icono-trash:before,.icono-user:before,.stickCenterH,[class*=icono-exclamation]:after,[class*=icono-textAlign].icono-textAlignCenter:after,[class*=icono-textAlign].icono-textAlignCenter:before{position:absolute;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%)}.icono-camera:before,.icono-clock:after,.icono-clock:before,.icono-document:after,.icono-eye:before,.icono-forbidden:before,.icono-gear:before,.icono-gplus:after,.icono-instagram:before,.icono-keyboard:before,.icono-pin:before,.icono-video:after,.icono-youtube:after,.stickCenter,[class*=icono-check]:before,[class*=icono-cross]:after,[class*=icono-cross]:before,[class*=icono-plus]:after,[class*=icono-plus]:before{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.spin[class*=spin]{-webkit-animation:loading-spinner 2s infinite linear;animation:loading-spinner 2s infinite linear}@-webkit-keyframes loading-spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes loading-spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.icono-icono{width:13px;height:4px;box-shadow:inset 0 0 0 32px,0 16px,17px -18px;-webkit-transform:skew(0,30deg);-ms-transform:skew(0,30deg);transform:skew(0,30deg);margin:11px 19px 19px 2px}.icono-icono:before{position:absolute;width:13px;height:4px;box-shadow:inset 0 0 0 32px,0 16px,-17px -17px;right:-17px;top:-10px;-webkit-transform:skew(0,-48deg);-ms-transform:skew(0,-48deg);transform:skew(0,-48deg)}.icono-icono:after{position:absolute;width:22px;height:15px;left:0;top:-5px;border:4px solid;border-top-color:transparent;border-bottom:none;-webkit-transform:skew(0,-30deg) scaleY(0.6);-ms-transform:skew(0,-30deg) scaleY(0.6);transform:skew(0,-30deg) scaleY(0.6)}.icono-home{width:22px;height:16px;border-top:none;margin:15px 6px 3px}.icono-home:before{width:18px;height:18px;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);position:absolute;left:-2px;top:-7px;border-right-color:transparent;border-bottom-color:transparent}.icono-home:after{width:6px;height:10px;bottom:0;position:absolute;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);border-width:1px;border-bottom:none}.icono-mail{width:28px;height:18px;overflow:hidden;margin:8px 3px}.icono-mail:before{position:absolute;width:24.62px;height:24.62px;-webkit-transform:rotate(50deg) skew(-10deg,-20deg);-ms-transform:rotate(50deg) skew(-10deg,-20deg);transform:rotate(50deg) skew(-10deg,-20deg);top:-20px;left:-3px}.icono-rss{width:22px;height:22px;overflow:hidden;margin:6px}.icono-rss:after,.icono-rss:before{position:absolute;border-radius:50%}.icono-rss:before{width:6px;height:6px;box-shadow:0 0 32px inset;left:0;bottom:0}.icono-rss:after{width:27px;height:27px;right:15%;top:15%;border:4px solid transparent;box-shadow:inset 0 0 0 2px,0 0 0 2px}.icono-bars,.icono-hamburger{width:20px;height:2px;box-shadow:inset 0 0 0 32px,0 -6px,0 6px;margin:16px 7px}[class*=icono-cross],[class*=icono-plus]{width:30px;height:30px;margin:2px}[class*=icono-check]:before,[class*=icono-cross]:after,[class*=icono-cross]:before,[class*=icono-plus]:after,[class*=icono-plus]:before{box-shadow:inset 0 0 0 32px}[class*=icono-check]:before,[class*=icono-cross]:before,[class*=icono-plus]:before{width:20px;height:2px}[class*=icono-cross]:after,[class*=icono-plus]:after{height:20px;width:2px}[class*=icono-cross][class*=Circle]:before,[class*=icono-plus][class*=Circle]:before{width:18px}[class*=icono-cross][class*=Circle]:after,[class*=icono-plus][class*=Circle]:after{height:18px}.icono-cross,.icono-crossCircle{-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}[class*=icono-check]{width:28px;height:28px;margin:3px 0 3px 6px;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg)}[class*=icono-check]:after,[class*=icono-check]:before{box-shadow:inset 0 0 0 32px}[class*=icono-check]:after{position:absolute;height:12px;width:2px;left:4px;bottom:14px}[class*=icono-check][class*=Circle]{border-radius:50%;width:30px;height:30px;margin:2px}[class*=icono-check][class*=Circle]:before{width:14px;top:15px;left:14px}[class*=icono-check][class*=Circle]:after{height:8px;left:7px;bottom:10px}.icono-power{width:22px;height:22px;border-radius:50%;border-top-color:transparent;margin:6px}.icono-power:before{position:absolute;top:-15%;left:8px;width:2px;height:60%;box-shadow:inset 0 0 0 32px}.icono-heart{width:20px;height:20px;border-top-color:transparent;border-left-color:transparent;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);border-radius:4px 0;margin:9px 7px 5px}.icono-heart:after,.icono-heart:before{position:absolute}.icono-heart:before{width:8px;height:14px;left:-10px;bottom:-2px;border-radius:20px 0 0 20px;border-right-color:transparent}.icono-heart:after{width:14px;height:8px;right:-2px;top:-10px;border-radius:20px 20px 0 0;border-bottom-color:transparent}.icono-infinity{width:32px;height:16px;margin:9px 1px}.icono-infinity:after,.icono-infinity:before{width:10px;height:10px;position:absolute;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.icono-infinity:before{left:0;border-radius:32px 0 32px 32px}.icono-infinity:after{right:1px;border-radius:32px 32px 32px 0}.icono-flag{width:22px;height:25px;border-left:3px solid;margin:5px 6px 4px}.icono-flag:after,.icono-flag:before{position:absolute;width:9px;height:8px}.icono-flag:before{left:-2px;top:1px;border-radius:0 2px 0 0;border-right-width:3px}.icono-flag:after{width:5px;left:9px;top:4px;border-left-width:3px;border-radius:2px 2px 0}.icono-file{width:26px;height:32px;border-radius:0 12px 0 0;margin:1px 4px}.icono-file:before{position:absolute;top:-2px;right:-2px;border-style:solid;width:0;height:0;border-width:5px;border-top-color:transparent;border-right-color:transparent}.icono-document{width:26px;height:32px;border-radius:0 0 0 10px;margin:1px 4px}.icono-document:before{position:absolute;width:0;height:0;left:-3px;bottom:-3px;border-width:5px;border-style:solid;border-bottom-color:transparent;border-left-color:transparent}.icono-document:after{width:13px;height:2px;box-shadow:inset 0 0 0 32px,0 -5px 0 0,0 5px 0 0}.icono-folder{width:18px;height:22px;border-left-width:0;border-radius:0 3px 3px 0;margin:8px 2px 4px 14px}.icono-folder:before{position:absolute;width:12px;height:20px;left:-12px;bottom:-2px;border-width:0 0 2px 2px;border-style:solid;border-radius:0 0 0 3px}.icono-folder:after{position:absolute;width:10px;height:5px;left:-12px;top:-7px;border-width:2px 2px 0;border-style:solid;border-radius:3px 3px 0 0}.icono-pin{width:26px;height:26px;border-radius:50% 50% 50% 0;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);margin:1px 4px 7px}.icono-pin:before{position:absolute;width:6px;height:6px;border-radius:50%}.icono-frown,.icono-meh,.icono-smile{border-radius:50%;height:30px;width:30px;margin:2px}.icono-frown:before,.icono-meh:before,.icono-smile:before{border-radius:50%;box-shadow:8px 0 0 0,0 0 0 2px inset;height:4px;width:4px;left:7px;position:absolute;top:27%}.icono-frown:after,.icono-meh:after,.icono-smile:after{border-radius:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);border-top-color:transparent;border-left-color:transparent;border-right-color:transparent;height:16px;left:50%;position:absolute;top:6%;width:16px}.icono-eye{border-radius:80% 20%;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);border-width:2px 1px 1px 2px;height:28px;width:28px;margin:3px}.icono-eye:before{border-radius:50%;box-shadow:0 -3px 0 3px inset;height:11px;width:11px}.icono-sliders{height:30px;width:30px;margin:2px}.icono-sliders:after,.icono-sliders:before{-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);left:50%;position:absolute}.icono-sliders:before{width:8px;height:7px;border-radius:2px;top:67%;box-shadow:inset 0 0 0 32px,10px -10px,-10px -14px}.icono-sliders:after{position:absolute;width:2px;height:100%;box-shadow:inset 0 0 0 32px,10px 0,-10px 0}.icono-share{height:9px;width:9px;border-radius:50%;box-shadow:inset 0 0 0 32px,22px -11px 0 0,22px 11px 0 0;margin:12px 24px 13px 1px}.icono-share:after,.icono-share:before{position:absolute;width:24px;height:2px;box-shadow:inset 0 0 0 32px;left:0}.icono-share:before{top:-2px;-webkit-transform:rotate(-25deg);-ms-transform:rotate(-25deg);transform:rotate(-25deg)}.icono-share:after{top:9px;-webkit-transform:rotate(25deg);-ms-transform:rotate(25deg);transform:rotate(25deg)}.icono-sync{width:26px;height:26px;border-radius:50%;border-right-color:transparent;border-left-color:transparent;margin:4px}.icono-sync:after,.icono-sync:before{position:absolute;width:0;height:0;border-width:6px;border-style:solid;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.icono-sync:before{-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);right:-7px;top:0}.icono-sync:after{-webkit-transform:rotate(135deg);-ms-transform:rotate(135deg);transform:rotate(135deg);left:-7px;bottom:0}.icono-reset{width:26px;height:26px;border-radius:50%;border-width:2px;border-style:solid;border-left-color:transparent;margin:4px}.icono-reset:before{position:absolute;width:0;height:0;left:-7px;bottom:0;border-width:6px;border-style:solid;border-right-color:transparent;border-left-color:transparent;border-bottom-color:transparent;-webkit-transform:rotate(135deg);-ms-transform:rotate(135deg);transform:rotate(135deg)}.icono-gear{width:32px;height:32px;border:3px dotted;border-radius:50%;margin:1px}.icono-gear:before{width:22px;height:22px;box-shadow:0 0 0 3px,0 0 0 2px inset;border-radius:50%;border:6px solid transparent;box-sizing:border-box}.icono-signIn{width:18px;height:32px;border-left:none;border-radius:0 3px 3px 0;margin:1px 8px}.icono-signIn:before{position:absolute;width:11px;height:11px;left:-10px;top:7px;border-bottom:none;border-left:none;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);border-radius:0 4px 0 0}.icono-signOut{width:18px;height:32px;border-right:none;border-radius:3px 0 0 3px;margin:1px 8px}.icono-signOut:before{position:absolute;width:11px;height:11px;right:-2px;top:7px;border-bottom:none;border-left:none;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);border-radius:0 4px 0 0}.icono-support{width:26px;height:26px;border:5px solid transparent;box-shadow:0 0 0 2px inset,0 0 0 2px;border-radius:50%;margin:4px}.icono-support:before{position:absolute;width:7px;height:7px;top:-3px;left:-3px;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);box-shadow:inset 0 0 0 32px,21px 0 0 0}.icono-support:after{position:absolute;width:7px;height:7px;top:-3px;right:-3px;-webkit-transform:rotate(135deg);-ms-transform:rotate(135deg);transform:rotate(135deg);box-shadow:inset 0 0 0 32px,21px 0 0 0}.icono-dropper{width:40px;height:14px;border-width:3px;border-style:solid;border-right:none;border-top-color:transparent;border-bottom-color:transparent;border-left-color:transparent;box-shadow:-9px 0 0 2px inset,0 0 0 2px inset;border-radius:50% 6px 6px 50%;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);margin:12px -2px 8px -4px}.icono-dropper:before{width:4px;height:14px;right:10px;box-shadow:inset 0 0 0 32px}.icono-tiles{width:4px;height:4px;box-shadow:0 -8px 0,-8px -8px 0,8px -8px 0,0 0 0 32px inset,-8px 0 0,8px 0 0,0 8px 0,-8px 8px 0,8px 8px 0;margin:15px}.icono-list{width:4px;height:4px;box-shadow:inset 0 0 0 32px,0 -8px 0 0,0 8px 0 0;margin:15px 26px 15px 4px}.icono-list:before{width:18px;height:4px;left:8px;box-shadow:inset 0 0 0 32px,0 -8px 0 0,0 8px 0 0}.icono-chain{width:16px;height:2px;box-shadow:inset 0 0 0 32px;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);margin:16px 9px}.icono-chain:after,.icono-chain:before{width:12px;height:8px;border-radius:4px}.icono-chain:before{right:-10px}.icono-chain:after{left:-10px}.icono-youtube{border-right-color:transparent;border-left-color:transparent;border-radius:10px;width:32px;height:22.29px;margin:6px 1px}.icono-youtube:before{position:absolute;top:0;right:0;bottom:0;left:0;border-top-color:transparent;border-bottom-color:transparent;border-radius:6px/3px}.icono-youtube:after{width:0;height:0;border-width:4px 0 4px 8px;border-style:solid;border-top-color:transparent;border-bottom-color:transparent}.icono-rename{width:26px;height:10px;border-color:transparent;border-width:3px;box-shadow:0 0 0 1px,11px 0 0 0 inset;margin:12px 4px}.icono-rename:before{width:1px;height:18px;left:9px;border-width:2px 4px;border-style:solid;border-right-color:transparent;border-left-color:transparent;box-shadow:0 0 0 1px inset}.icono-search{width:22px;height:22px;border-radius:50%;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);margin:4px 4px 8px 8px}.icono-search:before{width:4px;height:11px;box-shadow:inset 0 0 0 32px;top:19px;border-radius:0 0 1px 1px}.icono-book{width:26px;height:22px;border-radius:0 0 0 6px;border-top:none;margin:10px 4px 2px}.icono-book:before{position:absolute;width:24px;height:7px;box-sizing:border-box;border-top:none;border-right:none;left:-2px;top:-5px;border-radius:0 0 0 6px}.icono-book:after{position:absolute;width:24px;height:8px;box-sizing:border-box;left:-2px;top:-8px;border-bottom:none;border-radius:6px 0 0}.icono-forbidden{width:28px;height:28px;border-width:3px;border-radius:50%;margin:3px;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.icono-forbidden:before{width:24px;height:4px;box-shadow:inset 0 0 0 32px}.icono-trash{width:22px;height:22px;border-radius:0 0 3px 3px;border-top:none;margin:9px 6px 3px}.icono-trash:before{width:8px;height:2px;top:-6px;box-shadow:inset 0 0 0 32px,-10px 2px 0 0,-6px 2px 0 0,0 2px 0 0,6px 2px 0 0,10px 2px 0 0}.icono-keyboard{width:32px;height:22px;border-radius:3px;margin:6px 1px}.icono-keyboard:before{width:2px;height:2px;box-shadow:-2px -4px 0,-6px -4px 0,-10px -4px 0,2px -4px 0,6px -4px 0,8px -4px 0,10px -4px 0,-4px 0 0,-8px 0 0,-10px 0 0,inset 0 0 0 32px,4px 0 0,8px 0 0,10px 0 0,4px 4px 0,2px 4px 0,0 4px 0,-2px 4px 0,-6px 4px 0,-10px 4px 0,6px 4px 0,10px 4px 0}.icono-mouse{width:23px;height:32px;border-radius:11px 11px 12px 12px;margin:1px 5px 1px 6px}.icono-mouse:before{width:1px;height:6px;border-radius:2px;border-color:transparent;border-width:1px;top:5px;box-shadow:0 0 0 1px,0 0 0 2px inset}.icono-mouse:after{width:1px;height:4px;top:0;box-shadow:inset 0 0 0 32px,0 13px 0 0}.icono-user{width:32px;height:14px;border-radius:64px 64px 0 0/64px;margin:18px 1px 2px}.icono-user:before{width:12px;height:12px;top:-20px;border-radius:50%}.icono-crop{width:21px;height:21px;border-left:none;border-bottom:none;margin:9px 9px 4px 4px}.icono-crop:before{position:absolute;width:21px;height:21px;top:-7px;right:-7px;border-top:none;border-right:none;box-sizing:border-box}.icono-crop:after{position:absolute;width:27px;height:1px;left:2px;top:3px;box-shadow:inset 0 0 0 32px;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg)}.icono-display{width:26px;height:22px;margin:4px 4px 8px}.icono-display:before{width:4px;height:3px;bottom:-5px;box-shadow:inset 0 0 0 32px}.icono-display:after{width:14px;height:2px;bottom:-6px;box-shadow:inset 0 0 0 32px}.icono-imac{width:28px;height:24px;border-width:2px 2px 6px;border-color:transparent;border-radius:3px;box-shadow:0 0 0 1px,0 0 0 1px inset;margin:3px 3px 7px}.icono-imac:before{position:absolute;height:4px;right:-3px;left:-3px;bottom:-6px;box-shadow:inset 0 0 0 32px;border-radius:0 0 3px 3px}.icono-imac:after{width:9px;height:7px;box-shadow:inset 0 0 0 32px;bottom:-12px;border-radius:32px 32px 0 0/64px}.icono-imacBold{width:28px;height:22px;border-radius:4px;margin:4px 3px 8px}.icono-imacBold:before{width:9px;height:7px;box-shadow:inset 0 0 0 32px;bottom:-6px;border-radius:32px 32px 0 0/64px}.icono-imacBold:after{width:24px;height:3px;box-shadow:inset 0 0 0 32px;bottom:0}.icono-iphone{width:19px;height:31px;border-radius:3px;border-width:5px 1px;border-color:transparent;box-shadow:0 0 0 1px,0 0 0 1px inset;margin:2px 8px 1px 7px}.icono-iphone:after,.icono-iphone:before{box-shadow:inset 0 0 0 32px}.icono-iphone:before{width:3px;height:1px;top:-3px}.icono-iphone:after{width:3px;height:3px;bottom:-4px;border-radius:50%}.icono-iphoneBold{width:20px;height:32px;margin:1px 7px;border-radius:4px;border-width:5px 2px}.icono-macbook{width:32px;height:2px;box-shadow:inset 0 0 0 32px;border-radius:0 0 32px 32px/3px;margin:25px 1px 7px}.icono-macbook:before{width:20px;height:14px;bottom:2px;border-width:3px 1px 1px;border-color:transparent;border-radius:3px 3px 0 0;box-shadow:0 0 0 1px,0 0 0 1px inset}.icono-macbookBold{width:32px;height:2px;box-shadow:inset 0 0 0 32px;margin:25px 1px 7px}.icono-macbookBold:before{width:20px;height:14px;bottom:2px;border-width:3px 2px 1px;border-radius:3px 3px 0 0}.icono-image{width:30px;height:26px;border-radius:3px;overflow:hidden;margin:4px 2px}.icono-image:before{position:absolute;width:20px;height:20px;left:-2px;top:14px;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);box-shadow:inset 0 0 0 32px,10px -6px 0 0}.icono-image:after{position:absolute;width:4px;height:4px;border-radius:50%;box-shadow:inset 0 0 0 32px;top:5px;right:5px}.icono-headphone{width:30px;height:27px;border-bottom-color:transparent;border-radius:32px/32px 32px 16px 16px;margin:2px 2px 5px}.icono-headphone:before{position:absolute;width:4px;height:12px;left:1px;bottom:-4px;border-radius:5px;box-shadow:inset 0 0 0 32px,20px 0 0 0}.icono-music{width:18px;height:6px;-webkit-transform:skewY(-15deg);-ms-transform:skewY(-15deg);transform:skewY(-15deg);box-shadow:inset 0 0 0 32px;border-radius:2px 2px 0 0;margin:4px 5px 24px 11px}.icono-music:before{position:absolute;width:2px;height:16px;left:0;top:4px;box-shadow:inset 0 0 0 32px,16px 0 0 0}.icono-music:after{position:absolute;width:10px;height:8px;left:-8px;top:17px;border-radius:50%;box-shadow:inset 0 0 0 32px,16px 0 0 0}.icono-video{width:20px;height:20px;margin:7px}.icono-video:before{width:3px;height:3px;left:-8px;box-shadow:inset 0 0 0 32px,0 -8px 0 0,0 8px 0 0,29px 0 0 0,29px -8px 0 0,29px 8px 0 0}.icono-video:after{width:0;height:0;border-width:4px 0 4px 6px;border-style:solid;border-top-color:transparent;border-bottom-color:transparent}.icono-nexus{width:21px;height:32px;border-width:3px 1px;border-radius:16px/3px;margin:1px 7px 1px 6px}.icono-microphone{width:22px;height:15px;border-width:0 2px 2px;border-radius:20px/0 0 20px 20px;margin:12px 6px 7px}.icono-microphone:before{width:10px;height:18px;top:-11px;border-radius:20px}.icono-microphone:after{width:2px;height:2px;bottom:-4px;box-shadow:inset 0 0 0 32px,0 2px,0 4px,-2px 4px,-4px 4px,-6px 4px,2px 4px,4px 4px,6px 4px}.icono-asterisk,.icono-asterisk:after,.icono-asterisk:before{width:4px;height:20px;box-shadow:inset 0 0 0 32px;border-radius:1px;margin:7px 15px}.icono-asterisk:after,.icono-asterisk:before{position:absolute;margin:0;left:0;top:0}.icono-asterisk:before{-webkit-transform:rotate(-58deg);-ms-transform:rotate(-58deg);transform:rotate(-58deg)}.icono-asterisk:after{-webkit-transform:rotate(58deg);-ms-transform:rotate(58deg);transform:rotate(58deg)}.icono-terminal{width:28px;height:24px;margin:5px 3px}.icono-terminal:before{width:5px;height:5px;position:absolute;top:50%;-webkit-transform:translateY(-50%) rotate(45deg);-ms-transform:translateY(-50%) rotate(45deg);transform:translateY(-50%) rotate(45deg);left:3px;border-width:2px 2px 0 0;border-style:solid}.icono-terminal:after{position:absolute;width:5px;height:0;border-bottom:2px solid;right:6px;bottom:4px}.icono-paperClip{width:24px;height:18px;border-left:none;border-radius:0 16px 16px 0;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);margin:5px 0 11px 10px}.icono-paperClip:before{width:18px;height:6px;right:2px;border-radius:0 16px 16px 0;border-left:none}.icono-paperClip:after{position:absolute;width:12px;height:10px;left:-12px;top:-2px;border-right:none;border-radius:16px 0 0 16px}.icono-market{width:32px;height:12px;border-top:none;margin:19px 1px 3px}.icono-market:before{width:6px;height:13px;position:absolute;top:-15px;left:-5px;border-radius:0 0 10px 10px;border-left:none;box-shadow:inset 0 0 0 32px,8px 0 0,16px 0 0,24px 0 0,32px 0 0}.icono-market:after{width:6px;height:6px;bottom:-2px}.icono-clock{width:26px;height:26px;border-radius:50%;margin:4px}.icono-clock:after,.icono-clock:before{top:35%;box-shadow:inset 0 0 0 32px;border-radius:2px}.icono-clock:before{width:2px;height:9px}.icono-clock:after{width:6px;height:2px;-webkit-transform-origin:left center;-ms-transform-origin:left center;transform-origin:left center;-webkit-transform:rotate(45deg) translate(1px,2px);-ms-transform:rotate(45deg) translate(1px,2px);transform:rotate(45deg) translate(1px,2px)}[class*=icono-textAlign]{width:28px;height:22px;margin:6px 3px}[class*=icono-textAlign]:after,[class*=icono-textAlign]:before{position:absolute;height:2px;box-shadow:inset 0 0 0 32px,0 8px 0 0,0 16px 0 0;right:0}[class*=icono-textAlign]:before{width:28px;top:0}[class*=icono-textAlign]:after{width:18px;top:4px}[class*=icono-textAlign].icono-textAlignLeft:after,[class*=icono-textAlign].icono-textAlignLeft:before{left:0}[class*=icono-exclamation]{overflow:visible;width:30px;border-bottom:2px solid;border-radius:0 0 4px 4px;margin:26px 2px 6px}[class*=icono-exclamation]:before{position:absolute;width:26px;height:26px;left:1px;top:-14px;border-width:2px 0 0 2px;border-style:solid;border-radius:4px 0;-webkit-transform:rotate(45deg) skew(12deg,12deg);-ms-transform:rotate(45deg) skew(12deg,12deg);transform:rotate(45deg) skew(12deg,12deg)}[class*=icono-exclamation]:after{width:4px;height:3px;top:-14px;box-shadow:inset 0 0 0 32px,0 3px,0 8px}[class*=icono-exclamation][class*=Circle]{margin:2px}[class*=icono-exclamation][class*=Circle]:before{display:none}[class*=icono-exclamation][class*=Circle]:after{box-shadow:inset 0 0 0 32px,0 3px,0 5px,0 10px;top:6px}.icono-frown:after{-webkit-transform:translateX(-50%) rotate(180deg);-ms-transform:translateX(-50%) rotate(180deg);transform:translateX(-50%) rotate(180deg);-webkit-transform-origin:center 85%;-ms-transform-origin:center 85%;transform-origin:center 85%}.icono-meh:after{top:0;width:12px;border-left-width:0;border-right-width:0;border-radius:0}.icono-indent,.icono-outdent{width:20px;height:16px;border-width:4px 0 4px 8px;border-style:solid;border-color:transparent;box-shadow:0 -2px,0 2px,inset 0 2px,inset 0 -2px;margin:9px 7px}.icono-indent:before,.icono-outdent:before{left:-8px;border:5px solid;border-top-color:transparent;border-bottom-color:transparent;border-right-width:0}.icono-outdent:before{border-left-width:0;border-right-width:5px}.icono-locationArrow{width:32px;height:32px;margin:1px}.icono-locationArrow:before{position:absolute;left:7px;top:16px;border-width:6px 0 6px 6px;border-style:solid;border-left-color:transparent;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg)}.icono-locationArrow:after{position:absolute;top:10px;left:2px;border-width:10px;border-style:solid;border-bottom-color:transparent;border-left-color:transparent;-webkit-transform:skew(-30deg,-30deg);-ms-transform:skew(-30deg,-30deg);transform:skew(-30deg,-30deg)}.icono-commentEmpty{width:30px;height:22px;border-radius:4px 4px 7px 7px;border-bottom-color:transparent;margin:5px 2px 7px}.icono-commentEmpty:before{position:absolute;width:6px;height:6px;border-width:0 0 2px 2px;border-style:solid;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);bottom:-4px;left:6px}.icono-commentEmpty:after{position:absolute;width:8px;height:2px;border-width:0 12px 0 6px;border-style:solid;bottom:0;left:0}.icono-comment{width:30px;height:20px;box-shadow:inset 0 0 0 32px;border-radius:4px;margin:5px 2px 9px}.icono-comment:before{position:absolute;width:8px;height:8px;box-shadow:inset 0 0 0 32px;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);bottom:-4px;left:6px}.icono-areaChart,.icono-barChart{width:30px;height:22px;border-top-width:0;border-right-width:0;border-color:transparent;box-shadow:-2px 2px;overflow:hidden;margin:4px 0 8px 4px}.icono-areaChart:before{position:absolute;left:0;bottom:7px;border:6px solid transparent;border-bottom-color:currentColor;box-shadow:0 7px}.icono-areaChart:after{position:absolute;left:11px;bottom:4px;border-width:0 6px 13px;border-style:solid;border-color:transparent transparent currentColor;box-shadow:0 4px}.icono-barChart{border-color:transparent;box-shadow:-2px 2px;margin:4px 0 8px 4px}.icono-barChart:before{position:absolute;left:0;bottom:0;width:4px;height:15px;box-shadow:inset 0 -8px 0 0,6px 0,12px 7px,18px 5px}.icono-pieChart{width:0;height:0;border:15px solid;border-right-color:transparent;border-radius:50%;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);margin:2px}.icono-pieChart:before{position:absolute;width:0;height:0;left:-11px;top:-14px;border:14px solid;border-left-color:transparent;border-bottom-color:transparent;border-top-color:transparent;border-radius:50%}.icono-bookmark{width:0;height:0;border:9px solid;border-bottom-color:transparent;box-shadow:0 -4px;border-radius:3px 3px 0 0;margin:10px 8px 6px}.icono-bookmarkEmpty{width:18px;height:22px;border-bottom:none;border-radius:3px 3px 2px 2px;overflow:hidden;margin:6px 8px}.icono-bookmarkEmpty:before{position:absolute;width:12px;height:12px;bottom:0;left:0;border-right:none;border-bottom:none;-webkit-transform:rotate(45deg) translate(35%,35%);-ms-transform:rotate(45deg) translate(35%,35%);transform:rotate(45deg) translate(35%,35%)}.icono-filter{width:0;height:0;border:10px solid;border-bottom:none;border-left-color:transparent;border-right-color:transparent;padding:3px;box-shadow:inset 0 7px;margin:9px 4px}.icono-volume,.icono-volumeDecrease,.icono-volumeHigh,.icono-volumeIncrease,.icono-volumeLow,.icono-volumeMedium,.icono-volumeMute{width:0;height:0;border:7px solid;border-left:none;border-top-color:transparent;border-bottom-color:transparent;padding:6px 3px;box-shadow:inset 4px 0;margin:4px 10px 4px 11px}.icono-volumeHigh,.icono-volumeLow,.icono-volumeMedium{margin:4px 14px 4px 7px}.icono-volumeHigh:after,.icono-volumeHigh:before,.icono-volumeLow:before,.icono-volumeMedium:before{width:15px;height:15px;position:absolute;border-radius:50%;border-top-color:transparent;border-bottom-color:transparent;border-left-color:transparent;left:2px}.icono-volumeHigh,.icono-volumeMedium{margin:4px 16px 4px 5px}.icono-volumeHigh:before,.icono-volumeMedium:before{border-style:double;border-width:6px;left:-2px}.icono-volumeHigh{margin:4px 18px 4px 3px}.icono-volumeHigh:after{width:32px;height:32px;left:-7px}.icono-volumeDecrease,.icono-volumeIncrease,.icono-volumeMute{margin:4px 16px 4px 5px}.icono-volumeDecrease:after,.icono-volumeDecrease:before,.icono-volumeIncrease:after,.icono-volumeIncrease:before,.icono-volumeMute:after,.icono-volumeMute:before{box-shadow:inset 0 0 0 32px}.icono-volumeDecrease:before,.icono-volumeIncrease:before,.icono-volumeMute:before{width:10px;height:2px;left:17px}.icono-volumeIncrease:after,.icono-volumeMute:after{height:10px;width:2px;left:21px}.icono-volumeMute:after,.icono-volumeMute:before{-webkit-transform:translateY(-50%) rotate(45deg);-ms-transform:translateY(-50%) rotate(45deg);transform:translateY(-50%) rotate(45deg)}.icono-tag{width:18px;height:24px;border-radius:6px 6px 4px 4px;border-top:none;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);margin:5px 8px}.icono-tag:before{position:absolute;top:-4px;left:1px;width:10px;height:10px;border-width:2px 0 0 2px;border-style:solid;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);border-radius:5px 0 0}.icono-tag:after{top:1px;width:3px;height:3px;border-radius:50%}.icono-calendar{width:32px;height:28px;border-width:4px 2px 2px;border-style:solid;border-radius:4px;margin:5px 1px 1px}.icono-calendar:before{position:absolute;width:4px;height:4px;top:3px;left:3px;box-shadow:inset 0 0 0 32px,6px 0,12px 0,18px 0,0 6px,6px 6px,12px 6px,18px 6px,0 12px,6px 12px,12px 12px,18px 12px}.icono-calendar:after{position:absolute;width:4px;height:8px;box-shadow:inset 0 0 0 32px,16px 0;border-radius:4px;top:-8px;left:4px}.icono-camera{width:32px;height:24px;border-radius:4px;margin:5px 1px}.icono-camera:before{width:10px;height:10px;border:1px solid transparent;box-shadow:inset 0 0 0 1px,0 0 0 2px;border-radius:50%}.icono-camera:after{position:absolute;width:4px;height:2px;right:2px;top:2px;box-shadow:inset 0 0 0 32px}.icono-piano{width:28px;height:22px;margin:6px 3px}.icono-piano:before{position:absolute;left:4px;top:0;width:1px;height:100%;box-shadow:inset 0 0 0 32px,5px 0,10px 0,15px 0}.icono-piano:after{position:absolute;width:3px;height:12px;left:3px;top:0;box-shadow:inset 0 0 0 32px,5px 0,10px 0,15px 0}.icono-ruler{width:27px;height:12px;margin:11px 4px 11px 3px}.icono-ruler:before{position:absolute;width:1px;height:4px;box-shadow:inset 0 0 0 32px,6px 0,12px 0;left:5px;top:0}.icono-ruler:after{position:absolute;width:1px;height:2px;box-shadow:inset 0 0 0 32px,2px 0,6px 0,8px 0,12px 0,14px 0,18px 0,20px 0;left:1px;top:0}.icono-facebook{width:9px;height:26px;box-shadow:inset 2px 4px 0 0;border-left:3px solid;border-radius:5px 0 0;margin:4px 11px 4px 14px}.icono-facebook:before{position:absolute;top:9px;left:-6px;width:11px;height:0;border-top:4px solid;border-right:1px solid transparent}.icono-twitter{width:14px;height:23px;border-radius:0 0 0 8px;box-shadow:-6px 2px 0 0;margin:4px 7px 7px 13px}.icono-twitter:before{position:absolute;bottom:-2px;left:-6px;width:17px;height:6px;border-radius:0 0 0 8px;box-shadow:inset 4px -6px,0 -11px}.icono-twitter:after{position:absolute;width:6px;height:6px;box-shadow:inset 0 0 0 32px,13px 8px,13px 19px;border-radius:50%;left:-6px}.icono-gplus{width:10px;height:2px;box-shadow:inset 0 0 0 32px;margin:14px 4px 18px 20px}.icono-gplus:before{position:absolute;top:-5px;right:10px;content:\"g\"!important;font-family:georgia;font-size:32px;text-indent:0;line-height:0}.icono-gplus:after{width:2px;height:10px;box-shadow:inset 0 0 0 32px}.icono-linkedIn{width:5px;height:16px;box-shadow:inset 0 0 0 32px,8px 0;margin:12px 24px 6px 5px}.icono-linkedIn:before{position:absolute;width:5px;height:5px;box-shadow:inset 0 0 0 32px;top:-7px;left:0;border-radius:50%}.icono-linkedIn:after{position:absolute;width:12px;height:16px;border-right:1px solid;left:11px;bottom:0;border-radius:8px 5px 0 0/11px 5px 0 0;box-shadow:inset -4px 4px}.icono-instagram{width:26px;height:26px;box-shadow:inset 0 0 0 2px;border-radius:4px;margin:4px}.icono-instagram:before{width:10px;height:10px;border-radius:50%;box-shadow:0 0 0 3px}.icono-instagram:after{position:absolute;width:5px;height:5px;border-radius:1px;right:3px;top:3px;box-shadow:0 0 0 2px,1px 1px 0 2px,-5px -1px 0 1px,-10px -1px 0 1px,-16px 1px 0 2px}.icono-flickr{width:24px;height:24px;overflow:hidden;border-radius:4px;margin:5px}.icono-flickr:after,.icono-flickr:before{width:7px;height:7px;border-radius:50%}.icono-flickr:before{left:4px;box-shadow:0 0 0 1px,0 -10px 0 6px,0 10px 0 6px,-4px 0 0 3px}.icono-flickr:after{right:4px;box-shadow:0 0 0 1px,0 -10px 0 6px,0 10px 0 6px,4px 0 0 3px}.icono-delicious{width:24px;height:24px;overflow:hidden;border-radius:4px;box-shadow:inset 0 0 0 2px;margin:5px}.icono-delicious:before{position:absolute;width:12px;height:12px;box-shadow:inset 0 0 0 32px,12px -12px 0 0;left:0;bottom:0}.icono-codepen{width:2px;height:10px;box-shadow:inset 0 0 0 32px,0 15px,-11px 7px,11px 7px;margin:4px 16px 20px}.icono-codepen:before{position:absolute;right:2px;top:3px;width:11px;height:4px;-webkit-transform:skew(0,-35deg) scaleY(0.6);-ms-transform:skew(0,-35deg) scaleY(0.6);transform:skew(0,-35deg) scaleY(0.6);box-shadow:inset 0 0 0 32px,0 13px,11px 26px,12px 39px}.icono-codepen:after{position:absolute;left:2px;top:3px;width:11px;height:4px;-webkit-transform:skew(0,35deg) scaleY(0.6);-ms-transform:skew(0,35deg) scaleY(0.6);transform:skew(0,35deg) scaleY(0.6);box-shadow:inset 0 0 0 32px,0 13px,-11px 26px,-12px 39px}.icono-blogger{width:24px;height:14px;border-radius:0 0 7px 7px;margin:14px 5px 6px}.icono-blogger,.icono-blogger:before{border-width:6px;border-style:solid}.icono-blogger:before{position:absolute;width:8px;height:2px;left:-6px;top:-15px;border-radius:6px 6px 0 0}.icono-disqus{width:31px;height:31px;box-shadow:inset 0 0 0 32px;border-radius:50%;margin:1px 1px 2px 2px}.icono-disqus:before{position:absolute;width:0;height:0;border:5px solid transparent;border-top:10px solid;-webkit-transform:rotate(50deg);-ms-transform:rotate(50deg);transform:rotate(50deg);left:-5px;top:20px}.icono-dribbble{width:26px;height:26px;border-radius:50%;box-shadow:inset 0 0 0 2px;overflow:hidden;position:relative;background-image:-webkit-radial-gradient(50% 100%,transparent 0,transparent 9px,currentColor 10px,currentColor 11px,transparent 12px);background-image:radial-gradient(50% 100%,transparent 0,transparent 9px,currentColor 10px,currentColor 11px,transparent 12px);background-repeat:no-repeat;background-position:-8px center;-webkit-transform:rotate(-25deg);-ms-transform:rotate(-25deg);transform:rotate(-25deg);margin:4px}.icono-dribbble:after,.icono-dribbble:before{position:absolute;border-radius:50%;border:2px solid;width:40px;height:30px}.icono-dribbble:after{top:14px;left:-7px;width:32px}.icono-dribbble:before{left:-6px;top:-23px}.icono-creditCard{width:32px;height:24px;border-radius:3px;margin:5px 1px}.icono-creditCard:before{position:absolute;top:4px;width:100%;height:6px;box-shadow:inset 0 0 0 32px}.icono-creditCard:after{left:3px;bottom:3px;position:absolute;width:4px;height:2px;box-shadow:inset 0 0 0 32px,6px 0}.icono-cup{width:22px;height:16px;box-shadow:inset 0 0 0 32px;border-radius:0 0 5px 5px;margin:6px 6px 12px}.icono-cup:before{position:absolute;right:-3px;top:4px;width:5px;height:5px;border-radius:50%;box-shadow:0 0 0 2px}.icono-cup:after{bottom:-5px;width:26px;height:3px;border-radius:0 0 3px 3px;box-shadow:inset 0 0 0 32px}.icono-play{width:0;height:0;border-width:10px 0 10px 16px;border-style:solid;border-top-color:transparent;border-bottom-color:transparent;margin:7px 9px}.icono-pause{width:6px;height:20px;margin:7px 20px 7px 8px;box-shadow:inset 0 0 0 32px,12px 0 0 0}.icono-stop{width:0;height:0;border:10px solid;margin:7px}.icono-rewind{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.icono-forward,.icono-rewind{width:0;height:0;border:10px solid transparent;border-left:10px solid;margin:7px}.icono-forward:before,.icono-rewind:before{position:absolute;left:0;top:-10px;width:0;height:0;border:10px solid transparent;border-left:10px solid}.icono-next,.icono-previous{width:0;height:0;border:10px solid transparent;border-left:10px solid;border-right:none;margin:7px 14px 7px 10px;box-shadow:4px 0}.icono-previous{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg);margin:7px 10px 7px 14px}.icono-caretDown,.icono-caretDownCircle,.icono-caretDownSquare,.icono-caretLeft,.icono-caretLeftCircle,.icono-caretLeftSquare,.icono-caretRight,.icono-caretRightCircle,.icono-caretRightSquare,.icono-caretUp,.icono-caretUpCircle,.icono-caretUpSquare{width:12px;height:20px;margin:7px 11px}.icono-caretDown:after,.icono-caretDown:before,.icono-caretDownCircle:after,.icono-caretDownCircle:before,.icono-caretDownSquare:after,.icono-caretDownSquare:before,.icono-caretLeft:after,.icono-caretLeft:before,.icono-caretLeftCircle:after,.icono-caretLeftCircle:before,.icono-caretLeftSquare:after,.icono-caretLeftSquare:before,.icono-caretRight:after,.icono-caretRight:before,.icono-caretRightCircle:after,.icono-caretRightCircle:before,.icono-caretRightSquare:after,.icono-caretRightSquare:before,.icono-caretUp:after,.icono-caretUp:before,.icono-caretUpCircle:after,.icono-caretUpCircle:before,.icono-caretUpSquare:after,.icono-caretUpSquare:before{width:14px;height:2px;position:absolute;bottom:0;margin:auto 0;right:2px;box-shadow:inset 0 0 0 32px;-webkit-transform-origin:right;-ms-transform-origin:right;transform-origin:right}.icono-caretDown:before,.icono-caretDownCircle:before,.icono-caretDownSquare:before,.icono-caretLeft:before,.icono-caretLeftCircle:before,.icono-caretLeftSquare:before,.icono-caretRight:before,.icono-caretRightCircle:before,.icono-caretRightSquare:before,.icono-caretUp:before,.icono-caretUpCircle:before,.icono-caretUpSquare:before{top:2px;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.icono-caretDown:after,.icono-caretDownCircle:after,.icono-caretDownSquare:after,.icono-caretLeft:after,.icono-caretLeftCircle:after,.icono-caretLeftSquare:after,.icono-caretRight:after,.icono-caretRightCircle:after,.icono-caretRightSquare:after,.icono-caretUp:after,.icono-caretUpCircle:after,.icono-caretUpSquare:after{top:0;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg)}.icono-caretLeft,.icono-caretLeftCircle,.icono-caretLeftSquare{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.icono-caretUp,.icono-caretUpCircle,.icono-caretUpSquare{-webkit-transform:rotate(-90deg);-ms-transform:rotate(-90deg);transform:rotate(-90deg)}.icono-caretDown,.icono-caretDownCircle,.icono-caretDownSquare{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}[class*=icono-caret][class*=Circle]:after,[class*=icono-caret][class*=Circle]:before,[class*=icono-caret][class*=Square]:after,[class*=icono-caret][class*=Square]:before{width:11px;right:8px}.icono-downArrow,.icono-leftArrow,.icono-rightArrow,.icono-upArrow{width:16px;height:4px;margin:15px 9px;box-shadow:inset 0 0 0 2px;-webkit-transform:translateX(-3px);-ms-transform:translateX(-3px);transform:translateX(-3px)}.icono-downArrow:before,.icono-leftArrow:before,.icono-rightArrow:before,.icono-upArrow:before{border-style:solid;border-width:8px 0 8px 8px;border-color:transparent;border-left-color:inherit;left:100%;right:auto}.icono-leftArrow{-webkit-transform:translateX(3px) rotate(180deg);-ms-transform:translateX(3px) rotate(180deg);transform:translateX(3px) rotate(180deg)}.icono-upArrow{-webkit-transform:translateY(3px) rotate(-90deg);-ms-transform:translateY(3px) rotate(-90deg);transform:translateY(3px) rotate(-90deg)}.icono-downArrow{-webkit-transform:translateY(-3px) rotate(90deg);-ms-transform:translateY(-3px) rotate(90deg);transform:translateY(-3px) rotate(90deg)}.icono-sun{width:22px;height:22px;border:2px solid;border-radius:50%;box-shadow:-15px 0 0 -9px,15px 0 0 -9px,0 -15px 0 -9px,0 15px 0 -9px,11px 11px 0 -9px,-11px -11px 0 -9px,11px -11px 0 -9px,-11px 11px 0 -9px;margin:6px}.icono-moon{width:22px;height:22px;border-radius:50%;overflow:hidden;margin:6px}.icono-moon:before{position:absolute;width:20px;height:20px;top:-2px;left:6px;border-radius:50%;box-shadow:0 0 0 32px}.icono-cart{width:22px;height:0;border-width:14px 6px 0 2px;border-style:solid;border-right-color:transparent;border-left-color:transparent;margin:9px 3px 11px 9px}.icono-cart:before{position:absolute;width:4px;height:4px;border-radius:50%;box-shadow:inset 0 0 0 32px,13px 0,-4px -20px 0 1px;top:2px;left:-3px}.icono-sitemap{width:24px;height:2px;box-shadow:0 -5px;margin:21px 5px 11px}.icono-sitemap:before{width:6px;height:6px;border-radius:2px;box-shadow:inset 0 0 0 32px,11px 0,-11px 0,0 -14px 0 1px}.icono-sitemap:after{width:2px;height:10px;box-shadow:0 -7px,11px -5px,-11px -5px}[class*=icono-]{display:inline-block;vertical-align:middle;position:relative;font-style:normal;color:#ddd;text-align:left;text-indent:-9999px;direction:ltr}[class*=icono-]:after,[class*=icono-]:before{content:'';pointer-events:none}[class*=icono-][class*=Circle]{border-radius:50%;width:30px;height:30px;margin:2px}[class*=icono-][class*=Square]{border-radius:4px;width:30px;height:30px;margin:2px}[class*=icono-],[class*=icono-] *{box-sizing:border-box}\n", ""]);

// exports


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_super_sidebar_vue__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_headers_header_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_footer_vue__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_toast_vue__ = __webpack_require__(41);





__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('super-sidebar', __WEBPACK_IMPORTED_MODULE_1__components_super_sidebar_vue__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('top-navbar', __WEBPACK_IMPORTED_MODULE_2__components_headers_header_vue__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('bottom-navbar', __WEBPACK_IMPORTED_MODULE_3__components_footer_vue__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('toast', __WEBPACK_IMPORTED_MODULE_4__components_toast_vue__["a" /* default */]);
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    name: 'layout-super'
}));


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vuex_types__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_toast__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(10);




/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    name: "super-sidebar",
    methods: {
        handleLogout() {
            console.log("logout...");
            this.$store.dispatch(__WEBPACK_IMPORTED_MODULE_1__vuex_types__["LOGOUT"]);
        }
    },
    // mounted() {
    //   console.log(this.$route.name)
    // },
    watch: {
        ["auth.response"]() {
            if (this.auth.response.status) {
                if (this.auth.response.status === 200) {
                    Object(__WEBPACK_IMPORTED_MODULE_2__modules_toast__["a" /* default */])("Logout success", "success");
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                }
                else {
                    Object(__WEBPACK_IMPORTED_MODULE_2__modules_toast__["a" /* default */])("Failed to logout, please try again", "error");
                }
            }
        }
    },
    computed: Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["mapState"])(['auth']))
}));


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_header_vue__ = __webpack_require__(38);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6941a864_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_header_vue__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(126)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6941a864"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_header_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6941a864_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_header_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6941a864_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_header_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/headers/header.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6941a864", Component.options)
  } else {
    hotAPI.reload("data-v-6941a864", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);

function drawWave() { }
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    name: "navbar",
    props: {
        size: {
            type: String,
            default: "large"
        }
    }
}));


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_footer_vue__ = __webpack_require__(40);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5564a849_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_footer_vue__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(129)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5564a849"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_footer_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5564a849_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_footer_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5564a849_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_footer_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/footer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5564a849", Component.options)
  } else {
    hotAPI.reload("data-v-5564a849", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);

const defaultProps = ["route"];
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    data() {
        return {
            show_btngototop: false,
            selected_lang: ""
        };
    },
    mounted() {
        this.selected_lang = window.SELECTED_LANG || "id";
        document.addEventListener("scroll", e => {
            const position = window.scrollY;
            if (position > 218) {
                // show navbar
                this.show_btngototop = true;
            }
            else {
                // hide navbar
                this.show_btngototop = false;
            }
        });
    },
    methods: {
        goToTop() {
            const target = document.getElementsByClassName("main-nav_logo")[0];
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    },
    props: defaultProps
}));


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_toast_vue__ = __webpack_require__(42);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_075c4ce9_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_toast_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(132)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-075c4ce9"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_toast_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_075c4ce9_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_toast_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_075c4ce9_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_toast_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/toast.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-075c4ce9", Component.options)
  } else {
    hotAPI.reload("data-v-075c4ce9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    name: "toast",
    mounted() {
        const Toast = document.getElementById("toast-oopsreview");
        Toast.addEventListener("click", () => {
            Toast.style.bottom = "-200px";
        });
    }
}));


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_v2_navigations_navbar_vue__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_headers_header_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_footer_vue__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_toast_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_boxs_thanks_to_vue__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__index__ = __webpack_require__(9);







__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("navbar", __WEBPACK_IMPORTED_MODULE_1__components_v2_navigations_navbar_vue__["default"]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("top-navbar", __WEBPACK_IMPORTED_MODULE_2__components_headers_header_vue__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("bottom-navbar", __WEBPACK_IMPORTED_MODULE_3__components_footer_vue__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("toast", __WEBPACK_IMPORTED_MODULE_4__components_toast_vue__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component("thanks-to", __WEBPACK_IMPORTED_MODULE_5__components_boxs_thanks_to_vue__["default"]);
let NOT_REDIRECT_LANG;
NOT_REDIRECT_LANG = [
    "super_login",
    "super_new_post",
    "super_post",
    "super_post_detail"
];
const IS_FULLSCREEN = ["search", "a", "author", "tag", "posts", "apps", "app"];
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    name: "layout-default",
    data() {
        return {
            isFullscreen: IS_FULLSCREEN.includes(this.$route.path.split("/")[2])
        };
    },
    mounted() {
        const { fullPath, params } = this.$route;
        const { lang } = params;
        if (!lang && !NOT_REDIRECT_LANG.includes(this.$route.name || "")) {
            location.href = `/${window.SELECTED_LANG || "id"}${fullPath}`;
        }
        const win = window;
        if (win.ga) {
            // ref : https://developers.google.com/analytics/devguides/collection/gajs/
            win.ga("send", "pageview", fullPath);
        }
    },
    watch: {
        $route(to) {
            const { path, fullPath, params, name: string = "" } = to;
            const { lang } = params;
            this.isFullscreen = IS_FULLSCREEN.includes(path.split("/")[2]);
            if (!lang && !NOT_REDIRECT_LANG.includes(name)) {
                __WEBPACK_IMPORTED_MODULE_6__index__["router"].push({ path: `/${window.SELECTED_LANG || "id"}${fullPath}` });
            }
            const win = window;
            if (win.ga) {
                // ref : https://developers.google.com/analytics/devguides/collection/gajs/
                win.ga("send", "pageview", to.fullPath);
            }
        }
    }
}));


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(9);

var menus = [{
  name: "posts",
  matchPath: ["post", "posts", "tag", "a", "author", "search"],
  link: "/posts"
  // {
  //   name: "videos",
  //   target: "blank",
  //   link: "https://www.youtube.com/channel/UCw-_8IVEy5x-y6zRyztZddw"
  // }
}]; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  data: function data() {
    return {
      hideSearch: true,
      keywordSearch: "",
      activePath: this.$route.path.split("/")[2],
      menus: menus
    };
  },

  methods: {
    // handle show / hide input search
    toggleSearch: function toggleSearch() {
      this.hideSearch = !this.hideSearch;
    },
    onKeyUp: function onKeyUp(e) {
      if (e.keyCode == 13 && this.keywordSearch != "") {
        _index.router.push({ path: "/search?q=" + this.keywordSearch });

        // reset search input on navbar
        this.hideSearch = true;
        this.keywordSearch = "";
      }
    }
  },

  watch: {
    $route: function $route(to) {
      var path = to.path;

      this.activePath = path.split("/")[2];
    }
  }
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {};

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = request;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);

// ref: https://github.com/axios/axios#global-axios-defaults
__WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
function request(method, url, formdata) {
    method = method.toLowerCase();
    return new Promise((resolve, reject) => {
        let config = {
            method,
            url,
            data: {}
        };
        if (method != 'get') {
            if (formdata) {
                let formdata_input = new FormData();
                const keys = Object.keys(formdata);
                keys.map(n => {
                    formdata_input.set(n, formdata[n]);
                });
                config.data = formdata_input;
            }
            // config.config = { headers: {'Content-Type': 'multipart/form-data' }}
        }
        return __WEBPACK_IMPORTED_MODULE_0_axios___default()(config)
            .then((response) => {
            const { status, data } = response;
            resolve({ status, data });
        })
            .catch((error) => reject(error));
    });
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var settle = __webpack_require__(156);
var buildURL = __webpack_require__(158);
var parseHeaders = __webpack_require__(159);
var isURLSameOrigin = __webpack_require__(160);
var createError = __webpack_require__(49);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(161);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(162);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(157);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let timeout;
/* harmony default export */ __webpack_exports__["a"] = ((text = '', status = 'success', fixed = false) => {
    clearTimeout(timeout);
    // only worked on client
    if (typeof window != "undefined") {
        let toast = document.getElementById('toast-oopsreview');
        toast.style.bottom = "10px";
        toast.className = status;
        toast.innerHTML = text;
        if (!fixed) {
            timeout = setTimeout(() => {
                toast.style.bottom = "-100px";
            }, 5000);
        }
    }
});


/***/ }),
/* 53 */,
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_box_title_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_box_title_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_box_title_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_box_title_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_box_title_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_67c7692d_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_box_title_vue__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(79)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-67c7692d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_box_title_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_67c7692d_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_box_title_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_67c7692d_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_box_title_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/v2/headings/box-title.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-67c7692d", Component.options)
  } else {
    hotAPI.reload("data-v-67c7692d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * vue-meta v1.6.0
 * (c) 2019 Declan de Wet & Sébastien Chopin (@Atinux)
 * @license MIT
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.VueMeta = factory());
}(this, function () { 'use strict';

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var arguments$1 = arguments;

		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments$1[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var umd = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
		module.exports = factory();
	}(commonjsGlobal, (function () {
	var isMergeableObject = function isMergeableObject(value) {
		return isNonNullObject(value)
			&& !isSpecial(value)
	};

	function isNonNullObject(value) {
		return !!value && typeof value === 'object'
	}

	function isSpecial(value) {
		var stringValue = Object.prototype.toString.call(value);

		return stringValue === '[object RegExp]'
			|| stringValue === '[object Date]'
			|| isReactElement(value)
	}

	// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
	var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

	function isReactElement(value) {
		return value.$$typeof === REACT_ELEMENT_TYPE
	}

	function emptyTarget(val) {
		return Array.isArray(val) ? [] : {}
	}

	function cloneUnlessOtherwiseSpecified(value, options) {
		return (options.clone !== false && options.isMergeableObject(value))
			? deepmerge(emptyTarget(value), value, options)
			: value
	}

	function defaultArrayMerge(target, source, options) {
		return target.concat(source).map(function(element) {
			return cloneUnlessOtherwiseSpecified(element, options)
		})
	}

	function getMergeFunction(key, options) {
		if (!options.customMerge) {
			return deepmerge
		}
		var customMerge = options.customMerge(key);
		return typeof customMerge === 'function' ? customMerge : deepmerge
	}

	function mergeObject(target, source, options) {
		var destination = {};
		if (options.isMergeableObject(target)) {
			Object.keys(target).forEach(function(key) {
				destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
			});
		}
		Object.keys(source).forEach(function(key) {
			if (!options.isMergeableObject(source[key]) || !target[key]) {
				destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
			} else {
				destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
			}
		});
		return destination
	}

	function deepmerge(target, source, options) {
		options = options || {};
		options.arrayMerge = options.arrayMerge || defaultArrayMerge;
		options.isMergeableObject = options.isMergeableObject || isMergeableObject;

		var sourceIsArray = Array.isArray(source);
		var targetIsArray = Array.isArray(target);
		var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

		if (!sourceAndTargetTypesMatch) {
			return cloneUnlessOtherwiseSpecified(source, options)
		} else if (sourceIsArray) {
			return options.arrayMerge(target, source, options)
		} else {
			return mergeObject(target, source, options)
		}
	}

	deepmerge.all = function deepmergeAll(array, options) {
		if (!Array.isArray(array)) {
			throw new Error('first argument should be an array')
		}

		return array.reduce(function(prev, next) {
			return deepmerge(prev, next, options)
		}, {})
	};

	var deepmerge_1 = deepmerge;

	return deepmerge_1;

	})));
	});

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	var lodash_isplainobject = isPlainObject;

	/**
	 * checks if passed argument is an array
	 * @param  {any}  arr - the object to check
	 * @return {Boolean} - true if `arr` is an array
	 */
	function isArray (arr) {
	  return Array.isArray
	    ? Array.isArray(arr)
	    : Object.prototype.toString.call(arr) === '[object Array]'
	}

	function uniqBy (inputArray, predicate) {
	  return inputArray
	    .filter(function (x, i, arr) { return i === arr.length - 1
	      ? true
	      : predicate(x) !== predicate(arr[i + 1]); }
	    )
	}

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/** Used to generate unique IDs. */
	var idCounter = 0;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString$1 = objectProto$1.toString;

	/** Built-in value references. */
	var Symbol$1 = root.Symbol;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike$1(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike$1(value) && objectToString$1.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	/**
	 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {string} [prefix=''] The value to prefix the ID with.
	 * @returns {string} Returns the unique ID.
	 * @example
	 *
	 * _.uniqueId('contact_');
	 * // => 'contact_104'
	 *
	 * _.uniqueId();
	 * // => '105'
	 */
	function uniqueId(prefix) {
	  var id = ++idCounter;
	  return toString(prefix) + id;
	}

	var lodash_uniqueid = uniqueId;

	/**
	 * Returns the `opts.option` $option value of the given `opts.component`.
	 * If methods are encountered, they will be bound to the component context.
	 * If `opts.deep` is true, will recursively merge all child component
	 * `opts.option` $option values into the returned result.
	 *
	 * @param  {Object} opts - options
	 * @param  {Object} opts.component - Vue component to fetch option data from
	 * @param  {String} opts.option - what option to look for
	 * @param  {Boolean} opts.deep - look for data in child components as well?
	 * @param  {Function} opts.arrayMerge - how should arrays be merged?
	 * @param  {Object} [result={}] - result so far
	 * @return {Object} result - final aggregated result
	 */
	function getComponentOption (opts, result) {
	  if ( result === void 0 ) result = {};

	  var component = opts.component;
	  var option = opts.option;
	  var deep = opts.deep;
	  var arrayMerge = opts.arrayMerge;
	  var metaTemplateKeyName = opts.metaTemplateKeyName;
	  var tagIDKeyName = opts.tagIDKeyName;
	  var contentKeyName = opts.contentKeyName;
	  var $options = component.$options;

	  if (component._inactive) { return result }

	  // only collect option data if it exists
	  if (typeof $options[option] !== 'undefined' && $options[option] !== null) {
	    var data = $options[option];

	    // if option is a function, replace it with it's result
	    if (typeof data === 'function') {
	      data = data.call(component);
	    }

	    if (typeof data === 'object') {
	      // merge with existing options
	      result = umd(result, data, { arrayMerge: arrayMerge });
	    } else {
	      result = data;
	    }
	  }

	  // collect & aggregate child options if deep = true
	  if (deep && component.$children.length) {
	    component.$children.forEach(function (childComponent) {
	      result = getComponentOption({
	        component: childComponent,
	        option: option,
	        deep: deep,
	        arrayMerge: arrayMerge
	      }, result);
	    });
	  }
	  if (metaTemplateKeyName && result.hasOwnProperty('meta')) {
	    result.meta = Object.keys(result.meta).map(function (metaKey) {
	      var metaObject = result.meta[metaKey];
	      if (!metaObject.hasOwnProperty(metaTemplateKeyName) || !metaObject.hasOwnProperty(contentKeyName) || typeof metaObject[metaTemplateKeyName] === 'undefined') {
	        return result.meta[metaKey]
	      }

	      var template = metaObject[metaTemplateKeyName];
	      delete metaObject[metaTemplateKeyName];

	      if (template) {
	        metaObject.content = typeof template === 'function' ? template(metaObject.content) : template.replace(/%s/g, metaObject.content);
	      }

	      return metaObject
	    });
	    result.meta = uniqBy(
	      result.meta,
	      function (metaObject) { return metaObject.hasOwnProperty(tagIDKeyName) ? metaObject[tagIDKeyName] : lodash_uniqueid(); }
	    );
	  }
	  return result
	}

	var escapeHTML = function (str) { return typeof window === 'undefined'
	  // server-side escape sequence
	  ? String(str)
	    .replace(/&/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;')
	    .replace(/'/g, '&#x27;')
	  // client-side escape sequence
	  : String(str)
	    .replace(/&/g, '\u0026')
	    .replace(/</g, '\u003c')
	    .replace(/>/g, '\u003e')
	    .replace(/"/g, '\u0022')
	    .replace(/'/g, '\u0027'); };

	function _getMetaInfo (options) {
	  if ( options === void 0 ) options = {};

	  var keyName = options.keyName;
	  var tagIDKeyName = options.tagIDKeyName;
	  var metaTemplateKeyName = options.metaTemplateKeyName;
	  var contentKeyName = options.contentKeyName;
	  /**
	   * Returns the correct meta info for the given component
	   * (child components will overwrite parent meta info)
	   *
	   * @param  {Object} component - the Vue instance to get meta info from
	   * @return {Object} - returned meta info
	   */
	  return function getMetaInfo (component) {
	    // set some sane defaults
	    var defaultInfo = {
	      title: '',
	      titleChunk: '',
	      titleTemplate: '%s',
	      htmlAttrs: {},
	      bodyAttrs: {},
	      headAttrs: {},
	      meta: [],
	      base: [],
	      link: [],
	      style: [],
	      script: [],
	      noscript: [],
	      __dangerouslyDisableSanitizers: [],
	      __dangerouslyDisableSanitizersByTagID: {}
	    };

	    // collect & aggregate all metaInfo $options
	    var info = getComponentOption({
	      component: component,
	      option: keyName,
	      deep: true,
	      metaTemplateKeyName: metaTemplateKeyName,
	      tagIDKeyName: tagIDKeyName,
	      contentKeyName: contentKeyName,
	      arrayMerge: function arrayMerge (target, source) {
	        // we concat the arrays without merging objects contained in,
	        // but we check for a `vmid` property on each object in the array
	        // using an O(1) lookup associative array exploit
	        // note the use of "for in" - we are looping through arrays here, not
	        // plain objects
	        var destination = [];
	        for (var targetIndex in target) {
	          var targetItem = target[targetIndex];
	          var shared = false;
	          for (var sourceIndex in source) {
	            var sourceItem = source[sourceIndex];
	            if (targetItem[tagIDKeyName] && targetItem[tagIDKeyName] === sourceItem[tagIDKeyName]) {
	              var targetTemplate = targetItem[metaTemplateKeyName];
	              var sourceTemplate = sourceItem[metaTemplateKeyName];
	              if (targetTemplate && !sourceTemplate) {
	                sourceItem[contentKeyName] = applyTemplate(component)(targetTemplate)(sourceItem[contentKeyName]);
	              }
	              // If template defined in child but content in parent
	              if (targetTemplate && sourceTemplate && !sourceItem[contentKeyName]) {
	                sourceItem[contentKeyName] = applyTemplate(component)(sourceTemplate)(targetItem[contentKeyName]);
	                delete sourceItem[metaTemplateKeyName];
	              }
	              shared = true;
	              break
	            }
	          }

	          if (!shared) {
	            destination.push(targetItem);
	          }
	        }

	        return destination.concat(source)
	      }
	    });

	    // Remove all "template" tags from meta

	    // backup the title chunk in case user wants access to it
	    if (info.title) {
	      info.titleChunk = info.title;
	    }

	    // replace title with populated template
	    if (info.titleTemplate) {
	      info.title = applyTemplate(component)(info.titleTemplate)(info.titleChunk || '');
	    }

	    // convert base tag to an array so it can be handled the same way
	    // as the other tags
	    if (info.base) {
	      info.base = Object.keys(info.base).length ? [info.base] : [];
	    }

	    var ref = info.__dangerouslyDisableSanitizers;
	    var refByTagID = info.__dangerouslyDisableSanitizersByTagID;

	    // sanitizes potentially dangerous characters
	    var escape = function (info) { return Object.keys(info).reduce(function (escaped, key) {
	      var isDisabled = ref && ref.indexOf(key) > -1;
	      var tagID = info[tagIDKeyName];
	      if (!isDisabled && tagID) {
	        isDisabled = refByTagID && refByTagID[tagID] && refByTagID[tagID].indexOf(key) > -1;
	      }
	      var val = info[key];
	      escaped[key] = val;
	      if (key === '__dangerouslyDisableSanitizers' || key === '__dangerouslyDisableSanitizersByTagID') {
	        return escaped
	      }
	      if (!isDisabled) {
	        if (typeof val === 'string') {
	          escaped[key] = escapeHTML(val);
	        } else if (lodash_isplainobject(val)) {
	          escaped[key] = escape(val);
	        } else if (isArray(val)) {
	          escaped[key] = val.map(escape);
	        } else {
	          escaped[key] = val;
	        }
	      } else {
	        escaped[key] = val;
	      }

	      return escaped
	    }, {}); };

	    // merge with defaults
	    info = umd(defaultInfo, info);

	    // begin sanitization
	    info = escape(info);

	    return info
	  }
	}

	var applyTemplate = function (component) { return function (template) { return function (chunk) { return typeof template === 'function' ? template.call(component, chunk) : template.replace(/%s/g, chunk); }; }; };

	function _titleGenerator (options) {
	  if ( options === void 0 ) options = {};

	  var attribute = options.attribute;

	  /**
	   * Generates title output for the server
	   *
	   * @param  {'title'} type - the string "title"
	   * @param  {String} data - the title text
	   * @return {Object} - the title generator
	   */
	  return function titleGenerator (type, data) {
	    return {
	      text: function text () {
	        return String(data).trim() ? ("<" + type + " " + attribute + "=\"true\">" + data + "</" + type + ">") : ''
	      }
	    }
	  }
	}

	function _attrsGenerator (options) {
	  if ( options === void 0 ) options = {};

	  var attribute = options.attribute;

	  /**
	   * Generates tag attributes for use on the server.
	   *
	   * @param  {('bodyAttrs'|'htmlAttrs'|'headAttrs')} type - the type of attributes to generate
	   * @param  {Object} data - the attributes to generate
	   * @return {Object} - the attribute generator
	   */
	  return function attrsGenerator (type, data) {
	    return {
	      text: function text () {
	        var attributeStr = '';
	        var watchedAttrs = [];
	        for (var attr in data) {
	          if (data.hasOwnProperty(attr)) {
	            watchedAttrs.push(attr);
	            attributeStr += (typeof data[attr] !== 'undefined'
	                ? (attr + "=\"" + (data[attr]) + "\"")
	                : attr) + " ";
	          }
	        }
	        attributeStr += attribute + "=\"" + (watchedAttrs.join(',')) + "\"";
	        return attributeStr.trim()
	      }
	    }
	  }
	}

	function _tagGenerator (options) {
	  if ( options === void 0 ) options = {};

	  var attribute = options.attribute;

	  /**
	   * Generates meta, base, link, style, script, noscript tags for use on the server
	   *
	   * @param  {('meta'|'base'|'link'|'style'|'script'|'noscript')} the name of the tag
	   * @param  {(Array<Object>|Object)} tags - an array of tag objects or a single object in case of base
	   * @return {Object} - the tag generator
	   */
	  return function tagGenerator (type, tags) {
	    return {
	      text: function text (ref) {
	        if ( ref === void 0 ) ref = {};
	        var body = ref.body; if ( body === void 0 ) body = false;

	        // build a string containing all tags of this type
	        return tags.reduce(function (tagsStr, tag) {
	          if (Object.keys(tag).length === 0) { return tagsStr } // Bail on empty tag object
	          if (!!tag.body !== body) { return tagsStr }
	          // build a string containing all attributes of this tag
	          var attrs = Object.keys(tag).reduce(function (attrsStr, attr) {
	            switch (attr) {
	              // these attributes are treated as children on the tag
	              case 'innerHTML':
	              case 'cssText':
	              case 'once':
	                return attrsStr
	              // these form the attribute list for this tag
	              default:
	                if ([options.tagIDKeyName, 'body'].indexOf(attr) !== -1) {
	                  return (attrsStr + " data-" + attr + "=\"" + (tag[attr]) + "\"")
	                }
	                return typeof tag[attr] === 'undefined'
	                  ? (attrsStr + " " + attr)
	                  : (attrsStr + " " + attr + "=\"" + (tag[attr]) + "\"")
	            }
	          }, '').trim();

	          // grab child content from one of these attributes, if possible
	          var content = tag.innerHTML || tag.cssText || '';

	          // generate tag exactly without any other redundant attribute
	          var observeTag = tag.once
	            ? ''
	            : (attribute + "=\"true\" ");

	          // these tags have no end tag
	          var hasEndTag = ['base', 'meta', 'link'].indexOf(type) === -1;

	          // these tag types will have content inserted
	          var hasContent = hasEndTag && ['noscript', 'script', 'style'].indexOf(type) > -1;

	          // the final string for this specific tag
	          return !hasContent
	            ? (tagsStr + "<" + type + " " + observeTag + attrs + (hasEndTag ? '/' : '') + ">")
	            : (tagsStr + "<" + type + " " + observeTag + attrs + ">" + content + "</" + type + ">")
	        }, '')
	      }
	    }
	  }
	}

	function _generateServerInjector (options) {
	  if ( options === void 0 ) options = {};

	  /**
	   * Converts a meta info property to one that can be stringified on the server
	   *
	   * @param  {String} type - the type of data to convert
	   * @param  {(String|Object|Array<Object>)} data - the data value
	   * @return {Object} - the new injector
	   */
	  return function generateServerInjector (type, data) {
	    switch (type) {
	      case 'title':
	        return _titleGenerator(options)(type, data)
	      case 'htmlAttrs':
	      case 'bodyAttrs':
	      case 'headAttrs':
	        return _attrsGenerator(options)(type, data)
	      default:
	        return _tagGenerator(options)(type, data)
	    }
	  }
	}

	function _inject (options) {
	  if ( options === void 0 ) options = {};

	  /**
	   * Converts the state of the meta info object such that each item
	   * can be compiled to a tag string on the server
	   *
	   * @this {Object} - Vue instance - ideally the root component
	   * @return {Object} - server meta info with `toString` methods
	   */
	  return function inject () {
	    // get meta info with sensible defaults
	    var info = _getMetaInfo(options)(this.$root);

	    // generate server injectors
	    for (var key in info) {
	      if (info.hasOwnProperty(key) && key !== 'titleTemplate' && key !== 'titleChunk') {
	        info[key] = _generateServerInjector(options)(key, info[key]);
	      }
	    }

	    return info
	  }
	}

	function _updateTitle () {
	  /**
	   * Updates the document title
	   *
	   * @param  {String} title - the new title of the document
	   */
	  return function updateTitle (title) {
	    if ( title === void 0 ) title = document.title;

	    document.title = title;
	  }
	}

	function _updateTagAttributes (options) {
	  if ( options === void 0 ) options = {};

	  var attribute = options.attribute;

	  /**
	   * Updates the document's html tag attributes
	   *
	   * @param  {Object} attrs - the new document html attributes
	   * @param  {HTMLElement} tag - the HTMLElement tag to update with new attrs
	   */
	  return function updateTagAttributes (attrs, tag) {
	    var vueMetaAttrString = tag.getAttribute(attribute);
	    var vueMetaAttrs = vueMetaAttrString ? vueMetaAttrString.split(',') : [];
	    var toRemove = [].concat(vueMetaAttrs);
	    for (var attr in attrs) {
	      if (attrs.hasOwnProperty(attr)) {
	        var val = attrs[attr] || '';
	        tag.setAttribute(attr, val);
	        if (vueMetaAttrs.indexOf(attr) === -1) {
	          vueMetaAttrs.push(attr);
	        }
	        var saveIndex = toRemove.indexOf(attr);
	        if (saveIndex !== -1) {
	          toRemove.splice(saveIndex, 1);
	        }
	      }
	    }
	    var i = toRemove.length - 1;
	    for (; i >= 0; i--) {
	      tag.removeAttribute(toRemove[i]);
	    }
	    if (vueMetaAttrs.length === toRemove.length) {
	      tag.removeAttribute(attribute);
	    } else {
	      tag.setAttribute(attribute, vueMetaAttrs.join(','));
	    }
	  }
	}

	// borrow the slice method
	var toArray = Function.prototype.call.bind(Array.prototype.slice);

	function _updateTags (options) {
	  if ( options === void 0 ) options = {};

	  var attribute = options.attribute;

	  /**
	   * Updates meta tags inside <head> and <body> on the client. Borrowed from `react-helmet`:
	   * https://github.com/nfl/react-helmet/blob/004d448f8de5f823d10f838b02317521180f34da/src/Helmet.js#L195-L245
	   *
	   * @param  {('meta'|'base'|'link'|'style'|'script'|'noscript')} type - the name of the tag
	   * @param  {(Array<Object>|Object)} tags - an array of tag objects or a single object in case of base
	   * @return {Object} - a representation of what tags changed
	   */
	  return function updateTags (type, tags, headTag, bodyTag) {
	    var oldHeadTags = toArray(headTag.querySelectorAll((type + "[" + attribute + "]")));
	    var oldBodyTags = toArray(bodyTag.querySelectorAll((type + "[" + attribute + "][data-body=\"true\"]")));
	    var newTags = [];
	    var indexToDelete;

	    if (tags.length > 1) {
	      // remove duplicates that could have been found by merging tags
	      // which include a mixin with metaInfo and that mixin is used
	      // by multiple components on the same page
	      var found = [];
	      tags = tags.map(function (x) {
	        var k = JSON.stringify(x);
	        if (found.indexOf(k) < 0) {
	          found.push(k);
	          return x
	        }
	      }).filter(function (x) { return x; });
	    }

	    if (tags && tags.length) {
	      tags.forEach(function (tag) {
	        var newElement = document.createElement(type);
	        var oldTags = tag.body !== true ? oldHeadTags : oldBodyTags;

	        for (var attr in tag) {
	          if (tag.hasOwnProperty(attr)) {
	            if (attr === 'innerHTML') {
	              newElement.innerHTML = tag.innerHTML;
	            } else if (attr === 'cssText') {
	              if (newElement.styleSheet) {
	                newElement.styleSheet.cssText = tag.cssText;
	              } else {
	                newElement.appendChild(document.createTextNode(tag.cssText));
	              }
	            } else if ([options.tagIDKeyName, 'body'].indexOf(attr) !== -1) {
	              var _attr = "data-" + attr;
	              var value = (typeof tag[attr] === 'undefined') ? '' : tag[attr];
	              newElement.setAttribute(_attr, value);
	            } else {
	              var value$1 = (typeof tag[attr] === 'undefined') ? '' : tag[attr];
	              newElement.setAttribute(attr, value$1);
	            }
	          }
	        }

	        newElement.setAttribute(attribute, 'true');

	        // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
	        if (oldTags.some(function (existingTag, index) {
	          indexToDelete = index;
	          return newElement.isEqualNode(existingTag)
	        })) {
	          oldTags.splice(indexToDelete, 1);
	        } else {
	          newTags.push(newElement);
	        }
	      });
	    }
	    var oldTags = oldHeadTags.concat(oldBodyTags);
	    oldTags.forEach(function (tag) { return tag.parentNode.removeChild(tag); });
	    newTags.forEach(function (tag) {
	      if (tag.getAttribute('data-body') === 'true') {
	        bodyTag.appendChild(tag);
	      } else {
	        headTag.appendChild(tag);
	      }
	    });

	    return { oldTags: oldTags, newTags: newTags }
	  }
	}

	function _updateClientMetaInfo (options) {
	  if ( options === void 0 ) options = {};

	  var ssrAttribute = options.ssrAttribute;

	  /**
	   * Performs client-side updates when new meta info is received
	   *
	   * @param  {Object} newInfo - the meta info to update to
	   */
	  return function updateClientMetaInfo (newInfo) {
	    var htmlTag = document.getElementsByTagName('html')[0];
	    // if this is not a server render, then update
	    if (htmlTag.getAttribute(ssrAttribute) === null) {
	      // initialize tracked changes
	      var addedTags = {};
	      var removedTags = {};

	      Object.keys(newInfo).forEach(function (key) {
	        switch (key) {
	          // update the title
	          case 'title':
	            _updateTitle(options)(newInfo.title);
	            break
	          // update attributes
	          case 'htmlAttrs':
	            _updateTagAttributes(options)(newInfo[key], htmlTag);
	            break
	          case 'bodyAttrs':
	            _updateTagAttributes(options)(newInfo[key], document.getElementsByTagName('body')[0]);
	            break
	          case 'headAttrs':
	            _updateTagAttributes(options)(newInfo[key], document.getElementsByTagName('head')[0]);
	            break
	          // ignore these
	          case 'titleChunk':
	          case 'titleTemplate':
	          case 'changed':
	          case '__dangerouslyDisableSanitizers':
	            break
	          // catch-all update tags
	          default:
	            var headTag = document.getElementsByTagName('head')[0];
	            var bodyTag = document.getElementsByTagName('body')[0];
	            var ref = _updateTags(options)(key, newInfo[key], headTag, bodyTag);
	        var oldTags = ref.oldTags;
	        var newTags = ref.newTags;
	            if (newTags.length) {
	              addedTags[key] = newTags;
	              removedTags[key] = oldTags;
	            }
	        }
	      });

	      // emit "event" with new info
	      if (typeof newInfo.changed === 'function') {
	        newInfo.changed.call(this, newInfo, addedTags, removedTags);
	      }
	    } else {
	      // remove the server render attribute so we can update on changes
	      htmlTag.removeAttribute(ssrAttribute);
	    }
	  }
	}

	function _refresh (options) {
	  if ( options === void 0 ) options = {};

	  /**
	   * When called, will update the current meta info with new meta info.
	   * Useful when updating meta info as the result of an asynchronous
	   * action that resolves after the initial render takes place.
	   *
	   * Credit to [Sébastien Chopin](https://github.com/Atinux) for the suggestion
	   * to implement this method.
	   *
	   * @return {Object} - new meta info
	   */
	  return function refresh () {
	    var info = _getMetaInfo(options)(this.$root);
	    _updateClientMetaInfo(options).call(this, info);
	    return info
	  }
	}

	function _$meta (options) {
	  if ( options === void 0 ) options = {};

	  /**
	   * Returns an injector for server-side rendering.
	   * @this {Object} - the Vue instance (a root component)
	   * @return {Object} - injector
	   */
	  return function $meta () {
	    return {
	      inject: _inject(options).bind(this),
	      refresh: _refresh(options).bind(this)
	    }
	  }
	}

	// fallback to timers if rAF not present
	var stopUpdate = (typeof window !== 'undefined' ? window.cancelAnimationFrame : null) || clearTimeout;
	var startUpdate = (typeof window !== 'undefined' ? window.requestAnimationFrame : null) || (function (cb) { return setTimeout(cb, 0); });

	/**
	 * Performs a batched update. Uses requestAnimationFrame to prevent
	 * calling a function too many times in quick succession.
	 * You need to pass it an ID (which can initially be `null`),
	 * but be sure to overwrite that ID with the return value of batchUpdate.
	 *
	 * @param  {(null|Number)} id - the ID of this update
	 * @param  {Function} callback - the update to perform
	 * @return {Number} id - a new ID
	 */
	function batchUpdate (id, callback) {
	  stopUpdate(id);
	  return startUpdate(function () {
	    id = null;
	    callback();
	  })
	}

	/**
	 * These are constant variables used throughout the application.
	 */

	// This is the name of the component option that contains all the information that
	// gets converted to the various meta tags & attributes for the page.
	var VUE_META_KEY_NAME = 'metaInfo';

	// This is the attribute vue-meta augments on elements to know which it should
	// manage and which it should ignore.
	var VUE_META_ATTRIBUTE = 'data-vue-meta';

	// This is the attribute that goes on the `html` tag to inform `vue-meta`
	// that the server has already generated the meta tags for the initial render.
	var VUE_META_SERVER_RENDERED_ATTRIBUTE = 'data-vue-meta-server-rendered';

	// This is the property that tells vue-meta to overwrite (instead of append)
	// an item in a tag list. For example, if you have two `meta` tag list items
	// that both have `vmid` of "description", then vue-meta will overwrite the
	// shallowest one with the deepest one.
	var VUE_META_TAG_LIST_ID_KEY_NAME = 'vmid';

	// This is the key name for possible meta templates
	var VUE_META_TEMPLATE_KEY_NAME = 'template';

	// This is the key name for the content-holding property
	var VUE_META_CONTENT_KEY = 'content';

	// automatic install
	if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
	  Vue.use(VueMeta);
	}

	/**
	 * Plugin install function.
	 * @param {Function} Vue - the Vue constructor.
	 */
	function VueMeta (Vue, options) {
	  if ( options === void 0 ) options = {};

	  // set some default options
	  var defaultOptions = {
	    keyName: VUE_META_KEY_NAME,
	    contentKeyName: VUE_META_CONTENT_KEY,
	    metaTemplateKeyName: VUE_META_TEMPLATE_KEY_NAME,
	    attribute: VUE_META_ATTRIBUTE,
	    ssrAttribute: VUE_META_SERVER_RENDERED_ATTRIBUTE,
	    tagIDKeyName: VUE_META_TAG_LIST_ID_KEY_NAME
	  };
	  // combine options
	  options = objectAssign(defaultOptions, options);

	  // bind the $meta method to this component instance
	  Vue.prototype.$meta = _$meta(options);

	  // store an id to keep track of DOM updates
	  var batchID = null;

	  // watch for client side component updates
	  Vue.mixin({
	    beforeCreate: function beforeCreate () {
	      // Add a marker to know if it uses metaInfo
	      // _vnode is used to know that it's attached to a real component
	      // useful if we use some mixin to add some meta tags (like nuxt-i18n)
	      if (typeof this.$options[options.keyName] !== 'undefined') {
	        this._hasMetaInfo = true;
	      }
	      // coerce function-style metaInfo to a computed prop so we can observe
	      // it on creation
	      if (typeof this.$options[options.keyName] === 'function') {
	        if (typeof this.$options.computed === 'undefined') {
	          this.$options.computed = {};
	        }
	        this.$options.computed.$metaInfo = this.$options[options.keyName];
	      }
	    },
	    created: function created () {
	      var this$1 = this;

	      // if computed $metaInfo exists, watch it for updates & trigger a refresh
	      // when it changes (i.e. automatically handle async actions that affect metaInfo)
	      // credit for this suggestion goes to [Sébastien Chopin](https://github.com/Atinux)
	      if (!this.$isServer && this.$metaInfo) {
	        this.$watch('$metaInfo', function () {
	          // batch potential DOM updates to prevent extraneous re-rendering
	          batchID = batchUpdate(batchID, function () { return this$1.$meta().refresh(); });
	        });
	      }
	    },
	    activated: function activated () {
	      var this$1 = this;

	      if (this._hasMetaInfo) {
	        // batch potential DOM updates to prevent extraneous re-rendering
	        batchID = batchUpdate(batchID, function () { return this$1.$meta().refresh(); });
	      }
	    },
	    deactivated: function deactivated () {
	      var this$1 = this;

	      if (this._hasMetaInfo) {
	        // batch potential DOM updates to prevent extraneous re-rendering
	        batchID = batchUpdate(batchID, function () { return this$1.$meta().refresh(); });
	      }
	    },
	    beforeMount: function beforeMount () {
	      var this$1 = this;

	      // batch potential DOM updates to prevent extraneous re-rendering
	      if (this._hasMetaInfo) {
	        batchID = batchUpdate(batchID, function () { return this$1.$meta().refresh(); });
	      }
	    },
	    destroyed: function destroyed () {
	      var this$1 = this;

	      // do not trigger refresh on the server side
	      if (this.$isServer) { return }
	      // re-render meta data when returning from a child component to parent
	      if (this._hasMetaInfo) {
	        // Wait that element is hidden before refreshing meta tags (to support animations)
	        var interval = setInterval(function () {
	          if (this$1.$el && this$1.$el.offsetParent !== null) { return }
	          clearInterval(interval);
	          if (!this$1.$parent) { return }
	          batchID = batchUpdate(batchID, function () { return this$1.$meta().refresh(); });
	        }, 50);
	      }
	    }
	  });
	}

	var version = "1.6.0";

	VueMeta.version = version;

	return VueMeta;

}));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_error_index_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_post_detail_vue__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_static_index_vue__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__layouts_super_vue__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__layouts_default_vue__ = __webpack_require__(136);





/* harmony default export */ __webpack_exports__["a"] = ([
    // public page
    {
        path: "/",
        component: __WEBPACK_IMPORTED_MODULE_4__layouts_default_vue__["a" /* default */],
        children: [
            { path: "/", component: () => __webpack_require__.e/* import() */(2/* duplicate */).then(__webpack_require__.bind(null, 55)) },
            { path: "/posts", component: () => __webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, 12)) },
            {
                path: "/search",
                component: () => __webpack_require__.e/* import() */(4/* duplicate */).then(__webpack_require__.bind(null, 56))
            },
            {
                path: "/tag/:tag_name",
                component: () => __webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, 12))
            },
            {
                path: "/author/:username",
                props: true,
                component: () => __webpack_require__.e/* import() */(1/* duplicate */).then(__webpack_require__.bind(null, 17))
            },
            { path: "/post/:title", component: __WEBPACK_IMPORTED_MODULE_1__pages_post_detail_vue__["a" /* default */] },
            { path: "/static/:title", component: __WEBPACK_IMPORTED_MODULE_2__pages_static_index_vue__["a" /* default */] },
            {
                path: "/super",
                name: "super_login",
                component: () => __webpack_require__.e/* import() */(6).then(__webpack_require__.bind(null, 173))
            }
        ]
    },
    // super routes
    // super page auth
    // {
    //   path: "/",
    //   component: DefaultLayout,
    //   children: [
    //     { path: "/super", name: "super_post", component: () => import("./pages/auth/index.vue") }
    //   ]
    // },
    // super
    {
        path: "/super/*",
        component: __WEBPACK_IMPORTED_MODULE_3__layouts_super_vue__["a" /* default */],
        children: [
            {
                path: "/super/posts/new",
                name: "super_new_post",
                component: () => __webpack_require__.e/* import() */(3/* duplicate */).then(__webpack_require__.bind(null, 57))
            },
            {
                path: "/super/posts",
                name: "super_post",
                component: () => __webpack_require__.e/* import() */(5).then(__webpack_require__.bind(null, 174))
            },
            {
                path: "/super/post/:id",
                name: "super_post_detail",
                props: true,
                component: () => __webpack_require__.e/* import() */(3/* duplicate */).then(__webpack_require__.bind(null, 57))
            }
        ]
    },
    // lang routes
    {
        path: "/:lang",
        component: __WEBPACK_IMPORTED_MODULE_4__layouts_default_vue__["a" /* default */],
        children: [
            { path: "/:lang", component: () => __webpack_require__.e/* import() */(2/* duplicate */).then(__webpack_require__.bind(null, 55)) },
            {
                path: "/:lang/posts",
                component: () => __webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, 12))
            },
            {
                path: "/:lang/search",
                component: () => __webpack_require__.e/* import() */(4/* duplicate */).then(__webpack_require__.bind(null, 56))
            },
            {
                path: "/:lang/tag/:tag_name",
                props: true,
                component: () => __webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, 12))
            },
            { path: "/:lang/static/:title", component: __WEBPACK_IMPORTED_MODULE_2__pages_static_index_vue__["a" /* default */] },
            {
                path: "/:lang/author/:username",
                props: true,
                component: () => __webpack_require__.e/* import() */(1/* duplicate */).then(__webpack_require__.bind(null, 17))
            },
            {
                path: "/:lang/a/:username",
                props: true,
                component: () => __webpack_require__.e/* import() */(1/* duplicate */).then(__webpack_require__.bind(null, 17))
            },
            { path: "/:lang/post/:title", component: __WEBPACK_IMPORTED_MODULE_1__pages_post_detail_vue__["a" /* default */] },
            { path: "/:lang/static/:title", component: __WEBPACK_IMPORTED_MODULE_2__pages_static_index_vue__["a" /* default */] },
            { path: "*", component: __WEBPACK_IMPORTED_MODULE_0__pages_error_index_vue__["a" /* default */] }
        ]
    }
]);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(62);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("6ccda8bc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-bbfd5856\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-bbfd5856\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.error-page[data-v-bbfd5856] {\n  padding: 5em 0;\n  text-align: center;\n}\n.error-page h1[data-v-bbfd5856] {\n    font-size: 6em;\n    margin: 0;\n}\n.error-page .error-page-footer[data-v-bbfd5856] {\n    color: #484848;\n}\n.error-page .error-page-footer a[data-v-bbfd5856] {\n      color: #484848;\n}\n", ""]);

// exports


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_navbar_vue__ = __webpack_require__(21);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_17d26784_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_navbar_vue__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(65)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-17d26784"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_navbar_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_17d26784_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_navbar_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_17d26784_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_navbar_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/navbar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-17d26784", Component.options)
  } else {
    hotAPI.reload("data-v-17d26784", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("009c1ee0", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-17d26784\",\"scoped\":true,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./navbar.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-17d26784\",\"scoped\":true,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./navbar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\nnav[data-v-17d26784] {\n  background-color: #3498DB;\n  border-top: 1px solid #FFFFFF;\n  border-bottom: 1px solid #FFFFFF;\n}\nnav .fixed[data-v-17d26784] {\n    transition: all .5s ease;\n    position: fixed;\n    width: 100vw;\n    padding: .5em .5em;\n    background: #ffffffd9;\n    top: 0;\n    z-index: 5;\n}\nnav .fixed.hide[data-v-17d26784] {\n      top: -150px;\n}\nnav .fixed img.logo[data-v-17d26784] {\n      width: 150px;\n}\nnav ul.navbar[data-v-17d26784] {\n    margin: 0;\n    padding: 1em 0;\n    display: inline-flex;\n}\nnav ul.navbar li[data-v-17d26784] {\n      display: inline-block;\n      margin-right: 1em;\n      width: max-content;\n}\nnav ul.navbar li a[data-v-17d26784] {\n        transition: all .3s ease;\n        color: #FFFFFF;\n        text-decoration: none;\n        font-size: 1em;\n        letter-spacing: 1.5px;\n}\nnav ul.navbar li a[data-v-17d26784]:hover {\n          color: #b1b1b1;\n}\nnav .left[data-v-17d26784] {\n    overflow-x: auto;\n    display: inline-flex;\n    width: calc(100% - 35px);\n}\nnav .right[data-v-17d26784] {\n    display: inline-flex;\n    width: 35px;\n}\nnav ul.search[data-v-17d26784] {\n    margin: 0;\n    padding: .25em 0;\n}\nnav ul.search input[type='text'][data-v-17d26784] {\n      width: 100%;\n      background: transparent;\n      border: none;\n      padding: .8em 0;\n      color: #FFF;\n      font-size: 1em;\n}\nnav ul.search input[type='text'][data-v-17d26784]:focus {\n        outline: none;\n}\nnav ul.search input[type='text'][data-v-17d26784]::placeholder {\n        color: #FFF;\n}\n", ""]);

// exports


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("nav", [
    _c("div", { staticClass: "container-medium" }, [
      _vm.search === false
        ? _c("div", [
            _c("div", { staticClass: "left" }, [
              _c(
                "ul",
                { staticClass: "navbar" },
                _vm._l(_vm.popular_tags, function(n, key) {
                  return _c(
                    "li",
                    [
                      _c(
                        "router-link",
                        { key: key, attrs: { to: "/tag/" + n.toLowerCase() } },
                        [_vm._v(_vm._s(n.toUpperCase()))]
                      )
                    ],
                    1
                  )
                }),
                0
              )
            ]),
            _c("div", { staticClass: "right" }, [
              _c("a", {
                staticClass: "icono-search",
                staticStyle: {
                  "-webkit-transform": "scale(.8) rotate(40deg)",
                  "-ms-transform": "scale(.8) rotate(40deg)",
                  transform: "scale(.8) rotate(40deg)"
                },
                attrs: { href: "javascript:;" },
                on: { click: _vm.toggleSearch }
              })
            ])
          ])
        : _vm._e(),
      _vm.search === true
        ? _c("ul", { staticClass: "search" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.search_text,
                  expression: "search_text"
                }
              ],
              attrs: {
                id: "search-input",
                type: "text",
                placeholder: "search here..."
              },
              domProps: { value: _vm.search_text },
              on: {
                keydown: _vm.handleChangeSearch,
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.search_text = $event.target.value
                }
              }
            }),
            _c("a", {
              staticClass: "icono-cross",
              staticStyle: {
                position: "absolute",
                "margin-top": ".5em",
                transform: "translateX(-2em) rotate(45deg)"
              },
              attrs: { href: "javascript:;" },
              on: { click: _vm.toggleSearch }
            })
          ])
        : _vm._e()
    ]),
    _c(
      "div",
      { staticClass: "fixed", class: !_vm.show_navbar ? "hide" : "" },
      [
        _c("router-link", { attrs: { to: "/" } }, [
          _c("img", {
            staticClass: "logo",
            attrs: { src: "/images/logo-black-transparent-1.png" }
          })
        ])
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-17d26784", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container error-page" }, [
    _c("div", { staticClass: "grid" }, [
      _vm._m(0),
      _c(
        "div",
        { staticClass: "col-12 error-page-footer" },
        [
          _vm._v(" Are you lost ?"),
          _c("br"),
          _vm._v("Just click above link or "),
          _c("router-link", { attrs: { to: "/" } }, [_vm._v("back to home")])
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-12 error-page-details" }, [
      _c("h1", [_vm._v("404")]),
      _c("h2", [_vm._v("PAGE NOT FOUND")])
    ])
  }
]
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-bbfd5856", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_detail_vue__ = __webpack_require__(22);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0ed753ea_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_detail_vue__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(70)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_detail_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0ed753ea_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_detail_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0ed753ea_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_detail_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/pages/post/detail.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0ed753ea", Component.options)
  } else {
    hotAPI.reload("data-v-0ed753ea", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("22195c06", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./detail.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./detail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.post-detail h1 {\n  font-size: 3em;\n}\n.post-detail .post-detail-mainimage {\n  text-align: center;\n}\n.post-detail .post-detail-mainimage img {\n    max-width: 100%;\n}\n.post-detail .post-detail-video {\n  background: #000000;\n  margin-bottom: 50px;\n  padding: 0;\n  height: 500px;\n}\n.post-detail .post-detail-video iframe {\n    border: none;\n    margin: 0;\n    height: 100%;\n    width: -webkit-fill-available;\n    width: -moz-available;\n}\n.post-detail article.post-detail-content {\n  line-height: 1.8;\n  letter-spacing: .3px;\n  font-size: 1.1em;\n}\n.post-detail article.post-detail-content a {\n    color: #b1b1b1;\n    text-decoration: underline;\n    word-wrap: break-word;\n}\n.post-detail article.post-detail-content h2 {\n    margin-top: 50px;\n    border-top: 1px solid gray;\n    border-bottom: 1px solid gray;\n    padding: 10px;\n    text-align: center;\n}\n.post-detail article.post-detail-content h3 {\n    margin-top: 50px;\n}\n.post-detail article.post-detail-content img {\n    max-width: 100%;\n    text-align: center;\n    display: block;\n    margin: 2.5em auto;\n}\n.post-detail article.post-detail-content br {\n    display: block;\n    margin: 1em 0;\n}\n", ""]);

// exports


/***/ }),
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(80);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("a76ca698", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-67c7692d\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./box-title.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-67c7692d\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./box-title.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.box-title h2[data-v-67c7692d] {\n  margin: 0;\n  padding: 20px 0;\n  font-size: 20px;\n  border-bottom: 2px solid #f4f4f4;\n}\n", ""]);

// exports


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "box-title" }, [
    _c("h2", [_vm._v(_vm._s(_vm.text))])
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-67c7692d", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_RecommendedPostBlock_vue__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_RecommendedPostBlock_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_RecommendedPostBlock_vue__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1b9f0c54_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_RecommendedPostBlock_vue__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(83)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1b9f0c54"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_RecommendedPostBlock_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1b9f0c54_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_RecommendedPostBlock_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1b9f0c54_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_RecommendedPostBlock_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/v2/blocks/RecommendedPostBlock.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1b9f0c54", Component.options)
  } else {
    hotAPI.reload("data-v-1b9f0c54", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(84);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("127d4f50", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-1b9f0c54\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./RecommendedPostBlock.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-1b9f0c54\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./RecommendedPostBlock.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostVerySmallCard_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostVerySmallCard_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostVerySmallCard_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostVerySmallCard_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostVerySmallCard_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_87477da0_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_PostVerySmallCard_vue__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(86)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-87477da0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostVerySmallCard_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_87477da0_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_PostVerySmallCard_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_87477da0_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_PostVerySmallCard_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/v2/cards/PostVerySmallCard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-87477da0", Component.options)
  } else {
    hotAPI.reload("data-v-87477da0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(87);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("7087e112", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-87477da0\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PostVerySmallCard.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-87477da0\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PostVerySmallCard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.card-post-verysmall[data-v-87477da0] {\n  margin-bottom: 30px;\n  font-size: 14px;\n}\n.card-post-verysmall .card-post-small_thumb[data-v-87477da0] {\n    height: 150px;\n    background-size: cover;\n    background-position: center;\n}\n.card-post-verysmall h3[data-v-87477da0] {\n    color: #484848;\n    text-transform: capitalize;\n}\n", ""]);

// exports


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "router-link",
    {
      staticClass: "col-3_md-3_sm-6",
      attrs: { to: "/post/" + _vm.data.nospace_title + "-" + _vm.data._id }
    },
    [
      _c("div", { staticClass: "card-post-verysmall" }, [
        _c("div", {
          staticClass: "card-post-small_thumb",
          style: "background-image:url(" + _vm.data.image.small + ")"
        }),
        _c("h3", [_vm._v(_vm._s(_vm.data.title))]),
        _c("span", { staticClass: "meta" }, [
          _vm._v(
            "Posted " + _vm._s(_vm.epochToRelative(_vm.data.created_on || 0))
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-87477da0", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.data.result && _vm.data.result.length > 0
    ? _c(
        "div",
        { staticClass: "grid" },
        _vm._l(_vm.data.result, function(n, key) {
          return _c("post-card", { key: key, attrs: { data: n } })
        }),
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1b9f0c54", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_comment_vue__ = __webpack_require__(26);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5d72a306_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_comment_vue__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(91)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5d72a306"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_comment_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5d72a306_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_comment_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5d72a306_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_comment_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/boxs/comment.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d72a306", Component.options)
  } else {
    hotAPI.reload("data-v-5d72a306", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(92);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("667f6774", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-5d72a306\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./comment.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-5d72a306\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./comment.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "comment", attrs: { id: "comment" } }, [
      _c("h2", { staticClass: "title-menu" }, [_vm._v("Read Comments")]),
      _c("div", { attrs: { id: "disqus_thread" } })
    ])
  }
]
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5d72a306", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_post_meta_vue__ = __webpack_require__(27);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cda0030e_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_post_meta_vue__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(95)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-cda0030e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_post_meta_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cda0030e_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_post_meta_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cda0030e_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_post_meta_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/boxs/post-meta.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cda0030e", Component.options)
  } else {
    hotAPI.reload("data-v-cda0030e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(96);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("3e377e8c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-cda0030e\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./post-meta.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-cda0030e\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./post-meta.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.post-meta[data-v-cda0030e] {\n  color: #484848 !important;\n}\n.post-meta [class*=icono-][data-v-cda0030e] {\n    color: #484848 !important;\n    margin-right: 10px;\n    zoom: 0.8;\n}\n.post-meta img.avatar[data-v-cda0030e] {\n    width: 35px;\n    height: 35px;\n    border-radius: 35px;\n    margin-bottom: -12.5px;\n    margin-right: 5px;\n    margin-bottom: 5px;\n    float: left;\n}\n.post-meta .avatar-text[data-v-cda0030e] {\n    padding: 5px 0;\n}\n.post-meta .stats[data-v-cda0030e] {\n    padding: 15px 0 10px;\n}\n.post-meta .stats .stats-item[data-v-cda0030e] {\n      margin-right: 5px;\n}\n", ""]);

// exports


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "post-meta" },
    [
      _c(
        "router-link",
        { attrs: { to: "/author/" + _vm.data.author.username } },
        [
          _c("img", {
            staticClass: "avatar",
            attrs: { src: _vm.data.author.avatar.small, alt: "avatar user" }
          }),
          _c("div", { staticClass: "avatar-text" }, [
            _vm._v(
              "by\n" +
                _vm._s(_vm.toCamelCase(_vm.data.author.fullname)) +
                ", \nposted "
            ),
            _c("time", [
              _vm._v(_vm._s(_vm.epochToRelative(_vm.data.created_on)))
            ])
          ])
        ]
      ),
      _c("div", { staticClass: "stats" }, [
        _c("span", { staticClass: "stats-item" }, [
          _c(
            "a",
            {
              attrs: { href: "javascript:;" },
              on: { click: _vm.viewComments }
            },
            [
              _c("span", { staticClass: "icono-commentEmpty" }),
              _c(
                "span",
                {
                  staticClass: "disqus-comment-count",
                  attrs: {
                    "data-disqus-identifier":
                      "https://yussanacademy.com" + _vm.link,
                    "data-disqus-url": "https://yussanacademy.com" + _vm.link
                  }
                },
                [_vm._v("0")]
              ),
              _vm._v(" ")
            ]
          )
        ]),
        _c("span", { staticClass: "stats-item" }, [
          _c("span", { staticClass: "icono-eye" }),
          _vm._v(_vm._s(_vm.data.views || 0) + " ")
        ]),
        typeof _vm.data.tags === "object" && _vm.data.tags.length > 0
          ? _c(
              "span",
              { staticClass: "stats-item" },
              [
                _c("span", { staticClass: "icono-tag" }),
                _vm._l(_vm.data.tags, function(tag, key) {
                  return _c(
                    "span",
                    { key: key },
                    [
                      _c("router-link", { attrs: { to: "/tag/" + tag } }, [
                        _vm._v(_vm._s(tag))
                      ]),
                      _vm._v(_vm._s(key < _vm.data.tags.length - 1 ? ", " : ""))
                    ],
                    1
                  )
                })
              ],
              2
            )
          : _vm._e(),
        _c(
          "span",
          { staticClass: "stats-item" },
          [
            _c(
              "router-link",
              { attrs: { to: _vm.data.lang == "id" ? "/id" : "/en" } },
              [
                _c("span", { staticClass: "icono-flag" }),
                _vm._v(
                  _vm._s(_vm.data.lang == "id" ? "Bahasa Indonesia" : "English")
                )
              ]
            )
          ],
          1
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-cda0030e", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_post_vue__ = __webpack_require__(28);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2d4fb409_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_post_vue__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(99)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_post_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2d4fb409_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_post_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2d4fb409_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_post_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/boxs/post.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2d4fb409", Component.options)
  } else {
    hotAPI.reload("data-v-2d4fb409", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(100);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("3301ca3c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./post.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./post.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_post_vue__ = __webpack_require__(29);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4038defa_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_post_vue__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(102)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4038defa"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_post_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4038defa_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_post_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4038defa_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_post_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/cards/post.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4038defa", Component.options)
  } else {
    hotAPI.reload("data-v-4038defa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(103);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("6e4ca9c8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-4038defa\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./post.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-4038defa\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./post.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.card-post[data-v-4038defa] {\n  border-top: 1px solid #b1b1b1;\n  padding: 0 0 1em 0;\n  display: inline-flex;\n  padding-bottom: 0;\n  margin-bottom: 1em;\n}\n.card-post a.link-thumb[data-v-4038defa] {\n    display: block;\n    position: relative;\n}\n.card-post .thumb img[data-v-4038defa] {\n    width: 300px;\n}\n.card-post .title[data-v-4038defa] {\n    line-height: 1.5;\n    padding: 1em;\n    text-transform: capitalize;\n    text-decoration: none;\n}\n.card-post .title a[data-v-4038defa] {\n      font-size: 1.5em;\n      font-weight: bold;\n      color: #2d2d2d;\n}\n.card-post .title .meta[data-v-4038defa] {\n      font-size: 1em;\n      color: #545454;\n}\n.card-post .title .meta a[data-v-4038defa] {\n        font-size: 1em;\n        color: #545454;\n}\n.card-post .title .avatar[data-v-4038defa] {\n      margin-top: 20px;\n}\n.card-post .title .avatar img[data-v-4038defa] {\n        width: 20px;\n        height: 20px;\n        border-radius: 100%;\n        float: left;\n}\n.card-post .title .avatar span.text[data-v-4038defa] {\n        font-size: 14px;\n        font-weight: initial;\n        color: gray;\n        margin-left: 8px;\n        margin-top: 0;\n        float: left;\n}\n@media screen and (max-width: 600px) {\n.card-post[data-v-4038defa] {\n    display: block;\n}\n.card-post .thumb img[data-v-4038defa] {\n      width: 100%;\n}\n}\n", ""]);

// exports


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BtnVideoPlay_vue__ = __webpack_require__(30);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f7ef4f22_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_BtnVideoPlay_vue__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(105)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f7ef4f22"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_BtnVideoPlay_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f7ef4f22_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_BtnVideoPlay_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f7ef4f22_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_BtnVideoPlay_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/buttons/BtnVideoPlay.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f7ef4f22", Component.options)
  } else {
    hotAPI.reload("data-v-f7ef4f22", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(106);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("17f17fba", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-f7ef4f22\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BtnVideoPlay.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-f7ef4f22\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BtnVideoPlay.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.btn-play[data-v-f7ef4f22] {\n  position: absolute;\n  top: 50%;\n  padding: 4px 8px 4px;\n  background: #484848;\n  border-radius: 8px;\n  width: 40px;\n  height: 32px;\n  text-align: center;\n  left: 50%;\n  margin-left: -26px;\n  margin-top: -29px;\n  cursor: pointer;\n  transition: background .5s ease;\n}\n.btn-play.big[data-v-f7ef4f22] {\n    padding: 20px 50px 20px;\n    width: 30px;\n    height: 40px;\n    margin-left: -60px;\n    margin-top: -40px;\n}\n.btn-play.big .icono-play[data-v-f7ef4f22] {\n      transform: scale(2);\n}\n.btn-play[data-v-f7ef4f22]:hover {\n    background: #3498DB;\n}\n", ""]);

// exports


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    { staticClass: "btn-play", class: _vm.size === "big" ? "big" : "" },
    [_c("i", { staticClass: "icono-play" })]
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f7ef4f22", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "col-12 card-post" }, [
    _c(
      "div",
      { staticClass: "thumb" },
      [
        _c(
          "router-link",
          {
            staticClass: "link-thumb",
            attrs: {
              to: "/post/" + _vm.data.nospace_title + "-" + _vm.data._id
            }
          },
          [
            _vm.data.video ? _c("BtnPlay") : _vm._e(),
            _c("img", {
              attrs: { src: _vm.data.image["600"], alt: _vm.data.title }
            })
          ],
          1
        )
      ],
      1
    ),
    _c(
      "div",
      { staticClass: "title" },
      [
        _c(
          "router-link",
          {
            staticClass: "p-b-10",
            staticStyle: { display: "block" },
            attrs: {
              to: "/post/" + _vm.data.nospace_title + "-" + _vm.data._id
            }
          },
          [_vm._v(_vm._s(_vm.data.title))]
        ),
        _c("div", { staticClass: "meta" }, [
          _vm._v(
            " updated " +
              _vm._s(_vm.epochToRelative(_vm.data.updated_on || 0)) +
              "\n| \n" +
              _vm._s(_vm.data.views || 0) +
              " Views\n| \n" +
              _vm._s(_vm.data.comments || 0) +
              " Comments\n| \n" +
              _vm._s(_vm.data.lang == "id" ? "Bahasa Indonesia" : "English")
          )
        ]),
        _c(
          "div",
          { staticClass: "avatar" },
          [
            _c(
              "router-link",
              { attrs: { to: "/author/" + _vm.data.author.username } },
              [
                _c("img", { attrs: { src: _vm.data.author.avatar.small } }),
                _c("span", { staticClass: "text" }, [
                  _vm._v(_vm._s(_vm.data.author.username))
                ])
              ]
            )
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4038defa", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(110);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("23855a3c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.preloader-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px 0;\n  height: 150px;\n  width: 100%;\n}\n.dot {\n  display: inline-block;\n  background: #666;\n  height: 8px;\n  width: 8px;\n  opacity: 0.3;\n  border-radius: 50%;\n  animation: moveit 1.8s infinite;\n  padding: 5px;\n  margin: 1px;\n}\n.dot:nth-child(2) {\n    animation-delay: .15s;\n}\n.dot:nth-child(3) {\n    animation-delay: .3s;\n}\n.dot:nth-child(4) {\n    animation-delay: .45s;\n}\n.dot:nth-child(5) {\n    animation-delay: .6s;\n}\n@keyframes moveit {\n0% {\n    transform: translateY(0px);\n}\n35% {\n    transform: translateY(0px);\n    opacity: 0.3;\n}\n50% {\n    transform: translateY(-20px);\n    opacity: 0.8;\n}\n70% {\n    transform: translateY(3px);\n    opacity: 0.8;\n}\n85% {\n    transform: translateY(-3px);\n}\n}\n\n/* Preloader #2 */\n.preloader-squares {\n  width: 50px;\n  line-height: 19px;\n  height: 50px;\n}\n.preloader-squares .square {\n    display: inline-block;\n    width: 15px;\n    height: 15px;\n    background: #666;\n    opacity: 0.2;\n    animation: movein 2s infinite;\n}\n.square {\n  opacity: 0.5;\n}\n.preloader-squares .square:nth-child(1) {\n  transform: translate(0, -25px);\n}\n.preloader-squares .square:nth-child(2) {\n  transform: translate(25px, 0);\n}\n.preloader-squares .square:nth-child(3) {\n  transform: translate(-25px, 0);\n}\n.preloader-squares .square:nth-child(4) {\n  transform: translate(0, 25px);\n}\n@keyframes movein {\n33% {\n    transform: translate(0, 0);\n    opacity: 0.7;\n}\n66% {\n    transform: translate(0, 0);\n    opacity: 0.7;\n}\n}\n\n/*Preloader #3 */\n.pulse-center {\n  background: #666;\n  width: 15px;\n  height: 15px;\n  border-radius: 50%;\n  animation: pulse 1.5s infinite;\n  position: absolute;\n  opacity: 0.8;\n  z-index: 5;\n}\n.pulse-explosion {\n  content: '';\n  width: 15px;\n  height: 15px;\n  background: #ccc;\n  border-radius: 50%;\n  position: absolute;\n  animation: pulse-radius 1.5s infinite;\n  z-index: 1;\n}\n@keyframes pulse {\n30% {\n    transform: scale(0.7);\n    opacity: 0.8;\n}\n50% {\n    transform: scale(1.1);\n    opacity: 1.0;\n}\n70% {\n    transform: scale(0.8);\n    opacity: 0.8;\n}\n}\n@keyframes pulse-radius {\n30% {\n    transform: scale(0.7);\n    opacity: 1;\n}\n40% {\n    transform: scale(7.8);\n    opacity: 0.1;\n}\n80% {\n    transform: scale(4.8);\n    opacity: 0;\n}\n100% {\n    transform: scale(1);\n    opacity: 0;\n}\n}\n\n/*Preloader #4 */\n.preloader-chasing-squares {\n  width: 50px;\n  height: 50px;\n  line-height: 19px;\n}\n.preloader-chasing-squares .square {\n    display: inline-block;\n    width: 15px;\n    height: 15px;\n    opacity: 1;\n    background: #666;\n    animation: focusfade 2.8s infinite;\n}\n.preloader-chasing-squares .square:nth-child(2) {\n      animation-delay: .7s;\n}\n.preloader-chasing-squares .square:nth-child(3) {\n      animation-delay: 2.1s;\n}\n.preloader-chasing-squares .square:nth-child(4) {\n      animation-delay: 1.4s;\n}\n@keyframes focusfade {\n0% {\n    opacity: 0.5;\n    background: #000;\n}\n30% {\n    opacity: 0.5;\n    background: #666;\n}\n60% {\n    opacity: 0;\n}\n75% {\n    opacity: 0;\n}\n100% {\n    opacity: 0.5;\n    background: #000;\n}\n}\n\n/* preloader 5 */\n.preloader-dotline .dot {\n  display: inline-block;\n  background: #666;\n  height: 5px;\n  width: 5px;\n  opacity: 0;\n  border-radius: 50%;\n  animation: dotline-move 4s infinite;\n  transform: translateX(-300px);\n}\n.preloader-dotline .dot:nth-child(1) {\n    animation-delay: .8s;\n}\n.preloader-dotline .dot:nth-child(2) {\n    animation-delay: .7s;\n}\n.preloader-dotline .dot:nth-child(3) {\n    animation-delay: .6s;\n}\n.preloader-dotline .dot:nth-child(4) {\n    animation-delay: .5s;\n}\n.preloader-dotline .dot:nth-child(5) {\n    animation-delay: .4s;\n}\n.preloader-dotline .dot:nth-child(6) {\n    animation-delay: .3s;\n}\n.preloader-dotline .dot:nth-child(7) {\n    animation-delay: .2s;\n}\n.preloader-dotline .dot:nth-child(8) {\n    animation-delay: .1s;\n}\n@keyframes dotline-move {\n40% {\n    transform: translateX(0px);\n    opacity: 0.8;\n}\n100% {\n    transform: translateX(300px);\n    opacity: 0;\n}\n}\n\n/* preloader pacman */\n.preloader-pacman .dot {\n  display: inline-block;\n  background: #666;\n  height: 5px;\n  width: 5px;\n  margin-right: 20px;\n  opacity: 0.7;\n  border-radius: 50%;\n  animation: fade-out 14s linear infinite;\n}\n.preloader-pacman .pacman {\n  display: inline-block;\n  background: #666;\n  height: 20px;\n  vertical-align: bottom;\n  width: 20px;\n  margin-right: 20px;\n  opacity: 1;\n  border-radius: 50%;\n  position: relative;\n  animation: move-forward 14s linear infinite;\n  transform: translateX(-40px);\n}\n.preloader-pacman .dot:nth-child(1) {\n  animation-delay: .4s;\n}\n.preloader-pacman .dot:nth-child(2) {\n  animation-delay: .8s;\n}\n.preloader-pacman .dot:nth-child(3) {\n  animation-delay: 1.2s;\n}\n.preloader-pacman .dot:nth-child(4) {\n  animation-delay: 1.6s;\n}\n.preloader-pacman .dot:nth-child(5) {\n  animation-delay: 2.0s;\n}\n.preloader-pacman .dot:nth-child(6) {\n  animation-delay: 2.4s;\n}\n.preloader-pacman .dot:nth-child(7) {\n  animation-delay: 2.8s;\n}\n.preloader-pacman .dot:nth-child(8) {\n  animation-delay: 3.2s;\n}\n.preloader-pacman .dot:nth-child(9) {\n  animation-delay: 3.6s;\n}\n.preloader-pacman .dot:nth-child(10) {\n  animation-delay: 4.0s;\n}\n.preloader-pacman .dot:nth-child(11) {\n  animation-delay: 4.4s;\n}\n.preloader-pacman .dot:nth-child(12) {\n  animation-delay: 4.8s;\n}\n.preloader-pacman .dot:nth-child(13) {\n  animation-delay: 5.2s;\n}\n.preloader-pacman .dot:nth-child(14) {\n  animation-delay: 5.6s;\n}\n.preloader-pacman .dot:nth-child(15) {\n  animation-delay: 6.0s;\n}\n.preloader-pacman .dot:nth-child(16) {\n  animation-delay: 6.4s;\n}\n.preloader-pacman .dot:nth-child(17) {\n  animation-delay: 6.8s;\n}\n.preloader-pacman .pacman:before {\n  content: '';\n  display: inline-block;\n  background: transparent;\n  vertical-align: bottom;\n  border-top: 10px solid transparent;\n  border-bottom: 10px solid transparent;\n  right: 0px;\n  border-right: 10px solid #fff;\n  opacity: 1;\n  position: absolute;\n  animation: eat .4s infinite;\n}\n.preloader-pacman .ghost {\n  height: 25px;\n  width: 25px;\n  background: #669;\n  top: -22px;\n  border-top-left-radius: 50%;\n  border-top-right-radius: 50%;\n  position: relative;\n  transform: translateX(550px);\n  animation: move-back 14s linear infinite;\n  animation-delay: 7s;\n  opacity: 0;\n}\n.preloader-pacman .ghost:before {\n    height: 5px;\n    content: '';\n    width: 3px;\n    background: #fff;\n    top: 7px;\n    left: 7px;\n    z-index: 10;\n    position: absolute;\n}\n.preloader-pacman .ghost:after {\n    height: 5px;\n    content: '';\n    width: 3px;\n    background: #fff;\n    top: 7px;\n    right: 7px;\n    z-index: 10;\n    position: absolute;\n}\n@keyframes eat {\n50% {\n    transform: translateX(10px) scale(0.1);\n}\n}\n@keyframes move-back {\n3% {\n    opacity: 1;\n}\n35% {\n    opacity: 1;\n}\n49% {\n    opacity: 0;\n}\n50% {\n    transform: translateX(0px);\n}\n}\n@keyframes move-forward {\n50% {\n    transform: translateX(500px);\n}\n50.1% {\n    transform: translateX(500px) scaleX(-1);\n    opacity: 1;\n}\n100% {\n    transform: translateX(-40px) scaleX(-1);\n}\n}\n@keyframes fade-out {\n0% {\n    opacity: 0;\n}\n40% {\n    opacity: 0;\n}\n89.99% {\n    opacity: 0;\n}\n90% {\n    opacity: 0.5;\n}\n}\n", ""]);

// exports


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "preloader-container" }, [
      _c("div", { staticClass: "dot" }),
      _c("div", { staticClass: "dot" }),
      _c("div", { staticClass: "dot" }),
      _c("div", { staticClass: "dot" }),
      _c("div", { staticClass: "dot" })
    ])
  }
]
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-44d86f85", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "box-post" },
    [
      _vm.data.result && _vm.data.result.length > 0
        ? _c(
            "div",
            { staticClass: "grid" },
            _vm._l(_vm.data.result, function(n, key) {
              return _c("post-card", { key: key, attrs: { data: n } })
            }),
            1
          )
        : _vm._e(),
      _vm.data.status && _vm.data.status !== 200
        ? _c("p", { staticClass: "align-center text-muted" }, [
            _vm._v(_vm._s(_vm.data.message || "Post not available"))
          ])
        : _vm._e(),
      !_vm.data.status || _vm.data.loading ? _c("loader") : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2d4fb409", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return typeof _vm.post.detail[_vm.id] !== "undefined"
    ? _c("div", [
        _c("div", { staticClass: "m-t-30" }),
        _vm.post.detail[_vm.id].status === 200
          ? _c("div", [
              _c("div", { staticClass: "post-detail bg-white" }, [
                _c("div", { staticClass: "container" }, [
                  _c("div", { staticClass: "grid" }, [
                    _c(
                      "div",
                      {
                        staticClass: "col-8_md-12",
                        attrs: { "data-push-left": "off-2_md-0" }
                      },
                      [
                        _c("h1", [
                          _vm._v(
                            _vm._s(
                              _vm.toCamelCase(_vm.post.detail[_vm.id].title)
                            )
                          )
                        ]),
                        _c("box-meta", {
                          attrs: {
                            data: _vm.post.detail[_vm.id],
                            link: _vm.link
                          }
                        })
                      ],
                      1
                    )
                  ]),
                  _c("div", { staticClass: "grid" }, [
                    _c(
                      "div",
                      {
                        staticClass: "col-8_md-12",
                        attrs: { "data-push-left": "off-2_md-0" }
                      },
                      [
                        _vm.post.detail[_vm.id].app._id
                          ? _c("app-card", {
                              attrs: {
                                data: _vm.post.detail[_vm.id],
                                app: _vm.post.detail[_vm.id].app
                              }
                            })
                          : _vm._e()
                      ],
                      1
                    )
                  ]),
                  _c("div", { staticClass: "grid" }, [
                    _c("div", { staticClass: "col-12 post-detail-mainimage" }, [
                      _c("div", { staticClass: "m-t-50" }),
                      _vm.post.detail[_vm.id].video
                        ? _c("div", { staticClass: "post-detail-video" }, [
                            _c("iframe", {
                              attrs: { src: _vm.post.detail[_vm.id].video }
                            })
                          ])
                        : _vm._e(),
                      !_vm.post.detail[_vm.id].video
                        ? _c("img", {
                            attrs: {
                              src: _vm.post.detail[_vm.id].image.original
                            }
                          })
                        : _vm._e()
                    ]),
                    _c(
                      "div",
                      {
                        staticClass: "col-8_md-12",
                        attrs: { "data-push-left": "off-2_md-0" }
                      },
                      [
                        _c("div", { staticClass: "m-t-50" }),
                        _c("article", { staticClass: "post-detail-content" }, [
                          _c("div", {
                            domProps: {
                              innerHTML: _vm._s(_vm.post.detail[_vm.id].content)
                            }
                          })
                        ])
                      ]
                    )
                  ]),
                  _c("div", { staticClass: "grid" }, [
                    _c(
                      "div",
                      {
                        staticClass: "col-8_md-12",
                        attrs: { "data-push-left": "off-2_md-0" }
                      },
                      [
                        _c("div", { staticClass: "m-t-50" }),
                        _c("comment", { attrs: { link: _vm.link } })
                      ],
                      1
                    )
                  ]),
                  _c("div", { staticClass: "grid p-t-2" }, [
                    _c(
                      "div",
                      { staticClass: "col-12" },
                      [
                        _c("box-title", {
                          attrs: { text: "Recommended Content" }
                        }),
                        _c("div", { staticClass: "p-t-2" }),
                        _c("box-post", {
                          attrs: { data: _vm.post.list.latest_detail || {} }
                        })
                      ],
                      1
                    )
                  ])
                ])
              ])
            ])
          : _c(
              "div",
              [_c("div", { staticClass: "m-t-30" }), _c("error-box")],
              1
            )
      ])
    : _c("div", [_c("div", { staticClass: "m-t-30" }), _c("loader")], 1)
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0ed753ea", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(32);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6d53d4d2_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(115)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6d53d4d2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6d53d4d2_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6d53d4d2_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/pages/static/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6d53d4d2", Component.options)
  } else {
    hotAPI.reload("data-v-6d53d4d2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(116);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("c1d3db7c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-6d53d4d2\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-6d53d4d2\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.static h1[data-v-6d53d4d2] {\n  font-size: 3em;\n}\n.static img[data-v-6d53d4d2] {\n  padding: 1em 0;\n  max-width: 100%;\n  text-align: center;\n}\n.static article[data-v-6d53d4d2] {\n  line-height: 1.8;\n  letter-spacing: .3px;\n  font-size: 1.1em;\n}\n.static article br[data-v-6d53d4d2] {\n    display: block;\n    margin: 1em 0;\n}\n", ""]);

// exports


/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getData;
const static_data = [
    {
        index: "about",
        created_at: 1530193444,
        title: "about",
        image: "",
        html: '<p>Yussan Academy is a research and development division of Yussan Media Group. We are here discussing the latest technologies, what they are and how to start learning them. We also have several categories of posts that specifically discuss some of the source code on Github, available extensions, what are the advantages and disadvantages, and are they suitable for use. You also visit our <a href="https://www.youtube.com/channel/UCKLQUv8n3OadK5mkYpmZiyA" target="_blank">Youtube channel </a> , to see the video version of several posts here.</p>'
    },
    {
        index: "terms-conditions",
        created_at: 1530193444,
        title: "terms and conditions",
        image: "",
        html: "<h4>content</h4><p>content created in Yussan Academy is 100% made from Yussan Academy authors. Written by experience after the use of the software in a few days. The posted images are the result of screenshots and some digital editing to produce images that interest the reader. If there is content that we collect from sources outside of Oopsreview, we will include links and source references from the content.&nbsp;we will not publish software that smells pornography, SARA or software that is private.</p><p>&nbsp;</p>"
    },
    {
        index: "privacy-policy",
        created_at: 1530193444,
        title: "privacy policy",
        image: "",
        html: "<h4>last update 13 Juli 2018</h4><p>Oopsreview&nbsp;currently does not require any data from users, be it personal data or use of cookies. Thank you for your attention.</p>"
    }
];
function getData(index) {
    let data;
    static_data.map((n) => {
        if (n.index === index) {
            data = n;
        }
    });
    return data;
}


/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return typeof _vm.content !== "undefined"
    ? _c("div", { staticClass: "static bg-white" }, [
        _c("div", { staticClass: "container" }, [
          _c("div", { staticClass: "grid-center" }, [
            _c("div", { staticClass: "col-6_md-12" }, [
              _c("h1", [_vm._v(_vm._s(_vm.toCamelCase(_vm.content.title)))]),
              _c("p", [
                _vm._v(
                  "Published " +
                    _vm._s(_vm.epochToRelative(_vm.content.created_at))
                )
              ])
            ])
          ]),
          _c("div", { staticClass: "grid-center" }, [
            _c("div", { staticClass: "col-6_md-12" }, [
              _c("article", [
                _c("img", {
                  attrs: {
                    src:
                      _vm.content.image ||
                      "https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_800/v1538301459/github/Screen_Shot_2018-09-30_at_16.52.32.png"
                  }
                }),
                _c("article", {
                  domProps: { innerHTML: _vm._s(_vm.content.html) }
                })
              ])
            ])
          ])
        ])
      ])
    : _c("error-box", {
        attrs: { error_code: "400", error_message: "Content Not Found" }
      })
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6d53d4d2", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_super_vue__ = __webpack_require__(35);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21b3a7ec_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_super_vue__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(120)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_super_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21b3a7ec_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_super_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_21b3a7ec_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_super_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/layouts/super.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-21b3a7ec", Component.options)
  } else {
    hotAPI.reload("data-v-21b3a7ec", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(121);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("5ae06752", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./super.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./super.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports
exports.i(__webpack_require__(33), "");
exports.i(__webpack_require__(34), "");

// module
exports.push([module.i, "\nhtml, body {\n  margin: 0;\n  padding: 0;\n  font-family: Ubuntu, sans-serif;\n}\na {\n  text-decoration: none;\n}\n.container, .container-medium {\n  margin: 0 auto;\n}\n.grid, .grid-center {\n  margin: 0 !important;\n}\n.title-menu {\n  font-size: 1.5em;\n  font-weight: 300;\n  text-transform: uppercase;\n}\n.bg-black {\n  background-color: #000000;\n  color: #FFFFFF;\n}\n.bg-black a {\n    color: #FFFFFF;\n}\n.bg-soft-gray {\n  background-color: #f4f4f4;\n}\n.bg-white {\n  background-color: #FFFFFF;\n  color: #484848;\n}\n.bg-white a {\n    color: #545454;\n}\n.align-center {\n  text-align: center;\n}\n.m-b-50 {\n  margin-bottom: 50px !important;\n}\n.p-b-10 {\n  padding-bottom: 10px;\n}\n.p-t-2 {\n  padding-top: 2em !important;\n}\n.p-0 {\n  padding: 0 !important;\n}\n\n/* Large desktop */\n@media (min-width: 1200px) {\n.container {\n    width: 1200px;\n}\n.container-medium {\n    width: 900px;\n}\n}\n\n/* Portrait tablet to landscape and desktop */\n@media (min-width: 768px) and (max-width: 979px) {\n.container, .container-medium {\n    width: 768px;\n}\n}\n\n/* Landscape phone to portrait tablet */\n@media (max-width: 767px) {\n.container, .container-medium {\n    width: 100%;\n}\n}\n\n/* Landscape phones and down */\n@media (max-width: 480px) {\n.container, .container-medium {\n    width: 100%;\n}\n}\n.disabled {\n  opacity: 0.5;\n  pointer-events: none;\n  filter: blur(2px);\n}\n", ""]);

// exports


/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_super_sidebar_vue__ = __webpack_require__(36);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4dd5f64c_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_super_sidebar_vue__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(123)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_super_sidebar_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4dd5f64c_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_super_sidebar_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4dd5f64c_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_super_sidebar_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/super-sidebar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4dd5f64c", Component.options)
  } else {
    hotAPI.reload("data-v-4dd5f64c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(124);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("5402825a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./super-sidebar.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./super-sidebar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.super-sidebar {\n  color: #FFFFFF;\n}\n.super-sidebar ul {\n    margin: 0;\n    padding: 0;\n}\n.super-sidebar ul li {\n      transition: all .5s ease;\n      list-style: none;\n}\n.super-sidebar ul li.active {\n        background-color: #f4f4f4;\n}\n.super-sidebar ul li:hover {\n        background-color: #f4f4f4;\n        cursor: pointer;\n}\n.super-sidebar a {\n    display: block;\n    padding: 1em .5em;\n    color: #545454;\n}\n.super-sidebar .divider {\n    border-top: 1px solid #b1b1b1;\n}\n", ""]);

// exports


/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "super-sidebar" }, [
    _c("ul", [
      _c(
        "li",
        { class: _vm.$route.name === "new_post" ? "active" : "" },
        [
          _c("router-link", { attrs: { to: "/super/posts/new" } }, [
            _vm._v("+ New Post")
          ])
        ],
        1
      ),
      _c(
        "li",
        { class: _vm.$route.name === "post" ? "active" : "" },
        [
          _c("router-link", { attrs: { to: "/super/posts" } }, [
            _vm._v("Posts")
          ])
        ],
        1
      ),
      _c(
        "li",
        { class: _vm.$route.name === "team" ? "active" : "" },
        [_c("router-link", { attrs: { to: "/super/team" } }, [_vm._v("Team")])],
        1
      )
    ]),
    _c("div", { staticClass: "divider" }),
    _c("ul", [
      _c("li", [
        _c(
          "a",
          {
            attrs: { href: "javascript:;" },
            on: {
              click: function($event) {
                return _vm.handleLogout()
              }
            }
          },
          [_vm._v("logout")]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4dd5f64c", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(127);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("4a8e268d", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-6941a864\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./header.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-6941a864\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./header.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\nheader[data-v-6941a864] {\n  background: #fff;\n  padding: 4em 0;\n}\nheader.small[data-v-6941a864] {\n    padding: 1em 0;\n}\nheader.small img.logo[data-v-6941a864] {\n      height: 80px;\n}\nheader img.logo[data-v-6941a864] {\n    max-width: 100%;\n    height: 80px;\n}\n@media screen and (max-width: 600px) {\nheader[data-v-6941a864] {\n    padding: 1em;\n}\nheader img.logo[data-v-6941a864] {\n      height: 50px;\n}\n}\n", ""]);

// exports


/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("header", { class: _vm.size == "small" ? "small" : "" }, [
    _c("div", { staticClass: "container-medium" }, [
      _c("div", { staticClass: "grid-noGutter" }, [
        _c(
          "div",
          { staticClass: "col align-center" },
          [
            _c("router-link", { attrs: { to: "/" } }, [
              _c("img", {
                staticClass: "logo",
                attrs: { id: "logo", src: "/images/logo-wide-2.1.png" }
              })
            ])
          ],
          1
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6941a864", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(130);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("11c4a692", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-5564a849\",\"scoped\":true,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./footer.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-5564a849\",\"scoped\":true,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./footer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\nfooter[data-v-5564a849] {\n  padding: 3em 0 2em;\n  background-color: #f4f4f4;\n  color: #545454;\n  font-weight: 300;\n  line-height: 1.6;\n  font-size: 13px;\n}\nfooter a[data-v-5564a849] {\n    color: #545454;\n}\nfooter .change-language[data-v-5564a849] {\n    margin-bottom: 20px;\n    text-align: right;\n}\nfooter .change-language a[data-v-5564a849] {\n      margin-left: 10px;\n}\nfooter .change-language a.active[data-v-5564a849] {\n      border-bottom: 2px solid #b1b1b1;\n}\nfooter .link-social[data-v-5564a849] {\n    float: right;\n}\nfooter .link-social [class*=icono][data-v-5564a849] {\n      color: #545454;\n}\nfooter .button-gototop[data-v-5564a849] {\n    transition: all .5s ease;\n    position: fixed;\n    bottom: 10px;\n    right: 10px;\n    border-radius: 20px;\n    padding: 5px;\n    cursor: pointer;\n}\nfooter .button-gototop.hide[data-v-5564a849] {\n      bottom: -200px;\n}\nfooter .button-gototop span[data-v-5564a849] {\n      color: #484848;\n}\n", ""]);

// exports


/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("footer", [
    _c("div", { staticClass: "container-medium" }, [
      _c("div", { staticClass: "grid" }, [
        _c("div", { staticClass: "col-6_sm-12" }, [
          _c(
            "div",
            { staticClass: "link-collection" },
            [
              _c("router-link", { attrs: { to: "/static/about" } }, [
                _vm._v("About Academy ")
              ]),
              _vm._v("| "),
              _c("router-link", { attrs: { to: "/static/terms-conditions" } }, [
                _vm._v("Terms and Conditions ")
              ]),
              _vm._v("| "),
              _c("router-link", { attrs: { to: "/static/privacy-policy" } }, [
                _vm._v("Privacy Policy ")
              ]),
              _vm._v("| "),
              _c(
                "a",
                {
                  attrs: {
                    href:
                      "https://docs.google.com/forms/d/e/1FAIpQLSeByAgx7GNG3YyH3vgAupKymlwfJ6mNNaGCQN0ZkG1KC8636A/viewform",
                    target: "_blank"
                  }
                },
                [_vm._v("Contact Us")]
              )
            ],
            1
          ),
          _vm._m(0)
        ]),
        _c("div", { staticClass: "col-6_sm-12" }, [
          _c("div", { staticClass: "change-language" }, [
            _c("span", [_vm._v("Change language : ")]),
            _c("strong", [
              _c(
                "a",
                {
                  class: { active: this.selected_lang == "id" },
                  attrs: { href: "/id" }
                },
                [_vm._v("ID")]
              )
            ]),
            _c("strong", [
              _c(
                "a",
                {
                  class: { active: this.selected_lang == "en" },
                  attrs: { href: "/en" }
                },
                [_vm._v("EN")]
              )
            ])
          ]),
          _vm._m(1)
        ])
      ])
    ]),
    _c(
      "a",
      {
        staticClass: "button-gototop",
        class: !_vm.show_btngototop ? "hide" : "",
        attrs: { id: "button-gototop", href: "javascript:;" },
        on: { click: _vm.goToTop }
      },
      [_c("span", { staticClass: "icono-caretUp" })]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _c("strong", [_vm._v("Yussan Academy ")]),
      _vm._v("Tech from Engineer Perspective."),
      _c("br"),
      _vm._v("Powered by "),
      _c(
        "a",
        {
          attrs: {
            href: "https://yussanmediagroup.com",
            rel: "noreferer noopener",
            target: "_blank"
          }
        },
        [_vm._v("Yussan Media Group")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "link-social" }, [
      _c(
        "a",
        {
          staticStyle: { "margin-right": "10px" },
          attrs: {
            href: "https://www.youtube.com/channel/UCKLQUv8n3OadK5mkYpmZiyA",
            title: "Yussan Academy Youtube",
            target: "_blank",
            rel: "noopener noreferrer"
          }
        },
        [_c("span", { staticClass: "icono-youtube" })]
      ),
      _c(
        "a",
        {
          staticStyle: { "margin-right": "6px" },
          attrs: {
            href: "https://instagram.com/yussanacademy",
            title: "Yussan Academy Instagram",
            target: "_blank",
            rel: "noopener noreferrer"
          }
        },
        [_c("span", { staticClass: "icono-instagram" })]
      ),
      _c(
        "a",
        {
          staticStyle: { "margin-right": "-2px" },
          attrs: {
            href: "https://twitter.com/yussanacademy",
            title: "Yussan Academy Twitter",
            target: "_blank",
            rel: "noopener noreferrer"
          }
        },
        [_c("span", { staticClass: "icono-twitter" })]
      ),
      _c(
        "a",
        {
          attrs: {
            href: "https://facebook.com/yussanacademy",
            title: "Yussan Academy Facebook",
            target: "_blank",
            rel: "noopener noreferrer"
          }
        },
        [_c("span", { staticClass: "icono-facebook" })]
      ),
      _c(
        "a",
        {
          attrs: {
            href: "/feed",
            target: "_blank",
            title: "Yussan Academy Feed",
            rel: "noopener noreferrer"
          }
        },
        [_c("span", { staticClass: "icono-rss" })]
      )
    ])
  }
]
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5564a849", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(133);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("49ae7f1a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-075c4ce9\",\"scoped\":true,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./toast.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-075c4ce9\",\"scoped\":true,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./toast.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n#toast-oopsreview[data-v-075c4ce9] {\n  width: 200px;\n  padding: 10px;\n  position: fixed;\n  bottom: -100px;\n  right: 10px;\n  background: #f4f4f4;\n  color: #545454;\n  cursor: pointer;\n  transition: all .3s ease;\n}\n#toast-oopsreview[data-v-075c4ce9]:hover {\n    padding: 15px;\n}\n#toast-oopsreview.error[data-v-075c4ce9] {\n    background-color: #ff3e3e;\n    color: #f4f4f4;\n}\n#toast-oopsreview.success[data-v-075c4ce9] {\n    background-color: #1c9a77;\n    color: #f4f4f4;\n}\n#toast-oopsreview.warning[data-v-075c4ce9] {\n    background-color: #deb617;\n}\n", ""]);

// exports


/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "toast-oopsreview" } })
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-075c4ce9", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("top-navbar"),
      _c(
        "div",
        {
          staticClass: "grid",
          staticStyle: { "border-top": "7px solid #F4F4F4" }
        },
        [
          _c(
            "div",
            {
              staticClass: "col-2_sm-12",
              staticStyle: { "padding-top": "60px" }
            },
            [_c("super-sidebar")],
            1
          ),
          _c(
            "div",
            { staticClass: "col-10_sm-12 bg-white" },
            [_c("router-view")],
            1
          )
        ]
      ),
      _c("bottom-navbar"),
      _c("toast")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-21b3a7ec", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_default_vue__ = __webpack_require__(43);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5e5fbe10_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_default_vue__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(137)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_default_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5e5fbe10_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_default_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5e5fbe10_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_default_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/layouts/default.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e5fbe10", Component.options)
  } else {
    hotAPI.reload("data-v-5e5fbe10", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(138);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("6a49c792", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./default.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./default.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports
exports.i(__webpack_require__(33), "");
exports.i(__webpack_require__(34), "");

// module
exports.push([module.i, "\nhtml, body {\n  margin: 0;\n  padding: 0;\n  font-family: Ubuntu, sans-serif;\n}\na {\n  text-decoration: none;\n}\n.container, .container-medium {\n  margin: 0 auto;\n}\n.grid, .grid-center {\n  margin: 0 !important;\n}\n.title-menu {\n  font-size: 1.5em;\n  font-weight: 300;\n  text-transform: uppercase;\n}\n.bg-black {\n  background-color: #000000;\n  color: #FFFFFF;\n}\n.bg-black a {\n    color: #FFFFFF;\n}\n.bg-soft-gray {\n  background-color: #f4f4f4;\n}\n.bg-white {\n  background-color: #FFFFFF;\n  color: #484848;\n}\n.bg-white a {\n    color: #545454;\n}\n.align-center {\n  text-align: center;\n}\n.m-b-50 {\n  margin-bottom: 50px !important;\n}\n.p-b-10 {\n  padding-bottom: 10px;\n}\n.p-t-2 {\n  padding-top: 2em !important;\n}\n.p-0 {\n  padding: 0 !important;\n}\n\n/* Large desktop */\n@media (min-width: 1200px) {\n.container {\n    width: 1200px;\n}\n.container-medium {\n    width: 900px;\n}\n}\n\n/* Portrait tablet to landscape and desktop */\n@media (min-width: 768px) and (max-width: 979px) {\n.container, .container-medium {\n    width: 768px;\n}\n}\n\n/* Landscape phone to portrait tablet */\n@media (max-width: 767px) {\n.container, .container-medium {\n    width: 100%;\n}\n}\n\n/* Landscape phones and down */\n@media (max-width: 480px) {\n.container, .container-medium {\n    width: 100%;\n}\n}\nbody {\n  color: #484848;\n}\na {\n  color: #545454;\n}\npre {\n  background: #252525;\n  color: #f4f4f4;\n  padding: 20px;\n}\n.align-center {\n  text-align: center;\n}\n.text-muted {\n  color: #545454;\n}\n.no-padding {\n  padding: 0 !important;\n}\n[class*=col-] {\n  padding-bottom: 0 !important;\n}\n.m-t-30 {\n  margin-top: 30px;\n}\n.m-t-50 {\n  margin-top: 50px;\n}\n", ""]);

// exports


/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_navbar_vue__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_navbar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_navbar_vue__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fbc95b16_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_navbar_vue__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(140)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-fbc95b16"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_navbar_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fbc95b16_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_navbar_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fbc95b16_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_navbar_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/v2/navigations/navbar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fbc95b16", Component.options)
  } else {
    hotAPI.reload("data-v-fbc95b16", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(141);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("658cd486", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-fbc95b16\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./navbar.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-fbc95b16\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./navbar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.main-nav[data-v-fbc95b16] {\n  background-color: #FFFFFF;\n  color: #545454;\n  border-bottom: 1px solid #f4f4f4;\n  padding: 0 5px;\n}\n.main-nav .main-nav_logo[data-v-fbc95b16] {\n    justify-content: center;\n}\n.main-nav .main-nav_logo img[data-v-fbc95b16] {\n      width: 45px;\n      height: 45px;\n}\n.main-nav .main-nav_logo[data-v-fbc95b16], .main-nav .main-nav_menu[data-v-fbc95b16] {\n    display: flex;\n    align-items: center;\n}\n.main-nav .main-nav_menu .main-nav-menu_link[data-v-fbc95b16] {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n}\n.main-nav .main-nav_menu .main-nav-menu_link li[data-v-fbc95b16] {\n      display: inline-block;\n      padding: 20px;\n}\n.main-nav .main-nav_menu .main-nav-menu_link li[data-v-fbc95b16]:hover, .main-nav .main-nav_menu .main-nav-menu_link li.active[data-v-fbc95b16] {\n        background-color: #f4f4f4;\n}\n.main-nav .main-nav_menu .main-nav-menu_link li a[data-v-fbc95b16] {\n        text-transform: capitalize;\n}\n.main-nav .main-nav_menu_right[data-v-fbc95b16] {\n    float: right;\n}\n.main-nav .main-nav_menu_right .nav_menu_right_search[data-v-fbc95b16] {\n      padding: 15px 10px;\n}\n.main-nav .main-nav_menu_right .nav_menu_right_search .icono-search[data-v-fbc95b16] {\n        color: #545454;\n        zoom: 0.8;\n}\n.main-nav .main-nav_menu_right .nav_menu_right_search input[type=\"search\"][data-v-fbc95b16] {\n        color: #545454;\n        padding: 5px 0;\n        background: none;\n        outline: none;\n        border: none;\n        border-bottom: 1px solid #000;\n        margin-left: 5px;\n        font-size: 15px;\n        transition: width .2s ease;\n        width: 0;\n}\n.main-nav .main-nav_menu_right .nav_menu_right_search input[type=\"search\"].show[data-v-fbc95b16] {\n          width: calc(100% - 40px);\n}\n", ""]);

// exports


/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("nav", { staticClass: "main-nav", attrs: { id: "main-nav" } }, [
    _c("div", { staticClass: "container" }, [
      _c("div", { staticClass: "grid-middle" }, [
        _c(
          "div",
          { staticClass: "col-1_md-1_sm-3 main-nav_logo" },
          [
            _c(
              "router-link",
              {
                staticStyle: { height: "45px" },
                attrs: { to: "/", title: "Back to home" }
              },
              [
                _c("img", {
                  attrs: {
                    src: "/images/icons/icon-512x512.png",
                    alt: "square logo of yussan academy"
                  }
                })
              ]
            )
          ],
          1
        ),
        _c("div", { staticClass: "col-5_md-5_sm-hidden" }, [
          _c("div", { staticClass: "main-nav_menu main-nav_menu_left" }, [
            _c(
              "ul",
              { staticClass: "main-nav-menu_link" },
              _vm._l(_vm.menus, function(menu, key) {
                return _c(
                  "li",
                  {
                    key: key,
                    class: menu.matchPath.includes(_vm.activePath)
                      ? "active"
                      : ""
                  },
                  [
                    menu.target != "blank"
                      ? _c("router-link", { attrs: { to: menu.link } }, [
                          _vm._v(_vm._s(menu.name))
                        ])
                      : _vm._e(),
                    menu.target == "blank"
                      ? _c(
                          "a",
                          { attrs: { href: menu.link, target: "_blank" } },
                          [_vm._v(_vm._s(menu.name))]
                        )
                      : _vm._e()
                  ],
                  1
                )
              }),
              0
            )
          ])
        ]),
        _c("div", { staticClass: "col-6_md-6_sm-9" }, [
          _c("div", { staticClass: "main-nav_menu main-nav_menu_right" }, [
            _c("div", { staticClass: "nav_menu_right_search" }, [
              _c(
                "a",
                {
                  attrs: { href: "javascript:;", title: "Click to search" },
                  on: {
                    click: function($event) {
                      return _vm.toggleSearch()
                    }
                  }
                },
                [_c("i", { staticClass: "icono-search" })]
              ),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.keywordSearch,
                    expression: "keywordSearch"
                  }
                ],
                class: _vm.hideSearch ? "hide" : "show",
                attrs: {
                  type: "search",
                  placeholder: "search...",
                  autofocus: "true"
                },
                domProps: { value: _vm.keywordSearch },
                on: {
                  keyup: _vm.onKeyUp,
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.keywordSearch = $event.target.value
                  }
                }
              })
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-fbc95b16", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_thanks_to_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_thanks_to_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_thanks_to_vue__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9c54c634_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_thanks_to_vue__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(144)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9c54c634"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_thanks_to_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9c54c634_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_thanks_to_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9c54c634_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_thanks_to_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/boxs/thanks-to.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9c54c634", Component.options)
  } else {
    hotAPI.reload("data-v-9c54c634", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(145);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("0aa84bbe", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-9c54c634\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./thanks-to.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-9c54c634\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./thanks-to.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.thanks-to[data-v-9c54c634] {\n  text-align: center;\n  padding: 40px 0;\n}\n.thanks-to .thanks-to--item[data-v-9c54c634] {\n    margin-right: 10px;\n}\n", ""]);

// exports


/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "container" }, [
      _c("div", { staticClass: "grid thanks-to" }, [
        _c("div", { staticClass: "col-12" }, [_c("h3", [_vm._v("THANKS TO")])]),
        _c("div", { staticClass: "col-12" }, [
          _c(
            "a",
            {
              staticClass: "thanks-to--item",
              attrs: {
                href: "https://www.domainesia.com/?aff=585",
                target: "blank",
                rel: "noopener noreferer"
              }
            },
            [
              _c("img", {
                attrs: {
                  src:
                    "https://res.cloudinary.com/dhjkktmal/image/upload/v1561894898/kompetisi-id/referral/domainesia.png",
                  alt: "thanks to Domainesia"
                }
              })
            ]
          ),
          _c(
            "a",
            {
              staticClass: "thanks-to--item",
              attrs: {
                href: "https://m.do.co/c/e4eacf5d20a5",
                target: "blank",
                rel: "noopener noreferer"
              }
            },
            [
              _c("img", {
                attrs: {
                  src:
                    "https://res.cloudinary.com/dhjkktmal/image/upload/v1561894898/kompetisi-id/referral/digitalocean.png",
                  alt: "thanks to Digital Ocean"
                }
              })
            ]
          )
        ])
      ])
    ])
  }
]
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9c54c634", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("navbar", { attrs: { keyword: _vm.$route.query.q || "" } }),
      _c(
        "div",
        { class: _vm.isFullscreen ? "" : "container" },
        [_c("router-view"), _c("thanks-to")],
        1
      ),
      _c("bottom-navbar", { attrs: { route: _vm.$route } }),
      _c("toast")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5e5fbe10", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_post_store__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_auth_store__ = __webpack_require__(170);


/* harmony default export */ __webpack_exports__["a"] = ({
    post: __WEBPACK_IMPORTED_MODULE_0__pages_post_store__["a" /* default */],
    auth: __WEBPACK_IMPORTED_MODULE_1__pages_auth_store__["a" /* default */]
});


/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vuex_types__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_string_manager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_string_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_string_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vuex_utils_normalizers__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vuex_utils_api__ = __webpack_require__(46);




const initialState = {
    list: {},
    detail: {},
    tags: {}
};
const getters = {};
const actions = {
    // delete post
    [__WEBPACK_IMPORTED_MODULE_0__vuex_types__["DELETE_POST"]]: ({ commit }, post_id) => {
        commit(__WEBPACK_IMPORTED_MODULE_0__vuex_types__["DELETE_POST"], { post_id });
    },
    // request to api post list
    [__WEBPACK_IMPORTED_MODULE_0__vuex_types__["GET_POSTS"]]: ({ commit }, params) => {
        commit(__WEBPACK_IMPORTED_MODULE_0__vuex_types__["REQUEST_POSTS"], { filter: params.filter });
        // generate querystring
        if (!params.limit)
            params.limit = 8;
        const queryObj = params.query || params;
        const query = Object(__WEBPACK_IMPORTED_MODULE_1_string_manager__["objToQuery"])(queryObj);
        Object(__WEBPACK_IMPORTED_MODULE_3__vuex_utils_api__["a" /* default */])("get", `/api/posts/dW5kZWZpbmVkMTUyMTM0NDA4ODM0Mw?${query}`).then(response => {
            if (typeof queryObj.lastupdatedon != "undefined") {
                // loadmore news
                commit(__WEBPACK_IMPORTED_MODULE_0__vuex_types__["GET_MORE_POSTS"], {
                    response,
                    filter: params.filter
                });
            }
            else {
                // get news
                commit(__WEBPACK_IMPORTED_MODULE_0__vuex_types__["GET_POSTS"], {
                    response,
                    filter: params.filter
                });
            }
        });
    },
    // request to api post detail
    [__WEBPACK_IMPORTED_MODULE_0__vuex_types__["GET_POST"]]: ({ commit }, post_id) => {
        commit(__WEBPACK_IMPORTED_MODULE_0__vuex_types__["REQUEST_POSTS"], { filter: post_id });
        Object(__WEBPACK_IMPORTED_MODULE_3__vuex_utils_api__["a" /* default */])("get", `/api/post/${post_id}/5aa4ac2b830a0aef88acdb5c`).then(response => {
            commit(__WEBPACK_IMPORTED_MODULE_0__vuex_types__["GET_POST"], {
                response,
                filter: post_id
            });
        });
    },
    // request tags from api
    [__WEBPACK_IMPORTED_MODULE_0__vuex_types__["GET_TAG"]]: ({ commit }, name) => {
        Object(__WEBPACK_IMPORTED_MODULE_3__vuex_utils_api__["a" /* default */])("get", `/api/tag/${name}/5aa4ac2b830a0aef88acdb5c`).then(response => {
            commit(__WEBPACK_IMPORTED_MODULE_0__vuex_types__["GET_TAG"], {
                response,
                filter: name
            });
        });
    },
    // create / update post
    [__WEBPACK_IMPORTED_MODULE_0__vuex_types__["SUBMIT_POST"]]: ({ commit }, params = {}) => {
        commit(__WEBPACK_IMPORTED_MODULE_0__vuex_types__["REQUEST_SUBMIT_POST"], {});
        const { id } = params;
        let endpoint = id
            ? `/api/post/${id}/update/5aa4ac2b830a0aef88acdb5c`
            : `/api/post/create/5aa4ac2b830a0aef88acdb5c`;
        let method = id ? "put" : "post";
        Object(__WEBPACK_IMPORTED_MODULE_3__vuex_utils_api__["a" /* default */])(method, endpoint, params).then(response => {
            commit(__WEBPACK_IMPORTED_MODULE_0__vuex_types__["GET_POST"], {
                filter: "response",
                response
            });
        });
    }
};
const mutations = {
    // on delete post by id
    [__WEBPACK_IMPORTED_MODULE_0__vuex_types__["DELETE_POST"]]: (state = initialState, payload) => {
        let { list } = state;
        list = Object(__WEBPACK_IMPORTED_MODULE_2__vuex_utils_normalizers__["a" /* deleteListById */])(list, payload, payload.post_id);
        state.list = Object.assign({}, list);
    },
    // on request submit post
    [__WEBPACK_IMPORTED_MODULE_0__vuex_types__["REQUEST_SUBMIT_POST"]]: (state) => {
        let { detail } = state;
        detail.response = {
            loading: true
        };
        state.detail = Object.assign({}, detail);
    },
    // on receive tag
    [__WEBPACK_IMPORTED_MODULE_0__vuex_types__["GET_TAG"]]: (state = initialState, { filter, response }) => {
        let { tags } = state;
        tags[filter] = response.data;
        state.tags = Object.assign({}, tags);
    },
    // on receive post detail
    [__WEBPACK_IMPORTED_MODULE_0__vuex_types__["GET_POST"]]: (state = initialState, { filter, response }) => {
        let { detail } = state;
        detail[filter] = response.data;
        detail[filter].loading = false;
        state.detail = Object.assign({}, detail);
    },
    // on request post list
    [__WEBPACK_IMPORTED_MODULE_0__vuex_types__["REQUEST_POSTS"]]: (state = initialState, { filter }) => {
        if (!state.list[filter])
            state.list[filter] = {};
        state.list[filter].loading = true;
    },
    // receive response post list
    [__WEBPACK_IMPORTED_MODULE_0__vuex_types__["GET_POSTS"]]: (state = initialState, { filter, response }) => {
        let { list } = state;
        list[filter] = response.data;
        if (!response.data) {
            list[filter] = {};
            list[filter].status = response.status;
        }
        list[filter].loading = false;
        state.list = Object.assign({}, list);
    },
    // receive response loadmore post list
    [__WEBPACK_IMPORTED_MODULE_0__vuex_types__["GET_MORE_POSTS"]]: (state = initialState, { filter, response }) => {
        let { list } = state;
        list[filter].status = response.data.status;
        list[filter].message = response.data.message;
        if (response.data.status === 200) {
            console.log(response);
            list[filter].result = list[filter].result.concat(response.data.result);
        }
        list[filter].loading = false;
        state.list = Object.assign({}, list);
    }
};
/* harmony default export */ __webpack_exports__["a"] = ({
    state: initialState,
    getters,
    actions,
    mutations
});


/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export updateListById */
/* harmony export (immutable) */ __webpack_exports__["a"] = deleteListById;
/**
 * @description function to handle update list by id
 * @param {object} state vuex state
 * @param {object} payload from vuex
 * @param {number} id
 * @param {function} callback if found data
 */
function updateListById(state, payload, id, callback) {
    const keys = Object.keys(state);
    keys.map((n) => {
        if (state[n].result) {
            state[n].result.map(m => {
                if (m._id === id)
                    return callback(payload, m);
            });
        }
    });
}
function deleteListById(state, payload, id) {
    const keys = Object.keys(state);
    keys.map((n) => {
        if (state[n].result) {
            state[n].result.map((m, key) => {
                if (m._id === id) {
                    if (payload.status) {
                        if (payload.status === 200) {
                            delete state[n].result[key];
                        }
                        else {
                            m.is_deleted = false;
                        }
                    }
                    else {
                        m.is_deleted = true;
                    }
                }
            });
        }
    });
    return Object.assign({}, state);
}


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(152);

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var bind = __webpack_require__(47);
var Axios = __webpack_require__(154);
var defaults = __webpack_require__(15);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(51);
axios.CancelToken = __webpack_require__(168);
axios.isCancel = __webpack_require__(50);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(169);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 153 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(15);
var utils = __webpack_require__(4);
var InterceptorManager = __webpack_require__(163);
var dispatchRequest = __webpack_require__(164);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(49);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var transformData = __webpack_require__(165);
var isCancel = __webpack_require__(50);
var defaults = __webpack_require__(15);
var isAbsoluteURL = __webpack_require__(166);
var combineURLs = __webpack_require__(167);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(51);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vuex_utils_api__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vuex_types__ = __webpack_require__(8);


const initialState = {
    loading: false,
    response: {}
};
const getters = {
    loginStatus: state => {
        return state.auth;
    }
};
const actions = {
    /**
     * @description function to login ans save session
     * @param {string} payload.username
     * @param {string} payload.password
     */
    [__WEBPACK_IMPORTED_MODULE_1__vuex_types__["LOGIN"]]: ({ commit }, payload) => {
        commit(__WEBPACK_IMPORTED_MODULE_1__vuex_types__["LOGIN"]);
        // request to login
        Object(__WEBPACK_IMPORTED_MODULE_0__vuex_utils_api__["a" /* default */])("post", "/api/login", payload).then(response => {
            commit(__WEBPACK_IMPORTED_MODULE_1__vuex_types__["LOGIN"], response);
        });
    },
    /**
     * @description function to logout and destory session
     */
    [__WEBPACK_IMPORTED_MODULE_1__vuex_types__["LOGOUT"]]: ({ commit }) => {
        Object(__WEBPACK_IMPORTED_MODULE_0__vuex_utils_api__["a" /* default */])("post", "/api/logout").then(response => {
            commit(__WEBPACK_IMPORTED_MODULE_1__vuex_types__["LOGOUT"], response);
        });
    }
};
const mutations = {
    [__WEBPACK_IMPORTED_MODULE_1__vuex_types__["LOGIN"]]: (state = initialState, payload) => {
        if (!payload) {
            state.loading = true;
        }
        else {
            state.loading = false;
            state.response = payload;
        }
    },
    [__WEBPACK_IMPORTED_MODULE_1__vuex_types__["LOGOUT"]]: (state = initialState, payload) => {
        console.log('logout muttation...');
        state.loading = false;
        state.response = payload;
    }
};
/* harmony default export */ __webpack_exports__["a"] = ({
    state: initialState,
    getters,
    actions,
    mutations
});


/***/ })
],[9]);