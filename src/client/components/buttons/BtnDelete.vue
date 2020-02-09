<template lang="pug">
  a(href="javascript:;" v-on:click="() => handleClick()") {{ text }}
</template>

<script lang="ts">
import vue from "vue"
import swal from "sweetalert"

export default vue.extend({
  name: "btn_delete",
  props: ["action", "text", "className"],
  methods: {
    handleClick() {
      swal("Are you sure you want to do this?", {
        buttons: ["Cancel!", true]
      }).then(agree => {
        if (agree) return this.action()
      })
    }
  }
})
</script>
