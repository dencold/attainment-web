<template>
  <div class="content">
    <h4>{{project.name}}</h4>
    <code>{{project.details}}</code>

    <text-input placeholder="Add a task" @submitted="addTask"></text-input>

    <div class="flex-col" v-for="task in projectTasks">
      <task-card :task="task" @click="console.log('blah')"></task-card>
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

    data () {
      return {
        project: this.$store.state.projects[this.id]
      }
    },

    computed: {
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
          const newTask = {name: taskName, projectId: this.id, details: ''}
          this.$store.dispatch('addTask', newTask)
        }
      }
    }
  }
</script>

<style>
  .flex-col{
    display: flex;
    flex-direction: column;
  }
  .content {
    max-width: 750px;
  }
</style>
