<template>
    <div>
        <h2>
            {{ movie.title }} {{movie.year}}
        </h2>
        <h5>Description:</h5>
        <p>
            {{ movie.description }} <br><br>
            {{movie.director}} <br><br>
            {{movie.genre}} <br><br>
        </p>

    </div>
</template>
<script>
export default {
    name: "Movie",
    props: {
        news: {
            type: Object,
            required: true,
        }
    },
}
</script>