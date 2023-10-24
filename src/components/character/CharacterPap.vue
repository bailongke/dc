<template>
  <div class="ge">
    <el-card>
      <div slot="header" class="clearfix">
        <span>
          pap详情
        </span>
        <el-date-picker v-model="time" type="month" placeholder="选择月份" @change="papTime">
        </el-date-picker>
        <el-button type="primary" @click="getlist" round>查询</el-button>
      </div>
      <el-table class="card" :data="jsonData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
        <el-table-column prop="name" label="姓名" sortable width="180">
        </el-table-column>
        <el-table-column prop="fleetName" label="舰队名称" sortable width="180">
        </el-table-column>
        <el-table-column prop="fleetType" label="舰队等级" sortable width="180">
        </el-table-column>
        <el-table-column prop="fc" label="FC名称" sortable width="180">
        </el-table-column>
        <el-table-column prop="value" label="pap数量" sortable width="180">
        </el-table-column>
        <el-table-column prop="shipType" label="船只类型" sortable>
        </el-table-column>
        <el-table-column prop="time" label="时间" :sortable=true :formatter="formatTime">
        </el-table-column>
        <el-table-column prop="system" label="系统" sortable>
        </el-table-column>
        <!-- <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索(不支持大写，请输入小写字母)" />
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10]" layout="total, sizes, prev, pager, next ,jumper" :total="total">
      </el-pagination>
    </el-card>


  </div>
</template>

<script>
import moment from "moment";
export default {
  name: 'Pap',
  data() {
    return {
      jsonData: [],
      //当前页数
      currentPage: 1,
      // 总条数
      total: 0,

      // 显示一页多少条数据
      pagesize: 10,
      search: '',
      //get接口
      cookie: '',
      bar: 'Bearer',
      arr: [],
      result: '',
      //时间选择器的时间
      time: '',
      //时间选择器的时间格式化后
      month: '',
      year: '',
    }
  },
  methods: {
    papTime() {
      this.month = moment(this.time).format("MM");
      this.year = moment(this.time).format("YYYY");
    },
    async getlist() {
      this.getCookie();
      this.papTime();
      const { data: res } = await this.$http({
        method: 'get',
        url: 'https://tools.dc-eve.com/report/pap/character',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.cookie,
        },
        params: {
          month: this.month,
          page: this.currentPage,
          size: this.pagesize,
          year: this.year
        }
      })
      this.jsonData = res.data;
      this.total = res.total
      console.log(this.jsonData)

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
    // 获得cookie
    getCookie() {
      this.arr = document.cookie.split(";")
      for (var i = 0; i < this.arr.length; i++) {
        var arr1 = this.arr[i].split("=")     //将名/值对以“=”分割开
        if (arr1[0] == "tools_remember") {
          this.result = arr1[1];  //如果名为name,则结果result为名对应的值
        }
      }

      this.cookie = this.bar.concat(" ", this.result);
      if (this.cookie.length < 8) {
        window.location.replace("https://seat.dc-eve.com")
      }
    },
    nowTime() {
      this.time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")

    }


  },
  created() {
    this.nowTime();
    this.getlist();
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
  }
}
</style>