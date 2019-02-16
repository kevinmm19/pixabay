<template>
  <p :class="(css!==''?'message ' + css:'message')">{{msg}}</p>
</template>

<script>
export default {
  name: 'Message',
  props: {
    msg: String,
    css: String
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/_vars.scss";
.message {
  font-size: 25px;
  color: $colorText1;
  &--big {
    font-size: 40px;
  }
}
</style>
