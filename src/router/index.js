import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login';
import HelloWorld from '../components/HelloWorld';
import Register from '../components/Register';
import Home from '../components/Home';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld,
    },
    {
      path: '/home',
      name: 'homepage',
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
