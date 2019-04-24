<template>
 <box-wrap>
    <template slot="boxHeaderTitle">我的认领</template>
    <template slot="boxBodyInner">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="projectName" label="项目信息">
        </el-table-column>
        <el-table-column prop="taskId" label="任务编号">
        </el-table-column>
        <el-table-column prop="taskName" label="任务名称">
        </el-table-column>
        <el-table-column prop="postTask" label="影响项">
        </el-table-column>
        <el-table-column prop="effectDegree" label="影响度">
        </el-table-column>
        <el-table-column prop="predecessorTask" label="依赖项">
        </el-table-column>
        <el-table-column prop="dependencyDegree" label="依赖度">
        </el-table-column>
         <el-table-column prop="recentUsage" label="预警信息">
        </el-table-column>
         <el-table-column prop="recentUsage" label="标准工时">
        </el-table-column>
         <el-table-column prop="recentUsage" label="成果矫正">
        </el-table-column>
         <el-table-column prop="recentUsage" label="评价">
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
      tableData: []
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>

</style>
