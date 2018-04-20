<template>
  <div class="form-group flex-row">
    <input
      type="text"
      class="form-control border-input"
      ref="textinput"
      v-model.trim="value"
      :placeholder="placeholder"
      @keyup.enter="submit"
      @keyup.esc="$refs.textinput.blur()"
      @keyup.stop
    />
    <button class="btn btn-fill btn-info inpBtn" @click="submit">+</button>

  </div>
</template>

<script>
  export default {
    props: {
      placeholder: String
    },

    data () {
      return {
        value: ''
      }
    },

    mounted () {
      this.$refs.textinput.focus()
    },

    methods: {
      submit () {
        this.$emit('submitted', this.value)
        this.value = ''
      }
    }
  }

</script>
<style scoped>
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .inpBtn {
    margin-left: 10px;
  }
</style>
