<template>
  <a-text-field
    class="o-file-name"
    :model-value="value"
    @update:model-value="update"
  />
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
    update(newValue) {
      this.value = newValue
      this.$emit('update:result', { fileName: newValue })
    },
  },
  mounted() {
    this.update(this.object.default ?? '')
  },
}
</script>

<style lang="scss" scoped>
.o-file-name {
  width: 16rem;
  padding: 0.5rem 0;
}
</style>
