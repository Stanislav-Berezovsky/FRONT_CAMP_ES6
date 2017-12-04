"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Template = function () {
    function Template(_ref) {
        var title = _ref.title,
            description = _ref.description,
            publishedAt = _ref.publishedAt,
            url = _ref.url;

        _classCallCheck(this, Template);

        this.title = title;
        this.description = description;
        this.date = new Date(publishedAt);
        this.url = url;
    }

    _createClass(Template, [{
        key: "getArticleItem",
        value: function getArticleItem() {
            return "<div class=\"newsItem\">\n            <div class=\"newsItemTitle\">\n                <span>" + this.title + "</span>\n            </div>\n            <div>\n                <span>" + this.description + "</span>        \n            </div>\n            <div class=\"newsItemAdditional\">\n                <span>" + this.date.toLocaleString() + "</span>\n                <span> <a href=\"" + this.url + "\">Click this link to redirect on original page</a></span>\n            </div>\n        </div>";
        }
    }], [{
        key: "getSelectedItem",
        value: function getSelectedItem(_ref2) {
            var name = _ref2.name,
                sourcesValue = _ref2.sourcesValue;

            return "<option value=\"" + sourcesValue + "\">" + name + "</option>";
        }
    }]);

    return Template;
}();

;