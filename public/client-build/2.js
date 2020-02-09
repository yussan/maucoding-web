webpackJsonp([2],{

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datetime = __webpack_require__(8);

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

/***/ 161:
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

/***/ 162:
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

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostSmallCard_vue__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostSmallCard_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostSmallCard_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostSmallCard_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostSmallCard_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5c5eaa46_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_PostSmallCard_vue__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(166)
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

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(167);
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

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.card-post-small[data-v-5c5eaa46] {\n  width: 100%;\n  margin-bottom: 30px;\n  display: inline-flex;\n}\n.card-post-small .card-post-small_thumb[data-v-5c5eaa46] {\n    margin-right: 30px;\n    width: 350px;\n    height: 200px;\n    background-size: cover;\n    background-position: center;\n}\n.card-post-small .card-post-small_meta[data-v-5c5eaa46] {\n    width: calc(100% - 400px);\n}\n.card-post-small .card-post-small_meta h3[data-v-5c5eaa46] {\n      margin-top: 0;\n      color: #484848;\n      text-transform: capitalize;\n      line-height: 31.5px;\n      font-size: 21px;\n}\n.card-post-small .card-post-small_meta p[data-v-5c5eaa46] {\n      max-height: 110px;\n      overflow: hidden;\n}\n.card-post-small .card-post-small_meta .tag-post[data-v-5c5eaa46] {\n      margin-bottom: 10px;\n}\n.card-post-small .card-post-small_meta .tag-post a[data-v-5c5eaa46] {\n        text-transform: uppercase;\n        color: #545454;\n        border-bottom: 1px solid #ff3e3e;\n        margin-right: 10px;\n        padding-bottom: 5px;\n        font-size: 14px;\n}\n.card-post-small .card-post-small_author a[data-v-5c5eaa46] {\n    color: #545454 !important;\n}\n.card-post-small .card-post-small_author a span.text[data-v-5c5eaa46] {\n      top: -5px;\n      position: relative;\n      font-size: 14px;\n}\n.card-post-small .card-post-small_author img[data-v-5c5eaa46] {\n    width: 20px;\n    height: 20px;\n    border-radius: 20px;\n    margin-right: 10px;\n}\n@media (max-width: 48em) {\n.card-post-small[data-v-5c5eaa46] {\n    display: block;\n}\n.card-post-small .card-post-small_thumb[data-v-5c5eaa46] {\n      width: 100%;\n      margin-right: 0;\n      margin-bottom: 30px;\n}\n.card-post-small .card-post-small_meta[data-v-5c5eaa46] {\n      width: 100%;\n}\n}\n", ""]);

// exports


/***/ }),

/***/ 168:
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

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c2dc91c4_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(170)
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

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(171);
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

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.preloader-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px 5px;\n  min-height: 400px;\n}\n.dot {\n  display: inline-block;\n  background: #666;\n  height: 8px;\n  width: 8px;\n  opacity: 0.3;\n  border-radius: 50%;\n  animation: moveit 1.8s infinite;\n  padding: 5px;\n  margin: 1px;\n}\n.dot:nth-child(2) {\n    animation-delay: .15s;\n}\n.dot:nth-child(3) {\n    animation-delay: .3s;\n}\n.dot:nth-child(4) {\n    animation-delay: .45s;\n}\n.dot:nth-child(5) {\n    animation-delay: .6s;\n}\n@keyframes moveit {\n0% {\n    transform: translateY(0px);\n}\n35% {\n    transform: translateY(0px);\n    opacity: 0.3;\n}\n50% {\n    transform: translateY(-20px);\n    opacity: 0.8;\n}\n70% {\n    transform: translateY(3px);\n    opacity: 0.8;\n}\n85% {\n    transform: translateY(-3px);\n}\n}\n\n/* Preloader #2 */\n.preloader-squares {\n  width: 50px;\n  line-height: 19px;\n  height: 50px;\n}\n.preloader-squares .square {\n    display: inline-block;\n    width: 15px;\n    height: 15px;\n    background: #666;\n    opacity: 0.2;\n    animation: movein 2s infinite;\n}\n.square {\n  opacity: 0.5;\n}\n.preloader-squares .square:nth-child(1) {\n  transform: translate(0, -25px);\n}\n.preloader-squares .square:nth-child(2) {\n  transform: translate(25px, 0);\n}\n.preloader-squares .square:nth-child(3) {\n  transform: translate(-25px, 0);\n}\n.preloader-squares .square:nth-child(4) {\n  transform: translate(0, 25px);\n}\n@keyframes movein {\n33% {\n    transform: translate(0, 0);\n    opacity: 0.7;\n}\n66% {\n    transform: translate(0, 0);\n    opacity: 0.7;\n}\n}\n\n/*Preloader #3 */\n.pulse-center {\n  background: #666;\n  width: 15px;\n  height: 15px;\n  border-radius: 50%;\n  animation: pulse 1.5s infinite;\n  position: absolute;\n  opacity: 0.8;\n  z-index: 5;\n}\n.pulse-explosion {\n  content: '';\n  width: 15px;\n  height: 15px;\n  background: #ccc;\n  border-radius: 50%;\n  position: absolute;\n  animation: pulse-radius 1.5s infinite;\n  z-index: 1;\n}\n@keyframes pulse {\n30% {\n    transform: scale(0.7);\n    opacity: 0.8;\n}\n50% {\n    transform: scale(1.1);\n    opacity: 1.0;\n}\n70% {\n    transform: scale(0.8);\n    opacity: 0.8;\n}\n}\n@keyframes pulse-radius {\n30% {\n    transform: scale(0.7);\n    opacity: 1;\n}\n40% {\n    transform: scale(7.8);\n    opacity: 0.1;\n}\n80% {\n    transform: scale(4.8);\n    opacity: 0;\n}\n100% {\n    transform: scale(1);\n    opacity: 0;\n}\n}\n\n/*Preloader #4 */\n.preloader-chasing-squares {\n  width: 50px;\n  height: 50px;\n  line-height: 19px;\n}\n.preloader-chasing-squares .square {\n    display: inline-block;\n    width: 15px;\n    height: 15px;\n    opacity: 1;\n    background: #666;\n    animation: focusfade 2.8s infinite;\n}\n.preloader-chasing-squares .square:nth-child(2) {\n      animation-delay: .7s;\n}\n.preloader-chasing-squares .square:nth-child(3) {\n      animation-delay: 2.1s;\n}\n.preloader-chasing-squares .square:nth-child(4) {\n      animation-delay: 1.4s;\n}\n@keyframes focusfade {\n0% {\n    opacity: 0.5;\n    background: #000;\n}\n30% {\n    opacity: 0.5;\n    background: #666;\n}\n60% {\n    opacity: 0;\n}\n75% {\n    opacity: 0;\n}\n100% {\n    opacity: 0.5;\n    background: #000;\n}\n}\n\n/* preloader 5 */\n.preloader-dotline .dot {\n  display: inline-block;\n  background: #666;\n  height: 5px;\n  width: 5px;\n  opacity: 0;\n  border-radius: 50%;\n  animation: dotline-move 4s infinite;\n  transform: translateX(-300px);\n}\n.preloader-dotline .dot:nth-child(1) {\n    animation-delay: .8s;\n}\n.preloader-dotline .dot:nth-child(2) {\n    animation-delay: .7s;\n}\n.preloader-dotline .dot:nth-child(3) {\n    animation-delay: .6s;\n}\n.preloader-dotline .dot:nth-child(4) {\n    animation-delay: .5s;\n}\n.preloader-dotline .dot:nth-child(5) {\n    animation-delay: .4s;\n}\n.preloader-dotline .dot:nth-child(6) {\n    animation-delay: .3s;\n}\n.preloader-dotline .dot:nth-child(7) {\n    animation-delay: .2s;\n}\n.preloader-dotline .dot:nth-child(8) {\n    animation-delay: .1s;\n}\n@keyframes dotline-move {\n40% {\n    transform: translateX(0px);\n    opacity: 0.8;\n}\n100% {\n    transform: translateX(300px);\n    opacity: 0;\n}\n}\n\n/* preloader pacman */\n.preloader-pacman .dot {\n  display: inline-block;\n  background: #666;\n  height: 5px;\n  width: 5px;\n  margin-right: 20px;\n  opacity: 0.7;\n  border-radius: 50%;\n  animation: fade-out 14s linear infinite;\n}\n.preloader-pacman .pacman {\n  display: inline-block;\n  background: #666;\n  height: 20px;\n  vertical-align: bottom;\n  width: 20px;\n  margin-right: 20px;\n  opacity: 1;\n  border-radius: 50%;\n  position: relative;\n  animation: move-forward 14s linear infinite;\n  transform: translateX(-40px);\n}\n.preloader-pacman .dot:nth-child(1) {\n  animation-delay: .4s;\n}\n.preloader-pacman .dot:nth-child(2) {\n  animation-delay: .8s;\n}\n.preloader-pacman .dot:nth-child(3) {\n  animation-delay: 1.2s;\n}\n.preloader-pacman .dot:nth-child(4) {\n  animation-delay: 1.6s;\n}\n.preloader-pacman .dot:nth-child(5) {\n  animation-delay: 2.0s;\n}\n.preloader-pacman .dot:nth-child(6) {\n  animation-delay: 2.4s;\n}\n.preloader-pacman .dot:nth-child(7) {\n  animation-delay: 2.8s;\n}\n.preloader-pacman .dot:nth-child(8) {\n  animation-delay: 3.2s;\n}\n.preloader-pacman .dot:nth-child(9) {\n  animation-delay: 3.6s;\n}\n.preloader-pacman .dot:nth-child(10) {\n  animation-delay: 4.0s;\n}\n.preloader-pacman .dot:nth-child(11) {\n  animation-delay: 4.4s;\n}\n.preloader-pacman .dot:nth-child(12) {\n  animation-delay: 4.8s;\n}\n.preloader-pacman .dot:nth-child(13) {\n  animation-delay: 5.2s;\n}\n.preloader-pacman .dot:nth-child(14) {\n  animation-delay: 5.6s;\n}\n.preloader-pacman .dot:nth-child(15) {\n  animation-delay: 6.0s;\n}\n.preloader-pacman .dot:nth-child(16) {\n  animation-delay: 6.4s;\n}\n.preloader-pacman .dot:nth-child(17) {\n  animation-delay: 6.8s;\n}\n.preloader-pacman .pacman:before {\n  content: '';\n  display: inline-block;\n  background: transparent;\n  vertical-align: bottom;\n  border-top: 10px solid transparent;\n  border-bottom: 10px solid transparent;\n  right: 0px;\n  border-right: 10px solid #fff;\n  opacity: 1;\n  position: absolute;\n  animation: eat .4s infinite;\n}\n.preloader-pacman .ghost {\n  height: 25px;\n  width: 25px;\n  background: #669;\n  top: -22px;\n  border-top-left-radius: 50%;\n  border-top-right-radius: 50%;\n  position: relative;\n  transform: translateX(550px);\n  animation: move-back 14s linear infinite;\n  animation-delay: 7s;\n  opacity: 0;\n}\n.preloader-pacman .ghost:before {\n    height: 5px;\n    content: '';\n    width: 3px;\n    background: #fff;\n    top: 7px;\n    left: 7px;\n    z-index: 10;\n    position: absolute;\n}\n.preloader-pacman .ghost:after {\n    height: 5px;\n    content: '';\n    width: 3px;\n    background: #fff;\n    top: 7px;\n    right: 7px;\n    z-index: 10;\n    position: absolute;\n}\n@keyframes eat {\n50% {\n    transform: translateX(10px) scale(0.1);\n}\n}\n@keyframes move-back {\n3% {\n    opacity: 1;\n}\n35% {\n    opacity: 1;\n}\n49% {\n    opacity: 0;\n}\n50% {\n    transform: translateX(0px);\n}\n}\n@keyframes move-forward {\n50% {\n    transform: translateX(500px);\n}\n50.1% {\n    transform: translateX(500px) scaleX(-1);\n    opacity: 1;\n}\n100% {\n    transform: translateX(-40px) scaleX(-1);\n}\n}\n@keyframes fade-out {\n0% {\n    opacity: 0;\n}\n40% {\n    opacity: 0;\n}\n89.99% {\n    opacity: 0;\n}\n90% {\n    opacity: 0.5;\n}\n}\n", ""]);

// exports


/***/ }),

