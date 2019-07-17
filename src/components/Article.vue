<template>
<div id="article">
    <header>
        <h3>{{title}}</h3>
        <h4>{{description}}</h4>
    </header>

    <section>
        <p>{{body}}</p>
        <p>Le <strong>{{ created_at | moment("DD/MM/YYYY") }}</strong> par <strong>{{ author }}</strong></p>

        <button v-on:click="deleteArticle()">Supprimer</button>
    </section>
</div>
</template>

<script>

import { articleService } from '../_services/article.service'

export default {
    name: "Article",
    props: {
        id: Number,
        title: String,
        description: String,
        body: String,
        created_at: String,
        author: String
    },
    data() {
        return {
          
        }
    },
    methods: {
      deleteArticle() {
          this.$emit('clicked', this.$props.id)
      }
    }
}
</script>

<style scoped>
#article {
    border: 1px solid black;
    max-width: 40%;
    margin: auto;
    margin-top: 20px;
}

#article header {
    border-bottom: 1px solid black;
}

#article header h4, #article header h3 {
    margin: 0px;
}

#article header h3 {
    margin: 0px;
    text-align: center;
}

#article header h4 {
    color: grey;
    text-align: center;
    margin-top: 5px;
}

#article header, #article section {
      padding: 20px;
}



</style>
