<template>
  <div>
    <h4>{{project.name}}</h4>
    <code>{{project.details}}</code>
    <input
      name="addTask"
      ref="addTask"
      v-model.trim="taskName"
      placeholder="Add a new task"
      @keyup.enter="addTask()"
      @keyup.esc="$refs.addTask.blur()"
    />
    <button @click="addTask">+</button>

    <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="task in projectTasks">

        <task-card :task="task" @click="console.log('blah')"></task-card>
      </div>
    </div>
  </div>
</template>

<script>
  import TaskCard from 'components/UIComponents/Cards/TaskCard.vue'

  export default {
    components: {
      'task-card': TaskCard
    },

    props: {
      id: String
    },

    data () {
      return {
        taskName: '',
        project: this.$store.state.projects[this.id]
      }
    },

    computed: {
      projectTasks () {
        return this.$store.getters.projectTasks(this.id)
      }
    },

    created: function () {
      console.log('In created')
      console.log(this.project)
      console.log(this.$store.state.projects[this.id])
    },

    methods: {
      addTask () {
        if (this.taskName.trim().length === 0) {
          console.log('ERROR!')
        } else {
          const newTask = {name: this.taskName, projectId: this.id, details: ''}
          this.$store.dispatch('addTask', newTask)
          this.taskName = ''
        }
      }
    }
  }
</script>

<style>

</style>