/***/ 172:
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

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FullWidthButton_vue__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FullWidthButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FullWidthButton_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FullWidthButton_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_FullWidthButton_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5e134e76_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_FullWidthButton_vue__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(174)
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

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(175);
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

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\na[data-v-5e134e76], button[data-v-5e134e76] {\n  color: #484848;\n  display: block;\n  text-align: center;\n  padding: 10px 20px;\n  border: 1px solid #b1b1b1;\n  font-size: 15px;\n  cursor: pointer;\n}\nbutton[data-v-5e134e76] {\n  width: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ 176:
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

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _metainfo = __webpack_require__(226);

var _metainfo2 = _interopRequireDefault(_metainfo);

var _types = __webpack_require__(7);

var TYPES = _interopRequireWildcard(_types);

var _Slider = __webpack_require__(227);

var _Slider2 = _interopRequireDefault(_Slider);

var _publicLayout = __webpack_require__(231);

var _publicLayout2 = _interopRequireDefault(_publicLayout);

var _PostBlock = __webpack_require__(241);

var _PostBlock2 = _interopRequireDefault(_PostBlock);

var _PostLargeCard = __webpack_require__(203);

var _PostLargeCard2 = _interopRequireDefault(_PostLargeCard);

var _boxTitle = __webpack_require__(50);

var _boxTitle2 = _interopRequireDefault(_boxTitle);

var _FullWidthButton = __webpack_require__(173);

var _FullWidthButton2 = _interopRequireDefault(_FullWidthButton);

var _ads = __webpack_require__(248);

var _ads2 = _interopRequireDefault(_ads);

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

_vue2.default.component("post-card-large", _PostLargeCard2.default);

// components

_vue2.default.component("post-block", _PostBlock2.default);
_vue2.default.component("box-title", _boxTitle2.default);
_vue2.default.component("layout", _publicLayout2.default);
_vue2.default.component("full-button", _FullWidthButton2.default);
_vue2.default.component("ga", _ads2.default);
_vue2.default.component("slider", _Slider2.default);

exports.default = {
  metaInfo: function metaInfo() {
    return {
      title: _metainfo2.default.title,
      meta: [{
        vmid: "description",
        name: "description",
        content: _metainfo2.default.description
      }]
    };
  },
  created: function created() {
    this.$store.dispatch(TYPES.GET_POSTS, {
      filter: "latest",
      query: {
        limit: 16,
        draft: false
      }
    });
  },


  computed: {
    post: function post() {
      return this.$store.state.post.list || {};
    }
  }
};

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = __webpack_require__(11);

exports.default = {
  mounted: function mounted() {
    var _this = this;

    (0, _dom.injectScript)("/vendors/glide/glide.min.js", {
      cb: function cb() {
        setTimeout(function () {
          _this.renderSlider();
        }, 1000);
      }
    });
    (0, _dom.injectCss)("/vendors/glide/css/glide.core.min.css");
    (0, _dom.injectCss)("/vendors/glide/css/glide.theme.min.css");
  },


  props: ["total"],

  methods: {
    renderSlider: function renderSlider() {
      new Glide("#oopsreview-slider").mount();
    }
  }
}; //
//
//
//
//
//
//
//
//

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _sidebarRight = __webpack_require__(232);

var _sidebarRight2 = _interopRequireDefault(_sidebarRight);

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

_vue2.default.component("sidebar-right", _sidebarRight2.default);

exports.default = {};

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _types = __webpack_require__(7);

var TYPES = _interopRequireWildcard(_types);

var _TagButton = __webpack_require__(235);

var _TagButton2 = _interopRequireDefault(_TagButton);

var _boxTitle = __webpack_require__(50);

var _boxTitle2 = _interopRequireDefault(_boxTitle);

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

var DUMMY_POPULAR_TAGS = ["javascript", "python", "reactjs", "vuejs", "machine learning", "third party", "api", "tensorflow", "frontend"];

_vue2.default.component("box-title", _boxTitle2.default);
_vue2.default.component("tag-button", _TagButton2.default);

exports.default = {
  name: "sidebar-right",
  data: function data() {
    return {
      popularTags: DUMMY_POPULAR_TAGS
    };
  },
  created: function created() {
    this.$store.dispatch(TYPES.GET_POSTS, {
      filter: "featured",
      query: {
        featured: true,
        draft: false,
        limit: 8
      }
    });
  },

  computed: {
    post: function post() {
      return this.$store.state.post.list || {};
    }
  }
};

/***/ }),

