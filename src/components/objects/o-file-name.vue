<template>
  <span
    class="o-file-name"
    :style="{
      '--width': width + 'rem',
    }"
  >
    <span>ファイル名:</span>
    <a-text-field
      ref="aTextField"
      class="a-text-field"
      :model-value="value"
      @update:model-value="update"
    />
  </span>
</template>

<script>
import ObjectsMixin from './objects.mixin.js'

export default {
  name: 'o-file-name',
  mixins: [ObjectsMixin],
  data() {
    return {
      value: '',
    }
  },
  methods: {
    focus() {
      this.$refs.aTextField.focus()
    },
    update(newValue) {
      this.value = newValue
      this.$emit('update:result', {
        fileName: newValue,
        body: '\\delete-newline',
      })
    },
  },
  mounted() {
    this.update(this.object.default ?? '')
  },
}
</script>

<style lang="scss" scoped>
.o-file-name {
  width: var(--width);
  padding: 0.5rem 0;
  display: inline-flex !important;
  align-items: center;
  gap: 1rem;
  > .a-text-field {
    display: inline-block;
    vertical-align: middle;
    flex-grow: 1;
    min-width: 0;
  }
}
</style>
