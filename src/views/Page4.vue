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
          width: 50px;
          border-left: 0;
          text-align: center;
        }
      }
    }
  }
  #infinite-scroll {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 15px;
    background-color: transparent;
    color: $color-txt-opacity-5;
    font-size: 1.5rem;
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
      .mdi {
        color: $color-bg-opacity-5;
      }
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
    .btn-box {
      width: 100%;
      margin-top: 20px;
      button {
        padding: 5px 10px;
        background-color: $color-border--opacity-5;
        color: $color-bg;
        @include border-radius(5px);
      }
    }
  }
}
.loader {
  color: $color-bg;
  font-size: 2rem;
}
</style>

<template lang="pug">
.wrap
  h2 {{ title }}
  div.wrap-inner
    .searchbar
      form(@submit="searchPokemon")
        input(type="text" v-model="searchValue")
      button(@click="searchPokemon") Search

    ul.list
      li(v-for="pokemon in pokemons"
      @click="showPokemonInfo(pokemon.url)"
      )
        p.box
          span {{ pokemon.id }}
          span {{ pokemon.name }}
      li(id="infinite-scroll" ref="infinitescroll")
        font-awesome-icon(:icon="['fas', 'spinner']" spin)

  .detail(v-if="show")
    .detail-view
      .image()
        img(v-if="pokemon" :src="imageUrl + pokemon.id + '.png'" alt="pokemon.id")
        mdicon(v-else name="alert-circle" size="30")
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
      .btn-box
        button(@click="closeDetail") Close

</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "MyPokemonList",
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
      currentUrl: "",
      nextUrl: "",
      pokemons: [],
      pokemon: "",
      searchValue: "",
      show: false,
    };
  },

  methods: {
    fetchList() {
      let req = new Request(this.currentUrl);
      fetch(req)
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(data => {
          this.nextUrl = data.next;
          data.results.forEach(pokemon => {
            pokemon.id = pokemon.url
              .split("/")
              .filter(function (pokemonId) {
                return pokemonId;
              })
              .pop();
            this.pokemons.push(pokemon);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    autoScroll() {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0 && this.nextUrl) {
            this.next();
          }
        });
      });
      obs.observe(this.$refs.infinitescroll);
    },
    next() {
      this.currentUrl = this.nextUrl;
      this.fetchList();
    },
    showPokemonInfo(pokemonUrl) {
      let req = new Request(pokemonUrl);
      fetch(req)
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(data => {
          this.pokemon = data;
          this.show = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchPokemon() {
      if (this.searchValue === "") {
        alert(`검색어를 입력하세요.`);
      } else {
        this.showPokemonInfo(this.apiUrl + this.searchValue);
      }
    },
    closeDetail() {
      this.show = false;
      this.searchValue = "";
    },
  },
  created() {
    this.currentUrl = this.apiUrl;
    this.fetchList();
  },
  mounted() {
    this.autoScroll();
  },
};
</script>
