<template>
    <div class="name-box" v-show="isShowAllPages">
        <div class="mask">
            <div class="mask-right">
                <div class="mask-right-icon">
                    <i class="fa el-icon-arrow-right" @click="boxHide(index, tag)"></i>
                </div>
                <div class="mask-right-content">
                    <div class="title-box">
                        <h4><i class="fa fa-file-text"></i><span>字段说明.设计模块.使用位置.备注</span></h4>
                    </div>
                    <div class="content-box">
                        <div class="text-box" v-for="(tag, index) in items" :key="index">
                            <p class="text-box-title">{{tag.title}}</p>
                            <p class="text-box-content">{{tag.text}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['items', 'isShowAllPages'],
  data () {
    return {

    }
  },
  methods: {
    boxHide (index, tag) {
      this.$emit('boxHide', index, tag)
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
        }
    }
    .mask-right-content{
        padding:0 10px;
        margin-left:30px;
        .title-box{
            h4{
                border-bottom:solid 1px #ccc;
                line-height: 40px;
                span{
                    padding-left:10px;
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
</style>
