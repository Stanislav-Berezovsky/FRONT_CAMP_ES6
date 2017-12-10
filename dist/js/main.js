'use strict';

// use ABC News sources for first load 

getSources().then(function (responce) {
    return responce.json();
}).then(function (data) {
    buildConfigurationPanel(data.sources.splice(0, 7));
}).then(function () {
    updateNewsContent(document.getElementById('sourcesListId').value);
});

function updateNewsContent(sources) {
    var serverResponce = getNewsBySourceName(sources);

    return serverResponce.then(function (responce) {
        if (!responce.ok) {
            throw new Error('Responce error status: ' + responce.status);
        }

        return responce.json();
    }).then(function (_ref) {
        var responceStatus = _ref.status,
            articles = _ref.articles;

        var newsContainerContent = articles.reduce(function (content, article) {
            return content + ' ' + new Template(article).getArticleItem();
        }, '');

        document.getElementById('newsContainerId').innerHTML = newsContainerContent;
    }).catch(function (error) {
        console.error(error.message);
    });
}

function buildConfigurationPanel(sources) {
    var selectedListContent = '';

    sources.forEach(function (source) {
        selectedListContent += Template.getSelectedItem(source);
    });

    document.getElementById('sourcesListId').innerHTML = selectedListContent;

    document.getElementById('findNewsButtonId').addEventListener('click', function (e) {
        var source = document.getElementById('sourcesListId').value;

        updateNewsContent(source);
    });
}

function getNewsBySourceName(source) {
    return fetch('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=a3f59c9918564ba283db5a9e3274f8ff');
}

function getSources() {
    return fetch('https://newsapi.org/v2/sources?apiKey=a3f59c9918564ba283db5a9e3274f8ff');
}
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
                id = _ref2.id;

            return "<option value=\"" + id + "\">" + name + "</option>";
        }
    }]);

    return Template;
}();

;
