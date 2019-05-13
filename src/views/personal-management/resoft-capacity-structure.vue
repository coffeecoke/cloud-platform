<template>
  <div class="" id="">
    <div class="btns">
      <el-button type="primary" @click="submitData()">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </div>
    <el-table :data="ruleForm.treeData" :border="true" row-key="id" style="width: 100%"
      header-cell-class-name="tableHeader" @cell-dblclick="cellDbclick" :height="tableHeight">
      <el-table-column v-for="(item, index) in props" :key="index" :prop="item.prop" :label="item.lable">
        <template slot-scope="scope">
          <input class="ipt show-input" size="small" v-model="scope.row[item.prop]" type="number" max=10 @input="if(scope.row[item.prop]>10) scope.row[item.prop]=10">
          <span class="show-num">{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      edit: true,
      tableHeight: null,
      ruleForm: {
        treeData: [{
          'capability': '业务能力',
          'economics': '1',
          'PoliticalEconomy': '1',
          'Finance': '1',
          'id': 'root/staffInfo/skill/businessSkill',
          'internationaltrade': '1',
          'Philosophy': '1',
          'statistics': '4',
          'children': [{
            'capability': '普通存款',
            'economics': '1',
            'PoliticalEconomy': '1',
            'Finance': '1',
            'id': 'root/staffInfo/skill/businessSkill/finbusiness/bank/DEP/GENDEP',
            'internationaltrade': '1',
            'Philosophy': '1',
            'statistics': '1'
          },
          {
            'capability': '内部账',
            'economics': '1',
            'PoliticalEconomy': '1',
            'Finance': '1',
            'id': 'root/staffInfo/skill/businessSkill/finbusiness/bank/DEP/INNERBANK',
            'internationaltrade': '1',
            'Philosophy': '1',
            'statistics': '1'
          },
          {
            'capability': '结构性存款',
            'economics': '1',
            'PoliticalEconomy': '1',
            'Finance': '1',
            'id': 'root/staffInfo/skill/businessSkill/finbusiness/bank/DEP/STUDEP',
            'internationaltrade': '1',
            'Philosophy': '1',
            'statistics': '1'
          }
          ]
        },
        {
          'capability': '技术能力',
          'economics': '1',
          'PoliticalEconomy': '1',
          'Finance': '1',
          'id': 'root/staffInfo/skill/techSkill',
          'internationaltrade': '1',
          'Philosophy': '1',
          'statistics': '1'
        },
        {
          'capability': '语言能力',
          'economics': '1',
          'PoliticalEconomy': '1',
          'Finance': '1',
          'id': 'root/staffInfo/skill/languages',
          'internationaltrade': '1',
          'Philosophy': '1',
          'statistics': '1'
        }
        ]

      },

      props: [{
        prop: 'capability',
        lable: '能力分类'
      },
      {
        prop: 'statistics',
        lable: '统计学'
      },
      {
        prop: 'Finance',
        lable: '金融学'
      },
      {
        prop: 'economics',
        lable: '经济学'
      },
      {
        prop: 'PoliticalEconomy',
        lable: '政治经济学'
      },
      {
        prop: 'internationaltrade',
        lable: '国际贸易'
      },
      {
        prop: 'Philosophy',
        lable: '哲学'
      }
      ]
    }
  },
  activated () {},
  mounted () {
    this.tableHeight = document.body.clientHeight - 220 + 'px'
    window.onresize = () => {
      this.tableHeight = document.body.clientHeight - 220 + 'px'
    }
  },
  methods: {
    cellDbclick (row, column, cell, event) {
      let columnIndex = $(cell).index()
      if (columnIndex > 0) {
        $(cell).find('.show-input').show()
        $(cell).find('.show-num').hide()
      }
    },
    submitData () {

    }

  }
}

</script>
<style scoped lang="scss">
  /* css */
  .show-input {
    display: none;
  }

  .show-num {
    display: block;
  }

  .el-table /deep/ .cell {
    display: flex;
    justify-content: flex-start;
  }

  .el-table /deep/ .el-table__body-wrapper {
    overflow: auto;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    margin-bottom:10px;
  }
  .ipt {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    font-size: inherit;
    height: 32px;
    line-height: 32px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }

</style>
