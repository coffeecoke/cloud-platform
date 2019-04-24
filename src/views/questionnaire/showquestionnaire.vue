<template>
<div class="box-table">
<el-row :span="24">
      <question :questInfo="questInfo" :option="option">

      </question>
      <el-row>
        <el-button type="success" @click="submitNaire">提交问卷</el-button>
      </el-row>
    </el-row>

</div>
</template>
<script>
// import RadioControl from '@/views/questionnaire/questControl/radioControl'
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
    // this.title = '调查问卷'
    // console.log(this.$route.query.id)
  },
  methods: {
    loadData (val) {
      this.$api.questionnaire.showQuestionnaire({quId: this.$route.query.id}).then(res => {
        let result = res.data
        // let questBank = result.data.questBank
        this.questInfo = result.data.questInfo
        this.option = result.data.questBank
        console.log(5555555555555555)
        console.log(this.option)
        console.log(6666666666666666)
      })
    },
    submitNaire () {
      const nId = this.questInfo.id
      const result = []
      this.option.forEach((item, index) => {
        if (item.quDirType === '1') {
          if (item.quAnswerType === '1') {
            const curQues = {
              n_id: nId,
              q_id: item.id,
              o_id: item.selectContent,
              o_addition: item.remark.trim()
            }
            result.push(curQues)
          }
        } else if (item.quDirType === '2') {

        }
      })
      console.log(result)
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
