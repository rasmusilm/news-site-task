<template>
    <h2>
        My Feed
    </h2>
    <div v-for="article in articles">
        {{article.title}}
    </div>
</template>

<script>
import {Vue} from "vue-class-component";
import {useIdentityStore} from "@/stores/identity";
import {NewsAPI} from "@/services/newsAPI";
import Article from "@/domain/Article";

export default class MainView extends Vue{
    identity = useIdentityStore();
    apiService = new NewsAPI();
    articles = null;

    mounted() {
        let response = this.apiService.getTop();
        response.then(data => this.articles = data.articles);
    }
}
</script>

<style scoped>

</style>