<template>
    <div class="container mt-5">
        <h1 class="mb-4">Movies</h1>

        <div class="mb-3" >
            <label for="genreSelect" class="form-label" >Select a genre:</label>
            <select class="form-select" id="genreSelect" v-model="selectedGenre" >
                <option value="">All</option>
                <option v-for="genre in genresList" :key="genre"  :value="genre">{{ genre.keyword }}</option>
            </select>
        </div>

        <div v-for="movieItem in filteredMoviesList" :key="movieItem.id">
            <div class="card mb-3">
                <div class="card-body">
                    <h5 @click = "showSingleMovie(movieItem.title)" class="card-title">{{movieItem.title}}  ({{movieItem.year}})</h5>
                    <p class="card-text">{{ movieItem.description}}</p>
                    <p class="card-text mt-2">Genre: {{ movieItem.genre.keyword }}</p>
                    <p class="card-text mt-2">Director: {{movieItem.director.name}} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default{
      data(){
          return {
              moviesList: [],
              genresList:[],
              selectedGenre:''
          }
      },
      computed: {
          filteredMoviesList() {
              if (this.selectedGenre === '') {
                  return this.moviesList;
              } else {
                  return this.moviesList.filter(movie => {
                      console.log("dkakd " + movie.genre.keyword + "   "+ JSON.stringify(this.selectedGenre.keyword))
                      return movie.genre.keyword === this.selectedGenre.keyword
                  });
              }
          },
      },
      created(){
          this.$axios.get('/movies').then((response)=>{
              this.moviesList = response.data
          })
          //returns unique genres
          this.fetchGenres();

      },
      methods:{
          showSingleMovie(title)
          {
              this.$router.push({name: 'MovieView', query: {
                  title
                  }})
          },

          fetchGenres() {
              this.$axios.get('/movies/genres').then((response)=>{
                  this.genresList = response.data
              })
          }
      }
}

</script>

<style scoped>
.movie-image {
    max-width: 200px;
    max-height: 300px;
    margin-bottom: 10px;
}
</style>