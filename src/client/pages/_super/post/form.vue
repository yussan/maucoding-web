<template lang='pug'>
.super-posts-list.grid
  .col-8_md-10_sm-12
    header-tag(
      :title="title",
      subtitle="Just remember to Oopsreview vision and mission"
    )
    form(method="post", target="javascript:;", style="padding:1em 0")
      //- select language
      input-select(
        name="lang",
        label="Language",
        :data="formdata",
        :validation="formvalidate",
        :onchange="changeTextHandler",
        :options="[ { value: 'id', name: 'ID' }, { value: 'en', name: 'EN' }, ]"
      )

      //- input post title
      input-text(
        name="title",
        label="Title",
        description="Please fill with post title which attracts users to read.",
        type="text",
        :data="formdata",
        :validation="formvalidate",
        :onchange="changeTextHandler"
      )

      //- input post image
      input-file(
        name="image",
        label="Image",
        description="Image size width 800px",
        :preview="id && post.detail[id] && post.detail[id].status == 200 ? post.detail[id].image[600] : ''",
        :data="formdata",
        :validation="formvalidate",
        :onchange="changeFileHandler"
      )

      //- input video embed url
      input-text(
        name="video",
        label="Video Embed URL",
        description="Sample from Youtube: https://www.youtube.com/embed/_KOzKQfiYHE",
        type="text",
        :data="formdata",
        :validation="formvalidate",
        :onchange="changeTextHandler"
      )

      //- tinymce editor
      tinymce-editor(
        name="content",
        :data="formdata",
        :onchange="changeTextHandler"
      )
      br

      //- input post tags
      div(style="margin-bottom:50px")
        label(style="margin-bottom: 10px;display: block") Post Tags
        input-tags(name="tags", v-model="formdata.tags")

      //- buttons to submit
      div(style="padding:1em 0")
        oops-button(
          :loading="loading",
          :onclick="submitHandler",
          type="submit",
          :value="id ? 'Update and publish' : 'Publish this Post'",
          style="margin-right:10px"
        )

        //- only show if form not loading state
        oops-button(
          v-if="!loading",
          :onclick="() => submitHandler(true)",
          type="submit",
          button_type="white",
          value="Save to Draft"
        )
</template>

<script lang="ts">
import vue from "vue"
import tinyMceEditor from "../../../components/form/tinymce-editor.vue"
import header from "../../../components/cards/header-tag.vue"
import inputText from "../../../components/form/input-text.vue"
import inputFile from "../../../components/form/input-file.vue"
import select from "../../../components/form/select.vue"
import button from "../../../components/form/button.vue"
import toast from "../../../modules/toast"
import { injectCss } from "../../../modules/dom"
import { validation } from "../../../modules/form"
import * as TYPES from "../../../vuex/types"
import { mapState } from "vuex"
import { router } from "../../../index"
import inputTags from "vue-input-tag"

vue.component("header-tag", header)
vue.component("input-text", inputText)
vue.component("input-file", inputFile)
vue.component("oops-button", button)
vue.component("input-select", select)
vue.component("tinymce-editor", tinyMceEditor)
vue.component("input-tags", inputTags)

const rules = {
  title: "required",
  tags: "required",
  lang: "required",
}

