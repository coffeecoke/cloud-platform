<template>
  <div class="box-table">
<el-row :gutter="18">
   <el-col :span="4">
    <el-autocomplete  class="input1"  v-model="state1" :fetch-suggestions="querySearch"  placeholder="任务/组编码" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
  </el-col>
  <el-col :span="4">
    <el-autocomplete  class="input1"  v-model="state2" :fetch-suggestions="querySearch"  placeholder="任务/组名称" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
  </el-col>
   <el-col :span="3"><el-select class="select1" v-model="value" clearable placeholder="类型">
    <el-option  v-for="item in options"  :key="item.value"  :label="item.label"  :value="item.value"></el-option></el-select></el-col>
    <el-col :span="3"><el-select class="select1" v-model="value1" clearable placeholder="影响度">
    <el-option  v-for="item in options1"  :key="item.value1"  :label="item.label1"  :value="item.value1"></el-option></el-select></el-col>
    <el-col :span="3"><el-select class="select1" v-model="value2" clearable placeholder="依赖度">
    <el-option  v-for="item in options2"  :key="item.value2"  :label="item.label2"  :value="item.value2"></el-option></el-select></el-col>

  <el-col :span="7"><div class="button"><el-button type="primary" style="float:right"   v-on:click="confirm">确定</el-button></div></el-col>
</el-row>

