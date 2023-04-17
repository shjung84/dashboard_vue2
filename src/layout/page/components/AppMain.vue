<style lang="scss" scoped>
main {
  display: flex;
  flex: 1px;
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 15px 10px 15px 20px;
  background-color: $color-bg-level-2;
  box-shadow: 0 0 10px $color-border--opacity-1;
  @include border-radius(25px);
  &::before,
  &::after {
    content: "";
    position: absolute;
    right: 0;
    left: 0;
    z-index: 3;
    height: 10px;
  }
  &::before {
    top: 15px;
    background: linear-gradient($color-bg-level-2, transparent);
  }
  &::after {
    bottom: 15px;
    background: linear-gradient(transparent, $color-bg-level-2);
  }
  .main-inner {
    overflow: auto;
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    padding: 5px 10px 5px 0;
    @include border-radius(20px);
  }
}
</style>
<style lang="scss">
main {
  h2 {
    margin: 0 0 20px;
    padding-bottom: 15px;
    border-bottom: double $color-border--opacity-1;
    text-align: center;
  }
}
</style>

<template lang="pug">
main
  .main-inner
    router-view(:title="title")
</template>

<script>
export default {
  name: "AppMain",
  components: {},
  computed: {
    title() {
      console.log("AppMain :", this.$route.meta.title);
      return this.$route.meta.title;
    },
  },
  mounted() {},
};
</script>
