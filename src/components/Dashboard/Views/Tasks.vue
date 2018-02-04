<template>
  <div>
    <text-input placeholder="Add a task" @submitted="addTask"></text-input>

    <div class="flex-col" v-for="(task, id) in tasksActive">
      <task-card
        :id="id"
        :task="task"
        :projectId="task.projectId"
        :isFocused="id === currFocusId"
        @click.native="toTask(id)">
      </task-card>
    </div>

    <h6 class="pointer" v-if="Object.keys(tasksSnoozed).length > 0" @click="toggleShowSnoozed">Snoozed Tasks</h6>

    <div class="flex-col" v-show="showSnoozed" v-for="(task, id) in tasksSnoozed">
      <task-card :id="id" :task="task" @click.native="toTask(id)"></task-card>
    </div>

  </div>
</template>
<script>
  import TaskCard from 'components/UIComponents/Cards/TaskCard.vue'
  import TextInput from 'components/UIComponents/Inputs/TextInput.vue'

  export default {
    components: {
      'task-card': TaskCard,
      'text-input': TextInput
    },

    data () {
      return {
        showSnoozed: false,
        currFocusIndex: null,
        currFocusId: null
      }
    },

    computed: {
      tasksActive () {
        return this.$store.getters.tasksActive
      },
      tasksSnoozed () {
        return this.$store.getters.tasksSnoozed
      }
    },

    created () {
      document.addEventListener('keyup', this.handleKeyUp)
    },

    destroyed () {
      document.removeEventListener('keyup', this.handleKeyUp)
      this.focused = null
    },

    methods: {
      handleKeyUp (e) {
        if (e.key === 'j') {
          this.moveDown()
        } else if (e.key === 'k') {
          this.moveUp()
        } else if (e.key === 'o') {
          this.toTask(this.currFocusId)
        }
      },
      addTask (e) {
        const taskName = e.trim()

        if (taskName.length === 0) {
          console.log('ERROR! Please specify a task name')
        } else {
          const newTask = {
            name: taskName,
            projectId: '',
            notes: '',
            starred: false,
            poms_completed: 0,
            poms_total: 0,
            dueAt: '',
            snoozedUntil: '',
            completed: false,
            completedAt: ''
          }
          this.$store.dispatch('addTask', newTask)
        }
      },
      toTask: function (taskId) {
        this.$router.push({name: 'task', params: { id: taskId }})
      },
      toggleShowSnoozed () {
        this.showSnoozed = !this.showSnoozed
      },
      moveDown () {
        if (this.currFocusIndex === null) {
          this.initFocus()
        } else {
          let keys = Object.keys(this.tasksActive)
          if (this.currFocusIndex < keys.length - 1) {
            this.currFocusIndex += 1
            this.currFocusId = keys[this.currFocusIndex]
          }
        }
      },
      moveUp () {
        if (this.currFocusIndex === null) {
          this.initFocus()
        } else {
          let keys = Object.keys(this.tasksActive)
          if (this.currFocusIndex > 0) {
            this.currFocusIndex -= 1
            this.currFocusId = keys[this.currFocusIndex]
          }
        }
      },
      initFocus () {
        this.currFocusIndex = 0
        this.currFocusId = Object.keys(this.tasksActive)[0]
      }
    }
  }

</script>
<style>
  .pointer {
    cursor: pointer;
  }
</style>
