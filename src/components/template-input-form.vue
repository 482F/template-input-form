<template>
  <div class="template-input-form">
    <component
      v-for="(object, i) of separatedBody"
      ref="objects"
      class="object"
      :key="i"
      :is="getComponent(object.type) ?? 'span'"
      :object="object"
      v-model:result="results[i]"
      @keydown.capture="(e) => onKeydown(e, i)"
    />
  </div>
</template>

<script>
const rawObjectComponents = import.meta.globEager('./objects/*.vue')
const objectComponents = Object.fromEntries(
  Object.entries(rawObjectComponents).map(([path, { default: component }]) => [
    path.match(/[^/]+(?=\.vue)/)[0],
    component,
  ])
)

function parseObject(objectString) {
  return Object.fromEntries(
    [
      ...objectString
        .replaceAll(/^\$\{|\}$/gm, '')
        .matchAll(/(?<key>[^\s]+?):\s*(?<value>(\[[^\]]+\]|[^,]+))(,|$)/g),
    ].map((match) => [match.groups.key, match.groups.value])
  )
}

export default {
  name: 'template-input-form',
  components: {},
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
  data() {
    return {
      results: [],
    }
  },
  methods: {
    moveForm(currentIndex, delta) {
      const objects = this.$refs.objects
      ;(delta < 0
        ? objects.slice(0, currentIndex).reverse()
        : objects.slice(currentIndex + 1)
      )
        .filter((object) => object?.focus && !object.__proto__)?.[0]
        ?.focus()
    },
    onKeydown(e, i) {
      if (e.key === 'Enter' && e.ctrlKey) {
        const delta = e.shiftKey ? -1 : 1
        this.moveForm(i, delta)
        e.stopPropagation()
      }
    },
    getComponent(type) {
      return objectComponents['o-' + type]
    },
  },
  watch: {
    'template.name'() {
      this.results = []
    },
    'results': {
      handler() {
        const result = {}
        for (const part of this.results) {
          if (!part) {
            continue
          }
          for (const [key, value] of Object.entries(part)) {
            result[key] ??= []
            result[key].push(value)
          }
        }
        this.$emit('update:result', result)
      },
      deep: true,
    },
  },
  computed: {
    separatedBody() {
      const body = this.template?.body
      let objectIndex = -1
      const objects = []
      if (!body) {
        return []
      }
      const separatedBody = []

      this.template.body
        .replaceAll(/^\/\*(.|\n)*?\*\/\n|^\/\/.*?\n/gm, '') // 行頭からのコメント (// foo, /* bar */)
        .replaceAll(/\/\*(.|\n)*?\*\/$|\/\/.*?$/gm, '') // 前に何かあるコメント (abc // foo, def /* bar */)
        .replaceAll(/\$\{([^}]+)\}/g, (match) => {
          // オブジェクト (${foobar})
          // 副作用有り
          objectIndex += 1
          objects[objectIndex] = parseObject(match)
          return `\${${objectIndex}}`
        })
        .split('\n')
        .forEach((line) => {
          const matches = line.matchAll(/\$\{(\d+)\}/g)
          let processed = 0
          const pushTextIfNeeded = (text) =>
            text
              ? separatedBody.push({ type: 'plain', value: text })
              : undefined

          for (const match of matches) {
            pushTextIfNeeded(line.slice(processed, match.index))
            separatedBody.push(objects[match[1]])
            processed += match.index + match[0].length
          }
          pushTextIfNeeded(line.slice(processed, line.length))
          separatedBody.push({ type: 'newline' })
        })
      return separatedBody
    },
  },
}
</script>

<style lang="scss" scoped>
.template-input-form {
  > .object {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
