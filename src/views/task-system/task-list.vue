/* eslint-disable no-tabs */
<template>
<div class="box-table">
<el-row :gutter="18">
 <el-col :span="4">
    <el-autocomplete
      class="input1"
      v-model="projectId"
      :fetch-suggestions="querySearch"
      placeholder="项目编号"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="任务编号" class="input1" v-model="input2"  clearable></el-input></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="任务名称" class="input1" v-model="input3"  clearable></el-input></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="任务标的" class="input1" v-model="input4"  clearable></el-input></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="任务所属组" class="input1" v-model="input5"  clearable></el-input></div></el-col>
  <el-col :span="3"><div class="button"><el-button type="primary" style="float:right"   v-on:click="confirm">确定</el-button></div></el-col>
</el-row>

<el-row>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-setting" @click="dialogPersonVisible = true">设置所属人</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-printer" @click="dialogGroupVisible = true">设置属组</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-edit-outline">设置任务计划</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-share">任务脉络</el-button></div></el-col>
</el-row>

<el-table
      :data="tableData"
      style="height: 100%"
      >
      <el-table-column  type="selection"  width="55"  align="center"></el-table-column>
      <el-table-column width="200px" prop="task_id"  label="任务编码" align="center"></el-table-column>
      <el-table-column width="150px" prop="task_name"  label="任务名称"  align="center"></el-table-column>
      <el-table-column width="200px" prop="task_target"  label="任务标的" align="center"></el-table-column>
      <el-table-column width="200px" prop="predecessor_task"  label="前置任务" align="center"></el-table-column>
      <el-table-column width="200px" prop="post_task"  label="后置任务" align="center"></el-table-column>
      <el-table-column width="150px" prop="task_group_id"  label="所属组" align="center"></el-table-column>
      <el-table-column width="100px" prop="task_status"  label="任务状态" align="center"></el-table-column>
      <el-table-column width="100px" prop="subordinate_person"  label="所属人" align="center"></el-table-column>
      <el-table-column width="100px" prop="accepter"  label="验收人" align="center"></el-table-column>
      <el-table-column width="150px" prop="allocate_time"  label="分配时间" align="center"></el-table-column>
      <el-table-column width="150px" prop="plan_start_time"  label="计划开始时间" align="center"></el-table-column>

      <el-table-column  prop="task_group_id"  label="所属组" align="center"></el-table-column>
      <el-table-column  prop="task_status"  label="任务状态" align="center"></el-table-column>
      <el-table-column  prop="subordinate_person"  label="所属人" align="center"></el-table-column>
      <el-table-column  prop="task_group_id"  label="所属组" align="center"></el-table-column>
      <el-table-column  prop="task_status"  label="任务状态" align="center"></el-table-column>
</el-table>
    <!--  设置按钮 -->
    <el-dialog title="设置所属人" :visible.sync="dialogPersonVisible" center>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="本部门" name="first" ><el-table
      :data="tableData"
      :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}"
      style="width: 100%" >

      <el-table-column  prop="task_id"  label="姓名" align="center"></el-table-column>
      <el-table-column  prop="task_name"  label="匹配度"  align="center"></el-table-column>
      <el-table-column  fixed="right"  label="操作" align="center" class="aaa">
      <template slot-scope="scope">
      <el-button @click="handleClick(scope.row)" type="text" >分配</el-button>
      </template>
    </el-table-column>
    </el-table></el-tab-pane>

    <el-tab-pane label="上级部门" name="second"><el-table
      :data="tableData"
      :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}"
      style="width: 100%" >

      <el-table-column  prop="task_id"  label="姓名" align="center"></el-table-column>
      <el-table-column  prop="task_name"  label="匹配度"  align="center"></el-table-column>
      <el-table-column  fixed="right"  label="操作" align="center" class="aaa">
      <template slot-scope="scope">
      <el-button @click="handleClick(scope.row)" type="text" >分配</el-button>
      </template>
    </el-table-column>
    </el-table></el-tab-pane>

    <el-tab-pane label="公司" name="third"><el-table
      :data="tableData"
      :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}"
      style="width: 100%" >

      <el-table-column  prop="task_id"  label="姓名" align="center"></el-table-column>
      <el-table-column  prop="task_name"  label="匹配度"  align="center"></el-table-column>
      <el-table-column  fixed="right"  label="操作" align="center">
      <el-button @click="update()" type="text" >分配</el-button>
    </el-table-column>
    </el-table></el-tab-pane>
  </el-tabs>
    </el-dialog>

    <el-dialog  title="设置属组" :visible.sync="dialogGroupVisible"  width="27%"  right>
    请选择属组：
     <el-cascader
      :options="options"
      :show-all-levels="false"
      class="aaaaa"
      expand-trigger="hover"
     ></el-cascader>
     <el-button @click="dialogGroupVisible = false"  >取 消</el-button>
     <el-button type="primary" @click="dialogGroupVisible = false" >确 定</el-button>
    </el-dialog>
