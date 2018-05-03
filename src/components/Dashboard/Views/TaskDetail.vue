<template>
  <div class="content">
    <general-task-shortcuts :id="id"></general-task-shortcuts>

    <div v-if="task" class="card">
      <project-selector
        :project-id="task.projectId"
        @change-project="changeProject"
        @create-project="createProject">
      </project-selector>

      <div class="flex-row title">
        <div class="icon pointer" @click="toggleCompleted">
          <i v-show="task.state === 'completed'" class="fa fa-check-square-o"></i>
          <i v-show="task.state !== 'completed'" class="fa fa-square-o"></i>
        </div>

        <input
          ref="nameInput"
          class="name"
          :value="task.name"
          @input="updateName"
          type="text"
          @keyup.esc="$refs.nameInput.blur()"
          @keyup.stop
        />

        <div class="icon pointer" @click="toggleStar">
          <i v-show="task.starred" class="fa fa-star"></i>
          <i v-show="!task.starred" class="fa fa-star-o"></i>
        </div>
      </div>

      <hr/>

      <div class="flex-row highlight pointer" >
        <div class="icon">
          <i class="ti-direction-alt"></i>
        </div>
        <span class="name">{{task.state}}</span>
      </div>

      <div class="flex-row highlight pointer" >
        <div class="icon" @click="clickAction">
          <i class="ti-folder"></i>
        </div>
        <span class="name" @click="clickAction">{{projectName}}</span>
      </div>

      <div class="flex-row highlight">
        <div class="icon pointer" @click="incrementPom('completed')">
          <i class="ti-bolt"></i>
        </div>
        <span class="name">
          <span class="pointer" @click="incrementPom('completed')">{{task.poms_completed}} /</span>
          <span class="pointer" @click="incrementPom('total')">{{task.poms_total}}</span>
        </span>
      </div>

      <div class="flex-row highlight">
        <div class="icon pointer" @click="showDatePicker('snooze')">
          <i class="ti-alarm-clock"></i>
        </div>
        <datetime
          ref="snoozepicker"
          :value="task.snoozedUntil"
          @input="updateSnooze"
          placeholder="Set snooze"
          class="name"
          type="date"
          input-format="YYYY-MM-DD"
          input-class="datetime-input"
          auto-close>
        </datetime>
      </div>
      <div class="flex-row highlight">
        <div class="icon pointer" @click="showDatePicker('due')">
          <i class="ti-calendar"></i>
        </div>
        <datetime
          ref="duepicker"
          :value="task.dueAt"
          @input="updateDue"
          placeholder="Set due date"
          class="name"
          type="date"
          input-format="YYYY-MM-DD"
          input-class="datetime-input"
          auto-close>
        </datetime>
      </div>

      <div class="flex-row">
        <div class="icon highlight">
          <i class="ti-pencil"></i>
        </div>
        <div class="name">
          <text-area ref="notes" placeholder="Notes" :value="task.notes" @updated="updateNotes"/>
          </text-area>
        </div>
      </div>

    </div>
    <div v-if="!task">TASK NOT FOUND</div>
  </div>    
</template>

<script>
  import TextInput from 'components/UIComponents/Inputs/TextInput.vue'
  import TextArea from 'components/UIComponents/Inputs/TextArea.vue'
  import ProjectSelector from 'components/UIComponents/Inputs/ProjectSelector.vue'
  import GeneralTaskShortcuts from 'components/UIComponents/Inputs/GeneralTaskShortcuts.vue'
  import { Datetime } from 'vue-datetime'

  export default {
    components: {
      'text-input': TextInput,
      'text-area': TextArea,
      'project-selector': ProjectSelector,
      'datetime': Datetime,
      'general-task-shortcuts': GeneralTaskShortcuts
    },

    props: {
      id: String
    },

    computed: {
      task () {
        return this.$store.state.tasks[this.id]
      },
      project () {
        return this.$store.state.projects[this.task.projectId]
      },
      projectName () {
        return this.project ? this.project.name : 'Move To Project'
      }
    },

    created () {
      document.addEventListener('keyup', this.handleKeyUp)
    },

    destroyed () {
      document.removeEventListener('keyup', this.handleKeyUp)
    },

    methods: {
      showDatePicker (pickerType) {
        if (pickerType === 'due') {
          this.$refs.duepicker.open()
        } else if (pickerType === 'snooze') {
          this.$refs.snoozepicker.open()
        }
      },
      handleKeyUp (e) {
        if (e.key === 'd') {
          this.showDatePicker('due')
        } else if (e.key === 'r') {
          this.$refs.nameInput.focus()
        } else if (e.key === 'n') {
          this.$refs.notes.focus()
        } else if (e.key === 'm') {
          this.$modal.show('move-task')
        } else if (e.key === 'Z') {
          this.showDatePicker('snooze')
        }
      },
      // there's a lot of boilerplate repeated code that I'm really unhappy with
      // but this is what we're left with in the Vuex model. we need to use
      // computed properties for accessing the data and that is read-only I might
      // switch this all into the store's actions, but that's a future refactoring
      // see more:
      // https://vuex.vuejs.org/en/forms.html
      updateName (e) {
        let name = e.target.value
        if (name !== this.task.name) {
          let newTask = this.task
          newTask.name = name
          this.updateTask(newTask)
        }
      },
      toggleStar () {
        let newTask = this.task
        newTask.starred = !this.task.starred
        this.updateTask(newTask)
      },
      toggleCompleted () {
        this.$store.dispatch(
          'toggleTaskCompleted',
          {id: this.id, task: this.task}
        )
      },
      updateSnooze (snooze) {
        if (snooze !== this.task.snoozedUntil) {
          let newTask = this.task
          newTask.snoozedUntil = snooze
          this.updateTask(newTask)
        }
      },
      updateDue (dueAt) {
        if (dueAt !== this.task.dueAt) {
          let newTask = this.task
          newTask.dueAt = dueAt
          this.updateTask(newTask)
        }
      },
      updateNotes (newNotes) {
        if (newNotes !== this.task.notes) {
          let newTask = this.task
          newTask.notes = newNotes
          this.updateTask(newTask)
        }
      },
      updateTask (newTask) {
        this.$store.dispatch(
          'updateTask',
          {id: this.id, newTask: newTask}
        )
      },
      changeProject (project) {
        let newTask = this.task
        newTask.projectId = project.id
        this.updateTask(newTask)
      },
      createProject (projectName) {
        this.$store.dispatch(
          'addProjectAndSetTask',
          {projectName: projectName, taskId: this.id, task: this.task}
        )
      },
      clickAction () {
        if (this.task.projectId) {
          this.jumpToProj()
        } else {
          this.$modal.show('move-task')
        }
      },
      jumpToProj () {
        if (this.task.projectId) {
          this.$router.push({name: 'project', params: { id: this.task.projectId }})
        }
      }
    }
  }
</script>

<style scoped>
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
  .highlight {
    color: #3091B2;
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
  .pom {
    width: 25px;
  }
  .due {
    width: 25px;
    text-align: right;
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
