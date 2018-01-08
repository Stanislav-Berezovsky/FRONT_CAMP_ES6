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


var _Template = __webpack_require__(1);

var _Template2 = _interopRequireDefault(_Template);

var _RequestService = __webpack_require__(2);

var _RequestService2 = _interopRequireDefault(_RequestService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

init();

function init() {
    var requestService = new _RequestService2.default();

    return requestService.getSources().then(function (responce) {
        return responce.json();
    }).then(function (data) {
        buildConfigurationPanel(data.sources.splice(0, 7));
    }).then(function () {
        updateNewsContent(document.getElementById('sourcesListId').value);
    });
}

function updateNewsContent(sources) {
    var requestService = new _RequestService2.default();
    var serverResponce = requestService.getNewsBySourceName(sources);

    return serverResponce.then(function (responce) {
        if (!responce.ok) {
            throw new Error('Responce error status: ' + responce.status);
        }

        return responce.json();
    }).then(function (_ref) {
        var responceStatus = _ref.status,
            articles = _ref.articles;

        var newsContainerContent = articles.reduce(function (content, article) {
            return content + ' ' + _Template2.default.create(article, 'article').getItem();
        }, '');

        document.getElementById('newsContainerId').innerHTML = newsContainerContent;
    }).catch(function (error) {
        console.error(error.message);
    });
}

function buildConfigurationPanel(sources) {
    var selectedListContent = '';

    sources.forEach(function (source) {
        selectedListContent += _Template2.default.create(source, 'source').getItem();
    });

    document.getElementById('sourcesListId').innerHTML = selectedListContent;

    document.getElementById('findNewsButtonId').addEventListener('click', function (e) {
        var source = document.getElementById('sourcesListId').value;

        updateNewsContent(source);
    });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TemplateFactory = function () {
    function TemplateFactory() {
        _classCallCheck(this, TemplateFactory);
    }

    _createClass(TemplateFactory, null, [{
        key: 'create',
        value: function create(options, type) {
            var templateList = {
                article: ArticleTemplate,
                source: SourceTemplate
            };

            return new TemplateDecorator(new templateList[type.toLowerCase()](options));
        }
    }]);

    return TemplateFactory;
}();

exports.default = TemplateFactory;
;

var ArticleTemplate = function () {
    function ArticleTemplate(_ref) {
        var title = _ref.title,
            description = _ref.description,
            publishedAt = _ref.publishedAt,
            url = _ref.url;

        _classCallCheck(this, ArticleTemplate);

        this.title = title;
        this.description = description;
        this.date = new Date(publishedAt);
        this.url = url;
    }

    _createClass(ArticleTemplate, [{
        key: 'getItem',
        value: function getItem() {
            return '<div class="newsItem">\n            <div class="newsItemTitle">\n                <span>' + this.title + '</span>\n            </div>\n            <div>\n                <span>' + this.description + '</span>        \n            </div>\n            <div class="newsItemAdditional">\n                <span>' + this.date.toLocaleString() + '</span>\n                <span> <a href="' + this.url + '">Click this link to redirect on original page</a></span>\n            </div>\n        </div>';
        }
    }]);

    return ArticleTemplate;
}();

var SourceTemplate = function () {
    function SourceTemplate(_ref2) {
        var id = _ref2.id,
            name = _ref2.name;

        _classCallCheck(this, SourceTemplate);

        this.id = id;
        this.name = name;
    }

    _createClass(SourceTemplate, [{
        key: 'getItem',
        value: function getItem() {
            return '<option value="' + this.id + '">' + this.name + '</option>';
        }
    }]);

    return SourceTemplate;
}();

var TemplateDecorator = function () {
    function TemplateDecorator(template) {
        _classCallCheck(this, TemplateDecorator);

        this.template = template;
    }

    _createClass(TemplateDecorator, [{
        key: 'getItem',
        value: function getItem() {
            return '<div class="decorator-style">' + this.template.getItem() + '</div>';
        }
    }]);

    return TemplateDecorator;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestService = function () {
    function RequestService() {
        _classCallCheck(this, RequestService);

        if (this.serviceInstance) {
            return this.serviceInstance;
        }

        this.serviceInstance = this;
    }

    _createClass(RequestService, [{
        key: 'getNewsBySourceName',
        value: function getNewsBySourceName(source) {
            return fetch('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=a3f59c9918564ba283db5a9e3274f8ff');
        }
    }, {
        key: 'getSources',
        value: function getSources() {
            return fetch('https://newsapi.org/v2/sources?apiKey=a3f59c9918564ba283db5a9e3274f8ff');
        }
    }]);

    return RequestService;
}();

exports.default = RequestService;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzEwODAwMjAzNzg0MjFjODZjMGMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL3NyYy9UZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvc3JjL1JlcXVlc3RTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImluaXQiLCJyZXF1ZXN0U2VydmljZSIsImdldFNvdXJjZXMiLCJ0aGVuIiwicmVzcG9uY2UiLCJqc29uIiwiYnVpbGRDb25maWd1cmF0aW9uUGFuZWwiLCJkYXRhIiwic291cmNlcyIsInNwbGljZSIsInVwZGF0ZU5ld3NDb250ZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwic2VydmVyUmVzcG9uY2UiLCJnZXROZXdzQnlTb3VyY2VOYW1lIiwib2siLCJFcnJvciIsInN0YXR1cyIsInJlc3BvbmNlU3RhdHVzIiwiYXJ0aWNsZXMiLCJuZXdzQ29udGFpbmVyQ29udGVudCIsInJlZHVjZSIsImNvbnRlbnQiLCJhcnRpY2xlIiwiY3JlYXRlIiwiZ2V0SXRlbSIsImlubmVySFRNTCIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsInNlbGVjdGVkTGlzdENvbnRlbnQiLCJmb3JFYWNoIiwic291cmNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIlRlbXBsYXRlRmFjdG9yeSIsIm9wdGlvbnMiLCJ0eXBlIiwidGVtcGxhdGVMaXN0IiwiQXJ0aWNsZVRlbXBsYXRlIiwiU291cmNlVGVtcGxhdGUiLCJUZW1wbGF0ZURlY29yYXRvciIsInRvTG93ZXJDYXNlIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInB1Ymxpc2hlZEF0IiwidXJsIiwiZGF0ZSIsIkRhdGUiLCJ0b0xvY2FsZVN0cmluZyIsImlkIiwibmFtZSIsInRlbXBsYXRlIiwiUmVxdWVzdFNlcnZpY2UiLCJzZXJ2aWNlSW5zdGFuY2UiLCJmZXRjaCJdLCJt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LE9BQWQsRUFBdkM7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDdkRnQjRCLGM7QUFDakIsOEJBQWM7QUFBQTs7QUFDVixZQUFJLEtBQUtDLGVBQVQsRUFBMEI7QUFDdEIsbUJBQU8sS0FBS0EsZUFBWjtBQUNIOztBQUVELGFBQUtBLGVBQUwsR0FBdUIsSUFBdkI7QUFDSDs7Ozs0Q0FFbUJyQixNLEVBQVE7QUFDeEIsbUJBQU9zQix3REFBc0R0QixNQUF0RCw4Q0FBUDtBQUNIOzs7cUNBRVk7QUFDVCxtQkFBT3NCLE1BQU0sd0VBQU4sQ0FBUDtBQUNIOzs7Ozs7a0JBZmdCRixjIiwiZmlsZSI6Ii4vbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDcxMDgwMDIwMzc4NDIxYzg2YzBjIiwiaW1wb3J0IFRlbXBsYXRlRmFjdG9yeSBmcm9tICcuL1RlbXBsYXRlJztcclxuaW1wb3J0IFJlcXVlc3RTZXJ2aWNlIGZyb20gJy4vUmVxdWVzdFNlcnZpY2UnO1xyXG5cclxuY29uc29sZS5sb2coJ25ld3MgYXBwbGljYXRpb24nKTtcclxuaW5pdCgpO1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIGNvbnN0IHJlcXVlc3RTZXJ2aWNlID0gbmV3IFJlcXVlc3RTZXJ2aWNlKCk7XHJcblxyXG4gICAgcmV0dXJuIHJlcXVlc3RTZXJ2aWNlLmdldFNvdXJjZXMoKVxyXG4gICAgICAgIC50aGVuKHJlc3BvbmNlID0+IHJlc3BvbmNlLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgYnVpbGRDb25maWd1cmF0aW9uUGFuZWwoZGF0YS5zb3VyY2VzLnNwbGljZSgwLCA3KSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZU5ld3NDb250ZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VyY2VzTGlzdElkJykudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVOZXdzQ29udGVudChzb3VyY2VzKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0U2VydmljZSA9IG5ldyBSZXF1ZXN0U2VydmljZSgpO1xyXG4gICAgY29uc3Qgc2VydmVyUmVzcG9uY2UgPSByZXF1ZXN0U2VydmljZS5nZXROZXdzQnlTb3VyY2VOYW1lKHNvdXJjZXMpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCduZXdzIHJlc3BvbmNlIG1hbmlwdWxhdGlvbicpXHJcbiAgICByZXR1cm4gc2VydmVyUmVzcG9uY2UudGhlbihyZXNwb25jZSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcmVzcG9uY2Uub2spIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVzcG9uY2UgZXJyb3Igc3RhdHVzOiAke3Jlc3BvbmNlLnN0YXR1c31gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbmNlLmpzb24oKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCh7IHN0YXR1czogcmVzcG9uY2VTdGF0dXMsIGFydGljbGVzIH0pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J1aWxkIGh0bWwgYnkgdXNpbmcgVGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgY29uc3QgbmV3c0NvbnRhaW5lckNvbnRlbnQgPSBhcnRpY2xlcy5yZWR1Y2UoKGNvbnRlbnQsIGFydGljbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtjb250ZW50fSAke1RlbXBsYXRlRmFjdG9yeS5jcmVhdGUoYXJ0aWNsZSwnYXJ0aWNsZScpLmdldEl0ZW0oKX1gO1xyXG4gICAgICAgICAgICB9LCAnJyk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3c0NvbnRhaW5lcklkJykuaW5uZXJIVE1MID0gbmV3c0NvbnRhaW5lckNvbnRlbnQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBidWlsZENvbmZpZ3VyYXRpb25QYW5lbChzb3VyY2VzKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWRMaXN0Q29udGVudCA9ICcnO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCdidWlsZCBzb3VyY2VzIGxpc3QnKVxyXG4gICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcclxuICAgICAgICBzZWxlY3RlZExpc3RDb250ZW50ICs9IFRlbXBsYXRlRmFjdG9yeS5jcmVhdGUoc291cmNlLCAnc291cmNlJykuZ2V0SXRlbSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdXJjZXNMaXN0SWQnKS5pbm5lckhUTUwgPSBzZWxlY3RlZExpc3RDb250ZW50O1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5kTmV3c0J1dHRvbklkJylcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdXJjZXNMaXN0SWQnKS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZU5ld3NDb250ZW50KHNvdXJjZSk7XHJcbiAgICAgICAgfSk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvanMvc3JjL2FwcC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlbXBsYXRlRmFjdG9yeSB7XHJcbiAgICBzdGF0aWMgY3JlYXRlKG9wdGlvbnMsIHR5cGUpIHtcclxuICAgICAgICBjb25zdCB0ZW1wbGF0ZUxpc3QgPSB7XHJcbiAgICAgICAgICAgIGFydGljbGU6IEFydGljbGVUZW1wbGF0ZSxcclxuICAgICAgICAgICAgc291cmNlOiBTb3VyY2VUZW1wbGF0ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZW1wbGF0ZURlY29yYXRvcihuZXcgdGVtcGxhdGVMaXN0W3R5cGUudG9Mb3dlckNhc2UoKV0ob3B0aW9ucykpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY2xhc3MgQXJ0aWNsZVRlbXBsYXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBwdWJsaXNoZWRBdCwgdXJsIH0pIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKHB1Ymxpc2hlZEF0KTtcclxuICAgICAgICB0aGlzLnVybCA9IHVybDtcclxuICAgICAgICBjb25zb2xlLmxvZygnY29uc3RydWN0b3Igd2FzIGNyZWF0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtKCkge1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIm5ld3NJdGVtXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZXdzSXRlbVRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj4ke3RoaXMudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPiR7dGhpcy5kZXNjcmlwdGlvbn08L3NwYW4+ICAgICAgICBcclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZXdzSXRlbUFkZGl0aW9uYWxcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPiR7dGhpcy5kYXRlLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+IDxhIGhyZWY9XCIke3RoaXMudXJsfVwiPkNsaWNrIHRoaXMgbGluayB0byByZWRpcmVjdCBvbiBvcmlnaW5hbCBwYWdlPC9hPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU291cmNlVGVtcGxhdGUge1xyXG4gICAgY29uc3RydWN0b3Ioe2lkLCBuYW1lfSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjb25zdHJ1Y3RvciB3YXMgY3JlYXRlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW0oKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8b3B0aW9uIHZhbHVlPVwiJHt0aGlzLmlkfVwiPiR7dGhpcy5uYW1lfTwvb3B0aW9uPmA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRlbXBsYXRlRGVjb3JhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHRlbXBsYXRlKXtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbSgpe1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImRlY29yYXRvci1zdHlsZVwiPiR7dGhpcy50ZW1wbGF0ZS5nZXRJdGVtKCl9PC9kaXY+YDtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9qcy9zcmMvVGVtcGxhdGUuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBSZXF1ZXN0U2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zZXJ2aWNlSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZUluc3RhbmNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5ld3NCeVNvdXJjZU5hbWUoc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwczovL25ld3NhcGkub3JnL3YyL3RvcC1oZWFkbGluZXM/c291cmNlcz0ke3NvdXJjZX0mYXBpS2V5PWEzZjU5Yzk5MTg1NjRiYTI4M2RiNWE5ZTMyNzRmOGZmYCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U291cmNlcygpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goJ2h0dHBzOi8vbmV3c2FwaS5vcmcvdjIvc291cmNlcz9hcGlLZXk9YTNmNTljOTkxODU2NGJhMjgzZGI1YTllMzI3NGY4ZmYnKTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9qcy9zcmMvUmVxdWVzdFNlcnZpY2UuanMiXSwic291cmNlUm9vdCI6IiJ9