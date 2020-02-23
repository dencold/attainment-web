<template>
  <div class="content">
    <general-task-shortcuts :id="id"></general-task-shortcuts>

    <div v-if="task" class="card">
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
          @keypress.stop
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
        <div class="icon pointer" @click="cycleSize">
          <i class="ti-exchange-vertical"></i>
        </div>
        <span class="name">
          <span class="pointer" @click="cycleSize">{{task.size}}</span>
        </span>
      </div>

      <div class="flex-row highlight">
        <div class="icon pointer" @click="showDatePicker('snooze')">
          <i class="ti-alarm-clock"></i>
        </div>
        <span @click="showDatePicker('snooze')">
          {{task.snoozedUntil}}
        </span>
        <div class="icon pointer" @click="clearDate('snooze')">
          <i class="ti-close"></i>
        </div>
      </div>
      <div class="flex-row highlight">
        <div class="icon pointer" @click="showDatePicker('due')">
          <i class="ti-calendar"></i>
        </div>
        <span @click="showDatePicker('due')">
          {{task.dueAt}}
        </span>
        <div class="icon pointer" @click="clearDate('due')">
          <i class="ti-close"></i>
        </div>
      </div>

      <div class="flex-row">
        <div class="icon highlight">
          <i class="ti-pencil"></i>
        </div>
        <div class="name">
          <text-area ref="notes" placeholder="Notes" :value="task.notes" @updated="updateNotes">
          </text-area>
        </div>
      </div>

    </div>
    <div v-if="!task">TASK NOT FOUND</div>
  </div>    
</template>

<script>
  import TextArea from '@/components/UIComponents/Inputs/TextArea.vue'
  import GeneralTaskShortcuts from '@/components/UIComponents/Inputs/GeneralTaskShortcuts.vue'

  export default {
    components: {
      'text-area': TextArea,
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
          this.$modal.show('due-selector')
        } else if (pickerType === 'snooze') {
          this.$modal.show('snooze-selector')
        }
      },
      handleKeyUp (e) {
        if (e.key === 'n') {
          this.$refs.notes.focus()
        } else if (e.key === 'r') {
          this.$refs.nameInput.focus()
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
      cycleSize () {
        this.$store.dispatch('cycleTaskSize', this.id)
      },
      updateNotes (newNotes) {
        if (newNotes !== this.task.notes) {
          let newTask = this.task
          newTask.notes = newNotes
          this.updateTask(newTask)
        }
      },
      clearDate (dateType) {
        if (dateType === 'snooze') {
          this.task.snoozedUntil = ''
        } else if (dateType === 'due') {
          this.task.dueAt = ''
        }
        this.task.state = 'later'
        this.updateTask(this.task)
      },
      updateTask (newTask) {
        this.$store.dispatch(
          'updateTask',
          {id: this.id, newTask: newTask}
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
    border-radius: 6px;
    box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
    background-color: #ffffff;
    color: #252422;
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
  .dateform {
    width: 215px;
    padding: 0 10px;
  }
  .name {
    flex-grow: 1;
    padding: 0 10px;
  }
  .pom {
    width: 25px;
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
