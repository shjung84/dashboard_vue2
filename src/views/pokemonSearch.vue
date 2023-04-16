<style lang="scss">
.searchbar {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  form {
    width: calc(100% - 60px);
  }
  input {
    height: 40px;
    border: 1px solid $color-border--opacity-3;
  }
  button {
    height: 40px;
    padding: 10px;
    border: 1px solid $color-border--opacity-3;
    background-color: #fff;
    @include border-radius(5px);
  }
}
</style>

<template lang="pug">
.searchbar
  form(@submit.prevent="setPokemonUrl")
    input(type="text" v-model="searchvalue")
  button(@click="setPokemonUrl()") Search
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
    setPokemonUrl() {
      if (this.searchvalue !== "") {
        this.$emit("setPokemonUrl", this.apiUrl + "/" + this.searchvalue);
      }
    },
  },
};
</script>
