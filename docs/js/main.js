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

var _SourceObserver = __webpack_require__(3);

var _SourceObserver2 = _interopRequireDefault(_SourceObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

init();

var sourceObserver = new _SourceObserver2.default();
sourceObserver.addSubscription({
    update: function update(source) {
        return updateNewsContent(source);
    }
});

function init() {
    var requestService = new _RequestService2.default();

    return requestService.getSources().then(function (data) {
        return buildConfigurationPanel(data);
    }).then(function () {
        updateNewsContent(document.getElementById('sourcesListId').value);
    });
}

function updateNewsContent(source) {
    var requestService = new _RequestService2.default();
    var serverResponce = requestService.getNewsBySourceName(source);

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
        sourceObserver.setSourceValue(document.getElementById('sourcesListId').value);
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SourceObserver = function () {
    function SourceObserver() {
        _classCallCheck(this, SourceObserver);

        this.subscribers = [];
    }

    _createClass(SourceObserver, [{
        key: "addSubscription",
        value: function addSubscription(subscriber) {
            this.subscribers.push(subscriber);
        }
    }, {
        key: "removeSubscription",
        value: function removeSubscription(subscriber) {
            var index = this.subscribers.indexOf(subscriber);
            this.subscribers.splice(index, 1);
        }
    }, {
        key: "setSourceValue",
        value: function setSourceValue(sourceValue) {
            this.sourceValue = sourceValue;
            this.notifySubscrivers();
        }
    }, {
        key: "notifySubscrivers",
        value: function notifySubscrivers() {
            var _this = this;

            this.subscribers.forEach(function (subscriber) {
                return subscriber.update(_this.sourceValue);
            });
        }
    }]);

    return SourceObserver;
}();

exports.default = SourceObserver;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDljMTIyYjk1OTE2MjAzYjkxNTUiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2pzL3NyYy9UZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvanMvc3JjL1JlcXVlc3RTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9qcy9zcmMvU291cmNlT2JzZXJ2ZXIuanMiXSwibmFtZXMiOlsiaW5pdCIsInNvdXJjZU9ic2VydmVyIiwiYWRkU3Vic2NyaXB0aW9uIiwidXBkYXRlIiwic291cmNlIiwidXBkYXRlTmV3c0NvbnRlbnQiLCJyZXF1ZXN0U2VydmljZSIsImdldFNvdXJjZXMiLCJ0aGVuIiwiYnVpbGRDb25maWd1cmF0aW9uUGFuZWwiLCJkYXRhIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwic2VydmVyUmVzcG9uY2UiLCJnZXROZXdzQnlTb3VyY2VOYW1lIiwicmVzcG9uY2UiLCJvayIsIkVycm9yIiwic3RhdHVzIiwianNvbiIsInJlc3BvbmNlU3RhdHVzIiwiYXJ0aWNsZXMiLCJuZXdzQ29udGFpbmVyQ29udGVudCIsInJlZHVjZSIsImNvbnRlbnQiLCJhcnRpY2xlIiwiY3JlYXRlIiwiZ2V0SXRlbSIsImlubmVySFRNTCIsImNhdGNoIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsInNvdXJjZXMiLCJzZWxlY3RlZExpc3RDb250ZW50IiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRTb3VyY2VWYWx1ZSIsIlRlbXBsYXRlRmFjdG9yeSIsIm9wdGlvbnMiLCJ0eXBlIiwidGVtcGxhdGVMaXN0IiwiQXJ0aWNsZVRlbXBsYXRlIiwiU291cmNlVGVtcGxhdGUiLCJUZW1wbGF0ZURlY29yYXRvciIsInRvTG93ZXJDYXNlIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInB1Ymxpc2hlZEF0IiwidXJsIiwiZGF0ZSIsIkRhdGUiLCJ0b0xvY2FsZVN0cmluZyIsImlkIiwibmFtZSIsInRlbXBsYXRlIiwiUmVxdWVzdFNlcnZpY2UiLCJzZXJ2aWNlSW5zdGFuY2UiLCJmZXRjaCIsInJlc3BvbnNlIiwiUHJveHlSZXF1ZXN0U2VydmljZSIsIndhcm4iLCJsZW5ndGgiLCJzcGxpY2UiLCJTb3VyY2VPYnNlcnZlciIsInN1YnNjcmliZXJzIiwic3Vic2NyaWJlciIsInB1c2giLCJpbmRleCIsImluZGV4T2YiLCJzb3VyY2VWYWx1ZSIsIm5vdGlmeVN1YnNjcml2ZXJzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFHQUE7O0FBRUEsSUFBTUMsaUJBQWlCLDhCQUF2QjtBQUNBQSxlQUFlQyxlQUFmLENBQStCO0FBQzNCQyxZQUFRLGdCQUFDQyxNQUFEO0FBQUEsZUFBWUMsa0JBQWtCRCxNQUFsQixDQUFaO0FBQUE7QUFEbUIsQ0FBL0I7O0FBSUEsU0FBU0osSUFBVCxHQUFnQjtBQUNaLFFBQU1NLGlCQUFpQiw4QkFBdkI7O0FBRUEsV0FBT0EsZUFBZUMsVUFBZixHQUNGQyxJQURFLENBQ0c7QUFBQSxlQUFRQyx3QkFBd0JDLElBQXhCLENBQVI7QUFBQSxLQURILEVBRUZGLElBRkUsQ0FFRyxZQUFNO0FBQ1JILDBCQUFr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SDs7OztFQVo0Q3VCLGM7O2tCQUE1QkksbUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbkJBSSxjO0FBQ3BCLDhCQUFhO0FBQUE7O0FBQ1osYUFBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBOzs7O3dDQUVrQkMsVSxFQUFZO0FBQzNCLGlCQUFLRCxXQUFMLENBQWlCRSxJQUFqQixDQUFzQkQsVUFBdEI7QUFDQTs7OzJDQUVrQkEsVSxFQUFZO0FBQzNCLGdCQUFNRSxRQUFRLEtBQUtILFdBQUwsQ0FBaUJJLE9BQWpCLENBQXlCSCxVQUF6QixDQUFkO0FBQ0EsaUJBQUtELFdBQUwsQ0FBaUJGLE1BQWpCLENBQXdCSyxLQUF4QixFQUErQixDQUEvQjtBQUNIOzs7dUNBRWNFLFcsRUFBWTtBQUMxQixpQkFBS0EsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxpQkFBS0MsaUJBQUw7QUFDQTs7OzRDQUVtQjtBQUFBOztBQUNoQixpQkFBS04sV0FBTCxDQUFpQjlCLE9BQWpCLENBQXlCLFVBQUMrQixVQUFEO0FBQUEsdUJBQWdCQSxXQUFXaEUsTUFBWCxDQUFrQixNQUFLb0UsV0FBdkIsQ0FBaEI7QUFBQSxhQUF6QjtBQUNIOzs7Ozs7a0JBckJnQk4sYyIsImZpbGUiOiIuL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkOWMxMjJiOTU5MTYyMDNiOTE1NSIsImltcG9ydCBUZW1wbGF0ZUZhY3RvcnkgZnJvbSAnLi9UZW1wbGF0ZSc7XHJcbmltcG9ydCBSZXF1ZXN0U2VydmljZSBmcm9tICcuL1JlcXVlc3RTZXJ2aWNlJztcclxuaW1wb3J0IFNvdXJjZU9ic2VydmVyIGZyb20gJy4vU291cmNlT2JzZXJ2ZXInO1xyXG5cclxuY29uc29sZS5sb2coJ25ld3MgYXBwbGljYXRpb24nKTtcclxuaW5pdCgpO1xyXG5cclxuY29uc3Qgc291cmNlT2JzZXJ2ZXIgPSBuZXcgU291cmNlT2JzZXJ2ZXIoKTtcclxuc291cmNlT2JzZXJ2ZXIuYWRkU3Vic2NyaXB0aW9uKHtcclxuICAgIHVwZGF0ZTogKHNvdXJjZSkgPT4gdXBkYXRlTmV3c0NvbnRlbnQoc291cmNlKVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0U2VydmljZSA9IG5ldyBSZXF1ZXN0U2VydmljZSgpO1xyXG5cclxuICAgIHJldHVybiByZXF1ZXN0U2VydmljZS5nZXRTb3VyY2VzKClcclxuICAgICAgICAudGhlbihkYXRhID0+IGJ1aWxkQ29uZmlndXJhdGlvblBhbmVsKGRhdGEpKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdXBkYXRlTmV3c0NvbnRlbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdXJjZXNMaXN0SWQnKS52YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZU5ld3NDb250ZW50KHNvdXJjZSkge1xyXG4gICAgY29uc3QgcmVxdWVzdFNlcnZpY2UgPSBuZXcgUmVxdWVzdFNlcnZpY2UoKTtcclxuICAgIGNvbnN0IHNlcnZlclJlc3BvbmNlID0gcmVxdWVzdFNlcnZpY2UuZ2V0TmV3c0J5U291cmNlTmFtZShzb3VyY2UpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCduZXdzIHJlc3BvbmNlIG1hbmlwdWxhdGlvbicpXHJcbiAgICByZXR1cm4gc2VydmVyUmVzcG9uY2UudGhlbihyZXNwb25jZSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcmVzcG9uY2Uub2spIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVzcG9uY2UgZXJyb3Igc3RhdHVzOiAke3Jlc3BvbmNlLnN0YXR1c31gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbmNlLmpzb24oKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCh7IHN0YXR1czogcmVzcG9uY2VTdGF0dXMsIGFydGljbGVzIH0pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2J1aWxkIGh0bWwgYnkgdXNpbmcgVGVtcGxhdGUnKTtcclxuICAgICAgICAgICAgY29uc3QgbmV3c0NvbnRhaW5lckNvbnRlbnQgPSBhcnRpY2xlcy5yZWR1Y2UoKGNvbnRlbnQsIGFydGljbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtjb250ZW50fSAke1RlbXBsYXRlRmFjdG9yeS5jcmVhdGUoYXJ0aWNsZSwnYXJ0aWNsZScpLmdldEl0ZW0oKX1gO1xyXG4gICAgICAgICAgICB9LCAnJyk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3c0NvbnRhaW5lcklkJykuaW5uZXJIVE1MID0gbmV3c0NvbnRhaW5lckNvbnRlbnQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBidWlsZENvbmZpZ3VyYXRpb25QYW5lbChzb3VyY2VzKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWRMaXN0Q29udGVudCA9ICcnO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCdidWlsZCBzb3VyY2VzIGxpc3QnKVxyXG4gICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcclxuICAgICAgICBzZWxlY3RlZExpc3RDb250ZW50ICs9IFRlbXBsYXRlRmFjdG9yeS5jcmVhdGUoc291cmNlLCAnc291cmNlJykuZ2V0SXRlbSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdXJjZXNMaXN0SWQnKS5pbm5lckhUTUwgPSBzZWxlY3RlZExpc3RDb250ZW50O1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5kTmV3c0J1dHRvbklkJylcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgc291cmNlT2JzZXJ2ZXIuc2V0U291cmNlVmFsdWUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdXJjZXNMaXN0SWQnKS52YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvanMvc3JjL2FwcC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlbXBsYXRlRmFjdG9yeSB7XHJcbiAgICBzdGF0aWMgY3JlYXRlKG9wdGlvbnMsIHR5cGUpIHtcclxuICAgICAgICBjb25zdCB0ZW1wbGF0ZUxpc3QgPSB7XHJcbiAgICAgICAgICAgIGFydGljbGU6IEFydGljbGVUZW1wbGF0ZSxcclxuICAgICAgICAgICAgc291cmNlOiBTb3VyY2VUZW1wbGF0ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZW1wbGF0ZURlY29yYXRvcihuZXcgdGVtcGxhdGVMaXN0W3R5cGUudG9Mb3dlckNhc2UoKV0ob3B0aW9ucykpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY2xhc3MgQXJ0aWNsZVRlbXBsYXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBwdWJsaXNoZWRBdCwgdXJsIH0pIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKHB1Ymxpc2hlZEF0KTtcclxuICAgICAgICB0aGlzLnVybCA9IHVybDtcclxuICAgICAgICBjb25zb2xlLmxvZygnY29uc3RydWN0b3Igd2FzIGNyZWF0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtKCkge1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIm5ld3NJdGVtXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZXdzSXRlbVRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj4ke3RoaXMudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPiR7dGhpcy5kZXNjcmlwdGlvbn08L3NwYW4+ICAgICAgICBcclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZXdzSXRlbUFkZGl0aW9uYWxcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPiR7dGhpcy5kYXRlLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+IDxhIGhyZWY9XCIke3RoaXMudXJsfVwiPkNsaWNrIHRoaXMgbGluayB0byByZWRpcmVjdCBvbiBvcmlnaW5hbCBwYWdlPC9hPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU291cmNlVGVtcGxhdGUge1xyXG4gICAgY29uc3RydWN0b3Ioe2lkLCBuYW1lfSkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjb25zdHJ1Y3RvciB3YXMgY3JlYXRlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW0oKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8b3B0aW9uIHZhbHVlPVwiJHt0aGlzLmlkfVwiPiR7dGhpcy5uYW1lfTwvb3B0aW9uPmA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRlbXBsYXRlRGVjb3JhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHRlbXBsYXRlKXtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbSgpe1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImRlY29yYXRvci1zdHlsZVwiPiR7dGhpcy50ZW1wbGF0ZS5nZXRJdGVtKCl9PC9kaXY+YDtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9qcy9zcmMvVGVtcGxhdGUuanMiLCJjbGFzcyBSZXF1ZXN0U2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zZXJ2aWNlSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZUluc3RhbmNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5ld3NCeVNvdXJjZU5hbWUoc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwczovL25ld3NhcGkub3JnL3YyL3RvcC1oZWFkbGluZXM/c291cmNlcz0ke3NvdXJjZX0mYXBpS2V5PWEzZjU5Yzk5MTg1NjRiYTI4M2RiNWE5ZTMyNzRmOGZmYCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U291cmNlcygpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goJ2h0dHBzOi8vbmV3c2FwaS5vcmcvdjIvc291cmNlcz9hcGlLZXk9YTNmNTljOTkxODU2NGJhMjgzZGI1YTllMzI3NGY4ZmYnKVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm94eVJlcXVlc3RTZXJ2aWNlIGV4dGVuZHMgUmVxdWVzdFNlcnZpY2Uge1xyXG4gICAgZ2V0U291cmNlcygpIHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0U291cmNlcygpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlcyA9IGRhdGEuc291cmNlcztcclxuICAgICAgICAgICAgICAgIGlmICghc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignZW1wdHkgcmVzcG9uY2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc291cmNlcy5sZW5ndGggPiA3ID8gc291cmNlcy5zcGxpY2UoMCwgNykgOiBzb3VyY2VzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2pzL3NyYy9SZXF1ZXN0U2VydmljZS5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvdXJjZU9ic2VydmVyIHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0dGhpcy5zdWJzY3JpYmVycyA9IFtdO1xyXG5cdH1cclxuXHJcbiAgICBhZGRTdWJzY3JpcHRpb24oc3Vic2NyaWJlcikgeyBcclxuICAgIFx0dGhpcy5zdWJzY3JpYmVycy5wdXNoKHN1YnNjcmliZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVN1YnNjcmlwdGlvbihzdWJzY3JpYmVyKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnN1YnNjcmliZXJzLmluZGV4T2Yoc3Vic2NyaWJlcik7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNvdXJjZVZhbHVlKHNvdXJjZVZhbHVlKXtcclxuICAgIFx0dGhpcy5zb3VyY2VWYWx1ZSA9IHNvdXJjZVZhbHVlO1xyXG4gICAgXHR0aGlzLm5vdGlmeVN1YnNjcml2ZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbm90aWZ5U3Vic2NyaXZlcnMoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKChzdWJzY3JpYmVyKSA9PiBzdWJzY3JpYmVyLnVwZGF0ZSh0aGlzLnNvdXJjZVZhbHVlKSk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvanMvc3JjL1NvdXJjZU9ic2VydmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==