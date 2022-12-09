import type {Source} from "@/domain/Source";

export default class Article {
    author = null as string | null;
    title = "";
    source = null as Source | null;
    url = "";
    urlToImage = null as string | null;
    publishedAt = Date.now();
    description = null as string | null;
    content = null as string | null;
}