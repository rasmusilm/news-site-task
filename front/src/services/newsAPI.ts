import {useIdentityStore} from "@/stores/identity";
// @ts-ignore
import axios, {AxiosError} from "axios";
import type NewsResponse from "@/domain/NewsResponse";

export class NewsAPI {
    identity = useIdentityStore();

    async getTop(pagenum = null as number | null)  {
        console.log("all")
        let client = axios.create();
        let baseURL = `https://newsapi.org/v2/top-headlines?language=en`;
        if (pagenum !== null) {
            baseURL = `https://newsapi.org/v2/top-headlines?language=en&page=${pagenum}`
        }
        try {
            let responce = await client.get(baseURL,
                {
                    headers: {
                        "X-Api-Key": this.identity.apikey
                    }
                })
            let res = responce.data as NewsResponse;
            console.log(res);
            return res;
        } catch (e) {
            this.errorHandle(e)
        }

    }

    async getBySearch(query: string, pagenum = null as number | null) {
        console.log("query");
        let client = axios.create();
        let baseURL = `https://newsapi.org/v2/everything?language=en&q=${query}`;
        if (pagenum !== null) {
            baseURL = `https://newsapi.org/v2/everything?language=en&q=${query}&page=${pagenum}`
        }
        try {
            let responce = await client.get(baseURL, {
                headers: {
                    "X-Api-Key": this.identity.apikey
                }
            })
            let res = responce.data as NewsResponse;
            console.log(res);
            return res;
        } catch (e) {
            this.errorHandle(e)
        }
    }


    errorHandle(e: any) {
        let error = (e as AxiosError).response;
        switch (error!.status) {
            case 426:
                throw new Error("Your NewsAPI plan requires upgrade, as currently your results are limited to 100");
                break;
            default:
                console.log((e as AxiosError).response);
        }
    }
}