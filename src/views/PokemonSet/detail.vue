<style lang="scss" scoped></style>

<template lang="pug">
.wrap
  h2 {{ title }}
  .wrap-inner
    p detail
    .detail-view
      .detail-view__img
        img(:src="imageUrl + pokemon.id + '.png'" alt="")
      h3.detail-view__subject {{ pokemon.name }}
      .detail-view__data
        .detail-view__info--inner
          ul.detail-view__info--list
            li
              strong Base Experience
              span {{ pokemon.base_experience }} XP
            li
              strong Height
              span {{ pokemon.height / 10 }} m
            li
              strong Weight
              span {{ pokemon.weight / 10 }} kg
        .detail-view__info--inner
          .poke-type__detail
            dl
              dt Pokemon Types
              dd.type
                span(
                v-for="(value, index) in pokemon.types"
                :key="'value'+index"
                ) {{ value.type.name }}
            dl
              dt Abilities
              dd.ability
                span(
                v-for="(value, index) in pokemon.types"
                :key="'value'+index"
                ) {{ value.type.name }}

</template>

<script>
export default {
  name: "pokemonDetail",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    return {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      apiUrl: "https://pokeapi.co/api/v2/pokemon/",
      pokemon: {},
    };
  },
  mounted() {
    // console.log(this.$route.params.id);
    // this.pokemon.id = this.$route.params.id;
  },
  methods: {
    fetchData() {
      let req = new Request(this.pokemonUrl);
      fetch(req)
        .then(res => {
          if (res.status === 200) return res.json();
        })
        .then(data => {
          console.log(data);
          this.pokemon = data;
          this.show = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  created() {
    console.log(`::::::::::::::::::::: created :::::::::::::::::::::`);
    console.log(this.$route.params.id);
    this.pokemonUrl = this.apiUrl + this.$route.params.id;
    console.log(this.pokemonUrl);
    this.fetchData();
  },
};
</script>
