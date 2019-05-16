<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))
      let opt = {
        title: {
          text: ''
        },
        grid: {
          top: '20%'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12
            }
          }
        },
        legend: {
          x: 'center',
          show: false,
          data: ['夫妻', '战友', '亲戚']
        },
        series: [

          {
            type: 'graph',
            layout: 'force',
            symbolSize: 45,
            focusNodeAdjacency: true,
            roam: true,
            categories: [{
              name: '夫妻',
              itemStyle: {
                normal: {
                  color: '#009800'
                }
              }
            }, {
              name: '战友',
              itemStyle: {
                normal: {
                  color: '#4592FF'
                }
              }
            }, {
              name: '亲戚',
              itemStyle: {
                normal: {
                  color: '#3592F'
                }
              }
            }],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12
                }
              }
            },
            force: {
              repulsion: 1000
            },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 10
                },
                formatter: '{c}'
              }
            },
            data: [{
              name: '徐贱云',
              draggable: true
            }, {
              name: '冯可梁',
              category: 2,
              draggable: true
            }, {
              name: '邓志荣',
              category: 1,
              draggable: true
            }, {
              name: '李荣庆',
              category: 1,
              draggable: true
            }, {
              name: '郑志勇',
              category: 1,
              draggable: true
            }, {
              name: '赵英杰',
              category: 1,
              draggable: true
            }, {
              name: '王承军',
              category: 1,
              draggable: true
            }, {
              name: '陈卫东',
              category: 1,
              draggable: true
            }, {
              name: '邹劲松',
              category: 1,
              draggable: true
            }, {
              name: '赵成',
              category: 1,
              draggable: true
            }, {
              name: '陈现忠',
              category: 1,
              draggable: true
            }, {
              name: '陶泳',
              category: 1,
              draggable: true
            }, {
              name: '王德福',
              category: 1,
              draggable: true
            }],
            links: [{
              source: 0,
              target: 1,
              category: 0,
              value: ''
            }, {
              source: 0,
              target: 2,
              value: ''
            }, {
              source: 0,
              target: 3,
              value: ''
            }, {
              source: 0,
              target: 4,
              value: ''
            }, {
              source: 1,
              target: 2,
              value: ''
            }, {
              source: 0,
              target: 5,
              value: ''
            }, {
              source: 4,
              target: 5,
              value: ''
            }, {
              source: 2,
              target: 8,
              value: ''
            }, {
              source: 0,
              target: 12,
              value: ''
            }, {
              source: 6,
              target: 11,
              value: ''
            }, {
              source: 6,
              target: 3,
              value: ''
            }, {
              source: 7,
              target: 5,
              value: ''
            }, {
              source: 9,
              target: 10,
              value: ''
            }, {
              source: 3,
              target: 10,
              value: ''
            }, {
              source: 2,
              target: 11,
              value: ''
            }],
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0
              }
            }
          }
        ]
      }
      this.chart.setOption(opt)
    }
  }
}
</script>
