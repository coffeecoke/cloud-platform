<template>
  <div class="box-table">

    <el-table :data="tableData" border style="width: 100%" v-loading="loading" :fit='true'>
      <el-table-column prop="date" label="开始日期">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-date-picker value-format="yyyy-MM-dd" class="ipt" v-model="scope.row.date" type="date"
              placeholder="选择日期"></el-date-picker>
          </template>
          <span v-else>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endtime" label="结束日期">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-date-picker value-format="yyyy-MM-dd" class="ipt" v-model="scope.row.endtime" type="date"
              placeholder="选择日期"></el-date-picker>
          </template>
          <span v-else>{{ scope.row.endtime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="trainingMode" label="培训方式">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.trainingMode" placeholder="请选择培训方式">
              <el-option v-for="item in trainingMode" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </template>
          <!-- <span v-else>{{ formatTrainingMode(scope.row.trainingMode) }}</span> -->

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
      <el-table-column prop="techSkill" label="技能">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.formatTechSkill" @focus="showSkillTree(scope)"></el-input>
          </template>
          <span v-else>{{ scope.row.formatTechSkill }}</span>
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
            <el-button type="primary" @click="dialogUpload(scope)">编辑<i class="el-icon-edit el-icon--right"></i>
            </el-button>
          </template>
          <ul class="file-list--readonly" v-else>
            <li v-for="(item, index) in scope.row.fileList" :key="index">{{item.name}}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="btn-icons-group">
            <i class="edit el-icon-edit" @click="scope.row.edit=true;isAddRow=false"></i>
            <i class="delect el-icon-delete" @click="deleteRow(scope.$index, tableData)">
            </i>
            <i class="save el-icon-upload2" @click="saveClick(scope.$index,scope.row)">
            </i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-row" @click.prevent="addRow()"><span>+ 添加培训经历</span></div>

    <!-- 上传修改图片的dialog -->
    <el-dialog title="编辑图片附件" :visible.sync="dialogUploadVisible" width="30%">
      <el-upload class="upload-demo" ref="fileUpload" action="aa" accept="image/jpeg, image/png" :limit="3"
        :auto-upload="false" list-type="picture" :file-list="currUploadScope && currUploadScope.row.fileList"
        :on-remove="handleRemove" multiple>
        <el-button type="primary" slot="trigger">添加图片</el-button>
        <!-- <el-button type="primary" @click = "submitUpload">上传至服务器<i class="el-icon-upload el-icon--right"></i></el-button> -->
      </el-upload>
    </el-dialog>

    <!-- 技能树 -->
    <el-dialog title="技能选择" :visible.sync="dialogTechSkillTree" center>
      <el-tree :data="techSkill" show-checkbox node-key="id" ref="techSkillTree" highlight-current
        :props="defaultProps" :default-checked-keys="[5]">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancle">取 消</el-button>
        <el-button type="primary" @click="dialogOk">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data () {
    return {
      isAddRow: true,
      loading: false,
      dialogUploadVisible: false,
      currUploadScope: null,
      currTechSkillScope: null,
      dialogTechSkillTree: false,
      files: [],
      trainingMode: [{
        dictCode: 1,
        dictName: '网教育'
      },
      {
        dictCode: 2,
        dictName: '1对1'
      },
      {
        dictCode: 3,
        dictName: '课堂'
      }

      ],
      techSkill: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      list: {
        id: '',
        date: '',
        endtime: '',
        trainingMode: '',
        trainname: '',
        traincon: '',
        techSkill: [],
        formatTechSkill: '',
        diploma: '',
        fileList: [],
        edit: true
      },
      tableData: [{
        id: '1',
        date: '2018-01-01',
        endtime: '2019-02-02',
        trainingMode: '培训方式',
        trainname: '培训机构名称',
        traincon: '培训内容',
        techSkill: [1, 4, 9, 10],
        formatTechSkill: '11',
        diploma: '证书',
        fileList: [{
          id: '222',
          name: '学历1.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          id: null,
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        edit: false
      },
      {
        id: '2',
        date: '2018-01-01',
        endtime: '2019-02-02',
        trainingMode: '培训方式',
        trainname: '培训名称',
        traincon: '培训内容',
        techSkill: [5, 6, 3, 7, 8],
        formatTechSkill: '22',
        diploma: '',
        fileList: [{
          name: '学历1.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: '学历2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        edit: false
      }
      ]
    }
  },
  created () {
    let dictionaryObj = {
      dict_code: ['trainingMode']
    }
    this.$api.dictionary.getDictionaries(dictionaryObj).then(res => {
      let result = res.data
      let dictionary = {}
      result.data.forEach(item => {
        Object.assign(dictionary, item)
      })

      this.trainingMode = dictionary.trainingMode
    })
    // 技术能力字典表
    this.$api.dictionary.getDictionariesTree({
      dict_code: 'techSkill'
    }).then(res => {
      let result = res.data
      if (result.status === '1') {
        this.techSkill = result.data
      }
    })

    // 参数需要用户认证，获取token
    this.$api.trainingExperience.queryResumeby().then(res => {
      let result = res.data
      if (result.status === '1') {
        this.tableData = result.data || []
      } else {
        this.$message('获取培训经历列表失败')
      }
    })
  },
  methods: {
    formatTrainingMode (value) {
      let currObj = this.trainingMode.filter(obj => {
        return obj.dictCode === value
      })
      return currObj.length > 0 ? currObj[0].dictName : ''
    },
    dialogUpload (scope) {
      this.dialogUploadVisible = true
      this.currUploadScope = scope
    },
    // 显示技能树弹出框
    showSkillTree (scope) {
      let _this = this
      this.dialogTechSkillTree = true
      this.currTechSkillScope = scope
      this.$nextTick(function () {
        this.$refs.techSkillTree.setCheckedKeys(_this.currTechSkillScope.row.techSkill)
      })
    },
    // 弹出框取消
    dialogCancle () {
      this.dialogTechSkillTree = false
    },
    // 弹出框确定
    dialogOk () {
      this.dialogTechSkillTree = false
      let checkedLabels = []
      this.currTechSkillScope.row.techSkill = this.$refs.techSkillTree.getCheckedKeys()
      let checkedNodes = this.$refs.techSkillTree.getCheckedNodes()
      checkedNodes.forEach((item, index) => {
        if (!item.children) {
          checkedLabels.push(item.label)
        }
      })
      console.log()
      console.log(checkedLabels.join(','))
      this.currTechSkillScope.row.formatTechSkill = checkedLabels.join(',')
    },

    // 添加一行数据
    addRow (rows) {
      if (this.isAddRow) {
        this.tableData.push(Object.assign({}, this.list))
        this.isAddRow = false
      } else {
        this.$notify({
          title: '提示',
          message: '请先保存上一条再添加！',
          type: 'warning',
          offset: 100
        })
        return false
      }
    },
    // 上传图片到服务器
    submitUpload () {
      let currRow = this.currUploadScope.row
      let formData = new FormData()
      formData.append('id', this.currUploadScope.row.id)
      if (this.$refs.fileUpload && this.$refs.fileUpload.uploadFiles.length > 0) {
        this.$refs.fileUpload.uploadFiles && this.$refs.fileUpload.uploadFiles.forEach(file => {
          if (file.raw && !file.id) { // 只上传本次上传的附件，排除之前上传的
            formData.append('files', file.raw)
          } else {
            return false
          }
        })
      }

      // 请求接口
      this.$api.trainingExperience.saveEnclosure(formData).then(res => {
        let result = res.data
        if (result.status === '1') {
          currRow.fileList = result.data // 根据后台更新fileList
          console.log(currRow.fileList)
          this.$message({
            type: 'success',
            message: '上传附件成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '上传附件失败'
          })
        }
      })
    },
    handleRemove (file, fileList) {
      console.log(file)
      console.log(fileList)
      if (file.id) {
        this.$api.trainingExperience.delEnclosureSingle({
          id: file.id
        }).then(res => {
          let result = res.data
          if (result.status === '1') {
            this.$message({
              type: 'success',
              message: '删除图片成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除图片失败!'
            })
          }
          this.loading = false
        })
      }
    },
    // 保存
    saveClick (index, row) {
      if (row.edit === false) {
        this.$message('请先编辑')
        return false
      }
      this.loading = true
      let formData = new FormData()
      if (this.$refs.fileUpload && this.$refs.fileUpload.uploadFiles.length > 0) {
        this.$refs.fileUpload.uploadFiles.forEach(file => {
          if (file.raw && !file.id) { // 只上传本次上传的附件，排除之前上传的
            formData.append('files', file.raw)
          } else {
            return false
          }
        })
      }
      Object.keys(this.list).forEach(function (key) {
        formData.append(key, row[key])
      })
      this.saveSubmit(index, formData)
    },
    saveSubmit (index, formData) {
      let row = this.tableData[index]
      this.$api.trainingExperience.saveresume(formData).then(res => {
        this.loading = false
        let result = res.data // 保存此行数据后，后台返回这行数据，更新页面，目的是添加id，保证保存过得数据，数据都有ID
        if (result.status === '1') {
          row.edit = false
          this.isAddRow = true
          row = result.data
          this.tableData.splice(index, 1, row)
          this.$message({
            type: 'success',
            message: '保存培训经历条目成功'
          })
        } else {
          this.$message({
            type: 'success',
            message: '保存培训经历条目失败'
          })
        }
      })
    },
    deleteRow (index, rows) {
      if (rows[index].edit === true) { // 删除前，如果此行为不可编辑，把isAddRow置为true,防止在编辑状态删除后，出现不可新增的情况
        this.isAddRow = true
      }
      // console.log(rows[index])
      if (!rows[index].id) {
        rows.splice(index, 1) // 如果id为空，说明没有进行过保存操作，前台直接删除，不同调用后台
        return false
      }
      this.$confirm('是否要删除此条培训经历', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        var currData = rows[index]
        this.$api.trainingExperience.delresume({
          id: currData.id
        }).then(res => {
          let result = res.data
          if (result.status === '1') {
            this.$message({
              type: 'success',
              message: '删除培训经历条目成功!'
            })
            rows.splice(index, 1)
          } else {
            this.$message({
              type: 'error',
              message: '删除培训经历条目失败!'
            })
          }
          this.loading = false
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
  .el-upload-list--picture .el-upload-list__item-thumbnail {
    width: auto;
    height: 120px;
  }

  .el-dialog__body {
    max-height: 400px;
    overflow: auto;
  }

  .el-upload-list--picture .el-upload-list__item {
    height: auto;
  }

</style>
