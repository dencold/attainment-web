<template>
  <div
    class="project-card pointer"
    :class="{ focused: isFocused }">
    <div class="flex-row">
      <span class="title">{{project.name}}</span>
      <div class="star">
        <span v-show="!project.starred">
          <i class="fa fa-star-o"></i>
        </span>
        <span v-show="project.starred">
          <i class="fa fa-star"></i>
        </span>
      </div>
    </div>
    <hr>
    <div class="flex-row stats">
      <i class="ti-angle-double-right"></i>
      <span class="stat">{{numTasks}}</span>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'project-card',
    props: {
      id: String,
      isFocused: Boolean
    },
    computed: {
      numTasks () {
        return this.$store.getters.numTasksInProject(this.id)
      },
      project () {
        if (this.id) {
          return this.$store.state.projects[this.id]
        }

        return null
      }
    }
  }

</script>
<style scoped>
  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .project-card {
    max-width: 350px;
    background-color: #FFF;
    border-radius: 6px;
    border: 3px solid #FFF;
    margin-bottom: 5px;
    padding: 10px;
  }

  .title {
    font-size: 125%;
    flex-grow: 1;
  }

  .stats {
    font-size: 100%;
  }

  i.fa {
    font-size: 125%;
  }

  .stat {
    margin-left: 5px;
  }

  hr {
    margin: 10px 0 10px 0;
  }

  .focused {
    border: 3px solid #c2d4de;
  }
  .row-card:hover {
    border: 3px solid #c2d4de;
  }
  .pointer {
    cursor: pointer;
  }
  .star {
    width: 25px;
  }
</style>
