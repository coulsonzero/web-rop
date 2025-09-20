<template>
  <!-- small table -->
  <el-table :data="tableRankData" style="width: 100%; height: 40vh" @row-click="searchClick">
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
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getBill, getBillRank, getBillByName } from '@/api/bill'
// data
const tableData = ref([])

const tableRankData = ref([])

const currentPage = ref(5)
const pageSize = ref(10)

// methods
onMounted(() => {
  getBill().then(res => {
    tableData.value = res.data.data
    // console.log(res.data.data)
  })
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

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>

<style>

</style>