<el-table
    :data="tableData"
    style="height: 100%"
    :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}">
      <el-table-column  prop="date"  label="任务/组编码" align="center"></el-table-column>
      <el-table-column  prop="name"  label="任务/组名称"  align="center"></el-table-column>
      <el-table-column  prop="province"  label="影响项" align="center"></el-table-column>
      <el-table-column  prop="city"  label="影响度" align="center"></el-table-column>
      <el-table-column  prop="address"  label="依赖项" align="center"></el-table-column>
      <el-table-column  prop="zip"  label="依赖度" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作"  align="center">
      <template>
        <el-button @click="dialogPersonVisible = true" type="text" icon="el-icon-upload">发布任务</el-button>
        </template>
        </el-table-column>
  </el-table>

  <el-dialog title="设置任务时间" :visible.sync="dialogPersonVisible">
   <div class="block">
    <span class="demonstration">使用 value-format</span>
    <div class="demonstration">值：{{ value2 }}</div>
    <el-date-picker
      v-model="value2"
      type="date"
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd">
    </el-date-picker>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogPersonVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogPersonVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogPersonVisible: false,
      restaurants: [],
      state1: '',
      state2: '',
       form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
      // select选择框
    options: [{
          value: 'T',
          label: '任务'
        }, {
          value: 'G',
          label: '任务组'
        }],
    options1: [{
          value1: '选项1',
          label1: '无影响'
        }, {
          value1: '选项2',
          label1: '一级（影响项<=2个）'
        }, {
          value1: '选项3',
          label1: '二级（影响项<=5个）'
        }, {
          value1: '选项4',
          label1: '三级（影响项<=8个）'
        }, {
        value1: '选项5',
        label1: '四级（影响项<=12个）'
        }, {
        value1: '选项6',
        label1: '五级（影响项>12个）'
        }],
    options2: [{
          value2: '选项1',
          label2: '无依赖'
        }, {
          value2: '选项2',
          label2: '一级（依赖项<=2个）'
        }, {
          value2: '选项3',
          label2: '二级（依赖项<=5个）'
        }, {
          value2: '选项4',
          label2: '三级（依赖项<=8个）'
        }, {
          value2: '选项5',
          label2: '四级（依赖项<=12个）'
        }, {
          value2: '选项6',
          label2: '五级（依赖项>12个）'
        }],        
        value: '',
        value1: '',
        value2: '',
      // 确定按钮
      confirm: function () {
        alert('1111111')
        console.log('11111')
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区1111111111111111111111',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    // 项目编号查询
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    loadAll () {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
        { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
        { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' },
        { 'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号' },
        { 'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107' },
        { 'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号' },
        { 'value': '阿姨奶茶/豪大大', 'address': '嘉定区曹安路1611号' },
        { 'value': '新麦甜四季甜品炸鸡', 'address': '嘉定区曹安公路2383弄55号' },
        { 'value': 'Monica摩托主题咖啡店', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
        { 'value': '浮生若茶（凌空soho店）', 'address': '上海长宁区金钟路968号9号楼地下一层' },
        { 'value': 'NONO JUICE  鲜榨果汁', 'address': '上海市长宁区天山西路119号' },
        { 'value': 'CoCo都可(北新泾店）', 'address': '上海市长宁区仙霞西路' },
        { 'value': '快乐柠檬（神州智慧店）', 'address': '上海市长宁区天山西路567号1层R117号店铺' },
        { 'value': 'Merci Paul cafe', 'address': '上海市普陀区光复西路丹巴路28弄6号楼819' },
        { 'value': '猫山王（西郊百联店）', 'address': '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
        { 'value': '枪会山', 'address': '上海市普陀区棕榈路' },
        { 'value': '纵食', 'address': '元丰天山花园(东门) 双流路267号' },
        { 'value': '钱记', 'address': '上海市长宁区天山西路' },
        { 'value': '壹杯加', 'address': '上海市长宁区通协路' },
        { 'value': '唦哇嘀咖', 'address': '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
        { 'value': '爱茜茜里(西郊百联)', 'address': '长宁区仙霞西路88号1305室' },
        { 'value': '爱茜茜里(近铁广场)', 'address': '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
        { 'value': '鲜果榨汁（金沙江路和美广店）', 'address': '普陀区金沙江路2239号金沙和美广场B1-10-6' },
        { 'value': '开心丽果（缤谷店）', 'address': '上海市长宁区威宁路天山路341号' },
        { 'value': '超级鸡车（丰庄路店）', 'address': '上海市嘉定区丰庄路240号' },
        { 'value': '妙生活果园（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': '香宜度麻辣香锅', 'address': '长宁区淞虹路148号' },
        { 'value': '凡仔汉堡（老真北路店）', 'address': '上海市普陀区老真北路160号' },
        { 'value': '港式小铺', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '蜀香源麻辣香锅（剑河路店）', 'address': '剑河路443-1' },
        { 'value': '北京饺子馆', 'address': '长宁区北新泾街道天山西路490-1号' },
        { 'value': '饭典*新简餐（凌空SOHO店）', 'address': '上海市长宁区金钟路968号9号楼地下一层9-83室' },
        { 'value': '焦耳·川式快餐（金钟路店）', 'address': '上海市金钟路633号地下一层甲部' },
        { 'value': '动力鸡车', 'address': '长宁区仙霞西路299弄3号101B' },
        { 'value': '浏阳蒸菜', 'address': '天山西路430号' },
        { 'value': '四海游龙（天山西路店）', 'address': '上海市长宁区天山西路' },
        { 'value': '樱花食堂（凌空店）', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '壹分米客家传统调制米粉(天山店)', 'address': '天山西路428号' },
        { 'value': '福荣祥烧腊（平溪路店）', 'address': '上海市长宁区协和路福泉路255弄57-73号' },
        { 'value': '速记黄焖鸡米饭', 'address': '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
        { 'value': '红辣椒麻辣烫', 'address': '上海市长宁区天山西路492号' },
        { 'value': '(小杨生煎)西郊百联餐厅', 'address': '长宁区仙霞西路88号百联2楼' },
        { 'value': '阳阳麻辣烫', 'address': '天山西路389号' },
        { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
      ]
    },
    handleSelect (item) {
      console.log(item)
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
  }
}
</script>
<style lang="scss" scope>
 .el-row {
    margin-bottom: 30px;
     margin-top: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .input1{
 .el-input__inner {
      height: 40px;
      width: 200px;
      background: #f0f3f8;
      border-radius: 8px;
    }
}
 .select1{
 .el-input__inner {
      height: 40px;
      width: 180px;
      background: #f0f3f8;
      border-radius: 8px;
    }
}
</style>
