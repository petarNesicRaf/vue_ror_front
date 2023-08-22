<template>
    <div class="d-flex justify-content-center align-items-center" style="margin-top: 100px;">

        <form @submit.prevent="submitForm" class="p-4 bg-light rounded shadow-sm" > <!-- Adjust the max-width as needed -->
            <h2>Edit Anime</h2>
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" v-model="title" required>
                <div class="text-danger">{{ formErrors.title }}</div>

            </div>
            <div class="mb-3">
                <label for="year" class="form-label">Year</label>
                <input type="text" class="form-control" id="year" v-model="year" required>
                <div class="text-danger">{{ formErrors.year }}</div>

            </div>
            <div class="mb-3">
                <label for="text" class="form-label">Description</label>
                <textarea class="form-control" id="text" v-model="description" required></textarea>
                <div class="text-danger">{{ formErrors.description }}</div>

            </div>

            <div class="mb-3">
                <label for="newDirectorFirstName" class="form-label">Genre</label>
                <input type="text" class="form-control" id="newDirectorFirstName" v-model="genre.keyword">
                <div class="text-danger">{{ formErrors.genre }}</div>

            </div>
            <div class="mb-3">
                <label for="newDirectorFirstName" class="form-label">Pages</label>
                <input type="text" class="form-control" id="newDirectorFirstName" v-model="pages">
                <div class="text-danger">{{ formErrors.pages }}</div>

            </div>

            <h5>Add a author</h5>
            <div class="mb-3">
                <label for="newAuthorFirstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="newAuthorFirstName" v-model="author.first_name">
                <div class="text-danger">{{ formErrors.authorFirst }}</div>

            </div>
            <div class="mb-3">
                <label for="newAuthorLastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="newAuthorLastName" v-model="author.last_name">
                <div class="text-danger">{{ formErrors.authorLast }}</div>

            </div>

            <div class="mb-3">
                <label for="newAuthorAge" class="form-label">Age</label>
                <input type="text" class="form-control" id="newAuthorAge" v-model="author.age">
                <div class="text-danger">{{ formErrors.authorAge }}</div>

            </div>

            <button type="submit" class="btn custom-submit-button">Edit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "EditBook",
    data(){
        return{
            book_id:this.$route.query.id,
            title: '',
            description: '',
            year: '',
            pages: '',
            genre: {
                keyword:''
            },
            author: {
                first_name: '',
                last_name: '',
                age: ''
            },
            formErrors:{}

        }
    },
    methods: {
        validateForm() {
            this.formErrors = {};

            if (!this.title) {
                this.formErrors.title = "Title is required";
            }

            if (!this.year || isNaN(this.year)) {
                this.formErrors.year = "Year is required and must be a number";
            }
            if (!this.pages || isNaN(this.pages)) {
                this.formErrors.pages = "Pages are required and must be a number";
            }

            if (!this.description) {
                this.formErrors.description = "Description is required";
            }
            if (!this.genre.keyword) {
                this.formErrors.genre = "Genre is required";
            }

            if (!this.author.first_name) {
                this.formErrors.authorFirst = "First Name is required";
            }

            if (!this.author.last_name) {
                this.formErrors.authorLast = "Last Name is required";
            }

            if (!this.author.age || isNaN(this.author.age)) {
                this.formErrors.authorAge = "Age is required and must be a number";
            }

            return Object.keys(this.formErrors).length === 0;
        },
        submitForm() {
            if (this.validateForm()) {
                const createData = {
                    title: this.title,
                    description: this.description,
                    year: parseInt(this.year),
                    pages: parseInt(this.pages),
                    genre: {
                        keyword: this.genre.keyword
                    },
                    author: {
                        first_name: this.author.first_name,
                        last_name: this.author.last_name,
                        age: parseInt(this.author.age)
                    }
                }
                this.$axios.put(`/books/${this.book_id}`, createData)
                    .then(response => {
                        console.log("movie updated", response.data)
                        this.$router.push({name: "Books"});

                    })
            }
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