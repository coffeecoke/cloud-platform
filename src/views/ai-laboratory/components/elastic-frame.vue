<template>
    <div class="elastic-box">
        <div class="mask">
            <transition enter-active-class="bounceInRight" leave-active-class="bounceInLeft">
                <div class="mask-content">
                    <div class="padding-20">
                        <div class="box-header">
                            <p class="details">查看详情</p>
                            <i class="el-icon-close"></i>
                        </div>
                        <div class="box-contenter">
                            <div class="box-content-left">
                                nfvnfjv
                            </div>
                            <div class="box-content-right">
                                dfvnjfvbh
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }]
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    bottom: 0;
    top:80px;
    z-index: 1000;
    .mask-content{
        width:70%;
        height:70%;
        border-radius: 5px;
        background: #fff;
        position: relative;
        top:50%;
        left:50%;
        transform:translate(-60%,-55%);
        .padding-20{
            padding:15px;
            height:100%;
            .box-header{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding:0 10px;
                height:40px;
                line-height: 40px;
                border-bottom:solid 1px #ccc;
                .details{
                    border-bottom:solid 2px #4977fc;
                }
                i{
                    color:#ff6066;
                    font-weight:bolder;
                    display: inline-block;
                }
            }
            .box-contenter{
                display: flex;
                padding:10px;
                .box-content-left{
                    width:186px;
                    height:80%;
                    background: #e8eeff;
                }
                .box-content-right{
                    padding:10px;
                    margin-left:10px;
                    border:solid 1px #ccc;
                }
            }
        }
    }
  }
</style>
