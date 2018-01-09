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

    return requestService.getSources().then(function (data) {
        return buildConfigurationPanel(data);
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

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
            return fetch('https://newsapi.org/v2/sources?apiKey=a3f59c9918564ba283db5a9e3274f8ff').then(function (response) {
                return response.json();
            });
        }
    }]);

    return RequestService;
}();

var ProxyRequestService = function (_RequestService) {
    _inherits(ProxyRequestService, _RequestService);

    function ProxyRequestService() {
        _classCallCheck(this, ProxyRequestService);

        return _possibleConstructorReturn(this, (ProxyRequestService.__proto__ || Object.getPrototypeOf(ProxyRequestService)).apply(this, arguments));
    }

    _createClass(ProxyRequestService, [{
        key: 'getSources',
        value: function getSources() {
            return _get(ProxyRequestService.prototype.__proto__ || Object.getPrototypeOf(ProxyRequestService.prototype), 'getSources', this).call(this).then(function (data) {
                var sources = data.sources;
                if (!sources) {
                    console.warn('empty responce');
                    return [];
                }

                return sources.length > 7 ? sources.splice(0, 7) : sources;
            });
        }
    }]);

    return ProxyRequestService;
}(RequestService);

exports.default = ProxyRequestService;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2IwZmRmOGY3ZTBiNDllOWU4MTQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL3NyYy9UZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvc3JjL1JlcXVlc3RTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImluaXQiLCJyZXF1ZXN0U2VydmljZSIsImdldFNvdXJjZXMiLCJ0aGVuIiwiYnVpbGRDb25maWd1cmF0aW9uUGFuZWwiLCJkYXRhIiwidXBkYXRlTmV3c0NvbnRlbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJzb3VyY2VzIiwic2VydmVyUmVzcG9uY2UiLCJnZXROZXdzQnlTb3VyY2VOYW1lIiwicmVzcG9uY2UiLCJvayIsIkVycm9yIiwic3RhdHVzIiwianNvbiIsInJlc3BvbmNlU3RhdHVzIiwiYXJ0aWNsZXMiLCJuZXdzQ29udGFpbmVyQ29udGVudCIsInJlZHVjZSIsImNvbnRlbnQiLCJhcnRpY2xlIiwiY3JlYXRlIiwiZ2V0SXRlbSIsImlubmVySFRNTCIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsInNlbGVjdGVkTGlzdENvbnRlbnQiLCJmb3JFYWNoIiwic291cmNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIlRlbXBsYXRlRmFjdG9yeSIsIm9wdGlvbnMiLCJ0eXBlIiwidGVtcGxhdGVMaXN0IiwiQXJ0aWNsZVRlbXBsYXRlIiwiU291cmNlVGVtcGxhdGUiLCJUZW1wbGF0ZURlY29yYXRvciIsInRvTG93ZXJDYXNlIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInB1Ymxpc2hlZEF0IiwidXJsIiwiZGF0ZSIsIkRhdGUiLCJ0b0xvY2FsZVN0cmluZyIsImlkIiwibmFtZSIsInRlbXBsYXRlIiwiUmVxdWVzdFNlcnZpY2UiLCJzZXJ2aWNlSW5zdGFuY2UiLCJmZXRjaCIsInJlc3BvbnNlIiwiUHJveHlSZXF1ZXN0U2VydmljZSIsIndhcm4iLCJsZW5ndGgiLCJzcGxpY2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQTs7OztBQUNBOzs7Ozs7QUFHQUE7O0FBRUEsU0FBU0EsSUFBVCxHQUFnQjtBQUNaLFFBQU1DLGlCQUFpQiw4QkFBdkI7O0FBRUEsV0FBT0EsZUFBZUMsVUFBZixHQUNGQyxJQURFLENBQ0c7QUFBQSxlQUFRQyx3QkFBd0JDLElBQXhCLENBQVI7QUFBQSxLQURILEVBRUZGLElBRkUsQ0FFRyxZQUFNO0FBQ1JHLDBCQUFrQkMsU0FBU0MsY0FBVCxDQUF3QixlQUF4QixFQUF5Q0MsS0FBM0Q7QUFDSCxLQUpFLENBQVA7QUFLSDs7QUFFRCxTQUFTSCxpQkFBVCxDQUEyQkksT0FBM0IsRUFBb0M7QUFDaEMsUUFBTVQsaUJBQWlCLDhCQUF2QjtBQUNBLFFBQU1VLGlCQUFpQlYsZUFBZVcsbUJBQWYsQ0FBbUNGLE9BQW5DLENBQXZCOztBQUdBLFdBQU9DLGVBQWVSLElBQWYsQ0FBb0Isb0JBQVk7QUFDL0IsWUFBSSxDQUFDVSxTQUFTQyxFQUFkLEVBQWtCO0FBQ2Qsa0JBQU0sSUFBSUMsS0FBSiw2QkFBb0NGLFNBQVNHLE1BQTdDLENBQU47QUFDSDs7QUFFRCxlQUFPSCxTQUFTSSxJQUFULEVBQVA7QUFDSCxLQU5FLEVBT0ZkLElBUEUsQ0FPRyxnQkFBMEM7QUFBQSxZQUEvQmUsY0FBK0IsUUFBdkNGLE1BQXVDO0FBQUEsWUFBZkcsUUFBZSxRQUFmQSxRQUFlOztBQUU1QyxZQUFNQyx1QkFBdUJELFNBQVNFLE1BQVQsQ0FBZ0IsVUFBQ0MsT0FBRCxFQUFVQyxPQUFWLEVBQXNCO0FBQy9ELG1CQUFVRCxPQUFWLFNBQXFCLG1CQUFnQkUsTUFBaEIsQ0FBdUJELE9BQXZCLEVBQStCLFNBQS9CLEVBQTBDRSxPQUExQyxFQUFyQjtBQUNILFNBRjRCLEVBRTFCLEVBRjBCLENBQTdCOztBQUlBbEIsaUJBQVNDLGNBQVQsQ0FBd0IsaUJBQXhCLEVBQTJDa0IsU0FBM0MsR0FBdUROLG9CQUF2RDtBQUNILEtBZEUsRUFlRk8sS0FmRSxDQWVJLGlCQUFTO0FBQ1pDLGdCQUFRQyxLQUFSLENBQWNBLE1BQU1DLE9BQXBCO0FBQ0gsS0FqQkUsQ0FBUDtBQWtCSDs7QUFFRCxTQUFTMUIsdUJBQVQsQ0FBaUNNLE9BQWpDLEVBQTBDO0FBQ3RDLFFBQUlxQixzQkFBc0IsRUFBMUI7O0FBR0FyQixZQUFRc0IsT0FBUixDQUFnQixVQUFDQyxNQUFELEVBQVk7QUFDeEJGLCtCQUF1QixtQkFBZ0JQLE1BQWhCLENBQXVCUyxNQUF2QixFQUErQixRQUEvQixFQUF5Q1IsT0FBekMsRUFBdkI7QUFDSCxLQUZEOztBQUlBbEIsYUFBU0MsY0FBVCxDQUF3QixlQUF4QixFQUF5Q2tCLFNBQXpDLEdBQXFESyxtQkFBckQ7O0FBRUF4QixhQUFTQyxjQUFULENBQXdCLGtCQUF4QixFQUNLMEIsZ0JBREwsQ0FDc0IsT0FEdEIsRUFDK0IsYUFBSztBQUM1QixZQUFNRCxTQUFTMUIsU0FBU0MsY0FBVCxDQUF3QixlQUF4QixFQUF5Q0MsS0FBeEQ7O0FBRUFILDBCQUFrQjJCLE1BQWxCO0FBQ0gsS0FMTDtBQU1ILEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDekRvQkUsZTs7Ozs7OzsrQkFDSEMsTyxFQUFTQyxJLEVBQU07QUFDekIsZ0JBQU1DLGVBQWU7QUFDakJmLHlCQUFTZ0IsZUFEUTtBQUVqQk4sd0JBQVFPO0FBRlMsYUFBckI7O0FBS0EsbUJBQU8sSUFBSUMsaUJBQUosQ0FBc0IsSUFBSUgsYUFBYUQsS0FBS0ssV0FBTCxFQUFiLENBQUosQ0FBcUNOLE9BQXJDLENBQXRCLENBQVA7QUFDSDs7Ozs7O2tCQVJnQkQsZTtBQVNwQjs7SUFFS0ksZTtBQUNGLG1DQUFzRDtBQUFBLFlBQXhDSSxLQUF3QyxRQUF4Q0EsS0FBd0M7QUFBQSxZQUFqQ0MsV0FBaUMsUUFBakNBLFdBQWlDO0FBQUEsWUFBcEJDLFdBQW9CLFFBQXBCQSxXQUFvQjtBQUFBLFlBQVBDLEdBQU8sUUFBUEEsR0FBTzs7QUFBQTs7QUFDbEQsYUFBS0gsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxhQUFLRyxJQUFMLEdBQVksSUFBSUMsSUFBSixDQUFTSCxXQUFULENBQVo7QUFDQSxhQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFFSDs7OztrQ0FFUztBQUNOLCtHQUVnQixLQUFLSCxLQUZyQiw4RUFLZ0IsS0FBS0MsV0FMckIsaUhBUWdCLEtBQUtHLElBQUwsQ0FBVUUsY0FBVixFQVJoQixpREFTMEIsS0FBS0gsR0FUL0I7QUFZSDs7Ozs7O0lBR0NOLGM7QUFDRixtQ0FBd0I7QUFBQSxZQUFYVSxFQUFXLFNBQVhBLEVBQVc7QUFBQSxZQUFQQyxJQUFPLFNBQVBBLElBQU87O0FBQUE7O0FBQ3BCLGFBQUtELEVBQUwsR0FBVUEsRUFBVjtBQUNBLGFBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUVIOzs7O2tDQUVTO0FBQ04sdUNBQXlCLEtBQUtELEVBQTlCLFVBQXFDLEtBQUtDLElBQTFDO0FBQ0g7Ozs7OztJQUdDVixpQjtBQUNGLCtCQUFZVyxRQUFaLEVBQXFCO0FBQUE7O0FBQ2pCLGFBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0g7Ozs7a0NBRVE7QUFDTCxxREFBdUMsS0FBS0EsUUFBTCxDQUFjM0IsT0FBZCxFQUF2QztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN2REM0QixjO0FBQ0YsOEJBQWM7QUFBQTs7QUFDVixZQUFJLEtBQUtDLGVBQVQsRUFBMEI7QUFDdEIsbUJBQU8sS0FBS0EsZUFBWjtBQUNIOztBQUVELGFBQUtBLGVBQUwsR0FBdUIsSUFBdkI7QUFDSDs7Ozs0Q0FFbUJyQixNLEVBQVE7QUFDeEIsbUJBQU9zQix3REFBc0R0QixNQUF0RCw4Q0FBUDtBQUNIOzs7cUNBRVk7QUFDVCxtQkFBT3NCLE1BQU0sd0VBQU4sRUFDRnBELElBREUsQ0FDRztBQUFBLHVCQUFZcUQsU0FBU3ZDLElBQVQsRUFBWjtBQUFBLGFBREgsQ0FBUDtBQUVIOzs7Ozs7SUFHZ0J3QyxtQjs7Ozs7Ozs7Ozs7cUNBQ0o7QUFDVCxtQkFBTyxxSUFDRnRELElBREUsQ0FDRyxnQkFBUTtBQUNWLG9CQUFNTyxVQUFVTCxLQUFLSyxPQUFyQjtBQUNBLG9CQUFJLENBQUNBLE9BQUwsRUFBYztBQUNWa0IsNEJBQVE4QixJQUFSLENBQWEsZ0JBQWI7QUFDQSwyQkFBTyxFQUFQO0FBQ0g7O0FBRUQsdUJBQU9oRCxRQUFRaUQsTUFBUixHQUFpQixDQUFqQixHQUFxQmpELFFBQVFrRCxNQUFSLENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFyQixHQUE0Q2xELE9BQW5EO0FBQ0gsYUFURSxDQUFQO0FBVUg7Ozs7RUFaNEMyQyxjOztrQkFBNUJJLG1CIiwiZmlsZSI6Ii4vbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNiMGZkZjhmN2UwYjQ5ZTllODE0IiwiaW1wb3J0IFRlbXBsYXRlRmFjdG9yeSBmcm9tICcuL1RlbXBsYXRlJztcclxuaW1wb3J0IFJlcXVlc3RTZXJ2aWNlIGZyb20gJy4vUmVxdWVzdFNlcnZpY2UnO1xyXG5cclxuY29uc29sZS5sb2coJ25ld3MgYXBwbGljYXRpb24nKTtcclxuaW5pdCgpO1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIGNvbnN0IHJlcXVlc3RTZXJ2aWNlID0gbmV3IFJlcXVlc3RTZXJ2aWNlKCk7XHJcblxyXG4gICAgcmV0dXJuIHJlcXVlc3RTZXJ2aWNlLmdldFNvdXJjZXMoKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4gYnVpbGRDb25maWd1cmF0aW9uUGFuZWwoZGF0YSkpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB1cGRhdGVOZXdzQ29udGVudChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291cmNlc0xpc3RJZCcpLnZhbHVlKTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTmV3c0NvbnRlbnQoc291cmNlcykge1xyXG4gICAgY29uc3QgcmVxdWVzdFNlcnZpY2UgPSBuZXcgUmVxdWVzdFNlcnZpY2UoKTtcclxuICAgIGNvbnN0IHNlcnZlclJlc3BvbmNlID0gcmVxdWVzdFNlcnZpY2UuZ2V0TmV3c0J5U291cmNlTmFtZShzb3VyY2VzKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZygnbmV3cyByZXNwb25jZSBtYW5pcHVsYXRpb24nKVxyXG4gICAgcmV0dXJuIHNlcnZlclJlc3BvbmNlLnRoZW4ocmVzcG9uY2UgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJlc3BvbmNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlc3BvbmNlIGVycm9yIHN0YXR1czogJHtyZXNwb25jZS5zdGF0dXN9YCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25jZS5qc29uKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoeyBzdGF0dXM6IHJlc3BvbmNlU3RhdHVzLCBhcnRpY2xlcyB9KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdidWlsZCBodG1sIGJ5IHVzaW5nIFRlbXBsYXRlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld3NDb250YWluZXJDb250ZW50ID0gYXJ0aWNsZXMucmVkdWNlKChjb250ZW50LCBhcnRpY2xlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y29udGVudH0gJHtUZW1wbGF0ZUZhY3RvcnkuY3JlYXRlKGFydGljbGUsJ2FydGljbGUnKS5nZXRJdGVtKCl9YDtcclxuICAgICAgICAgICAgfSwgJycpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld3NDb250YWluZXJJZCcpLmlubmVySFRNTCA9IG5ld3NDb250YWluZXJDb250ZW50O1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRDb25maWd1cmF0aW9uUGFuZWwoc291cmNlcykge1xyXG4gICAgbGV0IHNlbGVjdGVkTGlzdENvbnRlbnQgPSAnJztcclxuXHJcbiAgICBjb25zb2xlLmxvZygnYnVpbGQgc291cmNlcyBsaXN0JylcclxuICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XHJcbiAgICAgICAgc2VsZWN0ZWRMaXN0Q29udGVudCArPSBUZW1wbGF0ZUZhY3RvcnkuY3JlYXRlKHNvdXJjZSwgJ3NvdXJjZScpLmdldEl0ZW0oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VyY2VzTGlzdElkJykuaW5uZXJIVE1MID0gc2VsZWN0ZWRMaXN0Q29udGVudDtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluZE5ld3NCdXR0b25JZCcpXHJcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VyY2VzTGlzdElkJykudmFsdWU7XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVOZXdzQ29udGVudChzb3VyY2UpO1xyXG4gICAgICAgIH0pO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2pzL3NyYy9hcHAuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZW1wbGF0ZUZhY3Rvcnkge1xyXG4gICAgc3RhdGljIGNyZWF0ZShvcHRpb25zLCB0eXBlKSB7XHJcbiAgICAgICAgY29uc3QgdGVtcGxhdGVMaXN0ID0ge1xyXG4gICAgICAgICAgICBhcnRpY2xlOiBBcnRpY2xlVGVtcGxhdGUsXHJcbiAgICAgICAgICAgIHNvdXJjZTogU291cmNlVGVtcGxhdGVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVGVtcGxhdGVEZWNvcmF0b3IobmV3IHRlbXBsYXRlTGlzdFt0eXBlLnRvTG93ZXJDYXNlKCldKG9wdGlvbnMpKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNsYXNzIEFydGljbGVUZW1wbGF0ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7IHRpdGxlLCBkZXNjcmlwdGlvbiwgcHVibGlzaGVkQXQsIHVybCB9KSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShwdWJsaXNoZWRBdCk7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NvbnN0cnVjdG9yIHdhcyBjcmVhdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbSgpIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJuZXdzSXRlbVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmV3c0l0ZW1UaXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+JHt0aGlzLnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj4ke3RoaXMuZGVzY3JpcHRpb259PC9zcGFuPiAgICAgICAgXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmV3c0l0ZW1BZGRpdGlvbmFsXCI+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj4ke3RoaXMuZGF0ZS50b0xvY2FsZVN0cmluZygpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPiA8YSBocmVmPVwiJHt0aGlzLnVybH1cIj5DbGljayB0aGlzIGxpbmsgdG8gcmVkaXJlY3Qgb24gb3JpZ2luYWwgcGFnZTwvYT48L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PmA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNvdXJjZVRlbXBsYXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHtpZCwgbmFtZX0pIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICBjb25zb2xlLmxvZygnY29uc3RydWN0b3Igd2FzIGNyZWF0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtKCkge1xyXG4gICAgICAgIHJldHVybiBgPG9wdGlvbiB2YWx1ZT1cIiR7dGhpcy5pZH1cIj4ke3RoaXMubmFtZX08L29wdGlvbj5gO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUZW1wbGF0ZURlY29yYXRvciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZSl7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW0oKXtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJkZWNvcmF0b3Itc3R5bGVcIj4ke3RoaXMudGVtcGxhdGUuZ2V0SXRlbSgpfTwvZGl2PmA7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvanMvc3JjL1RlbXBsYXRlLmpzIiwiY2xhc3MgUmVxdWVzdFNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VydmljZUluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VJbnN0YW5jZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2VydmljZUluc3RhbmNlID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBnZXROZXdzQnlTb3VyY2VOYW1lKHNvdXJjZSkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cHM6Ly9uZXdzYXBpLm9yZy92Mi90b3AtaGVhZGxpbmVzP3NvdXJjZXM9JHtzb3VyY2V9JmFwaUtleT1hM2Y1OWM5OTE4NTY0YmEyODNkYjVhOWUzMjc0ZjhmZmApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNvdXJjZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKCdodHRwczovL25ld3NhcGkub3JnL3YyL3NvdXJjZXM/YXBpS2V5PWEzZjU5Yzk5MTg1NjRiYTI4M2RiNWE5ZTMyNzRmOGZmJylcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJveHlSZXF1ZXN0U2VydmljZSBleHRlbmRzIFJlcXVlc3RTZXJ2aWNlIHtcclxuICAgIGdldFNvdXJjZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldFNvdXJjZXMoKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNvdXJjZXMgPSBkYXRhLnNvdXJjZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ2VtcHR5IHJlc3BvbmNlJylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNvdXJjZXMubGVuZ3RoID4gNyA/IHNvdXJjZXMuc3BsaWNlKDAsIDcpIDogc291cmNlcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9qcy9zcmMvUmVxdWVzdFNlcnZpY2UuanMiXSwic291cmNlUm9vdCI6IiJ9