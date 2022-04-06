<template>
  <a-textarea
    class="o-list"
    ref="aTextarea"
    :model-value="value"
    @update:model-value="update"
    @keydown="onKeydown"
  />
</template>

<script>
import ObjectsMixin from './objects.mixin.js'
import * as utils from '482-js-utils'

const indentSpaces = '  '

export default {
  name: 'o-list',
  mixins: [ObjectsMixin],
  data() {
    return {
      value: '',
    }
  },
  computed: {
    textarea() {
      return this.$refs.aTextarea.$el.getElementsByTagName('textarea')[0]
    },
  },
  methods: {
    focus() {
      this.$refs.aTextarea.focus()
    },
    getHead(indent) {
      const heads = this.object.heads ?? '・'
      return heads[indent] ?? heads.at(-1)
    },
    getIndentText(indent) {
      const head = this.getHead(indent)
      const spaces = Array(indent * indentSpaces.length)
        .fill(' ')
        .join('')
      return spaces + head
    },
    update(newValue) {
      this.value = newValue
      this.$emit('update:result', { body: newValue })
    },
    getRow(row) {
      if (!row) {
        row = utils.textarea.getSelection(this.textarea).row
      }
      const text = utils.textarea.getRow(this.textarea, { row })
      const indent =
        (text.match(/^ +/)?.[0]?.length ??
          (text.match(new RegExp('^' + this.getHead(0))) ? 0 : -2)) /
        indentSpaces.length
      return {
        text,
        indent,
      }
    },
    indent(delta) {
      const { row } = utils.textarea.getSelection(this.textarea)
      const { text: rowText, indent: currentIndent } = this.getRow(row)
      const newRowText =
        this.getIndentText(Math.max(currentIndent + delta, 0)) +
        (currentIndent === -1
          ? rowText
          : rowText.replace(
              new RegExp('^' + this.getIndentText(currentIndent)),
              ''
            ))

      utils.textarea.spliceRow(this.textarea, { row }, 1, newRowText)
    },
    onKeydown(e) {
      if (e.key === 'Enter') {
        if (e.shiftKey) {
          return
        }
        utils.textarea.spliceText(
          this.textarea,
          utils.textarea.getSelection(this.textarea),
          0,
          '\n' + this.getIndentText(this.getRow().indent)
        )
        this.update(this.textarea.value)
      } else if (e.key === 'Tab') {
        this.indent(e.shiftKey ? -1 : 1)
        this.update(this.textarea.value)
      } else {
        return
      }
      e.preventDefault()
    },
  },
  mounted() {
    this.update(this.object.default ?? this.getHead(0))
  },
}
</script>

<style lang="scss" scoped>
.o-list {
  width: 100%;
}
</style>
