<template>
  <el-container>
    <el-header>
      <div class="w1200 header-content">
        <div class="resoft-logo">
          <img :src="logoSrc" alt="">
        </div>
        <ul class="nav-list">
          <li>Ai实验室</li>
          <li>知识图谱</li>
          <li>金融模型</li>
          <li>基础算法</li>
        </ul>
      </div>
    </el-header>
    <el-main>
      <div class="banner">
        <swiper :options="swiperOption" class="swiper-wrap"  ref="mySwiper" v-if="banner.length!=0">
          <!-- <swiper-slide v-for="(item,index) in banner" :key="index" >
            <img :src="item.image" alt="图片" />
            <a>{{item.title}}</a>
          </swiper-slide> -->
          <!-- 常见的小圆点 -->
          <swiper-slide>
            <img src="../../assets/imgs/banner_01.jpg" alt="">
            <a href="##">立即体验</a>
          </swiper-slide>
          <swiper-slide>
            <img src="../../assets/imgs/banner_02.jpg" alt="">
            <a href="##">立即体验</a>
          </swiper-slide>
          <swiper-slide>
            <img src="../../assets/imgs/banner_03.jpg" alt="">
            <a href="##">立即体验</a>
          </swiper-slide>
          <swiper-slide>
            <img src="../../assets/imgs/banner_04.jpg" alt="">
            <a href="##">立即体验</a>
          </swiper-slide>
          <p class="swiper-pagination"  v-for="(item,index) in banner" :key="index" slot="pagination" ></p>
        </swiper>
      </div>
      <div class="box-service">
        <h4 class="box-title">数据更智能 业务才更智能</h4>
          <ul class="box-list">
            <li v-for="(item,index) in liList" :key="index" :class="{ active:index==current}" @click="addClass(index)" @mouseover="addclassActive(index)">
              <i :class="item.icon"></i>
              <p>{{item.title}}</p>
              <span>{{item.text}}</span>
            </li>
          </ul>
      </div>
      <div class="box-solution">更多行业 更多场景的AI解决方案</div>
      <div class="box-swiper">
        <swiper :options="swiperOption" class="swiper-wrap"  ref="mySwiper" v-if="banner.length!=0">
          <swiper-slide>
            <img src="../../assets/imgs/banner_01.jpg" alt="">
            <a href="##">立即体验</a>
          </swiper-slide>
        </swiper>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    const that = this
    return {
      liList: [
        {
          icon: 'icon icon1',
          title: '服务名称',
          text: '简介文字简介文字',
          selected: true
        },
        {
          icon: 'icon icon2',
          title: '服务名称',
          text: '简介文字简介文字',
          selected: false
        },
        {
          icon: 'icon icon3',
          title: '服务名称',
          text: '简介文字简介文字',
          selected: false
        },
        {
          icon: 'icon icon4',
          title: '服务名称',
          text: '简介文字简介文字',
          selected: false
        },
        {
          icon: 'icon icon5',
          title: '服务名称',
          text: '简介文字简介文字',
          selected: false
        },
        {
          icon: 'icon icon6',
          title: '服务名称',
          text: '简介文字简介文字',
          selected: false
        }
      ],
      current: 0,
      logoSrc: require('@/assets/imgs/resoft-logo.png'),
      imgIndex: 1,
      banner: [
        {
          title: '立即体验1',
          image: '../../assets/imgs/banner_01.jpg'
        },
        {
          title: '立即体验2',
          image: '../../assets/imgs/banner_02.jpg'
        },
        {
          title: '立即体验3',
          image: '../../assets/imgs/banner_03.jpg'
        },
        {
          title: '立即体验4',
          image: '../../assets/imgs/banner_04.jpg'
        }
      ],
      swiperOption: {

        // 是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true

        notNextTick: true,

        // 循环

        loop: true,

        // 设定初始化时slide的索引

        initialSlide: 0,

        // 自动播放

        autoplay: {

          delay: 1500,

          stopOnLastSlide: false,

          /* 触摸滑动后是否继续轮播 */

          disableOnInteraction: false

        },
        // 滑动速度

        speed: 800,

        // 滑动方向

        direction: 'horizontal',

        // 小手掌抓取滑动

        grabCursor: true,

        on: {

          // 滑动之后回调函数

          slideChangeTransitionStart: function () {
            /* realIndex为滚动到当前的slide索引值 */

            that.imgIndex = this.realIndex - 1
          }

        },

        // 分页器设置

        pagination: {

          el: '.swiper-pagination',

          clickable: true,

          type: 'bullets'

        }

      }
    }
  },
  methods: {
    addClass (index) {
      this.current = index
    }
    // addclassActive (index) {
    //   this.current = index
    // }
  },
  activated () {},
  mounted () {

  }
}

