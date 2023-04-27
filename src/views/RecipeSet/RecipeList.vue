<style lang="scss" scoped></style>

<template lang="pug">
ul.c-list--default
  //- li 받은 검색어 :: {{ mValue }}
  li 받은 검색어 :: #[input(type="text" :value="mValue")]
  li.item__row(v-for="(dish, index) in dishes")
    a.item__row--inner(@click="dishIndex(index)")
      span(class="item__cell item__cell--thumb") #[img(:src="dish.ATT_FILE_NO_MAIN")]
      span(class="item__cell item__cell--thumb") {{ dish.RCP_SEQ }}
      span(class="item__cell item__cell--title") {{ dish.RCP_NM }}
      span(class="item__cell item__cell--meta") {{ dish.RCP_WAY2 }}
      span(class="item__cell item__cell--meta") {{ dish.RCP_PAT2 }}
  li(id="infinite-scroll" ref="infinitescroll")
    p.spinner(v-if="spinner")
      font-awesome-icon(:icon="['fas', 'spinner']" spin)
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import _ from "lodash";

export default {
  name: "dishList",
  props: ["mValue", "apiUrl"],
  components: { FontAwesomeIcon },
  watch: {
    mValue(val) {
      if (val === null) {
        // this.reset = Math.random().toString()
        console.log(`null`);
      } else {
        const len = this.dishes.length;
        console.log(`mValue :: ${val}, len :: ${len}`);
        for (let i = 0; i < len; i++) {
          if (
            this.dishes[i].RCP_NM.includes(val) === false &&
            this.dishes[i].RCP_SEQ.includes(val) === false &&
            this.dishes[i].RCP_WAY2.includes(val) === false
          ) {
            document.querySelectorAll(".item__row")[i].style.display = "none";
          } else {
            document.querySelectorAll(".item__row")[i].style.display = "block";
          }
        }
      }
    },
  },
  data() {
    return {
      dishes: [],
      nextUrl: "",
      currentUrl: "",

      dish: "",
      nextPage: "",
      total: "0",
      endIdx: "",
      amount: 10,
      spinner: false,
      index: "",
      rcpDetail: "",
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
          this.dishes = data.row;

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
    dishIndex(index) {
      console.log(`index :: ${index}`);
      // this.index = index;
      this.rcpDetail = this.dishes[index];
      // console.log(this.rcpDetail);
      // console.log(this.dishes);

      this.$emit("viewDetailFromChild", this.rcpDetail);
    },
  },
  created() {
    this.endIdx = this.amount;
    this.currentUrl = this.apiUrl + this.amount;
    // console.log(this.currentUrl);
    this.fetchList();
  },
  mounted() {
    this.autoScroll();
  },
};
</script>
