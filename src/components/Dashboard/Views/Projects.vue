<template>
  <div>
    <input
      name="addProject"
      ref="addProject"
      v-model.trim="projectName"
      placeholder="Add a new project"
      @keyup.enter="addProject()"
      @keyup.esc="$refs.addProject.blur()"
    />
    <button @click="addProject">+</button>

    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="(project, id) in $store.state.projects">
        <project-card :id="id" :project="project" @click.native="toDetail(id)"></project-card>
      </div>
    </div>

  </div>
</template>
<script>
  import ProjectCard from 'components/UIComponents/Cards/ProjectCard.vue'
  export default {
    components: {
      'project-card': ProjectCard
    },

    data () {
      return {
        projectName: ''
      }
    },

    methods: {
      addProject () {
        if (this.projectName.trim().length === 0) {
          console.log('ERROR!')
        } else {
          const newPrj = {name: this.projectName, details: ''}
          this.$store.dispatch('addProject', newPrj)
          this.projectName = ''
        }
      },
      toDetail: function (projectId) {
        this.$router.push({name: 'project', params: { id: projectId }})
      }
    }
  }

</script>
<style>

</style>
