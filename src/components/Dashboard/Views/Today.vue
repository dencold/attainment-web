<template>
  <div>
    <vim-movement
      :sectionLens="sectionLens"
      :currSection="0"
      :currIndex="currFocusIndex"
      @focusChange="handleMovement">
    </vim-movement>
    <task-card-shortcuts :id="currFocusId"></task-card-shortcuts>

    <today-stats class="stats"></today-stats>
    <div class="flex-col" v-for="(id, index) in tasksToday" :key="id">
      <task-card
        :id="id"
        :isFocused="isFocused(index)"
        showProject
        @mouseover.native="updateFocus(index)">
      </task-card>
    </div>
  </div>
</template>
<script>
  import TaskCard from '@/components/UIComponents/Cards/TaskCard.vue'
  import TodayStats from '@/components/UIComponents/TodayStats.vue'
  import VimMovement from '@/components/UIComponents/Inputs/VimMovement.vue'
  import TaskCardShortcuts from '@/components/UIComponents/Inputs/TaskCardShortcuts.vue'

  export default {
    components: {
      'task-card': TaskCard,
      'today-stats': TodayStats,
      'vim-movement': VimMovement,
      'task-card-shortcuts': TaskCardShortcuts
    },

    data () {
      return {
        currFocusIndex: 0
      }
    },

    computed: {
      tasksToday () {
        return this.$store.getters.todayTasks
      },
      sectionLens () {
        return [this.tasksToday.length]
      },
      currFocusId () {
        if (this.currFocusIndex === null) {
          return null
        }

        return this.tasksToday[this.currFocusIndex]
      }
    },

    methods: {
      handleMovement (e) {
        this.updateFocus(e.index)
      },
      updateFocus (index) {
        this.currFocusIndex = index
        this.isInputFocused = false
      },
      isFocused (index) {
        return this.currFocusIndex === index
      },
      addTask (taskName) {
        this.$store.dispatch('addTask', {name: taskName, state: 'weekend'})
      }
    }
  }

</script>
<style>
  .main-grid {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 500px 500px;
  }
  .stats {
    justify-content: center;
    grid-column-start: 1;
    grid-column-end: 3;
  }
</style>
