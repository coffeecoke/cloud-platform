<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="产品熟悉度" name="first">
            <template>
                <el-table
                :data="tableData" border
                style="width: 100%">
                <el-table-column
                    prop="product"
                    label="产品"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="one"
                    label="一级"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="two"
                    label="二级">
                </el-table-column>
                <el-table-column
                    prop="three"
                    label="三级">
                </el-table-column>
                <el-table-column
                    prop="four"
                    label="四级">
                </el-table-column>
                </el-table>
            </template>
        </el-tab-pane>
        <el-tab-pane label="客户熟悉度" name="second">
            <template>
                <el-table
                :data="tableData2" border
                style="width: 100%">
                <el-table-column
                    prop="product"
                    label="客户"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="one"
                    label="一级"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="two"
                    label="二级">
                </el-table-column>
                <el-table-column
                    prop="three"
                    label="三级">
                </el-table-column>
                <el-table-column
                    prop="four"
                    label="四级">
                </el-table-column>
                </el-table>
            </template>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first',
      tableData: [{
        product: 'AMI反洗钱',
        one: '20',
        two: '20',
        three: '20',
        four: '20'
      }, {
        product: '1104',
        one: '20',
        two: '20',
        three: '20',
        four: '20'
      }, {
        product: 'EAST银监会',
        one: '20',
        two: '20',
        three: '20',
        four: '20'
      }, {
        product: 'CQCS客户风险报送',
        one: '20',
        two: '20',
        three: '20',
        four: '20'
      }],
      tableData2: [{
        product: '客户一',
        one: '20',
        two: '20',
        three: '20',
        four: '20'
      }, {
        product: '客户二',
        one: '20',
        two: '20',
        three: '20',
        four: '20'
      }, {
        product: '客户三',
        one: '20',
        two: '20',
        three: '20',
        four: '20'
      }, {
        product: '客户四',
        one: '20',
        two: '20',
        three: '20',
        four: '20'
      }]
    }
  }
}
</script>
<style  lang="scss">
.el-tabs__header{
    margin:0;
}
.el-tabs__content{
    border:solid 1px #E4E7ED;
    border-top:none;
}
</style>
