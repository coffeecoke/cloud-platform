<template>
  <div class="base-info">
    <!-- 基本信息 -->

    <el-row>
      <el-col :span="4">
        <box-wrap>
          <template slot="boxHeaderTitle">
            外部项目
          </template>
        </box-wrap>
      </el-col>
      <el-col :span="20">
        <div class="top-btns">
          <el-button class="add-row" @click.prevent="addRow()"><span>新增项目经历</span></el-button>
          <!-- <el-button class="add-row"><span>申请同步融鑫项目</span></el-button> -->
        </div>
      </el-col>
    </el-row>

    <el-table :data="tableData" :border="true" style="width: 100%">
      <el-table-column prop="date" label="开始结束日期">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-date-picker
              v-model="scope.row.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </template>
          <span v-else>{{getDateStr1(scope.row)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="industry" label="所属行业">
        <template slot-scope="scope">

          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.industry">
              <el-option v-for="item in industryOptions" :key="item.value" :label="item.label" :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{ formatIndustry(scope.row.industry) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="projectName" label="项目名称">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.trainingmode"></el-input>
          </template>
          <template v-else>
            <span>{{ scope.row.projectName }}</span>
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.projectName }}</p>
              <p>{{ scope.row.content }}</p>
              <i slot="reference" class="project-notice-icon"></i>
            </el-popover>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="projectSize" label="项目规模">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.projectSize"></el-input>
          </template>
          <span v-else>{{ scope.row.projectSize }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="担任角色">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.role"></el-input>
          </template>
          <span v-else>{{scope.row.role}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="duties" label="个人职责">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.duties"></el-input>
          </template>
          <span v-else>{{scope.row.duties}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="business" label="涉及业务">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.business"></el-input>
          </template>
          <span v-else>{{scope.row.business}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="technology" label="涉及技术">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.technology"></el-input>
          </template>
          <span v-else>{{scope.row.technology}}</span>
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
  </div>
</template>
<script>
import BoxWrap from '@/components/box.vue'
export default {
  components: {
    BoxWrap
  },
  data () {
    return {
      industryOptions: [
        {
          value: 1,
          label: '金融业'
        },
        {
          value: 2,
          label: '计算机行业'
        }
      ],
      isAddRow: true, // 保存上一条数据之后，才允许新增
      loading: false, // 数据加载的loading效果
      list: {
        id: null, // id为空表示新增
        date: null,
        industry: null,
        projectName: '',
        projectSize: '',
        role: '',
        duties: '',
        business: '',
        technology: '',
        edit: true
      },
      tableData: [
        {
          id: '1', // id为后台传入，后台的增删都是根据id进行的
          date: '',
          industry: 1,
          projectName: '培训机构',
          projectSize: '培训机构',
          role: '培训机构方式',
          duties: 'java开发',
          business: 'java',
          technology: 'jdc',
          content: '报送银监会报送银监会报送银监会报送银监会报送银监会报送银监会报送银监会',
          edit: false
        },
        {
          id: '2',
          date: '',
          industry: 2,
          projectName: '培训机构',
          projectSize: '培训机构',
          role: '培训机构方式',
          duties: 'java开发',
          business: 'java',
          technology: 'jdc',
          content: '报送银监会报送银监会报送银监会报送银监会报送银监会报送银监会报送银监会',
          edit: false
        }
      ]
    }
  },
  created () {
    this.$api.resoftProject.queryResoftProject().then(res => {
      let result = res.data
      if (result.stauts === '1') {
        this.tableData = result.data || []
      } else {
        this.$message('获取外部项目列表失败')
      }
    })
  },
  methods: {
    formatIndustry (value) {
      let currObj = this.industryOptions.filter(obj => {
        return obj.value === value
      })
      if (currObj.length > 0) {
        return currObj[0].label
      } else {
        return ''
      }
    },
    // 解析日期对象
    getDateStr1 (row) {
      if (!row.date) {
        return ''
      }
      let dateStr = `${row.date[0]} 至  ${row.date[1]}`
      return dateStr
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
      this.saveSubmit(row, formData)
    },
    // 保存提交
    saveSubmit (row, formData) {
      this.$api.resoftProject.saveResoftProject(formData).then(res => {
        this.loading = false
        let result = res.data
        if (result.status === 1) {
          row.edit = false
          this.isAddRow = true
          row = result.data // 保存此行数据后，后台返回这行数据，更新页面，目的是添加id，保证保存过得数据，数据都有ID
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '提交失败'
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
        this.$api.resoftProject.delresume(currData).then(res => {
          this.loading = false
          var result = res.data
          if (result.status === '1') {
            rows.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
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
<style lang="scss" scoped>
.top-btns {
  float:right;
}
.project-notice-icon {
  width:5px;
  height:16px;
  display:inline-block;
  vertical-align: middle;
  margin-left:10px;
  background:url('~@assets/imgs/project-notice-icon.png') center no-repeat;
}
</style>
