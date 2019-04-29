<template>
  <div class="" id="">
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="姓名">
        <el-input v-model="searchForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border v-loading="loading" header-cell-class-name="tableHeader" :height="tableHeight">
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="D_SEX" label="性别">
      </el-table-column>
      <el-table-column prop="phone" label="电话">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="contact" label="紧急联系人">
      </el-table-column>
      <el-table-column prop="contactInfo" label="紧急联系方式">
      </el-table-column>
      <el-table-column prop="education" label="学历">
      </el-table-column>
      <el-table-column prop="major" label="专业">
      </el-table-column>
      <el-table-column prop="degree" label="学位">
      </el-table-column>
      <el-table-column prop="fullTime" label="全日制">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click.native.prevent="viewInfo(scope.$index,scope.row)" type="text">查看</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="pagination-wrap">

      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total"
        @current-change="handleCurrChange" @size-change="handleSizeChange">
      </el-pagination>
    </div>

    <!-- 弹出人员信息概览 -->
    <el-dialog title="人员信息概览" :visible.sync="dialogInformationOverview" :dialogLoading="dialogLoading">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="培训经历" name="first">
          <template>
            <el-table :data="trainingTableData" border style="width: 100%">
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
                      <el-option v-for="item in trainingMode" :key="item.dictCode" :label="item.dictName"
                        :value="item.dictCode" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </template>
                  <span v-else>{{ scope.row.trainingMode}}</span>

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
                    <el-input class="ipt" size="small" v-model="scope.row.formatTechSkill"
                      @focus="showSkillTree(scope)"></el-input>
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
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="业务能力" name="second">
          <template>
            <el-table :data="ywnlTableData" border style="width: 100%">
              <el-table-column prop="businessSkill" label="业务类型">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit">
                    <el-select v-model="scope.row.businessSkill" placeholder="请选择业务类型">
                      <el-option v-for="item in businessSkill" :key="item.dictCode" :label="item.dictName"
                        :value="item.dictCode" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </template>
                  <span v-else>{{scope.row.businessSkill}}</span>
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
              <el-table-column prop="masteryLevel" label="掌握程度">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit">
                    <el-select v-model="scope.row.masteryLevel" placeholder="请选择掌握程度">
                      <el-option v-for="item in masteryLevel" :key="item.dictCode" :label="item.dictName"
                        :value="item.dictCode" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </template>
                  <span v-else>{{ scope.row.masteryLevel}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="recentUsage" label="最近使用日期">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit">
                    <el-date-picker v-model="scope.row.recentUsage" type="date" placeholder="选择日期"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </template>
                  <span v-else>{{ scope.row.recentUsage }}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="技术能力" name="third">
          <template>
            <el-table :data="jsnlTableData" border style="width: 100%">
              <el-table-column prop="techSkill" label="专业技能">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit">
                    <el-input class="ipt" size="small" v-model="scope.row.formatTechSkill"
                      @focus="showSkillTree(scope)">
                    </el-input>
                  </template>
                  <span v-else>{{ scope.row.formatTechSkill }}</span>
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
              <el-table-column prop="masteryLevel" label="掌握程度">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit">
                    <el-select v-model="scope.row.masteryLevel" placeholder="请选择掌握程度">
                      <el-option v-for="item in masteryLevel" :key="item.dictCode" :label="item.dictName"
                        :value="item.dictCode" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </template>
                  <span v-else>{{ scope.row.masteryLevel }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="recentUsage" label="最近使用日期">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit">
                    <el-date-picker v-model="scope.row.recentUsage" type="date" placeholder="选择日期"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </template>
                  <span v-else>{{ scope.row.recentUsage }}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="语言能力" name="fourth">
          <template>
            <el-table :data="yynlTableData" border style="width: 100%">
              <el-table-column prop="languages" label="语种">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit">
                    <el-select v-model="scope.row.languages" placeholder="请选择语种">
                      <el-option v-for="item in languages" :key="item.dictCode" :label="item.dictName"
                        :value="item.dictCode" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </template>
                  <span v-else>{{ scope.row.languages }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="literacy" label="读写能力">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit">
                    <el-select v-model="scope.row.literacy">
                      <el-option v-for="item in masteryLevel" :key="item.dictCode" :label="item.dictName"
                        :value="item.dictCode" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </template>
                  <span v-else>{{ scope.row.literacy}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="lsAblility" label="听说能力">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit">
                    <el-select v-model="scope.row.lsAblility">
                      <el-option v-for="item in masteryLevel" :key="item.dictCode" :label="item.dictName"
                        :value="item.dictCode" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </template>
                  <span v-else>{{ scope.row.lsAblility}}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 查询条件
      searchForm: {
        name: ''
      },
      // 弹出层
      dialogLoading: false,
      dialogInformationOverview: false,
      // 标签页
      activeName: 'first',
      // 表格
      loading: false,
      tableHeight: null,
      currPage: 1, // 当前页
      total: 1000, // 总条数
      pageSize: 10, // 一页显示多少条
      pageNum: 1, // 需要查询的页码
      // 人员列表数据
      tableData: [{
        userId: '',
        name: '',
        D_SEX: '',
        phone: '',
        email: '',
        contact: '',
        contactInfo: '',
        education: '',
        major: '',
        degree: '',
        fullTime: ''
      }],
      // 培训经历
      trainingTableData: [{
        id: '',
        date: '',
        endtime: '',
        trainingMode: '',
        trainname: '',
        traincon: '',
        formatTechSkill: '',
        diploma: '',
        fileList: [],
        edit: false
      }],
      // 业务能力
      ywnlTableData: [{
        id: null, // id为空表示新增
        businessSkill: '',
        usageTime: '',
        masteryLevel: '',
        recentUsage: '',
        edit: false
      }],
      // 技术能力
      jsnlTableData: [{
        id: null, // id为空表示新增
        techSkill: [],
        formatTechSkill: '',
        usageTime: '',
        masteryLevel: '',
        recentUsage: '',
        edit: false
      }],
      // 语言能力
      yynlTableData: [{
        id: '', // id为空表示新增
        languages: '',
        literacy: '',
        lsAblility: '',
        edit: false
      }]
    }
  },
  methods: {
    onSubmit () {
      this.getTableList() // 通过条件查询列表
    },
    // 获取人员列表表格数据
    getTableList () {
      this.loading = true
      let params = {
        // 查询条件
        name: this.searchForm.name,
        // 分页
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        customerNumber: '00'
      }
      this.$api.partner.getUserAll(params).then(res => {
        let result = res.data
        this.loading = false
        if (result.status === '1') {
          console.log(result.data.list.length)
          this.tableData = result.data.list || []
          this.total = result.data.total
          this.currPage = result.data.pageNum
        } else {
          this.$message({
            type: 'error',
            message: '请求数据失败'
          })
        }
      })
    },
    // 条目改变时
    handleSizeChange (value) {
      // console.log(currPage)
    },
    // 改变时
    handleCurrChange (value) {
      this.pageNum = value
      this.getTableList()
    },
    viewInfo (index, row) {
      let userId = row.userId
      // 根据ID获取培训经历
      this.$api.partner.queryResumebyId({
        id: userId
      }).then(res => {
        let result = res.data
        if (result.status === '1') {
          this.trainingTableData = result.data || []
        }
      })
      // 根据ID获取业务能力
      this.$api.partner.queryProfessionalCapabilityById({
        id: userId
      }).then(res => {
        let result = res.data
        if (result.status === '1') {
          this.ywnlTableData = result.data || []
        }
      })
      // 根据ID获取技术能力
      this.$api.partner.queryTechnologicalCapabilityById({
        id: userId
      }).then(res => {
        let result = res.data
        if (result.status === '1') {
          this.jsnlTableData = result.data || []
        }
      })
      // 根据ID获取语言能力
      this.$api.partner.queryLanguageAbilityById({
        id: userId
      }).then(res => {
        let result = res.data
        if (result.status === '1') {
          this.yynlTableData = result.data || []
        }
      })
      // 显示弹出框
      this.dialogInformationOverview = true
    },
    // 标签页点击回调
    handleClick (currTab) {}
  },
  created () {
    this.getTableList() // 获取人员列表
  },
  mounted () {
    this.tableHeight = document.body.clientHeight - 240 + 'px'
    window.onresize = () => {
      this.tableHeight = document.body.clientHeight - 240 + 'px'
    }
  },
  activated () {}
}

</script>
<style scoped lang="scss">

</style>
