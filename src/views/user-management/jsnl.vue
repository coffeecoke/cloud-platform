<template>
  <box-wrap>
    <template slot="boxHeaderTitle">技术能力</template>
    <template slot="boxBodyInner">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="category" label="技能类别">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select v-model="scope.row.category" placeholder="请选择技能类别">
                <el-option v-for="item in categoryOptions" :key="item.label" :label="item.label" :value="item.label"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </template>
            <span v-else>{{ formatCategory(scope.row.category) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="profession" label="专业技能">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select v-model="scope.row.profession" placeholder="请选择专业技能">
                <el-option v-for="item in professionOptions" :key="item.value" :label="item.label" :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </template>
            <span v-else>{{ formatProfession(scope.row.profession) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="usageTime" label="使用时间">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="ipt" v-model="scope.row.usageTime"></el-input>
            </template>
            <span v-else>{{ scope.row.usageTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mastery" label="掌握程度">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select v-model="scope.row.mastery" placeholder="请选择掌握程度">
                <el-option v-for="item in masteryOptions" :key="item.key" :label="item.label" :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </template>
            <span v-else>{{ formatMastery(scope.row.mastery) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="recentUsage" label="最近使用日期">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-date-picker v-model="scope.row.recentUsage" type="date" placeholder="选择日期">
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
              <i class="save el-icon-upload2" @click="saveClick(scope.$index,scope.row)">
              </i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="add-row" @click.prevent="addRow()"><span>+ 新增技术能力</span></div>
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
      // 业务字典表
      categoryOptions: [
        {
          value: 1,
          label: '借款'
        },
        {
          value: 2,
          label: '贷款'
        }
      ],
      // 专业字典表
      professionOptions: [
        {
          value: 1,
          label: 'Js'
        },
        {
          value: 2,
          label: 'Java'
        }
      ],
      // 掌握程度字典表
      masteryOptions: [
        {
          value: 1,
          label: '精通'
        },
        {
          value: 2,
          label: '熟悉'
        }
      ],
      list: {
        id: null, // id为空表示新增
        category: 1,
        profession: 2,
        usageTime: null,
        mastery: 1,
        recentUsage: null,
        edit: true
      },
      tableData: [{
        id: '1', // id为空表示新增
        category: 1,
        profession: 2,
        usageTime: '',
        mastery: 1,
        recentUsage: '2018-09-07',
        edit: false
      }]
    }
  },
  created () {
    // 参数为用户认证之后的token，token放在http header中,方便以后做api响应拦截
    // this.$api.jsnl.queryTechnologicalCapability().then(res => {
    //   this.tableData = res
    // }).catch(res => {
    //   this.loading = false
    //   this.$message('获取失败')
    // })
  },
  methods: {
    formatCategory (value) {
      let currObj = this.categoryOptions.filter(obj => {
        return obj.value === value
      })
      return currObj[0].label
    },
    formatProfession (value) {
      let currObj = this.professionOptions.filter(obj => {
        return obj.value === value
      })
      return currObj[0].label
    },
    formatMastery (value) {
      let currObj = this.masteryOptions.filter(obj => {
        return obj.value === value
      })
      return currObj[0].label
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
      row.edit = false
      this.isAddRow = true
      let formData = new FormData()
      Object.keys(this.list).forEach(function (key) {
        formData.append(key, row[key]) // 遍历新增数据，把键值放在formData中传给后台
      })
      this.saveSubmit(index, formData)
    },
    // 保存提交
    saveSubmit (row, formData) {
      this.$api.jsnl.saveTechnologicalCapability(formData).then(res => {
        this.loading = false
        row = res // 保存此行数据后，后台返回这行数据，更新页面，目的是添加id，保证保存过得数据，数据都有ID
      }).catch(err => {
        console.log(err)
        this.$message('保存失败')
        this.loading = false
      })
    },
    // 删除一行
    deleteRow (index, rows) {
      if (rows[index].edit === true) { // 删除前，如果此行为不可编辑，把isAddRow置为true,防止在编辑状态删除后，出现不可新增的情况
        this.isAddRow = true
      }
      if (!rows[index].id) {
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
        this.$api.jsnl.delTechnologicalCapability(currData).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loading = false
        }).catch(res => {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
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
