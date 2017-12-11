<template>
  <div class="content">
    <div class="card">

      <div class="flex-row title">
        <div class="icon" @click="toggleStar">
          <i v-show="task.completed" class="fa fa-check-square-o"></i>
          <i v-show="!task.completed" class="fa fa-square-o"></i>
        </div>
        <span class="name">{{task.name}}</span>
        <div class="icon" @click="toggleStar">
          <i v-show="task.starred" class="fa fa-star"></i>
          <i v-show="!task.starred" class="fa fa-star-o"></i>
        </div>
      </div>

      <hr/>

      <div class="flex-row highlight">
        <div class="icon" @click="toggleStar">
          <i class="ti-folder"></i>
        </div>
        <span class="name">{{project.name}}</span>
      </div>

      <div class="flex-row highlight">
        <div class="icon" @click="toggleStar">
          <i class="ti-bolt"></i>
        </div>
        <span class="name">{{task.poms}}</span>
      </div>

      <div class="flex-row highlight">
        <div class="icon" @click="toggleStar">
          <i class="ti-calendar"></i>
        </div>
        <datetime
          :value="task.dueAt"
          @input="updateDue"
          placeholder="Set due date"
          class="name"
          input-class="datetime-input"
          auto-close>
        </datetime>
      </div>

      <div class="flex-row">
        <div class="icon highlight" @click="toggleStar">
          <i class="ti-pencil"></i>
        </div>
        <span class="name">{{task.details}}</span>
      </div>

    </div>
  </div>    
</template>

<script>
  import TextInput from 'components/UIComponents/Inputs/TextInput.vue'
  import { Datetime } from 'vue-datetime'

  export default {
    components: {
      'text-input': TextInput,
      'datetime': Datetime
    },

    props: {
      id: String
    },

    computed: {
      task () {
        return this.$store.state.tasks[this.id]
      },
      project () {
        return this.$store.state.projects[this.task.projectId]
      }
    },

    methods: {
      toggleStar () {
        let newTask = this.task
        newTask.starred = !this.task.starred
        this.updateTask(newTask)
      },
      updateDue (dueAt) {
        if (dueAt !== this.task.dueAt) {
          let newTask = this.task
          newTask.dueAt = dueAt
          this.updateTask(newTask)
        }
      },
      updateTask (newTask) {
        this.$store.dispatch(
          'updateTask',
          {id: this.id, newTask: newTask}
        )
      }
    }
  }
</script>

<style scoped>
  .content {
    font-size: 16px;
  }
  .card {
    padding: 15px;
  }
  .highlight {
    color: #3091B2;
  }
  .flex-row {
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 15px 0 15px;
  }
  .icon {
    display: flex;
    width: auto;
    font-size: 95%;
    justify-content: center;
    align-items: baseline;
  }
  .title {
    font-size: 200%;
  }
  .project {
    width: 150px;
  }
  .name {
    flex-grow: 1;
    padding: 0 10px 0 10px;
  }
  .pom {
    width: 25px;
  }
  .due {
    width: 25px;
    text-align: right;
  }
  .flex-col{
    display: flex;
    flex-direction: column;
  }
  .content {
    max-width: 750px;
  }
  input {
    padding: 0 10px 0 10px;
    border: none;
  }
</style>
