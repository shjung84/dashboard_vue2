<style lang="scss"></style>

<template lang="pug">
.wrap
  h2 {{ title }}
  div
    PokemonSearch(
      :apiUrl="apiUrl"
      @setPokemonUrl="setPokemonUrl"
    )
    PokemonList(
      :imageUrl="imageUrl"
      :apiUrl="apiUrl"
      @setPokemonUrl="setPokemonUrl"
      )
    pokemonDetail(
      v-if="showDetail"
      :pokemonUrl="pokemonUrl"
      :imageUrl="imageUrl"
      @closeDetail="closeDetail"
    )
  //- div
  //-   ul
  //-     li(v-for="user in users") {{ user }}

</template>

<script>
// import axios from "axios";
import PokemonSearch from "./pokemonSearch.vue";
import PokemonList from "./pokemonList.vue";
import pokemonDetail from "./pokemonDetail.vue";

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
      apiUrl: "https://pokeapi.co/api/v2/pokemon",
      pokemonUrl: "",
      showDetail: false,
      // users: [],
    };
  },

  methods: {
    setPokemonUrl(url) {
      this.pokemonUrl = url;
      this.showDetail = true;
      console.log(this.pokemonUrl);
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
