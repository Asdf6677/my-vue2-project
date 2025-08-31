<template>
  <div class="tag-selector">
    <a-card title="系统标签" :bordered="false">
      <div class="selected-tags">
        <span>已选择标签：</span>
        <a-tag
          v-for="t in selectedTagList"
          :key="t.key"
          color="blue"
          closable
          @close.prevent="removeTag(t.key)"
        >{{ t.title }}</a-tag>
        <a-button type="link" @click="clearAll" v-if="selectedTagList.length">清空</a-button>
      </div>

      <a-tabs>
        <a-tab-pane
          v-for="tab in tabs"
          :key="tab.key"
          :tab="tab.title"
        >
          <div v-for="(group, idx) in tab.groups" :key="group.key" class="group">
            <div class="group-title">{{ group.parentTitle }}</div>
            <div class="group-body">
              <a-checkbox :indeterminate="isIndeterminate(group.key)" :checked="isCheckedAll(group.key)" @change="toggleAll(group.key, $event)">{{ group.title }}</a-checkbox>
              <template v-if="group.options && group.options.length">
                <a-checkbox-group v-model="selected[group.key]" :options="group.options" />
              </template>
              <template v-else>
                <a-empty description="暂无选项" />
              </template>
            </div>
            <a-divider v-if="idx < tab.groups.length - 1" />
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'TagSelector',
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: {},
      leafKeyToTitle: {}
    }
  },
  computed: {
    tabs() {
      const buildGroups = (node, parentTitle) => {
        let groups = []
        if (!node || !node.children) return groups
        node.children.forEach(child => {
          if (child.children && child.children.length) {
            const firstGrand = child.children[0]
            const isLeafLevel = !firstGrand.children || firstGrand.children.length === 0
            if (isLeafLevel) {
              const options = child.children.map(g => ({ label: g.title, value: g.key }))
              options.forEach(o => { this.leafKeyToTitle[o.value] = o.label })
              groups.push({ key: child.key, title: child.title, options, parentTitle })
            } else {
              groups = groups.concat(buildGroups(child, child.title))
            }
          }
        })
        return groups
      }

      const result = (this.dataSource || []).map(tab => ({
        key: tab.key,
        title: tab.title,
        groups: buildGroups(tab, tab.title)
      }))

      // ensure selected map has keys
      const nextSelected = { ...this.selected }
      result.forEach(t => t.groups.forEach(g => {
        if (!nextSelected[g.key]) nextSelected[g.key] = []
      }))
      this.selected = nextSelected
      return result
    },
    selectedTagList() {
      const list = []
      Object.keys(this.selected).forEach(groupKey => {
        this.selected[groupKey].forEach(leafKey => {
          list.push({ key: leafKey, title: this.leafKeyToTitle[leafKey] || leafKey })
        })
      })
      return list
    }
  },
  methods: {
    isCheckedAll(groupKey) {
      const group = this.findGroup(groupKey)
      const allValues = (group && group.options ? group.options.map(o => o.value) : [])
      return this.selected[groupKey] && this.selected[groupKey].length === allValues.length && allValues.length > 0
    },
    isIndeterminate(groupKey) {
      const len = (this.selected[groupKey] || []).length
      return len > 0 && !this.isCheckedAll(groupKey)
    },
    toggleAll(groupKey, e) {
      const checked = e.target.checked
      const group = this.findGroup(groupKey)
      const all = group && group.options ? group.options.map(o => o.value) : []
      this.$set(this.selected, groupKey, checked ? all : [])
    },
    removeTag(leafKey) {
      Object.keys(this.selected).forEach(gk => {
        const idx = this.selected[gk].indexOf(leafKey)
        if (idx !== -1) this.selected[gk].splice(idx, 1)
      })
    },
    clearAll() {
      Object.keys(this.selected).forEach(gk => {
        this.$set(this.selected, gk, [])
      })
    },
    findGroup(groupKey) {
      for (const tab of this.tabs) {
        const found = tab.groups.find(g => g.key === groupKey)
        if (found) return found
      }
      return null
    }
  }
}
</script>

<style scoped>
.tag-selector {
  background: #fff;
}
.group { padding: 8px 0; }
.group-title { font-weight: 600; margin-bottom: 8px; }
.group-body { display: grid; grid-template-columns: 1fr; row-gap: 12px; }
.selected-tags { margin-bottom: 8px; }
</style>

