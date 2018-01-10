import TemplateFactory from './Template';
import RequestService from './RequestService';
import SourceObserver from './SourceObserver';

console.log('news application');
init();

const sourceObserver = new SourceObserver();
sourceObserver.addSubscription({
    update: (source) => updateNewsContent(source)
});

function init() {
    const requestService = new RequestService();

    return requestService.getSources()
        .then(data => buildConfigurationPanel(data))
        .then(() => {
            updateNewsContent(document.getElementById('sourcesListId').value);
        });
}

function updateNewsContent(source) {
    const requestService = new RequestService();
    const serverResponce = requestService.getNewsBySourceName(source);

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
            sourceObserver.setSourceValue(document.getElementById('sourcesListId').value);
        });
}