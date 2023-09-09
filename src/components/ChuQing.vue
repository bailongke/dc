<template>
    <div class="ge">
   
    <el-table class="card"
    :data="jsonData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}">
    <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="fleetName"
      label="舰队名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="fleetType"
      label="舰队等级"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="value"
      label="pap数量"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="shipType"
      label="船只类型"
      sortable>
    </el-table-column>
    <el-table-column
      prop="time"
      label="时间"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="system"
      label="系统"
      sortable
     >
    </el-table-column>
  </el-table>

    </div>
</template>

<script>
import data from '../assets/js/test.json'
export default {
    name:'ChuQing',
    data() {
      return {
        jsonData: require('../assets/js/test.json'),
       
        
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
    
    
    }
}
</script>

<style lang="less" scoped>
.ge{
  .card{
    color: white;
  }
}
</style>