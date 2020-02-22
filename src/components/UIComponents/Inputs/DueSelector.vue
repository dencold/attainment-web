<template>
  <modal name="due-selector" height="auto" :pivotY="0.15" @opened="onOpen">
    <div class="content">
      <strong class="title">
        Set Task Due
      </strong>
      <input
        type="text"
        ref="daysinput"
        v-model.number="numDays"
        placeholder="Number of days"
        @keyup.enter="addDays"
        @keyup.esc="handleEsc"
        @keypress.stop
        @keyup.stop
      >
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

    data () {
      return {
        numDays: ''
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

        this.clear()
        this.$modal.hide('due-selector')
      },

      updateTask (newTask) {
        this.$store.dispatch(
          'updateTask',
          {id: this.taskId, newTask: newTask}
        )
      },

      addDays () {
        let dt = moment().add(this.numDays, 'days')
        this.updateDue(dt)
      },
      focus () {
        this.$refs.daysinput.focus()
      },
      onOpen () {
        this.focus()
      },
      handleEsc () {
        this.clear()
        this.$emit('esc')
        this.$modal.hide('due-selector')
      },
      clear () {
        this.numDays = ''
        this.$refs.daysinput.blur()
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
