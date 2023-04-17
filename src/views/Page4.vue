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

.list {
  width: 100%;
  li {
    border-top: 1px solid $color-border--opacity-1;
    background-color: $color-bg;
    text-transform: capitalize;
    cursor: pointer;
    &:hover {
      background-color: $color-theme-opacity-2;
    }
    img {
      display: inline-block;
    }
    .box {
      display: flex;
      padding: 0 5px;

      span {
        padding: 8px;
        border-left: 1px solid $color-border--opacity-1;
        &:first-child {
          width: 30px;
          border-left: 0;
          text-align: center;
        }
      }
    }
  }
  #scroll-trigger {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
    font-size: 2rem;
    color: $color-txt-opacity-7;
  }
}

.detail {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  padding: 90px 10px 10px;
  width: 100%;
  height: 100%;
  background-color: $color-txt-opacity-7;
  .detail-view {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    max-width: 510px;
    padding: 80px 20px 20px;
    background-color: $color-bg;
    @include border-radius(15px);

    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      position: absolute;
      top: -60px;
      width: 120px;
      height: 120px;
      background-color: $color-txt;
      border-radius: 50%;
      box-shadow: 0 5px 10px $color-txt-opacity-3, 0 -5px 10px $color-bg-opacity-5;
    }
    .data {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      h3 {
        text-transform: capitalize;
        font: {
          weight: bold;
          size: 1.5em;
        }
      }
      .property {
        width: 100%;
        max-width: 400px;
        dl {
          display: flex;
          justify-content: space-between;
          padding: 5px;
          border-bottom: 1px solid $color-border--opacity-2;
        }
      }
      .types {
        width: 100%;
        margin-top: 20px;
        dl {
          dt {
            padding: 3px 5px;
            border-bottom: 1px solid $color-border--opacity-2;
            font-size: 1.2em;
          }
          dd {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            span {
              display: inline-block;
              margin: 5px;
              padding: 5px 10px 3px;
              color: $color-bg;
              text-transform: capitalize;
              font: {
                size: 11px;
                family: "Lato";
              }
              word: {
                wrap: none;
                break: keep-all;
              }
              letter-spacing: 2px;
              @include border-radius(15px);
              &.type {
                background-color: #0a2e50;
              }
              &.ability {
                background-color: #c73015;
              }
            }
          }
        }
      }
    }
    .close {
      outline: none;
      border: none;
      border-radius: 5px;
      background-color: #333;
      color: #efefef;
      padding: 5px 10px;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
  .loader {
    color: $color-bg;
    font-size: 2rem;
  }
}
</style>

<template lang="pug">
.wrap
  h2 {{ title }}
  div.wrap-inner
    .searchbar
      form(@submit.prevent="pokeIdSearch")
        input(type="text" v-model="searchvalue")
      button(@click="pokeIdSearch()") Search

    ul.list
      li(
        v-for="(pokemon, index) in pokemons"
        :key="'poke'+index"
        @click="pokeViewDetail(pokemon.url)"
      )
        p.box
          span {{ pokemon.id }}
          span
            img(
                :src="imageUrl + pokemon.id + '.png'"
                :alt="pokemon.name"
                width="30px"
              )
          span {{ pokemon.name }}

  .detail(v-if="showDetail")
    .detail-view
      .image(v-if="pokemon")
        //- img(:src="imageUrl + pokemon.id + '.png'" alt="")
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
    //- .loader(v-else)
    //-   font-awesome-icon(:icon="['fas', 'spinner']" spin)
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// import PokemonSearch from "./pokemonSearch.vue";
// import PokemonList from "./pokemonList.vue";
// import pokemonDetail from "./pokemonDetail.vue";

export default {
  name: "Members",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: { FontAwesomeIcon },
  data: () => {
    return {
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
      apiUrl: "https://pokeapi.co/api/v2/pokemon/",
      pokemonUrl: "",
      nextUrl: "",
      currentUrl: "",
      showDetail: false,
      pokemons: [],
      pokemon: {},
      searchvalue: "",
    };
  },

  methods: {
    fetchList() {
      let request = new Request(this.currentUrl);
      // console.log(request);
      fetch(request)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then(data => {
          // this.nextUrl = data.next;
          data.results.forEach(pokemon => {
            pokemon.id = pokemon.url
              .split("/")
              .filter(function (part) {
                return !!part;
              })
              .pop();
            this.pokemons.push(pokemon);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    pokeViewDetail(url) {
      this.pokemonUrl = url;
      // console.log(req);

      if (this.pokemonUrl !== "") {
        console.log(`this.pokemonUrl : ${this.pokemonUrl}`);
        this.showDetail = true;
        // this.pokemon = data;

        // this.$emit("pokeIdSearch", this.apiUrl + this.searchvalue);
      }

      // fetch(req)
      //   .then(resp => {
      //     if (resp.status === 200) return resp.json();
      //   })
      //   .then(data => {
      //     this.showDetail = true;
      //     this.pokemon = data;
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    closeDetail() {
      this.pokemonUrl = "";
      this.showDetail = false;
    },
    pokeIdSearch(url) {
      this.pokemonUrl = url;
      // this.showDetail = true;
      if (this.searchvalue !== "") {
        console.log(`this.apiUrl : ${this.apiUrl}`);
        console.log(`this.searchvalue : ${this.searchvalue}`);
        // this.$emit("pokeIdSearch", this.apiUrl + this.searchvalue);
      }
    },
  },
  created() {
    this.currentUrl = this.apiUrl;
    this.fetchList();
  },
  mounted() {
    // this.scrollTrigger();
  },
};
</script>