</div>

</template>

<script>
export default {
  data () {
    return {
      options: [{'children': [{'id': 'G17.CARD', 'label': 'G17.卡'}, {'id': 'L_AGRE_CARD_INFO.CARD', 'label': 'L_AGRE_CARD_INFO.卡'}], 'id': 'P-CARD', 'label': '卡'}, {'children': [{'children': [], 'id': 'G21.CHALLENGE', 'label': 'G21.综合'}, {'children': [], 'id': 'G44.CHALLENGE', 'label': 'G44.综合'}, {'children': [], 'id': 'L_ACCT_COUNTRYRISK_MANAGE.CHALLENGE', 'label': 'L_ACCT_COUNTRYRISK_MANAGE.综合'}, {'children': [], 'id': 'L_AGRE_OBSTACLE_INFO.CHALLENGE', 'label': 'L_AGRE_OBSTACLE_INFO.综合'}], 'id': 'P-CHALLENGE', 'label': '综合'}, {'children': [{'children': [], 'id': 'L_CUST_ALL.CUSTOMER', 'label': 'L_CUST_ALL.客户'}], 'id': 'P-CUSTOMER', 'label': '客户'}, {'children': [{'children': [], 'id': 'G01.DEP', 'label': 'G01.普通存款'}, {'children': [], 'id': 'G01.STUDEP', 'label': 'G01.结构性存款'}, {'children': [], 'id': 'L_ACCT_DEPOSIT.DEP', 'label': 'L_ACCT_DEPOSIT.普通存款'}, {'children': [], 'id': 'L_ACCT_DEPOSIT.STUDEP', 'label': 'L_ACCT_DEPOSIT.结构性存款'}], 'id': 'P-DEP', 'label': '存款'}, {'children': [{'children': [], 'id': 'G01.FIMM', 'label': 'G01.理财'}, {'children': [], 'id': 'L_FIMM_PRODUCT.FIMM', 'label': 'L_FIMM_PRODUCT.理财'}], 'id': 'P-FIMM', 'label': '理财'}, {'children': [{'children': [], 'id': 'G01.FINANCE', 'label': 'G01.财务'}, {'children': [], 'id': 'L_FINA_GL.FINANCE', 'label': 'L_FINA_GL.财务'}, {'children': [], 'id': 'L_PUBL_CDE_DATE.FINANCE', 'label': 'L_PUBL_CDE_DATE.财务'}, {'children': [], 'id': 'L_PUBL_RATE.FINANCE', 'label': 'L_PUBL_RATE.财务'}], 'id': 'P-FINANCE', 'label': '财务'}, {'children': [{'children': [], 'id': 'G01.DERIVATIVE', 'label': 'G01.衍生品'}, {'children': [], 'id': 'G01.INVEST', 'label': 'G01.投资'}, {'children': [], 'id': 'G01.ISSUE', 'label': 'G01.发行'}, {'children': [], 'id': 'G01.MMFUND', 'label': 'G01.资金往来'}, {'children': [], 'id': 'G01.REPO', 'label': 'G01.回购'}, {'children': [], 'id': 'L_ACCT_EXCHANGE_INFO.FX', 'label': 'L_ACCT_EXCHANGE_INFO.外汇'}, {'children': [], 'id': 'L_ACCT_FUND_BOND_ISSUE.ISSUE', 'label': 'L_ACCT_FUND_BOND_ISSUE.发行'}, {'children': [], 'id': 'L_ACCT_FUND_CDS_BAL.ISSUE', 'label': 'L_ACCT_FUND_CDS_BAL.发行'}, {'children': [], 'id': 'L_ACCT_FUND_EQUITY_INVESTED.ISSUE', 'label': 'L_ACCT_FUND_EQUITY_INVESTED.发行'}, {'children': [], 'id': 'L_ACCT_FUND_INVEST.INVEST', 'label': 'L_ACCT_FUND_INVEST.投资'}, {'children': [], 'id': 'L_ACCT_FUND_REPURCHASE.REPO', 'label': 'L_ACCT_FUND_REPURCHASE.回购'}, {'children': [], 'id': 'L_AGRE_CREDITLINE.OBSLOAN', 'label': 'L_AGRE_CREDITLINE.资金往来'}, {'children': [], 'id': 'L_AGRE_DERIVE_SUBJECT_INFO.DERIVATIVE', 'label': 'L_AGRE_DERIVE_SUBJECT_INFO.衍生品'}], 'id': 'P-INTERBANK', 'label': '同业'}, {'children': [{'children': [], 'id': 'G01.BILLLOAN', 'label': 'G01.票据融资'}, {'children': [], 'id': 'G01.LEASELOAN', 'label': 'G01.融资租赁'}, {'children': [], 'id': 'G01.LOAN', 'label': 'G01.普通贷款'}, {'children': [], 'id': 'G01.REPOLOAN', 'label': 'G01.非金融机构买入返售'}, {'children': [], 'id': 'G01.TRDLOAN', 'label': 'G01.贸易融资'}, {'children': [], 'id': 'G0101.OBSLOAN', 'label': 'G0101.表外贷款'}, {'children': [], 'id': 'G17.ODLOAN', 'label': 'G17.透支'}, {'children': [], 'id': 'L_ACCT_FUND_REPURCHASE.REPOLOAN', 'label': 'L_ACCT_FUND_REPURCHASE.非金融机构买入返售'}, {'children': [], 'id': 'L_AGRE_BILL_INFO.BILLLOAN', 'label': 'L_AGRE_BILL_INFO.票据融资'}, {'children': [], 'id': 'L_AGRE_CREDITLINE.LEASELOAN', 'label': 'L_AGRE_CREDITLINE.融资租赁'}, {'children': [], 'id': 'L_AGRE_CREDITLINE.LOAN', 'label': 'L_AGRE_CREDITLINE.普通贷款'}, {'children': [], 'id': 'L_AGRE_CREDITLINE.ODLOAN', 'label': 'L_AGRE_CREDITLINE.透支'}, {'children': [], 'id': 'L_AGRE_CREDITLINE.TRDLOAN', 'label': 'L_AGRE_CREDITLINE.贸易融资'}], 'id': 'P-LOAN', 'label': '贷款'}, {'children': [{'children': [], 'id': 'G07.MANAGEMENT', 'label': 'G07.组织架构'}, {'children': [], 'id': 'G17.MANAGEMENT', 'label': 'G17.组织架构'}, {'children': [], 'id': 'L_PUBL_ORG_BRA.MANAGEMENT', 'label': 'L_PUBL_ORG_BRA.组织架构'}], 'id': 'P-MANAGEMENT', 'label': '组织架构'}, {'children': [{'children': [], 'id': 'L_AGRE_EXGUARCONTRACTTAB.OVERSEAS', 'label': 'L_AGRE_EXGUARCONTRACTTAB.国际业务'}], 'id': 'P-OVERSEAS', 'label': '国际业务'}, {'children': [{'children': [], 'id': 'L_CUST_EPAYINFO.PAYMENT', 'label': 'L_CUST_EPAYINFO.支付系统'}], 'id': 'P-PAYMENT', 'label': '支付系统'}],
      // 设置按钮
      dialogPersonVisible: false,
      dialogGroupVisible: false,
      // 项目编号输入框
      restaurants: [],
      state2: '',
      projectId: '2018725-020B',
      // 普通文本输入框
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      tableData: [{
        // 表格数据
        task_id: '2016-05-02',
        task_name: '王小虎',
        task_target: '上海市普陀区金沙dsa',
        predecessor_task: '111dsadas',
        post_task: '222dsad',
        task_group_id: '333dsad',
        task_status: '3444dsad',
        subordinate_person: '231321gfd'
      },
      {
        task_id: '2016-05-02',
        task_name: '王小虎',
        task_target: '上海市普陀区金沙dsa',
        predecessor_task: '111dsadas',
        post_task: '222dsad',
        task_group_id: '333dsad',
        task_status: '3444dsad',
        subordinate_person: '231321gfd'
      },
      {
        task_id: '2016-05-02',
        task_name: '王小虎',
        task_target: '上海市普陀区金沙dsa',
        predecessor_task: '111dsadas',
        post_task: '222dsad',
        task_group_id: '333dsad',
        task_status: '3444dsad',
        subordinate_person: '231321gfd'
      },
      {
        task_id: '2016-05-02',
        task_name: '王小虎',
        task_target: '上海市普陀区金沙dsa',
        predecessor_task: '111dsadas',
        post_task: '222dsad',
        task_group_id: '333dsad',
        task_status: '3444dsad',
        subordinate_person: '231321gfd'
      },
      {
        task_id: '2016-05-02',
        task_name: '王小虎',
        task_target: '上海市普陀区金沙dsa',
        predecessor_task: '111dsadas',
        post_task: '222dsad',
        task_group_id: '333dsad',
        task_status: '3444dsad',
        subordinate_person: '231321gfd'
      },
      {
        task_id: '2016-05-02',
        task_name: '王小虎',
        task_target: '上海市普陀区金沙dsa',
        predecessor_task: '111dsadas',
        post_task: '222dsad',
        task_group_id: '333dsad',
        task_status: '3444dsad',
        subordinate_person: '231321gfd'
      },
      {
        task_id: '2016-05-02',
        task_name: '王小虎',
        task_target: '上海市普陀区金沙dsa',
        predecessor_task: '111dsadas',
        post_task: '222dsad',
        task_group_id: '333dsad',
        task_status: '3444dsad',
        subordinate_person: '231321gfd'
      },
      {
        task_id: '2016-05-02',
        task_name: '王小虎',
        task_target: '上海市普陀区金沙dsa',
        predecessor_task: '111dsadas',
        post_task: '222dsad',
        task_group_id: '333dsad',
        task_status: '3444dsad',
        subordinate_person: '231321gfd'
      },
      {
        task_id: '2016-05-02',
        task_name: '王小虎',
        task_target: '上海市普陀区金沙dsa',
        predecessor_task: '111dsadas',
        post_task: '222dsad',
        task_group_id: '333dsad',
        task_status: '3444dsad',
        subordinate_person: '231321gfd'
      },
      {
        task_id: '2016-05-02',
        task_name: '王小虎',
        task_target: '上海市普陀区金沙dsa',
        predecessor_task: '111dsadas',
        post_task: '222dsad',
        task_group_id: '333dsad',
        task_status: '3444dsad',
        subordinate_person: '231321gfd'
      },
      {
        task_id: '2016-05-02',
        task_name: '王小虎',
        task_target: '上海市普陀区金沙dsa',
        predecessor_task: '111dsadas',
        post_task: '222dsad',
        task_group_id: '333dsad',
        task_status: '3444dsad',
        subordinate_person: '231321gfd'
      }
      ],
      // 标签页下表格
      tableData1: [{

      }],
      activeName: 'second'
    }
  },

  methods: {
    // 标签页下事件
    handleClick (tab, event) {
      console.log(event.target.getAttribute('id')) // 获取到当前元素的id
    },
    // 确定按钮
    confirm: function () {
      alert('1111111')
      console.log('11111')
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
    var pro = this.projectId
    console.log(pro)
    // console.log(formData.get('tid'))
    this.$api.taskList.getTaskGroupTree(pro).then(res => {
      var result = res.data
      // console.log(result.data)
      this.options = result.data
    })
    this.restaurants = this.loadAll()
  }
}
</script>
<style lang="scss" scoped>
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
.aaaaa {
   background: #f0f3f8;
      border-radius: 8px;
}
</style>
