<template>
  <a-button icon @click="$emit('click')">
    <a-icon>
      {{ icon }}
    </a-icon>
  </a-button>
</template>

<script>
export default {
  name: 'a-icon-button',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
