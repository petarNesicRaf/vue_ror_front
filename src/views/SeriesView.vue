<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ series.title }}  ({{series.year}})</h5>
                <p class="card-text">Description: {{ series.description }}</p>
                <p class="card-text">Director: {{ series.director_name }}</p>
                <p class="card-text">Genre: {{ series.genre_keyword }}</p>
                <p class="card-text">Seasons: {{ series.seasons }}</p>
                <p class="card-text">Episodes: {{ series.episodes }}</p>

                <h6 class="card-subtitle mb-3">Reviews:</h6>
                <!--
                <div v-for="review in movie.reviews" :key="review.id" class="card mb-3">
                    <div class="card-body">
                        <p class="card-text">Review: {{ review.review }}</p>
                        <p class="card-text">Stars: {{ review.stars }}</p>
                    </div>
                </div>
                -->
                <button @click="editSeries" class="btn btn-primary">Edit</button> <!-- Add the Edit button -->
                <button @click="confirmDelete" class="btn btn-danger">Delete</button> <!-- Add the Delete button -->



            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            title: this.$route.query.title,
            series: {
                id:"",
                title: "",
                description:"",
                year: "",
                seasons:"",
                episodes: "",
                director_name: "",
                genre_keyword: "",
                director_id: "",
                genre_id: "",
            },
        }
    },
    methods: {
        editSeries() {
            // Implement your edit logic here
            // For example, you can use router.push to navigate to the edit page
            this.$router.push({ name: 'EditSeries', query:{id: this.series.id}});
        },
        deleteSeries() {
            this.$axios.delete(`/series/${this.movie.id}`).then(() => {
                // Perform any required action after deletion
                // For example, navigate to a different page
                this.$router.push({ name: 'Series' });
            }).catch((error) => {
                console.error('Error deleting series:', error);
            });
        },
        confirmDelete() {
            const confirmation = confirm("Are you sure you want to delete this series?");
            if (confirmation) {
                this.deleteSeries();
            }
        },
    },
    created(){

        this.$axios.get('/series/find',{
            params: {
                title: this.title
            }
        }).then((response)=>{
            this.series.id = response.data.id
            this.series.title = response.data.title
            this.series.description = response.data.description
            this.series.year = response.data.year
            this.series.seasons = response.data.seasons
            this.series.episodes = response.data.episodes
            this.series.director_name = response.data.director.name
            this.series.genre_keyword = response.data.genre.keyword
            this.series.director_id = response.data.director_id
            this.series.genre_id = response.data.genre_id

            })

    }
}
</script>

<style scoped>

</style>
