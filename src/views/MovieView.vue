<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ movie.title }}  ({{movie.year}})</h5>
                <p class="card-text">Description: {{ movie.description }}</p>
                <p class="card-text">Director: {{ movie.director_name }}</p>
                <p class="card-text">Genre: {{ movie.genre_keyword }}</p>
                <h6 class="card-subtitle mb-3">Reviews:</h6>

                <div v-for="review in movie.reviews" :key="review.id" class="card mb-3">
                    <div class="card-body">
                        <p class="card-text">Review: {{ review.review }}</p>
                        <p class="card-text">Stars: {{ review.stars }}</p>
                    </div>
                </div>
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
            movie: {
                id:"",
                title: "",
                description:"",
                year: "",
                director_name: "",
                genre_keyword: "",
                director_id: "",
                genre_id: "",
                reviews: []
            },
            rev:{
                review:"",
                stars:"",
            }

        }
    },
    methods: {
        editMovie() {
            // Implement your edit logic here
            // For example, you can use router.push to navigate to the edit page
             this.$router.push({ name: 'EditMovie', query:{id: this.movie.id}});
        },
        deleteMovie() {
            this.$axios.delete(`/movies/${this.movie.id}`).then(() => {
                // Perform any required action after deletion
                // For example, navigate to a different page
                this.$router.push({ name: 'Movies' });
            }).catch((error) => {
                console.error('Error deleting movie:', error);
            });
        },
        confirmDelete() {
            const confirmation = confirm("Are you sure you want to delete this movie?");
            if (confirmation) {
                this.deleteMovie();
            }
        },
    },
    created(){
        this.$axios.get('/movies/find',{
            params: {
                title: this.title
            }
        }).then((response)=>{
            this.movie.id = response.data.id
            this.movie.title = response.data.title
            this.movie.description = response.data.description
            this.movie.year = response.data.year
            this.movie.director_name = response.data.director.name
            this.movie.genre_keyword = response.data.genre.keyword
            this.movie.director_id = response.data.director_id
            this.movie.genre_id = response.data.genre_id

            this.$axios.get('/reviews/find',{
                params:{
                    movie_id: this.movie.id
                }
            }).then((response)=>{
                console.log('respooo ' + response.data.review)
                console.log('id ' + this.movie.id)

                this.movie.reviews = response.data.map(reviewData=>{
                    return{
                        review: reviewData.review,
                        stars: reviewData.stars
                    }
                })
            })
        })


    }
}
</script>

<style scoped>

</style>
