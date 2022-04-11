<template>
  <span>
    <v-tooltip
      :model-value="tooltipValue"
      @update:model-value="showTooltipIfNeeded"
      anchor="bottom"
    >
      <template v-slot:activator="{ props }">
        <a-button icon @click="$emit('click')" v-bind="props">
          <a-icon>
            {{ icon }}
          </a-icon>
        </a-button>
      </template>
      {{ tooltip }}
    </v-tooltip>
  </span>
</template>

<script>
export default {
  name: 'a-icon-button',
  data() {
    return {
      tooltipValue: false,
    }
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    tooltip: {
      type: String,
      default: '',
    },
  },
  methods: {
    showTooltipIfNeeded(newValue) {
      if (!this.tooltip) {
        newValue = false
      }
      this.tooltipValue = newValue
    },
  },
}
</script>

<style lang="scss" scoped></style>
