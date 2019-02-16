<template>
  <div id="app" class="wrapper">
    <Search />
    <section class="message" v-if="loading">
        <Message :css="'message--big'" :msg="'Loading carousel images...'" />
    </section>
    <Slider v-else-if="images.length"/>
    <section class="message" v-else>
        <Message v-if="error429" :msg="'Too many requests to the server. Please wait some seconds and try again.'" />
        <Message v-else-if="errorFetch" :msg="'Failed to connect to the Pixabay API.'" />
        <Message v-else :msg="'No images match your search criteria.'" />
    </section>
    <section class="center" v-if="!isMobileView && !loading && images.length">
        <NavBtn :type="'prev'" :text="'Prev'" :alt="'Previous'"/>
        <NavBtn :type="'next'" :text="'Next'" :alt="'Next'"/>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Search from "./Search.vue";
import Message from "./Message.vue";
import Slider from "./Slider.vue";
import NavBtn from "./NavBtn.vue";
export default {
  name: 'app',
  components: {
    Search,
    Message,
    Slider,
    NavBtn
  },
  mounted() {
    this.setViewType();
    window.addEventListener('resize', this.setViewType);
  },
  computed: {
   ...mapState(['images','loading','isMobileView','error429','errorFetch'])
  },
  methods: {
    setViewType() {
        if(window.innerWidth < 768) {
            this.$store.commit({
              type: 'setViewType',
              isMobileView: true
            });
        } else {
            this.$store.commit({
              type: 'setViewType',
              isMobileView: false
            });
        }
    }
  }
}
</script>

<style lang="scss">
@import "../scss/_normalize.scss";
@import "../scss/_vars.scss";
@import "../scss/_mixins.scss";
@font-face {
  font-family: 'Ropa Sans';
  src: url('../assets/fonts/Ropa_Sans/RopaSans-Regular.ttf');
}
@font-face {
  font-family: 'Ropa Sans Italic';
  src: url('../assets/fonts/Ropa_Sans/RopaSans-Italic.ttf');
}
html,
body {
  height: 100%;
  width: 100%;
  position: relative;
  font-size: 62.5%; // ~10px
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
  margin: 0;
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
.center {
    text-align: center;
}
.wrapper {
  margin: 0 auto;
}
.message {
    padding-top: 150px;
    text-align: center;
}
</style>
