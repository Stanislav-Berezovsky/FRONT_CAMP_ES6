export default class TemplateFactory {
    static create(options, type) {
        const templateList = {
            article: ArticleTemplate,
            source: SourceTemplate
        }

        return new TemplateDecorator(new templateList[type.toLowerCase()](options));
    }
};

class ArticleTemplate {
    constructor({ title, description, publishedAt, url }) {
        this.title = title;
        this.description = description;
        this.date = new Date(publishedAt);
        this.url = url;
        console.log('constructor was created');
    }

    getItem() {
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
}

class SourceTemplate {
    constructor({id, name}) {
        this.id = id;
        this.name = name;
        console.log('constructor was created');
    }

    getItem() {
        return `<option value="${this.id}">${this.name}</option>`;
    }
}

class TemplateDecorator {
    constructor(template){
        this.template = template;
    }

    getItem(){
        return `<div class="decorator-style">${this.template.getItem()}</div>`;
    }
}