</script>
<style scoped lang="scss">
  /* css */
  .w1200 {
    width:1200px;
    margin:0 auto;
  }
  .header-content {
    display:flex;
    height:100%;
    align-items: center;
  }
  .el-header {
    background-color:#2b282d;
    color:#fff;
    .nav-list {
      height:100%;
      margin-left:44px;
      display:flex;
      align-items: center;
      li {
        margin:0 44px;
        padding:10px 0;
      }
      li.active {
          position: relative;
      }
    }
  }
  .el-main{
    padding:0;
    overflow: hidden;
  }
  .banner{
    height:460px;
    width:100%;
    position: relative;
    .swiper-container{
      width:100%;
      height:100%;
    .swiper-slide{
      img{
        width:100%;
        height:100%;
        background-size: 100%;
        display:inline-block;
      }
      a{
        position: absolute;
        left:20%;
        bottom:35%;
        color:#fff;
        text-decoration: none;
        padding:10px 50px;
        font-size:12px;
        border-radius: 5px;
        background: #11c1fe;
      }
    }
    }
  }
.swiper-container /deep/ .swiper-pagination-bullet{
    width:100px;
    height:2px;
    border-radius: 0;
    background: #77a4f8;
  }
  .swiper-container /deep/ .swiper-pagination-bullet-active{
    background: #fff;
  }
  .box-service{
      width:100%;
      height:auto;
      background: #f7f8fb;
      padding:40px;
      .box-title{
        width:100%;
        padding:20px 0;
        margin:0;
        text-align: center;
      }
      .box-list{
        padding:0px 360px;
        display: flex;
        flex-wrap: wrap;
        li{
          // background: #3080ee;
          width:30%;
          margin:5px;
          text-align: center;
          padding:32px 0px;
          i{
            font-size:30px;
            color:#3080ee;
          }
          .icon{
            width:60px;
            height:50px;
            display: inline-block;
          }
          .icon1{
            background: url("../../assets/imgs/file.png") no-repeat center;
          }
          .icon2{
            background: url("../../assets/imgs/star.png") no-repeat center;
          }
          .icon3{
            background: url("../../assets/imgs/Clock.png") no-repeat center;
          }
          .icon4{
            background: url("../../assets/imgs/Shape3.png") no-repeat center;
          }
          .icon5{
            background: url("../../assets/imgs/Shape5.png") no-repeat center;
          }
          .icon6{
            background: url("../../assets/imgs/Shape4.png") no-repeat center;
          }
          p{
            color:#3080ee;
            font-size:14px;
          }
          span{
            display: inline-block;
            font-size:12px;
            color:#000;
          }
          &.active,&.active:hover{
            background: #3080ee;
            p{
              color:#fff;
            }
            span{
              color:#fff;
            }
            .icon1{
            background: url("../../assets/imgs/file-active.png") no-repeat center;
            }
            .icon2{
              background: url("../../assets/imgs/star-active.png") no-repeat center;
            }
            .icon3{
              background: url("../../assets/imgs/clock-active.png") no-repeat center;
            }
            .icon4{
              background: url("../../assets/imgs/shape4-active.png") no-repeat center;
            }
            .icon5{
              background: url("../../assets/imgs/shape5-active.png") no-repeat center;
            }
            .icon6{
              background: url("../../assets/imgs/shape6-active.png") no-repeat center;
            }
        }
        }
      }
  }
  .box-solution{
      height:146px;
      line-height: 146px;
      text-align: center;
      background: #fff;
  }
  .box-swiper{
    padding:0 358px;
    height:454px;
    background:#2b282d;
  }
</style>
