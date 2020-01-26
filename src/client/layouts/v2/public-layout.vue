<template lang="pug">
  div 
    .m-t-50
    .grid
      .col-8_md-8_sm-12 
        //- main content component
        slot(name="main-content")
        //- end of main content component
        
      .col-4_md-4_sm-12 
        sidebar-right  
</template>

<script>
import Vue from "vue"
import SidebarRight from "../../components/v2/navigations/sidebar-right"

Vue.component("sidebar-right", SidebarRight)

export default {}
</script>