<template>
  <modal name="date-selector" height="auto" :pivotY="0.15" @opened="onOpen">
    <div class="content">
      <strong class="title">
        Snooze Task
      </strong>
      <datetime
        ref="snoozepicker"
        :value="task.snoozedUntil"
        @input="updateSnooze"
        placeholder="Set snooze"
        class="dateform"
        type="date"
        input-format="YYYY-MM-DD"
        input-class="datetime-input"
        auto-close>
      </datetime>
      <button class="btn btn-fill btn-info inpBtn">Move</button>
      <button class="btn btn-fill btn-info inpBtn" @click="createProject">Create</button>
    </div>
  </modal>
</template>

<script>
  import { Datetime } from 'vue-datetime'

  export default {
    components: {
      'datetime': Datetime
    },

    props: {
      taskId: String
    },

    computed: {
      task () {
        return this.$store.state.tasks[this.taskId]
      }
    },

    data () {
      return {
        queryInput: ''
      }
    },

    methods: {
      updateSnooze (snooze) {
        if (snooze !== this.task.snoozedUntil) {
          let newTask = this.task
          newTask.snoozedUntil = snooze
          newTask.state = 'dateSet'
          this.updateTask(newTask)
        }
        this.$modal.hide('date-selector')
      },
      changeProject (project) {
        let newTask = this.task
        newTask.projectId = project.id
        this.updateTask(newTask)
        this.$modal.hide('move-task')
      },
      onOpen () {
        console.log('opened')
      },
      updateTask (newTask) {
        this.$store.dispatch(
          'updateTask',
          {id: this.taskId, newTask: newTask}
        )
      },
      createProject () {
        this.$store.dispatch(
          'addProjectAndSetTask',
          {projectName: this.queryInput, taskId: this.taskId, task: this.task}
        )
        this.$modal.hide('move-task')
      }
    }
  }

</script>
<style scoped>
  .dateform {
    width: 215px;
    padding: 0 10px;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .inpBtn {
    padding: 1px 5px;
  }
  .pointer {
    cursor: pointer;
  }
  .highlight {
    color: #3091B2;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
    padding: 0 15px;
    margin: 0 0 5px 0;
  }
  .fa {
    width: auto;
  }
  .name {
    padding: 0 10px;
  }
</style>
