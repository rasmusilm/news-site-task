<template class="flex-container">
    <div class="content">
        <h2>
            My Feed
        </h2>
        <div class="search">
            <input class="searchbox">
            <button class="search-button">
                <span v-if="showSearchText">Search</span>
                <v-mdi name="mdi-magnify" v-else>S</v-mdi>
            </button>
        </div>
        <div class="article-list">
            <div v-for="article in articles" class="article-content">
                <article-list-item :article="article" :index="articles.indexOf(article)" />
            </div>
        </div>

    </div>
</template>

<script>
import {Vue} from "vue-class-component";
import {useIdentityStore} from "@/stores/identity";
import {NewsAPI} from "@/services/newsAPI";
import {useArticleStore} from "@/stores/article";

export default class MainView extends Vue{
    identity = useIdentityStore();
    apiService = new NewsAPI();
    articleStore = useArticleStore();
    articles = this.articleStore.articles;
    showSearchText = true;

    beforeMount() {
        this.resizeHandler();
        let response = this.apiService.getTop();
        response.then(data => {
            this.articleStore.setArticles(data.articles);
            this.articles = data.articles;
        });
    }

    created() {
        window.addEventListener("resize", this.resizeHandler);
    }

    destroyed() {
        window.removeEventListener("resize", this.resizeHandler);
    }

    resizeHandler() {
        switch (window.innerWidth < 1000) {
            case true:
                this.showSearchText = false;
                break;
            default:
                this.showSearchText = true;
        }
    }
}
</script>

<style scoped>
.article-content {
    width: 95%;
    align-self: center;
}

.article-list {
    display: flex;
    flex-direction: column;
}

.search {
    width: 80%;
    margin: auto;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: row;
}

.searchbox {
    width: 85%;
    font-size: 1.5rem;
}

.search-button {
    max-width: 13%;
    font-size: 1.3rem;
}
</style>