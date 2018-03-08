<template>
  <div>
    <div @click="toTaskDetail"
      v-if="task"
      class="flex-row row-card pointer"
      :class="{ completed: task.completed, focused: isFocused }">

      <div class="star">
        <span v-show="!task.starred">
          <i class="fa fa-star-o"></i>
        </span>
        <span v-show="task.starred">
          <i class="fa fa-star"></i>
        </span>
      </div>

      <div class="task">{{task.name}}</div>
      <div v-if="project" class="project">
        <i class="ti-folder"></i>
        {{project.name}}
      </div>
      <div class="poms">
        <span v-if="task.poms_total">
          <i class="ti-bolt"></i>
          {{task.poms_total - task.poms_completed}}
        </span>
      </div>
      <div class="due">
        <span v-if="task.snoozedUntil">
          <i class="ti-alarm-clock"></i>
          {{ task.snoozedUntil | moment("diff", Date.now(), "days") }}
        </span>
      </div>
      <div class="due">
        <span v-if="task.dueAt">
          <i class="ti-calendar"></i>
          {{ task.dueAt | moment("diff", Date.now(), "days") }}
        </span>
      </div>

    </div>
    <div v-if="!task" class="flex-row row-card">
      TASK NOT FOUND
    </div>
  </div>
</template>
<script>
  export default {
    name: 'task-card',

    props: {
      id: String,
      showProject: Boolean,
      isFocused: Boolean
    },

    computed: {
      project () {
        if (this.showProject && this.task && this.task.projectId) {
          return this.$store.state.projects[this.task.projectId]
        }

        return null
      },
      task () {
        if (this.id) {
          return this.$store.state.tasks[this.id]
        }

        return null
      }
    },

    methods: {
      toTaskDetail () {
        console.log('in detail')
        if (this.id) {
          this.$router.push({name: 'task', params: { id: this.id }})
        }
      }
    }

  }

</script>
<style scoped>
  .row-card {
    height: 50px;
    background-color: #FFF;
    border-radius: 6px;
    border: 3px solid #FFF;
    margin-bottom: 3px;
    padding: 0 15px 0 15px;
  }
  .focused {
    border: 3px solid #c2d4de;
  }
  .row-card:hover {
    border: 3px solid #c2d4de;
  }
  .completed {
    background-color: #DDD;
    text-decoration: line-through;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .star {
    width: 25px;
  }
  .project {
    width: 150px;
  }
  .task {
    flex-grow: 1;
  }
  .poms {
    width: 50px;
  }
  .due {
    width: 50px;
    text-align: right;
  }
  .pointer {
    cursor: pointer;
  }
</style>
