<template>
  <o-list
    ref="oList"
    :auto-indent="false"
    :object="{
      heads: '[]',
      indent: '  ',
      default: object?.default,
    }"
  />
</template>

<script>
import OList from './o-list.vue'
import ObjectsMixin from './objects.mixin.js'

export default {
  name: 'o-sentence',
  components: {
    OList,
  },
  mixins: [ObjectsMixin],
  data() {
    return {
      value: '',
    }
  },
  methods: {
    focus() {
      this.$refs.oList.focus()
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
