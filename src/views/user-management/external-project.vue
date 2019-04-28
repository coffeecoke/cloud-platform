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
            <el-date-picker v-model="scope.row.date" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </template>
          <span v-else>{{getDateStr1(scope.row)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="industry" label="所属行业">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.industry">
              <el-option v-for="item in industry" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
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
      <el-table-column prop="projectScale" label="项目规模">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.projectScale">
              <el-option v-for="item in projectScale" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{ formatProjectScale(scope.row.projectScale) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="projectRole" label="担任角色">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.projectRole">
              <el-option v-for="item in projectRole" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{ formatProjectRole(scope.row.projectRole) }}</span>
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
      <el-table-column prop="businessSkill" label="涉及业务">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.businessSkill">
              <el-option v-for="item in businessSkill" :key="item.dictCode" :label="item.dictName"
                :value="item.dictCode" :disabled="item.disabled">
              </el-option>
            </el-select>
          </template>
          <span v-else>{{ formatInvolvingBusiness(scope.row.businessSkill) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="techSkill" label="技能">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="ipt" size="small" v-model="scope.row.formatTechSkill" @focus="showSkillTree(scope)">
            </el-input>
          </template>
          <span v-else>{{ scope.row.formatTechSkill }}</span>
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
    <!-- 技能树 -->
    <el-dialog title="技能选择" :visible.sync="dialogTechSkillTree" center>
      <el-tree :data="techSkill" show-checkbox node-key="id" ref="techSkillTree" highlight-current
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancle">取 消</el-button>
        <el-button type="primary" @click="dialogOk">确 定</el-button>
      </span>
    </el-dialog>
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
      isAddRow: true, // 保存上一条数据之后，才允许新增
      loading: false, // 数据加载的loading效果
      currTechSkillScope: null,
      dialogTechSkillTree: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      industry: [{
        dictCode: '1',
        dictName: '金融'
      },
      {
        dictCode: '2',
        dictName: '建筑'
      }
      ],
      projectScale: [{
        dictCode: '1',
        dictName: '超大型'
      },
      {
        dictCode: '2',
        dictName: '大型'
      },
      {
        dictCode: '3',
        dictName: '小型'
      }
      ],
      projectRole: [{
        dictCode: '1',
        dictName: '项目经理'
      },
      {
        dictCode: '2',
        dictName: '架构师'
      }
      ],
      businessSkill: [{
        dictCode: '1',
        dictName: '监管'
      },
      {
        dictCode: '2',
        dictName: '发文'
      }
      ],
      techSkill: [{
        dictCode: '1',
        dictName: '微服务'
      },
      {
        dictCode: '2',
        dictName: '框架异构'
      }
      ],
      list: {
        id: null, // id为空表示新增
        date: '',
        industry: '',
        projectName: '',
        projectScale: '',
        projectRole: '',
        duties: '',
        businessSkill: '',
        techSkill: [],
        edit: true
      },
      tableData: [{
        id: '1', // id为后台传入，后台的增删都是根据id进行的
        date: '',
        industry: 1,
        projectName: '',
        projectScale: '',
        projectRole: '',
        duties: '',
        businessSkill: '',
        techSkill: '',
        content: '报送银监会报送银监会报送银监会报送银监会报送银监会报送银监会报送银监会',
        edit: false
      },
      {
        id: '2',
        date: '',
        industry: 2,
        projectName: '',
        projectSize: '1',
        projectRole: '2',
        duties: '',
        business: '1',
        techSkill: '1',
        content: '',
        edit: false
      }
      ]
    }
  },
  created () {
    let dictionaryObj = {
      dict_code: ['industry', 'projectScale', 'projectRole', 'businessSkill']
    }
    this.$api.dictionary.getDictionaries(dictionaryObj).then(res => {
      let result = res.data
      let dictionary = {}
      result.data.forEach(item => {
        Object.assign(dictionary, item)
      })
      this.industry = dictionary.industry
      this.projectScale = dictionary.projectScale
      this.projectRole = dictionary.projectRole
      this.businessSkill = dictionary.businessSkill
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

    this.$api.externalProject.queryExternalProjects().then(res => {
      let result = res.data
      if (result.status === '1') {
        this.tableData = result.data || []
      } else {
        this.$message('获取外部项目列表失败')
      }
    })
  },
  methods: {
    formatIndustry (value) {
      let currObj = this.industry.filter(obj => {
        return obj.dictCode === value
      })
      return currObj.length > 0 ? currObj[0].dictName : ''
    },
    formatProjectScale (value) {
      let currObj = this.projectScale.filter(obj => {
        return obj.dictCode === value
      })
      return currObj.length > 0 ? currObj[0].dictName : ''
    },
    formatProjectRole (value) {
      let currObj = this.projectRole.filter(obj => {
        return obj.dictCode === value
      })
      return currObj.length > 0 ? currObj[0].dictName : ''
    },
    formatInvolvingBusiness (value) {
      let currObj = this.businessSkill.filter(obj => {
        return obj.dictCode === value
      })
      return currObj.length > 0 ? currObj[0].dictName : ''
    },

    // 解析日期对象
    getDateStr1 (row) {
      if (!row.date) {
        return ''
      }
      let dateStr = `${row.date[0]} 至  ${row.date[1]}`
      return dateStr
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
      this.currTechSkillScope.row.formatTechSkill = checkedLabels.join(',')
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
      this.$api.externalProject.saveExternalProjects(formData).then(res => {
        this.loading = false
        let result = res.data
        if (result.status === '1') {
          row.edit = false
          this.isAddRow = true
          row = result.data // 保存此行数据后，后台返回这行数据，更新页面，目的是添加id，保证保存过得数据，数据都有ID
          this.tableData.splice(index, 1, row)
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
        this.$api.externalProject.delExternalProjects(currData).then(res => {
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
    float: right;
  }

  .project-notice-icon {
    width: 5px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    background: url('~@assets/imgs/project-notice-icon.png') center no-repeat;
  }

</style>
