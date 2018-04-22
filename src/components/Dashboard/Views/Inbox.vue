<template>
  <div>
    <vim-movement
      :sectionLens="sectionLens"
      :currSection="0"
      :currIndex="currFocusIndex"
      @focusChange="handleMovement">
    </vim-movement>
    <task-card-shortcuts :id="currFocusId"></task-card-shortcuts>

    <text-input placeholder="Add a task" @submitted="addTask"></text-input>

    <div class="flex-col" v-for="(id, index) in inboxTasks">
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
        currFocusIndex: null
      }
    },

    computed: {
      inboxTasks () {
        return this.$store.getters.inboxTasks
      },
      sectionLens () {
        return [this.inboxTasks.length]
      },
      currFocusId () {
        if (this.currFocusIndex === null) {
          return null
        }

        return this.inboxTasks[this.currFocusIndex]
      }
    },

    methods: {
      handleMovement (e) {
        this.updateFocus(e.index)
      },
      updateFocus (index) {
        this.currFocusIndex = index
      },
      isFocused (index) {
        return this.currFocusIndex === index
      },
      addTask (taskName) {
        this.$store.dispatch('addTask', {name: taskName})
      }
    }
  }

</script>
<style>
  .pointer {
    cursor: pointer;
  }
</style>
