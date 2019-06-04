import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login';
import HelloWorld from '../components/HelloWorld';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});


router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('login');
  }

  next();
});
