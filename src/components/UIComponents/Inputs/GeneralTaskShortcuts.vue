<template>
  <div>
    <project-selector
      :task-id="id">
    </project-selector>
  </div>
</template>
<script>
  import moment from 'moment'
  import ProjectSelector from '@/components/UIComponents/Inputs/ProjectSelector.vue'

  export default {
    components: {
      'project-selector': ProjectSelector
    },

    props: {
      id: String
    },

    computed: {
      task () {
        return this.$store.state.tasks[this.id]
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
        if (e.key === 'l') {
          this.later()
        } else if (e.key === 'e') {
          this.toggleCompleted()
        } else if (e.key === 'i') {
          this.cycleSize()
        } else if (e.key === 'p') {
          this.jumpToProj()
        } else if (e.key === 's') {
          this.toggleStar()
        } else if (e.key === 't') {
          this.today()
        } else if (e.key === 'v') {
          this.$modal.show('move-task')
        } else if (e.key === 'w') {
          this.weekend()
        } else if (e.key === 'z') {
          this.defaultSnooze()
        }
      },
      toTask (taskId) {
        this.$router.push({name: 'task', params: { id: taskId }})
      },
      jumpToProj () {
        if (this.task.projectId) {
          this.$router.push({name: 'project', params: { id: this.task.projectId }})
        }
      },
      toggleStar () {
        let newTask = this.task
        newTask.starred = !this.task.starred
        this.updateTask(newTask)
      },
      defaultSnooze () {
        // we want a random date between 1-7 days so that we don't get a thundering
        // herd when we snooze a bunch of tasks via the keyboard shortcut
        let randomDay = Math.floor((Math.random() * 7) + 1)
        let dt = moment().add(randomDay, 'days')
        dt.hour(7).minute(0).second(0).utc()
        this.updateSnooze(dt.format())
      },
      updateSnooze (snooze) {
        if (snooze !== this.task.snoozedUntil) {
          let newTask = this.task
          newTask.snoozedUntil = snooze
          newTask.state = 'dateSet'
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
      cycleSize () {
        this.$store.dispatch('cycleTaskSize', this.id)
      },
      later () {
        let newTask = this.task
        newTask.state = 'later'
        this.updateTask(newTask)
      },
      today () {
        let newTask = this.task
        newTask.state = 'today'
        this.updateTask(newTask)
      },
      weekend () {
        let newTask = this.task
        newTask.state = 'weekend'
        this.updateTask(newTask)
      }
    }
  }
</script>
