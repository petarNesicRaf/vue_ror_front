<template>
    <div class="container mt-5">

        <h1 class="mb-4">Series</h1>
        <div class="mb-3" >
            <label for="genreSelect" class="form-label" >Select a genre:</label>
            <select class="form-select" id="genreSelect" v-model="selectedGenre" >
                <option value="">All</option>
                <option v-for="genre in genresList" :key="genre"  :value="genre">{{ genre.keyword }}</option>
            </select>
        </div>


        <div v-for="seriesItem in filteredMoviesList" :key="seriesItem.id">
            <div class="card mb-3">
                <div class="card-body">
                    <h5 @click = "showSingleMovie(seriesItem.title)" class="card-title">{{seriesItem.title}}  ({{seriesItem.year}})</h5>
                    <p class="card-text">{{ seriesItem.description}}</p>
                    <p class="card-text mt-2">Genre: {{ seriesItem.genre.keyword }}</p>
                    <p class="card-text mt-2">Director: {{seriesItem.director.name}} </p>
                    <p class="card-text mt-2">Seasons: {{seriesItem.seasons}} </p>
                    <p class="card-text mt-2">Episodes: {{seriesItem.episodes}} </p>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            seriesList: [],
            genresList:[],
            selectedGenre:''
        }
    },
    created(){
        this.$axios.get('/series').then((response)=>{
            this.seriesList = response.data
        })
        this.fetchGenres();

    },

    computed: {
        filteredMoviesList() {
            if (this.selectedGenre === '') {
                return this.seriesList;
            } else {
                return this.seriesList.filter(series => {
                    return series.genre.keyword === this.selectedGenre.keyword
                });
            }
        },
    },
    methods:{
        showSingleMovie(title)
        {
            this.$router.push({name: 'SeriesView', query: {
                    title
                }})
        },
        fetchGenres() {
            this.$axios.get('/series/genres').then((response)=>{
                this.genresList = response.data
            })
        }
    }

}
</script>