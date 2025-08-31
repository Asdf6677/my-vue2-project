<template>
  <div class="tag-selector">
    <a-card title="系统标签" :bordered="false">
      <div class="selected-tags">
        <span>已选择标签：</span>
        <a-tag v-for="tag in selectedFlatLabels" :key="tag" color="blue" closable @close.prevent="removeTag(tag)">{{ tag }}</a-tag>
        <a-button type="link" @click="clearAll" v-if="selectedFlatLabels.length">清空</a-button>
      </div>

      <a-tabs>
        <a-tab-pane key="cust" tab="客户属性特征">
          <div class="group">
            <div class="group-title">人口属性</div>
            <div class="group-body">
              <a-checkbox :indeterminate="isIndeterminate('age')" :checked="isCheckedAll('age')" @change="toggleAll('age', $event)">年龄段</a-checkbox>
              <a-checkbox-group v-model="selected.age" :options="options.age" @change="syncMaster('age')"/>

              <a-divider />

              <a-checkbox :indeterminate="isIndeterminate('gender')" :checked="isCheckedAll('gender')" @change="toggleAll('gender', $event)">性别</a-checkbox>
              <a-checkbox-group v-model="selected.gender" :options="options.gender" @change="syncMaster('gender')"/>

              <a-divider />

              <a-checkbox :indeterminate="isIndeterminate('zodiac')" :checked="isCheckedAll('zodiac')" @change="toggleAll('zodiac', $event)">生肖</a-checkbox>
              <a-checkbox-group v-model="selected.zodiac" :options="options.zodiac" @change="syncMaster('zodiac')"/>

              <a-divider />

              <a-checkbox :indeterminate="isIndeterminate('constellation')" :checked="isCheckedAll('constellation')" @change="toggleAll('constellation', $event)">星座</a-checkbox>
              <a-checkbox-group v-model="selected.constellation" :options="options.constellation" @change="syncMaster('constellation')"/>

              <a-divider />

              <a-checkbox :indeterminate="isIndeterminate('education')" :checked="isCheckedAll('education')" @change="toggleAll('education', $event)">最高学历</a-checkbox>
              <a-checkbox-group v-model="selected.education" :options="options.education" @change="syncMaster('education')"/>

              <a-divider />

              <a-checkbox :indeterminate="isIndeterminate('marital')" :checked="isCheckedAll('marital')" @change="toggleAll('marital', $event)">婚姻状况</a-checkbox>
              <a-checkbox-group v-model="selected.marital" :options="options.marital" @change="syncMaster('marital')"/>

              <a-divider />

              <a-checkbox :indeterminate="isIndeterminate('children')" :checked="isCheckedAll('children')" @change="toggleAll('children', $event)">子女数量</a-checkbox>
              <a-checkbox-group v-model="selected.children" :options="options.children" @change="syncMaster('children')"/>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
  
</template>

<script>
export default {
  name: 'TagSelector',
  data() {
    return {
      options: {
        age: [
          { label: '未成年', value: '未成年' },
          { label: '青年', value: '青年' },
          { label: '壮年', value: '壮年' },
          { label: '老年', value: '老年' }
        ],
        gender: [
          { label: '男', value: '男' },
          { label: '女', value: '女' },
          { label: '未知', value: '未知' }
        ],
        zodiac: [
          { label: '属鼠', value: '属鼠' },
          { label: '属牛', value: '属牛' },
          { label: '属虎', value: '属虎' },
          { label: '属兔', value: '属兔' },
          { label: '属龙', value: '属龙' },
          { label: '属蛇', value: '属蛇' },
          { label: '属马', value: '属马' },
          { label: '属羊', value: '属羊' },
          { label: '属猴', value: '属猴' },
          { label: '属鸡', value: '属鸡' },
          { label: '属狗', value: '属狗' },
          { label: '属猪', value: '属猪' }
        ],
        constellation: [
          { label: '白羊座', value: '白羊座' },
          { label: '金牛座', value: '金牛座' },
          { label: '双子座', value: '双子座' },
          { label: '巨蟹座', value: '巨蟹座' },
          { label: '狮子座', value: '狮子座' },
          { label: '处女座', value: '处女座' },
          { label: '天秤座', value: '天秤座' },
          { label: '天蝎座', value: '天蝎座' },
          { label: '射手座', value: '射手座' },
          { label: '摩羯座', value: '摩羯座' },
          { label: '水瓶座', value: '水瓶座' },
          { label: '双鱼座', value: '双鱼座' }
        ],
        education: [
          { label: '研究生', value: '研究生' },
          { label: '大学本科', value: '大学本科' },
          { label: '专科', value: '专科' },
          { label: '中职', value: '中职' },
          { label: '高中', value: '高中' },
          { label: '初中', value: '初中' },
          { label: '小学', value: '小学' },
          { label: '其他', value: '其他' }
        ],
        marital: [
          { label: '未婚', value: '未婚' },
          { label: '已婚', value: '已婚' },
          { label: '丧偶', value: '丧偶' },
          { label: '离婚', value: '离婚' },
          { label: '未知', value: '未知' }
        ],
        children: [
          { label: '无子女', value: '无子女' },
          { label: '独生子女', value: '独生子女' },
          { label: '子女成双', value: '子女成双' },
          { label: '儿女成行', value: '儿女成行' }
        ]
      },
      selected: {
        age: ['青年'],
        gender: [],
        zodiac: [],
        constellation: [],
        education: [],
        marital: ['未婚'],
        children: []
      }
    }
  },
  computed: {
    selectedFlatLabels() {
      const labels = []
      Object.keys(this.selected).forEach(key => {
        this.selected[key].forEach(v => labels.push(v))
      })
      return labels
    }
  },
  methods: {
    isCheckedAll(key) {
      const all = this.options[key].map(o => o.value)
      return this.selected[key].length === all.length
    },
    isIndeterminate(key) {
      const len = this.selected[key].length
      return len > 0 && !this.isCheckedAll(key)
    },
    toggleAll(key, e) {
      const checked = e.target.checked
      const all = this.options[key].map(o => o.value)
      this.selected[key] = checked ? all : []
    },
    syncMaster() {
      // exists for symmetry, group checkboxes two-way bind already
    },
    removeTag(tagLabel) {
      Object.keys(this.selected).forEach(key => {
        const idx = this.selected[key].indexOf(tagLabel)
        if (idx !== -1) this.selected[key].splice(idx, 1)
      })
    },
    clearAll() {
      Object.keys(this.selected).forEach(key => {
        this.selected[key] = []
      })
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

