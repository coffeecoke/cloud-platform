<template>
  <box-wrap>
    <template slot="boxHeaderTitle">业务能力</template>
    <template slot="boxBodyInner">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="businessSkill" label="业务类型">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select v-model="scope.row.businessSkill" placeholder="请选择业务类型">
                <el-option v-for="item in businessSkill" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </template>
            <span v-else>{{ formatCategory(scope.row.businessSkill)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="usageTime" label="使用时间">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="ipt"  v-model="scope.row.usageTime"></el-input>
            </template>
            <span v-else>{{ scope.row.usageTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="masteryLevel" label="掌握程度">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select v-model="scope.row.masteryLevel" placeholder="请选择掌握程度">
                <el-option v-for="item in masteryLevel" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </template>
            <span v-else>{{ formatMastery(scope.row.masteryLevel)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="recentUsage" label="最近使用日期">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-date-picker v-model="scope.row.recentUsage" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </template>
            <span v-else>{{ scope.row.recentUsage }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="btn-icons-group">
              <i class="edit el-icon-edit" @click="scope.row.edit=true;isAddRow=false"></i>
              <i class="delect el-icon-delete" @click="deleteRow(scope.$index, tableData)">
              </i>
              <i class="save fa fa-save" @click="saveClick(scope.$index,scope.row)">
              </i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="add-row" @click.prevent="addRow()"><span>+ 新增业务能力</span></div>
    </template>
  </box-wrap>
</template>
<script>
// 自定义box组件，用到了*具名插槽*
import BoxWrap from '@/components/box.vue'
export default {
  components: {
    BoxWrap
  },
  data () {
    return {
      isAddRow: true, // 保存上一条数据之后，才允许新增
      loading: false, // 数据加载的loading效果
      businessSkill: [
        {
          dictCode: '1',
          dictName: '借款'
        },
        {
          dictCode: '2',
          dictName: '贷款'
        }
      ],
      // 掌握程度字典表
      masteryLevel: [
        {
          dictCode: '1',
          dictName: '精通'
        },
        {
          dictCode: '2',
          dictName: '熟悉'
        }
      ],
      list: {
        id: null, // id为空表示新增
        businessSkill: '',
        usageTime: '',
        masteryLevel: '',
        recentUsage: '',
        edit: true
      },
      tableData: []
    }
  },
  created () {
    let dictionaryObj = {
      dict_code: [ 'businessSkill', 'masteryLevel' ]
    }
    this.$api.dictionary.getDictionaries(dictionaryObj).then(res => {
      let result = res.data
      let dictionary = {}
      result.data.forEach(item => {
        Object.assign(dictionary, item)
      })
      this.businessSkill = dictionary.businessSkill
      this.masteryLevel = dictionary.masteryLevel
    })

    this.$api.ywnl.queryProfessionalCapability().then(res => {
      let result = res.data
      if (result.status === '1') {
        if (!result.data) {
          this.tableData = []
        } else {
          this.tableData = result.data
        }
      } else {
        this.$message('获取业务能力列表失败')
      }
    })
  },
  methods: {
    formatCategory (value) {
      let currObj = this.businessSkill.filter(obj => {
        return obj.dictCode === value
      })
      return currObj.length > 0 ? currObj[0].dictName : ''
    },
    formatMastery (value) {
      let currObj = this.masteryLevel.filter(obj => {
        return obj.dictCode === value
      })
      return currObj.length > 0 ? currObj[0].dictName : ''
    },
    // 添加一行
    addRow () {
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
    // 点击保存
    saveClick (index, row) {
      if (row.edit === false) {
        // 只有编辑状态才能进行保存操作，避免重复无用的后台请求
        this.$message('请先编辑')
        return false
      }
      this.loading = true
      let formData = new FormData()
      Object.keys(this.list).forEach(function (key) {
        formData.append(key, row[key]) // 遍历新增数据，把键值放在formData中传给后台
      })
      this.saveSubmit(index, formData)
    },
    // 保存提交
    saveSubmit (index, formData) {
      let row = this.tableData[index]
      this.$api.ywnl.saveProfessionalCapability(formData).then(res => {
        this.loading = false
        let result = res.data // 保存此行数据后，后台返回这行数据，更新页面，目的是添加id，保证保存过得数据，数据都有ID
        if (result.status === '1') {
          row.edit = false
          this.isAddRow = true
          row = result.data
          this.tableData.splice(index, 1, row)
          this.$message({
            type: 'success',
            message: '保存业务能力条目成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '保存业务能力条目失败'
          })
        }
      })
    },
    // 删除一行
    deleteRow (index, rows) {
      if (rows[index].edit === true) { // 删除前，如果此行为不可编辑，把isAddRow置为true,防止在编辑状态删除后，出现不可新增的情况
        this.isAddRow = true
      }
      console.log(rows[index])
      if (!rows[index].id) {
        alert(1)
        rows.splice(index, 1) // 如果id为空，说明没有进行过保存操作，前台直接删除，不用调用后台
        return false
      }
      this.$confirm('是否要删除此条数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        var currData = rows[index]
        this.$api.ywnl.delProfessionalCapability(currData).then(res => {
          let result = res.data
          if (result.status === '1') {
            this.$message({
              type: 'success',
              message: '删除业务能力条目成功!'
            })
            rows.splice(index, 1)
          } else {
            this.$message({
              type: 'error',
              message: '删除业务能力条目失败!'
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
  },
  activated () {}
}

</script>
<style scoped lang="scss">
  /* css */

</style>
