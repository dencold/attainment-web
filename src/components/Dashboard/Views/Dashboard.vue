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

    <h6>Starred Tasks</h6>
    <div class="flex-col" v-for="(id, index) in tasksStarred">
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
        return this.$store.state.today
      },
      tasksStarred () {
        return this.$store.getters.tasksStarred
      },
      tasksDue () {
        return this.$store.getters.tasksDue
      },
      sectionLens () {
        let now = this.nowId ? 1 : 0
        let today = this.tasksToday.length
        let starred = this.tasksStarred.length
        let due = this.tasksDue.length

        return [now, today, starred, due]
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
          return this.tasksStarred[this.currFocusIndex]
        } else if (this.currFocusSection === 3) {
          return this.tasksDue[this.currFocusIndex]
        }
      }
    },

    methods: {
      addTask (taskName) {
        this.$store.dispatch('addTask', {name: taskName})
      },
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
