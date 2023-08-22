<template>
    <div class="d-flex justify-content-center align-items-center pt-5 " style="margin-top: 50px">
        <form @submit.prevent="login" class="p-4 bg-light rounded shadow-sm" style="max-width: 400px;">
            <h1>Log in</h1>
            <h3 v-if="username">Hello, {{username}}</h3>
            <div class="form-group">
                <label for="username">Username</label>
                <input v-model="username" type="text" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username">
                <small id="usernameHelp" class="form-text text-muted">We'll never share your username with anyone else.</small>
                <div class="text-danger">{{ formErrors.username }}</div>

            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                <div class="text-danger">{{ formErrors.password }}</div>
            </div>
            <a @click = "signUp()" class="card-title">Sign Up</a>

            <div class="form-group mt-2" >
                <button type="submit" class="btn custom-submit-button mt-2">Log In</button>
            </div>
        </form>
    </div>
</template>
<script>
//import jwt from "jsonwebtoken";

export default {

name: "Login",
    data() {
    return {
        username: '',
        password: '',
        formErrors:{}
    }
},
methods: {
    validateForm() {
        this.formErrors = {};

        if (!this.username) {
            this.formErrors.username = "Username is required";
        }

        if (!this.password) {
            this.formErrors.password = "Password is required";
        }

        return Object.keys(this.formErrors).length === 0;
    },
    //salje post login
    login() {
        if (this.validateForm()) {
            this.$axios.post('/authentication/login', {
                //postavlja bodi za post
                username: this.username,
                password: this.password,
            }).then(response => {
                //postavlja jwt u localstorage
//                const decodedToken = jwt.decode(response.data.token)
  //              const userRole = decodedToken.role
    //            console.log("ROLEEEEEE " + userRole)
                localStorage.setItem('jwt', response.data.token)
                localStorage.setItem('username', this.username)

                localStorage.setItem('role', response.data.role)
                //preusmerava na Subjects
                this.$router.push({name: 'Movies'});
            })
        }
    },
    signUp()
    {
        this.$router.push({name: 'CreateUser'})
    }
},
}
</script>
<style>
.custom-submit-button {
    background-color: #FF5858;
    color:white;
}
</style>