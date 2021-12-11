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

.btn {
    position: absolute;
    top: 28%;
    padding: 1rem 0 .5rem 2rem;
    z-index: 1;
    border-radius: 75px 0 0 75px;
    background-color: rgba(255,255,255,.5);
    @media (min-width: 420px) {
        top: 32%;
    }
    @media (min-width: 540px) {
        top: 38%;
    }
    @media (min-width: 768px) {
        position: static;
        display: inline-block;
        margin: 0 auto;
        padding: 0;
        height: 4.4rem;
        width: 10rem;
        font-size: 1.8rem;
        color: $colorText1;
        background-color: $colorBg1;
        border-radius: 0;
        border: 2px solid $colorText1;
    }
    &__text {
        display: none;
        @media (min-width: 768px) {
            display: inline-block;
        }
    }
    &__img {
        width: 75%;
        @media (min-width: 768px) {
            display: none;
        }
    }
    &--prev {
        margin-right: 1rem;
        transform: rotateY(180deg);
        @media (min-width: 768px) {
            transform: none;
        }
    }
    &--next {
        right: 1rem;
    }
}
</style>
