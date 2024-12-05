"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/page.js":
/*!*************************!*\
  !*** ./src/app/page.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/api */ \"(app-pages-browser)/./services/api.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction Home() {\n    _s();\n    const [products, setProducts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"Home.useEffect\": ()=>{\n            const fetchProducts = {\n                \"Home.useEffect.fetchProducts\": async ()=>{\n                    try {\n                        const { data } = await _services_api__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get('/products/with-categories');\n                        console.log(data); // ตรวจสอบข้อมูลที่ดึงมา\n                        setProducts(data);\n                        setLoading(false);\n                    } catch (err) {\n                        console.error('Error fetching products:', err.message);\n                        setLoading(false);\n                    }\n                }\n            }[\"Home.useEffect.fetchProducts\"];\n            fetchProducts();\n        }\n    }[\"Home.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            padding: '20px'\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Products Page\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                lineNumber: 29,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"hr\", {\n                className: \"bg-gray-500 my-3\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                lineNumber: 30,\n                columnNumber: 7\n            }, this),\n            loading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"Loading...\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                lineNumber: 32,\n                columnNumber: 9\n            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"table\", {\n                border: \"1\",\n                style: {\n                    width: '100%',\n                    borderCollapse: 'collapse',\n                    marginTop: '20px'\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"thead\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Product ID\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                    lineNumber: 37,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Product Name\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                    lineNumber: 38,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"SKU\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                    lineNumber: 39,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Category Name\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                    lineNumber: 40,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Description\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                    lineNumber: 41,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Quantity\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                    lineNumber: 42,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Unit Price\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                    lineNumber: 43,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Created At\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                    lineNumber: 44,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Updated At\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                    lineNumber: 45,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                            lineNumber: 36,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                        lineNumber: 35,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tbody\", {\n                        children: products.map((product)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: product.product_id\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                        lineNumber: 51,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: product.product_name\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                        lineNumber: 52,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: product.sku\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                        lineNumber: 53,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: product.category_name\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                        lineNumber: 54,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: product.description\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                        lineNumber: 55,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: product.quantity\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                        lineNumber: 56,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: [\n                                            \"$\",\n                                            Number(product.unit_price).toFixed(2)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                        lineNumber: 57,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: new Date(product.created_at).toLocaleString()\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                        lineNumber: 58,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: new Date(product.updated_at).toLocaleString()\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                        lineNumber: 59,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: product.is_active\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                        lineNumber: 60,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, product.product_id, true, {\n                                fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                                lineNumber: 50,\n                                columnNumber: 15\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                        lineNumber: 48,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n                lineNumber: 34,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\saral\\\\inventory-menagement-system\\\\frontend\\\\src\\\\app\\\\page.js\",\n        lineNumber: 28,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"KWid68LpBxbFhyja5dauhUIHvyY=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcGFnZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRTRDO0FBQ1A7QUFHdEIsU0FBU0c7O0lBQ3RCLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHSiwrQ0FBUUEsQ0FBQyxFQUFFO0lBQzNDLE1BQU0sQ0FBQ0ssU0FBU0MsV0FBVyxHQUFHTiwrQ0FBUUEsQ0FBQztJQUV2Q0QsZ0RBQVNBOzBCQUFDO1lBQ1IsTUFBTVE7Z0RBQWdCO29CQUNwQixJQUFJO3dCQUNGLE1BQU0sRUFBRUMsSUFBSSxFQUFFLEdBQUcsTUFBTVAscURBQUdBLENBQUNRLEdBQUcsQ0FBQzt3QkFDL0JDLFFBQVFDLEdBQUcsQ0FBQ0gsT0FBTyx3QkFBd0I7d0JBQzNDSixZQUFZSTt3QkFDWkYsV0FBVztvQkFDYixFQUFFLE9BQU9NLEtBQUs7d0JBQ1pGLFFBQVFHLEtBQUssQ0FBQyw0QkFBNEJELElBQUlFLE9BQU87d0JBQ3JEUixXQUFXO29CQUNiO2dCQUNGOztZQUVBQztRQUNGO3lCQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ1E7UUFBSUMsT0FBTztZQUFFQyxTQUFTO1FBQU87OzBCQUM1Qiw4REFBQ0M7MEJBQUc7Ozs7OzswQkFDSiw4REFBQ0M7Z0JBQUdDLFdBQVU7Ozs7OztZQUNiZix3QkFDQyw4REFBQ2dCOzBCQUFFOzs7OztxQ0FFSCw4REFBQ0M7Z0JBQU1DLFFBQU87Z0JBQUlQLE9BQU87b0JBQUVRLE9BQU87b0JBQVFDLGdCQUFnQjtvQkFBWUMsV0FBVztnQkFBTzs7a0NBQ3RGLDhEQUFDQztrQ0FDQyw0RUFBQ0M7OzhDQUNDLDhEQUFDQzs4Q0FBRzs7Ozs7OzhDQUNKLDhEQUFDQTs4Q0FBRzs7Ozs7OzhDQUNKLDhEQUFDQTs4Q0FBRzs7Ozs7OzhDQUNKLDhEQUFDQTs4Q0FBRzs7Ozs7OzhDQUNKLDhEQUFDQTs4Q0FBRzs7Ozs7OzhDQUNKLDhEQUFDQTs4Q0FBRzs7Ozs7OzhDQUNKLDhEQUFDQTs4Q0FBRzs7Ozs7OzhDQUNKLDhEQUFDQTs4Q0FBRzs7Ozs7OzhDQUNKLDhEQUFDQTs4Q0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBR1IsOERBQUNDO2tDQUNFM0IsU0FBUzRCLEdBQUcsQ0FBQyxDQUFDQyx3QkFDYiw4REFBQ0o7O2tEQUNDLDhEQUFDSztrREFBSUQsUUFBUUUsVUFBVTs7Ozs7O2tEQUN2Qiw4REFBQ0Q7a0RBQUlELFFBQVFHLFlBQVk7Ozs7OztrREFDekIsOERBQUNGO2tEQUFJRCxRQUFRSSxHQUFHOzs7Ozs7a0RBQ2hCLDhEQUFDSDtrREFBSUQsUUFBUUssYUFBYTs7Ozs7O2tEQUMxQiw4REFBQ0o7a0RBQUlELFFBQVFNLFdBQVc7Ozs7OztrREFDeEIsOERBQUNMO2tEQUFJRCxRQUFRTyxRQUFROzs7Ozs7a0RBQ3JCLDhEQUFDTjs7NENBQUc7NENBQUVPLE9BQU9SLFFBQVFTLFVBQVUsRUFBRUMsT0FBTyxDQUFDOzs7Ozs7O2tEQUN6Qyw4REFBQ1Q7a0RBQUksSUFBSVUsS0FBS1gsUUFBUVksVUFBVSxFQUFFQyxjQUFjOzs7Ozs7a0RBQ2hELDhEQUFDWjtrREFBSSxJQUFJVSxLQUFLWCxRQUFRYyxVQUFVLEVBQUVELGNBQWM7Ozs7OztrREFDaEQsOERBQUNaO2tEQUFJRCxRQUFRZSxTQUFTOzs7Ozs7OytCQVZmZixRQUFRRSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJ6QztHQTlEd0JoQztLQUFBQSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxzYXJhbFxcaW52ZW50b3J5LW1lbmFnZW1lbnQtc3lzdGVtXFxmcm9udGVuZFxcc3JjXFxhcHBcXHBhZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEFQSSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGknO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IFtwcm9kdWN0cywgc2V0UHJvZHVjdHNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoUHJvZHVjdHMgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IEFQSS5nZXQoJy9wcm9kdWN0cy93aXRoLWNhdGVnb3JpZXMnKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7IC8vIOC4leC4o+C4p+C4iOC4quC4reC4muC4guC5ieC4reC4oeC4ueC4peC4l+C4teC5iOC4lOC4tuC4h+C4oeC4slxuICAgICAgICBzZXRQcm9kdWN0cyhkYXRhKTtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgcHJvZHVjdHM6JywgZXJyLm1lc3NhZ2UpO1xuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuICBcbiAgICBmZXRjaFByb2R1Y3RzKCk7XG4gIH0sIFtdKTtcbiAgXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMjBweCcgfX0+XG4gICAgICA8aDE+UHJvZHVjdHMgUGFnZTwvaDE+XG4gICAgICA8aHIgY2xhc3NOYW1lPSdiZy1ncmF5LTUwMCBteS0zJz48L2hyPlxuICAgICAge2xvYWRpbmcgPyAoXG4gICAgICAgIDxwPkxvYWRpbmcuLi48L3A+XG4gICAgICApIDogKFxuICAgICAgICA8dGFibGUgYm9yZGVyPVwiMVwiIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLCBtYXJnaW5Ub3A6ICcyMHB4JyB9fT5cbiAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0aD5Qcm9kdWN0IElEPC90aD5cbiAgICAgICAgICAgICAgPHRoPlByb2R1Y3QgTmFtZTwvdGg+XG4gICAgICAgICAgICAgIDx0aD5TS1U8L3RoPlxuICAgICAgICAgICAgICA8dGg+Q2F0ZWdvcnkgTmFtZTwvdGg+XG4gICAgICAgICAgICAgIDx0aD5EZXNjcmlwdGlvbjwvdGg+XG4gICAgICAgICAgICAgIDx0aD5RdWFudGl0eTwvdGg+XG4gICAgICAgICAgICAgIDx0aD5Vbml0IFByaWNlPC90aD5cbiAgICAgICAgICAgICAgPHRoPkNyZWF0ZWQgQXQ8L3RoPlxuICAgICAgICAgICAgICA8dGg+VXBkYXRlZCBBdDwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAge3Byb2R1Y3RzLm1hcCgocHJvZHVjdCkgPT4gKFxuICAgICAgICAgICAgICA8dHIga2V5PXtwcm9kdWN0LnByb2R1Y3RfaWR9PlxuICAgICAgICAgICAgICAgIDx0ZD57cHJvZHVjdC5wcm9kdWN0X2lkfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPntwcm9kdWN0LnByb2R1Y3RfbmFtZX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD57cHJvZHVjdC5za3V9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+e3Byb2R1Y3QuY2F0ZWdvcnlfbmFtZX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD57cHJvZHVjdC5kZXNjcmlwdGlvbn08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD57cHJvZHVjdC5xdWFudGl0eX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD4ke051bWJlcihwcm9kdWN0LnVuaXRfcHJpY2UpLnRvRml4ZWQoMil9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+e25ldyBEYXRlKHByb2R1Y3QuY3JlYXRlZF9hdCkudG9Mb2NhbGVTdHJpbmcoKX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD57bmV3IERhdGUocHJvZHVjdC51cGRhdGVkX2F0KS50b0xvY2FsZVN0cmluZygpfTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPntwcm9kdWN0LmlzX2FjdGl2ZX08L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgICl9XG4gICAgXG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJBUEkiLCJIb21lIiwicHJvZHVjdHMiLCJzZXRQcm9kdWN0cyIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZmV0Y2hQcm9kdWN0cyIsImRhdGEiLCJnZXQiLCJjb25zb2xlIiwibG9nIiwiZXJyIiwiZXJyb3IiLCJtZXNzYWdlIiwiZGl2Iiwic3R5bGUiLCJwYWRkaW5nIiwiaDEiLCJociIsImNsYXNzTmFtZSIsInAiLCJ0YWJsZSIsImJvcmRlciIsIndpZHRoIiwiYm9yZGVyQ29sbGFwc2UiLCJtYXJnaW5Ub3AiLCJ0aGVhZCIsInRyIiwidGgiLCJ0Ym9keSIsIm1hcCIsInByb2R1Y3QiLCJ0ZCIsInByb2R1Y3RfaWQiLCJwcm9kdWN0X25hbWUiLCJza3UiLCJjYXRlZ29yeV9uYW1lIiwiZGVzY3JpcHRpb24iLCJxdWFudGl0eSIsIk51bWJlciIsInVuaXRfcHJpY2UiLCJ0b0ZpeGVkIiwiRGF0ZSIsImNyZWF0ZWRfYXQiLCJ0b0xvY2FsZVN0cmluZyIsInVwZGF0ZWRfYXQiLCJpc19hY3RpdmUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.js\n"));

/***/ })

});