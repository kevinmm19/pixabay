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
@import "../scss/_mixins.scss";
.slide {
    display: none;
    @include respond-to($tablet) {
        &:before,
        &:after {
            content: none;
        }
    }
    &r {
        padding: 120px 10px 20px;
        display: flex;
        flex-flow: row wrap;
        align-content: space-evenly;
    }
    &.active {
        display: inline-block;
        position: relative;
        margin: 0 auto 20px;
        height: auto;
        width: 100%;
        overflow: hidden;
        @include respond-to($tablet) {
            height: 250px;
            width: 300px;
        }
    }
    &__img {
        height: auto;
        max-height: 400px;
        width: 100%;
        @include respond-to($tablet) {
            width: 100%;
            height: 200px;
        }
    }
    &__caption {
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
</style>
