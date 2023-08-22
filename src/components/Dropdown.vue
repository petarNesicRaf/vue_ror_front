<template>
  <div class="menu-item" @click="isOpen=!isOpen">
      <a href="#">
          {{title}}
      </a>
      <transition name="fade" appear>
      <div class="sub-menu" v-if="isOpen">
          <div class="menu-item" >
              <router-link :to="{name: 'CreateMovie'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'CreateMovie'}">Create movie</router-link>

          </div>

          <div class="menu-item" >
          <router-link :to="{name: 'CreateSeries'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'CreateSeries'}">Create series</router-link>
          </div>

          <div class="menu-item" >
              <router-link :to="{name: 'CreateAnime'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'CreateAnime'}">Create anime</router-link>
          </div>

          <div class="menu-item" >
              <router-link :to="{name: 'CreateBook'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'CreateBook'}">Create book</router-link>
          </div>

      </div>
      </transition>
  </div>
</template>

<script>
export default {
    name: "Dropdown",
    props: ['title', 'items'],
    data(){
        return{
            isOpen:false
        }
    }
}
</script>

<style>

nav .menu-item .sub-menu {
    position: absolute;
    background-color: #222;
    top: calc(100% + 18px);
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    border-radius: 0px 0px 5px 5px;
}

.fade-enter-active,
.fade-leave-active {
    transition: all .5s ease-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
nav .menu-item a {
    color: #FFF; /* Set the desired link color */
    text-decoration: none;
}
</style>