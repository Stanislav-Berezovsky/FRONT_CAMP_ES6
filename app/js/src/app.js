import TemplateFactory from './Template';
import RequestService from './RequestService';

console.log('news application');
init();

function init() {
    const requestService = new RequestService();

    return requestService.getSources()
        .then(data => buildConfigurationPanel(data))
        .then(() => {
            updateNewsContent(document.getElementById('sourcesListId').value);
        });
}

function updateNewsContent(sources) {
    const requestService = new RequestService();
    const serverResponce = requestService.getNewsBySourceName(sources);

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
                return `${content} ${TemplateFactory.create(article,'article').getItem()}`;
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
        selectedListContent += TemplateFactory.create(source, 'source').getItem();
    });

    document.getElementById('sourcesListId').innerHTML = selectedListContent;

    document.getElementById('findNewsButtonId')
        .addEventListener('click', e => {
            const source = document.getElementById('sourcesListId').value;

            updateNewsContent(source);
        });
}