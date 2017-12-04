'use strict';

// use ABC News sources for first load 
buildConfigurationPanel();
updateNewsContent(NEWS_SOURCES[0].sourcesValue);

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

function buildConfigurationPanel() {
    var selectedListContent = '';

    for (var key in NEWS_SOURCES) {
        selectedListContent += Template.getSelectedItem(NEWS_SOURCES[key]);
    }

    document.getElementById('sourcesListId').innerHTML = selectedListContent;

    document.getElementById('findNewsButtonId').addEventListener('click', function (e) {
        var sources = document.getElementById('sourcesListId').value;

        updateNewsContent(sources);
    });
}

function getNewsBySourceName(sources) {
    return fetch('https://newsapi.org/v2/top-headlines?sources=' + sources + '&apiKey=a3f59c9918564ba283db5a9e3274f8ff');
}