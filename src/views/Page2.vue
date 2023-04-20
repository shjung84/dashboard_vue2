<style lang="scss">
.my-task {
  &__list {
    margin-top: 5px;
    border-top: 1px solid $color-border--opacity-1;

    li {
      position: relative;
      padding: 10px;
      border-bottom: 1px solid $color-border--opacity-1;
      &:hover {
        background-color: $color-theme-opacity-1;
      }
      label {
        display: block;
        position: relative;
        input[type="checkbox"] {
          display: none;
        }
        input[type="checkbox"]:checked {
          & + p {
            color: $color-txt-opacity-3;
            &:after {
              content: "";
              position: absolute;
              top: 50%;
              left: 0;
              width: 100%;
              border-top: double $color-txt-opacity-1;
            }
          }
        }
        p {
          display: inline-block;
          position: relative;
          i {
            font-weight: 500;
          }
          strong,
          span {
            margin-left: 10px;
          }
        }
      }
      button {
        display: none;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
      &:hover button {
        display: block;
      }
    }
  }
  &__form {
    margin: {
      top: 15px;
    }
    li {
      margin: {
        top: 5px;
      }
    }
  }
}
</style>

<template lang="pug">
.wrap
  h2 {{ title }}
  .my-task
    p.total {{ solvedTask }} / {{ todos.length }}
    ul.my-task__list
      li(v-for="item in todos" :key="'Todo_'+item.id")
        label
          input(type="checkbox" v-model="item.isDone")
          p
            i {{ item.id }}
            strong {{ item.date }}
            span {{ item.task }}
          el-button(@click="deleteTodo(item.id)" type="danger" plain circle icon="el-icon-delete" size="mini")
    .my-task__form
      el-form(:model="form" ref="form")
        el-form-item(prop="date")
          el-date-picker(type="date" placeholder="Date" v-model="form.date" format="yyyy.MM.dd" value-format="yyyy.MM.dd")
          //- el-date-picker(type="date" placeholder="Date" v-model="form.date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions" )
        el-form-item(prop="task")
          el-input(type="text" v-model="form.task")
        el-form-item(class="btn-box")
          el-button(type="primary"  @click="submitForm('form')") 등록
          el-button(type="warning" plain @click="resetForm('form')") 초기화
</template>

<script>
export default {
  name: "Devices",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: {},
  computed: {
    solvedTask() {
      return this.todos.filter(t => {
        return t.isDone;
      }).length;
    },
  },
  data() {
    return {
      todos: [
        {
          id: 1,
          date: "2023.05.14",
          task: "결혼기념일",
          isDone: true,
        },
        {
          id: 2,
          date: "2023.06.14",
          task: "내 생일",
          isDone: false,
        },
        {
          id: 3,
          date: "2023.12.25",
          task: "크리스마스",
          isDone: false,
        },
      ],
      form: {
        date: undefined,
        task: "",
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form.date);
          if (this.form.task) {
            this.todos.push({
              date: this.form.date,
              id: this.todos.length + 1,
              task: this.form.task,
              isDone: false,
            });
            this.form.date = "";
            this.form.task = "";
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    deleteTodo(id) {
      console.log(id);
      this.todos = this.todos.filter(t => {
        return t.id !== id;
      });
    },
  },
};
</script>
