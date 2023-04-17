<style lang="scss" scoped>
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
  data: () => {
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
