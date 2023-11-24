<template>
    <div class="ge">
        <el-card class="card11">
            <div slot="header" class="clearfix">
                <span class="zi">{{ this.year + '年' + this.month }}月公司上线过角色seat和QQ绑定详情</span>
                <el-date-picker v-model="time" type="month" placeholder="选择月份" @change="papTime" class="date">
                </el-date-picker>
                <el-button type="primary" @click="getCorporatePap" round class=" btn">查询</el-button>
            </div>
            <el-table class="card" :data="jsonData" style="width: 100%"
                :default-sort="{ prop: 'characterName', order: 'ascending' }" border
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column label="序号" width="70">
                    <template slot-scope="scope">
                        <span> {{ scope.$index + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="characterName" label="主角色名" sortable width="250">
                </el-table-column>
                <el-table-column prop="groupCount" label="绑定角色数量" width="150">
                </el-table-column>
                <!-- <el-table-column prop="qqBind" label="qq绑定" width="450">
                    <template slot-scope="scope">
                        <span> {{ scope.row.qqBind }}</span>
                    </template>
                </el-table-column> -->
                <el-table-column label="seat绑定" width="130">
                    <template slot-scope="scope">
                        <el-button type="danger" v-show="scope.row.token == false">seat未绑定</el-button>
                        <el-button type="success" v-show="scope.row.token == true">seat已绑定</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="QQ绑定" width="130">
                    <template slot-scope="scope">
                        <el-button type="danger" v-show="scope.row.qqBind == false">QQ未绑定</el-button>
                        <el-button type="success" v-show="scope.row.qqBind == true">QQ已绑定</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="详情" width="80">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="seeRow(scope.row)" type="text" size="mini">
                            详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 20]"
                layout="total, sizes, prev, pager, next ,jumper" :total="total" @size-change="handleSizeChange">
            </el-pagination>
            <el-card class="card1" shadow="always" v-show="this.seatshow == true">
                <div slot="header" class="clearfix">
                    <span class="cardzi">该主角色下对应的所有角色信息以及seat是否绑定</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="cardclose">关闭该页面</el-button>
                </div>
                <el-table :data="seatForm" style="width: 100%" :default-sort="{ prop: 'characterName', order: 'ascending' }"
                    max-height="700px" border>
                    <el-table-column label="序号" width="70">
                        <template slot-scope="scope">
                            <span> {{ scope.$index + 1 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="characterName" label="角色名" sortable width="200">
                    </el-table-column>
                    <!-- <el-table-column label="公司标志">
                        <template slot-scope="scope">
                            <el-image style="width: 100px; height: 100px" :src="urls"></el-image>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="corpName" label="公司名" width="150">
                    </el-table-column>
                    <el-table-column prop="corpTicker" label="公司缩写" width="150">
                    </el-table-column>
                    <el-table-column label="是否绑定" width="130">
                        <template slot-scope="scope">
                            <el-button type="danger" v-show="scope.row.tokenStatus == false">seat未绑定</el-button>
                            <el-button type="success" v-show="scope.row.tokenStatus == true">seat已绑定</el-button>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="qqBind" label="qq绑定" width="450">
                    <template slot-scope="scope">
                        <span> {{ scope.row.qqBind }}</span>
                    </template>
                </el-table-column> -->
                </el-table>
            </el-card>
        </el-card>



    </div>
</template>
  
<script>
import moment from "moment";
export default {
    name: 'seat',
    data() {
        return {
            dialogVisible: false,
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
            //接受子角色的数组
            seat: [],
            //那个有问题的seat
            seatBind: [],
            //seat接受seat子角色
            seatForm: [],
            seatshow: false,
            //图片地址
            url: 'https://images.evetech.net/types',
            urls: '',
        }
    },
    methods: {

        cardclose() {
            this.seatshow = false;
        },
        seeRow(rows) {
            this.seatForm = rows.groupList
            // console.log(rows);
            this.seatshow = true;
            // console.log(this.seatForm);
            // this.urls = this.url.concat("/", this.seatForm.corpId, '/logo')
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
                url: 'https://tools.dc-eve.com/report/esi/corp',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("token"),
                },
                params: {
                    corpId: this.$store.state.form.corpId,
                    month: this.month,
                    page: this.currentPage,
                    size: this.pagesize,
                    year: this.year
                }
            })
            this.jsonData = res.data;
            this.total = res.total;
            this.jsonData.children = this.jsonData.groupList
            console.log(this.jsonData);
            // for (var i = 0; i < this.jsonData.length; i++) {
            //     this.seat[i] = this.jsonData[i].groupList
            //     this.seatForm = this.seat[i]
            //     var table = this.seat[i]
            //     for (var j = 0; j < table.length; j++) {
            //         if (table[j].tokenStatus == false) {
            //             this.seatBind[j] = i
            //             console.log(this.seatBind[j]);
            //             break;
            //         }

            //     }
            //     console.log(this.jsonData[i].groupList);
            // }

        },
        //遍历子角色的tokenstatus


    },
    mounted() {
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

    .card11 {
        height: 100%;
        position: relative;


        .card {
            color: black;
            font-size: 20px;
            text-align: center;
            align-content: center;
            height: 100%;

            /deep/.el-button {
                margin: 0;
            }

        }


        .card1 {
            position: absolute;
            top: 154px;
            right: 20px;

            width: 741px;
            height: 850px;

            /deep/.el-button {
                margin: 0;
            }

            .cardzi {
                color: black;
                font-size: 30px;
            }

            .clearfix:before,
            .clearfix:after {
                display: table;
                content: "";
            }

            .clearfix:after {
                clear: both
            }


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
}

.tankuang {
    width: 600px;
}
</style>