<template lang="pug">
  .form-input(:class="validation.result && validation.result[name] != undefined && !validation.result[name].is_valid ? 'error' : ''")
    label(:for='name') {{ label }}
    input(
      :type='type' 
      :id='name' 
      :name='name'
      :value='data[name] || ""'
      :placeholder='placeholder'
      @change='onchange'
      @keydown='onkeydown'
      ) 
    .form-input-description(v-if="description !== ''") {{ description  }}

    //- show message if input not valid
    .message(v-if='validation.result && validation.result[name] != undefined && !validation.result[name].is_valid') 
      small {{ validation.result[name].message }}
</template>

<script lang="ts">
import vue from "vue"

const props = {
  // name of input
  name: {
    type: String
  },
  // saved form description
  description: {
    type: String,
    default: ""
  },
  label: {
    type: String
  },
  type: {
    type: String,
    default: "text"
  },
  placeholder: {
    type: String,
    default: ""
  },
  // value of input
  value: {
    type: String
  },
  // maximal value of input
  maxVal: {
    type: Number
  },
  // minimal value of input
  minVal: {
    type: Number
  },
  // validation object result
  validation: {
    type: Object,
    default() {
      return {}
    }
  },
  // data of form
  data: {
    type: Object,
    default() {
      return {}
    }
  },
  // handle change value
  onchange: {
    type: Function,
    default() {}
  },
  // handle keydown
  onkeydown: {
    type: Function,
    default() {}
  }
}

export default vue.extend({
  name: "input-text",
  props
})
</script>


<style lang="sass" scoped>
@import '../../../design/sass/form'
@import '../../../design/sass/color'

.form-input
  input
    padding: .5em
    font-size: 1.5em
    width: -webkit-fill-available
    margin-bottom: .3em
    border: 1px solid $color-gray-soft
</style>
