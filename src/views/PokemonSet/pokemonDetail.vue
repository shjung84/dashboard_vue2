<style lang="scss" scoped></style>

<template lang="pug">
.detail
  .detail-view(v-if="show")
    .image(v-if="pokemon")
      img(:src="imageUrl + pokemon.id + '.png'" alt="")
    .data(v-if="pokemon")
      h3 {{  pokemon.name }}
      .property
        dl
          dt Base Experience
          dd {{ pokemon.base_experience }} XP
        dl
          dt Height
          dd {{ pokemon.height / 10 }} m
        dl
          dt Weight
          dd {{ pokemon.weight /10 }} kg
      .types
        dl
          dt Pokemon Types
          dd
            span.type(
              v-for="(value, index) in pokemon.types"
              :key="'value'+index"
            ) {{ value.type.name }}
        dl
          dt Abilities
          dd
            span.ability(
            v-for="(value, index) in pokemon.types"
            :key="'value'+index"
            ) {{ value.type.name }}
    h3(v-else) The pokemon was not found
    button(class="close" @click="closeDetail") Close
  .loader(v-else)
    font-awesome-icon(:icon="['fas', 'spinner']" spin)
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "pokemonDetail",
  props: ["pokemonUrl", "imageUrl"],
  components: { FontAwesomeIcon },
  data() {
    return {
      show: false,
      pokemon: {},
    };
  },
  methods: {
    fetchData() {
      let req = new Request(this.pokemonUrl);
      fetch(req)
        .then(resp => {
          if (resp.status === 200) return resp.json();
        })
        .then(data => {
          this.pokemon = data;
          this.show = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    closeDetail() {
      this.$emit("closeDetail");
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
