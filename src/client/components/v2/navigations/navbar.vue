<template lang="pug">
nav#main-nav.main-nav 
  .container
    .grid-middle
      .col-1
        .main-nav_logo(style="")
          router-link(to="/", title="Back to home", style="height:45px")
            img(
              src="/images/icons-2/icon-2-96x96.png",
              alt="square logo of Mau Coding"
            )
      .col-5_md-5_sm-hidden
        .main-nav_menu.main-nav_menu_left
          ul.main-nav-menu_link
            li(
              :class="menu.matchPath.includes(activePath) ? 'active' : ''",
              v-for="(menu, key) in menus",
              :key="key"
            ) 
              router-link(v-if="menu.target != 'blank'", :to="menu.link") {{ menu.name }}
              a(
                v-if="menu.target == 'blank'",
                :href="menu.link",
                target="_blank"
              ) {{ menu.name }}
      .col-6_md-6_sm-11
        .main-nav_menu.main-nav_menu_right
          .nav_menu_right_search 
            a(
              href="javascript:;",
              @click="toggleSearch()",
              title="Click to search"
            )
              i.icono-search
            input(
              v-model="keywordSearch",
              v-on:keyup="onKeyUp",
              :class="hideSearch ? 'hide' : 'show'",
              type="search",
              placeholder="search...",
              autofocus="true"
            )
</template>

<style lang="sass" scoped>
@import '../../../../design/sass/color'

.main-nav
  background-color: $color-white-main
  color: $color-gray-medium
  border-bottom: 1px solid $color-gray-verysoft
  .main-nav_logo
    a
      margin: 0 auto
      img
        width: 45px
        height: 45px
        justify-content: center
        border-radius: 5px
        margin-left: 20px
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
        &:hover, &.active
          background-color: $color-gray-verysoft
        a
          text-transform: capitalize
  .main-nav_menu_right
    float: right
    .nav_menu_right_search
      padding: 15px 10px
      .icono-search
        color: $color-gray-medium
        zoom: 0.8
      input[type="search"]
        color: $color-gray-medium
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
    matchPath: ["post", "posts", "tag", "a", "author", "search"],
    link: "/posts",
  },
  {
    name: "Youtube Videos",
    target: "blank",
    matchPath: [],
    link: "https://www.youtube.com/channel/UCKLQUv8n3OadK5mkYpmZiyA",
  },
]

export default {
  data() {
    return {
      hideSearch: true,
      keywordSearch: "",
      activePath: this.$route.path.split("/")[2],
      menus,
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
    },
  },

  watch: {
    $route: function (to) {
      const { path } = to
      this.activePath = path.split("/")[2]
    },
  },
}
</script>
