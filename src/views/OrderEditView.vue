<script setup lang="ts">
import { getOrderById, updateOrder } from '@/api/order';
import type { OrderUpdateDTO } from '@/interfaces/order';
import { listUsers } from '@/api/account';
import type { User } from '@/interfaces/account';
import router from '@/router';
import { onMounted } from 'vue';
import { useDate } from 'vuetify'
import { ref } from 'vue';
import swal from 'sweetalert2';


const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const record = ref({
  order_number: "",
  description: "",
  status: "",
  expected_date: undefined,
  user_id: 0
} as OrderUpdateDTO);
const userList = ref<User[]>([]);
const adapter = useDate();

const orderDescriptionList = ref<String[]>(["電源供應器損壞", "主機板損壞", "硬碟損壞", "螢幕損壞", "電池損壞", "其他"]);
const statusList = ref<String[]>(['已完成', '待處理', '已取消']);

const findPartById = async (id: number) => {
  const res = await getOrderById(id);
  record.value = res.data;
  const date = new Date(res.data.expected_date);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  record.value.expected_date = adapter.parseISO(formattedDate);
};
const resetForm = () => {
  record.value = {
    order_number: "",
    description: "",
    status: "",
    expected_date: undefined,
    user_id: 0
  };
};
const submitForm = async () => {
  const date = new Date(record.value.expected_date);
  const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  const getTimezoneOffset = (date: Date) => {
    const tzOffset = -date.getTimezoneOffset();
    const diff = tzOffset >= 0 ? '+' : '-';
    return diff + pad(tzOffset / 60) + ':' + pad(tzOffset % 60);
  };

  const formattedDate = date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    '.' + date.getMilliseconds().toString().padStart(6, '0') +
    getTimezoneOffset(date);

  const formRecord = {
    order_number: record.value.order_number,
    description: record.value.description,
    status: record.value.status,
    expected_date: formattedDate,
    user_id: record.value.user_id
  } as OrderUpdateDTO;
  const res = await updateOrder(props.id, formRecord)
  console.log(formRecord)
  if (res.status == 200) {
    record.value = res.data;
    swal.fire("修改成功", "訂單資料已經同步更新", "success");
    router.push({ name: 'Order' });
  }
  else {
    swal.fire("修改失敗", "訂單資料異常或伺服器異常", "error");
  }


};
const getAllUsers = async () => {
  const res = await listUsers();
  userList.value = res.data
};
const goToList = () => {
  router.push('/order');
}
onMounted(() => {
  if (props.id != null) {
    findPartById(props.id);
    getAllUsers();
  }
});
</script>

<template>
  <v-container id="part-edit-form-shell">

    <v-form id="part-edit-form">
      <v-row>
        <v-col cols=12>
          <h1>修改訂單資訊</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-text-field v-model="record.order_number" label="訂單編號"></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select label="訂單描述" v-model="record.description" :items="orderDescriptionList"></v-select>
          <!-- <v-text-field v-model="record.description" label="訂單描述"></v-text-field> -->
        </v-col>
        <v-col cols="2">
          <v-select label="訂單狀態" v-model="record.status" :items="statusList"> </v-select>
          <!-- <v-text-field v-model="record.status" label="訂單狀態"></v-text-field> -->
        </v-col>
        <v-col cols="2">
          <!-- <v-text-field v-model="record.username" label="操作人"></v-text-field> -->
          <v-select label="操作人" v-model="record.user_id" :items="userList" item-title="username"
            item-value="id"></v-select>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="record.expected_date" label="預計完工日期"></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="4" xs="12" sm="12" md="8" lg="4" xl="4" xxl="4">
          <v-date-picker v-model="record.expected_date"></v-date-picker>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-btn class="mt-4" color="success" block @click="submitForm">
            提交
          </v-btn>

        </v-col>
        <v-col cols="4">
          <v-btn class="mt-4" color="error" block @click="resetForm">
            重新填寫
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn class="mt-4" block color="info" @click="goToList">
            返回訂單列表
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<style>
#part-edit-form {
  /* margin: 0% 5%; */
  width: 100%;
  padding: 2%;
  background-color: #ffffff5e;
  border-radius: 0px 0px 20px 20px;
}
</style>
