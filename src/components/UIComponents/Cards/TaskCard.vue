<template>
  <div class="card">
    <div class="flex-row">

      <div class="star">
        <span v-show="task.starred">
          <i class="ti-star"></i>
        </span>
      </div>

      <div v-if="project" class="project">{{project.name}}</div>
      <div class="task">{{task.name}}</div>
      <div class="pom">2</div>
      <div class="due">-3</div>

    </div>

  </div>
</template>
<script>
  export default {
    name: 'task-card',

    props: {
      task: Object,
      project: Object // optional, pass if you want project info in card
    }
  }

</script>
<style scoped>
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
  .task {
    flex-grow: 1;
  }
  .pom {
    width: 25px;
  }
  .due {
    width: 25px;
    text-align: right;
  }
</style>
