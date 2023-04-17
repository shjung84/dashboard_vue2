<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  height: 100%;
  margin-right: -10px;
  padding-right: 10px;
}
</style>

<template lang="pug">
.wrap
  h2 {{ title }}
  div.wrap-inner
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
import PokemonSearch from "./PokemonSet/pokemonSearch.vue";
import PokemonList from "./PokemonSet/pokemonList.vue";
import pokemonDetail from "./PokemonSet/pokemonDetail.vue";

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
  data: () => {
    return {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      apiUrl: "https://pokeapi.co/api/v2/pokemon/",
      pokemonUrl: "",
      showDetail: false,
      // users: [],
    };
  },

  methods: {
    pokeIdSearch(url) {
      this.pokemonUrl = url;
      this.showDetail = true;
      console.log(`this.pokemonUrl : ${this.pokemonUrl}`);
    },
    pokeViewDetail(url) {
      this.pokemonUrl = url;
      this.showDetail = true;
      console.log(`this.pokemonUrl : ${this.pokemonUrl}`);
    },
    closeDetail() {
      this.pokemonUrl = "";
      this.showDetail = false;
    },
    // getList: function () {
    //   var vm = this;
    //   // axios를 이용하여 API 호출 (component 안에서 axios를 this.$axios로 사용할 수 있습니다.)
    //   axios
    //     .get("https://api.hnpwa.com/v0/news/1.json")
    //     // this.$axios
    //     //   .get("https://api.hnpwa.com/v0/news/1.json")
    //     .then(response => {
    //       console.log(response);
    //       vm.users = response.data;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
  },
  created() {
    // this.getList();
    // var vm = this;
    // // axios를 이용하여 API 호출 (component 안에서 axios를 this.$axios로 사용할 수 있습니다.)
    // axios
    //   .get("https://pokeapi.co/api/v2/pokemon")
    //   // .get("https://api.hnpwa.com/v0/news/1.json")
    //   // this.$axios
    //   //   .get("https://api.hnpwa.com/v0/news/1.json")
    //   .then(response => {
    //     console.log(response);
    //     vm.users = response.data;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  },
};
</script>
