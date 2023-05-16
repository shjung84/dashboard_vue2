<style lang="scss" scoped></style>

<template lang="pug">
.wrap
  h2 {{ title }}
  .wrap-inner
    .search
      form(@submit.prevent="pokeIdSearch")
        .total() Total #[em {{ this.tableData.pagination.total }}]
        .inp-box
          input(type="text" v-model="searchValue" )
          button(class="btn-sch") #[mdicon(name="magnify")]
    el-table.default-table(
      border
      :data="tableData.list"
      v-loading="tableData.loading"
      @row-click="rowClick"
    )
      //- @row-click="rowClick"
      el-table-column(label="No" type="index" :index="indexMethod" width="80" align="center")
      el-table-column(prop="id" label="Pokemon ID" width="100" align="center" )
      el-table-column(prop="name" label="Pokemon Name" align="center")
    pagination(
      :data="tableData.pagination"
      @currentChange="currentChange"
    )
</template>

<script>
import Pagination from "@/components/Pagination";

export default {
  name: "Members",
  props: {
    title: {
      type: String,
      default: "",
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Pagination,
  },
  data() {
    return {
      apiUrl: "https://pokeapi.co/api/v2/pokemon/",
      searchValue: "",
      currentUrl: "",
      tableData: {
        list: [],
        loading: true,
        pagination: {
          total: 0,
          page: 1,
        },
      },
    };
  },
  watch: {
    "$route.query": {
      immediate: true,
      async handler(newVal, oldVal) {
        this.tableData.pagination.page = parseInt(this.$route.query.page);
        if (newVal !== oldVal) {
          this.currentUrl = this.apiUrl + "?offset=" + (newVal.page - 1) + "0&limit=10";
          this.fetchData();
        }
      },
    },
  },
  methods: {
    fetchData() {
      this.tableData.loading = true;
      let req = new Request(this.currentUrl);
      fetch(req)
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(data => {
          console.log(data);
          this.tableData.pagination.total = data.count;
          this.tableData.list = [];
          data.results.forEach(item => {
            item.id = item.url
              .split("/")
              .filter(function (part) {
                return !!part;
              })
              .pop();
            this.tableData.list.push(item);
          });
          this.tableData.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    indexMethod(index) {
      return this.tableData.pagination.total - index - 10 * (this.tableData.pagination.page - 1);
    },
    rowClick(row) {
      console.log(row.id);
      console.log(this.$router);
      this.$router.push(`/Page4/detail/${row.id}`).catch(() => {});
    },
    currentChange(page) {
      console.log(`123 current page: ${page}`);
      const query = {
        ...this.$route.query,
        page,
      };
      this.$router.push({ query }).catch(() => {});
    },
    pokeIdSearch() {
      if (this.searchValue === "") {
        alert(`검색어를 입력하세요.`);
      } else {
        console.log(this.searchValue);
      }
    },
  },
  created() {},
};
</script>
