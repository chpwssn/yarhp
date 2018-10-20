import Axios from "axios";

const StoryTypes = {
    Top: "top",
    Ask: "ask",
    Show: "show",
    Job: "job"
}

interface Story {
    by: string,
    descendants: number,
    id: number,
    kids: number[],
    score: number,
    time: number,
    title: string,
    type: string,
    url: string
}

const hackernews = {
    getItem: async (id: number): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const response = await hackernews.getV0Api(["item", `${id}.json`])
            resolve(response)
        })
    },

    getStory: async (id:number): Promise<Story> => {
        return new Promise<Story>(async (resolve, reject) => {
            const response = await hackernews.getItem(id)
            resolve(<Story>response)
        })
    },

    getStories: async (type: string): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const response = await hackernews.getV0Api([`${type}stories.json`]);
            resolve(response);
        })
    },

    buildV0Query: (params: any[], args = []) => {
        return `https://hacker-news.firebaseio.com/v0/` + params.join('/'); 
    },

    getV0Api: async (params: any[]) => {
        return new Promise((resolve, reject) => {
            Axios.get(hackernews.buildV0Query(params))
                .then(response => {
                    resolve(response.data)
                }).catch(err => {
                    reject(err)
                })
        })
    },
}

export default hackernews;
export {
    StoryTypes,
    Story
}