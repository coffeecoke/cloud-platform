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
    <el-table :data="tableData" style="width: 100%" :height="tableHeight" border :span-method="arraySpanMethod">
      <el-table-column fixed prop="number" label="" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed prop="name" :label="tableColumn[0].name" v-if="tableColumn[0].show" width="120">
        <template slot-scope="scope">
          <span class="text-color">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed prop="type" :label="tableColumn[1].name" v-if="tableColumn[1].show" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed prop="text" :label="tableColumn[2].name" v-if="tableColumn[2].show" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.text }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Cname" :label="tableColumn[3].name" v-if="tableColumn[3].show" width="120">
        <template slot-scope="scope">
          <span class="text-color">{{ scope.row.Cname }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="explain" :label="tableColumn[4].name" v-if="tableColumn[4].show" width="240">
        <template slot-scope="scope">
          <span>{{ scope.row.explain }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="range" :label="tableColumn[5].name" v-if="tableColumn[5].show" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.range }}</span>
        </template>
      </el-table-column>
      <el-table-column width="600" prop="logic" v-if="tableColumn[6].show">
        <template slot="header" slot-scope="scope">
          <div class="fetch-logic">
            <span class="fetch-logic-name">{{tableColumn[6].name}}</span>
            <div class="fetch-logic-tabs">

            </div>
            <div class="fetch-logic-btns">
              <span>全部({{0}})</span>
              <span>+新增</span>
            </div>
          </div>
        </template>
        <template slot-scope="scope">
          <div class="form-design-wrap">
            <form-design></form-design>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="summary" :label="tableColumn[7].name" v-if="tableColumn[7].show" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.summary }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" :label="tableColumn[8].name" v-if="tableColumn[8].show" width="120">
        <template slot-scope="scope">
          <i class="el-icon-delete"></i>
          <i class="el-icon-check"></i>
          <i class="el-icon-sort"></i>
        </template>
      </el-table-column>
      <el-table-column prop="question" :label="tableColumn[9].name" v-if="tableColumn[9].show" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.question }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" :label="tableColumn[10].name" v-if="tableColumn[10].show" width="120">
        <template slot-scope="scope">
           <template v-if="scope.row.edit">
            <el-select v-model="scope.row.state">
              <el-option v-for="item in state" :key="item.dictCode" :label="item.dictName"
                :value="item.dictCode" :disabled="item.disabled">
              </el-option>
            </el-select>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="system" :label="tableColumn[11].name" v-if="tableColumn[11].show" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.system }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="spring" :label="tableColumn[12].name" v-if="tableColumn[12].show" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.spring }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="processLogic" :label="tableColumn[13].name" v-if="tableColumn[13].show" width="120">
        <template slot-scope="scope">
           <template v-if="scope.row.edit">
            <el-select v-model="scope.row.processLogic">
              <el-option v-for="item in processLogic" :key="item.dictCode" :label="item.dictName"
                :value="item.dictCode" :disabled="item.disabled">
              </el-option>
            </el-select>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" :label="tableColumn[14].name" v-if="tableColumn[14].show" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.remarks}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
