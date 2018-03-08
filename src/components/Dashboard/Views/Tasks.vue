<template>
  <div>
    <vim-movement
      :sectionLens="sectionLens"
      :currSection="currFocusSection"
      :currIndex="currFocusIndex"
      @focusChange="handleMovement">
    </vim-movement>
    <task-shortcuts :id="currFocusId"></task-shortcuts>

    <text-input placeholder="Add a task" @submitted="addTask"></text-input>

    <div class="flex-col" v-for="(id, index) in tasksActive">
      <task-card
        :id="id"
        :isFocused="isFocused(0, index)"
        showProject
        @mouseover.native="updateFocus(0, index)">
      </task-card>
    </div>

    <h6 class="pointer" v-if="tasksSnoozed.length > 0" @click="toggleShowSnoozed">Snoozed Tasks</h6>

    <div class="flex-col" v-show="showSnoozed" v-for="(id, index) in tasksSnoozed">
      <task-card
        :id="id"
        :isFocused="isFocused(1, index)"
        showProject
        @mouseover.native="updateFocus(1, index)">
      </task-card>
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
        currFocusSection: null,
        currFocusIndex: null
      }
    },

    computed: {
      tasksActive () {
        return this.$store.getters.tasksActive
      },
      tasksSnoozed () {
        return this.$store.getters.tasksSnoozed
      },
      sectionLens () {
        if (this.showSnoozed) {
          return [this.tasksActive.length, this.tasksSnoozed.length]
        } else {
          return [this.tasksActive.length, 0]
        }
      },
      currFocusId () {
        if (this.currFocusSection === null || this.currFocusIndex === null) {
          return null
        }

        if (this.currFocusSection === 0) {
          return this.tasksActive[this.currFocusIndex]
        } else if (this.currFocusSection === 1) {
          return this.tasksSnoozed[this.currFocusIndex]
        }
      }
    },

    methods: {
      handleMovement (e) {
        this.updateFocus(e.section, e.index)
      },
      updateFocus (section, index) {
        this.currFocusSection = section
        this.currFocusIndex = index
      },
      isFocused (section, index) {
        return (this.currFocusSection === section && this.currFocusIndex === index)
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
