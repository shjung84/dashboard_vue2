<style lang="scss" scoped></style>

<template lang="pug">
.wrap
  h2 {{ title }}
  .wrap-inner
    PokemonSearch(
      :apiUrl="apiUrl"
      @pokeIdSearch="pokeIdSearch"
    )
    PokemonList(
      :imageUrl="imageUrl"
      :apiUrl="apiUrl"
      @pokeViewDetail="pokeViewDetail"
    )

  pokemonDetail(
    v-if="showDetail"
    :pokemonUrl="pokemonUrl"
    :imageUrl="imageUrl"
    @closeDetail="closeDetail"
  )
</template>

<script>
import PokemonSearch from "./components/pokemonSearch";
import PokemonList from "./components/pokemonList";
import pokemonDetail from "./components/pokemonDetail";

export default {
  name: "Members",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: {
    PokemonSearch,
    PokemonList,
    pokemonDetail,
  },
  data() {
    return {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      apiUrl: "https://pokeapi.co/api/v2/pokemon/",
      pokemonUrl: "",
      showDetail: false,
    };
  },

  methods: {
    pokeIdSearch(url) {
      this.pokemonUrl = url;
      this.showDetail = true;
    },
    pokeViewDetail(url) {
      this.pokemonUrl = url;
      this.showDetail = true;
    },
    closeDetail() {
      this.pokemonUrl = "";
      this.showDetail = false;
    },
  },
  created() {},
};
</script>
