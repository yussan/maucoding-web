webpackJsonp([0],{

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a80f840_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(268)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6a80f840"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a80f840_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a80f840_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/pages/v2/post/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6a80f840", Component.options)
  } else {
    hotAPI.reload("data-v-6a80f840", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 175:
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
  props: props,
  methods: {
    epochToRelative: function epochToRelative(epochtime) {
      return (0, _datetime.epochToRelative)(epochtime);
    }
  }
};

/***/ }),

/***/ 176:
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

/***/ 177:
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
//
//
//

var props = {
  to: {
    type: String
  },
  text: {
    type: String,
    default: "Read More"
  },
  type: {
    type: String
  },
  onClick: {
    type: Function
  }
};

exports.default = {
  props: props
};

/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _PostSmallCard = __webpack_require__(180);

var _PostSmallCard2 = _interopRequireDefault(_PostSmallCard);

var _FullWidthButton = __webpack_require__(188);

var _FullWidthButton2 = _interopRequireDefault(_FullWidthButton);

var _index = __webpack_require__(184);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

_vue2.default.component("post-small-card", _PostSmallCard2.default);
_vue2.default.component("big-button", _FullWidthButton2.default);
_vue2.default.component("loader", _index2.default);

var props = ["postData", "loadMoreHandler"];

