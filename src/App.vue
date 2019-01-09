<template>
  <div id="app" class="js-app wrapper">
    <Carousel/>
  </div>
</template>

<script>
import Carousel from "./components/Carousel.vue";

export default {
  name: "app",
  components: {
    Carousel
  }
};
</script>

<style lang="scss">
@import "./scss/_normalize.scss";
@import "./scss/_vars.scss";
@import "./scss/_mixins.scss";
@font-face {
  font-family: 'Ropa Sans';
  src: url('./assets/fonts/Ropa_Sans/RopaSans-Regular.ttf');
}
@font-face {
  font-family: 'Ropa Sans Italic';
  src: url('./assets/fonts/Ropa_Sans/RopaSans-Italic.ttf');
}

html,
body {
  height: 100%;
  width: 100%;
  position: relative;
  font-size: 62.5%; // ~10px
}
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
body {
  font-family: 'Ropa Sans', sans-serif;
  @include rem(1.4);
  color: $colorText3;
  line-height: 1.4;
  background-color: $colorBg6;
  background: linear-gradient(0deg, $colorBg6, $colorBg4);
  background-repeat: no-repeat;
  background-attachment: fixed;
}
h1, h2, h3, h4, h5, h6 {
  color: $colorBg5;
}
ul {
  list-style: none;
}
li {
  display: inline-block;
}
p {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
input {
  @include rem(1.4);
}
.wrapper {
  margin: 0 auto;
}
</style>
