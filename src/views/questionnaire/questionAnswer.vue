<template>
<div class="box-table">
<el-row :span="24">
      <question :questInfo="questInfo" :option="option">

      </question>
      <el-row  style="text-align:center">
        <el-button type="success" @click="submitNaire">提交问卷</el-button>
      </el-row>
    </el-row>

</div>
</template>
<script>
import question from '@/views/questionnaire/questControl/questionTmp'
export default {
  components: {question},
  data () {
    return {
      questInfo: {},
      option: []
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData (val) {
      this.$api.questionnaire.answerQuestionnaire({quId: this.$route.query.id}).then(res => {
        let result = res.data
        this.questInfo = result.data.questInfo
        this.option = result.data.questBank
      })
    },
    submitNaire () {
      const nId = this.questInfo.id
      const params = {}
      const result = []
      this.option.forEach((item, index) => {
        if (item.quDirType === '1') {
          if (item.quAnswerType === '1') {
            const curQues = {
              n_id: nId,
              q_id: item.id,
              a_id: '1',
              o_id: item.selectContent,
              o_addition: item.remark
            }
            result.push(curQues)
          } else if (item.quAnswerType === '2') {
            const curQues = {
              n_id: nId,
              q_id: item.id,
              a_id: '2',
              o_id: item.selectMultipleContent,
              o_addition: item.remark
            }
            result.push(curQues)
          } else if (item.quAnswerType === '3') {
            const curQues = {
              n_id: nId,
              q_id: item.id,
              a_id: '3',
              o_id: item.id,
              o_addition: item.remark
            }
            result.push(curQues)
          }
        }
      })
      params.quId = nId
      params.params = result
      this.$api.questionnaire.saveAnswerQuest(params).then(res => {
        let result = res.data
        if (result.status === '1') {
          this.$message({
            type: 'success',
            message: '提交问卷成功!'
          })
          this.$router.push({path: '/qu-3'})
        } else {
          this.$message.error('提交问卷失败！')
        }
      })
    }
  }

}
</script>
<style lang="scss" scoped>
  .el-pagination{
    margin-top:20px;
    text-align: right;
  }
  .el-transfer{
    height: 300px;
  }
  .bg-purple-dark {
    //background: #99a9bf;
    font-size:30px;
  }
  .bg-purple /deep/ .el-textarea__inner{
    font-size:15px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 46px;
    text-align: center;
  }
  .quDesc /deep/ .el-textarea__inner{
    border: none;
  }
  </style>
