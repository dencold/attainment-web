<template>
  <textarea
    ref="textarea"
    :placeholder="placeholder"
    :value="value"
    @change="update($event.target.value)"
    @keyup.esc="$refs.textarea.blur()"
    @keyup.stop
  />
</template>

<script>
  export default {
    props: {
      placeholder: String,
      value: String
    },

    methods: {
      update (newVal) {
        this.$emit('updated', newVal)
      },
      focus () {
        this.$refs.textarea.focus()
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
</style>
