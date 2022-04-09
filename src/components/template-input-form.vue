<template>
  <div class="template-input-form">
    <span v-for="(object, i) of separatedBody" :key="i">
      <component
        :v-if="getComponent(object.type)"
        :is="getComponent(object.type)"
        :object="object"
      />
    </span>
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
        .matchAll(/(?<key>[^\s]+?):\s+(?<value>(\[[^\]]+\]|[^,]+))(,|$)/g),
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
  methods: {
    getComponent(type) {
      return objectComponents['o-' + type]
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
        .replaceAll(/\/\*(.|\n)+?\*\/|\/\/.+?\n/g, '') // コメント (// foo, /* bar */)
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
            text ? separatedBody.push({ type: 'text', value: text }) : undefined

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

<style lang="scss" scoped></style>
