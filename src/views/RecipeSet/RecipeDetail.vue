<style lang="scss" scoped></style>

<template lang="pug">
//- .c-modalpop__detail()
.c-modalpop__detail(v-if="show")
  .detail-view
    .detail-view__img()
      img(:src="this.rcpDetail.ATT_FILE_NO_MAIN" alt="")
      //- mdicon(v-else name="alert-circle" size="30")

    .detail-view__data
      h3 {{ this.rcpDetail.RCP_NM }}
    //-   .detail-view__info
    //-     .detail-view__info--inner
    //-       ul.detail-view__info--list
    //-         li
    //-           strong 조리방법
    //-           span {{ this.rcpDetail.RCP_WAY2 }}
    //-         li
    //-           strong 요리종류
    //-           span {{ this.rcpDetail.RCP_PAT2 }}
    //-       ul.detail-view__info--list
    //-         li
    //-           strong 열량
    //-           span {{ this.rcpDetail.INFO_ENG }}
    //-         li
    //-           strong 단백질
    //-           span {{ this.rcpDetail.INFO_PRO }}
    //-         li
    //-           strong 지방
    //-           span {{ this.rcpDetail.INFO_FAT }}
    //-         li
    //-           strong 나트륨
    //-           span {{ this.rcpDetail.INFO_NA }}

    //-     .detail-view__info--inner
    //-       strong 재료정보
    //-       ul.detail-view__info--list-02
    //-         li(v-for="ingredient in rcpIngredients") {{ ingredient }}
    //-   .detail-view__hash(v-if="this.rcpDetail.HASH_TAG")
    //-     a(href="javascript:;") {{ recipes[index].HASH_TAG }}
    //-     a(href="javascript:;") {{ recipes[index].HASH_TAG }}
    //-   .detail-view__types
    //-     dl
    //-       dt 저감 조리법 TIP
    //-       dd {{ recipes[index].RCP_NA_TIP }}
    //-   .detail-view__types
    //-     dl
    //-       dt 요리 순서
    //-       dd
    //-         ol.detail-view__recipe
    //-           li(:v-if="this.rcpDetail.MANUAL01 || this.rcpDetail.MANUAL_IMG02")
    //-             img(:src="recipes[index].MANUAL_IMG02")
    //-             p {{ recipes[index].MANUAL01 }}

    //-       //- li(:v-if="this.rcpDetail.MANUAL02") {{ recipes[index].MANUAL02 }}
    //-       //- li(:v-if="this.rcpDetail.MANUAL03") {{ recipes[index].MANUAL03 }}
    //-       //- li(:v-if="this.rcpDetail.MANUAL04") {{ recipes[index].MANUAL04 }}
    //-       //- li(:v-if="this.rcpDetail.MANUAL05") {{ recipes[index].MANUAL05 }}
    //-       //- li(:v-if="this.rcpDetail.MANUAL06") {{ recipes[index].MANUAL06 }}
    //-       //- li(:v-if="this.rcpDetail.MANUAL07") {{ recipes[index].MANUAL07 }}
    .btn-box
      button(@click="closeDetail") Close

</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "RecipeDetail",
  props: ["rcpDetail"],
  components: { FontAwesomeIcon },
  data() {
    return {
      show: false,
      rcpIngredients: [],
    };
  },
  methods: {
    recipeData() {
      this.show = true;
      // console.log(`Detail :: ${this.rcpDetail.RCP_NM}`);
      // this.rcpIngredients = "";
      // this.rcpIngredients = this.rcpDetail.RCP_PARTS_DTLS.split("\n");
      // console.log(this.rcpIngredients);
    },
    closeDetail() {
      this.$emit("closeDetailFromChild");
    },
  },
  created() {
    this.recipeData();
  },
};
</script>
