class RequestService {
    constructor() {
        if (this.serviceInstance) {
            return this.serviceInstance;
        }

        this.serviceInstance = this;
    }

    getNewsBySourceName(source) {
        return fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=a3f59c9918564ba283db5a9e3274f8ff`);
    }

    getSources() {
        return fetch('https://newsapi.org/v2/sources?apiKey=a3f59c9918564ba283db5a9e3274f8ff')
            .then(response => response.json());
    }
}

export default class ProxyRequestService extends RequestService {
    getSources() {
        return super.getSources()
            .then(data => {
                const sources = data.sources;
                if (!sources) {
                    console.warn('empty responce')
                    return [];
                }

                return sources.length > 7 ? sources.splice(0, 7) : sources;
            });
    }
}

