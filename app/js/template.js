class Template {
    constructor({ title, description, publishedAt, url }){
        this.title = title;
        this.description = description;
        this.date = new Date(publishedAt);
        this.url = url;
    }

  	getArticleItem() {
        return `<div class="newsItem">
            <div class="newsItemTitle">
                <span>${this.title}</span>
            </div>
            <div>
                <span>${this.description}</span>        
            </div>
            <div class="newsItemAdditional">
                <span>${this.date.toLocaleString()}</span>
                <span> <a href="${this.url}">Click this link to redirect on original page</a></span>
            </div>
        </div>`;
    }

    static getSelectedItem({ name, sourcesValue }) {
        return `<option value="${sourcesValue}">${name}</option>`;
    }
};
