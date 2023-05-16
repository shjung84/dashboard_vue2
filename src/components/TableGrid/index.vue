<style lang="scss" scoped></style>

<template lang="pug">
.table-grid-container

  .table
    el-table.default-table(
      border
      :data="data.list"
      v-loading="data.loading"
    )
      el-table-column(prop="id" label="Pokemon ID" width="100" align="center" )
      el-table-column(prop="name" label="Pokemon Name" align="center")


    pagination(
      :data="data.pagination"
      @currentChange="currentChange"
      )


</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Pagination from "@/components/Pagination";

export default {
  components: {
    FontAwesomeIcon,
    Pagination,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    currentChange(page) {
      this.$emit("currentChange", page);
    },
  },
};
</script>