export default vue.extend({
  name: "super-posts-form",

  metaInfo() {
    let metaInfo = {}

    if (this.id) {
      metaInfo = {
        title: "Update Post - Mau Coding Super",
        meta: [
          {
            vmid: "description",
            name: "description",
            content: "Update post on Mau Coding super page",
          },
        ],
      }
    } else {
      metaInfo = {
        title: "Create Post - Mau Coding Super",
        meta: [
          {
            vmid: "description",
            name: "description",
            content: "Create post on Mau Coding super page",
          },
        ],
      }
    }

    return metaInfo
  },

  data() {
    const { id, imageHandler }: any = this

    return {
      // editorOptions,
      loading: true,
      editorHtml: "",
      editorTab: "editor",
      title: id ? "Update Post" : "New Post",
      formdata: <any>{ lang: "en" },
      formvalidate: <any>{},
      validation: new validation(rules),
      windowReady: false,
    }
  },

  methods: {
    resetForm() {
      this.loading = false
      this.title = this.id ? "Update Post" : "New Post"
      this.formdata = {}
      this.formvalidate = {}
      this.validation = new validation(rules)
    },

    changeTextHandler(e: any) {
      const { name, value } = e.target

      let nextformdata: any = this.formdata
      nextformdata[name] = value
      const validate = this.validation.validate(this.formdata)

      this.formdata = Object.assign({}, nextformdata)
      this.formvalidate = validate
    },

    changeFileHandler(e: any) {
      const { name, files } = e.target

      let nextformdata: any = this.formdata
      nextformdata[name] = files[0]
      const validate = this.validation.validate(this.formdata)

      this.formdata = Object.assign({}, nextformdata)
      this.formvalidate = validate
    },

    submitHandler(draft = false) {
      this.formvalidate = this.validation.validate(this.formdata)

      if (this.formvalidate.is_valid) {
        console.log("publishing post...")
        let params: any = {
          title: this.formdata.title,
          content: this.formdata.content,
          tags: this.formdata.tags,
          lang: this.formdata.lang,
          draft,
        }
        if (this.id) params.id = this.id
        if (this.formdata.image) params.image = this.formdata.image
        if (this.formdata.video) params.video = this.formdata.video
        console.log("params to submit", params)
        this.$store.dispatch(TYPES.SUBMIT_POST, params)
      }
    },

    toggleEditorTab(tab) {
      this.editorTab = tab
    },
  },

  props: ["id"],

  // why mounted?, ref: https://alligator.io/vuejs/component-lifecycle/
  mounted() {
    console.log("window", window)

    if (typeof window !== "undefined") {
      this.windowReady = true
      // if (window.document) vue.component("input-tags", inputTags)

      // add event handle before unload to prevent data gone on closing tab
      window.onbeforeunload = function (e) {
        e = e || window.event

        // For IE and Firefox prior to version 4
        if (e) {
          e.returnValue = "Sure?"
        }

        // For Safari
        return "Sure?"
      }
    }

    // this.id defined, this page is edit post
    if (typeof this.id !== "undefined") {
      this.$store.dispatch(TYPES.GET_POST, this.id)
    } else {
      this.loading = false
    }
  },

  // unmount event
  beforeDestroy() {
    window.onbeforeunload = function () {}
    this.resetForm()
  },

  watch: {
    id() {
      // move from edit form to create form
      if (!this.id) this.resetForm()
    },
    ["post.detail"]() {
      console.log("get postdata from store...")
      const post = this.post.detail[this.id] || {}
      const response = this.post.detail.response || {}

      // button submit is read only if submit waiting response or response success
      if (response.loading || response.status) {
        this.loading = true
        if (typeof response.status !== "undefined") {
          if (response.status === 201) {
            // success to create / update post
            toast("Post submited", "success")
            window.onbeforeunload = function () {}
            setTimeout(() => {
              location.href = "/super/posts"
            }, 1500)
          } else {
            this.loading = false
            toast(response.message, "error")
          }
        }
      } else {
        if (post.status !== 200) {
          // give alert and redirect to post list
          toast("post not available", "error")
          router.push({ path: "/super/posts" })
        } else {
          // post available and set formdata
          this.formdata = {
            title: post.title,
            tags: post.tags,
            content: post.content,
            video: post.video,
            lang: post.lang || "en",
          }
          this.loading = false
        }
      }
    },
  },

  // map state to global variable
  computed: {
    ...mapState(["post"]),
  },
})
</script>

<style lang="sass">
@import '../../../../design/sass/color'
#post-form
  font-size: 1em
  color: $color-gray-medium
  margin-bottom: 1em

#html-form
  font-size: .75em
  padding: 10px
  color: $color-gray-verysoft
  background: $color-black-main
  margin-bottom: 1em
  min-height: 300px
  max-height: 500px !important
  border: 1px solid $color-gray-medium
  width: calc(100% - 1.5rem)

a.editor-tab
  transition: background .5s ease
  color: $color-white-main
  background: $color-gray-soft
  padding: 5px 10px
  border-radius: 10px
  display: inline-block
  margin-bottom: 10px
  margin-right: 10px
  &.active
    background: $color-blue-main
  &:hover
    background: $color-blue-dark

.vue-input-tag-wrapper
  padding: 0 .5em .5em !important
  margin-bottom: .3em !important
  border: 1px solid $color-gray-soft !important
  span.input-tag
    font-size: 1.5em !important
    border: 1px solid $color-gray-verysoft !important
    background-color: $color-gray-verysoft !important
    padding: .2em .5em !important
    color: $color-gray-dark !important
    margin: .4em .5rem 0 0 !important
    a.remove
      color: $color-gray-soft !important
  .new-tag
    font-size: 1.5rem !important
    padding: .2em .5em !important
    margin: .4em .5rem 0 0 !important
</style>
