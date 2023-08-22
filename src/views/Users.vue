<template>
    <div class="container mt-5">
        <h1>Users</h1>
        <table class="table">
            <thead>
            <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Password Digest</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.username }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.password_digest }}</td>
                <td>
                    <button @click="editUser(user)" class="btn btn-primary">Edit</button>
                    <button @click="deleteUser(user)" class="btn btn-danger">Delete</button>
                </td>
            </tr>
            </tbody>
            <br>
            <br>
            <button @click="goToCreateUser" class="btn btn-success mb-3">Create User</button>

        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: []
        };
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        fetchUsers() {
            this.$axios.get('/authentication').then(response => {
                this.users = response.data;
            }).catch(error => {
                console.error('Error fetching users:', error);
            });
        },
        editUser(user) {
            // Implement your edit logic here, e.g., route to an edit page
            // this.$router.push({ name: 'EditUser', params: { id: user.id } });
        },
        deleteUser(user) {
            if (confirm(`Are you sure you want to delete user ${user.username}?`)) {
                this.$axios.delete(`/authentication/${user.id}`).then(response => {
                    // Remove the deleted user from the list
                    this.users = this.users.filter(u => u.id !== user.id);
                }).catch(error => {
                    console.error('Error deleting user:', error);
                });
            }
        },
        goToCreateUser() {
            this.$router.push({ name: 'CreateUser' });
        }
    }
};
</script>
