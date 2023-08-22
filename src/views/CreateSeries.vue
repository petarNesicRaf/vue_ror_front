<template>
    <div class="d-flex justify-content-center align-items-center" style="margin-top: 100px;">

        <form @submit.prevent="submitForm" class="p-4 bg-light rounded shadow-sm" > <!-- Adjust the max-width as needed -->
            <h2>Create Series</h2>
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
                <label for="newDirectorFirstName" class="form-label">Seasons</label>
                <input type="text" class="form-control" id="newDirectorFirstName" v-model="seasons">
                <div class="text-danger">{{ formErrors.seasons }}</div>

            </div>

            <div class="mb-3">
                <label for="newDirectorFirstName" class="form-label">Episodes</label>
                <input type="text" class="form-control" id="newDirectorFirstName" v-model="episodes">
                <div class="text-danger">{{ formErrors.episodes }}</div>

            </div>
            <div class="mb-3">
                <label for="newDirectorFirstName" class="form-label">Genre</label>
                <input type="text" class="form-control" id="newDirectorFirstName" v-model="genre.keyword">
                <div class="text-danger">{{ formErrors.genre }}</div>

            </div>
            <!--
            <div class="mb-3">
                <label for="genre" class="form-label">Genre</label>
                <select class="form-select" id="genre" v-model="genre.keyword" required>
                    <option value="" disabled>Select a genre</option>
                    <option v-for="i in genres" :key="i" :value="i">{{ i.keyword }}</option>
                </select>
            </div>
            -->
            <h5>Add a director</h5>
            <div class="mb-3">
                <label for="newDirectorFirstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="newDirectorFirstName" v-model="director.first_name">
                <div class="text-danger">{{ formErrors.directorFirst }}</div>

            </div>
            <div class="mb-3">
                <label for="newDirectorLastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="newDirectorLastName" v-model="director.last_name">
                <div class="text-danger">{{ formErrors.directorLast }}</div>

            </div>
            <div class="mb-3">
                <label for="newDirectorNationality" class="form-label">Nationality</label>
                <input type="text" class="form-control" id="newDirectorNationality" v-model="director.nationality">
                <div class="text-danger">{{ formErrors.directorNationality }}</div>

            </div>
            <div class="mb-3">
                <label for="newDirectorAge" class="form-label">Age</label>
                <input type="text" class="form-control" id="newDirectorAge" v-model="director.age">
                <div class="text-danger">{{ formErrors.directorAge }}</div>

            </div>

            <button type="submit" class="btn custom-submit-button">Create</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "CreateSeries",
    data(){
        return{
            title: '',
            description: '',
            year: '',
            episodes:'',
            seasons: '',
            genre: {
                keyword:''
            },
            director: {
                first_name: '',
                last_name: '',
                nationality: '',
                age: ''
            },
            genres: [],
            directors:[],
            formErrors: {}
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

            if (!this.seasons || isNaN(this.seasons)) {
                this.formErrors.seasons = "Seasons are required and must be a number";
            }

            if (!this.episodes || isNaN(this.episodes)) {
                this.formErrors.episodes = "Episodes are required and must be a number";
            }

            if (!this.description) {
                this.formErrors.description = "Description is required";
            }

            if (!this.genre.keyword) {
                this.formErrors.genre = "Genre is required";
            }

            if (!this.director.first_name) {
                this.formErrors.directorFirst = "First Name is required";
            }

            if (!this.director.last_name) {
                this.formErrors.directorLast = "Last Name is required";
            }

            if (!this.director.nationality) {
                this.formErrors.directorNationality = "Nationality is required";
            }

            if (!this.director.age || isNaN(this.director.age)) {
                this.formErrors.directorAge = "Age is required and must be a number";
            }

            return Object.keys(this.formErrors).length === 0;
        },
        submitForm() {
            if (this.validateForm()) {
                const createData = {
                    title: this.title,
                    description: this.description,
                    year: parseInt(this.year),
                    episodes: parseInt(this.episodes),
                    seasons: parseInt(this.seasons),
                    genre: {
                        keyword: this.genre.keyword
                    },
                    director: {
                        first_name: this.director.first_name,
                        last_name: this.director.last_name,
                        nationality: this.director.nationality,
                        age: parseInt(this.director.age)
                    }
                }
                this.$axios.post(`/series`, createData)
                    .then(response => {
                        console.log("movie updated", response.data)
                        this.$router.push({name: "Series"});

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