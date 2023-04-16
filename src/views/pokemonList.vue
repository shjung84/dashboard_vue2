<style lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 10px;
  width: 100%;
}
article {
  padding-bottom: 15px;
  border: 1px solid $color-border--opacity-1;
  background-color: $color-bg;
  text-align: center;
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    background-color: $color-theme-opacity-2;
  }
  @include border-radius(5px);
  img {
    display: inline-block;
  }
  strong {
    display: block;
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
</style>

<template lang="pug">
.list
  article(
    v-for="(pokemon, index) in pokemons"
    :key="'poke'+index"
    @click="setPokemonUrl(pokemon.url)"
    )
    img(:src="imageUrl + pokemon.id + '.png'" width="96" height="96" alt="")
    strong {{ pokemon.name }}
  #scroll-trigger(ref="infinitescrolltrigger")
    font-awesome-icon(:icon="['fas', 'spinner']" spin)
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "pokemonList",
  props: ["imageUrl", "apiUrl"],
  components: { FontAwesomeIcon },
  data: () => {
    return {
      pokemons: [],
      nextUrl: "",
      currentUrl: "",
    };
  },
  methods: {
    fetchData() {
      let req = new Request(this.currentUrl);
      fetch(req)
        .then(resp => {
          if (resp.status === 200) return resp.json();
        })
        .then(data => {
          this.nextUrl = data.next;
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
    scrollTrigger() {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0 && this.nextUrl) {
            this.next();
          }
        });
      });
      observer.observe(this.$refs.infinitescrolltrigger);
    },
    next() {
      this.currentUrl = this.nextUrl;
      this.fetchData();
    },
    setPokemonUrl(url) {
      this.$emit("setPokemonUrl", url);
    },
  },
  created() {
    this.currentUrl = this.apiUrl;
    this.fetchData();
  },
  mounted() {
    this.scrollTrigger();
  },
};
</script>
