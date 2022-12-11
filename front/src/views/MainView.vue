<template class="flex-container">
    <div class="content">
        <h2>
            My Feed
        </h2>
        <div class="search">
            <input class="searchbox" v-model="searchKey" v-on:input="localSearch">
            <button class="search-button" @click="searchWithApi">
                <span v-if="showSearchText">Search</span>
                <search-svg v-else/>
            </button>
        </div>
        <div class="article-list" v-if="this.articlesFound && !this.inError">
            <div v-for="article in articles" class="article-content">
                <article-list-item :article="article" :index="articles.indexOf(article)" />
            </div>
        </div>
        <div v-else-if="this.inError">
            <h2>
                {{ this.errorMessage }}
            </h2>
        </div>
        <div v-else>
            <h2>
                No articles found.
            </h2>
        </div>
        <div class="flex-container">
            <div class="page-select-container">
                <div class="page-button" @click="firstPage">
                    &lt;&lt;
                </div>
                <div class="page-button" @click="movepage(articleStore.currentPage-1)">
                    &lt;
                </div>
                <div class="page-button">
                    {{this.articleStore.currentPage}}
                </div>
                <div class="page-button" @click="movepage(articleStore.currentPage+1)">
                    >
                </div>
                <div class="page-button" @click="finalpage">
                    >>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Vue} from "vue-class-component";
import {useIdentityStore} from "@/stores/identity";
import {NewsAPI} from "@/services/newsAPI";
import {useArticleStore} from "@/stores/article";
import {searchCombinations} from "@/services/utility";

export default class MainView extends Vue{
    identity = useIdentityStore();
    apiService = new NewsAPI();
    articleStore = useArticleStore();
    articles = this.articleStore.articles;
    showSearchText = true;
    searchKey = "";
    articlesFound = true;
    searching= false;
    inError = false;
    errorMessage = "";

    beforeMount() {
        this.resizeHandler();
        if (this.articleStore.currentPage == null) {
            let response = this.apiService.getTop();
            this.handleApiResponse(response);
        } else if (this.articleStore.articles.length < 1) {
            this.articlesFound = true;
        }
    }

    created() {
        window.addEventListener("resize", this.resizeHandler);
    }

    destroyed() {
        window.removeEventListener("resize", this.resizeHandler);
    }

    localSearch() {
        this.articles = searchCombinations(this.searchKey, this.articleStore.articles);
        this.articlesFound = this.articles.length >= 1;
    }

    searchWithApi() {
        let response = this.apiService.getBySearch(encodeURI(this.searchKey))
        this.handleApiResponse(response)
        this.searching = true;
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

    firstPage() {
        this.movepage(1);
    }

    movepage(pagenum) {
        if (pagenum < 1) return;
        try {
            if (this.searching) {
                this.handleApiResponse(this.apiService.getBySearch(encodeURI(this.searchKey), pagenum))
            } else  {
                this.handleApiResponse(this.apiService.getTop(pagenum));
            }
            this.articleStore.setCurrentPage(pagenum)
        } catch (e) {
            this.inError = true;
            this.errorMessage = e.message;
        }

    }

    finalpage() {
        this.movepage(this.articleStore.totalPages);
    }

    handleApiResponse(response) {
        this.articleStore.setCurrentPage(1);
        response.then(data => {
            this.articleStore.setArticles(data.articles);
            this.articleStore.setTotalPages(Math.ceil(data.totalResults/data.articles.length))
            this.articles = data.articles;
            this.articlesFound = this.articles.length >= 1;
        }).catch(
            e => {
                this.inError = true;
                this.errorMessage = e.message;
            }
        );
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

.page-select-container {
    width: 30%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.page-button {
    padding: 0.6rem 0.2rem 0rem 0.2rem;
    text-align: center;
    border: 1px solid #cccccc;
    border-radius: 10px;
    width: 2rem;
    height: 2rem;
    margin-left: 0.5rem;
    background-color: #d7d7d7;
    color: #414141;
    font-family: SansSerif,serif;
}
</style>