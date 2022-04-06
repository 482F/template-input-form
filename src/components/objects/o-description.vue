<template>
  <o-plain class="o-description" :object="object" />
</template>

<script>
import ObjectsMixin from './objects.mixin.js'
import OPlain from './o-plain.vue'

export default {
  name: 'o-text',
  mixins: [ObjectsMixin],
  components: {
    OPlain,
  },
  mounted() {
    this.$emit('update:result', { body: '\\delete-newline' })
  },
}
</script>

<style lang="scss" scoped>
.o-description {
  background-color: #ddd;
}
</style>
