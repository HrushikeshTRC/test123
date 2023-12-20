import axios, { AxiosRequestConfig } from "axios"

const baseReqConfig: AxiosRequestConfig = {
    baseURL: "https://simple.wikipedia.org/w/api.php?origin=*",
    headers: {
        Accept: 'Application/json',
        'Content-Type': 'Application/json'
    },
}

export const baseInstance = axios.create(baseReqConfig)
