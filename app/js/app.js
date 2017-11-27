    import {TemplateHelper} from './templateHelper.js';
    import {NEWS_SOURCES} from './appConstant.js';

    // use ABC News sources for first load 
    updateNewsContent(NEWS_SOURCES[0].sourcesValue);
    buildConfigurationPanel();

    function updateNewsContent(sources) {
        const serverResponce = getNewsBySourceName(sources);

        serverResponce.then(responce => responce.json())
            .then(({ status: responceStatus, articles }) => {
                if (responceStatus.toLocaleLowerCase() !== 'ok') {
                    console.error(`responce status: ${responceStatus}`);
                    return;
                }

                const newsContainerContent = articles.reduce((content, article) => {
                    return content + TemplateHelper.getArticleItem(article);
                }, '');

                document.getElementById('newsContainerId').innerHTML = newsContainerContent;
            })
            .catch(error => {
                console.error(error.message);
            });
    }

    function buildConfigurationPanel() {
        let selectedListContent = '';

        for (let key in NEWS_SOURCES) {
            selectedListContent += TemplateHelper.getSelectedItem(NEWS_SOURCES[key]);
        }

        document.getElementById('sourcesListId').innerHTML = selectedListContent;

        document.getElementById('findNewsButtonId')
            .addEventListener('click', e => {
                const sources = document.getElementById('sourcesListId').value;

                updateNewsContent(sources);
            });
    }

    function getNewsBySourceName(sources) {
        return fetch(`https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=a3f59c9918564ba283db5a9e3274f8ff`);
    }