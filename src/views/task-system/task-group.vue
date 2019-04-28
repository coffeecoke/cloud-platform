<template>
  <div class="tasktable">
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="slot-tree">
          <el-button class="comp-tr-top" type="primary" @click="handleAddTop()">添加顶级节点</el-button>
          <el-tree ref="eventCategoryTree" :data="eventCategoryTree" :props="defaultProps" node-key="id"
            :render-content="renderContent" @node-click="confirm">
          </el-tree>
          <el-dialog title="新增任务组" width="25%" class="add-event-dialog" :visible.sync="addEventdialogVisible"
            size="tiny">
            <el-form ref="addEventForm" :model="addEventForm">
              <el-form-item label="父节点" prop="taskGroupParentName">
                <el-input v-model="addEventForm.taskGroupParentName" disabled='true'></el-input>
              </el-form-item>
              <el-form-item label="任务组编号" prop="taskGroupId">
                <el-input v-model="addEventForm.taskGroupId"></el-input>
              </el-form-item>
              <el-form-item label="任务组名称" prop="taskGroupName">
                <el-input v-model="addEventForm.taskGroupName"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addEventdialogVisible=false">取 消</el-button>
              <el-button type="primary" @click="addEventFormSubmitBtn('addEventForm')">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 新增根节点 -->
          <el-dialog title="新增根节点" width="25%" class="add-event-dialog" :visible.sync="addRootdialogVisible"
            size="tiny">
            <el-form ref="addRootForm" :model="addRootForm">
              <el-form-item label="父节点" prop="taskGroupParentId">
                <el-input v-model="addRootForm.taskGroupParentId" ></el-input>
              </el-form-item>
              <el-form-item label="任务组编号" prop="taskGroupId">
                <el-input v-model="addRootForm.taskGroupId"></el-input>
              </el-form-item>
              <el-form-item label="任务组名称" prop="taskGroupName">
                <el-input v-model="addRootForm.taskGroupName"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addRootdialogVisible=false">取 消</el-button>
              <el-button type="primary" @click="addRootFormSubmitBtn('addRootForm')">确 定</el-button>
            </span>
          </el-dialog>
           <!-- 编辑弹出框  -->
          <el-dialog title="任务组修改" width="25%" class="edit-event-dialog" :visible.sync="editEventdialogVisible"
            size="tiny">
            <el-form>
              <el-form-item label="任务组编号" prop="taskGroupId">
                <el-input v-model="taskGroupId" disabled='true'></el-input>
              </el-form-item>
              <el-form-item label="任务组名称" prop="taskGroupName">
                <el-input v-model="taskGroupName"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editEventdialogVisible=false">取 消</el-button>
              <el-button type="primary" @click="editEventFormSubmitBtn('editEventForm')">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 结构调整弹出框 -->
          <el-dialog title="结构调整" :visible.sync="dialogTimeandCondition" width="27%" right>
            <!-- <el-form :model="form111"> -->
            请选择目标任务组：
            <el-cascader :options="options" :show-all-levels="false" class="aaaaa" expand-trigger="hover" @change="handchange"></el-cascader>
            <el-button @click="dialogTimeandCondition = false">取 消</el-button>
            <el-button type="primary" round @click.native.prevent="dialogconfirm()">确 定</el-button>
            <!-- </el-form> -->
          </el-dialog>
        </div>
      </el-col>
      <el-col :span="18">
        <el-form ref="form" :model="form" label-width="80px" label-position="top">
          <el-row>
            <!-- <el-col :span="4">
              <div class="group">
                <el-autocomplete class="input1" v-model="form.projectId" placeholder="项目编号" :trigger-on-focus="false"
                  @select="handleSelect" clearable readonly="readonly"></el-autocomplete>
              </div>
            </el-col> -->
             <el-col :span="4">
              <div class="group">
                <el-input placeholder="任务组名称" class="input1" v-model="form.taskGroupId" clearable disabled="true"></el-input>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="group">
                <el-input placeholder="任务编号" class="input1" v-model="form.taskId" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="group">
                <el-input placeholder="任务名称" class="input1" v-model="form.taskName" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="group">
                <el-input placeholder="任务标的" class="input1" v-model="form.taskTarget" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="group">
                <el-input placeholder="前置任务" class="input1" v-model="form.predecessorTask" clearable></el-input>
              </div>
            </el-col>

            <el-col :span="4">
              <div class="button">
                <el-button type="primary" style="float:right"  @click="confirm1">查 询</el-button>
              </div>
            </el-col>

          </el-row>
        </el-form>
        <el-table :data="tableData3" v-loading="loading" :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}">
          <el-table-column prop="suggestOrder" label="建议顺序" align="center"></el-table-column>
          <el-table-column prop="actualOrder" label="实际顺序" align="center"></el-table-column>
          <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
          <el-table-column prop="taskId" label="任务编码" align="center"></el-table-column>
          <el-table-column prop="taskTarget" label="任务标的" align="center"></el-table-column>
          <el-table-column prop="predecessorTask" label="前置任务" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="200px">
           <template slot-scope="scope">
              <el-button @click.prevent="moveBtn(scope.$index,scope.row)" type="text" icon="el-icon-setting">结构调整</el-button>
            </template>
          </el-table-column>
        </el-table>
          <div class="pagination-wrap">
      <el-pagination
      background
      layout="prev, pager, next"
      :page-size= "pageSize"
      :total="total"
      @current-change = "handleCurrChange"
      @size-change = "handleSizeChange"
      >
      </el-pagination>
    </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/resource/api'
