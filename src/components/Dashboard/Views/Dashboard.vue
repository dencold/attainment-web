<template>
  <div>
    <vim-movement
      :sectionLens="sectionLens"
      :currSection="currFocusSection"
      :currIndex="currFocusIndex"
      @focusChange="handleMovement">
    </vim-movement>
    <task-card-shortcuts :id="currFocusId"></task-card-shortcuts>

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
    <div class="flex-col" v-for="(id, index) in tasksToday" :key="index">
      <task-card
        :id="id"
        :isFocused="isFocused(1, index)"
        showProject
        @mouseover.native="updateFocus(1, index)">
      </task-card>
    </div>

    <h6>Week</h6>
    <div class="flex-col" v-for="(id, index) in tasksWeek" :key="index">
      <task-card
        :id="id"
        :isFocused="isFocused(2, index)"
        showProject
        @mouseover.native="updateFocus(2, index)">
      </task-card>
    </div>

    <h6>Backlog</h6>
    <div class="flex-col" v-for="(id, index) in tasksBacklog" :key="index">
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
  import TaskCard from '@/components/UIComponents/Cards/TaskCard.vue'
  import VimMovement from '@/components/UIComponents/Inputs/VimMovement.vue'
  import TaskCardShortcuts from '@/components/UIComponents/Inputs/TaskCardShortcuts.vue'

  export default {
    components: {
      'task-card': TaskCard,
      'vim-movement': VimMovement,
      'task-card-shortcuts': TaskCardShortcuts
    },

    data () {
      return {
        currFocusSection: this.nowId ? 0 : 1,
        currFocusIndex: 0
      }
    },

    computed: {
      nowId () {
        return this.$store.getters.nowTask
      },
      tasksToday () {
        return this.$store.getters.todayTasks
      },
      tasksWeek () {
        return this.$store.getters.weekView
      },
      tasksBacklog () {
        return this.$store.getters.backlogView
      },
      sectionLens () {
        let now = this.nowId ? 1 : 0
        let today = this.tasksToday.length
        let week = this.tasksWeek.length
        let backlog = this.tasksBacklog.length

        return [now, today, week, backlog]
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
          return this.tasksBacklog[this.currFocusIndex]
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
