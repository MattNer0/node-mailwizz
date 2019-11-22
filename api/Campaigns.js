const Request = require('./Request');

const path = '/campaigns';

class Campaigns extends Request {
    constructor(config) {
        super(config);
    }

    create(info) {
        let postData = {
            name: info.name, //required
            type: info.type || 'regular', //optional: regular or autoresponder
            from_name: info.fromName, //required
            from_email: info.fromEmail, //required
            subject: info.subject, //required
            reply_to: info.replyTo, //required
            send_at: info.sendAt, //required YYYY-MM-DD hh:mm:ss
            list_uid: info.listId, //required
            segment_uid: info.segmentId || '', //optional

            //optional block, defaults are shown
            options: {
                url_tracking: info.urlTracking || 'no',
                json_feed: 'no',
                xml_feed: 'no',
                plain_text_email: 'yes',
                email_stats: '' //a valid email address where we should send the stats after campaign done
            },

            //required block, archive or template_uid or content
            template: {
                template_uid: info.templateId, //required
                archive: '',
                content: '',
                inline_css: 'yes',
                plain_text: '',
                auto_plain_text: 'yes'
            }
        };

        this.method = Request.Type.POST;
        this.url = path;
        this.data = {
            campaign: postData
        };

        return this.send();
    }

    getCampaign(campaignUid) {
        this.method = Request.Type.GET;
        this.url = `${path}/${campaignUid}`;
        this.data = {};

        return this.send();
    }

    pauseUnpause(campaignUid) {
        this.method = Request.Type.PUT;
        this.url = `${path}/${campaignUid}/pause-unpause`;
        this.data = {};

        return this.send();
    }

    markSent(campaignUid) {
        this.method = Request.Type.PUT;
        this.url = `${path}/${campaignUid}/mark-sent`;
        this.data = {};

        return this.send();
    }
}

module.exports = Campaigns;
