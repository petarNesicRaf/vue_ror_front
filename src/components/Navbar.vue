<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">RAF News</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                        <li class="nav-item">
                            <router-link :to="{name: 'Movies'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Movies'}">Movies</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'Users'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Users'}">Users</router-link>
                        </li>
                        <Dropdown title="Create" :items="create"/>

                    </ul>
                    <!--ako is ulogovan mozes da se logoutujes-->
                    <form v-if="canLogout" class="d-flex" @submit.prevent="logout">
                        <button class="btn btn-outline-secondary" type="submit">Logout</button>
                    </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import Dropdown from "@/components/Dropdown.vue";

export default {
    name: "Navbar",
    components:{
        Dropdown
    },
    data(){
        return {
            create: [
                {
                    title: 'Create movie',
                    link: '#'
                },
                {
                    title: 'Create series',
                    link: '#'
                },
                {
                    title: 'Create anime',
                    link: '#'
                }
            ]
        }
    },
    computed: {
        canLogout() {
            return this.$route.name !== 'Login';
        }
    },
    methods: {
        // iz local storage ukloni jwt
        logout() {
            localStorage.removeItem('jwt');
            // predji na drugu putanju tj login
            // prosledjujemo naziv komponente routes index.js
            //menjamo rutu i dajemo naziv
            this.$router.push({name: 'Login'});
        }
    }
}
</script>

<style scoped>

</style>
