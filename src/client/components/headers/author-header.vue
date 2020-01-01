<template lang="pug">
 .author-header 
   img(:src="userdata.avatar" :alt="`avatar of ${userdata.username}`")
   h1 {{ userdata.fullname }}
   span Writter
</template>
<style>
</style>
<script>

const props = {
 userdata: {
  type: Object
 }
}

 exports default {
  props
 }
</script>