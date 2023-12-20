import { baseInstance } from "./axiosInstance"

export const getInformationByTitles = async (titles: string) => {
    const queryParams = {
        origin: '*',
        action: 'query',
        format: 'json',
        prop: 'extracts|pageimages',
        titles,
        exintro: true,
        explaintext: 1,
        exsentences: 2,
        formatversion: 2
    };
    const res = await baseInstance.get("/", { params: queryParams })
    return res.data
}

export const getImagesByTitles = async (titles: string) => {
    const queryParams = {
        origin: '*',
        action: 'query',
        format: 'json',
        titles,
        prop: 'imageinfo',
        generator: 'images',
        iiprop: 'url',
        formatversion: 2
    };
    const res = await baseInstance.get("/", { params: queryParams })
    return res.data
}