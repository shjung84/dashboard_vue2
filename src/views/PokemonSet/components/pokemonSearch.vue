<style lang="scss" scoped></style>

<template lang="pug">
.search
  form(@submit="pokeIdSearch")
    input(type="text" v-model="searchvalue")
    button(@click="pokeIdSearch") Search
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "PokemonSearch",
  props: ["apiUrl"],
  components: { FontAwesomeIcon },
  data() {
    return {
      searchvalue: "",
    };
  },
  methods: {
    pokeIdSearch() {
      if (this.searchvalue !== "") {
        this.$emit("pokeIdSearch", this.apiUrl + this.searchvalue);
      }
    },
  },
};
</script>
