<template lang="pug">
  .form-input(:class="validation.result && validation.result[name] != undefined && !validation.result[name].is_valid ? 'error' : ''")
    select
      option option 1
      option option 2

    .message(v-if='validation.result && validation.result[name] != undefined && !validation.result[name].is_valid') 
      small {{ validation.result[name].message }}
</template>
<script>
const props = {
  name: {
    type: "string"
  },
  options: {
    type: Array,
    default() {
      return []
    }
  },
  label: {
    type: "string"
  },
  data: {
    type: Object,
    default() {
      return {}
    } 
  },
  validation: {
    type: Object,
    default() {
      return {}
    }
  },
  onchange: {
    type: Function,
    default() {
      console.log("changed")
    }
  }
}

export default {
  name: "form-select",
  props
}
</script>

<style lang="sass" scoped>
@import '../../../design/sass/form'
@import '../../../design/sass/color'

.form-input
  select
    background-color: $color-white-main
    padding: .5em
    font-size: 1.5em
    width: -webkit-fill-available
    margin-bottom: .3em
    border: 1px solid $color-gray-soft
</style>

