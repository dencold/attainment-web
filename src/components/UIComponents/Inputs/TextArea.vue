<template>
  <div class="editor" @keypress.stop @keyup.stop>
    <editor-content
      class="editor__content"
      :editor="editor"
    />
  </div>
</template>

<script>
  import { Editor, EditorContent } from 'tiptap'
  import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    History,
  } from 'tiptap-extensions'

  export default {
    components: {
      EditorContent
    },

    props: {
      placeholder: String,
      value: String
    },
    data() {
      return {
        editor: new Editor({
          extensions: [
            new Blockquote(),
            new BulletList(),
            new CodeBlock(),
            new HardBreak(),
            new Heading({ levels: [1, 2, 3] }),
            new ListItem(),
            new OrderedList(),
            new TodoItem(),
            new TodoList(),
            new Bold(),
            new Code(),
            new Italic(),
            new Link(),
            new History(),
          ],
          content: this.value,
          onUpdate: ({ getHTML }) => {
              // get new content on update
              const newContent = getHTML()
              this.$emit('updated', newContent)
          },
        })
      }
    },
    methods: {
      update (newVal) {
        this.$emit('updated', newVal)
      },
      focus () {
        this.$refs.textarea.focus()
      }
    },
    beforeDestroy() {
      // Always destroy your editor instance when it's no longer needed
      this.editor.destroy()
    }
  }

</script>
<style scoped>
  .editor__content {
    width: 100%;
    min-height: 100px;
    padding: 10px;
    background-color: #F5F5F5;
    border: none;
  }
</style>
