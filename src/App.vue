<template>
  <div id="app">
    <div style="max-width: 1200px; margin: 24px auto; text-align: left;">
      <TagSelector :dataSource="data" />
    </div>
  </div>
</template>

<script>
import TagSelector from './components/TagSelector.vue'

export default {
  name: 'App',
  components: {
    TagSelector
  },
  data () {
    return {
      data: [
        {
          title: '客户属性特征',
          key: 'KHSXTZ',
          children: [
            {
              title: '人口属性',
              key: 'RKSX',
              children: [
                {
                  title: '性别',
                  key: 'XB',
                  children: [
                    { title: '男', key: 'XB-1' },
                    { title: '女', key: 'XB-2' },
                    { title: '未知', key: 'XB-9' }
                  ]
                },
                {
                  title: '年龄段',
                  key: 'NL',
                  children: [
                    { title: '18岁以下', key: 'NL-1' },
                    { title: '18-24岁', key: 'NL-2' },
                    { title: '25-30岁', key: 'NL-3' },
                    { title: '31-40岁', key: 'NL-4' },
                    { title: '41-50岁', key: 'NL-5' },
                    { title: '51-60岁', key: 'NL-6' },
                    { title: '61岁以上', key: 'NL-7' },
                    { title: '未知', key: 'NL-9' }
                  ]
                },
                {
                  title: '生肖',
                  key: 'SX',
                  children: [
                    { title: '鼠', key: 'SX-1' },
                    { title: '牛', key: 'SX-2' },
                    { title: '虎', key: 'SX-3' },
                    { title: '兔', key: 'SX-4' },
                    { title: '龙', key: 'SX-5' },
                    { title: '蛇', key: 'SX-6' },
                    { title: '马', key: 'SX-7' },
                    { title: '羊', key: 'SX-8' },
                    { title: '猴', key: 'SX-9' },
                    { title: '鸡', key: 'SX-10' },
                    { title: '狗', key: 'SX-11' },
                    { title: '猪', key: 'SX-12' },
                    { title: '未知', key: 'SX-99' }
                  ]
                }
              ]
            },
            {
              title: '社会属性',
              key: 'SHSX',
              children: [
                { title: '婚姻状况', key: 'HYZK' },
                { title: '教育程度', key: 'JYCD' },
                { title: '职业类型', key: 'ZYLX' }
              ]
            }
          ]
        },
        {
          title: '客户行为特征',
          key: 'KHXWTZ',
          children: [
            {
              title: '浏览行为',
              key: 'LLXW',
              children: [
                {
                  title: '浏览频次',
                  key: 'LLPC',
                  children: [
                    { title: '1次', key: 'LLPC-1' },
                    { title: '2次', key: 'LLPC-2' },
                    { title: '3次', key: 'LLPC-3' },
                    { title: '4次', key: 'LLPC-4' },
                    { title: '5次', key: 'LLPC-5' },
                    { title: '6次', key: 'LLPC-6' },
                    { title: '7次', key: 'LLPC-7' },
                    { title: '8次', key: 'LLPC-8' },
                    { title: '9次', key: 'LLPC-9' },
                    { title: '10次及以上', key: 'LLPC-10' }
                  ]
                },
                { title: '浏览时长', key: 'LLSC' },
                { title: '浏览深度', key: 'LLSD' }
              ]
            },
            {
              title: '购买行为',
              key: 'GMXW',
              children: [
                { title: '购买频次', key: 'GMPC' },
                { title: '购买金额', key: 'GMJE' },
                { title: '购买品类', key: 'GMPL' }
              ]
            },
            {
              title: '支付行为',
              key: 'ZFXW',
              children: [
                { title: '支付方式', key: 'ZFFS' },
                { title: '支付金额', key: 'ZFJE' },
                { title: '支付时间', key: 'ZFSJ' }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
