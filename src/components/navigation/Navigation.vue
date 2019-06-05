<template>
  <div>
    <nav>
      <router-link class="spacing" v-for="routes in links"
                   v-bind:key="routes.id"
                   :to="`${routes.page}`">{{routes.text}}</router-link>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Navigation',
    data() {
      return {
        links: [
          {
            id: 0,
            text: "page d'acceuil",
            page: "homepage"
          },
          {
            id: 1,
            text: "se connecter",
            page: "login"
          },
          {
            id: 2,
            text: "s'inscrire",
            page: "register"
          }
        ]
      }
    }
  };
</script>

<style scoped>
  .spacing {
    margin-right: 10px;
  }
</style>
