<template>
  <div>
    <h1>Liste des articles</h1>

    <form @submit="this.storeArticle">
      <p v-if="errors.length">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>
    <div class="input__container">
      <label for="email">Titre*</label>
      <input type="text" id="title" placeholder="title" v-model="input.title">
    </div>

    <div class="input__container">
      <label for="text">Description*</label>
      <input type="text" id="description" placeholder="description" v-model="input.description">
    </div>

     <div class="input__container">
      <label for="text">Contenu*</label>
      <input type="text" id="body" placeholder="body" v-model="input.body">
    </div>

    <button type="submit">Ajouter</button>
    </form>

    <Article 
    v-for="article in articles"
    v-bind:key="article.id"
    v-bind:id="article.id"
    v-bind:title="article.title"
    v-bind:description="article.description"
    v-bind:body="article.body"
    v-bind:created_at="article.created_at"
    v-bind:author="article.user.name"
    @clicked="deleteArticle"
    ></Article>
  </div>
</template>

<script>
import { articleService } from '../_services/article.service'

  import Article from './Article'

  export default {
    name: 'Home',
    data() {
      return {
        articles: [],
        errors: [],
        input: {
          title: "",
          description: "",
          body: ""
        }
      }
    },
    components: {
      Article
    },
    mounted: function() {

      this.getArticles()
    },
    methods: {
     
        async storeArticle() {
            const article = await articleService.storeArticle(this.input.title, this.input.description, this.input.body); 
            this.articles.push(article)   
        },

           async getArticles() {
            const articles = await articleService.fetchArticles()
            this.articles = articles
          
        },

        async deleteArticle(id) {
            await articleService.deleteArticle(id)
            let i = this.articles.map(item => item.id).indexOf(id)

            this.articles.splice(i, 1)
        }
    }
  };
</script>

<style scoped>
  h1 {
    text-align: center;
  }

  form {
    text-align: center;
  }

  .input__container {
    margin-top: 10px;
  }

  button {
    margin-top: 10px;
  }
</style>
