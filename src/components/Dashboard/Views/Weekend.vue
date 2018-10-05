<template>
  <div>
    <vim-movement
      :sectionLens="sectionLens"
      :currSection="0"
      :currIndex="currFocusIndex"
      @focusChange="handleMovement">
    </vim-movement>
    <task-card-shortcuts :id="currFocusId"></task-card-shortcuts>

    <text-input
      placeholder="Add a task"
      @submitted="addTask"
      :focused.sync="isInputFocused">
    </text-input>

    <div class="flex-col" v-for="(id, index) in weekendTasks" :key="index">
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
  import TextInput from '@/components/UIComponents/Inputs/TextInput.vue'
  import VimMovement from '@/components/UIComponents/Inputs/VimMovement.vue'
  import TaskCardShortcuts from '@/components/UIComponents/Inputs/TaskCardShortcuts.vue'

  export default {
    components: {
      'task-card': TaskCard,
      'text-input': TextInput,
      'vim-movement': VimMovement,
      'task-card-shortcuts': TaskCardShortcuts
    },

    data () {
      return {
        currFocusIndex: null,
        isInputFocused: true
      }
    },

    computed: {
      weekendTasks () {
        return this.$store.getters.weekendTasks
      },
      sectionLens () {
        return [this.weekendTasks.length]
      },
      currFocusId () {
        if (this.currFocusIndex === null) {
          return null
        }

        return this.weekendTasks[this.currFocusIndex]
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
  .pointer {
    cursor: pointer;
  }
</style>