/***/ 201:
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

var props = ["text"];

exports.default = {
  props: props
};

/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _PostLargeCard = __webpack_require__(203);

var _PostLargeCard2 = _interopRequireDefault(_PostLargeCard);

var _PostSmallCard = __webpack_require__(165);

var _PostSmallCard2 = _interopRequireDefault(_PostSmallCard);

var _index = __webpack_require__(169);

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


var props = ["postData", "removeFirst"];

_vue2.default.component("post-card-large", _PostLargeCard2.default);
_vue2.default.component("post-card-small", _PostSmallCard2.default);
_vue2.default.component("loading", _index2.default);

exports.default = {
  props: props

  // watch: {
  //   postData(val) {
  //   }
  // }
};

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostLargeCard_vue__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostLargeCard_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostLargeCard_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostLargeCard_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostLargeCard_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_eb51470c_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_PostLargeCard_vue__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(244)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-eb51470c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostLargeCard_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_eb51470c_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_PostLargeCard_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_eb51470c_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_PostLargeCard_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/v2/cards/PostLargeCard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-eb51470c", Component.options)
  } else {
    hotAPI.reload("data-v-eb51470c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datetime = __webpack_require__(8);

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

exports.default = {
  props: props,
  methods: {
    epochToRelative: function epochToRelative(epochtime) {
      return (0, _datetime.epochToRelative)(epochtime);
    }
  }
};

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony default export */ __webpack_exports__["default"] = ({
    title: "Tech from Engineer Perspective",
    description: "Let's make technology accessible, affordable and easy for everyone to learn with Yussan Academy"
});


/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Slider_vue__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Slider_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Slider_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Slider_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Slider_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0672def6_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_Slider_vue__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(228)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Slider_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0672def6_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_Slider_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0672def6_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_Slider_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/v2/blocks/Slider.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0672def6", Component.options)
  } else {
    hotAPI.reload("data-v-0672def6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(229);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("5b890489", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Slider.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Slider.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n#oopsreview-slider.glide .card-post-large {\n  box-shadow: none;\n  background: #f4f4f4;\n}\n#oopsreview-slider.glide .glide__bullets {\n  bottom: 0;\n}\n#oopsreview-slider.glide .glide__bullets button.glide__bullet {\n    box-shadow: none;\n    border: 1px solid #b1b1b1;\n    padding: 6px;\n}\n#oopsreview-slider.glide .glide__bullets button.glide__bullet.glide__bullet--active {\n      background-color: #b1b1b1;\n}\n", ""]);

// exports


/***/ }),

