<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ anime.title }}  ({{anime.year}})</h5>
                <p class="card-text">Description: {{ anime.description }}</p>
                <p class="card-text">Director: {{ anime.author_name }}</p>
                <p class="card-text">Genre: {{ anime.genre_keyword }}</p>
                <p class="card-text">Chapter: {{ anime.chapters }}</p>
                <p class="card-text">Studio: {{ anime.studio }}</p>
                <p class="card-text">Seasons: {{ anime.seasons }}</p>
                <p class="card-text">Episodes: {{ anime.episodes }}</p>

                <h6 class="card-subtitle mb-3">Reviews:</h6>
                <!--
                <div v-for="review in movie.reviews" :key="review.id" class="card mb-3">
                    <div class="card-body">
                        <p class="card-text">Review: {{ review.review }}</p>
                        <p class="card-text">Stars: {{ review.stars }}</p>
                    </div>
                </div>
                -->
                <button @click="editMovie" class="btn btn-primary">Edit</button> <!-- Add the Edit button -->
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
            anime: {
                id:"",
                title: "",
                description:"",
                year: "",
                seasons:"",
                episodes: "",
                chapters: "",
                studio:"",
                author_name: "",
                genre_keyword: "",
                director_id: "",
                genre_id: "",
            },
        }
    },
    methods: {
        editMovie() {
            // Implement your edit logic here
            // For example, you can use router.push to navigate to the edit page
            this.$router.push({ name: 'EditAnime', query:{id: this.anime.id}});
        },
        deleteAnime() {
            this.$axios.delete(`/anime/${this.anime.id}`).then(() => {
                // Perform any required action after deletion
                // For example, navigate to a different page
                this.$router.push({ name: 'Anime' });
            }).catch((error) => {
                console.error('Error deleting anime:', error);
            });
        },
        confirmDelete() {
            const confirmation = confirm("Are you sure you want to delete this anime?");
            if (confirmation) {
                this.deleteAnime();
            }
        },
    },
    created(){

        this.$axios.get('/anime/find',{
            params: {
                title: this.title
            }
        }).then((response)=>{
            this.anime.id = response.data.id
            this.anime.title = response.data.title
            this.anime.description = response.data.description
            this.anime.year = response.data.year
            this.anime.seasons = response.data.seasons
            this.anime.episodes = response.data.episodes
            this.anime.chapters = response.data.episodes
            this.anime.author_name = response.data.author.name
            this.anime.genre_keyword = response.data.genre.keyword
            this.anime.director_id = response.data.director_id
            this.anime.genre_id = response.data.genre_id
        })

    }
}
</script>

<style scoped>

</style>
