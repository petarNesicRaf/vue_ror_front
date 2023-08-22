<template>
    <div class="d-flex justify-content-center align-items-center" style="margin-top: 100px;">

        <form @submit.prevent="submitForm" class="p-4 bg-light rounded shadow-sm" > <!-- Adjust the max-width as needed -->
            <h2>Register</h2>
            <div class="mb-3">
                <label for="title" class="form-label">Username</label>
                <input type="text" class="form-control" id="title" v-model="username" required>
                <div class="text-danger">{{ formErrors.username }}</div>
            </div>
            <div class="mb-3">
                <label for="year" class="form-label">Role</label>
                <input type="text" class="form-control" id="year" v-model="role" required>
                <div class="text-danger">{{ formErrors.role }}</div>
            </div>
            <div class="mb-3">
                <label for="year" class="form-label">Password</label>
                <input type="text" class="form-control" id="year" v-model="password" required>
                <div class="text-danger">{{ formErrors.password }}</div>
            </div>
            <a @click = "logIn()" class="card-title">Log in</a>
            <br>

            <button type="submit" class="btn custom-submit-button">Sign up</button>
        </form>
    </div>
</template>

<script>
//import jwt from 'jsonwebtoken';

export default {
    name: "CreateSeries",
    data(){
        return{
            username: '',
            role: '',
            password: '',
            formErrors:''
        }
    },
    methods: {
        validateForm() {
            this.formErrors = {};

            if (!this.username) {
                this.formErrors.username = "Username is required";
            }

            if (!this.role) {
                console.log(this.role)
                this.formErrors.role = "Role is required, the allowed roles are 'user', 'admin' and 'guest'";
            }

            if (!this.password) {
                this.formErrors.password = "Password is required";
            }

            return Object.keys(this.formErrors).length === 0;
        },
        submitForm() {
            if (this.validateForm()) {
                const createData = {
                    user: {
                        username: this.username,
                        role: this.role,
                        password: this.password
                    }
                }
                this.$axios.post(`/authentication/register`, createData)
                    .then(response => {
                       // const decodedToken = jwt.decode(response.data.token)
                       // const userRole = decodedToken.role
                       // console.log("ROLEEEEEE " + userRole)
                        console.log("movie updated", response.data)
                        localStorage.setItem('jwt', response.data.token)
                        localStorage.setItem('username', this.username)
                        localStorage.setItem('role', response.data.role)

                        this.$router.push({name: "Movies"});

                    })
            }
        },
        logIn()
        {
            this.$router.push({name: 'Login'})
        }
    },

}
</script>

<style scoped>
.custom-submit-button {
    background-color: #FF5858;
    color:white;
}

</style>