export default {
  props: {
    object: {
      type: Object,
      required: true,
    },
  },
  computed: {
    width() {
      return Number(this.object.width) || 16
    },
    height() {
      return Number(this.object.height) || 8
    },
  },
}
