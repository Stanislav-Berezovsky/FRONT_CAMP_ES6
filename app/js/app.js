(function() {

    const NEWS_SOURCES = [
        {
        	name : 'ABC News',
        	sourcesValue:'abc-news'      	
        },{
        	name : 'CNBC ',
        	sourcesValue:'cnbc' 	
        },
        ,{	
        	name : 'Bloomberg',
        	sourcesValue:'bloomberg'  	
        }
 	]

    // use ABC News sources for first load 
    updateNewsContent(NEWS_SOURCES[0].sourcesValue);
    buildConfigurationPanel();

    function updateNewsContent(sources) {
        const serverResponce = getNewsBySourceName(sources);

        serverResponce.then(responce => responce.json())
            .then(({ status: responceStatus, articles }) => {
                if (responceStatus.toLocaleLowerCase() === 'ok') {
                    console.log(articles);
                }
            })
            .catch(error => {
                console.error(error.message);
            });
    }

    function getSelectedItem({name, sourcesValue}){
    	return `<option value="${sourcesValue}">${name}</option>`;
    }
    

    function buildConfigurationPanel() {
    	let selectedListContent = '';

    	for (let key in NEWS_SOURCES){
    		selectedListContent += getSelectedItem(NEWS_SOURCES[key]);
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
})()

