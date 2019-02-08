<template>
  <div id="app" class="js-app wrapper">
    <Search />
    <section class="message" v-if="loading">
        <Message :css="'message--big'" :msg="'Loading carousel images...'" />
    </section>
    <ul class="images slider" v-else-if="images.length">
        <li>
            <button href="#" class="slider__arrow slider__arrow--prev" @click="prev">
                <img src="../assets/img/arrow.svg" class="slider__arrow-img" alt="Previous">
            </button>
        </li>
        <li v-for="(image, index) in images" :class="'image slide slide-' + index + ((index===activeSlide)?' active':'')" :key="image.id">
            <a class="image__box" :href="image.pageURL" target="_blank">
                <img class="image__content" :src="image.webformatURL" :alt="image.tags">
            </a>
            <p class="image__title">{{image.tags}}</p>
        </li>
        <li>
            <button href="#" class="slider__arrow slider__arrow--next" @click="next">
                <img src="../assets/img/arrow.svg" class="slider__arrow-img" alt="Next">
            </button>
        </li>
    </ul>
    <section class="message error" v-else>
        <Message v-if="error429" :msg="'Too many requests to the server. Please wait some seconds and try again.'" />
        <Message v-else-if="errorFetch" :msg="'Failed to connect to the Pixabay API.'" />
        <Message v-else :msg="'No images match your search criteria.'" />
    </section>
    <section class="slider__controls" v-if="!loading && images.length">
        <button class="btn btn--prev" @click="prev">Prev</button>
        <button class="btn btn--next" @click="next">Next</button>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Message from "./Message.vue";
import Search from "./Search.vue";
export default {
  name: 'app',
  components: {
    Search,
    Message
  },
  data: function () {
    return {
        activeSlide: 0
    }
  },
  computed:{
   ...mapState(['images','loading','error429','errorFetch'])
  },
  methods: {
    prev(e) {
        e.preventDefault();
        let count = document.querySelectorAll('.slide').length-1;
        let $currentSlide = document.querySelector('.active');
        let $previousSlide = $currentSlide.previousElementSibling;
        $currentSlide.classList.remove('active');
        if ($previousSlide.classList.contains('image') === true) {
            $previousSlide.classList.add('active');
        } else {
            let $lastSlide = document.querySelector('.slide-' + count);
            $lastSlide.classList.add('active');
        }
    },
    next(e) {
        e.preventDefault();
        let $currentSlide = document.querySelector('.active');
        let $nextSlide = $currentSlide.nextElementSibling;
        $currentSlide.classList.remove('active');
        if ($nextSlide.classList.contains('image') === true) {
            $nextSlide.classList.add('active');
        } else {
            let $firstSlide = document.querySelector('.slide-0');
            $firstSlide.classList.add('active');
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
.wrapper {
  margin: 0 auto;
}
.message {
    padding-top: 150px;
    text-align: center;
}
.error {
    &__text {
        padding: 0 20px;
        @include rem(2.5);
        color: $colorText1;
    }
}
.image {
    position: relative;
    margin: 0 auto 20px;
    height: auto;
    width: 100%;
    overflow: hidden;
    @include respond-to($tablet) {
        height: 250px;
        width: 300px;
    }
    &s {
        padding: 120px 10px 20px;
        display: flex;
        flex-flow: row wrap;
        align-content: space-evenly;
    }
    &__content {
        height: auto;
        max-height: 400px;
        width: 100%;
        @include respond-to($tablet) {
            width: 100%;
            height: 200px;
        }
    }
    &__title {
        width: 300px;
        font-size: 20px;
        color: $colorBg5;
        text-overflow: ellipsis;
        text-transform: capitalize;
        white-space: nowrap;
        overflow: hidden;
        @include respond-to($tablet) {
            text-align: center;
        }
    }  
}
.slide {
    display: none;
    @include respond-to($tablet) {
        &:before,
        &:after {
            content: none;
        }
    }
    &.active {
        display: inline-block;
    }
}
.slider {
    &__controls {
        text-align: center;
    }
    &__arrow {
        position: absolute;
        top: 28%;
        padding: 10px 0 5px 20px;
        z-index: 1;
        border-radius: 75px 0 0 75px;
        background-color: rgba(255,255,255,.5);
        @include respond-to(420px) {
            top: 32%;
        }
        @include respond-to(540px) {
            top: 38%;
        }
        @include respond-to($tablet) {
            display: none;
        }
        &-img {
            width: 75%;
        }
        &--prev {
            transform: rotateY(180deg);
        }
        &--next {
            right: 10px;
        }
    }
}
.btn {
    display: none;
    &:hover, &:focus {
        color: $colorBg1;
        background-color: $colorBg5;
    }
    @include respond-to($tablet) {
        display: inline-block;
        margin: 0 auto;
        height: 44px;
        width: 100px;
        font-size: 18px;
        color: $colorText1;
        background-color: $colorBg1;
        border: 2px solid $colorText1;
    }
    &--prev {
        margin-right: 10px;
    }
}
</style>
