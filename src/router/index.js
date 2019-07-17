import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';

Vue.use(Router);
Vue.use(require('vue-moment'));

export const router = new Router({
  routes: [
   {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ],
});


router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('login');
  }

  next();
});
