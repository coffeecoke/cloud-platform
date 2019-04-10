<template>
  <div class="box-table">
    <el-table :data="tableData" border style="width: 100%" @row-click="handleCurrentChange">
      <el-table-column prop="date" label="开始日期">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.date"></el-input>
          </template>
          <span v-else>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endtime" label="结束日期">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.endtime"></el-input>
          </template>
          <span v-else>{{ scope.row.endtime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="trainingmode" label="培训方式">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.trainingmode"></el-input>
          </template>
          <span v-else>{{ scope.row.trainingmode }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="trainname" label="培训机构名称">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.trainname"></el-input>
          </template>
          <span v-else>{{ scope.row.trainname }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="traincon" label="培训内容">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.traincon"></el-input>
          </template>
          <span v-else>{{scope.row.traincon}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="technology" label="技能">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.technology"></el-input>
          </template>
          <span v-else>{{scope.row.technology}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="diploma" label="证书">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.diploma"></el-input>
          </template>
          <span v-else>{{scope.row.diploma}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="enclosure" label="附件">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.enclosure"></el-input>
          </template>
          <span v-else>{{scope.row.enclosure}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="edit" @click="scope.row.edit=true" type="text" size="small"></el-button>
          <el-button class="delect" type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">
          </el-button>
          <el-button class="save" @click="saveClick(scope.row)" type="text" size="small"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-row" @click.prevent="addRow()"><span>+ 添加培训经历</span></div>
  </div>
</template>
<script>
export default {
  methods: {
    handleCurrentChange (row, event, column) {
      console.log(row, event, column, event.currentTarget)
    },
    addRow (rows) {
      console.log(this.endtime)
      var list = {
        date: '',
        endtime: '2019-08-04',
        trainingmode: '',
        trainname: '',
        traincon: '',
        technology: '',
        diploma: '',
        enclosure: '',
        edit: true
      }
      this.tableData.push(list)
    },
    saveClick (rows) {
      rows.edit = false
    },
    handleClick (row) {
      console.log(row)
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    handleEdit (index, row) {
      console.log(index, row)
    }
  },
  data () {
    return {
      tableData: [{
        date: '2018-01-01',
        endtime: '2019-02-02',
        trainingmode: '培训机构',
        trainname: '培训机构',
        traincon: '培训机构方式',
        technology: 'java开发',
        diploma: 'java',
        enclosure: 'jdc',
        edit: false
      }
      ]
    }
  }
}

</script>
<style lang="scss">
  .edit {
    width: 18px;
    height: 18px;
    background: url("../../assets/imgs/edit.png") no-repeat center;
  }

  .delect {
    width: 18px;
    height: 18px;
    background: url("../../assets/imgs/delect.png") no-repeat center;
  }

  .save {
    width: 18px;
    height: 18px;
    background: url("../../assets/imgs/save.png") no-repeat center;
  }

  .box-table {
    .ipt {
      .el-input__inner {
        border: none !important;
        background: #f0f3f8;
      }
    }

    .active {
      .el-input__inner {
        background: none;
      }
    }
  }

  .has-gutter {
    tr {
      th {
        background: #3c81de;
        color: #fff;
        text-align: center;
      }
    }
  }

  .add-row {
    display: inline-block;
    padding: 10px 20px;
    background: #1a74ee;
    border-radius: 25px;
    margin-top: 20px;
    color: #fff;
  }

</style>
