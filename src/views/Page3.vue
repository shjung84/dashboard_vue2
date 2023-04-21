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
  .c-modalpop__detail(v-if="show")
    .detail-view
      .detail-view__img()
        img(:src="this.rcpDetail.ATT_FILE_NO_MAIN" alt="")
        //- mdicon(v-else name="alert-circle" size="30")
      //-     //- img(v-if="pokemon" :src="imageUrl + pokemon.id + '.png'" alt="pokemon.id")

      .detail-view__data
        h3 {{ this.rcpDetail.RCP_NM }}
        .detail-view__info
          .detail-view__info--inner
            ul.detail-view__info--list
              li
                strong 조리방법
                span {{ this.rcpDetail.RCP_WAY2 }}
              li
                strong 요리종류
                span {{ this.rcpDetail.RCP_PAT2 }}
            ul.detail-view__info--list
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

          .detail-view__info--inner
            strong 재료정보
            ol.detail-view__info--list-02
              li(v-for="ingredient in rcpIngredients") {{ ingredient }}



        ul.detail-view__property--list
        .detail-view__hash(v-if="this.rcpDetail.HASH_TAG")
          a(href="javascript:;") {{ recipes[index].HASH_TAG }}
          a(href="javascript:;") {{ recipes[index].HASH_TAG }}
        .detail-view__types
          dl
            dt 저감 조리법 TIP
            dd {{ recipes[index].RCP_NA_TIP }}
        .detail-view__types
          ol
            li(:v-if="this.rcpDetail.MANUAL01") {{ recipes[index].MANUAL01 }}
            li(:v-if="this.rcpDetail.MANUAL02") {{ recipes[index].MANUAL02 }}
            li(:v-if="this.rcpDetail.MANUAL03") {{ recipes[index].MANUAL03 }}
            li(:v-if="this.rcpDetail.MANUAL04") {{ recipes[index].MANUAL04 }}
            li(:v-if="this.rcpDetail.MANUAL05") {{ recipes[index].MANUAL05 }}
            li(:v-if="this.rcpDetail.MANUAL06") {{ recipes[index].MANUAL06 }}
            li(:v-if="this.rcpDetail.MANUAL07") {{ recipes[index].MANUAL07 }}


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

      rcpDetail: "",
      rcpIngredients: [],
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
          console.log(`length : ${this.recipes.length}`);

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

      this.rcpDetail = this.recipes[index];
      this.rcpIngredients = this.recipes[index].RCP_PARTS_DTLS.split("\n");
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
