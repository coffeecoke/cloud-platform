<template>
  <div class="box-table">
    <el-table :data="tableData" border style="width: 100%">
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
            <el-upload class="upload-demo" :ref="'upload'+scope.$index" action="aa" :limit="3" :auto-upload="false"
              :file-list="scope.row.fileList">
              <el-button icon="el-icon-plus" circle></el-button>
            </el-upload>
          </template>
          <ul class="file-list--readonly" v-else>
            <li v-for="(item, index) in scope.row.fileList" :key="index">{{item.name}}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
         <div class="btn-icons-group">
            <i class="edit el-icon-edit"  @click="scope.row.edit=true"></i>
            <i class="delect el-icon-delete" @click="deleteRow(scope.$index, tableData)">
            </i>
            <i class="save el-icon-upload2" @click="saveClick(scope.$index,scope.row)">
            </i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-row" @click.prevent="addRow()"><span>+ 添加培训经历</span></div>
  </div>
</template>
<script>
import {queryResumeby, saveresume, delresume} from '@/api/training-experience'
export default {
  data () {
    return {
      list: {
        date: '',
        endtime: '',
        trainingmode: '',
        trainname: '',
        traincon: '',
        technology: '',
        diploma: '',
        enclosure: '',
        files: [],
        fileList: [],
        edit: true
      },
      tableData: [{
        date: '2018-01-01',
        endtime: '2019-02-02',
        trainingmode: '培训机构',
        trainname: '培训机构',
        traincon: '培训机构方式',
        technology: 'java开发',
        diploma: 'java',
        enclosure: 'jdc',
        fileList: [{
          name: 'img1.png',
          url: ''
        },
        {
          name: 'img2.png',
          url: ''
        }
        ],
        edit: false
      }]
    }
  },
  created () {
    // 参数需要用户认证，获取token
    queryResumeby().then(res => {
      console.log(res)
    }).catch(res => {
      this.$message('获取失败')
    })
  },
  methods: {
    addRow (rows) {
      this.tableData.push(Object.assign({}, this.list))
    },
    // 保存
    saveClick (index, row) {
      if (row.edit === false) {
        this.$message('请先编辑')
        return false
      }
      row.edit = false
      let formData = new FormData()
      var currUpload = 'upload' + index
      row.fileList = []
      Object.entries(this.$refs[currUpload].uploadFiles).forEach(file => {
        formData.append('files', file[1].raw)
        formData.append('fileUid', file[1].uid)
        row.fileList.push({
          name: file[1].name
        })
      })
      Object.keys(this.list).forEach(function (key) {
        formData.append(key, row[key])
      })
      this.saveSubmit(formData)
    },
    saveSubmit (formData) {
      saveresume(formData).then(function (res) {
        console.log(res)
      }).catch(function (err) {
        console.log(err)
        this.$message('保存失败')
      })
    },
    deleteRow (index, rows) {
      this.$confirm('是否要删除此条培训经历', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var currData = rows[index]
        delresume(currData).then(res => {
          rows.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(res => {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}

</script>
<style lang="scss" scope>

</style>