/***/ 230:
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
    { staticClass: "glide", attrs: { id: "oopsreview-slider" } },
    [
      _c(
        "div",
        { staticClass: "glide__track", attrs: { "data-glide-el": "track" } },
        [
          _c(
            "div",
            { staticClass: "glide__slides" },
            [_vm._t("slider-item")],
            2
          )
        ]
      ),
      _vm.total > 1
        ? _c(
            "div",
            {
              staticClass: "glide__bullets",
              attrs: { "data-glide-el": "controls[nav]" }
            },
            _vm._l(_vm.total, function(n, index) {
              return _c("button", {
                staticClass: "glide__bullet",
                attrs: { "data-glide-dir": "=" + (n - 1) }
              })
            }),
            0
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0672def6", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_public_layout_vue__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_public_layout_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_public_layout_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_public_layout_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_public_layout_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ccc7fc08_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_public_layout_vue__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_public_layout_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ccc7fc08_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_public_layout_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ccc7fc08_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_public_layout_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/layouts/v2/public-layout.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ccc7fc08", Component.options)
  } else {
    hotAPI.reload("data-v-ccc7fc08", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sidebar_right_vue__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sidebar_right_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sidebar_right_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sidebar_right_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sidebar_right_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8aac15d4_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_sidebar_right_vue__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(233)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8aac15d4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_sidebar_right_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8aac15d4_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_sidebar_right_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8aac15d4_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_sidebar_right_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/v2/navigations/sidebar-right.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8aac15d4", Component.options)
  } else {
    hotAPI.reload("data-v-8aac15d4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(234);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("409ac8e2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-8aac15d4\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./sidebar-right.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-8aac15d4\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./sidebar-right.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.right-sidebar[data-v-8aac15d4] {\n  padding: 0 10px;\n}\n.right-sidebar .right-sidebar_content[data-v-8aac15d4] {\n    margin: 20px 0;\n}\n.right-sidebar .right-sidebar_content .right-sidebar_content_list[data-v-8aac15d4] {\n      width: 100%;\n      margin: 20px 0 -4px;\n      display: inline-block;\n}\n.right-sidebar .right-sidebar_content .right-sidebar_content_list[data-v-8aac15d4]:first-child {\n        margin-top: 0;\n}\n.right-sidebar .right-sidebar_content .right-sidebar_content_list a[data-v-8aac15d4] {\n        font-weight: bold;\n        color: #484848;\n}\n.right-sidebar .right-sidebar_content .right-sidebar_content_list .right-sidebar_content_list_thumb[data-v-8aac15d4] {\n        background-size: cover;\n        background-position: center;\n        width: 90px;\n        height: 60px;\n        float: left;\n        margin: 0 20px 10px 0;\n}\n.right-sidebar .right-sidebar_content .right-sidebar_content_list .right-sidebar_content_list_thumb.app_thumb[data-v-8aac15d4] {\n          width: 45px;\n          height: 45px;\n}\n.right-sidebar .right-sidebar_content a.more-link[data-v-8aac15d4] {\n      color: #484848;\n      text-align: center;\n      display: block;\n      padding: 10px 0;\n      font-size: 14px;\n      border-top: 1px solid #f4f4f4;\n      border-bottom: 1px solid #f4f4f4;\n      margin: 20px 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TagButton_vue__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TagButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TagButton_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TagButton_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TagButton_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8ab6b4ce_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_TagButton_vue__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(236)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8ab6b4ce"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TagButton_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8ab6b4ce_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_TagButton_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8ab6b4ce_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_TagButton_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/v2/buttons/TagButton.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8ab6b4ce", Component.options)
  } else {
    hotAPI.reload("data-v-8ab6b4ce", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(237);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("dd6eb07a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-8ab6b4ce\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TagButton.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-8ab6b4ce\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TagButton.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\na[data-v-8ab6b4ce] {\n  padding: 5px 0;\n  margin-bottom: 5px;\n  border-bottom: 1px solid #9e9e9e;\n  display: inline-block;\n  margin-right: 10px;\n}\na[data-v-8ab6b4ce]:hover {\n    background-color: #f4f4f4;\n}\n", ""]);

// exports


/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("router-link", { attrs: { to: "/tag/" + _vm.text } }, [
    _vm._v(" " + _vm._s(_vm.text))
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8ab6b4ce", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 239:
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
    { staticClass: "right-sidebar" },
    [
      _c("box-title", { attrs: { text: "Popular Content" } }),
      _vm.post.featured && _vm.post.featured.status == 200
        ? _c(
            "div",
            { staticClass: "right-sidebar_content" },
            [
              _vm._l(_vm.post.featured.result, function(data, key) {
                return _c(
                  "div",
                  { key: key, staticClass: "right-sidebar_content_list" },
                  [
                    _c(
                      "router-link",
                      {
                        attrs: {
                          to: "/post/" + data.nospace_title + "-" + data._id
                        }
                      },
                      [
                        _c("div", {
                          staticClass: "right-sidebar_content_list_thumb",
                          style:
                            "background-image:url(" + data.image.small + ")"
                        }),
                        _c("strong", [_vm._v(_vm._s(data.title))])
                      ]
                    )
                  ],
                  1
                )
              }),
              _c(
                "router-link",
                {
                  staticClass: "more-link",
                  attrs: { to: "/posts?featured=1" }
                },
                [_vm._v("Show more popular content")]
              )
            ],
            2
          )
        : _vm._e(),
      _c("div", { staticClass: "m-t-30" }),
      _c("box-title", { attrs: { text: "Popular Tags" } }),
      _c(
        "p",
        _vm._l(_vm.popularTags, function(tag, key) {
          return _c("tag-button", { key: key, attrs: { text: tag } })
        }),
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8aac15d4", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "m-t-50" }),
    _c("div", { staticClass: "grid" }, [
      _c(
        "div",
        { staticClass: "col-8_md-8_sm-12" },
        [_vm._t("main-content")],
        2
      ),
      _c("div", { staticClass: "col-4_md-4_sm-12" }, [_c("sidebar-right")], 1)
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ccc7fc08", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostBlock_vue__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostBlock_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostBlock_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostBlock_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostBlock_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7dff2a4e_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_PostBlock_vue__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(242)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7dff2a4e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PostBlock_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7dff2a4e_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_PostBlock_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7dff2a4e_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_PostBlock_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/v2/blocks/PostBlock.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7dff2a4e", Component.options)
  } else {
    hotAPI.reload("data-v-7dff2a4e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(243);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("6af0fe54", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-7dff2a4e\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PostBlock.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-7dff2a4e\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PostBlock.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(245);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("1a36eefa", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-eb51470c\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PostLargeCard.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-eb51470c\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PostLargeCard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.card-post-large[data-v-eb51470c] {\n  margin-bottom: 30px;\n  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.05);\n}\n.card-post-large[data-v-eb51470c]:hover {\n    box-shadow: 0 3px 7px 2px rgba(0, 0, 0, 0.1);\n}\n.card-post-large .card-post-large_thumb[data-v-eb51470c] {\n    background-size: cover;\n    background-position: center;\n    height: 450px;\n    width: 100%;\n}\n.card-post-large .card-post-large_meta[data-v-eb51470c] {\n    padding: 20px 15px;\n}\n.card-post-large .card-post-large_meta .tag-post a[data-v-eb51470c] {\n      text-transform: uppercase;\n      color: #545454;\n      border-bottom: 1px solid #ff3e3e;\n      margin-right: 10px;\n      padding-bottom: 5px;\n      font-size: 14px;\n}\n.card-post-large .card-post-large_meta h2[data-v-eb51470c] {\n      font-size: 37px;\n      font-weight: 700;\n      text-transform: capitalize;\n}\n.card-post-large .card-post-large_author a[data-v-eb51470c] {\n    color: #545454 !important;\n}\n.card-post-large .card-post-large_author a span.text[data-v-eb51470c] {\n      top: -9px;\n      position: relative;\n}\n.card-post-large .card-post-large_author img[data-v-eb51470c] {\n    width: 30px;\n    height: 30px;\n    border-radius: 15px;\n    margin-right: 10px;\n}\n.card-post-large h2[data-v-eb51470c] {\n    color: #484848;\n}\n", ""]);

// exports


/***/ }),

/***/ 246:
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
    { staticClass: "card-post-large" },
    [
      _c(
        "router-link",
        {
          attrs: { to: "/post/" + _vm.data.nospace_title + "-" + _vm.data._id }
        },
        [
          _c("div", {
            staticClass: "card-post-large_thumb",
            style: "background-image:url(" + _vm.data.image.original + ")"
          }),
          _c("div", { staticClass: "card-post-large_meta" }, [
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
            _c("h2", [_vm._v(_vm._s(_vm.data.title))]),
            _c(
              "div",
              { staticClass: "card-post-large_author" },
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
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-eb51470c", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.postData.result && _vm.postData.result.length > 0
      ? _c(
          "div",
          { staticClass: "posts-block" },
          _vm._l(_vm.postData.result, function(data, key) {
            return _c(
              "div",
              { key: key },
              [
                key == 0 || key % 3 != 0
                  ? _c("post-card-small", { attrs: { data: data } })
                  : _c("post-card-large", { attrs: { data: data } })
              ],
              1
            )
          }),
          0
        )
      : _vm._e(),
    !_vm.postData || !_vm.postData.status || _vm.postData.loading
      ? _c("div", [_c("loading")], 1)
      : _vm._e(),
    _vm.postData.status &&
    _vm.postData.status.message &&
    _vm.postData.status != 200
      ? _c("div", [_c("p", [_vm._v(_vm._s(_vm.postData.status.message))])])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7dff2a4e", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a6beb5f_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_ads_vue__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(249)
}
/* script */
var __vue_script__ = null
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6a6beb5f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a6beb5f_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_ads_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a6beb5f_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_ads_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/v2/cards/ads.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6a6beb5f", Component.options)
  } else {
    hotAPI.reload("data-v-6a6beb5f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(250);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("e8574b0e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-6a6beb5f\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ads.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-6a6beb5f\",\"scoped\":true,\"sourceMap\":false}!../../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ads.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 251:
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
    return _c("div", { staticClass: "oopsreview-ga" }, [
      _c("ins", {
        staticClass: "adsbygoogle",
        staticStyle: { display: "block" },
        attrs: {
          "data-ad-client": "ca-pub-4468477322781117",
          "data-ad-slot": "5976813891",
          "data-ad-format": "auto",
          "data-full-width-responsive": "true"
        }
      })
    ])
  }
]
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6a6beb5f", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("layout", [
    _c("div", { staticClass: "m-t-30" }),
    _c(
      "div",
      { attrs: { slot: "main-content" }, slot: "main-content" },
      [
        _vm.post.featured &&
        _vm.post.featured.result &&
        _vm.post.featured.result.length > 0
          ? _c(
              "slider",
              {
                attrs: {
                  total:
                    _vm.post.featured && _vm.post.featured.result
                      ? _vm.post.featured.result.length
                      : 0
                }
              },
              _vm._l(_vm.post.featured.result, function(post, key) {
                return _c("post-card-large", {
                  key: key,
                  staticClass: "glide__slide",
                  attrs: { slot: "slider-item", data: post },
                  slot: "slider-item"
                })
              }),
              1
            )
          : _vm._e(),
        _vm.post.featured &&
        _vm.post.featured.result &&
        _vm.post.featured.result.length > 0
          ? _c("div", { staticClass: "m-t-30" })
          : _vm._e(),
        _c("box-title", { attrs: { text: "Latest Post" } }),
        _c("div", { staticClass: "m-t-50" }),
        _c("post-block", {
          attrs: { removeFirst: "true", postData: _vm.post.latest }
        }),
        _vm.post.latest.result && _vm.post.latest.result.length > 0
          ? _c("full-button", { attrs: { to: "/posts", text: "More Posts" } })
          : _vm._e(),
        _c("div", { staticClass: "m-t-30" })
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
    require("vue-hot-reload-api")      .rerender("data-v-577e4542", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_577e4542_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_577e4542_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_577e4542_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/pages/v2/home/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-577e4542", Component.options)
  } else {
    hotAPI.reload("data-v-577e4542", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ })

});