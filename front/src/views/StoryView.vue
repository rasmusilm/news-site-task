<template class="flex-container">
        <div class="content">
            <div class="article-content" v-if="loaded">
                <div class="title clickable">
                    {{this.article.title}}
                </div>
                <div class="article-text">
                    {{this.article.content}}
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
</style>