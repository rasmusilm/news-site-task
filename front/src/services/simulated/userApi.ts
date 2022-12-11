import {useIdentityStore} from "@/stores/identity";
import User from "@/domain/User";
// @ts-ignore
import axios, {AxiosError} from "axios";
import NewsResponse from "@/domain/NewsResponse";

export class UserApi {
    identity = useIdentityStore();

    async getUserData() {
        let user = new User(this.identity.name!, this.identity.apikey!, this.identity.name!);
        //if using actual API
        // let client = axios.create();
        // let baseURL = `https:localhost/api/user`;
        // try {
        //     let responce = await client.get(baseURL,
        //         {
        //             headers: {
        //                 "Authentication": this.identity.jwt // if using actual backend
        //             }
        //         })
        //     let res = responce.data as User;
        //     return res;
        // } catch (e) {
        //     this.errorHandle(e)
        // }
        // this.identity.setName(user.name!);
        // this.identity.setAPIKey(user.apikey!);
        // this.identity.setEmail(user.email!);
        return user;
    }

    async update(user: User) {
        //if using actual API
        // let client = axios.create();
        // let baseURL = `https:localhost/api/user`;
        // try {
        //     let responce = await client.post(baseURL,
        //         user, {
        //             headers: {
        //                 "Authentication": this.identity.jwt // if using actual backend
        //             }
        //         })
        //     let res = responce.data as User;
        //     return res;
        // } catch (e) {
        //     this.errorHandle(e)
        // }
        return user;
    }

    errorHandle(e: any) {
        let error = (e as AxiosError).response;
        switch (error!.status) {
            case 401:
                throw new Error("wrong credentials");
                break;
            default:
                console.log((e as AxiosError).response);
        }
    }
}