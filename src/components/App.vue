<template>
  <div id="app" class="wrapper">
    <Search />

    <section class="message" v-if="loading">
        <Message :css="'message--big'" :msg="'Loading...'" />
    </section>

    <Slider v-else-if="images.length" />

    <section class="message" v-else>
        <Message v-if="error429" :msg="'Too many requests to the server. Please wait some seconds and try again.'" />
        <Message v-else-if="errorFetch" :msg="'Failed to connect to the Pixabay API.'" />
        <Message v-else :msg="'No images match your search criteria.'" />
    </section>

    <section class="center" v-if="!isMobileView && !loading && images.length">
        <NavBtn :type="'prev'" :text="'Prev'" :alt="'Previous'" />
        <NavBtn :type="'next'" :text="'Next'" :alt="'Next'" />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Message from "./Message.vue";
import NavBtn from "./NavBtn.vue";
import Search from "./Search.vue";
import Slider from "./Slider.vue";

export default {
  name: 'app',
  components: {
    Message,
    NavBtn,
    Search,
    Slider
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
@import "../scss/_vars.scss";

html,
body {
  font-size: 62.5%; // ~10px
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Arial', sans-serif;
  font-size: 1.4rem;
  color: $colorText3;
  line-height: 1.4;
  background-color: $colorBg6;
  background: linear-gradient(0deg, $colorBg6, $colorBg4);
  background-repeat: no-repeat;
  background-attachment: fixed;
}
figure {
  margin: 0;
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
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
}
input {
  font-size: 1.4rem;
}
.center {
    text-align: center;
}
.wrapper {
    margin: 0 auto;
}
.message {
    padding-top: 15rem;
    text-align: center;
}
</style>
