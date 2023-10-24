<template>
    <div class="qq">
        <ul>
            <li><el-button type="success" @click="jj" class="btn">联盟集结群 </el-button></li>
            <li><el-button type="success" @click="jl">联盟交流群 </el-button></li>
            <li><el-button type="success" @click="kg">联盟矿工群 </el-button></li>
            <li><el-button type="success" @click="my">联盟贸易群</el-button></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Dcqq',
    data() {
        return {

        }
    },
    methods: {
        jj() {
            window.open("http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=d7mtPiDTVCPa0Lw87K1_uQX9Fu0lmqIz&authKey=kWNG%2FKAwVTP1oPyfi9x6Oc8BsZz1z%2BZDof5zbHGYYvRo44HjvJJkrbT2hE7BsObN&noverify=0&group_code=113208706")
        },
        jl() {
            window.open("http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=VpmC6IiE4LyOxIYKShBSzNZ_DjLHJjZq&authKey=niZB2mYrJRV2M1zCljI1Yqv%2FCPP1uGRzfLx0%2FkedZlOAh8xgQAa%2FRx6Dvgo%2F3vNc&noverify=0&group_code=101321027")
        },
        kg() {
            window.open("http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=I8E-oqjF7ZgteBHWHep5G-hFHmWnGgsm&authKey=%2Be9KBbsWBwxRU28SIQeIDbrj%2B6Bp0XKnDCORaU3q0YRtEDxHWlP0l%2BbwtWuIsgtN&noverify=0&group_code=580975470")
        },
        my() {
            window.open("http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=SKnEvYaJRdrOXTHOIQt0isX2FY24-Tr5&authKey=YfXEmYrt8UT1oxcnTad31oc0jdBaexqSIfdVla%2BErr%2BZv%2BBoMrpAylis4HLD5h4b&noverify=0&group_code=599311662")
        }
    },
}
</script>

<style lang="less" scoped>
.qq {
    width: 100%;
    height: 150px;
    margin: 0;

    ul {

        li {

            margin: 10px 20px;
        }
    }
}
</style>