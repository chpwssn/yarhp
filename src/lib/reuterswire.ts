import Axios from 'axios';

interface WireTemplateStory {
    cid: string,
    image: {
        caption: string,
        content_type: string,
        source_api: string,
        url: string
    },
    template: string,
    type: string,
    template_action: {
        type: string,
        api_path: string
    },
    primary_channel: {
        id: string,
        name: string,
        url: string,
        channel_action: {
            type: string,
            api_path: string
        }
    },
    story: {
        usn: string,
        lede: string,
        url: string,
        updated_at: string,
        hed: string,
        dateline: string
    }
}

interface WireTemplateShare {
    cid: string,
    tmplate: string,
    share_url: string,
    template_info: {
        detail_action: string,
        api_path: string
    }
}

interface WireItem {
    wireitem_id: string,
    wireitem_cid: string,
    wireitem_type: string,
    templates: [
        WireTemplateStory,
        WireTemplateShare
    ]
}

interface WireResponse {
    wire_id: string,
    wire_name: string,
    wire_description: string,
    wire_type: string,
    wireitems: WireItem[]
}
const reuterswire = {

    getStories: async (): Promise<WireResponse> => {
        return new Promise<WireResponse>((resolve, reject) => {
            Axios.get(`https://wireapi.reuters.com/v3/feed/url/www.reuters.com/theWire`)
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                    reject(err)
                })
        })
    },

}

export default reuterswire;
export {
    WireItem,
    WireResponse,
    WireTemplateShare,
    WireTemplateStory,
}