<template>
</template>
<script>
  export default {
    props: {
      sectionLens: Array,
      currSection: Number,
      currIndex: Number,
      jumpEnabled: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      currSectionLen () {
        return this.sectionLens[this.currSection]
      }
    },

    created () {
      document.addEventListener('keyup', this.handleKeyUp)
    },

    destroyed () {
      document.removeEventListener('keyup', this.handleKeyUp)
    },

    methods: {
      handleKeyUp (e) {
        if (e.key === 'j') {
          this.moveDown()
        } else if (e.key === 'k') {
          this.moveUp()
        }
      },
      moveDown () {
        if (this.currIndex === null) {
          this.initFocus()
        } else {
          if (this.currIndex < this.currSectionLen - 1) {
            this.emitChange(this.currSection, this.currIndex + 1)
          } else {
            this.moveToSection(this.currSection + 1, 'down')
          }
        }
      },
      moveUp () {
        if (this.currIndex === null) {
          this.initFocus()
        } else {
          if (this.currIndex > 0) {
            this.emitChange(this.currSection, this.currIndex - 1)
          } else {
            this.moveToSection(this.currSection - 1, 'up')
          }
        }
      },
      moveToSection (sectionIndex, direction) {
        // noop if jumping isn't enabled
        if (!this.jumpingEnabled) {
          return
        }

        // noop if the section is out of range
        if (sectionIndex < 0 || sectionIndex >= this.sectionLens.length) {
          return
        }

        // noop if the section moved to doesn't have any items
        if (this.sectionLens[sectionIndex] === 0) {
          return
        }

        if (direction === 'down') {
          this.emitChange(sectionIndex, 0)
        } else if (direction === 'up') {
          this.emitChange(sectionIndex, this.sectionLens[sectionIndex] - 1)
        }
      },

      initFocus () {
        this.emitChange(0, 0)
      },
      emitChange (section, index) {
        this.$emit('focusChange', {section: section, index: index})
      }
    }
  }

</script>
