<template>
    <div class="name-box" v-show="isShowAllField">
        <div class="mask">
            <div class="mask-right">
                <div class="mask-right-icon" @click="AddBoxHide">
                    <i class="fa el-icon-arrow-right"></i>
                </div>
                <div class="mask-right-content">
                    <div class="title-box">
                        <h4><i class="fa fa-file-text"></i><span>字段信息</span></h4>
                        <el-button class="button" @click="submitForm('ruleForm')"><i class="fa fa-save"></i><span>保存</span></el-button>
                    </div>
                    <div class="content-box">
                        <div class="form-box">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="字段名称:" prop="name">
                                    <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="类型:" prop="names">
                                    <el-input v-model="ruleForm.names"></el-input>
                                </el-form-item>
                                <el-form-item label="长度:" prop="names">
                                    <el-input v-model="ruleForm.names"></el-input>
                                </el-form-item>
                                <el-form-item label="主键:" prop="names">
                                    <el-input v-model="ruleForm.names"></el-input>
                                </el-form-item>
                                <el-form-item label="是否可空:" prop="names">
                                    <el-input v-model="ruleForm.names"></el-input>
                                </el-form-item>
                                <el-form-item label="中文名称:" prop="names">
                                    <el-input v-model="ruleForm.names"></el-input>
                                </el-form-item>
                                <el-form-item label="字段说明:" prop="names">
                                    <el-input v-model="ruleForm.names"></el-input>
                                </el-form-item>
                                <el-form-item label="是否有码值:" prop="names">
                                    <el-input v-model="ruleForm.names"></el-input>
                                </el-form-item>
                                <el-form-item label="使用模块:" prop="names">
                                    <el-input v-model="ruleForm.names"></el-input>
                                </el-form-item>
                                <el-form-item label="使用位置:" prop="names">
                                    <el-input v-model="ruleForm.names"></el-input>
                                </el-form-item>
                                <el-form-item label="访谈纪要:" prop="names">
                                    <el-input v-model="ruleForm.names"></el-input>
                                </el-form-item>
                                <el-form-item label="业务逻辑:" prop="names">
                                    <el-input v-model="ruleForm.names"></el-input>
                                </el-form-item>
                                <el-form-item label="备注:" prop="names">
                                    <el-input v-model="ruleForm.names"></el-input>
                                </el-form-item>

                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['isShowAllField', 'ruleForm', 'rules'],
  data () {
    return {

    }
  },
  methods: {
    AddBoxHide (index, tag) {
      this.$emit('AddBoxHide', index, tag)
    },
    submitForm (index, tag) {
      this.$emit('submitForm', index, tag)
    }
  }
}
</script>
<style scoped lang="scss">
.mask{
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.2);
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index:1000;
    .mask-right{
        width:30%;
        height:100%;
        background:#fff;
        float: right;
        .mask-right-icon{
            float: left;
            width:30px;
            height:100%;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
                color:#3080ee;
                font-weight:bolder;
            }
            &:hover{
                background: #ddd;
            }
        }
    }
    .mask-right-content{
        padding:0 10px;
        margin-left:30px;
        .title-box{
            overflow: hidden;
            border-bottom:solid 1px #ccc;
            h4{
                float:left;
                span{
                    padding-left:10px;
                }
            }
            .button{
                float: right;
                margin-top:15px;
                span{
                    padding-left:2px;
                }
            }
        }
        .content-box{
            .text-box{
                font-size:12px;
                padding:5px 0;
            }
        }
    }
}
.form-box{
    padding:8px 20px;
    .el-form{
        .el-form-item{
            height:24px;
        }
    }
}
</style>
