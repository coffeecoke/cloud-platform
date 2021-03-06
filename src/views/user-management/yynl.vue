<template>
  <box-wrap>
    <template slot="boxHeaderTitle">语言能力</template>
    <template slot="boxBodyInner">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="languages" label="语种">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select v-model="scope.row.languages" placeholder="请选择语种">
                <el-option v-for="item in languages" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </template>
            <span v-else>{{ formatLanguage(scope.row.languages) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="literacy" label="读写能力">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select v-model="scope.row.literacy">
                <el-option v-for="item in masteryLevel" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </template>
            <span v-else>{{ formatLiteracy(scope.row.literacy) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lsAblility" label="听说能力">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select v-model="scope.row.lsAblility">
                <el-option v-for="item in masteryLevel" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </template>
            <span v-else>{{ formatLsAblility(scope.row.lsAblility)}}</span>
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
      <div class="add-row" @click.prevent="addRow()"><span>+ 新增语言能力</span></div>
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
      languages: [
        {
          dictCode: '1',
          dictName: '英语'
        },
        {
          dictCode: '2',
          dictName: '日语'
        }
      ],
      // 读写字典表
      masteryLevel: [
        {
          dictCode: '1',
          dictName: '精通'
        },
        {
          dictCode: '2',
          dictName: '一般'
        }
      ],
      isAddRow: true, // 保存上一条数据之后，才允许新增
      loading: false, // 数据加载的loading效果
      list: {
        id: '', // id为空表示新增
        languages: '',
        literacy: '',
        lsAblility: '',
        edit: true
      },
      tableData: []
    }
  },
  created () {
    let dictionaryObj = {
      dict_code: [ 'languages', 'masteryLevel' ]
    }
    this.$api.dictionary.getDictionaries(dictionaryObj).then(res => {
      let result = res.data
      let dictionary = {}
      result.data.forEach(item => {
        Object.assign(dictionary, item)
      })
      this.languages = dictionary.languages
      this.masteryLevel = dictionary.masteryLevel
    })

    // 参数为用户认证之后的token，token放在http header中,方便以后做api响应拦截
    this.$api.yynl.queryLanguageAbility().then(res => {
      let result = res.data
      if (result.status === '1') {
        this.tableData = result.data || []
      } else {
        this.$message('获取语言能力列表失败')
      }
    })
  },
  methods: {
    formatLanguage (value) {
      let currObj = this.languages.filter(obj => {
        return obj.dictCode === value
      })
      console.log(currObj)
      return currObj.length > 0 ? currObj[0].dictName : ''
    },
    formatLiteracy (value) {
      let currObj = this.masteryLevel.filter(obj => {
        return obj.dictCode === value
      })
      return currObj.length > 0 ? currObj[0].dictName : ''
    },
    formatLsAblility (value) {
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
      this.$api.yynl.saveLanguageAbility(formData).then(res => {
        this.loading = false
        let result = res.data// 保存此行数据后，后台返回这行数据，更新页面，目的是添加id，保证保存过得数据，数据都有ID
        if (result.status === '1') {
          row.edit = false
          this.isAddRow = true
          row = result.data
          this.tableData.splice(index, 1, row)
          this.$message({
            type: 'success',
            message: '保存语言条目成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '保存语言条目失败'
          })
        }
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
        this.$api.yynl.delLanguageAbility(currData).then(res => {
          let result = res.data
          if (result.status === '1') {
            this.$message({
              type: 'success',
              message: '删除语言能力条目成功!'
            })
            rows.splice(index, 1)
          } else {
            this.$message({
              type: 'error',
              message: '删除语言能力条目失败!'
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
