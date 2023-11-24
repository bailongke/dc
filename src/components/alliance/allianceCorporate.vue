<template>
    <div class="ge">
        <el-card>
            <div slot="header" class="clearfix">
                <span class="zi">{{ this.year + '年' + this.month }}月DC联盟各公司信息</span>
                <el-date-picker v-model="time" type="month" placeholder="选择月份" @change="papTime" class="date">
                </el-date-picker>
                <el-button type="primary" @click="getCorporate" round class=" btn">查询</el-button>
            </div>
            <el-table class="card" :data="jsonData" style="width: 100%" :default-sort="{ prop: 'rank', order: 'ascending' }"
                v-if="jsonData.length != 0">
                <el-table-column label="序号" width="70">
                    <template slot-scope="scope">
                        <span> {{ scope.$index + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="corpName" label="公司名称" sortable width="350">
                </el-table-column>
                <el-table-column prop="member" label="本月登录角色数量" width="200">
                </el-table-column>
                <el-table-column label="QQ注册数量" width="275">
                    <template slot-scope="scope">
                        <el-progress :percentage="(scope.row.qqBindMember / scope.row.member * 100).toLocaleString()"
                            :text-inside="true" stroke-width="24" text-color="yellow"></el-progress>
                        <span>{{ "已注册(" + scope.row.qqBindMember + ")/总计(" + scope.row.member + ")" }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="seat注册数量" width="275">
                    <template slot-scope="scope">
                        <el-progress :percentage="(scope.row.tokenMember / scope.row.member * 100).toLocaleString()"
                            :text-inside="true" stroke-width="24" text-color="black" status="success"></el-progress>
                        <span>{{ "已注册(" + scope.row.tokenMember + ")/总计(" + scope.row.member + ")" }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="税收" width="200">
                    <template slot-scope="scope">
                        <span> {{ scope.row.tax.toLocaleString() }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="公司绑定明细">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="pushCorporate(scope.row)" type="text" size="big">
                            详情
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <span v-else="jsonData.length == 0" class="zi">请稍等数据加载中,不要点击查询</span>
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 20, 50]"
                layout="total, sizes, prev, pager, next ,jumper" :total="total" @size-change="handleSizeChange">
            </el-pagination>
        </el-card>


    </div>
</template>
  
<script>
import moment from "moment";
export default {
    name: 'allianceCorporate',



    data() {
        return {
            jsonData: [],
            title: 'pap总数',
            //当前页数
            currentPage: 1,
            // 显示一页多少条数据
            pagesize: 15,
            // 总条数
            total: 0,

            //时间选择器的时间
            time: '',
            //时间选择器的时间格式化后
            month: '',
            year: '',
            //接受pap总数统计的数组
            pap: [],

        }
    },
    methods: {
        pushCorporate(rows) {
            this.$store.state.corpId = rows.corpId
            this.$router.push("/alliancegsbind")
        },
        papTime() {
            this.month = moment(this.time).format("MM");
            this.year = moment(this.time).format("YYYY");
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
            this.getCorporate();
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

            // console.log(newPage);

            //把最新的页码（newPage）赋值给 动态的 pagenum
            // this.pagenum = newPage;
            this.currentPage = newPage;
            //获取到最新显示的页码值  重新发送axios请求 这里是封装好的请求方法
            // this.userlistinfo();
            this.getCorporate();

        },

        //日历获得现在月份
        nowTime() {
            this.time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")

        },
        //pap公司排行
        async getCorporate() {

            this.papTime();
            const { data: res } = await this.$http({
                method: 'get',
                url: 'https://tools.dc-eve.com/report/esi/alliance',
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

        }

    },
    created() {
        this.nowTime();

        this.getCorporate();
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
    height: 100%;

    .card {
        color: black;
        font-size: 20px;
        text-align: center;
        align-content: center;
        height: 100%;
    }

    .zi {
        height: 80px;
        font-size: 50px;
        text-align: center;
        align-content: center;
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
}
</style>