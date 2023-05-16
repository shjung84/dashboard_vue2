<style lang="scss" scoped>
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
.list-wrap



  ul.c-list--gallery
    li.item__cell(
      v-for="(pokemon, index) in pokemons"
      :key="'poke'+index"
      )
      span(class="item__cell--badge") {{ pokemon.id }}
      a(href="javascript:;" title="모달" class="item__cell--thumb" @click="pokeViewDetail(pokemon.url)") #[img(:src="imageUrl + pokemon.id + '.png'" width="96" height="96" alt="")]
      a(href="javascript:;" title="상세" class="item__cell--title") {{ pokemon.name }}




  pagination(
    :data="tableData.pagination"
    @currentChange="currentChange"
    )
    //- @changeField="changeField"

</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Pagination from "@/components/Pagination";

export default {
  name: "pokemonList",
  props: ["imageUrl", "apiUrl"],
  components: {
    FontAwesomeIcon,
    Pagination,
  },
  data() {
    return {
      pokemons: [],
      currentUrl: "",
      prevUrl: "",
      nextUrl: "",
      tableData: {
        pagination: {
          page: 1,
          total: 0,
        },
      },
    };
  },
  watch: {
    "$route.query": {
      immediate: true,
      async handler(newVal, oldVal) {
        // console.log(`newVal :: ${newVal.page}`);
        console.log(this.$route.query);
        console.log(this.tableData.pagination);
        // this.tableData.pagination = this.$func.boardFormWatch(this.$route.query, this.tableData);

        if (oldVal === undefined) {
          this.currentUrl = this.apiUrl;

          console.log(`oldVal :: undefined`);
          //   this.tableData.filed = await this.$func.tableFieldSetting(this.tableData);
          //   this.tableData.fieldVisible = true;
        } else {
          console.log(`newVal :: ${newVal.page}, oldVal :: ${oldVal.page}`);
        }
        if (newVal !== oldVal) {
          // console.log(`newVal :: ${newVal.page} !== oldVal :: ${oldVal.page}`);
          console.log(`newVal :: ${newVal.page}`);
          // console.log(`oldVal :: ${oldVal.page}`);
          this.currentUrl = this.apiUrl + "?offset=" + newVal.page * 2 + "0&limit=20";
          console.log(`current URL :: ${this.currentUrl}`);
          this.fetchData();
        } else {
          // console.log(`newVal :: ${newVal.page} === oldVal :: ${oldVal.page}`);
        }
      },
    },
  },
  methods: {
    fetchData() {
      let req = new Request(this.currentUrl);
      console.log(req);
      fetch(req)
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(data => {
          this.prevUrl = data.prev;
          this.nextUrl = data.next;
          this.tableData.pagination.total = data.count;
          // console.log(data);
          console.log(this.nextUrl);
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
    // changeField(field) {
    //   this.tableData.field = field;
    // },
    currentChange(page) {
      console.log(`123 current page: ${page}`);
      const query = {
        ...this.$route.query,
        page,
      };
      this.$router.push({ query }).catch(() => {});
      // this.$emit("currentChange", page);
    },
    prevClick() {
      this.currentUrl = this.prevUrl;
      this.fetchData();
    },
    nextClick() {
      this.currentUrl = this.nextUrl;
      this.fetchData();
    },
    next() {
      this.currentUrl = this.nextUrl;
      this.fetchData();
    },
    pokeViewDetail(url) {
      this.$emit("pokeViewDetail", url);
    },
  },
  created() {
    console.log(`created`);
    // this.currentUrl = this.apiUrl;
    // console.log(`current URL :: ${this.currentUrl}`);
    // this.fetchData();
  },
  mounted() {},
};
</script>
