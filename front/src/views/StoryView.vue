<template class="flex-container">
        <div class="content">
            <div class="article-content" v-if="loaded">
                <div class="title clickable">
                    {{this.article.title}}
                </div>
                <div class="image-container">
                    <img v-bind:src="article.urlToImage" loading="lazy" class="big-image" alt="article main image"/>
                </div>
                <div class="article-text">
                    {{this.article.content}}
                </div>
                <div class="article-text">
                    <a v-bind:href="article.url">
                        {{this.article.source.name}}
                    </a>
                </div>
            </div>

        </div>
</template>

<script>
import {prop, Vue} from "vue-class-component";
import {useArticleStore} from "@/stores/article";

export class Props {
    index = prop({required:true})
}
export default class StoryView extends Vue.with(Props){
    articleStore = useArticleStore();
    loaded = false;

    beforeMount() {
        this.loaded = false;
    }

    mounted() {
        console.log(this.index);
        this.setCorrectArticle();
        this.loaded = true;

        //actually should be using a backend for webscraping
        // the actual article content, but not enough time atm
    }

    setCorrectArticle() {
        this.article = this.articleStore.articles[this.index];
    }
}
</script>

<style scoped>

.title {
    font-size: 2rem;
    margin: 2rem 0 2rem 0;
}

.article-content {
    width: 95%;
    align-self: center;
    margin: auto;
}

.article-text {
    width: 90%;
    margin: auto;
}

.image-container {
    width: 80%;
    margin: auto;
    align-items: center;
    display: flex;
    height: 25rem;
}

.big-image {
    width: 80%;
    margin: auto;
    align-self: center;
    background-color: #cccccc;
}
</style>