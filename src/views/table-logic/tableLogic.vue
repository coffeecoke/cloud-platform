<template>
  <div class="" id="" @click="isShowAllTags=false">
    <div class="table-top">
      <div class="field-screening">
        <h3>字段筛选：</h3>
        <el-checkbox-group v-model="checkboxGroup" size="mini" @change='secletChange'>
          <el-checkbox v-for="(item,index) in tableListKeys" :key="index" :label="item" border></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="operation-btns">
        <el-button>新增字段</el-button>
        <el-button type="primary" @click="saveClick()">保存</el-button>
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
          <span class="text-color" @click="showFieldDescription(scope.row)">{{ scope.row.Cname }}</span>
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
              <el-tag :key="tag.name" v-for="(tag,index) in frontTags" closable :disable-transitions="false"
                effect="dark" :type="tag.type" @close="handleClose(tag)" @click.native="highlight(index,tag)">
                {{tag.name}}
              </el-tag>

            </div>
            <div class="fetch-logic-btns">
              <span @click.stop="isShowAllTags=!isShowAllTags"><i class="arrow-icon fa fa-angle-down"></i>全部({{dynamicTags.length}})</span>
              <span>+新增</span>
            </div>
          </div>
        </template>
        <template slot-scope="scope">
          <div class="form-design-wrap">
            <form-design :dynamicTags = "dynamicTags" :isShowAllTags="isShowAllTags" @highlight = "allTagsHighlight" @handleClose="allHandleClose"></form-design>
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
              <el-option v-for="item in states" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{formatStatus(scope.row.state)}}<i class="edit-icon fa fa-edit" @click="editStatus(scope.row)"></i></span>
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
      <el-table-column prop="processLogic" :label="tableColumn[13].name" v-if="tableColumn[13].show" width="400">
        <template slot-scope="scope">
          <template v-if="scope.row.editList">
            <el-autocomplete class="inline-input" v-model="scope.row.processLogic" :fetch-suggestions="querySearch" placeholder="请输入内容"
              @select="handleSelect"></el-autocomplete>
          </template>
          <div v-else>
            <!-- <el-autocomplete class="inline-input" v-model="state1" :fetch-suggestions="querySearch" placeholder="请输入内容"
              @select="handleSelect"></el-autocomplete> -->
            <div class="ipt-box">{{scope.row.processLogic}}</div><i class="fa fa-edit" @click="editProcessLogic(scope.row)"></i>
            <!-- <i class="el-input__icon el-icon-caret-bottom icon-select" @click="handleIconClick"></i> -->
          </div>
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
      restaurants: [],
      state1: '',
      // 是否显示更多标签
      isShowAllTags: false,
      // table 列
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
        processLogic: 'aaa',
        state: '3',
        Cname: '数据日期',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '数据日期',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '1',
        edit: false,
        editList: false
      }, {
        id: 2,
        number: '2',
        name: 'CUST_NAM_EN',
        type: 'CHAR(6)',
        text: '(a)',
        processLogic: '',
        state: '1',
        Cname: '客户英文名称',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '客户英文名称',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '1',
        edit: false,
        editList: false
      }, {
        id: 3,
        number: '3',
        name: 'LALALLA',
        type: 'CHAR(2)',
        text: '(a)',
        processLogic: '',
        state: '1',
        Cname: '境内境外标志',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '境内境外标志',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '3',
        edit: false,
        editList: false
      }, {
        id: 4,
        number: '4',
        name: 'HEHASI',
        type: 'INT',
        text: '(a)',
        processLogic: '',
        state: '1',
        Cname: '客户大类',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '客户大类',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '1',
        edit: false,
        editList: false
      }, {
        id: 5,
        number: '5',
        name: 'FDEII',
        type: 'VARCHAR2(200)',
        text: '(a)',
        processLogic: '',
        state: '1',
        Cname: '行政代码',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '行政代码',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '7',
        edit: false,
        editList: false
      }, {
        id: 6,
        number: '6',
        name: 'DATA',
        type: 'CHAR(1)',
        text: '(a)',
        processLogic: '',
        state: '1',
        Cname: '数据日期',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '数据日期',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '4',
        edit: false,
        editList: false
      }, {
        id: 7,
        number: '7',
        name: 'DATA_DATE',
        type: 'CHAR(2)',
        text: '(a)',
        processLogic: '',
        state: '1',
        Cname: '境内境外标志',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '境内境外标志',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '1',
        edit: false,
        editList: false
      }],
      states: [{
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
      }
      ],
      dynamicTags: [{
        name: '标签一',
        type: 'primary'
      },
      {
        name: '标签二',
        type: 'primary'
      },
      {
        name: '标签三',
        type: 'primary'
      },
      {
        name: '标签四',
        type: 'primary'
      },
      {
        name: '标签五',
        type: 'primary'
      }
      ]

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

    formatStatus (value) {
      let currObj = this.states.filter(obj => {
        return obj.dictCode === value
      })
      return currObj.length > 0 ? currObj[0].dictName : ''
    },
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
    // 模糊搜索
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    saveClick () {
      this.tableData.forEach((item, index) => {
        console.log(item)
        item.editList = false
        item.edit = false
      })
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [{
        value: 'aaaaa'
      },
      {
        value: 'abccbcbcb'
      },
      {
        value: 'sssss'
      },
      {
        value: 'dddccc'
      },
      {
        value: 'qqqqq'
      }
      ]
    },
    handleSelect (item) {
      console.log(item)
    },
    handleIconClick (ev) {
      console.log(ev)
    },
    // 合并列
    arraySpanMethod ({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
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
    },
    // 切换全部标签的显示隐藏
    showAlltags () {
      this.isShowAllTags = !this.isShowAllTags
    },
    // 高亮当前选中的标签
    highlight (index, tag) {
      this.dynamicTags.forEach((item, index) => {
        item.type = 'primary'
      })
      tag.type = 'warning'
      this.dynamicTags.splice(index, 1, tag)
    },
    handleClose (index, tag) {
      this.dynamicTags.splice(index, 1)
    },
    // 点击全部里面的tag
    allTagsHighlight (index, tag) {
      this.dynamicTags.forEach((item, index) => {
        item.type = 'primary'
      })
      if (index < 3) {
        tag.type = 'warning'
      } else {
        tag.type = 'warning'
        this.dynamicTags.splice(index, 1)
        this.dynamicTags.unshift(tag)
      }
    },
    allHandleClose (index, tag) {
      this.dynamicTags.splice(index, 1)
    },
    // 编辑状态按钮
    editStatus (row) {
      row.edit = true
    },
    // 编辑处理逻辑按钮
    editProcessLogic (row) {
      row.editList = true
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
    },
    // 所有便签的前三个
    frontTags () {
      return this.dynamicTags.slice(0, 3)
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
    // this.list = this.states.map(item => {
    //   return {
    //     value: item,
    //     label: item
    //   }
    // })
    // 默认显示全部列
    this.tableColumn.forEach((item, index) => {
      this.checkboxGroup.push(item.name)
    })
    // this.toggleColumn()

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

  .text-color {
    color: #afcffb;
  }

  .el-table /deep/ .el-table__header {
    min-width: 100%
  }

  .el-table /deep/ .el-table__body {
    min-width: 100%
  }

  .ipt-box {
    width: 80%;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    display: inline-block;
    // border: solid 1px #ccc;
    vertical-align: middle;
  }

  .icon-select {
    border: solid 1px #ccc;
    height: 28px;
    line-height: 28px;
    display: inline-block;
    margin-left: -4px;
    vertical-align: middle;
  }

  .el-table /deep/ td {
    position: relative;
  }

  .form-design-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
  }

  .fetch-logic {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0px;

    .fetch-logic-name {
      width: 60px;
      display: block;
    }

    .fetch-logic-tabs {
      flex: 1;
      position: relative;

    }

    .fetch-logic-btns {
      width: 110px;
    }

    .fetch-logic-tabs /deep/ .el-tag {
      margin-right: 5px;
      border: 1px solid #fff;
      color: #fff;
      cursor: pointer;
    }

    .fetch-logic-tabs /deep/ .el-tag--warning {
      color: #fff;
      border: 1px solid #E6A23C;
      background-color: #E6A23C
    }

    .fetch-logic-tabs /deep/ .el-tag__close {
      color: #fff;
    }

    .arrow-icon {
      margin-right: 5px;
    }
  }
  .edit-icon {
    margin-left:40px;
    cursor: pointer;
  }
</style>
