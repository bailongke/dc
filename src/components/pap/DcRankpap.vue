<template>
    <div class="ge">
        <el-card>
            <div slot="header" class="clearfix">
                <span class="zi">{{ this.year + '年' + this.month }}月DC联盟公司平均PAP排行</span>
                <el-date-picker v-model="time" type="month" placeholder="选择月份" @change="papTime" class="date">
                </el-date-picker>
                <el-button type="primary" @click="getPap" round class=" btn">查询</el-button>
            </div>
            <el-table class="card" :data="jsonData" style="width: 100%"
                :default-sort="{ prop: 'averageValue', order: 'descending' }" border>
                <el-table-column label="序号" width="70">
                    <template slot-scope="scope">
                        <span> {{ scope.$index + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="corpName" label="公司名称" width="450">
                </el-table-column>
                <el-table-column prop="totalValue" label="总PAP数量" width="345">
                </el-table-column>
                <el-table-column prop="averageValue" label="平均PAP数量" width="345" :sortable=true>
                </el-table-column>
                <el-table-column prop="member" label="角色数量" width="346">
                </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 20, 50]"
                layout="total, sizes, prev, pager, next ,jumper" :total="total" @size-change="handleSizeChange">
            </el-pagination>
        </el-card>


    </div>
</template>
  
<script>
import moment from "moment";
export default {
    name: 'dcRankPap',
    data() {
        return {
            jsonData: [],
            title: 'pap总数',
            //当前页数
            currentPage: 1,
            // 总条数
            total: 0,
            //页面个数
            pagesize: 15,
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
        papTime() {
            this.month = moment(this.time).format("MM");
            this.year = moment(this.time).format("YYYY");
        },
        formatter(row, column) {
            return row.address;
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
            this.getPap();

        },


        //监听 pagesize 改变的事件
        handleSizeChange(newsize) {
            //这里conso 选中第几页 最新的值
            console.log(newsize);
            //最新的条数（newsize）赋值给 动态的 pagesie
            this.pagesize = newsize;
            this.getPap();
            //获取到最新一页显示的数据  重新发送axios请求 这里是封装好的请求方法
            // this.userlistinfo();
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
                url: 'https://tools.dc-eve.com/report/pap/alliance',
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
            this.jsonData = res.data
            this.total = res.total
        }

    },
    created() {
        this.nowTime();

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
        font-size: 20px;
        text-align: center;
        align-content: center;
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