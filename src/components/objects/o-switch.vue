<template>
  <a-switch
    class="o-switch"
    ref="aSwitch"
    :model-value="value"
    :label="body"
    @update:model-value="update"
  />
</template>

<script>
import ObjectsMixin from './objects.mixin.js'

export default {
  name: 'o-switch',
  mixins: [ObjectsMixin],
  data() {
    return {
      value: false,
    }
  },
  computed: {
    body() {
      return this.object[this.value] ?? this.value
    },
  },
  methods: {
    focus() {
      this.$refs.aSwitch.focus()
    },
    update(newValue) {
      this.value =
        typeof newValue === 'boolean'
          ? newValue
          : newValue === 'true'
          ? true
          : false
      this.$emit('update:result', { body: this.body })
    },
  },
  mounted() {
    this.update(this.object.default ?? false)
  },
}
</script>

<style lang="scss" scoped></style>
