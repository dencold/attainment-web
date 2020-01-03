<template>
  <div>
    <div @click="toTaskDetail"
      v-if="task"
      class="grid row-card pointer"
      :class="{ completed: task.state === 'completed', focused: isFocused }">

      <div>
        <span v-show="!task.starred">
          <i class="fa fa-star-o"></i>
        </span>
        <span v-show="task.starred">
          <i class="fa fa-star"></i>
        </span>
      </div>

      <div class="name">{{task.name}}</div>
      <div class="project">
        <span v-if="project">
          <i class="ti-folder"></i>
          {{project.name}}
        </span>
      </div>
      <div>
        <span v-if="task.size">
          {{task.size}}
        </span>
      </div>
      <div class="snoozed centered">
        <span v-if="task.snoozedUntil">
          <i class="ti-alarm-clock"></i>
          {{ task.snoozedUntil | moment("diff", Date.now(), "days") }}
        </span>
      </div>
      <div class="due centered">
        <span v-if="task.dueAt">
          <i class="ti-calendar"></i>
          {{ task.dueAt | moment("diff", Date.now(), "days") }}
        </span>
      </div>
      <div class="notes">
        <span v-if="task.notes">
          <i class="ti-write"></i>
        </span>
      </div>

    </div>
    <div v-if="!task" class="row-card">
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
    padding: 0 5px;
  }
  .row-card:hover {
    border: 3px solid #c2d4de;
  }
  .grid {
    display: grid;
    grid-template-columns: 20px minmax(200px, 1fr) minmax(100px, 150px) 20px 25px 25px 25px;
    grid-column-gap: 5px;
    align-items: center;
  }
  .focused {
    border: 3px solid #c2d4de;
  }
  .completed {
    background-color: #DDD;
    text-decoration: line-through;
  }
  .project {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .centered {
    text-align: center;
  }
  .pointer {
    cursor: pointer;
  }
</style>
