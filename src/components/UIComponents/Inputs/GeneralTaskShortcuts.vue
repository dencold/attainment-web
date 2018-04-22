<template>
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
        if (e.key === 's') {
          this.toggleStar()
        } else if (e.key === 'c') {
          this.toggleCompleted()
        } else if (e.key === 'E') {
          this.incrementPom('completed')
        } else if (e.key === 'e') {
          this.incrementPom('total')
        } else if (e.key === 'z') {
          this.defaultSnooze()
        } else if (e.key === '!') {
          this.setNow()
        } else if (e.key === 'b') {
          this.backlog()
        } else if (e.key === 't') {
          this.today()
        } else if (e.key === 'w') {
          this.week()
        } else if (e.key === 'p') {
          this.jumpToProj()
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
      incrementPom (type) {
        let newTask = this.task

        if (type === 'completed') {
          newTask.poms_completed += 1
        } else if (type === 'total') {
          newTask.poms_total += 1
        }

        this.updateTask(newTask)
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
      week () {
        let newTask = this.task
        newTask.state = 'week'
        this.updateTask(newTask)
      }
    }
  }
</script>
