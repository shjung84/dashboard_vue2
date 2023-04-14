<style lang="scss">
h3 {
  text-align: right;
  font-size: 10px;
  color: $color-txt;
}
.my-task {
  &__list {
    margin-top: 5px;
    border-top: 1px solid var(--color-border--opacity-1);
    border: 1px solid #000;
    @include border-radius(25px);

    li {
      position: relative;
      padding: 10px;
      border-bottom: 1px solid var(--color-border--opacity-1);
      &:hover {
        background-color: var(--color-theme-opacity-1);
      }
      label {
        display: block;
        position: relative;
        input[type="checkbox"] {
          display: none;
        }
        input[type="checkbox"]:checked {
          & + p {
            color: var(--color--opacity-3);
            &:after {
              content: "";
              position: absolute;
              top: 50%;
              left: 0;
              width: 100%;
              border-top: double var(--color--opacity-1);
            }
          }
        }
        p {
          display: inline-block;
          position: relative;
          i {
            font-weight: 500;
          }
          strong {
            margin-left: 10px;
          }
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
    h3 [ {{ solvedTask }} / {{ todos.length }} ]
    ul.my-task__list
      li(v-for="item in todos" :key="'Todo_'+item.id")
        label
          input(type="checkbox" v-model="item.isDone")
          p
            i {{ item.id }}
            strong {{ item.date }}
            span {{ item.task }}
          el-button(@click="deleteTodo(item.id)" type="danger" plain circle icon="el-icon-delete" size="mini")
    form(@submit.prevent="addTodo" class="my-task__form")
      ul
        li
          input(type="text" name="date" v-model="form.date" placeholder="날짜")
        li
          input(type="text" name="task" v-model="form.task" placeholder="내용입력")
      .btn-box
        button 등록
        button(@click.prevent="reloadPage") 초기화
        //- el-button(type="primary") 등록
        //- el-button(@click.prevent="reloadPage" type="warning") 초기화

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
        id: "",
        date: "",
        task: "",
      },
    };
  },
  methods: {
    addTodo() {
      console.log(`addTodo !!!!!`);
      if (this.form.task) {
        this.todos.push({
          date: this.form.date,
          id: this.todos.length + 1,
          task: this.form.task,
          isDone: false,
        });
        this.form.date = "";
        this.form.task = "";
      } else {
        console.log(`None`);
      }
    },
    deleteTodo(id) {
      console.log(id);
      this.todos = this.todos.filter(t => {
        return t.id !== id;
      });
    },
    reloadPage() {
      console.log(`reload`);
      window.location.reload();
    },
  },
};
</script>
