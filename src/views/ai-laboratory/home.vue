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
          <swiper-slide v-for="(item,index) in banner" :key="index">
            <img :src="item.image" alt="">
            <a href="##">{{item.title}}</a>
          </swiper-slide>
          <div class="swiper-pagination"  v-for="(item,index) in banner" :key="index" slot="pagination" ></div>
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
        <swiper :options="swiperOptionmeau" class="swiper-wrap"  ref="mySwipers" v-if="banner.length!=0">
          <swiper-slide>
            <div class="bg-slide slide1">
              <div class="box-icon" v-if="isShow" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">
                <i class="icon icon1"></i>
                <span>地产</span>
              </div>
              <div class="box-text" v-else>
                <h4>企业服务</h4>
                <p>企业服务企业服务企业服务企业服务企业服务企业服务企业服务</p>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="bg-slide slide2">
              <div class="box-icon" v-if="isShow">
                <i class="icon icon2"></i>
                <span>校园</span>
              </div>
              <div class="box-text" v-else>
                <h4>企业服务</h4>
                <p>企业服务企业服务企业服务企业服务企业服务企业服务企业服务</p>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="bg-slide slide3">
              <div class="box-icon" v-if="isShow">
                <i class="icon icon3"></i>
                <span>服务</span>
              </div>
              <div class="box-text" v-else>
                <h4>企业服务</h4>
                <p>企业服务企业服务企业服务企业服务企业服务企业服务企业服务</p>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="bg-slide slide4">
              <div class="box-icon" v-if="isShow">
                <i class="icon icon4"></i>
                <span>旅游</span>
              </div>
              <div class="box-text" v-else>
                <h4>企业服务</h4>
                <p>企业服务企业服务企业服务企业服务企业服务企业服务企业服务</p>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="bg-slide slide4">
              <div class="box-icon" v-if="isShow">
                <i class="icon icon4"></i>
                <span>旅游</span>
              </div>
              <div class="box-text" v-else>
                <h4>企业服务</h4>
                <p>企业服务企业服务企业服务企业服务企业服务企业服务企业服务</p>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="box-blank"></div>
      <div class="box-case">
            <div class="box-left-case">
              <img src="../../assets/imgs/img_03.jpg" alt="">
              <img src="../../assets/imgs/img_05.jpg" alt="">
              <img src="../../assets/imgs/img_09.jpg" alt="">
              <img src="../../assets/imgs/img_11.jpg" alt="">
            </div>
            <div class="box-right-case">
              <h4 class="case-title">在线案列</h4>
              <ul class="case-introduce">
                <li>
                  <dl>
                    <dt>
                      <img src="../../assets/imgs/group1.png" alt="">
                    </dt>
                    <dd>
                      <p>数据表明</p>
                      <span>语音采集：中文语音，英文语音，国内外各地方言；图像采集：车辆，道路，人脸，名片，日常百货等，视频类，文字类，爬虫，网络爬虫等</span>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>
                      <img src="../../assets/imgs/group2.png" alt="">
                    </dt>
                    <dd>
                      <p>数据分类</p>
                      <span>支持各类标注工具的数据标注平台，可标注图片：矩形拉框，多边形，人脸标点，各种属性；语音类如：中文，英文，方言的语言转写，校对，视频轨迹等</span>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>
                      <img src="../../assets/imgs/group3.png" alt="">
                    </dt>
                    <dd>
                      <p>客户留言</p>
                      <span>支持各类标注工具的数据标注平台，可标注图片：矩形拉框，多边形，人脸标点，各种属性；语音类如：中文，英文，方言的语言转写，校对，视频轨迹等</span>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
      </div>
      <div class="box-product">
          <div class="product-all">
              <p>全线产品等你加入</p>
              <span>我们致力于构建最完整、最全面、最前沿、最开放的AI平台，助力您快速高效的实现产品升级</span>
          </div>
          <div class="data-product">
            <ul class="data-list">
              <li>
                  <p><span>130</span>+</p>
                  <span>AI能力</span>
              </li>
              <li>
                  <p><span>30</span>+</p>
                  <span>解决方案</span>
              </li>
              <li>
                  <p><span>24</span>小时</p>
                  <span>快速集成</span>
              </li>
            </ul>
          </div>
          <div class="btn">
            <a class="experience" href="##">立即体验</a>
          </div>
      </div>
    </el-main>
    <el-footer>
      <div class="box-footer">
        <div class="box-footer-left">
          <ul>
            <li>
              <h4>快速入口</h4>
              <p>AI实验室</p>
              <p>AI实验室</p>
              <p>AI实验室</p>
            </li>
            <li>
              <h4>使用帮助</h4>
              <p>常见问题</p>
              <p>联系客服</p>
              <p>用户协议</p>
              <p>公会管理协议</p>
            </li>
            <li>
              <h4>联系我们</h4>
              <p>电话：xxxxxxxxxx</p>
              <p>地址：北京市海淀区学院南路55号中软大厦</p>
              <p>邮箱：ai resoft@resoft.css.com.cn</p>
            </li>
          </ul>
        </div>
        <div class="box-footer-right">
          <img src="../../assets/imgs/ewm_03.jpg" alt="">
          <span>中软融鑫公众号</span>
        </div>
      </div>
    </el-footer>
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
    // const that = this
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
          image: require('@/assets/imgs/banner_01.jpg')
        },
        {
          title: '立即体验2',
          image: require('@/assets/imgs/banner_02.jpg')
        },
        {
          title: '立即体验3',
          image: require('@/assets/imgs/banner_03.jpg')
        },
        {
          title: '立即体验4',
          image: require('@/assets/imgs/banner_04.jpg')
        }
      ],
      swiperOption: {
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
        slidesPerView: 'auto',
        spaceBetween: 0,
        // 分页器设置
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicMainBullets: 4, // 动态分页器的主指示点的数量
          type: 'bullets'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      isShow: true,
      swiperOptionmeau: {
        isShowWrap: false,
        // 循环
        // loop: true,
        // 设定初始化时slide的索引
        initialSlide: 0,
        // 自动播放
        // autoplay: {
        //   delay: 1500,
        //   stopOnLastSlide: false,
        //   /* 触摸滑动后是否继续轮播 */
        //   disableOnInteraction: false
        // },
        // 滑动速度
        speed: 800,
        // 滑动方向
        direction: 'horizontal',
        slidesPerView: 4,
        spaceBetween: 0,
        slidesPerGroup: 4,
        // 分页器设置
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  methods: {
    addClass (index) {
      this.current = index
    },
    changeActive ($event) {
      this.isShow = false
    },
    removeActive ($event) {
      this.isShow = true
    }
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
            background: url("~@assets/imgs/file.png") no-repeat center;
          }
          .icon2{
            background: url("~@assets/imgs/star.png") no-repeat center;
          }
          .icon3{
            background: url("~@assets/imgs/Clock.png") no-repeat center;
          }
          .icon4{
            background: url("~@assets/imgs/Shape3.png") no-repeat center;
          }
          .icon5{
            background: url("~@assets/imgs/Shape5.png") no-repeat center;
          }
          .icon6{
            background: url("~@assets/imgs/Shape4.png") no-repeat center;
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
            background: url("~@assets/imgs/file-active.png") no-repeat center;
            }
            .icon2{
              background: url("~@assets/imgs/star-active.png") no-repeat center;
            }
            .icon3{
              background: url("~@assets/imgs/clock-active.png") no-repeat center;
            }
            .icon4{
              background: url("~@assets/imgs/shape4-active.png") no-repeat center;
            }
            .icon5{
              background: url("~@assets/imgs/shape5-active.png") no-repeat center;
            }
            .icon6{
              background: url("~@assets/imgs/shape6-active.png") no-repeat center;
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
    .swiper-container{
      height:100%;
      display: flex;
      .bg-slide{
        height:100%;
        &.slide1{
          background: url("~@assets/imgs/swiper-img1.jpg") no-repeat center;
        }
        &.slide2{
          background: url("~@assets/imgs/swiper-img2.jpg") no-repeat center;
        }
        &.slide3{
          background: url("~@assets/imgs/swiper-img2.jpg") no-repeat center;
        }
        &.slide4{
          background: url("~@assets/imgs/swiper-img4.jpg") no-repeat center;
        }
        .box-icon{
          padding-top:150px;
          .icon{
              width:100%;
              height:100px;
              text-align: center;
              display: block;
          }
          .icon1{
              background: url("~@assets/imgs/qiye-2.png") no-repeat center;
          }
          .icon2{
              background: url("~@assets/imgs/xueshimao.png") no-repeat center;
          }
          .icon3{
              background: url("~@assets/imgs/fuwu.png") no-repeat center;
          }
          .icon4{
              background: url("~@assets/imgs/lvhang.png") no-repeat center;
          }
          span{
            color:#fff;
            font-size:20px;
            display: block;
            text-align: center;
            padding-top:10px;
          }
        }
        .box-text{
          height:100%;
          background-color:rgba(48, 128, 235, 0.6);
          padding:150px 30px 0;
          h4{
            color:#fff;
            font-size:22px;
            font-weight: normal;
            text-align: center
          }
          p{
            color:#fff;
            font-size:14px;
            padding-top:20px;
          }
        }

      }
    }
  }
.box-swiper .swiper-button-prev, .swiper-button-next{
  height:100%;
  width:35px;
  background-color: rgba(204, 204, 204,0.3);
  margin-top:0;
  top:0;
}
.swiper-button-next, .swiper-container-rtl .swiper-button-prev{
  right:0;
}
.swiper-button-prev, .swiper-container-rtl .swiper-button-next{
  left:0;
}
  .box-blank{
    width:100%;
    height:60px;
    background: #fff;
  }
  .box-case{
    padding:40px 258px;
    display: flex;
    .box-left-case{
      display: flex;
      flex-wrap: wrap;
      width:580px;
      img{
        display: inline-block;
        padding:2px;
      }
    }
    .box-right-case{
      flex:1;
      color:#555555;
      font-size:22px;
      width:100%;
      .case-title{
        margin:0;
        padding:5px 0;
        text-align: center;
      }
    }
  }
  .case-introduce{
    li{
      padding:10px 0px 10px 40px;
      dl{
        display: flex;
        dt{
          img{
            display: inline-block;
          }
        }
        dd{
          margin:0 10px;
          p{
            font-size:20px;
            color: #3a7cf4;
            margin:0;
          }
          span{
            display: inline-block;
            padding:10px 0;
            font-size:16px;
          }
        }
      }
    }
  }
  .box-product{
    width:100%;
    height:580px;
    background: url("~@assets/imgs/ai-bg.jpg") no-repeat center;
    .product-all{
        padding:80px 600px 20px;
        p{
          color:#fff;
          text-align: center;
          font-size:20px;
        }
        span{
          display: block;
          color:#fff;
          line-height: 40px;
          text-align: center;
        }
    }
    .data-product{
      padding: 20px 300px;
      .data-list{
        display: flex;
        li{
          text-align: center;
          width:33.3%;
          p{
            font-size:30px;
            color:#fff;
            span{
              font-size:36px;
            }
          }
          span{
            color:#fff;
            font-size:14px;
          }
        }
      }
    }
  }
  .btn{
    text-align: center;
    padding:40px;
    .experience{
      display: inline-block;
      border:solid 1px #ccc;
      padding:15px 45px;
      color:#fff;
      text-decoration: none;
    }
  }
  .el-footer{
    padding:0;
    margin:0;
    width:100%;
    height:306px!important;
    background:#2b282d;
  }
  .box-footer{
    height:100%;
    display: flex;
    .box-footer-left{
      padding:0 0 0 300px;
      width:700px;
      ul{
        display: flex;
        justify-content: center;
        padding:30px;
        li{
          width:30%;
          h4{
            color:#f5f5f5;
            font-size:20px;
          }
          p{
            color:#898889;
            font-size:14px;
          }
        }
      }
    }
    .box-footer-right{
      img{
        margin-top:50px;
        display: block;
      }
      span{
        display:block;
        text-align: center;
        color:#898889;
        font-size:14px;
        padding-top:10px;
      }
    }
  }
</style>
