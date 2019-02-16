<template>
    <button :class="'btn btn--' + type" @click="type==='prev' ? prev() : next()">
        <span class="btn__text">{{text}}</span>
        <img src="../assets/img/arrow.svg" class="btn__img" :alt="alt">
    </button>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'NavBtn',
  props: {
    alt: String,
    type: String,
    text: String
  },
  computed: {
   ...mapState(['images','loading','error429','errorFetch'])
  },
  methods: {
    prev() {
        let count = document.querySelectorAll('.slide').length-1;
        let $currentSlide = document.querySelector('.active');
        let $previousSlide = $currentSlide.previousElementSibling;
        $currentSlide.classList.remove('active');
        if ($previousSlide !== null && $previousSlide.classList.length) {
            $previousSlide.classList.add('active');
        } else {
            let $lastSlide = document.querySelector('.slide-' + count);
            $lastSlide.classList.add('active');
        }
    },
    next() {
        let $currentSlide = document.querySelector('.active');
        let $nextSlide = $currentSlide.nextElementSibling;
        $currentSlide.classList.remove('active');
        if ($nextSlide !== null && $nextSlide.classList.length) {
            $nextSlide.classList.add('active');
        } else {
            let $firstSlide = document.querySelector('.slide-0');
            $firstSlide.classList.add('active');
        }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/_vars.scss";
@import "../scss/_mixins.scss";
.btn {
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
        position: static;
        display: inline-block;
        margin: 0 auto;
        padding: 0;
        height: 44px;
        width: 100px;
        font-size: 18px;
        color: $colorText1;
        background-color: $colorBg1;
        border-radius: 0;
        border: 2px solid $colorText1;
    }
    &__text {
        display: none;
        @include respond-to($tablet) {
            display: inline-block;
        }
    }
    &__img {
        width: 75%;
        @include respond-to($tablet) {
            display: none;
        }
    }
    &--prev {
        margin-right: 10px;
        transform: rotateY(180deg);
        @include respond-to($tablet) {
            transform: none;
        }
    }
    &--next {
        right: 10px;
    }
}
</style>
