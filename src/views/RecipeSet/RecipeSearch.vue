<style lang="scss" scoped></style>

<template lang="pug">
.search
  form(@submit.prevent="search")
    //- select(
    //- )
      //- :items="searchOption"
      //- v-model="searchSelected"
      //- :value="searchTxt"
    input(
      v-model="searchValue"
      placeholder="검색어 입력"
      type="text"
      @input="searchTxt($event)"
    )
    button() Search
  .resultList
    p 보낸 검색어 :: {{ searchValue }}
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "RecipeSearch",
  props: ["apiUrl"],
  components: { FontAwesomeIcon },
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    search() {
      if (this.searchValue === "") {
        alert(`검색어를 입력하세요.`);
      } else {
        this.$emit("keySearchFromChild", this.searchValue);
      }
    },
    searchTxt(event) {
      // console.log(`event : ${event.target.value}`);
      this.$emit("keySearchTxtFromChild", event.target.value);

      // const len = this.groupList.length;
      // for (let i = 0; i < len; i++) {
      //   if (
      //     this.groupList[i].name.includes(event.target.value) === false &&
      //     this.groupList[i].debut.includes(event.target.value) === false &&
      //     this.groupList[i].member.includes(event.target.value) === false
      //   ) {
      //     document.querySelectorAll(".group-item")[i].style.display = "none";
      //   } else {
      //     document.querySelectorAll(".group-item")[i].style.display = "flex";
      //   }
      // }
    },
  },
};
</script>
