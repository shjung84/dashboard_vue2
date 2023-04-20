<style lang="scss" scoped>
.c-card {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  gap: 14px;
  + .c-card {
    margin-top: 14px;
  }
  &__item {
    display: flex;
    overflow: hidden;
    position: relative;
    width: calc(50% - 7px);
    min-height: 100px;
    padding: 15px;
    border: 1px solid $color-txt-opacity-1;
    background: #fff;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    &.no-pd {
      padding: 0;
    }
    &.col-1 {
      width: 100%;
    }
    &.col-6 {
      width: calc(60% - 7px);
    }
    &.col-4 {
      width: calc(40% - 7px);
    }
  }

  &__inner {
    width: 100%;
    position: relative;
  }

  &__title {
    display: block;
    margin-bottom: 10px;
    font-size: 10px;
  }
  &__type--number {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  &__type--button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 20px;
    button {
      display: flex;
      justify-content: center;
      overflow: hidden;
      position: relative;
      width: 100%;
      height: 50%;
      border: 0;
      background-color: $color-txt-opacity-1;
      color: $color-theme-sub;
      font-size: 0;
      transition: all 0.3s;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient($color-txt-opacity-1 30%, 50%, transparent 80%);
        opacity: 0;
        transition: all 0.3s;
      }
      &:hover:before {
        opacity: 1;
      }
      &.btn--up {
        align-items: flex-start;
        padding-top: 5px;
        border-radius: 20px 20px 0 0;
      }
      &.btn--down {
        align-items: flex-end;
        padding-bottom: 5px;
        border-radius: 0 0 20px 20px;
        &:before {
          transform: rotate(180deg);
        }
      }
      &:active {
        color: $color-theme-sub-active;
      }
      &:disabled {
        color: $color-theme-opacity-3;
      }
    }
  }
}
.l-member {
  &__item {
    padding: 5px 0;

    border-bottom: 1px solid $color-txt-opacity-1;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
  }
  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    min-height: 25px;
    padding-left: 35px;
  }
  &__photo {
    display: flex;
    overflow: hidden;
    position: absolute;
    left: 0;
    width: 25px;
    height: 25px;
    align-items: center;
    justify-content: center;
    background-color: $color-txt-opacity-1;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  &__name {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__date {
    display: block;
    font-size: 10px;
  }
}
/*The Wrapper*/
.scroll--wrap {
  height: 370px;
  height: 100%;
}
.scroll--member {
  height: 138px;
}
.dashboard {
  .el-table {
    margin-bottom: -1px;
  }
}
</style>

<style lang="scss">
/* .vc-container {
  border: 0;
  .vc-pane {
    min-width: 130px;
    .vc-header {
      padding: 0;

      .vc-title {
        font-size: var(--text-xs);
      }
    }

    .vc-weeks {
      min-width: 0;
      padding: 0 3px;
      .vc-day {
        min-height: 20px;
      }
      .vc-day-content,
      .vc-weekday {
        font-size: 10px;
        font-family: "Lato", serif;
        letter-spacing: -1px;
      }
      .vc-day-content,
      .vc-weekday,
      .vc-highlight {
        width: 20px;
        height: 20px;
      }
      .vc-weekday:nth-child(6),
      .weekday-position-6 {
        color: #55a7c8;
      }
      .vc-weekday:nth-child(7),
      .weekday-position-7 {
        color: #fe0477;
      }
      .vc-weekday:nth-child(6),
      .vc-weekday:nth-child(7) {
        opacity: 0.6;
      }
      .weekday-position-1,
      .weekday-position-7 {
        .vc-highlights {
          overflow: visible;
        }
      }
      .weekday-position-1 {
        .vc-day-box {
          &-left-center,
          &-center-center {
            display: block;
          }
        }
        .vc-highlight-base {
          &-end {
            margin-left: -10px;
          }
          &-middle {
            margin-left: -3px;
          }
          &-middle,
          &-end {
            display: block;
            width: 25px !important;
          }
        }
      }
      .weekday-position-7 {
        .vc-day-box {
          &-right-center,
          &-center-center {
            display: block;
          }
        }
        .vc-highlight-base {
          &-start {
            margin-left: 10px;
          }
          &-middle {
            margin-left: 0;
          }
          &-start,
          &-middle {
            display: block;
            width: 25px !important;
          }
        }
      }
    }
  }
  .vc-arrows-container {
    padding: 5px;
    .vc-arrow {
      svg {
        width: 15px;
        height: 15px;
      }
    }
  }
  .vc-day.is-not-in-month * {
    opacity: 0.2 !important;
    pointer-events: inherit;
  }
} */
</style>

<template lang="pug">
.dashboard
  .c-card
    .c-card__item.no-pd
      .c-card__inner
        .calendar
          //- v-date-picker(
          //-   v-model="date"
          //-   :first-day-of-week="2"
          //-   locale="en"
          //-   is-expanded
          //-   is-range
          //- )
    .c-card__item
      .c-card__inner
        .l-member
          vue-scrollbar(class="scroll--member")
            .scroll-inner
              ul.l-member__list
                li.l-member__item(v-for="item of instructor")
                  .l-member__inner
                    p.l-member__photo #[mdicon(name="account" size="15")]
                    strong.l-member__name {{ item.name }}
                    span.l-member__date {{ item.date }}
  .c-card
    .c-card__item(v-for="(item,index) of cardList")
      .c-card__inner
        strong(class="c-card__title") {{ item.name }}
        .c-card__type--number #[strong {{ item.number }}] #[span {{ item.type }}]
        .c-card__type--button
          button(class="btn--up" @click="countUp(index)") #[mdicon(name="chevron-up" size="15")]
          button(class="btn--down" @click="countDown(index)" :disabled="item.number==item.minNum") #[mdicon(name="chevron-down" size="15")]
  .c-card
    //- 게시판
    .c-card__item.no-pd.col-1
      .c-card__inner
        el-table(:data="tableData" max-height="220" class="latest-board")
          el-table-column(prop="regDate" align="center" label="예약일" min-width="90")
          el-table-column(prop="userName" align="center" label="이름" width="80")
          el-table-column(prop="useDate" align="center" label="이용일" min-width="90")
          el-table-column(prop="useType" align="center" label="타입")
          el-table-column(prop="useTypeInfo" align="center" label="내용")
</template>

<script>
import VueScrollbar from "vue2-scrollbar";
// import { DatePicker } from "v-calendar";
// import VCalendar from "v-calendar";

export default {
  name: "MainPage",
  components: {
    VueScrollbar,
    // DatePicker,
    // VCalendar,
  },
  data() {
    return {
      // date: new Date(),
      instructor: [
        {
          name: "Jone Doe 1",
          date: "2022.12.02",
        },
        {
          name: "Jone Doe 2",
          date: "2022.12.02",
        },
        {
          name: "Jone Doe 3",
          date: "2022.12.02",
        },
        {
          name: "Jone Doe 4",
          date: "2022.12.02",
        },
        {
          name: "Jone Doe 5",
          date: "2022.12.02",
        },
        {
          name: "Jone Doe 6",
          date: "2022.12.02",
        },
      ],
      cardList: [
        {
          name: "Indoor Temperature",
          number: "27",
          type: "℃",
          maxNum: "40",
          minNum: "20",
        },
        {
          name: "Bed room",
          number: "25",
          type: "℃",
          maxNum: "40",
          minNum: "20",
        },
        {
          name: "Humidity",
          number: "25",
          type: "%",
          maxNum: "100",
          minNum: "20",
        },
        {
          name: "Living room",
          number: "25",
          type: "%",
          maxNum: "100",
          minNum: "20",
        },
      ],
      tableData: [
        {
          regDate: "2023.04.01",
          userName: "홍길동",
          useType: "렌탈",
          useTypeInfo: "보드, 슈트",
          useDate: "2023.04.15",
        },
        {
          regDate: "2023.04.01",
          userName: "김태희",
          useType: "강습",
          useTypeInfo: "입문 체험강습",
          useDate: "2023.04.15",
        },
      ],
    };
  },
  methods: {
    countUp(idx) {
      this.cardList[idx].number++;
    },
    countDown(idx) {
      this.cardList[idx].number--;
    },
  },
};
</script>
