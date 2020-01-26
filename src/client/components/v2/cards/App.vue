<template lang="pug">
  .app-card 
    .grid
      .col-2.sm-hidden.app-card__left
        img(src="/images/apps-logo.jpg")  
      .col-10_sm-12.app-card__right
        router-link(:to="'/app/app-name-sfsd7673hj3'")
          h3 Apps Name
          ul.app-card__meta 
            li 
              i.icono.icono-eye 
              | 247 visits
            li 
              i.icono.icono-document 
              | 3456k posts
            li 
              i.icono.icono-bookmark
              | apps name, apps other, lala
            li
              i.icono-chain
              | https://weblink.com
          p.app-card__description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam est mauris, euismod id bibendum sit amet, molestie vitae arcu. Donec non tortor ex. Integer maximus ligula sapien, sed cursus leo semper a.

</template>

<style lang="sass">
  @import '../../../../design/sass/color'

  .app-card  
    padding: 20px 0
    .app-card__left 
      img
        max-width: 100% 
    .app-card__right
      font-size: .8em;
      line-height: 1.8;
      padding-left: 30px 
      h3
        font-size: 1.5em
        color: $color-gray-dark
        margin-top: 0
        margin-bottom: 0

    ul.app-card__meta
      padding: 0 
      list-style: none
      li
        margin-bottom: 5px 
        [class*=icono-]
          margin-right: 20px
          zoom: .6
          color: $color-gray-medium

    .app-card__description 
      // &:last-of-type
      //   border-bottom: none
      border-bottom: 1px solid $color-gray-verysoft
      padding-bottom: 30px

  // responsiveness
  // same as col-sm
  @media screen and (max-width: 768px)
    .app-card
      .app-card__right
        padding-left: 0

</style>