import FormDesign from './components/form-design'
import $ from 'jquery'
export default {
  components: {
    FormDesign
  },
  data () {
    return {
      // 表格高度
      tableHeight: null,
      // 合并的行数
      num: 0,
      // 默认选中的字段
      checkboxGroup: [],
      // table 列
      tableColumn: [{
        name: '新增字段',
        show: false
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
        name: '访谈纪要',
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

      tableData: [{
        id: 1,
        number: '1',
        name: 'DATA_DATE',
        type: 'CHA',
        text: '(a)',
        processLogic: '1',
        state: '3',
        Cname: '数据日期',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '数据日期',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '1',
        edit: true
      }, {
        id: 2,
        number: '2',
        name: 'CUST_NAM_EN',
        type: 'CHAR(6)',
        text: '(a)',
        processLogic: '1',
        state: '1',
        Cname: '客户英文名称',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '客户英文名称',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '1',
        edit: true
      }, {
        id: 3,
        number: '3',
        name: 'LALALLA',
        type: 'CHAR(2)',
        text: '(a)',
        processLogic: '1',
        state: '1',
        Cname: '境内境外标志',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '境内境外标志',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '3',
        edit: true
      }, {
        id: 4,
        number: '4',
        name: 'HEHASI',
        type: 'INT',
        text: '(a)',
        processLogic: '1',
        state: '1',
        Cname: '客户大类',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '客户大类',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '1',
        edit: true
      }, {
        id: 5,
        number: '5',
        name: 'FDEII',
        type: 'VARCHAR2(200)',
        text: '(a)',
        processLogic: '1',
        state: '1',
        Cname: '行政代码',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '行政代码',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '7',
        edit: true
      }, {
        id: 6,
        number: '6',
        name: 'DATA',
        type: 'CHAR(1)',
        text: '(a)',
        processLogic: '1',
        state: '1',
        Cname: '数据日期',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '数据日期',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '4',
        edit: true
      }, {
        id: 7,
        number: '7',
        name: 'DATA_DATE',
        type: 'CHAR(2)',
        text: '(a)',
        processLogic: '3',
        state: '1',
        Cname: '境内境外标志',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '境内境外标志',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '1',
        edit: true
      }],
      processLogic: [{
        dictCode: '1',
        dictName: '未提交'
      },
      {
        dictCode: '2',
        dictName: '已提交'
      },
      {
        dictCode: '3',
        dictName: '未确认'
      },
      {
        dictCode: '4',
        dictName: '已确认'
      }],
      state: [{
        dictCode: '1',
        dictName: '未提交'
      },
      {
        dictCode: '2',
        dictName: '已提交'
      },
      {
        dictCode: '3',
        dictName: '未确认'
      },
      {
        dictCode: '4',
        dictName: '已确认'
      }]
    }
  },
  // created () {
  //   let dictionaryObj = {
  //     dict_code: ['processLogic']
  //   }
  //   this.$api.dictionary.getDictionaries(dictionaryObj).then(res => {
  //     let result = res.data
  //     let dictionary = {}
  //     result.data.forEach(item => {
  //       Object.assign(dictionary, item)
  //     })
  //     this.processLogic = dictionary.processLogic
  //   })
  // },
  methods: {
    toggleColumn () {
      // 隐藏列之前先把每列隐藏
      this.tableColumn.forEach((item, index) => {
        item.show = false
      })
      // 根据复选框选中的数组，显示列
      this.checkboxGroup.forEach((item, index) => {
        let currArr = this.tableColumn.filter(obj => {
          return obj.name === item
        })
        currArr[0].show = true
      })
    },
    // 字段变更后的回调
    secletChange (selectedArr) {
      this.checkboxGroup = selectedArr
      this.toggleColumn()
    },
    // 合并列
    arraySpanMethod ({row, column, rowIndex, columnIndex}) {
      if (column.property === 'logic') { // 合并prop为logic那一列
        if (rowIndex % this.talbeTotleNum === 0) { // 合并多少行
          return {
            rowspan: this.talbeTotleNum, // 要合并的行数
            colspan: 1
          }
        } else {
          // console.log(rowIndex)
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  },
  computed: {
    // 根据table表头的数组对象，计算出字段名称的数组

    tableListKeys () {
      let tableListKeysArr = []
      this.tableColumn.forEach((item, index) => {
        tableListKeysArr.push(item.name)
      })
      return tableListKeysArr
    },
    // 表格数据条数
    talbeTotleNum () {
      return this.tableData.length
    }
  },
  mounted () {
    // 默认显示全部列
    this.tableColumn.forEach((item, index) => {
      this.checkboxGroup.push(item.name)
    })
    this.toggleColumn()

    // 根据屏幕计算屏幕的高度
    this.tableHeight = $('body').height() - $('.table-top').height() + 'px'
    window.onresize = () => {
      this.tableHeight = $('body').height() - $('.table-top').height() + 'px'
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

      h3 {
        width: 120px;
      }
    }

    .operation-btns {
      width: 300px;
    }

    .el-checkbox {
      margin-right: 0px;
    }

    .el-button+.el-button {
      margin-left: 0px;
    }
  }

  .el-table {
    th {
      div {
        line-height: 22px !important;
        display: block;
      }
    }
  }

  .text-color {
    color: #afcffb;
  }

  .el-table /deep/ .el-table__header {
    min-width: 100%
  }

  .el-table /deep/ .el-table__body {
    min-width: 100%
  }
  .el-table /deep/ td {
    position:relative;
  }
  .form-design-wrap {
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background-color:#fff;
  }
  .fetch-logic {
    display:flex;
    justify-content: space-between;
    align-items: center;
    .fetch-logic-name {
      width:50px;
      display:block;
    }
    .fetch-logic-tabs {
      flex:1;
    }
    .fetch-logic-btns {
      width:100px;
    }

  }
</style>
