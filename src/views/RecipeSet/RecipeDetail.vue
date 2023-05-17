<style lang="scss" scoped></style>

<template lang="pug">
//- .c-modal__detail()
.c-modal__detail(v-if="show")
  .pop-detail
    .pop-detail__img()
      img(:src="this.rcpDetail.ATT_FILE_NO_MAIN" alt="")
      //- mdicon(v-else name="alert-circle" size="30")

    h3.pop-detail__subject {{ this.rcpDetail.RCP_NM }}

    .pop-detail__data
      .pop-detail__info
        .pop-detail__info--inner
          ul.pop-detail__info--list
            li
              strong 조리방법
              span {{ this.rcpDetail.RCP_WAY2 }}
            li
              strong 요리종류
              span {{ this.rcpDetail.RCP_PAT2 }}
          ul.pop-detail__info--list
            li
              strong 열량
              span {{ this.rcpDetail.INFO_ENG }}
            li
              strong 단백질
              span {{ this.rcpDetail.INFO_PRO }}
            li
              strong 지방
              span {{ this.rcpDetail.INFO_FAT }}
            li
              strong 나트륨
              span {{ this.rcpDetail.INFO_NA }}

        .pop-detail__info--inner
          strong 재료정보
          ul.pop-detail__info--list-02
            li(v-for="ingredient in rcpIngredients") {{ ingredient }}
      .pop-detail__hash(v-if="this.rcpDetail.HASH_TAG")
        a(href="javascript:;") {{ this.rcpDetail.HASH_TAG }}
        a(href="javascript:;") {{ this.rcpDetail.HASH_TAG }}
      .pop-detail__types
        dl
          dt 저감 조리법 TIP
          dd {{ this.rcpDetail.RCP_NA_TIP }}
      .pop-detail__types.sticky
        dl
          dt 요리 순서
          dd
            ol.pop-detail__recipe
              li(v-if="this.rcpDetail.MANUAL01 || this.rcpDetail.MANUAL_IMG01")
                img(:src="this.rcpDetail.MANUAL_IMG01")
                p {{ this.rcpDetail.MANUAL01 }}
              li(v-if="this.rcpDetail.MANUAL02 || this.rcpDetail.MANUAL_IMG02")
                img(:src="this.rcpDetail.MANUAL_IMG02")
                p {{ this.rcpDetail.MANUAL02 }}
              li(v-if="this.rcpDetail.MANUAL03  || this.rcpDetail.MANUAL_IMG03")
                img(:src="this.rcpDetail.MANUAL_IMG03")
                p {{ this.rcpDetail.MANUAL03 }}
              li(v-if="this.rcpDetail.MANUAL04 || this.rcpDetail.MANUAL_IMG04")
                img(:src="this.rcpDetail.MANUAL_IMG04")
                p {{ this.rcpDetail.MANUAL04 }}
              li(v-if="this.rcpDetail.MANUAL05 || this.rcpDetail.MANUAL_IMG05")
                img(:src="this.rcpDetail.MANUAL_IMG05")
                p {{ this.rcpDetail.MANUAL05 }}
              li(v-if="this.rcpDetail.MANUAL06 || this.rcpDetail.MANUAL_IMG06")
                img(:src="this.rcpDetail.MANUAL_IMG06")
                p {{ this.rcpDetail.MANUAL06 }}
              li(v-if="this.rcpDetail.MANUAL19 || this.rcpDetail.MANUAL_IMG19")
                img(:src="this.rcpDetail.MANUAL_IMG19")
                p {{ this.rcpDetail.MANUAL19 }}
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
      myRecipe: [],
    };
  },
  methods: {
    recipeData() {
      this.show = true;
      // console.log(`Detail :: ${this.rcpDetail.RCP_NM}`);
      this.rcpIngredients = "";
      this.rcpIngredients = this.rcpDetail.RCP_PARTS_DTLS.split("\n");
      console.log(this.rcpIngredients);
      this.howTo();
    },
    howTo() {
      console.log(`How to`);
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
