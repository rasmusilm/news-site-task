import type Article from "@/domain/Article";

export default class NewsResponse {
    articles = null as Array<Article> | null;
    status = "";
    totalResults = null as number | null;
}