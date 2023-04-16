<style lang="scss">
.detail {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  padding: 90px 10px 10px;
  width: calc(100% - 20px);
  background-color: $color-txt-opacity-7;
  .detail-view {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    max-width: 510px;
    padding: 80px 0 0;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 15px 30px rgba(0, 0, 0, 0.2);

    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      position: absolute;
      top: -60px;
      width: 120px;
      height: 120px;
      background-color: #333;
      border-radius: 50%;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 15px 30px rgba(0, 0, 0, 0.2);
    }

    h3 {
      text-transform: capitalize;
      font-size: 1.5em;
    }
    h4 {
      width: 90%;
      max-width: 400px;
      border-bottom: 1px solid #ccc;
      font-size: 1.5em;
    }
    .data {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      margin-bottom: 40px;

      .property {
        width: 90%;
        max-width: 400px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
        .left {
          float: left;
        }
        .right {
          float: right;
        }
      }
      .types,
      .abilities {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 90%;
        max-width: 400px;
        /* padding: 5px; */
        .type,
        .ability {
          margin: 5px;
          padding: 5px 10px;
          border-radius: 20px;
          color: #fff;
          letter-spacing: 2px;
          text-transform: capitalize;
          word-wrap: none;
          word-break: keep-all;
        }
        .type {
          background-color: #0a2e50;
        }
        .ability {
          background-color: #c73015;
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
        .left Base Experience
        .right {{ pokemon.base_experience }} XP
      .property
        .left Height
        .right {{ pokemon.height / 10 }} m
      .property
        .left Weight
        .right {{ pokemon.weight /10 }} kg
      h4 Pokemon Types
      .types
        .type(
          v-for="(value, index) in pokemon.types"
            :key="'value'+index"
        ) {{ value.type.name }}
      h4 Abilities
      .abilities
        .ability(
          v-for="(value, index) in pokemon.abilities"
            :key="'value'+index"
        ) {{ value.ability.name }}
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
