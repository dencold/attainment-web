<template>
  <div class="content">
    <project-selector ref="projsel" :project-id="task.projectId" @change-project="changeProject"></project-selector>

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
</template>

<script>
  import ProjectSelector from 'components/UIComponents/Inputs/ProjectSelector.vue'
  import { Datetime } from 'vue-datetime'
  import moment from 'moment'

  export default {
    components: {
      'project-selector': ProjectSelector,
      'datetime': Datetime
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
      }
    },

    created () {
      document.addEventListener('keyup', this.handleKeyUp)
    },

    destroyed () {
      document.removeEventListener('keyup', this.handleKeyUp)
    },

    methods: {
      handleKeyUp (e) {
        if (e.key === 's') {
          this.toggleStar()
        } else if (e.key === 'c') {
          this.toggleCompleted()
        } else if (e.key === 'd') {
          this.showDatePicker('due')
        } else if (e.key === 'e') {
          this.$refs.nameInput.focus()
        } else if (e.key === 'n') {
          this.$refs.notes.focus()
        } else if (e.key === 'm') {
          this.$refs.projsel.openSearch()
        } else if (e.key === 'b') {
          this.incrementPom('completed')
        } else if (e.key === 'B') {
          this.incrementPom('total')
        } else if (e.key === 'z') {
          this.defaultSnooze()
        } else if (e.key === 'Z') {
          this.showDatePicker('snooze')
        } else if (e.key === '!') {
          this.setNow()
        } else if (e.key === 't') {
          this.toggleToday()
        }
      },
      showDatePicker (pickerType) {
        if (pickerType === 'due') {
          this.$refs.duepicker.open()
        } else if (pickerType === 'snooze') {
          this.$refs.snoozepicker.open()
        }
      },
      jumpToProj () {
        this.$router.push({name: 'project', params: { id: this.task.projectId }})
      },
      toggleStar () {
        let newTask = this.task
        newTask.starred = !this.task.starred
        this.updateTask(newTask)
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
      defaultSnooze () {
        let dt = moment().add(7, 'days').utc()
        this.updateSnooze(dt.format())
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
      toggleCompleted () {
        this.$store.dispatch(
          'toggleTaskCompleted',
          {id: this.id, task: this.task}
        )
      },
      updateTask (newTask) {
        this.$store.dispatch(
          'updateTask',
          {id: this.id, newTask: newTask}
        )
      },
      incrementPom (type) {
        let newTask = this.task

        if (type === 'completed') {
          newTask.poms_completed += 1
        } else if (type === 'total') {
          newTask.poms_total += 1
        }

        this.updateTask(newTask)
      },
      changeProject (project) {
        let newTask = this.task
        newTask.projectId = project.id
        this.updateTask(newTask)
      },
      setNow () {
        this.$store.dispatch('setNowTask', this.id)
      },
      toggleToday () {
        this.$store.dispatch('toggleToday', this.id)
      }
    }
  }
</script>
