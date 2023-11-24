<template>
    <div class="ge">
        <el-card>
            <div slot="header" class="clearfix">
                <span class="zi">{{ this.year + '年' + this.month }}月份公司内部PAP排行</span>
                <el-date-picker v-model="time" type="month" placeholder="选择月份" @change="papTime" class="date">
                </el-date-picker>
                <el-button type="primary" @click="getCorporatePap" round class=" btn">查询</el-button>
            </div>
            <el-table class="card" :data="jsonData" style="width: 100%" :default-sort="{ prop: 'rank', order: 'ascending' }"
                border>
                <el-table-column prop="rank" label="排行" sortable width="366">
                </el-table-column>
                <el-table-column prop="name" label="主角色名" width="380">
                </el-table-column>
                <el-table-column prop="corpName" label="公司名称" width="450">
                </el-table-column>
                <el-table-column prop="value" label="PAP数量" width="360">
                </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 20, 50, 100]"
                layout="total, sizes, prev, pager, next ,jumper" :total="total" @size-change="handleSizeChange">
            </el-pagination>
        </el-card>


    </div>
</template>
  
<script>
import moment from "moment";
export default {
    name: 'corporatePap',
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
            this.getCorporatePap();
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
            this.getCorporatePap();

        },

        //日历获得现在月份
        nowTime() {
            this.time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")

        },
        //pap公司排行
        async getCorporatePap() {

            this.papTime();
            const { data: res } = await this.$http({
                method: 'get',
                url: 'https://tools.dc-eve.com/report/pap/corp',
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

        this.getCorporatePap();
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