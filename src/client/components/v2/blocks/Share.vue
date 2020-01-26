<template lang="pug">
  .share-social-media#share
    strong Share to : 
    a.share-social-media-link(href="javascript:;" @click="shareToFacebook")
      img(src="https://img.icons8.com/color/48/000000/facebook.png" alt="share to Facebook")
    a.share-social-media-link(href="javascript:;" @click="shareToTwitter")
      img(src="https://img.icons8.com/color/48/000000/twitter.png" alt="share to Twitter")
    a.share-social-media-link(href="javascript:;" @click="shareToLinkedin")
      img(src="https://img.icons8.com/color/48/000000/linkedin.png" alt="share to Linkedin")
</template>

<style lang="sass" scoped>
.share-social-media 
  display: flex 
  align-items: center
  a.share-social-media-link 
    margin-right: 10px
</style>

<script>
const props = {
  url: {
    type: String,
    required: true
  }
}

export default {
  props,

  methods: {
    shareToFacebook() {
      return window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${this.url}`,
        "Share Mau Gowes ke Facebook",
        "width=600,height=400"
      )
    },

    shareToTwitter() {
      return window.open(
        `https://twitter.com/intent/tweet?status=${this.url}`,
        "Share Mau Gowes ke Twitter",
        "width=600,height=400"
      )
    },

    shareToLinkedin() {
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${this.url}`,
        "Share Mau Gowes ke Linkedin",
        "width=600,height=400"
      )
    }
  }
}
</script>