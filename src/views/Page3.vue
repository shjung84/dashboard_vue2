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
    //- p.total total {{ this.total }}
    RecipeSearch(
      :searchValue = "searchValue"
      @keySearchFromChild="keySearchParent"
      @keySearchTxtFromChild="keySearchTxtParent"
    )

      //- @viewDetail=viewDetail

    RecipeList(
      :apiUrl="apiUrl"
      :mValue = "mValue"
      @viewDetailFromChild="viewDetailParent"
    )
    //- :imageUrl="imageUrl"

    RecipeDetail(
      v-if="show"
      :rcpDetail = "rcpDetail"
      @closeDetailFromChild="closeDetailParent"
    )
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import RecipeSearch from "./RecipeSet/RecipeSearch.vue";
import RecipeList from "./RecipeSet/RecipeList.vue";
import RecipeDetail from "./RecipeSet/RecipeDetail.vue";
// import _ from "lodash";

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
    RecipeSearch,
    RecipeList,
    RecipeDetail,
  },
  data() {
    return {
      apiUrl: "http://openapi.foodsafetykorea.go.kr/api/e34cc0888b4f461cbc83/COOKRCP01/json/1/",
      show: false,
      searchValue: "",
      mValue: "",
      // recipeIdx: "",
    };
  },
  methods: {
    keySearchParent(searchValue) {
      // this.pokemonUrl = url;
      this.searchValue = searchValue;
      // console.log(`searchValue :: ${this.searchValue}`);
      // this.show = true;

      // this.rcpDetail = _.find(this.options, { value: this.inqireContent }).label
      // const val = _.find(this.dishes);
      // if (val !== undefined) {
      //   console.log(`val 1: ${val}`);
      // } else {
      //   alert("");
      // }
    },
    keySearchTxtParent(mValue) {
      this.mValue = mValue;
      console.log(`keySearchTxtPar : ${mValue}`);
    },
    viewDetailParent(rcpDetail) {
      this.rcpDetail = rcpDetail;
      this.show = true;
    },
    closeDetailParent() {
      this.show = false;
    },
  },
  created() {},
  mounted() {},
};
</script>
