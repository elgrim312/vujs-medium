<template>
  <div id="login">
    <div class="error-msg">{{ msg_error}}</div>
    <input type="text" name="email" v-model="input.email" placeholder="Email">
    <input type="password" name="password" v-model="input.password" placeholder="password">
    <button type="button" v-on:click="login()">Sign in !!</button>
  </div>
</template>

<script>
import { userService } from '../_services/user.service';

export default {
  name: 'Login',
  data() {
    return {
      msg_error : '',
      input: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      if (this.input.email !== '' && this.input.password !== '') {
        const user = await userService.login(this.input.email, this.input.password);
        console.log(user.auth_token)
        if (user.auth_token) {
          this.$emit('authenticated', true);
          this.$router.push('home')
        }else {
          this.msg_error = "Email ou mot de passe invalide"
        }
        this.$emit('authenticated', true);
        this.$router.replace({ name: 'home' });
      }
    },
  },
};
</script>

<style scoped>
  #login {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
  }
</style>
