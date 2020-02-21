<template>
  <modal name="due-selector" height="auto" :pivotY="0.15">
    <div class="content">
      <strong class="title">
        Set Task Due
      </strong>
      <datepicker
        :value="Date()"
        :inline="true"
        @input="updateDue">
      </datepicker>
    </div>
  </modal>
</template>

<script>
  import moment from 'moment'
  import Datepicker from 'vuejs-datepicker'

  export default {
    components: {
      'datepicker': Datepicker
    },

    props: {
      taskId: String
    },

    computed: {
      task () {
        return this.$store.state.tasks[this.taskId]
      }
    },

    methods: {
      updateDue (due) {
        let dt = moment(due)
        dt.hour(0).minute(0).second(0).utc()

        let newTask = this.task
        newTask.dueAt = dt.format()
        newTask.state = 'dateSet'
        this.updateTask(newTask)

        this.$modal.hide('due-selector')
      },

      updateTask (newTask) {
        this.$store.dispatch(
          'updateTask',
          {id: this.taskId, newTask: newTask}
        )
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
