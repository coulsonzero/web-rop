<template>
    <div class="table-box">
      <div class="title">
        <h2>CURD</h2>
      </div>
      <div class="query-box">
        <el-input v-model="queryInput" style="width: 240px" placeholder="查询名称" @input="handleQueryName" />
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="danger" @click="handleDelList">删除多选</el-button>
      </div>
      <!-- table -->
      <el-table
        border
        :data="tableData"
        style="width: 100%"
        ref="multipleTableRef"
        @selection-change="handleSelectionChange"
      >
        <!-- 多选框 -->
        <el-table-column type="selection" :selectable="selectable" width="55" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="state" label="状态" width="120" />
        <el-table-column prop="address" label="地址" width="600" />
        <el-table-column fixed="right" label="操作" min-width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>

    <!-- dialog -->
    <el-dialog v-model="dialogFormVisible" width="500" :title="dialogType === 'add' ? '新增' : '编辑'">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="100">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="100">
          <el-select v-model="form.state" placeholder="状态">
            <el-option label="在职" value="在职" />
            <el-option label="离职" value="离职" />
          </el-select>
        </el-form-item>
        <el-form-item label="地址" :label-width="100">
          <el-input v-model="form.address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogConfirm">确认</el-button>
        </div>
      </template>
    </el-dialog>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCustomers, createCustomer, updateCustomer, deleteCustomer, deleteCustomerList } from '@/api/customer'

// date
let queryInput = ref('')
let tableData = ref([])
let multipleSelection = ref([])
let dialogFormVisible = ref(false)
let form = ref({})
let dialogType = ref('add')


// methods
// 刷新页面
const refreshPage = () => {
  location.reload();
};

const handleSelectionChange = (val) => {
  // multipleSelection.value = val
  multipleSelection.value = []
  val.forEach(item => {
    multipleSelection.value.push(item.ID)
  })
}

const handleAdd = () => {
  dialogFormVisible.value = true
  form.value = {}
}

const handleEdit = (row) => {
  // 打开弹窗
  dialogFormVisible.value = true
  // title
  dialogType.value = 'edit'
  // 填充row数据
  form.value = {...row}
}

const handleDelete = async (row) => {
  await deleteCustomer(row.ID)
  // 刷新页面
  refreshPage()
}

const handleDelList = async () => {
  await deleteCustomerList({ ids: multipleSelection.value })
  refreshPage()
}

const handleQueryName = (val) => {
  if (val.length > 0) {
    tableData.value = tableData.value.filter(item => item.name.match(val))
  } else {
    refreshPage()
  }
}

const dialogConfirm = async () => {
  dialogFormVisible.value = false

  if (dialogType.value === 'add') {
    // 新增用户
    await createCustomer(form.value)
  } else if (dialogType.value === 'edit') {
    // 编辑用户
    let tem = {
      "name": form.value.name,
      "state": form.value.state,
      "address": form.value.address,
    }
    await updateCustomer(form.value.ID, tem)
  }
  // 刷新页面
  refreshPage()
}


onMounted(() => {
  getCustomers().then(res => {
    tableData.value = res.data.data
  })
})

</script>

<style>
</style>