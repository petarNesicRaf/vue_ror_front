<template>
    <div class="container mt-5">
        <h1 class="mb-4">Anime</h1>
        <div class="mb-3" >
            <label for="genreSelect" class="form-label" >Select a genre:</label>
            <select class="form-select" id="genreSelect" v-model="selectedGenre" >
                <option value="">All</option>
                <option v-for="genre in genresList" :key="genre"  :value="genre">{{ genre.keyword }}</option>
            </select>
        </div>

        <div v-for="animeItem in filteredAnimeList" :key="animeItem.id">
            <div class="card mb-3">
                <div class="card-body">
                    <h5 @click = "showSingleMovie(animeItem.title)" class="card-title">{{animeItem.title}}  ({{animeItem.year}})</h5>
                    <p class="card-text">{{ animeItem.description}}</p>
                    <p class="card-text mt-2">Genre: {{ animeItem.genre.keyword }}</p>
                    <p class="card-text mt-2">Chapters: {{animeItem.chapters}} </p>
                    <p class="card-text mt-2">Episodes: {{animeItem.episodes}} </p>
                    <p class="card-text mt-2">Seasons: {{animeItem.seasons}} </p>
                    <p class="card-text mt-2">Studio: {{animeItem.studio}} </p>
                    <p class="card-text mt-2">Author: {{animeItem.author.name}} </p>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            animeList: [],
            genresList:[],
            selectedGenre:''
        }
    },
    computed: {
        filteredAnimeList() {
            if (this.selectedGenre === '') {
                return this.animeList;
            } else {
                return this.animeList.filter(anime => {
                    return anime.genre.keyword === this.selectedGenre.keyword
                });
            }
        },
    },
    created(){
        this.$axios.get('/anime').then((response)=>{
            this.animeList = response.data
        })
        this.fetchGenres();

    },
    methods:{
        showSingleMovie(title)
        {
            this.$router.push({name: 'AnimeView', query: {
                    title
                }})
        },
        fetchGenres() {
            this.$axios.get('/anime/genres').then((response)=>{
                this.genresList = response.data
            })
        }
    }
}
</script>