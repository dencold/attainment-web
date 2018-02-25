<template>
  <div>
    <!--    <vim-movement :items="tasksActive" @focusChange="updateFocus"></vim-movement>
      <task-shortcuts :id="currFocusId"></task-shortcuts> -->

    <text-input placeholder="Add a task" @submitted="addTask"></text-input>

    <div class="flex-col" v-for="id in tasksActive">
      <task-card
        :id="id"
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
  import VimMovement from 'components/UIComponents/Inputs/VimMovement.vue'
  import TaskShortcuts from 'components/UIComponents/Inputs/TaskShortcuts.vue'

  export default {
    components: {
      'task-card': TaskCard,
      'text-input': TextInput,
      'vim-movement': VimMovement,
      'task-shortcuts': TaskShortcuts
    },

    data () {
      return {
        showSnoozed: false,
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

    methods: {
      handleKeyUp (e) {
        if (e.key === 'o') {
          this.toTask(this.currFocusId)
        }
      },
      updateFocus (e) {
        this.currFocusId = e.id
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
      }
    }
  }

</script>
<style>
  .pointer {
    cursor: pointer;
  }
</style>
