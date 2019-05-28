<template>
  <div class="" id="">
    <div class="table-top">
      <div class="field-screening">
        <h3>字段筛选：</h3>
        <el-checkbox-group v-model="checkboxGroup" size="mini" @change='secletChange'>
          <el-checkbox v-for="(item,index) in tableListKeys" :key="index" :label="item" border></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="operation-btns">
        <el-button>新增字段</el-button>
        <el-button type="primary">保存</el-button>
        <el-button>导入</el-button>
        <el-button>导出</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 默认选中的字段
      checkboxGroup: ['新增字段', '类型'],
      // 表格中的key数组
      tableListKeys: ['新增字段', '类型', '(主键,可空)', '中文名称', '字段', '值域', '取数逻辑', '访谈纪要', '操作', '问题数', '状态', '系统.表.字段',
        '业务逻辑', '处理逻辑', '备注'
      ],
      tableColumn: [{
        name: '新增字段',
        show: true
      },
      {
        name: '类型',
        show: true
      },
      {
        name: '(主键,可空)',
        show: true
      },
      {
        name: '中文名称',
        show: true
      },
      {
        name: '字段',
        show: true
      },
      {
        name: '值域',
        show: true
      },
      {
        name: '取数逻辑',
        show: true
      },
      {
        name: '操作',
        show: true
      },
      {
        name: '问题数',
        show: true
      },
      {
        name: '状态',
        show: true
      },
      {
        name: '系统.表.字段',
        show: true
      },
      {
        name: '业务逻辑',
        show: true
      },
      {
        name: '处理逻辑',
        show: true
      },
      {
        name: '备注',
        show: true
      }

      ],

      tableList: [
        {
          name: ''
        }
      ]
    }
  },
  methods: {
    // 字段变更后的回调
    secletChange (selectedArr) {
      this.checkboxGroup = selectedArr
    }
  },
  activated () {}
}

</script>
<style scoped lang="scss">
  /* css */
  .table-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .field-screening {
      display: flex;
      align-items: center;
    }

    .el-checkbox {
      margin-right: 0px;
    }
  }

</style>
