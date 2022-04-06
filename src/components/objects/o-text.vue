<template>
  <a-text-field
    class="o-text"
    :style="{
      '--width': width + 'rem',
    }"
    ref="aTextField"
    :model-value="value"
    @update:model-value="update"
  />
</template>

<script>
import ObjectsMixin from './objects.mixin.js'

export default {
  name: 'o-text',
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
      this.$emit('update:result', { body: newValue })
    },
  },
  mounted() {
    this.update(this.object.default ?? '')
  },
}
</script>

<style lang="scss" scoped>
.o-text {
  width: var(--width);
  padding: 0.5rem 0;
}
</style>
