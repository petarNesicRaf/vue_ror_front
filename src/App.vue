<template>
  <div id = "app">
      <header>
        <Nav/>
      </header>
    <router-view/>
  </div>

</template>

<script>
import Nav from "./components/Nav";
export default {
    components: {Nav},
}
</script>

<style>
*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
}
body{
    font-family:'montserrat', sans-serif;

}
header{
    width: 100vw;
    background-color: #222;
    padding: 15px;
}
</style>