<template>
  <div class="tasktable">
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="slot-tree">
          <el-tree ref="eventCategoryTree" :data="eventCategoryTree" :props="defaultProps" node-key="id"
             :render-content="renderContent" :expand-on-click-node="false" @node-click="confirm">
          </el-tree>
          <el-dialog title="新增事件分类" width="25%" class="add-event-dialog" :visible.sync="addEventdialogVisible"
            size="tiny">
            <el-form ref="addEventForm" :model="addEventForm" :rules="addEventNodeRules">
              <template  slot-scope="scope">
              <el-form-item label="父节点" prop="taskGroupParentName">
                <el-input v-model="addEventForm.taskGroupParentName"></el-input>
              </el-form-item>
              </template>
              <el-form-item label="任务组编号" prop="taskGroupId">
                <el-input v-model="addEventForm.taskGroupId"></el-input>
              </el-form-item>
              <el-form-item label="任务组名称" prop="taskGroupName">
                <el-input v-model="addEventForm.taskGroupName"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addEventFormCancleBtn = true">取 消</el-button>
              <el-button type="primary" @click="addEventFormSubmitBtn('addEventForm')">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
      <el-col :span="18">
        <el-form ref="form" :model="form" label-width="80px" label-position="top">
          <el-row>
            <el-col :span="4">
              <div class="group">
                <el-autocomplete class="input1" v-model="form.projectId"
                  placeholder="项目编号" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
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
                <el-button type="primary" style="float:right" round @click.native.prevent="confirm">确定</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="tableData3" :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}">
          <el-table-column prop="suggestOrder" label="建议顺序" align="center"></el-table-column>
          <el-table-column prop="actualOrder" label="实际顺序" align="center"></el-table-column>
          <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
          <el-table-column prop="taskId" label="任务编码" align="center"></el-table-column>
          <el-table-column prop="taskTarget" label="任务标的" align="center"></el-table-column>
          <el-table-column prop="postTask" label="后置任务" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="200px">
            <template>
              <el-button @click="dialogTimeandCondition = true" type="text" icon="el-icon-setting">结构调整</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      addEventFormCancleBtn: false,
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
      tableData3: [{
        suggestOrder: '111',
        taskName: '1111',
        taskId: '111',
        taskTarget: '111',
        postTask: '111'
      }],
      form: {
        projectId: '2018725-020B',
        taskId: '',
        taskName: '',
        taskTarget: '',
        predecessorTask: '',
        taskGroupId: ''
      },
      maxexpandId: api.maxexpandId, // 新增节点开始id
      non_maxexpandId: api.maxexpandId, // 新增节点开始id(不更改)
      isLoadingTree: true, // 是否加载节点树
      setTree: api.treelist, // 节点树数据
      iconSize: 'mini'
      // defaultProps: {
      //   children: 'children',
      //   label: 'name'
      // }
    }
  },
  methods: {
    confirm (data, node) {
      let formData = new FormData()
      this.form.taskGroupId = data.id
      Object.keys(this.form).forEach(key => {
        console.log(key)
        formData.append(key, this.form[key])
      })
      this.$api.TaskGroup.getTaskList(formData).then(res => {
        var result = res.data
        console.log(result.data)
        this.tableData3 = result.data
      })
      console.log(data.id)
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
          Edit: (s, d, n) => that.appendEvent(s, d, n),
          // 删除节点
          Delete: (s, d, n) => that.removeEvent(s, d, n),
          // 查看
          WatchInfo: (s, d, n) => that.changeMainRegion(s, d, n)
        }
      })
    },
    /* 树形控件添加节点，添加弹窗出现 */
    appendEvent (s, d, n) {
      this.addEventdialogVisible = true
      this.triggerCurrenNodeData = d
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
    /* 节点新增，新增树形菜单事件分类弹窗，提交按钮 */
    addEventFormSubmitBtn (formname) {
      // this.$refs[formname].validate((valid) => {
      // if (valid) {
      console.log('验证成功')
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
          console.log(this.triggerCurrenNodeData.children)
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
    }
  },
  mounted () {
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

<style>
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

</style>
