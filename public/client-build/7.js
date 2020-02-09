webpackJsonp([7],{

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_post_app_vue__ = __webpack_require__(196);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_387b7a64_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_post_app_vue__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(223)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-387b7a64"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_post_app_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_387b7a64_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_post_app_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_387b7a64_hasScoped_true_optionsId_0_buble_transforms_node_modules_vue_loader_lib_template_compiler_preprocessor_engine_pug_optionsId_0_node_modules_vue_loader_lib_selector_type_template_index_0_post_app_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/client/components/cards/post-app.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-387b7a64", Component.options)
  } else {
    hotAPI.reload("data-v-387b7a64", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_string_manager__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_string_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_string_manager__);


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].extend({
    name: "card-post-app",
    props: ["app"],
    methods: {
        toCamelCase(str) {
            return Object(__WEBPACK_IMPORTED_MODULE_1_string_manager__["toCamelCase"])(str);
        }
    }
}));


/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(224);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("53f89bcd", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-387b7a64\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./post-app.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"id\":\"data-v-387b7a64\",\"scoped\":true,\"sourceMap\":false}!../../../../node_modules/sass-loader/lib/loader.js?indentedSyntax!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./post-app.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.app-card[data-v-387b7a64] {\n  padding: 10px;\n  border: 1px solid #b1b1b1;\n  color: #545454;\n  margin-bottom: 15px !important;\n  font-size: 13px;\n}\n", ""]);

// exports


/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "app-card grid" }, [
    _c(
      "div",
      {
        staticClass: "col-6_sm-12 no-padding",
        staticStyle: { "padding-right": "10px !important" }
      },
      [
        _c("strong", [
          _c("a", { attrs: { href: "javascript:;" } }, [
            _vm._v(_vm._s(_vm.toCamelCase(_vm.app.name)) + " ")
          ])
        ]),
        _vm._v("by "),
        _c("strong", [
          _c("a", { attrs: { href: "javascript:;" } }, [
            _vm._v(_vm._s(_vm.toCamelCase(_vm.app.vendor_name)))
          ])
        ]),
        _c("br"),
        _vm._v(_vm._s(_vm.app.description)),
        _c("br"),
        _c("strong", [_vm._v("Category: ")]),
        _vm._v(_vm._s(_vm.app.categories)),
        _c("br"),
        _c("strong", [_vm._v("Website: ")]),
        _c("a", { attrs: { href: _vm.app.link, target: "_blank" } }, [
          _vm._v(_vm._s(_vm.app.link))
        ]),
        _c("br")
      ]
    ),
    _vm._m(0)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass: "col-6_sm-12 no-padding",
        staticStyle: { "padding-right": "10px !important" }
      },
      [
        _c("strong", [_vm._v("Oopsreview Rating Overall : 4/5")]),
        _c("br"),
        _vm._v("Design : 4/5"),
        _c("br"),
        _vm._v("Easy to Use : 4/5"),
        _c("br"),
        _vm._v("Features : 4/5"),
        _c("br"),
        _vm._v("Stable : 5/5")
      ]
    )
  }
]
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-387b7a64", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ })

});