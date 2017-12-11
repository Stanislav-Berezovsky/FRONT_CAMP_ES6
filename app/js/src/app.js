console.log('news application');
getSources()
    .then(responce => responce.json())
    .then(data => {
        buildConfigurationPanel(data.sources.splice(0, 7));
    })
    .then(() => {
        updateNewsContent(document.getElementById('sourcesListId').value);
    });



function updateNewsContent(sources) {
    const serverResponce = getNewsBySourceName(sources);

    console.log('news responce manipulation')
    return serverResponce.then(responce => {
            if (!responce.ok) {
                throw new Error(`Responce error status: ${responce.status}`);
            }

            return responce.json();
        })
        .then(({ status: responceStatus, articles }) => {
            console.log('build html by using Template');
            const newsContainerContent = articles.reduce((content, article) => {
                return `${content} ${(new Template(article)).getArticleItem()}`;
            }, '');

            document.getElementById('newsContainerId').innerHTML = newsContainerContent;
        })
        .catch(error => {
            console.error(error.message);
        });
}

function buildConfigurationPanel(sources) {
    let selectedListContent = '';

    console.log('build sources list')
    sources.forEach((source) => {
        selectedListContent += Template.getSelectedItem(source);
    });

    document.getElementById('sourcesListId').innerHTML = selectedListContent;

    document.getElementById('findNewsButtonId')
        .addEventListener('click', e => {
            const source = document.getElementById('sourcesListId').value;

            updateNewsContent(source);
        });
}

function getNewsBySourceName(source) {
    return fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=a3f59c9918564ba283db5a9e3274f8ff`);
}

function getSources() {
    return fetch('https://newsapi.org/v2/sources?apiKey=a3f59c9918564ba283db5a9e3274f8ff');
}