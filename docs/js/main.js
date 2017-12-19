/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Template = __webpack_require__(1);\n\nvar _Template2 = _interopRequireDefault(_Template);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\ngetSources().then(function (responce) {\n    return responce.json();\n}).then(function (data) {\n    buildConfigurationPanel(data.sources.splice(0, 7));\n}).then(function () {\n    updateNewsContent(document.getElementById('sourcesListId').value);\n});\n\nfunction updateNewsContent(sources) {\n    var serverResponce = getNewsBySourceName(sources);\n\n    return serverResponce.then(function (responce) {\n        if (!responce.ok) {\n            throw new Error('Responce error status: ' + responce.status);\n        }\n\n        return responce.json();\n    }).then(function (_ref) {\n        var responceStatus = _ref.status,\n            articles = _ref.articles;\n\n        var newsContainerContent = articles.reduce(function (content, article) {\n            return content + ' ' + new _Template2.default(article).getArticleItem();\n        }, '');\n\n        document.getElementById('newsContainerId').innerHTML = newsContainerContent;\n    }).catch(function (error) {\n        console.error(error.message);\n    });\n}\n\nfunction buildConfigurationPanel(sources) {\n    var selectedListContent = '';\n\n    sources.forEach(function (source) {\n        selectedListContent += _Template2.default.getSelectedItem(source);\n    });\n\n    document.getElementById('sourcesListId').innerHTML = selectedListContent;\n\n    document.getElementById('findNewsButtonId').addEventListener('click', function (e) {\n        var source = document.getElementById('sourcesListId').value;\n\n        updateNewsContent(source);\n    });\n}\n\nfunction getNewsBySourceName(source) {\n    return fetch('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=a3f59c9918564ba283db5a9e3274f8ff');\n}\n\nfunction getSources() {\n    return fetch('https://newsapi.org/v2/sources?apiKey=a3f59c9918564ba283db5a9e3274f8ff');\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/js/src/app.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./app/js/src/app.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Template = function () {\n    function Template(_ref) {\n        var title = _ref.title,\n            description = _ref.description,\n            publishedAt = _ref.publishedAt,\n            url = _ref.url;\n\n        _classCallCheck(this, Template);\n\n        this.title = title;\n        this.description = description;\n        this.date = new Date(publishedAt);\n        this.url = url;\n    }\n\n    _createClass(Template, [{\n        key: 'getArticleItem',\n        value: function getArticleItem() {\n            return '<div class=\"newsItem\">\\n            <div class=\"newsItemTitle\">\\n                <span>' + this.title + '</span>\\n            </div>\\n            <div>\\n                <span>' + this.description + '</span>        \\n            </div>\\n            <div class=\"newsItemAdditional\">\\n                <span>' + this.date.toLocaleString() + '</span>\\n                <span> <a href=\"' + this.url + '\">Click this link to redirect on original page</a></span>\\n            </div>\\n        </div>';\n        }\n    }], [{\n        key: 'getSelectedItem',\n        value: function getSelectedItem(_ref2) {\n            var name = _ref2.name,\n                id = _ref2.id;\n\n            return '<option value=\"' + id + '\">' + name + '</option>';\n        }\n    }]);\n\n    return Template;\n}();\n\nexports.default = Template;\n;\n\n//////////////////\n// WEBPACK FOOTER\n// ./app/js/src/Template.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./app/js/src/Template.js?");

/***/ })
/******/ ]);