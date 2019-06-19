<template>
    <div class="box-content">
        <div class="box-left">
            <el-menu>
                <el-submenu index="worker-1">
                    <template slot="title">
                    <span>工作台</span>
                    </template>
                   <el-menu-item-group>
                    <el-menu-item index="worker-1-1">选项1</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                    <el-menu-item index="worker-1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                    <el-menu-item index="worker-1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="worker-2">
                    <template slot="title">
                    <span>工作台</span>
                    </template>
                   <el-menu-item-group>
                    <el-menu-item index="worker-2-1">选项1</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                    <el-menu-item index="worker-2-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                    <el-menu-item index="worker-2-3">选项3</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="box-right">
            <div class="form-table">
                <div class="form-box">
                    <el-form :model="formInline" label-width="80px">
                        <el-row type="flex" class="row-bg">
                            <el-col :span="5">
                                <el-form-item label="审批人">
                                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="活动区域">
                                    <el-select v-model="formInline.region" placeholder="活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="活动时间">
                                    <el-col :span="11">
                                    <el-form-item prop="date1">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;"></el-date-picker>
                                    </el-form-item>
                                    </el-col>
                                    <el-col class="line" :span="2">-</el-col>
                                    <el-col :span="11">
                                    <el-form-item prop="date2">
                                        <el-time-picker placeholder="选择时间" v-model="formInline.date2" style="width: 100%;"></el-time-picker>
                                    </el-form-item>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">查询</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item>
                                    <el-button type="primary">查询</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-form :model="form" label-width="80px">
                        <el-row type="flex" class="row-bg">
                            <el-col :span="5">
                                <el-form-item label="审批人">
                                    <el-input v-model="form.user" placeholder="审批人"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div class="table-box">
                    <template>
                        <el-table :data="tableData" style="width: 100%" :height="tableHeight">
                            <el-table-column prop="name" label="发起人" width="180"></el-table-column>
                            <el-table-column prop="state" label="服务状态"></el-table-column>
                            <el-table-column prop="relation" label="接口关系"></el-table-column>
                            <el-table-column prop="parameter" label="参数"></el-table-column>
                            <el-table-column prop="operation" label="操作">
                                <template slot-scope="scope">
                                     <i class="icon operation"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <template>
                        <div class="block-right">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400">
                            </el-pagination>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      currentPage: 4,
      formInline: {
        user: '',
        region: '',
        date1: '',
        date2: ''
      },
      form: {
        user: ''
      },
      tableHeight: null,
      tableData: [{
        name: '2016-05-02',
        state: '是',
        relation: 'nihao',
        parameter: '说明说明说明说明说明说明说明 '
      }, {
        name: '王小虎',
        state: '是',
        relation: 'nihao',
        parameter: '说明说明说明说明说明说明说明 '
      }, {
        name: '王小虎',
        state: '是',
        relation: 'nihao',
        parameter: '说明说明说明说明说明说明说明 '
      }, {
        name: '王小虎',
        state: '是',
        relation: 'nihao',
        parameter: '说明说明说明说明说明说明说明 '
      }, {
        name: '王小虎',
        state: '是',
        relation: 'nihao',
        parameter: '说明说明说明说明说明说明说明 '
      }, {
        name: '王小虎',
        state: '是',
        relation: 'nihao',
        parameter: '说明说明说明说明说明说明说明 '
      }, {
        name: '王小虎',
        state: '是',
        relation: 'nihao',
        parameter: '说明说明说明说明说明说明说明 '
      }, {
        name: '王小虎',
        state: '是',
        relation: 'nihao',
        parameter: '说明说明说明说明说明说明说明 '
      }, {
        name: '王小虎',
        state: '是',
        relation: 'nihao',
        parameter: '说明说明说明说明说明说明说明 '
      }, {
        name: '王小虎',
        state: '是',
        relation: 'nihao',
        parameter: '说明说明说明说明说明说明说明 '
      }]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  mounted () {
    let tableHeight = $(window).height() - $('.header-box').height() - $('.form-box').height() - 100
    this.tableHeight = tableHeight
    console.log(tableHeight)
  }
}
</script>
<style lang="scss" scoped>
.el-submenu.is-opened /deep/ .el-submenu__title{
  background:#d8e2ff;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}
.el-menu{
    background: #e8eeff;
}
.el-submenu /deep/ .el-menu{
  background: #e8eeff;
}
.el-submenu /deep/ .el-menu-item{
    min-width:0;
}
.el-submenu .el-menu-item:hover{
    background: none;
}
.el-submenu .el-menu-item.is-active{
    background: none;
}
.el-table td, .el-table th{
    text-align: center;
}
// .el-submenu.is-active .el-submenu__title{
//     background: #d8e2ff;
//     border-top-right-radius: 25px;
//     border-bottom-right-radius: 25px;
// }
.box-content{
    width:100%;
    height:100%;
    position:relative;
    // display:flex;
    .box-left{
        width:160px;
        // flex:0 0 auto;
        height:auto;
        background:#e8eeff;
        position:absolute;
        top:0;
        left:0;
        bottom:0;
    }
}
.el-submenu{
    .el-menu-item{
        width:auto;
        position: relative;
        &:before{
            content:"";
            width:4px;
            height:4px;
            background: #ccc;
            position: absolute;
            top:18px;
            left:25px;
        }
        &.is-active:before{
            background: #4977fc;
        }
    }
}
.box-right{
    padding:0 10px;
    // flex:1;
    margin-left:160px;
    // width:100%;
    height:100%;
    overflow:auto;
    .form-table{
        background:#fff;
        border-radius: 5px;
        padding:10px;
        .form-box{
            width:100%;
            height:auto;
            padding:10px 0;
            background: #eceff4;
            margin-bottom:20px;
        }
        .table-box{
            text-align: center;
            .operation{
                width:20px;
                height:20px;
                display: inline-block;
                background: url("../../assets/imgs/operation.png") no-repeat center;
            }
        }
    }
}
.el-submenu .el-menu-item{
    width:160px;
}
.el-form--inline{
    .el-form-item{
        vertical-align: initial;
        margin:7px 10px 0px 10px;
    }
}
.el-form-item .el-form-item__content .el-form-item .el-form-item__content{
    vertical-align:initial;
}
.block-right{
    float: right;
    margin-top:10px;
}
.el-table td, .el-table th{
    text-align: center;
}
.el-table /deep/ .el-table__header th{
    background:#eceff4;
    color:#000;
}
</style>
