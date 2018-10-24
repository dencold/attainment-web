<template>
  <div></div>
</template>
<script>
  import moment from 'moment'

  export default {
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
        if (e.key === '!') {
          this.setNow()
        } else if (e.key === 'b') {
          this.backlog()
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
      backlog () {
        let newTask = this.task
        newTask.state = 'backlog'
        this.updateTask(newTask)
      },
      setNow () {
        this.$store.dispatch('setNowTask', this.id)
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
