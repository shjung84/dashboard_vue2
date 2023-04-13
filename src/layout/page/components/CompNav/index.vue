<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 30px 15px;

  h1 {
    position: relative;
    width: 100%;
    padding-top: 50px;
    text-align: center;
    strong {
      display: block;
      position: relative;
      z-index: 2;
    }
    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      z-index: 1;
      width: 40px;
      height: 40px;
      background-color: var(--color-bg-opacity-5);
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
    }
    &::before {
      left: 50%;
      margin-left: -10px;
    }
    &::after {
      right: 50%;
      margin-right: -10px;
    }
  }

  #lnb {
    display: flex;
    flex-grow: 1;
    position: relative;
    width: 100%;
    margin-top: 20px;
    ul {
      display: flex;
      flex-direction: column;
      flex-basis: 100%;
      position: relative;
      z-index: 2;
      top: 5px;
      width: 100%;
      /* background-color: #fcc; */
      li {
        position: relative;
        /* margin-right: -15px; */
        /* height: 50px; */

        &.logout {
          margin-top: auto;
        }
        a {
          display: flex;
          align-items: center;
          position: relative;
          left: 0;
          width: 100%;
          height: 40px;

          padding: 10px 10px 10px 15px;
          color: var(--color--opacity-7);
          font-size: 1.3em;
          font-weight: 400;

          em {
            vertical-align: middle;
          }
          .mdi + em {
            margin-left: 7px;
          }
          &.router-link-active {
            left: -20px;
            color: var(--color-bg);
            -webkit-transition: left 0.3s, color 0.1s;
            -moz-transition: left 0.3s, color 0.1s;
            -o-transition: left 0.3s, color 0.1s;
            transition: left 0.3s, color 0.1s;
            span,
            em {
              scale: 1.1;
              -webkit-transition: scale 0.2s;
              -moz-transition: scale 0.2s;
              -o-transition: scale 0.2s;
              transition: scale 0.2s;
            }
          }
        }
      }
    }
    .slide-bar {
      position: absolute;
      top: 0;
      right: 15px;
      left: -35px;
      z-index: 1;
      height: 50px;
      background-color: var(--color-slidebar);
      border-radius: 30px;
      transition: top 0.2s ease-out;
      box-shadow: 0 0 10px var(--color-bg-opacity-5);
      &::before {
        content: "";
        position: absolute;
        top: calc(50% - 7px);
        right: -22px;
        width: 15px;
        height: 15px;
        border-radius: 15px;
        background-color: var(--color-slidebar);
        box-shadow: 0 0 10px var(--color-bg-opacity-5);
      }
    }
    /* .slide-bar {
      position: absolute;
      top: 0;
      right: -15px;
      left: 0;
      z-index: 1;
      height: 35px;
      background-color: var(--color-slidebar);
      border-radius: 30px 0 0 30px;
      transition: top 0.1s ease-out;
      &::before,
      &::after {
        content: "";
        position: absolute;
        right: 0;
        width: 30px;
        height: 30px;
        background-color: var(--color-slidebar);
      }
      &::before {
        bottom: 100%;
        background: radial-gradient(circle at 0 0, transparent 30px, var(--color-slidebar) 30px);
      }
      &::after {
        top: 100%;
        background: radial-gradient(circle at 0 100%, transparent 30px, var(--color-slidebar) 30px);
      }
    } */
  }
}
</style>

<template lang="pug">
nav
  h1 #[strong Your Name]
  #lnb
    ul
      li(
        v-for="(item, i) of list"
        :key="i"
        )
        router-link(:to="item.link" @click.native="getMenu(i)")
          mdicon(:name="item.icon" size="15")
          em {{ item.name }}
      li(class="logout")
        a(href="javascript:;" title="Logout") #[mdicon(name="power" size="15")] #[em Logout]
    .slide-bar(:style="getStyles")
</template>

<script>
// import { ref } from "vue";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    depth: {
      type: String,
      default: "",
    },
  },
  watch: {
    $route(to, from) {
      console.log(to.fullPath, from.fullPath);
      this.setPosition = 40 * this.depth;
    },
  },
  // setup() {
  // const newCurrent = ref(0);
  // const getMenu = idx => {
  //   // newCurrent.value = idx;
  //   document.getElementsByClassName("slide-bar")[0].style.top = idx * 35 + "px";
  //   console.log(idx);
  // };
  // return {
  //   // newCurrent,
  //   getMenu,
  // };
  // },
  data() {
    return {
      setPosition: "",
      list: [
        {
          name: "MainPage",
          link: "/MainPage",
          icon: "chart-donut-variant",
        },
        {
          name: "Page1",
          link: "/Page1",
          icon: "door-open",
        },
        {
          name: "Page2",
          link: "/Page2",
          icon: "cellphone-link",
        },
        {
          name: "Page3",
          link: "/Page3",
          icon: "account-group-outline",
        },
        {
          name: "Page4",
          link: "/Page4",
          icon: "account-circle",
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    key() {
      // console.log("Nav :", this.$route.fullPath);
      // return this.$route.fullPath;
      console.log("Nav :", this.$route.name);
      return this.$route.name;
    },
    positionTop() {
      return `${this.setPosition}px`;
    },
    getStyles() {
      return [{ top: this.positionTop }];
    },
  },
  methods: {
    init() {
      this.setPosition = 40 * this.depth;
    },
    getMenu(idx) {
      this.setPosition = 40 * idx;
    },
  },
};
</script>
