<template>
  <div class="content">
    <h4>{{project.name}}</h4>
    <code>{{project.details}}</code>

    <text-input placeholder="Add a task" @submitted="addTask"></text-input>

    <div class="flex-col" v-for="(task, id) in projectTasks">
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

    props: {
      id: String
    },

    computed: {
      project () {
        return this.$store.state.projects[this.id]
      },
      projectTasks () {
        return this.$store.getters.projectTasks(this.id)
      }
    },

    methods: {
      addTask (e) {
        const taskName = e.trim()

        if (taskName.length === 0) {
          console.log('ERROR!')
        } else {
          const newTask = {name: taskName, projectId: this.id, details: '', starred: false, poms: 3, dueAt: '2017-12-12'}
          this.$store.dispatch('addTask', newTask)
        }
      },
      toTask (taskId) {
        this.$router.push({name: 'task', params: { id: taskId }})
      }
    }
  }
</script>

<style>
  .flex-col{
    display: flex;
    flex-direction: column;
  }
  .flex-row{
    display: flex;
    flex-direction: row;
  }
  .content {
    max-width: 750px;
  }
</style>
