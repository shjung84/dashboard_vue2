<style lang="scss"></style>

<template lang="pug">
h2 {{ title }}
</template>

<script>
export default {
  name: "Logout",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    return {};
  },
};
</script>
