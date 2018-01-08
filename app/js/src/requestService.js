export default class RequestService {
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
        return fetch('https://newsapi.org/v2/sources?apiKey=a3f59c9918564ba283db5a9e3274f8ff');
    }
}