exports.default = {
  props: props
};

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostSmallCard_vue__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostSmallCard_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostSmallCard_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostSmallCard_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostSmallCard_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5c5eaa46_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_PostSmallCard_vue__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(181)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5c5eaa46"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostSmallCard_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5c5eaa46_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_PostSmallCard_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5c5eaa46_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_PostSmallCard_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/v2/cards/PostSmallCard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5c5eaa46", Component.options)
  } else {
    hotAPI.reload("data-v-5c5eaa46", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(182);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("0ab62d14", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-5c5eaa46\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PostSmallCard.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-5c5eaa46\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PostSmallCard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.card-post-small[data-v-5c5eaa46] {\n  width: 100%;\n  margin-bottom: 30px;\n  display: inline-flex;\n}\n.card-post-small .card-post-small_thumb[data-v-5c5eaa46] {\n    margin-right: 30px;\n    width: 350px;\n    height: 200px;\n    background-size: cover;\n    background-position: center;\n}\n.card-post-small .card-post-small_meta[data-v-5c5eaa46] {\n    width: calc(100% - 400px);\n}\n.card-post-small .card-post-small_meta h3[data-v-5c5eaa46] {\n      margin-top: 0;\n      color: #484848;\n      text-transform: capitalize;\n      line-height: 31.5px;\n      font-size: 21px;\n}\n.card-post-small .card-post-small_meta p[data-v-5c5eaa46] {\n      max-height: 110px;\n      overflow: hidden;\n}\n.card-post-small .card-post-small_meta .tag-post[data-v-5c5eaa46] {\n      margin-bottom: 10px;\n}\n.card-post-small .card-post-small_meta .tag-post a[data-v-5c5eaa46] {\n        text-transform: uppercase;\n        color: #545454;\n        border-bottom: 1px solid #ff3e3e;\n        margin-right: 10px;\n        padding-bottom: 5px;\n        font-size: 14px;\n}\n.card-post-small .card-post-small_author a[data-v-5c5eaa46] {\n    color: #545454 !important;\n}\n.card-post-small .card-post-small_author a span.text[data-v-5c5eaa46] {\n      top: -5px;\n      position: relative;\n      font-size: 14px;\n}\n.card-post-small .card-post-small_author img[data-v-5c5eaa46] {\n    width: 20px;\n    height: 20px;\n    border-radius: 20px;\n    margin-right: 10px;\n}\n@media (max-width: 48em) {\n.card-post-small[data-v-5c5eaa46] {\n    display: block;\n}\n.card-post-small .card-post-small_thumb[data-v-5c5eaa46] {\n      width: 100%;\n      margin-right: 0;\n      margin-bottom: 30px;\n}\n.card-post-small .card-post-small_meta[data-v-5c5eaa46] {\n      width: 100%;\n}\n}\n", ""]);

// exports


/***/ }),

/***/ 183:
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
    { attrs: { to: "/post/" + _vm.data.nospace_title + "-" + _vm.data._id } },
    [
      _c("div", { staticClass: "card-post-small" }, [
        _c("div", {
          staticClass: "card-post-small_thumb",
          style: "background-image:url(" + _vm.data.image[600] + ")"
        }),
        _c("div", { staticClass: "card-post-small_meta" }, [
          _c(
            "div",
            { staticClass: "tag-post" },
            _vm._l(_vm.data.tags, function(tag, key) {
              return _c(
                "router-link",
                { key: key, attrs: { to: "/tag/" + tag } },
                [_vm._v(_vm._s(tag))]
              )
            }),
            1
          ),
          _c("h3", [_vm._v(_vm._s(_vm.data.title))]),
          _c("p", [_vm._v(_vm._s(_vm.data.plain_content))]),
          _c(
            "div",
            { staticClass: "card-post-small_author" },
            [
              _c(
                "router-link",
                { attrs: { to: "/author/" + _vm.data.author.username } },
                [
                  _c("img", {
                    attrs: {
                      src: _vm.data.author.avatar.small,
                      alt: _vm.data.author.username
                    }
                  }),
                  _c("span", { staticClass: "text" }, [
                    _vm._v(
                      _vm._s(_vm.data.author.username) +
                        " · " +
                        _vm._s(_vm.epochToRelative(_vm.data.created_on || 0))
                    )
                  ])
                ]
              )
            ],
            1
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
    require("vue-hot-reload-api")      .rerender("data-v-5c5eaa46", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c2dc91c4_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(185)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c2dc91c4_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c2dc91c4_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/v2/loaders/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c2dc91c4", Component.options)
  } else {
    hotAPI.reload("data-v-c2dc91c4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(186);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("5c7e0c6f", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.preloader-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px 5px;\n  min-height: 400px;\n}\n.dot {\n  display: inline-block;\n  background: #666;\n  height: 8px;\n  width: 8px;\n  opacity: 0.3;\n  border-radius: 50%;\n  animation: moveit 1.8s infinite;\n  padding: 5px;\n  margin: 1px;\n}\n.dot:nth-child(2) {\n    animation-delay: .15s;\n}\n.dot:nth-child(3) {\n    animation-delay: .3s;\n}\n.dot:nth-child(4) {\n    animation-delay: .45s;\n}\n.dot:nth-child(5) {\n    animation-delay: .6s;\n}\n@keyframes moveit {\n0% {\n    transform: translateY(0px);\n}\n35% {\n    transform: translateY(0px);\n    opacity: 0.3;\n}\n50% {\n    transform: translateY(-20px);\n    opacity: 0.8;\n}\n70% {\n    transform: translateY(3px);\n    opacity: 0.8;\n}\n85% {\n    transform: translateY(-3px);\n}\n}\n\n/* Preloader #2 */\n.preloader-squares {\n  width: 50px;\n  line-height: 19px;\n  height: 50px;\n}\n.preloader-squares .square {\n    display: inline-block;\n    width: 15px;\n    height: 15px;\n    background: #666;\n    opacity: 0.2;\n    animation: movein 2s infinite;\n}\n.square {\n  opacity: 0.5;\n}\n.preloader-squares .square:nth-child(1) {\n  transform: translate(0, -25px);\n}\n.preloader-squares .square:nth-child(2) {\n  transform: translate(25px, 0);\n}\n.preloader-squares .square:nth-child(3) {\n  transform: translate(-25px, 0);\n}\n.preloader-squares .square:nth-child(4) {\n  transform: translate(0, 25px);\n}\n@keyframes movein {\n33% {\n    transform: translate(0, 0);\n    opacity: 0.7;\n}\n66% {\n    transform: translate(0, 0);\n    opacity: 0.7;\n}\n}\n\n/*Preloader #3 */\n.pulse-center {\n  background: #666;\n  width: 15px;\n  height: 15px;\n  border-radius: 50%;\n  animation: pulse 1.5s infinite;\n  position: absolute;\n  opacity: 0.8;\n  z-index: 5;\n}\n.pulse-explosion {\n  content: '';\n  width: 15px;\n  height: 15px;\n  background: #ccc;\n  border-radius: 50%;\n  position: absolute;\n  animation: pulse-radius 1.5s infinite;\n  z-index: 1;\n}\n@keyframes pulse {\n30% {\n    transform: scale(0.7);\n    opacity: 0.8;\n}\n50% {\n    transform: scale(1.1);\n    opacity: 1.0;\n}\n70% {\n    transform: scale(0.8);\n    opacity: 0.8;\n}\n}\n@keyframes pulse-radius {\n30% {\n    transform: scale(0.7);\n    opacity: 1;\n}\n40% {\n    transform: scale(7.8);\n    opacity: 0.1;\n}\n80% {\n    transform: scale(4.8);\n    opacity: 0;\n}\n100% {\n    transform: scale(1);\n    opacity: 0;\n}\n}\n\n/*Preloader #4 */\n.preloader-chasing-squares {\n  width: 50px;\n  height: 50px;\n  line-height: 19px;\n}\n.preloader-chasing-squares .square {\n    display: inline-block;\n    width: 15px;\n    height: 15px;\n    opacity: 1;\n    background: #666;\n    animation: focusfade 2.8s infinite;\n}\n.preloader-chasing-squares .square:nth-child(2) {\n      animation-delay: .7s;\n}\n.preloader-chasing-squares .square:nth-child(3) {\n      animation-delay: 2.1s;\n}\n.preloader-chasing-squares .square:nth-child(4) {\n      animation-delay: 1.4s;\n}\n@keyframes focusfade {\n0% {\n    opacity: 0.5;\n    background: #000;\n}\n30% {\n    opacity: 0.5;\n    background: #666;\n}\n60% {\n    opacity: 0;\n}\n75% {\n    opacity: 0;\n}\n100% {\n    opacity: 0.5;\n    background: #000;\n}\n}\n\n/* preloader 5 */\n.preloader-dotline .dot {\n  display: inline-block;\n  background: #666;\n  height: 5px;\n  width: 5px;\n  opacity: 0;\n  border-radius: 50%;\n  animation: dotline-move 4s infinite;\n  transform: translateX(-300px);\n}\n.preloader-dotline .dot:nth-child(1) {\n    animation-delay: .8s;\n}\n.preloader-dotline .dot:nth-child(2) {\n    animation-delay: .7s;\n}\n.preloader-dotline .dot:nth-child(3) {\n    animation-delay: .6s;\n}\n.preloader-dotline .dot:nth-child(4) {\n    animation-delay: .5s;\n}\n.preloader-dotline .dot:nth-child(5) {\n    animation-delay: .4s;\n}\n.preloader-dotline .dot:nth-child(6) {\n    animation-delay: .3s;\n}\n.preloader-dotline .dot:nth-child(7) {\n    animation-delay: .2s;\n}\n.preloader-dotline .dot:nth-child(8) {\n    animation-delay: .1s;\n}\n@keyframes dotline-move {\n40% {\n    transform: translateX(0px);\n    opacity: 0.8;\n}\n100% {\n    transform: translateX(300px);\n    opacity: 0;\n}\n}\n\n/* preloader pacman */\n.preloader-pacman .dot {\n  display: inline-block;\n  background: #666;\n  height: 5px;\n  width: 5px;\n  margin-right: 20px;\n  opacity: 0.7;\n  border-radius: 50%;\n  animation: fade-out 14s linear infinite;\n}\n.preloader-pacman .pacman {\n  display: inline-block;\n  background: #666;\n  height: 20px;\n  vertical-align: bottom;\n  width: 20px;\n  margin-right: 20px;\n  opacity: 1;\n  border-radius: 50%;\n  position: relative;\n  animation: move-forward 14s linear infinite;\n  transform: translateX(-40px);\n}\n.preloader-pacman .dot:nth-child(1) {\n  animation-delay: .4s;\n}\n.preloader-pacman .dot:nth-child(2) {\n  animation-delay: .8s;\n}\n.preloader-pacman .dot:nth-child(3) {\n  animation-delay: 1.2s;\n}\n.preloader-pacman .dot:nth-child(4) {\n  animation-delay: 1.6s;\n}\n.preloader-pacman .dot:nth-child(5) {\n  animation-delay: 2.0s;\n}\n.preloader-pacman .dot:nth-child(6) {\n  animation-delay: 2.4s;\n}\n.preloader-pacman .dot:nth-child(7) {\n  animation-delay: 2.8s;\n}\n.preloader-pacman .dot:nth-child(8) {\n  animation-delay: 3.2s;\n}\n.preloader-pacman .dot:nth-child(9) {\n  animation-delay: 3.6s;\n}\n.preloader-pacman .dot:nth-child(10) {\n  animation-delay: 4.0s;\n}\n.preloader-pacman .dot:nth-child(11) {\n  animation-delay: 4.4s;\n}\n.preloader-pacman .dot:nth-child(12) {\n  animation-delay: 4.8s;\n}\n.preloader-pacman .dot:nth-child(13) {\n  animation-delay: 5.2s;\n}\n.preloader-pacman .dot:nth-child(14) {\n  animation-delay: 5.6s;\n}\n.preloader-pacman .dot:nth-child(15) {\n  animation-delay: 6.0s;\n}\n.preloader-pacman .dot:nth-child(16) {\n  animation-delay: 6.4s;\n}\n.preloader-pacman .dot:nth-child(17) {\n  animation-delay: 6.8s;\n}\n.preloader-pacman .pacman:before {\n  content: '';\n  display: inline-block;\n  background: transparent;\n  vertical-align: bottom;\n  border-top: 10px solid transparent;\n  border-bottom: 10px solid transparent;\n  right: 0px;\n  border-right: 10px solid #fff;\n  opacity: 1;\n  position: absolute;\n  animation: eat .4s infinite;\n}\n.preloader-pacman .ghost {\n  height: 25px;\n  width: 25px;\n  background: #669;\n  top: -22px;\n  border-top-left-radius: 50%;\n  border-top-right-radius: 50%;\n  position: relative;\n  transform: translateX(550px);\n  animation: move-back 14s linear infinite;\n  animation-delay: 7s;\n  opacity: 0;\n}\n.preloader-pacman .ghost:before {\n    height: 5px;\n    content: '';\n    width: 3px;\n    background: #fff;\n    top: 7px;\n    left: 7px;\n    z-index: 10;\n    position: absolute;\n}\n.preloader-pacman .ghost:after {\n    height: 5px;\n    content: '';\n    width: 3px;\n    background: #fff;\n    top: 7px;\n    right: 7px;\n    z-index: 10;\n    position: absolute;\n}\n@keyframes eat {\n50% {\n    transform: translateX(10px) scale(0.1);\n}\n}\n@keyframes move-back {\n3% {\n    opacity: 1;\n}\n35% {\n    opacity: 1;\n}\n49% {\n    opacity: 0;\n}\n50% {\n    transform: translateX(0px);\n}\n}\n@keyframes move-forward {\n50% {\n    transform: translateX(500px);\n}\n50.1% {\n    transform: translateX(500px) scaleX(-1);\n    opacity: 1;\n}\n100% {\n    transform: translateX(-40px) scaleX(-1);\n}\n}\n@keyframes fade-out {\n0% {\n    opacity: 0;\n}\n40% {\n    opacity: 0;\n}\n89.99% {\n    opacity: 0;\n}\n90% {\n    opacity: 0.5;\n}\n}\n", ""]);

// exports


/***/ }),

/***/ 187:
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
    require("vue-hot-reload-api")      .rerender("data-v-c2dc91c4", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FullWidthButton_vue__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FullWidthButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FullWidthButton_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FullWidthButton_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FullWidthButton_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5e134e76_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_FullWidthButton_vue__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(189)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5e134e76"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FullWidthButton_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5e134e76_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_FullWidthButton_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5e134e76_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_FullWidthButton_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/v2/buttons/FullWidthButton.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e134e76", Component.options)
  } else {
    hotAPI.reload("data-v-5e134e76", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(190);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("2a8a96b4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-5e134e76\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FullWidthButton.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-5e134e76\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FullWidthButton.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\na[data-v-5e134e76], button[data-v-5e134e76] {\n  color: #484848;\n  display: block;\n  text-align: center;\n  padding: 10px 20px;\n  border: 1px solid #b1b1b1;\n  font-size: 15px;\n  cursor: pointer;\n}\nbutton[data-v-5e134e76] {\n  width: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ 191:
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
      !_vm.type
        ? _c("router-link", { attrs: { to: _vm.to } }, [
            _vm._v(_vm._s(_vm.text))
          ])
        : _vm._e(),
      _vm.type == "button"
        ? _c(
            "button",
            { attrs: { type: "button" }, on: { click: _vm.onClick } },
            [_vm._v(_vm._s(_vm.text))]
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5e134e76", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SmallPostBlock_vue__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SmallPostBlock_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SmallPostBlock_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SmallPostBlock_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SmallPostBlock_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ce953aa_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_SmallPostBlock_vue__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(193)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5ce953aa"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SmallPostBlock_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ce953aa_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_SmallPostBlock_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ce953aa_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_SmallPostBlock_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/v2/blocks/SmallPostBlock.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5ce953aa", Component.options)
  } else {
    hotAPI.reload("data-v-5ce953aa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(194);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("48cdd772", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-5ce953aa\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SmallPostBlock.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-5ce953aa\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SmallPostBlock.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.small-post-block[data-v-5ce953aa] {\n  padding: 32px;\n}\n.small-post-block .post-search_list[data-v-5ce953aa], .small-post-block .post-search_header[data-v-5ce953aa] {\n    background-color: #FFFFFF;\n    padding: 20px;\n}\n.small-post-block .post-search_header[data-v-5ce953aa] {\n    padding-bottom: 20px !important;\n    border-bottom: 1px solid #f4f4f4;\n}\np.text-static[data-v-5ce953aa] {\n  text-align: center;\n  margin: 0;\n  color: #545454;\n}\n@media (max-width: 36em) {\n.small-post-block[data-v-5ce953aa] {\n    padding: 32px 0;\n}\n}\n@media (max-width: 48em) {\n.small-post-block[data-v-5ce953aa] {\n    padding: 32px 0;\n}\n}\n", ""]);

// exports


/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "small-post-block" }, [
    _vm.postData.result && _vm.postData.result.length > 0
      ? _c("div", { staticClass: "grid-center" }, [
          _c("div", { staticClass: "col-8_md-8_sm-12 post-search_header" }, [
            _c("h2", { staticStyle: { "font-size": "20px" } }, [
              _vm._v(
                "Found " +
                  _vm._s(_vm.postData.result.length || 0) +
                  " of Many Posts"
              )
            ])
          ])
        ])
      : _vm._e(),
    _c("div", { staticClass: "grid-center" }, [
      _c("div", { staticClass: "col-8_md-8_sm-12 post-search_list" }, [
        _vm.postData.result && _vm.postData.result.length > 0
          ? _c(
              "div",
              { staticClass: "post-list" },
              _vm._l(_vm.postData.result, function(data, key) {
                return _c("post-small-card", {
                  key: key,
                  attrs: { data: data }
                })
              }),
              1
            )
          : _vm._e(),
        _c(
          "div",
          [
            typeof _vm.loadMoreHandler == "function" &&
            _vm.postData.status == 200 &&
            !_vm.postData.loading
              ? _c("big-button", {
                  attrs: {
                    type: "button",
                    onClick: _vm.loadMoreHandler,
                    text: "More Posts"
                  }
                })
              : _vm._e()
          ],
          1
        ),
        _vm.postData.status &&
        _vm.postData.status != 200 &&
        !_vm.postData.loading
          ? _c("div", [
              _c("p", { staticClass: "text-static" }, [
                _vm._v(_vm._s(_vm.postData.message || "Post Not Available"))
              ])
            ])
          : _vm._e(),
        !_vm.postData.status || _vm.postData.loading
          ? _c("div", [_c("loader")], 1)
          : _vm._e(),
        _c("div", { staticClass: "m-t-30" })
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5ce953aa", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _index = __webpack_require__(9);

var _types = __webpack_require__(8);

var TYPES = _interopRequireWildcard(_types);

var _SmallPostBlock = __webpack_require__(192);

var _SmallPostBlock2 = _interopRequireDefault(_SmallPostBlock);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

_vue2.default.component("small-post-block", _SmallPostBlock2.default);

// components
exports.default = {
  data: function data() {
    var _generateMeta = this.generateMeta(this.$route.params.tag_name),
        title = _generateMeta.title,
        description = _generateMeta.description;

    return {
      title: title,
      description: description,
      filter: "posts"
    };
  },
  created: function created() {
    // first time load page, lets fetch some data
    this.fetchData();
  },


  watch: {
    $route: function $route(to) {
      var params = to.params,
          query = to.query;

      var _generateMeta2 = this.generateMeta(params.tag_name),
          title = _generateMeta2.title,
          description = _generateMeta2.description;

      this.title = title;
      this.description = description;

      // request new data
      var reqParams = this.generateParams(params.tag_name);
      return this.fetchData(reqParams);
    }
  },

  metaInfo: function metaInfo() {
    var _generateMeta3 = this.generateMeta(this.$route.params.tag_name),
        title = _generateMeta3.title,
        description = _generateMeta3.description;

    return {
      title: title,
      meta: [{
        vmid: "description",
        name: "description",
        content: description
      }]
    };
  },


  methods: {
    generateMeta: function generateMeta(tag_name, q) {
      var meta = {
        title: "Available Posts",
        description: "Yussan Academy posts"
      };

      if (tag_name) {
        meta = {
          title: "Available Posts With Tag \"" + tag_name + "\"",
          description: "OYussan Academy posts with tag \"" + tag_name + "\""
        };
      }

      return meta;
    },
    generateParams: function generateParams() {
      var tag_name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$route.params.tag_name;
      var q = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$route.query.q;

      var params = { filter: this.filter, query: { draft: false, limit: 8 } };
      if (tag_name) params.query.tag = tag_name;
      if (q) params.query.keyword = q;
      return params;
    },
    fetchData: function fetchData() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.generateParams();

      this.$store.dispatch(TYPES.GET_POSTS, params);
    },
    fetchMoreData: function fetchMoreData() {
      var post = this.$store.state.post.list[this.filter].result;
      var params = this.generateParams();
      params.query.lastupdatedon = post[post.length - 1].updated_on;

      this.$store.dispatch(TYPES.GET_POSTS, params);
    }
  },

  computed: {
    post: function post() {
      return this.$store.state.post || {};
    }
  }
};

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(269);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("2499a004", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-6a80f840\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-6a80f840\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.posts .post-header[data-v-6a80f840] {\n  padding: 50px 0;\n  font-size: 20px;\n}\n.posts .post-header h1[data-v-6a80f840] {\n    font-size: 30px;\n    text-align: center;\n}\n", ""]);

// exports


/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "posts" }, [
    _c("div", { staticClass: "grid-center post-header" }, [
      _c("div", { staticClass: "col-7_md-7_sm-12" }, [
        _c("div", { staticClass: "grid" }, [
          _c("div", { staticClass: "col-12" }, [
            _c("h1", [_vm._v(_vm._s(_vm.title))])
          ])
        ])
      ])
    ]),
    _c(
      "div",
      { staticClass: "bg-soft-gray" },
      [
        _c("small-post-block", {
          attrs: {
            postData: _vm.post.list[_vm.filter],
            loadMoreHandler: _vm.fetchMoreData
          }
        })
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
    require("vue-hot-reload-api")      .rerender("data-v-6a80f840", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ })

});