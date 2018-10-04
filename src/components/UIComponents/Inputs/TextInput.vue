<template>
  <div class="form-group flex-row">
    <input
      type="text"
      class="form-control border-input"
      ref="textinput"
      v-model.trim="value"
      :placeholder="placeholder"
      @focus="updateFocus(true)"
      @blur="updateFocus(false)"
      @keyup.enter="submit"
      @keyup.esc="updateFocus(false)"
      @keyup.stop
    />
    <button class="btn btn-fill btn-info inpBtn" @click="submit">+</button>

  </div>
</template>

<script>
  export default {
    props: {
      placeholder: String,
      focused: Boolean
    },

    data () {
      return {
        value: ''
      }
    },

    watch: {
      focused (newVal, oldVal) {
        // if newVal and oldVal are equal, it's a noop
        if (newVal !== oldVal) {
          this.updateFocus(newVal)
        }
      }
    },

    methods: {
      submit () {
        this.$emit('submitted', this.value)
        this.value = ''
      },
      updateFocus (newVal) {
        if (newVal === false) {
          this.$refs.textinput.blur()
          this.$emit('update:focused', false)
        } else {
          this.$refs.textinput.focus()
          this.$emit('update:focused', true)
        }
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
