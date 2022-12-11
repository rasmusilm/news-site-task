import type Article from "@/domain/Article";

export default function representUnknown(value: string | null): string {
    if (value) {
        return value;
    }
    return "Unknown"
}

export function searchArticlesByHeadline(key: string, searchable_articles: Array<Article>) {
    let results = [];
    let words = key.split(/,|:|\.|\s/g);
    for (const article of searchable_articles) {
        if (article.title.toLowerCase().includes(key.toLowerCase())) {
            results.push(article);
        } else {
            for (const word of words) {
                if (article.title.toLowerCase().includes(word.toLowerCase())) {
                    results.push(article);
                    break;
                }
            }
        }
    }
    return results;
}

export function searchCombinations(key: string, searchable_articles: Array<Article>) {
    let results = [];
    let words = key.split(/,|:|\.|\s/g);
    for (const article of searchable_articles) {
        for (const word of words) {
            if (article.title.toLowerCase().includes(word.toLowerCase())) {
                let index = searchable_articles.indexOf(article)
                if(typeof results[index] === 'undefined') {
                    results[index] = [];
                }
                // @ts-ignore
                results[index].push(word);
            }
        }
    }
    let articlesByRelevance = [];
    for (let x = words.length; x > 0 ; x--) {
        console.log(x);
        for (let i = 0; i < results.length; i++) {
            if(typeof results[i] === 'undefined') {
            } else if (results[i].length == x) {
                articlesByRelevance.push(searchable_articles[i])
            }
        }
    }
    return articlesByRelevance;
}
