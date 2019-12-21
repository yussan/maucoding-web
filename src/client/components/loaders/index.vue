<template lang="pug">
  .preloader-container
    .dot
    .dot
    .dot
    .dot
    .dot

</template>

<script>
export default {}
</script>

<style lang="sass">
.preloader-container 
  display: flex
  align-items: center
  justify-content: center
  padding: 10px 0
  height: 150px
  width: 100%
.dot
  display: inline-block
  background: #666
  height: 8px
  width: 8px
  opacity: 0.3
  border-radius: 50%
  animation: moveit 1.8s infinite
  padding: 5px
  margin: 1px

  &:nth-child(2)
    animation-delay: .15s

  &:nth-child(3)
    animation-delay: .3s

  &:nth-child(4)
    animation-delay: .45s

  &:nth-child(5)
    animation-delay: .6s

@keyframes moveit
  0%
    transform: translateY(0px)

  35%
    transform: translateY(0px)
    opacity: 0.3

  50%
    transform: translateY(-20px)
    opacity: 0.8

  70%
    transform: translateY(3px)
    opacity: 0.8

  85%
    transform: translateY(-3px)

/* Preloader #2

.preloader-squares
  .square
    display: inline-block
    width: 15px
    height: 15px
    background: #666
    opacity: 0.2
    animation: movein 2s infinite

  width: 50px
  line-height: 19px
  height: 50px

.square
  opacity: 0.5

.preloader-squares .square
  &:nth-child(1)
    transform: translate(0, -25px)

  &:nth-child(2)
    transform: translate(25px, 0)

  &:nth-child(3)
    transform: translate(-25px, 0)

  &:nth-child(4)
    transform: translate(0, 25px)

@keyframes movein
  33%
    transform: translate(0, 0)
    opacity: 0.7

  66%
    transform: translate(0, 0)
    opacity: 0.7

/*Preloader #3

.pulse-center
  background: #666
  width: 15px
  height: 15px
  border-radius: 50%
  animation: pulse 1.5s infinite
  position: absolute
  opacity: 0.8
  z-index: 5

.pulse-explosion
  content: ''
  width: 15px
  height: 15px
  background: #ccc
  border-radius: 50%
  position: absolute
  animation: pulse-radius 1.5s infinite
  z-index: 1

@keyframes pulse
  30%
    transform: scale(0.7)
    opacity: 0.8

  50%
    transform: scale(1.1)
    opacity: 1.0

  70%
    transform: scale(0.8)
    opacity: 0.8

@keyframes pulse-radius
  30%
    transform: scale(0.7)
    opacity: 1

  40%
    transform: scale(7.8)
    opacity: 0.1

  80%
    transform: scale(4.8)
    opacity: 0

  100%
    transform: scale(1)
    opacity: 0

/*Preloader #4

.preloader-chasing-squares
  width: 50px
  height: 50px
  line-height: 19px

  .square
    display: inline-block
    width: 15px
    height: 15px
    opacity: 1
    background: #666
    animation: focusfade 2.8s infinite

    &:nth-child(1)

    &:nth-child(2)
      animation-delay: .7s

    &:nth-child(3)
      animation-delay: 2.1s

    &:nth-child(4)
      animation-delay: 1.4s

@keyframes focusfade
  0%
    opacity: 0.5
    background: #000

  30%
    opacity: 0.5
    background: #666

  60%
    opacity: 0

  75%
    opacity: 0

  100%
    opacity: 0.5
    background: #000

/* preloader 5

.preloader-dotline .dot
  display: inline-block
  background: #666
  height: 5px
  width: 5px
  opacity: 0
  border-radius: 50%
  animation: dotline-move 4s infinite
  transform: translateX(-300px)

  &:nth-child(1)
    animation-delay: .8s

  &:nth-child(2)
    animation-delay: .7s

  &:nth-child(3)
    animation-delay: .6s

  &:nth-child(4)
    animation-delay: .5s

  &:nth-child(5)
    animation-delay: .4s

  &:nth-child(6)
    animation-delay: .3s

  &:nth-child(7)
    animation-delay: .2s

  &:nth-child(8)
    animation-delay: .1s

@keyframes dotline-move
  40%
    transform: translateX(0px)
    opacity: 0.8

  100%
    transform: translateX(300px)
    opacity: 0

/* preloader pacman

.preloader-pacman
  .dot
    display: inline-block
    background: #666
    height: 5px
    width: 5px
    margin-right: 20px
    opacity: 0.7
    border-radius: 50%
    animation: fade-out 14s linear infinite

  .pacman
    display: inline-block
    background: #666
    height: 20px
    vertical-align: bottom
    width: 20px
    margin-right: 20px
    opacity: 1
    border-radius: 50%
    position: relative
    animation: move-forward 14s linear infinite
    transform: translateX(-40px)

  .dot
    &:nth-child(1)
      animation-delay: .4s

    &:nth-child(2)
      animation-delay: .8s

    &:nth-child(3)
      animation-delay: 1.2s

    &:nth-child(4)
      animation-delay: 1.6s

    &:nth-child(5)
      animation-delay: 2.0s

    &:nth-child(6)
      animation-delay: 2.4s

    &:nth-child(7)
      animation-delay: 2.8s

    &:nth-child(8)
      animation-delay: 3.2s

    &:nth-child(9)
      animation-delay: 3.6s

    &:nth-child(10)
      animation-delay: 4.0s

    &:nth-child(11)
      animation-delay: 4.4s

    &:nth-child(12)
      animation-delay: 4.8s

    &:nth-child(13)
      animation-delay: 5.2s

    &:nth-child(14)
      animation-delay: 5.6s

    &:nth-child(15)
      animation-delay: 6.0s

    &:nth-child(16)
      animation-delay: 6.4s

    &:nth-child(17)
      animation-delay: 6.8s

  .pacman:before
    content: ''
    display: inline-block
    background: transparent
    vertical-align: bottom
    border-top: 10px solid transparent
    border-bottom: 10px solid transparent
    right: 0px
    border-right: 10px solid #fff
    opacity: 1
    position: absolute
    animation: eat .4s infinite

  .ghost
    height: 25px
    width: 25px
    background: #669
    top: -22px
    border-top-left-radius: 50%
    border-top-right-radius: 50%
    position: relative
    transform: translateX(550px)
    animation: move-back 14s linear infinite
    animation-delay: 7s
    opacity: 0

    &:before
      height: 5px
      content: ''
      width: 3px
      background: #fff
      top: 7px
      left: 7px
      z-index: 10
      position: absolute

    &:after
      height: 5px
      content: ''
      width: 3px
      background: #fff
      top: 7px
      right: 7px
      z-index: 10
      position: absolute

@keyframes eat
  50%
    transform: translateX(10px) scale(0.1)

@keyframes move-back
  3%
    opacity: 1

  35%
    opacity: 1

  49%
    opacity: 0

  50%
    transform: translateX(0px)

@keyframes move-forward
  50%
    transform: translateX(500px)

  50.1%
    transform: translateX(500px) scaleX(-1)
    opacity: 1

  100%
    transform: translateX(-40px) scaleX(-1)

@keyframes fade-out
  0%
    opacity: 0

  40%
    opacity: 0

  89.99%
    opacity: 0

  90%
    opacity: 0.5
</style>