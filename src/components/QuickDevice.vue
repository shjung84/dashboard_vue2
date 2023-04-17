<style lang="scss" scoped>
.c-quick__device {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  position: relative;
  margin-top: 18px;
  h2 {
    height: 15px;
    margin-bottom: 9px;
    font-size: 13px;
  }
  .btn-more {
    position: absolute;
    top: 0;
    right: 0;
    color: $color-theme-sub;
  }
  .c-card--wrap {
    overflow-y: auto;
    position: absolute;
    top: 30px;
    right: -10px;
    left: 0;
    padding-right: 10px;
    height: calc(100% - 30px);
  }
  .c-card {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    &__item {
      display: flex;
      align-items: flex-end;
      position: relative;
      width: calc(50% - 7px);
      min-height: 70px;
      padding: 7px 10px;
      background: $color-bg;
      @include border-radius(15px);
      button {
        position: absolute;
        top: 7px;
        right: 7px;
        width: 25px;
        height: 20px;
        border: none;
        background: transparent;
        &.btn-switch {
          &::before,
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
          &::before {
            right: 0;
            left: 0;
            height: 5px;
            background-color: $color-txt-opacity-3;
            @include border-radius(5px);
          }
          &::after {
            width: 18px;
            height: 13px;
            left: 0;
            background-color: $color-bg-level-3;
            transition: all 0.3s;
            @include border-radius(10px);
          }
          &.is-active::after {
            left: calc(25px - 18px);
            background-color: $color-theme-sub;
          }
        }
      }
      dl {
        width: 100%;
        dt {
          font-weight: 800;
        }
        dd {
          margin-top: 3px;
          color: $color-txt;
          font-size: 10px;
        }
      }
      .icon {
        position: absolute;
        top: 7px;
        left: 10px;
      }
    }
  }
}
</style>

<template lang="pug">
.c-quick__device
  h2 {{ title }}
  router-link(to="/Page3" class="btn-more") #[mdicon(name="dots-horizontal" size="15")]
  .c-card--wrap
    .c-card
      .c-card__item(v-for="(item, index) of device")
        .icon #[mdicon(:name="item.icon" size="20")]
        dl
          dt {{ item.name }}
          dd {{ item. value }}
        button.btn-switch(
          :class="{'is-active' : item.state === 'on'}"
          :title="item.state"
          @click="power(item)"
          )
</template>

<script>
export default {
  name: "QuickDevice",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      device: [
        {
          name: "Lamp",
          icon: "ceiling-light",
          value: "70%",
          state: "off",
        },
        {
          name: "Smart TV",
          icon: "television-classic",
          value: "On",
          state: "on",
        },
        {
          name: "Door",
          icon: "door-open",
          value: "Look",
          state: "off",
        },
        {
          name: "AC",
          icon: "air-filter",
          value: "Off",
          state: "off",
        },
        {
          name: "AP",
          icon: "air-purifier",
          value: "On",
          state: "off",
        },
      ],
    };
  },
  methods: {
    power(item) {
      item.state = item.state == "on" ? "off" : "on";
    },
  },
};
</script>