import TreeRender from './tree_render.vue'
export default {
  name: 'slot-tree',
  data () {
    return {
      loading: false,
      currPage: 1, // 当前页
      total: 1, // 总条数
      pageSize: 10, // 一页显示多少条
      pageNum: 1, // 需要查询的页码
      maxexpandId: api.maxexpandId, // 新增节点开始id
      dialogTimeandCondition: false,
      // 结构调整级联选择器
      options: [],
      taskGroupParentName: '',
      eventCategoryTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // /* 触发的当前的节点，放到全局，方便调用*/
      triggerCurrenNodeData: {},
      // /* 触发的当前节点*/
      triggerCurrenNode: {},
      // /* 新增事件弹窗的输入框数据*/
      addEventdialogVisible: false,
      addEventForm: {
        taskGroupId: '',
        taskGroupName: ''
      },
      // /* 编辑事件弹窗的输入框数据*/
      editEventdialogVisible: false,
      taskGroupId: '',
      taskGroupName: '',
      // 新增根节点
      addRootdialogVisible: false,
      addRootForm: {
        taskGroupParentId: 'root',
        taskGroupId: '',
        taskGroupName: ''
      },
      tableData3: [{
        suggestOrder: '111',
        taskName: '1111',
        taskId: '111',
        taskTarget: '111',
        postTask: '111'
      }],
      form: {
        projectId: '',
        taskId: '',
        taskName: '',
        taskTarget: '',
        predecessorTask: '',
        taskGroupId: ''
      },
      // 需要调整的当前行
      moveRowData: null,
      moveObj: null,
      GroupId: null
      // taskGroupId1: null
    }
  },
  methods: {
    // 条目改变时
    handleSizeChange (value) {
      // console.log(currPage)
    },
    // 点击页码改变时
    handleCurrChange (value) {
      this.pageNum = value
      this.confirm1()
    },
    handleSelect (item) {
      console.log(item)
    },
    handchange (value) {
      let taskGroupId = value[value.length - 1]
      this.moveObj = Object.assign({}, {taskGroupId: taskGroupId}, {moveRowData: this.moveRowData})
    },
    // 新增根节点点击事件
    handleAddTop () {
      this.addRootdialogVisible = true
    },
    // 结构调整事件
    moveBtn (index, row) {
      this.moveRowData = row
      this.dialogTimeandCondition = true
      this.$api.TaskGroup.getTaskGroupTree({projectId: this.form.projectId}).then(res => {
        var result = res.data
        // console.log(result.data)
        this.options = result.data
      })
    },
    dialogconfirm () {
      // console.log(row)
      // console.log(this.moveObj)
      this.$api.TaskGroup.saveTaskGroup({moveObj: this.moveObj}).then(res => {
        var result = res.data
        if (result.status === '1') {
          this.dialogTimeandCondition = false
          let params = {
            pageNum: this.pageNum, // 请求的页码
            pageSize: this.pageSize, // 每页显示条数
            projectId: this.form.projectId,
            taskId: this.form.taskId,
            taskName: this.form.taskName,
            taskTarget: this.form.taskTarget,
            predecessorTask: this.form.predecessorTask,
            taskGroupId: this.GroupId
          }
          console.log(this.GroupId)
          this.$api.TaskGroup.getTaskList(params).then(res => {
            var result = res.data
            this.loading = false
            // this.tableData = result.data
            this.tableData3 = result.data.list || []
            this.total = result.data.total
            this.currPage = result.data.pageNum
          })
          // console.log(data.id)
          // this.confirm()
          this.$message({
            message: '任务组调整成功',
            type: 'success'
          })
        }
      })
    },
    confirm (data, node) {
      // console.log(data)
      // this.addEventForm.taskGroupParentName = data.label
      // console.log(this.addEventForm.taskGroupParentName)
      if (data.children && data.children.length !== 0) {
        this.GroupId = ''
      } else {
        this.GroupId = data.id
        var params1 = data.label
        this.$router.push({
          name: '任务组',
          query: {
            date: params1
          }
        })
        this.form.taskGroupId = this.$route.query.date
        console.log(data)
        let params = {
          pageNum: this.pageNum, // 请求的页码
          pageSize: this.pageSize, // 每页显示条数
          projectId: this.form.projectId,
          taskId: this.form.taskId,
          taskName: this.form.taskName,
          taskTarget: this.form.taskTarget,
          predecessorTask: this.form.predecessorTask,
          taskGroupId: this.GroupId
        }
        console.log(data.id)
        this.$api.TaskGroup.getTaskList(params).then(res => {
          var result = res.data
          this.loading = false
          // this.tableData = result.data
          this.tableData3 = result.data.list || []
          this.total = result.data.total
          this.currPage = result.data.pageNum
        })
      }
    },
    confirm1 () {
      // this.addEventForm.taskGroupParentName = data.label
      // console.log(this.addEventForm.taskGroupParentName)
      let params = {
        pageNum: this.pageNum, // 请求的页码
        pageSize: this.pageSize, // 每页显示条数
        projectId: this.form.projectId,
        taskId: this.form.taskId,
        taskName: this.form.taskName,
        taskTarget: this.form.taskTarget,
        predecessorTask: this.form.predecessorTask,
        taskGroupId: this.GroupId
      }
      console.log(this.GroupId)
      this.$api.TaskGroup.getTaskList(params).then(res => {
        var result = res.data
        this.loading = false
        // this.tableData = result.data
        this.tableData3 = result.data.list || []
        this.total = result.data.total
        this.currPage = result.data.pageNum
      })
    },
    /* 渲染函数 */
    renderContent (h, {
      node,
      data,
      store
    }) {
      let that = this // 指向vue
      return h(TreeRender, {
        props: {
          NODE: node,
          DATA: data,
          STORE: store
        },
        on: {
          // 新增
          Append: (s, d, n) => that.appendEvent(s, d, n),
          // 编辑
          Edit: (s, d, n) => that.editEvent(s, d, n),
          // 删除节点
          Delete: (s, d, n) => that.removeEvent(s, d, n)
          // 查看
          // WatchInfo: (s, d, n) => that.moveBtn(s, d, n)
        }
      })
    },
    /* 树形控件添加节点，添加弹窗出现 */
    appendEvent (s, d, n) {
      this.addEventForm.taskGroupParentName = d.label
      this.addEventdialogVisible = true
      this.triggerCurrenNodeData = d
      this.triggerCurrenNode = n
      console.log(this.triggerCurrenNodeData)
    },
    editEvent (s, d, n) {
      // console.log(d)
      this.taskGroupId = d.id
      this.taskGroupName = d.label
      this.editEventdialogVisible = true
      this.triggerCurrenNodeData = d
      // console.log(this.triggerCurrenNodeData)
      this.triggerCurrenNode = n
    },
    /* 树形控件删除节点 */
    removeEvent (s, d, n) {
      // const parent = n.parent
      // const children = parent.data.children || parent.data
      // const index = children.findIndex(data => data.id === d.id)
      // console.log(index, '索引')
      if (d.children && d.children.length !== 0) {
        this.$message.error('此节点有子级，不可删除！')
        return false
      }
      this.$confirm('确认删除该节点吗？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.TaskGroup.deleteTaskGroupInfo({
          taskGroupId: d.id,
          projectId: this.form.projectId
        }).then((res) => {
          var result1 = res.data
          if (result1.status === '1') {
            // children.splice(index, 1)
            this.$api.TaskGroup.initTaskGroupTree({
              projectId: this.form.projectId
            }).then(res => {
              var result = res.data
              console.log(result.data)
              this.eventCategoryTree = result.data
            })
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editEventFormSubmitBtn (formname) {
      this.$api.TaskGroup.saveTaskGroupInfo({
        projectId: this.form.projectId,
        taskGroupName: this.taskGroupName.trim(),
        taskGroupId: this.taskGroupId.trim(),
        // taskGroupParentId: this.triggerCurrenNodeData.id,
        addOrEdit: 'edit'
      })
      //  queryParams: dataPost
        .then((res) => {
          // console.log('请求成功')
          // if (res.status === '1') {
          let result = res.data
          console.log(result.status)
          if (result.status === '1') {
            this.$api.TaskGroup.initTaskGroupTree({
              projectId: this.form.projectId
            }).then(res => {
              var result = res.data
              console.log(result.data)
              this.eventCategoryTree = result.data
            })

            // /*关闭弹窗，重置输入框 */
            this.editEventdialogVisible = false
            this.$refs[formname].resetFields()
            // }
          }
        })
        .catch((e) => {
          this.$message({
            type: 'warning',
            message: '编辑失败'
          })
        })
    },
    /* 节点新增，新增树形菜单事件分类弹窗，提交按钮 */
    addEventFormSubmitBtn (formname) {
      console.log(this.triggerCurrenNodeData.children)
      // this.$refs[formname].validate((valid) => {
      // if (valid) {
      if (this.addEventForm.taskGroupName.trim() && this.addEventForm.taskGroupId.trim()) {
        /* 获取当前input上输入的文字 */
        // let dataPost = {
        //   taskGroupName: this.addEventForm.taskGroupName.trim(),
        //   taskGroupId: this.addEventForm.taskGroupId.trim(),
        //   taskGroupParentId: this.triggerCurrenNodeData.id // 当前节点id
        //   // depth: this.triggerCurrenNode.level // 当前节点层级
        // }
        this.$api.TaskGroup.saveTaskGroupInfo({
          projectId: this.form.projectId,
          taskGroupName: this.addEventForm.taskGroupName.trim(),
          taskGroupId: this.addEventForm.taskGroupId.trim(),
          taskGroupParentId: this.triggerCurrenNodeData.id,
          addOrEdit: 'add'
        })
        //  queryParams: dataPost
          .then((res) => {
            console.log('请求成功')
            // if (res.status === '1') {
            let result = res.data
            // console.log(this.triggerCurrenNodeData.children)
            // /* 点击弹窗的确定按钮可以得到输入的数据，作为新的节点名称插入*/
            // /* 如果没有子节点，就创建一个子节点插入*/
            if (!this.triggerCurrenNodeData.children) {
              this.$set(this.triggerCurrenNodeData, 'children', [])
            };
            // 如果已有子节点，就把返回的数据push进去，插入到树形数据中
            this.triggerCurrenNodeData.children.push(result)
            // /*关闭弹窗，重置输入框 */
            this.addEventdialogVisible = false
            this.$refs[formname].resetFields()

            // /* 刷新树形菜单*/
            this.$api.TaskGroup.initTaskGroupTree({
              projectId: this.form.projectId
            }).then(res => {
              var result = res.data
              console.log(result.data)
              this.eventCategoryTree = result.data
            })
            // }
          })
          .catch((e) => {
            console.log('请求失败', e)
          })
          // } else {
          //   console.log('验证未通过')
          //   return false
          // }
          // })
      } else {
        this.$message({
          type: 'warning',
          message: '任务组编码和名称不能为空'
        })
      }
    },
    addRootFormSubmitBtn (formname) {
    // this.addRootdialogVisible = true
      if (this.addRootForm.taskGroupName.trim() && this.addRootForm.taskGroupId.trim()) {
        this.$api.TaskGroup.saveTaskGroupInfo({
          projectId: this.form.projectId,
          taskGroupParentId: this.addRootForm.taskGroupParentId,
          taskGroupName: this.addRootForm.taskGroupName.trim(),
          taskGroupId: this.addRootForm.taskGroupId.trim(),
          // taskGroupParentId: this.triggerCurrenNodeData.id,
          addOrEdit: 'add'
        }).then((res) => {
          let result3 = res.data
          if (result3.status === '1') {
            this.addRootdialogVisible = false
            this.$refs[formname].resetFields()

            // /* 刷新树形菜单*/
            this.$api.TaskGroup.initTaskGroupTree({
              projectId: this.form.projectId
            }).then(res => {
              var result = res.data
              console.log(result.data)
              this.eventCategoryTree = result.data
            })
          } else {
            this.$message({
              message: '新增根节点失败',
              type: 'warning'
            })
          }
        })
          .catch((e) => {
            console.log('请求失败', e)
          })
      // } else {
      //   console.log('验证未通过')
      //   return false
      // }
      // })
      } else {
        this.$message({
          type: 'warning',
          message: '任务组编码和名称不能为空'
        })
      }
    }
  },

  mounted () {
    this.form.projectId = this.$route.query.data
    // var projectId = this.form.projectId
    this.$api.TaskGroup.initTaskGroupTree({
      projectId: this.form.projectId
    }).then(res => {
      var result = res.data
      console.log(result.data)
      this.eventCategoryTree = result.data
    })
  }
}

</script>

<style lang="scss" scope>
  .slot-tree {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 1em;
    max-width: 600px;
    overflow-y: auto;
  }

  /*顶部按钮*/
  .slot-tree .slot-t-top {
    margin-bottom: 15px;
  }

  .slot-tree .slot-t-node span {
    display: inline-block;
  }

  /*节点*/
  .slot-tree .slot-t-node--label {
    font-weight: 60;
  }

  /*输入框*/
  .slot-tree .slot-t-input .el-input__inner {
    height: 26px;
    line-height: 26px;
  }

  /*按钮列表*/
  .slot-tree .slot-t-node .slot-t-icons {
    display: none;
    margin-left: 8px;
  }

  .slot-tree .slot-t-icons .el-button+.el-button {
    margin-left: 6px;
  }

  .slot-tree .el-tree-node__content:hover .slot-t-icons {
    display: inline-block;
  }

  .group /deep/ .el-input__inner {
    height: 40px;
    width: 90%;
    border-radius: 8px;
    border: 1px solid #DCDFE6;
  }
   .pagination-wrap {
    padding: 20px;
       .el-pagination {
      float: right;
     }
  }

</style>
