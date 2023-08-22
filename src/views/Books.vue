<template>
    <div class="container mt-5">
        <div class="mb-3" >
            <label for="genreSelect" class="form-label" >Select a genre:</label>
            <select class="form-select" id="genreSelect" v-model="selectedGenre" >
                <option value="">All</option>
                <option v-for="genre in genresList" :key="genre"  :value="genre">{{ genre.keyword }}</option>
            </select>
        </div>

        <h1 class="mb-4">Books</h1>
        <div v-for="bookItem in bookList" :key="bookItem.id">
            <div class="card mb-3">
                <div class="card-body">
                    <h5 @click = "showSingleMovie(bookItem.title)" class="card-title">{{bookItem.title}}  ({{bookItem.year}})</h5>
                    <p class="card-text">{{ bookItem.description}}</p>
                    <p class="card-text mt-2">Genre: {{ bookItem.genre.keyword }}</p>
                    <p class="card-text mt-2">Pages: {{bookItem.pages}} </p>
                    <p class="card-text mt-2">Author: {{bookItem.author.name}} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            bookList: [],
            genresList:[],
            selectedGenre:''
        }
    },
    created(){
        this.$axios.get('/books').then((response)=>{
            this.bookList = response.data
        })

        this.fetchGenres();

    },
    computed: {
        filteredAnimeList() {
            if (this.selectedGenre === '') {
                return this.bookList;
            } else {
                return this.bookList.filter(book => {
                    return book.genre.keyword === this.selectedGenre.keyword
                });
            }
        },
    },
    methods:{
        showSingleMovie(title)
        {
            this.$router.push({name: 'BookView', query: {
                    title
                }})
        },
        fetchGenres() {
            this.$axios.get('/books/genres').then((response)=>{
                this.genresList = response.data
            })
        }
    }
}
</script>