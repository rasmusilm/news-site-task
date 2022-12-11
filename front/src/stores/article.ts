import {defineStore} from "pinia";
import {clearUserData, persistAllUserData, persistUserLoginData} from "@/services/local";
import type Article from "@/domain/Article";

export const useArticleStore = defineStore('article', {
    state: () => ({
        articles: [] as Array<Article>,
        currentPage: null as number | null,
        totalPages: null as number | null,
    }),
    actions: {
        setArticles(articles: Array<Article>) {
            this.articles = articles;
        },
        setCurrentPage(pgNumber: number) {
            this.currentPage = pgNumber;
        },
        setTotalPages(pages: number) {
            this.totalPages = pages
        }
    }
    // const doubleCount = computed(() => count.value * 2)
    // function increment() {
    //     count.value++
    // }
})