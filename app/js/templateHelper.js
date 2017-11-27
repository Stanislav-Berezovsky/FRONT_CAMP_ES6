 export class TemplateHelper {

  	static getArticleItem({ title, description, publishedAt, url }) {
        return `<div class="newsItem">
            <div class="newsItemTitle">
                <span>${title}</span>
            </div>
            <div>
                <span>${description}</span>        
            </div>
            <div class="newsItemAdditional">
                <span>${new Date(publishedAt).toLocaleString()}</span>
                <span> <a href="${url}">Click this link to redirect on original page</a></span>
            </div>
        </div>`;
    }

    static getSelectedItem({ name, sourcesValue }) {
        return `<option value="${sourcesValue}">${name}</option>`;
    }
};