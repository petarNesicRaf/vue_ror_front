<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ book.title }}  ({{book.year}})</h5>
                <p class="card-text">Description: {{ book.description }}</p>
                <p class="card-text">Director: {{ book.author_name }}</p>
                <p class="card-text">Genre: {{ book.genre_keyword }}</p>
                <p class="card-text">Pages: {{ book.pages }}</p>

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
            book: {
                id:"",
                title: "",
                description:"",
                year: "",
                pages: "",
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
            this.$router.push({ name: 'EditBook', query:{id: this.book.id}});
        },
        deleteBook() {
            this.$axios.delete(`/books/${this.book.id}`).then(() => {
                // Perform any required action after deletion
                // For example, navigate to a different page
                this.$router.push({ name: 'Books' });
            }).catch((error) => {
                console.error('Error deleting books:', error);
            });
        },
        confirmDelete() {
            const confirmation = confirm("Are you sure you want to delete this book?");
            if (confirmation) {
                this.deleteBook();
            }
        },
    },
    created(){

        this.$axios.get('/books/find',{
            params: {
                title: this.title
            }
        }).then((response)=>{
            this.book.id = response.data.id
            this.book.title = response.data.title
            this.book.description = response.data.description
            this.book.year = response.data.year
            this.book.pages = parseInt(response.data.pages)
            this.book.author_name = response.data.author.name
            this.book.genre_keyword = response.data.genre.keyword
            this.book.director_id = response.data.director_id
            this.book.genre_id = response.data.genre_id
        })

    }
}
</script>

<style scoped>

</style>
