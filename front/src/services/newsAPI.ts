import {useIdentityStore} from "@/stores/identity";
// @ts-ignore
import axios, {AxiosError} from "axios";
import type NewsResponse from "@/domain/NewsResponse";

export class NewsAPI {
    identity = useIdentityStore();

    async getTop()  {
        console.log("all")
        let client = axios.create();
        try {
            let responce = await client.get(`https://newsapi.org/v2/top-headlines?language=en&apiKey=${this.identity.apikey}`)
            let res = responce.data as NewsResponse;
            console.log(res);
            return res;
        } catch (e) {
            console.log((e as AxiosError).response)
        }

    }
}