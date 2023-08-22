import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Movies',


    component: () => import(/* webpackChunkName: "about" */ '../views/Movies.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path:'/movie_view',
    name: 'MovieView',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/MovieView.vue')

  },
  {
    path:'/create_movie',
    name: 'CreateMovie',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/CreateMovie.vue')

  },
  {
    path:'/edit_movie',
    name: 'EditMovie',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/EditMovie.vue')

  },
  {
    path:'/series',
    name: 'Series',


    component: () => import(/* webpackChunkName: "about" */ '../views/Series.vue')

  },
  {
    path:'/seriesview',
    name: 'SeriesView',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/SeriesView.vue')

  },
  {
    path:'/create_series',
    name: 'CreateSeries',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/CreateSeries.vue')

  },
  {
    path:'/edit_series',
    name: 'EditSeries',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/EditSeries.vue')

  },
  {
    path:'/anime',
    name: 'Anime',


    component: () => import(/* webpackChunkName: "about" */ '../views/Anime.vue')

  },
  {
    path:'/create_anime',
    name: 'CreateAnime',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/CreateAnime.vue')

  },
  {
    path:'/anime_view',
    name: 'AnimeView',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/AnimeView.vue')

  },
  {
    path:'/edit_anime',
    name: 'EditAnime',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/EditAnime.vue')

  },
  {
    path:'/books',
    name: 'Books',


    component: () => import(/* webpackChunkName: "about" */ '../views/Books.vue')

  },
  {
    path:'/create_book',
    name: 'CreateBook',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/CreateBook.vue')

  },
  {
    path:'/book_view',
    name: 'BookView',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/BookView.vue')

  },
  {
    path:'/edit_book',
    name: 'EditBook',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/EditBook.vue')

  },
  {
    path:'/users',
    name: 'Users',

    meta: {
      authRequired: true,
    },

    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')

  },
  {
    path:'/create_user',
    name: 'CreateUser',



    component: () => import(/* webpackChunkName: "about" */ '../views/CreateUser.vue')

  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  //ruta na koju hocemo da idemo ako postoji nasa authrequired promenljiva
  //ova metoda se zove svaki put kad menjamo rutu zato iz mete uzimamo auth required
  //ukoliko je rekuired iz local storage uzimamo jwt
  //izvlacimo iz meta iz to
  if (to.meta.authRequired) {
    const jwt = localStorage.getItem('jwt');

    //ukoliko ne postoji next stavi da se pojavi login
    if (!jwt) {
      next({name: 'Login'});
      return;
    }

    console.log('jwt ' + jwt)
    //dekodovanje jwta
    //uzimamo payload iz jwt-a tj username i password
    //const payload = JSON.parse(atob(jwt.split('.')[1]));
    //const expDate = new Date(payload.exp * 1000);
    //ukoliko je expired next stavi da se pojavi login
    //if (expDate < new Date()) {
    //  next({name: 'Login'});
    //  return;
  }
  //ako ne nastavi dalje
  next();
});

export default router
