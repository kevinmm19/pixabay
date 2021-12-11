<template>
    <ul class="slider">
        <li v-if="isMobileView">
            <NavBtn :type="'prev'" :text="'Prev'" :alt="'Previous'"/>
        </li>
        <li v-for="(image, index) in images" :class="'slide slide-' + index + ((index===activeSlide)?' active':'')" :key="image.id">
            <figure>
                <a class="slide__box" :href="image.pageURL" target="_blank">
                    <img class="slide__img" :src="image.webformatURL" :alt="image.tags">
                </a>
                <figcaption class="slide__caption">{{image.tags}}</figcaption>
            </figure>
        </li>
        <li v-if="isMobileView">
            <NavBtn :type="'next'" :text="'Next'" :alt="'Next'"/>
        </li>
    </ul>
</template>

<script>
import { mapState } from 'vuex';
import NavBtn from "./NavBtn.vue";

export default {
  name: 'Slider',
  components: {
    NavBtn
  },
  data: function () {
    return {
        activeSlide: 0
    }
  },
  computed: {
    ...mapState(['isMobileView','images'])
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/_vars.scss";

.slider {
    padding: 7.5rem 1rem 0;
    display: flex;
    flex-flow: row wrap;
    align-content: space-evenly;
}
.slide {
    display: none;
    @media (min-width: 768px) {
        &:before,
        &:after {
            content: none;
        }
    }
    &.active {
        display: inline-block;
        position: relative;
        margin: 0 auto 2rem;
        height: auto;
        width: 100%;
        overflow: hidden;
    }
    &__img {
        height: auto;
        max-height: 52rem;
        width: 100%;
    }
    &__caption {
        margin: .5rem auto 0;
        font-size: 2rem;
        color: $colorBg5;
        text-align: center;
        text-overflow: ellipsis;
        text-transform: capitalize;
        white-space: nowrap;
        overflow: hidden;
    } 
}
</style>
