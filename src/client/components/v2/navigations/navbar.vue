<template lang="pug">
  nav.main-nav#main-nav 
    .container
      .grid-middle
        .col-1_md-1_sm-3.main-nav_logo
          router-link(to="/" title="Back to home" style="height:45px")
            img(src="/v2/images/logo-square.png" alt="square logo of yussan academy")
        .col-5_md-5_sm-hidden
          .main-nav_menu.main-nav_menu_left
            ul.main-nav-menu_link
              li(:class="$route.path.includes(menu.matchPath) ? 'active' : ''" v-for="menu, key in menus" :key="key") 
                router-link(v-if="menu.target != 'blank'" :to="menu.link") {{ menu.name }}
                a(v-if="menu.target == 'blank'" :href="menu.link" target="_blank") {{ menu.name }}
        .col-6_md-6_sm-9
          .main-nav_menu.main-nav_menu_right
            .nav_menu_right_search 
              a(href="javascript:;" @click="toggleSearch()" title="Click to search")
                i.icono-search
              input(v-model="keywordSearch" v-on:keyup="onKeyUp" :class="hideSearch ? 'hide' : 'show'" type="search" placeholder="search..." autofocus="true")

</template>

<style lang="sass" scoped>
  @import '../../../../design/sass/color'

  .main-nav
    background-color: $color-black-main
    color: $color-gray-verysoft
    padding: 0 5px
    .main-nav_logo
      img  
        width: 45px
        height: 45px
      justify-content: center
    .main-nav_logo, .main-nav_menu
      display: flex
      align-items: center
    .main-nav_menu
      .main-nav-menu_link
        list-style-type: none
        margin: 0
        padding: 0
        li 
          display: inline-block
          padding: 20px
          a  
            text-transform: capitalize
            &:hover
              color: $color-gray-verysoft
            color: $color-white-main
          &.active 
            background-color: $color-white-main
            a  
              color: $color-black-main

    .main-nav_menu_right
        float: right
        .nav_menu_right_search
          padding: 15px 10px
          .icono-search 
            color: $color-white-main
            zoom: 0.8
          input[type="search"]
            padding: 5px 0
            background: none
            outline: none
            border: none
            border-bottom: 1px solid #000
            margin-left: 5px
            font-size: 15px
            transition: width .2s ease
            width: 0 
            &.show  
              width: calc(100% - 40px)
</style>

<script>
import { router } from "../../../index"

const menus = [
  {
    name: "posts",
    matchPath: "/post",
    link: "/posts"
  }
  // {
  //   name: "videos",
  //   target: "blank",
  //   link: "https://www.youtube.com/channel/UCw-_8IVEy5x-y6zRyztZddw"
  // }
]

export default {
  data() {
    return {
      hideSearch: true,
      keywordSearch: "",
      menus
    }
  },
  methods: {
    // handle show / hide input search
    toggleSearch() {
      this.hideSearch = !this.hideSearch
    },
    onKeyUp(e) {
      if (e.keyCode == 13 && this.keywordSearch != "") {
        router.push({ path: `/search?q=${this.keywordSearch}` })

        // reset search input on navbar
        this.hideSearch = true
        this.keywordSearch = ""
      }
    }
  }
  // watch: {
  //   $route: function(newData) {
  //     console.log("new data", newData)
  //   }
  // }
}
</script>
