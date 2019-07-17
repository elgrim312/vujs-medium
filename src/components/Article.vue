<template>
<div id="article">
    <header>
        <h3>{{title}}</h3>
        <h4>{{description}}</h4>
    </header>

    <section>
        <p>{{body}}</p>
        <p>Article ayant pour id : {{id}}</p>
        <p>Le <strong>{{ created_at | moment("DD/MM/YYYY") }}</strong> par <strong>{{ author }}</strong></p>

        <button v-on:click="deleteArticle()">Supprimer</button>
        <h2>Commentaires</h2>
        <Comment 
        v-for="comment in comments"
        v-bind:key="comment.id"
        v-bind:id="comment.id"
        v-bind:content="comment.content"
        v-bind:created_at="comment.created_at"
        v-bind:author="comment.user.name"
        @clicked="deleteComment"
        ></Comment>
        <form @submit="this.storeComment">
          <textarea name="content" id="content" v-model="input.content" cols="100" rows="3"></textarea>
          <input type="submit" value="commenter">
        </form>
    </section>
</div>
</template>

<script>

import { articleService } from '../_services/article.service';
import { commentService } from '../_services/comment.service';

import Comment from './Comment';

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
          comments: [],
          input: {
              content: ''
          }
        }
    },
    components: {
      Comment
    },
    mounted: function() {

      this.getComments()
    },
    methods: {
      async storeComment(e) {
            e.preventDefault();
            const comment = await commentService.storeComment(this.input.content, this.$props.id);
            this.comments.push(comment)
        },
        async getComments() {
            const comments = await commentService.fetchComments(this.$props.id)
            this.comments = comments
            console.log(comments);

        },
        async deleteComment(id){
            await commentService.deleteComment(id)
            let i = this.comments.map(item => item.id).indexOf(id)

            this.comments.splice(i, 1)
            console.log('test');
        },
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
