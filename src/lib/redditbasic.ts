import Axios from "axios";

interface Gilding {
    gild_1: number,
    gild_2: number,
    gild_3: number
}

interface ObjectData {
    approved_at_utc: number,
    subreddit: string,
    selftext: string,
    author_fullname: string,
    save: boolean,
    mod_reason_title: string,
    gilded: number,
    clicked: boolean,
    title: string,
    link_flair_richtext: string[],
    subreddit_name_prefixed: string,
    hidden: boolean,
    pwls: number,
    link_flair_css_class: string,
    downs: number,
    thumbnail_height: number,
    hide_score: boolean,
    name: string,
    quarantine: boolean,
    link_flair_text_color: string,
    author_flair_background_color: string,
    subreddit_type: string,
    ups: number,
    domain: string,
    media_embed: any,
    thumbnail_width: number,
    author_flair_template_id: string,
    is_original_content: boolean,
    user_reports: any[],
    secure_media: any,
    is_reddit_media_domain: boolean,
    is_meta: boolean,
    category: any,
    secure_media_embed: any,
    link_flair_text: string,
    can_mod_post: boolean,
    score: number,
    approved_by: any,
    thumbnail: string,
    edited: boolean,
    author_flair_css_class: string,
    author_flair_richtext: string[],
    gildings: Gilding,
    content_categories: any,
    is_self: boolean,
    mod_note: string,
    created: number,
    link_flair_type: string,
    wls: number,
    banned_by: any,
    author_flair_type: string,
    contest_mode: boolean,
    selftext_html: string,
    likes: any,
    suggested_sort: any,
    banned_at_utc: number,
    view_count: number,
    archived: boolean,
    no_follow: boolean,
    is_crosspostable: boolean,
    pinned: boolean,
    over_18: boolean,
    media_only: boolean,
    link_flair_template_id: any,
    can_gild: boolean,
    spoiler: boolean,
    locked: boolean,
    author_flair_text: string,
    visited: boolean,
    num_reports: number,
    distinguished: any,
    subreddit_id: string,
    mod_reason_by: any,
    removal_reason: any,
    link_flair_background_color: string,
    id: string,
    is_robot_indexable: boolean,
    report_reasons: any,
    author: string,
    num_crossposts: number,
    num_comments: number,
    send_replies: boolean,
    whitelist_status: string,
    mod_reports: any[],
    author_patreon_flair: boolean,
    author_flair_text_color: string,
    permalink: string,
    parent_whitelist_status: string,
    stickied: boolean,
    url: string,
    subreddit_subscribers: number,
    created_utc: number,
    media: any,
    is_video: boolean

}

interface RedditObject {
    kind: string,
    data: ObjectData
}

interface ApiResponse {
    kind: string,
    data: {
        modhash: string,
        dist: number,
        children: RedditObject[],
        after: string,
        before: string,
    }
}

const redditbasic = {
    getBest: async (): Promise<ApiResponse> => {
        return new Promise<ApiResponse>(async (resolve, reject) => {
            const response = await redditbasic.getV0Api([`best`]);
            resolve(response as ApiResponse);
        })
    },

    getMulti: async (multis: string) => {
        return new Promise<ApiResponse>(async (resolve, reject) => {
            const response = await redditbasic.getV0Api(['r', multis]);
            resolve(response as ApiResponse);
        })
    },

    buildApiQuery: (params: any[], args = []) => {
        return `https://api.reddit.com/` + params.join('/');
    },

    getV0Api: async (params: any[]) => {
        return new Promise((resolve, reject) => {
            Axios.get(redditbasic.buildApiQuery(params))
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                    reject(err)
                })
        })
    },
}

export default redditbasic;
export {
    ObjectData,
    RedditObject,
    ApiResponse
}