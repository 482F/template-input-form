<template>
  <a-select
    class="o-select"
    :style="{
      '--width': width + 'rem',
    }"
    ref="aSelect"
    :model-value="value"
    :items="items"
    @update:model-value="update"
  />
</template>

<script>
import ObjectsMixin from './objects.mixin.js'

export default {
  name: 'o-select',
  mixins: [ObjectsMixin],
  data() {
    return {
      value: '',
    }
  },
  computed: {
    items() {
      return (this.object.selects ?? '')
        .replaceAll(/^\[|\]$/g, '')
        .split(',')
        .map((value) => value.replaceAll(/^\s+|\s+$/g, ''))
    },
  },
  methods: {
    focus() {
      this.$refs.aSelect.focus()
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
.o-select {
  width: var(--width);
  padding: 0.5rem 0;
}
</style>
