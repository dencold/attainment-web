<template>
  <div class="row-card flex-row">

    <div class="star">
      <span v-show="!task.starred">
        <i class="fa fa-star-o"></i>
      </span>
      <span v-show="task.starred">
        <i class="fa fa-star"></i>
      </span>
    </div>

    <div v-if="project" class="project">{{project.name}}</div>
    <div class="task">{{task.name}}</div>
    <div class="poms">
      <span v-if="task.poms_total">
        <i class="ti-bolt"></i>
        {{task.poms_completed}} / {{task.poms_total}}
      </span>
    </div>
    <div class="due">
      <span v-if="task.dueAt">
        <i class="fa fa-calendar-check-o"></i>
        {{ [task.dueAt, "YYYY-MM-DD"] | moment("diff", Date.now(), "days") }}
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
      project: Object // optional, pass if you want project info in card
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
</style>
