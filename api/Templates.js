const Request = require('./Request');

const path = '/templates';

class Template extends Request {
    constructor(config) {
        super(config);
    }

    create(info) {
        let postData = {
            name: info.name, //required
            content: Buffer.from(info.content).toString('base64'), //required
            inline_css: info.inlineCss || 'no', //yes or no
        };

        this.method = Request.Type.POST;
        this.url = path;
        this.data = {
            template: postData
        };

        return this.send();
    }

    getTemplates(page = 1, limit = 10) {
        this.url = path;
        this.method = Request.Type.GET;
        this.data = {
            page: page,
            per_page: limit
        };

        return this.send();
    }

    getTemplate(templateUid) {
        this.method = Request.Type.GET;
        this.url = `${path}/${templateUid}`;
        this.data = {};

        return this.send();
    }
}

module.exports = Template;
