<style lang="scss" scoped></style>

<template lang="pug">
#container
  comp-nav(:depth="key")
  app-main
  comp-aside
</template>

<script>
import CompNav from "./components/CompNav";
import AppMain from "./components/AppMain";
import CompAside from "./components/CompAside";

export default {
  components: {
    CompNav,
    AppMain,
    CompAside,
  },
  computed: {
    key() {
      return this.$route.meta.depth;
    },
  },
};
</script>
