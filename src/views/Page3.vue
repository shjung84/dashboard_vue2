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

.c-list--default {
  width: 100%;
  .item {
    &__row {
      border-bottom: 1px solid $color-border--opacity-1;
      background-color: $color-bg;
      text-transform: capitalize;
      cursor: pointer;
      &:first-child {
        border-top: 1px solid $color-border--opacity-1;
      }
      &:hover {
        background-color: $color-theme-opacity-2;
      }
      &--inner {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
      }
    }
    &__cell {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border-left: 1px solid $color-border--opacity-1;
      &--thumb {
        flex: 0 0 50px;
        border-left: 0;
        &img {
          display: inline-block;
        }
      }
      &--title {
        flex: 1;
        justify-content: flex-start;
        text-align: left;
      }
      &--meta {
        flex: 0 0 80px;
      }
    }
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
    p.total total {{ this.total }}
    ul.c-list--default
      li.item__row(v-for="(recipe, index) in recipes")
        a.item__row--inner(@click="viewDetail(index)")
          span(class="item__cell item__cell--thumb") #[img(:src="recipe.ATT_FILE_NO_MAIN")]
          span(class="item__cell item__cell--thumb") {{ recipe.RCP_SEQ }}
          span(class="item__cell item__cell--title") {{ recipe.RCP_NM }}
          span(class="item__cell item__cell--meta") {{ recipe.RCP_WAY2 }}
          span(class="item__cell item__cell--meta") {{ recipe.RCP_PAT2 }}
      li(id="infinite-scroll" ref="infinitescroll")
        p.spinner(v-if="spinner")
          font-awesome-icon(:icon="['fas', 'spinner']" spin)
  .detail(v-if="show")
    .detail-view
      .image()
        img(:src="recipes[index].ATT_FILE_NO_MAIN" alt="")
        //- mdicon(v-else name="alert-circle" size="30")
      //-     //- img(v-if="pokemon" :src="imageUrl + pokemon.id + '.png'" alt="pokemon.id")

      .data
        h3 {{ recipes[index].RCP_NM }}

      .btn-box
        button(@click="closeDetail") Close


</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "MyRecipe",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: {
    FontAwesomeIcon,
  },
  data: () => {
    return {
      apiUrl: "http://openapi.foodsafetykorea.go.kr/api/e34cc0888b4f461cbc83/COOKRCP01/json/1/",
      currentUrl: "",
      nextUrl: "",

      recipes: [],
      recipe: "",
      nextPage: "",
      total: "0",
      endIdx: "",
      amount: 10,
      spinner: false,

      show: false,
      index: "",
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
          data = data.COOKRCP01;
          this.total = data.total_count;
          this.recipes = data.row;
          console.log(this.recipes);
          this.endIdx = this.endIdx + this.amount;
          this.nextUrl = this.apiUrl + this.endIdx;
          this.spinner = false;
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
          } else if (entry.intersectionRatio == 1) {
            this.spinner = true;
          } else {
            this.spinner = false;
          }
        });
      });
      obs.observe(this.$refs.infinitescroll);
    },
    next() {
      this.spinner = true;
      this.currentUrl = this.nextUrl;
      this.fetchList();
    },
    viewDetail(index) {
      this.show = true;
      this.index = index;
      console.log(index);
    },
    closeDetail() {
      this.show = false;
    },
  },
  created() {
    this.endIdx = this.amount;
    this.currentUrl = this.apiUrl + this.amount;
    this.fetchList();
  },
  mounted() {
    this.autoScroll();
  },
};
</script>
