<template>
  <div id="app">
    <div id="nav">
      <Navigation></Navigation>
      <!-- eslint-disable-next-line vue/max-attributes-per-line -->
      <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>
        Logout
      </router-link>
    </div>
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>
import { userService } from './_services/user.service';
import Navigation from './components/navigation/Navigation';
export default {
  name: 'App',
  components: {
    'Navigation': Navigation
  },
  data() {
    return {
      authenticated: false,
      mockAccount: {
        username: 'nraboy',
        password: 'password',
      },
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: 'login' });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      userService.logout();
      this.authenticated = false;
    },
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

  #nav {
    text-align: center;
  }
</style>
