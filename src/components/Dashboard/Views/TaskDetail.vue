<template>
  <div class="content">
    <div class="card">

      <div class="flex-row title">
        <div class="icon pointer" @click="toggleComplete">
          <i v-show="task.completed" class="fa fa-check-square-o"></i>
          <i v-show="!task.completed" class="fa fa-square-o"></i>
        </div>

        <input
          ref="nameInput"
          class="name"
          :value="task.name"
          @input="updateName"
          type="text"
          @keyup.esc="$refs.nameInput.blur()"
          @keyup.stop
        />

        <div class="icon pointer" @click="toggleStar">
          <i v-show="task.starred" class="fa fa-star"></i>
          <i v-show="!task.starred" class="fa fa-star-o"></i>
        </div>
      </div>

      <hr/>

      <project-selector :project-id="task.projectId" @change-project="changeProject"></project-selector>

      <div class="flex-row highlight">
        <div class="icon pointer" @click="incrementPom('completed')">
          <i class="ti-bolt"></i>
        </div>
        <span class="name">
          <span class="pointer" @click="incrementPom('completed')">{{task.poms_completed}} /</span>
          <span class="pointer" @click="incrementPom('total')">{{task.poms_total}}</span>
        </span>
      </div>

      <div class="flex-row highlight">
        <div class="icon pointer" @click="showDatePicker">
          <i class="ti-calendar"></i>
        </div>
        <datetime
          ref="datepicker"
          :value="task.dueAt"
          @input="updateDue"
          placeholder="Set due date"
          class="name"
          type="date"
          input-format="YYYY-MM-DD"
          input-class="datetime-input"
          auto-close>
        </datetime>
      </div>

      <div class="flex-row">
        <div class="icon highlight">
          <i class="ti-pencil"></i>
        </div>
        <div class="name">
          <text-area placeholder="Notes" :value="task.notes" @updated="updateNotes"/>
          </text-area>
        </div>
      </div>

    </div>
  </div>    
</template>

<script>
  import TextInput from 'components/UIComponents/Inputs/TextInput.vue'
  import TextArea from 'components/UIComponents/Inputs/TextArea.vue'
  import ProjectSelector from 'components/UIComponents/Inputs/ProjectSelector.vue'
  import { Datetime } from 'vue-datetime'

  export default {
    components: {
      'text-input': TextInput,
      'text-area': TextArea,
      'project-selector': ProjectSelector,
      'datetime': Datetime
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
      showDatePicker () {
        this.$refs.datepicker.open()
      },
      jumpToProj () {
        this.$router.push({name: 'project', params: { id: this.task.projectId }})
      },
      toggleStar () {
        let newTask = this.task
        newTask.starred = !this.task.starred
        this.updateTask(newTask)
      },
      // there's a lot of boilerplate repeated code that I'm really unhappy with
      // but this is what we're left with in the Vuex model. we need to use
      // computed properties for accessing the data and that is read-only I might
      // switch this all into the store's actions, but that's a future refactoring
      // see more:
      // https://vuex.vuejs.org/en/forms.html
      updateName (e) {
        let name = e.target.value
        if (name !== this.task.name) {
          let newTask = this.task
          newTask.name = name
          this.updateTask(newTask)
        }
      },
      updateDue (dueAt) {
        if (dueAt !== this.task.dueAt) {
          let newTask = this.task
          newTask.dueAt = dueAt
          this.updateTask(newTask)
        }
      },
      updateNotes (newNotes) {
        if (newNotes !== this.task.notes) {
          let newTask = this.task
          newTask.notes = newNotes
          this.updateTask(newTask)
        }
      },
      toggleComplete () {
        let newTask = this.task
        newTask.completed = !this.task.completed
        newTask.completedAt = Date.now()
        this.updateTask(newTask)
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
      changeProject (project) {
        let newTask = this.task
        newTask.projectId = project.id
        this.updateTask(newTask)
      }
    }
  }
</script>

<style scoped>
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
  .highlight {
    color: #3091B2;
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
  input {
    padding: 0 10px;
    border: none;
  }
</style>
