<template>
  <div>
    <vim-movement
      :sectionLens="sectionLens"
      :currSection="currFocusSection"
      :currIndex="currFocusIndex"
      @focusChange="handleMovement">
    </vim-movement>
    <task-card-shortcuts :id="currFocusId"></task-card-shortcuts>

    <div class="main-grid">
      <today-stats class="stats"></today-stats>

      <div>
        <h6>Snooze Triggered</h6>
        <div v-for="(id, index) in snoozeTriggered" :key="id">
          <task-card
            :id="id"
            :isFocused="isFocused(0, index)"
            showProject
            @mouseover.native="updateFocus(0, index)">
          </task-card>
        </div>

      </div>

      <div>
        <h6>Due Soon</h6>
        <div v-for="(id, index) in dueSoon" :key="id">
          <task-card
            :id="id"
            :isFocused="isFocused(1, index)"
            showProject
            @mouseover.native="updateFocus(1, index)">
          </task-card>
        </div>
      </div>

      <div class="later">
        <h6>Starred Later</h6>
        <div v-for="(id, index) in starred" :key="id">
          <task-card
            :id="id"
            :isFocused="isFocused(2, index)"
            showProject
            @mouseover.native="updateFocus(2, index)">
          </task-card>
        </div>
      </div>

      <h6>Starred Projects</h6>
      <div class="projects">
        <div v-for="(id, index) in projects" :key="id">
          <project-card
            :id="id"
            :isFocused="isFocused(3, index)"
            @mouseover.native="updateFocus(3, index)">
          </project-card>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import TaskCard from '@/components/UIComponents/Cards/TaskCard.vue'
  import ProjectCard from '@/components/UIComponents/Cards/ProjectCard.vue'
  import TodayStats from '@/components/UIComponents/TodayStats.vue'
  import VimMovement from '@/components/UIComponents/Inputs/VimMovement.vue'
  import TaskCardShortcuts from '@/components/UIComponents/Inputs/TaskCardShortcuts.vue'

  export default {
    components: {
      'task-card': TaskCard,
      'project-card': ProjectCard,
      'today-stats': TodayStats,
      'vim-movement': VimMovement,
      'task-card-shortcuts': TaskCardShortcuts
    },

    data () {
      return {
        currFocusSection: 0,
        currFocusIndex: 0
      }
    },

    computed: {
      snoozeTriggered () {
        return this.$store.getters.tasksSnoozeTriggered
      },
      dueSoon () {
        return this.$store.getters.tasksDueWithin(5)
      },
      starred () {
        return this.$store.getters.tasksStarred
      },
      projects () {
        return this.$store.getters.projectsStarred
      },
      sectionLens () {
        let snoozed = this.snoozeTriggered.length
        let due = this.dueSoon.length
        let star = this.starred.length
        let projs = this.projects.length

        return [snoozed, due, star, projs]
      },
      currFocusId () {
        if (this.currFocusSection === null || this.currFocusIndex === null) {
          return null
        }

        if (this.currFocusSection === 0) {
          return this.snoozeTriggered[this.currFocusIndex]
        } else if (this.currFocusSection === 1) {
          return this.dueSoon[this.currFocusIndex]
        } else if (this.currFocusSection === 2) {
          return this.starred[this.currFocusIndex]
        } else if (this.currFocusSection === 3) {
          return this.projects[this.currFocusIndex]
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
  .stats {
    justify-content: center;
    grid-column-start: 1;
    grid-column-end: 3;
    margin-bottom: 20px;
  }
  .later {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .projects {
    grid-column-start: 1;
    grid-column-end: 3;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
</style>
