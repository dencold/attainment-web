<template>
  <div>
    <vim-movement
      :sectionLens="sectionLens"
      :currSection="currFocusSection"
      :currIndex="currFocusIndex"
      :jumpingEnabled="false"
      @focusChange="handleMovement">
    </vim-movement>
    <task-card-shortcuts :id="currFocusId"></task-card-shortcuts>

    <ul id="tabs" class="nav nav-tabs">
      <li :class="{active: tab == tabSelected}" v-for="tab in tabData">
        <a :href="'#' + tab">{{tab}}</a>
      </li>
    </ul>

    <div class="tab-content">
      <div class="flex-col tab-pane" :class="{active: tabSelected === 'backlog'}" v-for="(id, index) in tasksActive">
        <task-card
          :id="id"
          :isFocused="isFocused(0, index)"
          showProject
          @mouseover.native="updateFocus(0, index)">
        </task-card>
      </div>
      <div class="flex-col tab-pane" :class="{active: tabSelected === 'snoozed'}" v-for="(id, index) in tasksSnoozed">
        <task-card
          :id="id"
          :isFocused="isFocused(1, index)"
          showProject
          @mouseover.native="updateFocus(1, index)">
        </task-card>
      </div>
      <div class="flex-col tab-pane" :class="{active: tabSelected === 'due'}" v-for="(id, index) in tasksDue">
        <task-card
          :id="id"
          :isFocused="isFocused(2, index)"
          showProject
          @mouseover.native="updateFocus(2, index)">
        </task-card>
      </div>
      <div class="flex-col tab-pane" :class="{active: tabSelected === 'completed'}" v-for="(id, index) in tasksCompleted">
        <task-card
          :id="id"
          :isFocused="isFocused(3, index)"
          showProject
          @mouseover.native="updateFocus(3, index)">
        </task-card>
      </div>
    </div>

  </div>
</template>
<script>
  import TaskCard from 'components/UIComponents/Cards/TaskCard.vue'
  import TextInput from 'components/UIComponents/Inputs/TextInput.vue'
  import VimMovement from 'components/UIComponents/Inputs/VimMovement.vue'
  import TaskCardShortcuts from 'components/UIComponents/Inputs/TaskCardShortcuts.vue'

  export default {
    components: {
      'task-card': TaskCard,
      'text-input': TextInput,
      'vim-movement': VimMovement,
      'task-card-shortcuts': TaskCardShortcuts
    },

    data () {
      return {
        showSnoozed: false,
        currFocusSection: 0,
        currFocusIndex: 0,
        tabData: [ 'backlog', 'snoozed', 'due', 'completed' ]
      }
    },

    watch: {
      '$route.hash' (to, from) {
        let tabIndex = this.tabData.indexOf(this.tabSelected)

        if (tabIndex !== -1) {
          this.currFocusSection = tabIndex
          this.currFocusIndex = 0
        }
      }
    },

    computed: {
      tasksActive () {
        return this.$store.getters.tasksActive
      },
      tasksSnoozed () {
        return this.$store.getters.tasksSnoozed
      },
      tasksDue () {
        return this.$store.getters.tasksDue
      },
      tasksCompleted () {
        return this.$store.getters.tasksCompleted
      },
      sectionLens () {
        return [
          this.tasksActive.length,
          this.tasksSnoozed.length,
          this.tasksDue.length,
          this.tasksCompleted.length
        ]
      },
      currFocusId () {
        if (this.currFocusSection === null || this.currFocusIndex === null) {
          return null
        }

        if (this.currFocusSection === 0) {
          return this.tasksActive[this.currFocusIndex]
        } else if (this.currFocusSection === 1) {
          return this.tasksSnoozed[this.currFocusIndex]
        } else if (this.currFocusSection === 2) {
          return this.tasksDue[this.currFocusIndex]
        } else if (this.currFocusSection === 3) {
          return this.tasksCompleted[this.currFocusIndex]
        }
      },
      tabSelected () {
        if (this.$route.hash) {
          return this.$route.hash.substring(1)
        }

        // default to backlog if user hasn't selected a tab
        return 'backlog'
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
      }
    }
  }

</script>
<style>
  .pointer {
    cursor: pointer;
  }
</style>
