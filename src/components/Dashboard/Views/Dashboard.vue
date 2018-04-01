<template>
  <div>
    <vim-movement
      :sectionLens="sectionLens"
      :currSection="currFocusSection"
      :currIndex="currFocusIndex"
      @focusChange="handleMovement">
    </vim-movement>
    <task-shortcuts :id="currFocusId"></task-shortcuts>

    <h6>Now</h6>
    <div class="flex-col">
      <task-card
        :id="nowId"
        :isFocused="isFocused(0, 0)"
        showProject
        @mouseover.native="updateFocus(0, 0)">
      </task-card>
    </div>

    <h6>Today</h6>
    <div class="flex-col" v-for="(id, index) in tasksToday">
      <task-card
        :id="id"
        :isFocused="isFocused(1, index)"
        showProject
        @mouseover.native="updateFocus(1, index)">
      </task-card>
    </div>

    <h6>Week</h6>
    <div class="flex-col" v-for="(id, index) in tasksWeek">
      <task-card
        :id="id"
        :isFocused="isFocused(2, index)"
        showProject
        @mouseover.native="updateFocus(2, index)">
      </task-card>
    </div>

    <h6>Due Tasks</h6>
    <div class="flex-col" v-for="(id, index) in tasksDue">
      <task-card
        :id="id"
        :isFocused="isFocused(3, index)"
        showProject
        @mouseover.native="updateFocus(3, index)">
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
        currFocusSection: null,
        currFocusIndex: null
      }
    },

    computed: {
      nowId () {
        return this.$store.state.now
      },
      tasksToday () {
        return this.$store.getters.todayTasks
      },
      tasksWeek () {
        return this.$store.getters.weekView
      },
      tasksDue () {
        return this.$store.getters.tasksDue
      },
      sectionLens () {
        let now = this.nowId ? 1 : 0
        let today = this.tasksToday.length
        let week = this.tasksWeek.length
        let due = this.tasksDue.length

        return [now, today, week, due]
      },
      currFocusId () {
        if (this.currFocusSection === null || this.currFocusIndex === null) {
          return null
        }

        if (this.currFocusSection === 0) {
          return this.nowId
        } else if (this.currFocusSection === 1) {
          return this.tasksToday[this.currFocusIndex]
        } else if (this.currFocusSection === 2) {
          return this.tasksWeek[this.currFocusIndex]
        } else if (this.currFocusSection === 3) {
          return this.tasksDue[this.currFocusIndex]
        }
      }
    },

    methods: {
      updateFocus (section, index) {
        this.currFocusSection = section
        this.currFocusIndex = index
      },
      isFocused (section, index) {
        return (this.currFocusSection === section && this.currFocusIndex === index)
      },
      handleMovement (e) {
        this.updateFocus(e.section, e.index)
      }
    }
  }

</script>
<style>

</style>
