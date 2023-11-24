<template>
  <div class="ge">
    <el-card>
      <div slot="header" class="clearfix">
        <div class="zong">
          {{ 'PAP总数: ' + this.papNumber + '个' }}
        </div>
        <span class="zi">个人所有角色出勤舰队详情以及PAP统计</span>
        <el-date-picker v-model="time" type="month" placeholder="选择月份" @change="papTime" class="date">
        </el-date-picker>
        <el-button type="primary" @click="getlist" round class=" btn">查询</el-button>
      </div>
      <el-table class="card" :data="jsonData" style="width: 100%" :default-sort="{ prop: 'time', order: 'descending' }">
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="fleetName" label="舰队名称" width="180">
        </el-table-column>
        <el-table-column prop="fleetType" label="舰队等级" width="180">
        </el-table-column>
        <el-table-column prop="fc" label="FC名称" width="180">
        </el-table-column>
        <el-table-column prop="value" label="pap数量" width="180">
        </el-table-column>
        <el-table-column prop="shipType" label="船只类型">
        </el-table-column>
        <el-table-column prop="time" label="时间" :sortable=true :formatter="formatTime">
        </el-table-column>
        <el-table-column prop="system" label="系统">
        </el-table-column>
        <el-table-column label="查看详情">
          <template slot-scope="scope">
            <el-button @click.native.prevent="seeRow(scope.row)" type="text" size="big">
              详情
            </el-button>

          </template>
        </el-table-column>

        <!-- <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索(不支持大写，请输入小写字母)" />
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 50]" layout="total, sizes, prev, pager, next ,jumper" :total="total">
      </el-pagination>

    </el-card>
    <el-dialog title="PAP出勤详情" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="form" ref="xformRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="舰队昵称" prop="fleetName">
          <el-input v-model="form.fleetName" disabled></el-input>
        </el-form-item>
        <el-form-item label="舰队等级" prop="fleetType">
          <el-input v-model="form.fleetType" disabled></el-input>
        </el-form-item>
        <el-form-item label="指挥名称" prop="fc">
          <el-input v-model="form.fc" disabled></el-input>
        </el-form-item>
        <el-form-item label="船只类型" prop="shipType">
          <el-input v-model="form.shipType" disabled></el-input>
        </el-form-item>
        <el-form-item label="船只图片">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px" :src="urls"></el-image>
          </template>
        </el-form-item>
        <el-form-item label="PAP数量" prop="value">
          <el-input v-model="form.value" disabled></el-input>
        </el-form-item>

        <el-form-item label="时间" prop="time">
          <el-input v-model="form.time" disabled></el-input>
        </el-form-item>
        <el-form-item label="系统" prop="system">
          <el-input v-model="form.system" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import moment from "moment";
export default {
  name: 'Pap',
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        fleetName: '',
        fleetType: '',
        fc: '',
        shipType: '',
        sytem: '',
        time: '',
        value: '',
        shipTypeId: '',
      },
      //图片地址
      url: 'https://images.evetech.net/types',
      urls: '',
      jsonData: [],
      title: 'pap总数',
      //当前页数
      currentPage: 1,
      // 总条数
      total: 0,

      // 显示一页多少条数据
      pagesize: 10,
      //时间选择器的时间
      time: '',
      //时间选择器的时间格式化后
      month: '',
      year: '',
      //pap总数
      papNumber: '',
      papPage: 1,
      papSize: 15,
      //接受pap总数统计的数组
      pap: [],
      //接受查看详情的对象
      xq: '',
      characterId: ''
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.url = 'https://images.evetech.net/types'
          this.urls = ''
          done();
        })
        .catch(_ => { });
    },
    papTime() {
      this.month = moment(this.time).format("MM");
      this.year = moment(this.time).format("YYYY");
    },
    async getlist() {

      this.papTime();
      const { data: res } = await this.$http({
        method: 'get',
        url: 'https://tools.dc-eve.com/report/pap/character',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
        params: {
          month: this.month,
          page: this.currentPage,
          size: this.pagesize,
          year: this.year
        }
      })
      this.jsonData = res.data;
      this.total = res.total;
      this.getPap();
    },
    formatter(row, column) {
      return row.address;
    },
    //监听 pagesize 改变的事件
    handleSizeChange(newsize) {
      //这里conso 选中第几页 最新的值
      console.log(newsize);
      //最新的条数（newsize）赋值给 动态的 pagesie
      this.pagesize = newsize;
      this.getlist();
      //获取到最新一页显示的数据  重新发送axios请求 这里是封装好的请求方法
      // this.userlistinfo();
    },
    //格式化时间
    formatTime(row, column) {
      let date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {

      console.log(newPage);

      //把最新的页码（newPage）赋值给 动态的 pagenum
      // this.pagenum = newPage;
      this.currentPage = newPage;
      //获取到最新显示的页码值  重新发送axios请求 这里是封装好的请求方法
      // this.userlistinfo();
      this.getlist();

    },

    //日历获得现在月份
    nowTime() {
      this.time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")

    },
    //pap总数
    async getPap() {

      this.papTime();
      const { data: res } = await this.$http({
        method: 'get',
        url: 'https://tools.dc-eve.com/report/pap/characterList',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token"),
        },
        params: {
          month: this.month,
          page: this.papPage,
          size: this.papSize,
          year: this.year
        }
      })
      this.pap = res.data;
      for (var i = 0; i < this.pap.length; i++) {
        // console.log(this.pap[i]);
        if (this.pap[i].characterId == this.$store.state.form.mainCharacterId) {
          this.papNumber = this.pap[i].value
        }
      }

    },


    seeRow(rows) {
      this.form = rows
      this.form.time = moment(this.form.time).format("YYYY-MM-DD HH:mm:ss");
      this.dialogVisible = true
      this.urls = this.url.concat("/", this.form.shipTypeId, '/render')
    },


  },
  mounted() {
    this.nowTime();

    this.getlist();
    this.getPap();
  },
  computed: {
    uvList() {
      // if (typeof this.allUvList === "undefined") {
      //   console.log(this);
      //   return;
      // } else {
      let list = this.jsonData.filter(
        (item) =>
          item["name"].toString().toLowerCase().indexOf(this.search) > -1
      );
      let table_data = list.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
      return table_data;
      // }
    },
  },
}
</script>

<style lang="less" scoped>
.ge {
  .card {
    color: black;
    font-size: medium;
    text-align: center;
    align-content: center;
  }


  .zi {
    height: 80px;
    font-size: 50px;
    background: linear-gradient(to bottom, white, black);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    display: block;
  }

  .btn {
    position: absolute;
    width: 80px;
    margin: 0;
    top: 40px;
    right: 10px;
  }

  .date {
    position: absolute;
    width: 150px;
    margin: 0;
    top: 40px;
    right: 100px;
  }

  .zong {
    position: absolute;
    right: 260px;
    top: 20px;
    height: 80px;
    font-size: 50px;
    background: linear-gradient(to bottom, rgb(65, 171, 241), rgb(238, 234, 25));
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;

  }
}
</style>