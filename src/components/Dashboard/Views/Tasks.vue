<template>
  <div>
    <vim-movement
      :sectionLens="sectionLens"
      :currSection="currFocusSection"
      :currIndex="currFocusIndex"
      @focusChange="handleMovement">
    </vim-movement>
    <task-shortcuts :id="currFocusId"></task-shortcuts>

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
        currFocusIndex: null,
        tabData: [ 'backlog', 'snoozed', 'due', 'completed' ]
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
