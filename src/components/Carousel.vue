<template>
  <div class="template-wrapper">
    <header class="header">
      <form class="header__form">
          <input type="search" class="header__search js-search" placeholder="Search For Any Image" v-model="search" disabled="disabled">    
          <input type="reset" class="header__reset js-reset" value="Clear" v-if="search.length" @click="reset">
      </form>
    </header>
    <section class="message loading" v-if="loading">
        <p class="loading__text">Loading...</p>
    </section>
    <section class="images slider" v-else-if="images.length">
        <a href="#" class="slider__arrow slider__arrow--prev" @click="prev">
            <img src="../assets/img/arrow.svg" class="slider__arrow-img" alt="Previous">
        </a>
        <article v-for="(image, index) in images" :class="'image slide slide-' + index + ((index===0)?' active':'')" :key="image.id">
            <a class="image__box" :href="image.pageURL" target="_blank">
                <img v-if="image.webformatURL.length" class="image__content" :src="image.webformatURL" :alt="image.tags">
            </a>
            <h3 class="image__title" v-html="image.tags"></h3>
        </article>
        <a href="#" class="slider__arrow slider__arrow--next" @click="next">
            <img src="../assets/img/arrow.svg" class="slider__arrow-img" alt="Next">
        </a>
    </section>
    <section class="message error" v-else>
        <p class="error__text" v-if="error429">
            Too many requests to the server. Please wait some seconds and try again.
        </p>
        <p class="error__text" v-else-if="errorFetch">
            Failed to connect to the Pixabay API.
        </p>
        <p class="error__text" v-else>
            No images match your search criteria.
        </p>
    </section>
    <section class="slider__controls" v-if="!loading && images.length">
        <button class="btn btn--prev" @click="prev">Prev</button>
        <button class="btn btn--next" @click="next">Next</button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data: function () {
    return {
        search: '',
        images: [],
        loading: true,
        error429: false,
        errorFetch: false
    }
  },
  async created() {
    await this.find();
    document.querySelector('.js-search').removeAttribute('disabled');
    this.debounceFind = this.debounce(this.find, 250);
  },
  watch: {
    search() {
        this.loading = true;
        this.debounceFind();
    }
  },
  methods: {
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            let context = this, args = arguments;
            let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    async find() {
        try {
            const url = 'https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&per_page=6&q=' + this.search;
            const headers = new Headers({
                'Content-Type': 'text/plain'
            });
            const response = await fetch(url, { 
                method: 'GET',
                mode: 'cors',
                headers: headers
            });
            if (response !== undefined && response.ok) {
                const images = await response.json();
                this.images = images.hits;
                this.error429 = false;
            } else {
                this.error429 = true;
            }
            this.loading = false;
            this.errorFetch = false;
        } catch (error) {
            this.errorFetch = true;
            this.error429 = false;
            this.loading = false;
        }
    },
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
    },
    reset() {
        document.querySelector('.js-search').focus();
        this.search = '';
    }
  }
}
</script>

<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_mixins.scss";

.message {
    padding-top: 150px;
    text-align: center;
}
.loading {
    &__text {
        @include rem(4);
        color: $colorText1;
    }
}
.error {
    &__text {
        padding: 0 20px;
        @include rem(2.5);
        color: $colorText1;
    }
}
.header {
    position: fixed;
    padding: 20px 12px;
    width: 100%;
    text-align: center;
    background-color: $colorBg1;
    z-index: 1;
    &__search {
        padding: 10px;
        height: 20px;
        width: 65%;
        @include respond-to($tablet) {
            width: 50%;
        }
    }
    &__reset {
        padding-bottom: 2px;
        height: 44px;
        width: 25%;
        font-size: 18px;
        color: $colorText1;
        background-color: $colorBg1;
        border: 2px solid $colorText1;
        &:hover, &:focus {
            color: $colorBg1;
            background-color: $colorBg5;
        }
        @include respond-to($tablet) {
            width: 10%;
        }
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
        padding-top: 10px;
        width: 300px;
        font-size: 20px;
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
