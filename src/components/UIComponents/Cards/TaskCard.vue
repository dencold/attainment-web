<template>
  <div class="row-card flex-row pointer" :class="{ completed: task.completed }">

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
</template>
<script>
  export default {
    name: 'task-card',

    props: {
      task: Object,
      id: String,
      projectId: String // optional, pass if you want project info in card
    },

    computed: {
      project () {
        if (this.projectId) {
          return this.$store.state.projects[this.projectId]
        }

        return null
      }
    }
  }

</script>
<style scoped>
  .row-card {
    height: 50px;
    background-color: #FFF;
    border-radius: 6px;
    margin-bottom: 3px;
    padding: 0 15px 0 15px;
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
