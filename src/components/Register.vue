<template>
  <form id="register" @submit="checkForm">
    <p v-if="errors.length">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>
    <div class="input__container">
      <label for="email">Email*</label>
      <input type="email" id="email" placeholder="email" v-model="input.email">
    </div>

    <div class="input__container">
      <label for="text">Name*</label>
      <input type="text" id="name" placeholder="text" v-model="input.name">
    </div>

    <div class="input__container">
      <label for="password">Mot de passe*</label>
      <input type="password" id="password" placeholder="password" v-model="input.password">
    </div>

    <div class="input__container">
      <label for="repeat__password">Confirmation mot de passe*</label>
      <input type="password" id="repeat__password" placeholder="password" v-model="input.repeat_password">
    </div>

    <div class="submit__container">
      <button type="submit">S'inscrire</button>
    </div>
  </form>
</template>

<script>
import { userService } from '../_services/user.service';
  export default {
    name: 'Register',
    data() {
      return {
        errors: [],
        input: {
          email: "",
          password: "",
          repeat_password: ""
        }
      }
    },
    methods: {
      checkForm: function (e) {
        if (this.input.email && this.input.password && this.input.repeat_password) {
          this.register()
        }

        this.errors = [];

        if (!this.input.email) {
          this.errors.push("Le champ email est obligatoire")
        }

        if (!this.input.password) {
          this.errors.push("Le champ mot de passe est obligatoire")
        }

        if (!this.input.repeat_password) {
          this.errors.push("Le champ confirmation mot de passe est obligatoire")
        }

        e.preventDefault()
      },

      async register() {
          userService.register(this.input.email, this.input.name, this.input.password)
          this.$router.replace({ name: 'secure' });
        }
      },
  };
</script>

<style scoped>
  #register {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
  }
</style>
