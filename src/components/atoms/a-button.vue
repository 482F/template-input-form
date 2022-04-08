<template>
  <v-btn
    @click="$emit('click', $event)"
    :icon="icon"
    flat
    density="compact"
    :variant="variant"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'a-button',
  props: {
    icon: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'contained',
    },
  },
}
</script>
