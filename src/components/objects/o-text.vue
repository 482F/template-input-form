<template>
  <a-text-field class="o-text" :model-value="value" @update:model-value="update" />
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
  width: 16rem;
  padding: 0.5rem 0;
}
</style>
