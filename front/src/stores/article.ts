import {defineStore} from "pinia";
import {clearUserData, persistAllUserData, persistUserLoginData} from "@/services/local";
import type Article from "@/domain/Article";

export const useArticleStore = defineStore('article', {
    state: () => ({
        articles: [] as Array<Article>,
        current: null as number | null,
    }),
    actions: {
        setArticles(articles: Array<Article>) {
            this.articles = articles;
        },
        setCurrent(index: number) {
            this.current = index;
        },
        getCurrentArticle() {
            if (this.current) return this.articles[this.current];

        }
    }
    // const doubleCount = computed(() => count.value * 2)
    // function increment() {
    //     count.value++
    // }
})