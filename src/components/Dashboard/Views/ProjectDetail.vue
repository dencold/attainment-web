<template>
  <div class="content">
    <div class="card">

      <div class="flex-row title">
        <div class="icon pointer" @click="toggleCompleted">
          <i v-show="project.state === 'completed'" class="fa fa-check-square-o"></i>
          <i v-show="project.state !== 'completed'" class="fa fa-square-o"></i>
        </div>

        <input
          ref="nameInput"
          class="name"
          :value="project.name"
          @input="updateName"
          type="text"
          @keyup.esc="$refs.nameInput.blur()"
          @keyup.stop
        />
      </div>

      <div class="flex-row">
        <div class="icon highlight">
          <i class="ti-pencil"></i>
        </div>
        <div class="name">
          <text-area placeholder="Notes" :value="project.notes" @updated="updateNotes"/>
          </text-area>
        </div>
      </div>

      <hr />

      <text-input placeholder="Add a task" @submitted="addTask"></text-input>
      <vim-movement
        :sectionLens="sectionLens"
        :currSection="currFocusSection"
        :currIndex="currFocusIndex"
        @focusChange="handleMovement">
      </vim-movement>
      <task-card-shortcuts :id="currFocusId"></task-card-shortcuts>

      <div class="flex-col" v-for="(id, index) in projectTasksActive">
        <task-card
          :id="id"
          :isFocused="isFocused(0, index)"
          showProject
          @mouseover.native="updateFocus(0, index)">
        </task-card>
      </div>

      <h6 class="pointer" v-if="projectTasksCompleted.length > 0" @click="toggleShowCompleted">Completed Tasks</h6>

      <div class="flex-col" v-show="showCompleted" v-for="(id, index) in projectTasksCompleted">
        <task-card
          :id="id"
          :isFocused="isFocused(1, index)"
          showProject
          @mouseover.native="updateFocus(1, index)">
        </task-card>
      </div>

      <h6 class="pointer" v-if="projectTasksSnoozed.length > 0" @click="toggleShowSnoozed">Snoozed Tasks</h6>

      <div class="flex-col" v-show="showSnoozed" v-for="(id, index) in projectTasksSnoozed">
        <task-card
          :id="id"
          :isFocused="isFocused(2, index)"
          showProject
          @mouseover.native="updateFocus(2, index)">
        </task-card>
      </div>
    </div>
  </div>
</template>

<script>
  import TaskCard from '@/components/UIComponents/Cards/TaskCard.vue'
  import TextInput from '@/components/UIComponents/Inputs/TextInput.vue'
  import TextArea from '@/components/UIComponents/Inputs/TextArea.vue'
  import VimMovement from '@/components/UIComponents/Inputs/VimMovement.vue'
  import TaskCardShortcuts from '@/components/UIComponents/Inputs/TaskCardShortcuts.vue'

  export default {
    components: {
      'task-card': TaskCard,
      'text-input': TextInput,
      'text-area': TextArea,
      'vim-movement': VimMovement,
      'task-card-shortcuts': TaskCardShortcuts
    },

    data () {
      return {
        showCompleted: false,
        showSnoozed: false,
        currFocusSection: 0,
        currFocusIndex: 0
      }
    },

    props: {
      id: String
    },

    computed: {
      project () {
        return this.$store.state.projects[this.id]
      },
      projectTasksActive () {
        return this.$store.getters.projectTasksActive(this.id)
      },
      projectTasksCompleted () {
        return this.$store.getters.projectTasksCompleted(this.id)
      },
      projectTasksSnoozed () {
        return this.$store.getters.projectTasksSnoozed(this.id)
      },
      sectionLens () {
        let active = this.projectTasksActive.length
        let completed = this.showCompleted ? this.projectTasksCompleted.length : 0
        let snoozed = this.showSnoozed ? this.projectTasksSnoozed.length : 0

        return [active, completed, snoozed]
      },
      currFocusId () {
        if (this.currFocusSection === null || this.currFocusIndex === null) {
          return null
        }

        if (this.currFocusSection === 0) {
          return this.projectTasksActive[this.currFocusIndex]
        } else if (this.currFocusSection === 1) {
          return this.projectTasksCompleted[this.currFocusIndex]
        } else if (this.currFocusSection === 2) {
          return this.projectTasksSnoozed[this.currFocusIndex]
        }
      }
    },

    methods: {
      addTask (taskName) {
        this.$store.dispatch('addTask', {name: taskName, projectId: this.id})
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
      },
      updateName (e) {
        let name = e.target.value
        if (name !== this.project.name) {
          let newProj = this.project
          newProj.name = name
          this.updateProject(newProj)
        }
      },
      updateNotes (newNotes) {
        if (newNotes !== this.project.notes) {
          let newProj = this.project
          newProj.notes = newNotes
          this.updateProject(newProj)
        }
      },
      updateProject (newProj) {
        this.$store.dispatch(
          'updateProject',
          {id: this.id, newProj: newProj}
        )
      },
      toggleCompleted () {
        this.$store.dispatch(
          'toggleProjectCompleted',
          {id: this.id, proj: this.project}
        )
      },
      toggleShowCompleted () {
        this.showCompleted = !this.showCompleted
      },
      toggleShowSnoozed () {
        this.showSnoozed = !this.showSnoozed
      }
    }
  }
</script>

<style scoped>
  h6 {
    padding: 10px 0;
  }
  .pointer {
    cursor: pointer;
  }
  .content {
    font-size: 16px;
    max-width: 750px;
  }
  .card {
    padding: 15px;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
    padding: 0 15px;
    margin: 0 0 5px 0;
  }
  .fa {
    width: auto;
  }
  .title {
    font-size: 200%;
  }
  .project {
    width: 150px;
  }
  .name {
    flex-grow: 1;
    padding: 0 10px;
  }
  .flex-col{
    display: flex;
    flex-direction: column;
  }
  input {
    padding: 0 10px;
    border: none;
  }
</style>
