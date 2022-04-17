<template>
  <span class="o-slider-outer">
    <a-slider
      class="o-slider"
      :style="{
        '--width': width + 'rem',
      }"
      ref="aSlider"
      :max="items.length - 1"
      :model-value="value"
      :label="items[value]"
      @update:model-value="update"
    />
    <span>{{ items[value] }}</span>
  </span>
</template>

<script>
import ObjectsMixin from './objects.mixin.js'

export default {
  name: 'o-slider',
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
      this.$refs.aSlider.focus()
    },
    update(newValue) {
      this.value = newValue
      this.$emit('update:result', { body: this.items[newValue] })
    },
  },
  mounted() {
    const index = this.items.indexOf(this.object.default)
    this.update(index === -1 ? 0 : index)
  },
}
</script>

<style lang="scss" scoped>
.o-slider-outer {
  display: inline-flex !important;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  > .o-slider {
    width: var(--width);
    padding: 0.5rem 0;
  }
}
</style>
