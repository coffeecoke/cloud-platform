<template>
  <div class="box-table">

<el-row :gutter="20">
  <el-col :span="15" :offset="5">
    <div class="grid-content bg-purple">
      <div class="radio-title">{{quest.quTitle}}</div>
    </div>
  </el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="15" :offset="5">
    <div class="grid-content bg-purple">
      <el-radio-group v-model="quest.id">
        <el-radio v-for="item in option" :label="item.quTitle" :key="item.id"></el-radio>
      </el-radio-group>
      <el-input v-show="quest.quOpDescFlag" v-model="quest.quOpDesc" :placeholder="quest.quOpDesc"></el-input>
    </div>
  </el-col>
</el-row>
  </div>
</template>
<script>
export default {
  name: 'radioControl',
  data () {
    return {
      state: ''
    }
  },
  mounted () {
    console.log()
  },
  // id', 'quTitle', 'quOpDescFlag', 'quOpDesc', 'quDirType', 'quAnswerType
  props: ['quest', 'option']
}
</script>
<style scoped lang="scss">
/* css */
.quTitle{
  font-size:15px;
}
.radio-title {
    //width:280px;
    line-height: 40px;
    text-align:left;
    display: inline-block;
    vertical-align: middle;
    margin-top: 20px;
  }
</style>
