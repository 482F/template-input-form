<template>
  <div class="template-input-form">
    <div v-for="(line, i) of separatedBody" :key="i">
      {{ line }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'template-input-form',
  props: {
    template: {
      type: Object,
      required: true,
    },
    result: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    separatedBody() {
      const body = this.template?.body
      if (!body) {
        return []
      }
      const separatedBody = []
      this.template.body
        .replaceAll(/\/\*(.|\n)+?\*\/|\/\/.+?\n/gm, '')
        .split('\n')
        .forEach((line) => {
          separatedBody.push({ type: 'text', value: line })
        })
      return separatedBody
    },
  },
}
</script>

<style lang="scss" scoped></style>
