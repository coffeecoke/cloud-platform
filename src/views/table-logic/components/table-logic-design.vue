<template>
    <div class="logic-design" v-show="isShowAllDesign">
        <div class="mask">
            <transition enter-active-class="bounceInRight" leave-active-class="bounceInLeft">
                <div class="mask-right animated" v-show="isShowAllDesign">
                <div class="mask-right-icon">
                    <i class="fa el-icon-arrow-right"></i>
                </div>
                <div class="mask-right-content">
                   <div class="top-button">
                       <ul class="btn-list">
                           <li>jbhjbg</li>
                       </ul>
                       <el-button type="primary" class="btn-save">保存</el-button>
                   </div>
                   <div class="box-content">
                       <el-collapse v-model="activeNames" @change="handleChange">
                            <el-collapse-item name="1" class="fontSize">
                                <template slot="title">
                                <!-- <i class="header-icon el-icon-arrow-right file-btn" :class="{ 'hover': isActive }"></i> -->
                                  <div class="title-width">取数表</div>
                                  <i class="fa fa-file-text file-btn"></i>
                                </template>
                                <div class="num-table" v-if="isShow">
                                        <span @click="focusGet">{{name}}</span>
                                        <span @click="focusGet">{{ipt}}</span>
                                        <span class="text-color">A2</span>
                                        <div class="edit-button">
                                            <i class="el-input__icon fx-icon">fx</i>
                                            <i class="el-icon-tickets"></i>
                                            <i class="fa fa-twitch"></i>
                                            <i class="el-icon-circle-plus-outline"></i>
                                        </div>
                                    </div>
                                    <div class="num-table" v-else>
                                        <el-input v-model="name" placeholder="请输入内容"> <i slot="suffix" @click="emptyAllName" class="el-input__icon el-icon-close"></i></el-input>
                                        <el-input v-model="ipt" placeholder="请输入内容"> <i slot="suffix" @click="emptyAllIpt" class="el-input__icon el-icon-close"></i></el-input>
                                        <span class="text-color">A1</span>
                                        <div class="edit-buttons">
                                            <el-button @click="cancelBtn">取消</el-button>
                                            <el-button @click="saveBtn">确定</el-button>
                                        </div>
                                    </div>
                                    <div class="num-table">
                                        <el-input v-model="input" placeholder="请输入内容"> <i slot="suffix" class="el-input__icon el-icon-close"></i></el-input>
                                        <el-input v-model="input" placeholder="请输入内容"> <i slot="suffix" class="el-input__icon el-icon-close"></i></el-input>
                                        <span class="text-color">A1</span>
                                        <div class="edit-button">
                                            <i class="el-input__icon fx-icon">fx</i>
                                            <i class="el-icon-tickets"></i>
                                            <i class="fa fa-twitch"></i>
                                            <i class="el-icon-circle-plus-outline"></i>
                                        </div>
                                    </div>
                            </el-collapse-item>
                            <el-collapse-item name="2">
                                <template slot="title">
                                  <div class="title-width">过滤条件</div>
                                </template>
                                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                            </el-collapse-item>
                       </el-collapse>
                   </div>
                </div>
                </div>
            </transition>
            </div>
    </div>
</template>
<script>
export default {
  props: ['isShowAllDesign'],
  data () {
    return {
      activeNames: ['1'],
      input: '',
      isShow: true,
      name: 'ldm-ldm',
      ipt: 'l_acct_loan_entrust-委托人的全字段'
    }
  },
  methods: {
    handleChange (val) {
    },
    focusGet () {
      this.isShow = false
    },
    cancelBtn () {
      this.isShow = true
    },
    saveBtn () {
      this.isShow = true
    },
    emptyAllName () {
      this.name = ''
    },
    emptyAllIpt () {
      this.ipt = ''
    }
  }
}
</script>
<style scoped lang="scss">
.mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    .mask-right {
      width: 60%;
      height: 100%;
      background: #fff;
      float: right;

      .mask-right-icon {
        float: left;
        width: 30px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
          color: #3080ee;
          font-weight: bolder;
        }

        &:hover {
          background: #ddd;
        }
      }
    }
    .mask-right-content {
      margin-left: 30px;
      .top-button{
          height:50px;
          background: #eff1f4;
          vertical-align: middle;
          .btn-list{
              float: left;
          }
          .btn-save{
              float: right;
              margin:8px;
          }
      }
      .box-content{
          padding:10px;
          .title-width{
              width:92%;
              padding-left: 20px;
              font-size:16px;
          }
          .file-btn{
            color: #3080ee;
            font-weight:800;
            font-size:16px;
          }
          .num-table{
              height:40px;
              width:100%;
              float: left;
              .text-color{
                  color:#3080ee;
              }
              .el-input{
                  background:none!important;
                  margin:4px 8px;
              }
              span{
                  display: inline-block;
                  padding:4px 10px;
               }
              .edit-button{
                  float: right;
                  padding-right: 20px;
                //   margin-top:4px;
                  i{
                      padding:0 5px;
                      cursor: pointer;
                  }
              }
              .edit-buttons{
                  float: right;
                  margin:4px;
                }
              &:hover{
                  background: #e0edff;
              }
          }
        //   .num-logic{
        //       .text-color{
        //           color:#3080ee;
        //       }
        //       span{
        //           display: inline-block;
        //           padding:4px 10px;
        //       }
        //       .edit-button{
        //           float: right;
        //           margin:4px;
        //       }
        //       &:hover{
        //           background: #e0edff;
        //       }
        //   }
      }
    }
  }
.el-collapse /deep/ .el-collapse-item__arrow{
    // display: none;
    position: absolute;
    top:18px;
    left:0px;
    font-weight:bolder;
    color:#3080ee
}
.el-collapse /deep/.el-collapse-item__header.is-active{
    border-bottom-color: none;
}
.el-collapse /deep/ .el-collapse-item__wrap{
    border:none;
    padding-top:10px;
}
.el-collapse /deep/ .el-collapse-item__header{
    border-bottom:solid 2px #3080ee;
    position: relative;
}
.num-table /deep/ .el-input{
    width:15%!important;
}
</style>
