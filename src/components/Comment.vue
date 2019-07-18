<template>
<div id="test" class="comment-card">
    <header>
    </header>
    <section>
        <p class="comment-content">{{content}}</p>
        <div class="comment-info">
            <p class="author">Auteur : {{author}}</p>
            <p>Le <strong>{{ created_at | moment("DD/MM/YYYY") }}</strong></p>
        </div>
        <button v-on:click="deleteComment()">Supprimer le commentaire</button>
    </section>
</div>
</template>

<script>

export default {
    name: "Comment",
    props: {
        id: Number,
        content: String,
        created_at: String,
        author: String
    },
    data() {
        return {

        }
    },
    methods: {
        deleteComment() {
          this.$emit('clicked', this.$props.id)
        }
    }
}
</script>
<style>
    #test {
        border-top: 1px solid grey;
        padding: 1rem 0;
    }
    .comment-content {
        margin: 0;
    }
    .comment-info {
        display: flex;
        justify-content: space-between;
    }      
    .comment-info .author {
        font-weight: bold;
    } 
</style>

