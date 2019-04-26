<template>
 <box-wrap>
    <template slot="boxHeaderTitle">我的认领</template>
    <template slot="boxBodyInner">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="project" label="项目信息">
          <template slot-scope="scope2">
          <div>
            <p>{{scope2.row.projectId}}</p>
            <p>{{scope2.row.projectName}}</p>
          </div>
        </template>
        </el-table-column>
        <el-table-column prop="tid" label="任务编号">
        </el-table-column>
        <el-table-column prop="tname" label="任务名称">
        </el-table-column>
        <el-table-column prop="postTask" label="影响项">
        </el-table-column>
        <el-table-column prop="effectDegree" label="影响度">
        </el-table-column>
        <el-table-column prop="predecessorTask" label="依赖项">
        </el-table-column>
        <el-table-column prop="dependencyDegree" label="依赖度">
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="btn-icons-group">
              <i class="edit el-icon-edit" @click="scope.row.edit=true;isAddRow=false"></i>
              <i class="delect el-icon-delete" @click="deleteRow(scope.$index, tableData)">
              </i>
              <i class="save el-icon-upload2" @click="saveClick(scope.$index,scope.row)">
              </i>
            </div>
          </template>
        </el-table-column> -->
      </el-table>
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
      projectId: '2018725-020B',
      taskClass: 'T',
      isLimit: 'Y',
      tableData: []
    }
  },
  methods: {
  },
  mounted () {
    let formData = new FormData()
    formData.append('projectId', this.projectId)
    formData.append('taskClass', this.taskClass)
    formData.append('isLimit', this.isLimit)
    this.$api.Wdrl.getClaimTaskList(formData).then(res => {
      let result = res.data
      console.log(result.data)
      this.tableData = result.data
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
