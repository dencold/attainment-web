<template>
  <div>
    <text-input placeholder="Add a task" @submitted="addTask"></text-input>

    <div class="flex-col" v-for="(task, id) in tasksActive">
      <task-card :id="id" :task="task" :projectId="task.projectId" @click.native="toTask(id)"></task-card>
    </div>

    <h6 class="pointer" v-if="Object.keys(tasksSnoozed).length > 0" @click="toggleShowSnoozed">Snoozed Tasks</h6>

    <div class="flex-col" v-show="showSnoozed" v-for="(task, id) in tasksSnoozed">
      <task-card :id="id" :task="task" @click.native="toTask(id)"></task-card>
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

    data () {
      return {
        showSnoozed: false
      }
    },

    computed: {
      tasksActive () {
        return this.$store.getters.tasksActive
      },
      tasksSnoozed () {
        return this.$store.getters.tasksSnoozed
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
        this.$router.push({name: 'task', params: { id: taskId }})
      },
      toggleShowSnoozed () {
        this.showSnoozed = !this.showSnoozed
      }
    }
  }

</script>
<style>
  .pointer {
    cursor: pointer;
  }
</style>
