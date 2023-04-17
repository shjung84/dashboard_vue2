<style lang="scss" scoped>
.searchbar {
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: -5px;
  padding-top: 5px;
  background-color: $color-bg-level-2;
  width: 100%;
  margin-bottom: 10px;
  &::before {
    content: "";
    position: absolute;
    right: 0;
    left: 0;
    z-index: 3;
    height: 10px;
  }
  &::before {
    top: 100%;
    background: linear-gradient($color-bg-level-2, transparent);
    /* background: linear-gradient($color-theme-sub, transparent); */
  }

  form {
    width: calc(100% - 65px);
  }
  input {
    height: 40px;
    border-color: $color-border--opacity-3;
  }
  button {
    height: 40px;
    padding: 10px;
    border: 1px solid $color-border--opacity-3;
    background-color: $color-bg;
    @include border-radius(7px);
  }
}
</style>

<template lang="pug">
.searchbar
  form(@submit.prevent="pokeIdSearch")
    input(type="text" v-model="searchvalue")
  button(@click="pokeIdSearch()") Search
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "PokemonSearch",
  props: ["apiUrl"],
  components: { FontAwesomeIcon },
  data: () => {
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
