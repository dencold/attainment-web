<template>
  <div class="content">
    <div class="card">

      <div class="flex-row title">
        <div class="icon pointer" @click="toggleComplete">
          <i v-show="project.completed" class="fa fa-check-square-o"></i>
          <i v-show="!project.completed" class="fa fa-square-o"></i>
        </div>

        <input class="name" :value="project.name" @input="updateName" type="text" />
      </div>

      <div class="flex-row">
        <div class="icon highlight">
          <i class="ti-pencil"></i>
        </div>
        <div class="name">
          <textarea placeholder="Notes" :value="project.notes" @change="updateNotes"/>
        </div>
      </div>

      <hr />

      <text-input placeholder="Add a task" @submitted="addTask"></text-input>

      <div class="flex-col" v-for="(task, id) in projectTasksActive">
        <task-card :id="id" :task="task" @click.native="toTask(id)"></task-card>
      </div>

      <h6 v-if="projectTasksCompleted.length > 0" @click="toggleShowCompleted">Completed Tasks</h6>

      <div class="flex-col" v-show="showCompleted" v-for="(task, id) in projectTasksCompleted">
        <task-card :id="id" :task="task" @click.native="toTask(id)"></task-card>
      </div>
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
        showCompleted: false
      }
    },

    props: {
      id: String
    },

    computed: {
      project () {
        return this.$store.state.projects[this.id]
      },
      projectTasksActive () {
        return this.$store.getters.projectTasksActive(this.id)
      },
      projectTasksCompleted () {
        return this.$store.getters.projectTasksCompleted(this.id)
      }
    },

    methods: {
      addTask (e) {
        const taskName = e.trim()

        if (taskName.length === 0) {
          console.log('ERROR!')
        } else {
          const newTask = {
            name: taskName,
            projectId: this.id,
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
      toTask (taskId) {
        this.$router.push({name: 'task', params: { id: taskId }})
      },
      updateName (e) {
        let name = e.target.value
        if (name !== this.project.name) {
          let newProj = this.project
          newProj.name = name
          this.updateProject(newProj)
        }
      },
      updateNotes (e) {
        let notes = e.target.value
        if (notes !== this.project.notes) {
          let newProj = this.project
          newProj.notes = notes
          this.updateProject(newProj)
        }
      },
      updateProject (newProj) {
        this.$store.dispatch(
          'updateProject',
          {id: this.id, newProj: newProj}
        )
      },
      toggleShowCompleted () {
        this.showCompleted = !this.showCompleted
      }
    }
  }
</script>

<style scoped>
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    background-color: #F5F5F5;
    border: none;
  }
  .pointer {
    cursor: pointer;
  }
  .content {
    font-size: 16px;
    max-width: 750px;
  }
  .card {
    padding: 15px;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
    padding: 0 15px;
    margin: 0 0 5px 0;
  }
  .fa {
    width: auto;
  }
  .title {
    font-size: 200%;
  }
  .project {
    width: 150px;
  }
  .name {
    flex-grow: 1;
    padding: 0 10px;
  }
  .flex-col{
    display: flex;
    flex-direction: column;
  }
  input {
    padding: 0 10px;
    border: none;
  }
</style>
