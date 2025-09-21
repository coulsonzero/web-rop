<template>
  <!-- small table -->
  <el-table :data="tableRankData" style="width: 300px; height: 40vh; margin-bottom: 30px;" @row-click="searchClick">
    <el-table-column prop="name" label="商家" width="180" />
    <el-table-column prop="total_expense" label="消费金额" />
  </el-table>


  <!-- table -->
  <el-table :data="tableData" border style="width: 100%; height: 70vh">
    <el-table-column prop="date" label="交易时间" width="180" />
    <el-table-column prop="name" label="商家" width="180" />
    <el-table-column prop="expense" label="金额(元)" width="180"/>
    <el-table-column prop="pay_method" label="支付方式" width="180"/>
    <el-table-column prop="receipt_payment" label="收/支" width="180"/>
    <el-table-column prop="description" label="描述" />
  </el-table>
  <!-- 分页 -->
  <el-pagination
      v-model:current-page="queryForm.pageNum"
      v-model:page-size="queryForm.pageSize"
      :page-sizes="[5, 10, 100, 500]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getBill, getBillRank, getBillByName, getBillByPage } from '@/api/bill'
// data
// table
const tableData = ref([])
// rank
const tableRankData = ref([])
// 分页数据
const queryForm = ref({
  pageNum: 2,
  pageSize: 5,
})
const total = ref(0)

// methods
// 分页查询
const initGetBillByPage = async() => {
  await getBillByPage(queryForm.value).then(res => {
    tableData.value = res.data.data.list
    total.value = res.data.data.total
    // console.log(res.data.data)
  })
}


const handleSizeChange = (val) => {
  queryForm.value.pageNum = 1
  queryForm.value.pageSize = val
  initGetBillByPage()
}
const handleCurrentChange = (val) => {
  queryForm.value.pageNum = val
  initGetBillByPage()
}


onMounted(() => {
  initGetBillByPage()
  // getBill().then(res => {
  //   tableData.value = res.data.data
  //   // console.log(res.data.data)
  // })
  getBillRank().then(res => {
    tableRankData.value = res.data.data
    // console.log(res.data.data)
  })
})

const searchClick = (row) => {
  console.log(row.name)
  if (row.name === '总计') {
    getBill().then(res => {
      tableData.value = res.data.data
    })
  }
  getBillByName(row.name).then(res => {
    tableData.value = res.data.data
  })
}


</script>

<style>

</style>