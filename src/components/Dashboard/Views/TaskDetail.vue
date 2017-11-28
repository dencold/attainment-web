<template>
  <div class="content">
    <div class="flex-row">
      <div class="star" @click="toggleStar">
        <i v-show="task.starred" class="ti-bolt"></i>
        <i v-show="!task.starred" class="ti-star"></i>
      </div>
      <span class="name">{{task.name}}</span>
    </div>

    <div class="flex-row">
      <span class="project">{{project.name}}</span>
      <span class="poms">{{task.poms}}</span>
      <span class="due">{{task.dueAt}}</span>
    </div>

    <div class="flex-row">
      <code>{{task.details}}</code>
    </div>
  </div>    
</template>

<script>
  import TextInput from 'components/UIComponents/Inputs/TextInput.vue'

  export default {
    components: {
      'text-input': TextInput
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

    methods: {
      addTask (e) {
        const taskName = e.trim()

        if (taskName.length === 0) {
          console.log('ERROR!')
        } else {
          const newTask = {name: taskName, projectId: this.id, details: ''}
          this.$store.dispatch('addTask', newTask)
        }
      },
      toggleStar () {
        // this.task.starred = !this.task.starred
        console.log('TOGGLE!')
      }
    }
  }
</script>

<style>
  .flex-row {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 15px 0 15px;
  }
  .star {
    width: 25px;
  }
  .project {
    width: 150px;
  }
  .name {
    flex-grow: 1;
  }
  .pom {
    width: 25px;
  }
  .due {
    width: 25px;
    text-align: right;
  }
  .flex-col{
    display: flex;
    flex-direction: column;
  }
  .content {
    max-width: 750px;
  }
</style>
