<style lang="scss" scoped>
main {
  display: flex;
  flex: 1px;
  overflow: hidden;
  /* overflow-y: auto; */

  position: relative;
  width: 100%;
  padding: 15px 10px 15px 20px;
  background-color: var(--color-bg-level-2);
  box-shadow: 0 0 10px var(--color--opacity-1);
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  border-radius: 25px;
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
    background: linear-gradient(var(--color-bg-level-2), transparent);
  }
  &::after {
    bottom: 15px;
    background: linear-gradient(transparent, var(--color-bg-level-2));
  }
  .main-inner {
    overflow: auto;
    position: relative;
    z-index: 2;
    min-width: 400px;
    width: 100%;
    height: 100%;
    padding: 5px 10px 5px 0;
    /* padding: 15px 20px; */
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
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
