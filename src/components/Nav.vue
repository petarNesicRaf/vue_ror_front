<template>
  <nav>
      <div class="logo">
          <img src="@/assets/icons8-film-50.png" alt="Logo">
      </div>
      <div class="menu-item">
          <router-link :to="{name: 'Movies'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Movies'}">Movies</router-link>

      </div>

      <div class="menu-item">
            <router-link :to="{name: 'Series'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Series'}">Series</router-link>
      </div>

      <div class="menu-item">
          <router-link :to="{name: 'Anime'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Anime'}">Anime</router-link>
      </div>

      <div class="menu-item">
          <router-link :to="{name: 'Books'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Books'}">Books</router-link>
      </div>

      <Dropdown title="Create" :items="create"/>

      <div class="menu-item" v-if="isAdmin">
          <router-link :to="{name: 'Users'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Users'}">Users</router-link>
      </div>

      <form v-if="canLogout" class="d-flex logout-form" @submit.prevent="logout">
          <button class="btn btn-outline-secondary" type="submit">Logout</button>
      </form>
  </nav>
</template>

<script>
import Dropdown from './Dropdown';
export default {
    name: "Nav",
    components:{
      Dropdown
    },
    data(){
    return {
        create: [
            {
                title: 'Create movie',

            },
            {
                title: 'Create series',
            },
            {
                title: 'Create anime',
            }
        ]
    }
    },

    computed: {
        canLogout() {
            return this.$route.name !== 'Login' || this.$route.name !== 'CreateUser';
        },
        isAdmin()
        {
            const storedRole = localStorage.getItem('role')
            console.log('roleeeejkk')
            console.log(storedRole)
            return storedRole === 'admin'
        }
    },
    methods: {
        // iz local storage ukloni jwt
        logout() {
            localStorage.removeItem('jwt');
            localStorage.removeItem('username')
            // predji na drugu putanju tj login
            // prosledjujemo naziv komponente routes index.js
            //menjamo rutu i dajemo naziv
            this.$router.push({name: 'Login'});
        }
    }
}
</script>

<style scoped>
.logo{
    margin-right:20px;
}

nav{
    display:flex;
    align-items:center;
    //justify-content: space-between;
    justify-content: center;
    padding: 0 20px;
}
.logout-form {
    margin-left: auto;
}

nav .menu-item{
    color: #FFF;
    padding: 10px 20px;
    position: relative;
    text-align:center;
    border-bottom:3px solid transparent;
    display: flex;
    transition:0.4s;
}
nav .menu-item:active,
nav .menu-item:hover{
    background-color: #444;
    border-bottom-color: #FF5858;
}
nav .menu-item a{
    color:inherit;
    text-decoration: none;
}
</style>