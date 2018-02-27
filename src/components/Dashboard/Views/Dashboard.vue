<template>
  <div>
    <text-input placeholder="Add a task" @submitted="addTask"></text-input>

    <h6>Now</h6>
    <div class="flex-col">
      <task-card :id="nowId" showProject @click.native="toTask(nowId)"></task-card>
    </div>

    <h6>Today</h6>
    <div class="flex-col" v-for="id in tasksToday">
      <task-card :id="id" showProject @click.native="toTask(id)"></task-card>
    </div>

    <h6>Starred Tasks</h6>
    <div class="flex-col" v-for="(task, id) in tasksStarred">
      <task-card :id="id" showProject @click.native="toTask(id)"></task-card>
    </div>

    <h6>Due Tasks</h6>
    <div class="flex-col" v-for="(task, id) in tasksDue">
      <task-card :id="id" showProject @click.native="toTask(id)"></task-card>
    </div>
  </div>
</template>
<script>
  import TaskCard from 'components/UIComponents/Cards/TaskCard.vue'
  import TextInput from 'components/UIComponents/Inputs/TextInput.vue'

  export default {
    components: {
      'task-card': TaskCard,
      'text-input': TextInput
    },

    computed: {
      nowId () {
        return this.$store.state.now
      },
      tasksToday () {
        return this.$store.state.today
      },
      tasksStarred () {
        return this.$store.getters.tasksStarred
      },
      tasksDue () {
        return this.$store.getters.tasksDue
      }
    },

    methods: {
      addTask (e) {
        const taskName = e.trim()

        if (taskName.length === 0) {
          console.log('ERROR! Please specify a task name')
        } else {
          const newTask = {
            name: taskName,
            projectId: '',
            notes: '',
            starred: false,
            poms_completed: 0,
            poms_total: 0,
            dueAt: '',
            snoozedUntil: '',
            completed: false,
            completedAt: ''
          }
          this.$store.dispatch('addTask', newTask)
        }
      },
      toTask: function (taskId) {
        if (taskId) {
          this.$router.push({name: 'task', params: { id: taskId }})
        }
      }
    }
  }

</script>
<style>

</style>
