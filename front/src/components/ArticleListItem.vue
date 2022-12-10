<template>
    <div class="article">
        <div class="title clickable">
            <RouterLink :to="{
                name: 'Story',
                params: {index: index}
            }" >
                {{this.article.title}}
            </RouterLink>
        </div>
        <div class="flex-container-articles">
            <div class="description">
                {{this.article.description}}
            </div>
            <div class="image-container clickable">
                <img v-bind:src="article.urlToImage" class="small-image"/>
            </div>
        </div>
    </div>


</template>

<script>
import {Vue, prop, Options} from "vue-class-component";
import Article from "@/domain/Article";

export class Props {
    article = prop<Article>({required:true});
    index = prop({required:true})
}
export default class ArticleListItem extends Vue.with(Props){

    mounted() {
        console.log(this.article.description)
    }
}
</script>

<style scoped>

.small-image {
    max-width: 100%;
}

div {
    border: black 0.5px solid;
}

.title{
    font-weight: bold;
    font-size: 1.5rem;
    width: 100%;
    margin-bottom: 0.5rem;
}

.article {
    width: 100%;
}

@media (min-width: 1000px) {
    .flex-container-articles {
        display: flex;
        flex-direction: row;
        justify-content: end;
    }
    .description {
        width: 66%;
        margin: 0 1rem 0 1rem;
    }

    .image-container{
        float: right;
        align-self: end;
        width: 33%;
    }

    .article {
        margin-bottom: 2rem;
    }

}

@media (max-width: 1000px) and (min-width: 700px) {
    .flex-container-articles {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .description {
        align-self: center;
        width: 80%;
        margin: 0 1rem 0 1rem;
    }

    .image-container{
        align-self: center;
        width: 80%;
    }

    .article {
        margin-bottom: 1rem;
    }

}

@media (max-width: 700px) {
    .flex-container-articles {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .description {
        align-self: center;
        width: 100%;
        margin: 0 1rem 0 1rem;
    }

    .image-container{
        align-self: center;
        width: 100%;
    }

    .article {
        margin-bottom: 1rem;
    }

}
</style>