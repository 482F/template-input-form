<template>
  <a-textarea
    class="o-list"
    :style="{
      '--height': height + 'rem',
    }"
    ref="aTextarea"
    resizable
    :model-value="value"
    @update:model-value="update"
    @keydown="onKeydown"
  />
</template>

<script>
import ObjectsMixin from './objects.mixin.js'
import * as utils from '482-js-utils'

export default {
  name: 'o-list',
  mixins: [ObjectsMixin],
  data() {
    return {
      value: '',
    }
  },
  props: {
    autoIndent: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    heads() {
      return (this.object.heads ?? '["- "]')
        .replaceAll(/^\[|\]$/g, '')
        .split(',')
        .map((value) => value.replaceAll(/^\s*["']?|["']?\s*$/g, ''))
    },
    textarea() {
      return this.$refs.aTextarea.$el.getElementsByTagName('textarea')[0]
    },
    indentString() {
      return this.object?.indent?.replaceAll?.(/^['"]|['"]$/g, '') || '  ' // 空白の場合もデフォルトのインデントに
    },
  },
  methods: {
    focus() {
      this.$refs.aTextarea.focus()
    },
    getHead(indent) {
      const heads = this.heads ?? ['- ']
      return heads[indent] ?? heads.at(-1)
    },
    getIndentText(indent) {
      const head = this.getHead(indent)
      const spaces = Array(indent).fill(this.indentString).join('')
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
      const head = this.getHead(0)
      const indent =
        (text.match(new RegExp('^(' + this.indentString + ')+'))?.[0]?.length ??
          (text.slice(0, head.length) === head ? 0 : -2)) /
        this.indentString.length
      return {
        text,
        indent,
      }
    },
    indent(delta) {
      const { row } = utils.textarea.getSelection(this.textarea)
      const { text: rowText, indent: currentIndent } = this.getRow(row)
      const currentIndentText = this.getIndentText(currentIndent)
      const unHeadText =
        currentIndent === -1 ||
        rowText.slice(0, currentIndentText.length) !== currentIndentText
          ? rowText
          : rowText.slice(currentIndentText.length)
      const newRowText =
        this.getIndentText(Math.max(currentIndent + delta, 0)) + unHeadText
      utils.textarea.spliceRow(this.textarea, { row }, 1, newRowText)
    },
    onKeydown(e) {
      if (e.key === 'Enter') {
        if (!this.autoIndent || e.shiftKey) {
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
  height: var(--height);
}
</style>
