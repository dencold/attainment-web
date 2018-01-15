<template>
  <div>
    <text-input placeholder="Add a task" @submitted="addTask"></text-input>

    <h6>Starred Tasks</h6>
    <div class="flex-col" v-for="(task, id) in tasksStarred">
      <task-card :id="id" :task="task" :projectId="task.projectId" @click.native="toTask(id)"></task-card>
    </div>

    <h6>Due Tasks</h6>
    <div class="flex-col" v-for="(task, id) in tasksDue">
      <task-card :id="id" :task="task" :projectId="task.projectId" @click.native="toTask(id)"></task-card>
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
            completed: false,
            completedAt: ''
          }
          this.$store.dispatch('addTask', newTask)
        }
      },
      toTask: function (taskId) {
        this.$router.push({name: 'task', params: { id: taskId }})
      }
    }
  }

</script>
<style>

</style>
