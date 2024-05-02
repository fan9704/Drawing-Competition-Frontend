<script setup lang="ts">
import { createOrder } from '@/api/order';
import type { OrderCreateDTO } from '@/interfaces/order';
import { listUsers } from '@/api/account';
import { listParts, getPartById } from '@/api/part';
import type { User } from '@/interfaces/account';
import type { Part } from '@/interfaces/part';
import router from '@/router';
import { useDate } from 'vuetify'
import { onMounted, ref } from 'vue';
import swal from 'sweetalert2';

interface PartSelectPair {
  part_id: number;
  part_name: string;
  part_number: number;
}

const record = ref({
  order_number: "",
  description: "",
  status: "",
  username: "",
  expected_date: undefined,
  part_id_list: [],
  part_number_list: []
} as OrderCreateDTO);
const userList = ref<User[]>([]);
const partList = ref<Part[]>([]);

const partNewSelectPair = ref<PartSelectPair>(
  {
    part_id: 0,
    part_name: '',
    part_number: 0
  });
const partSelectedList = ref<PartSelectPair[]>([]);

const adapter = useDate();
const otherDescription = ref<String>("");
const orderDescriptionList = ref<String[]>(["電源供應器損壞", "主機板損壞", "硬碟損壞", "螢幕損壞", "電池損壞", "其他"]);
const statusList = ref<String[]>(['已完成', '待處理', '已取消']);

const resetForm = () => {
  record.value = {
    order_number: "",
    description: "",
    status: "",
    username: "",
    expected_date: undefined,
    part_id_list: [],
    part_number_list: []
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
  if (record.value.description == "其他") {
    record.value.description = otherDescription.value.toString();
  }
  const formRecord = {
    order_number: record.value.order_number,
    description: record.value.description,
    status: record.value.status,
    expected_date: formattedDate,
    username: record.value.username,
    part_id_list: record.value.part_id_list,
    part_number_list: record.value.part_number_list
  } as OrderCreateDTO;
  const res = await createOrder(formRecord)
  console.log(formRecord)
  if (res.status == 201) {
    record.value = res.data;
    swal.fire("訂單成功", "新增訂單成功", "success")
  }
  else {
    swal.fire("訂單失敗", "新增訂單異常", "error")
  }

};
const addItem = async () => {
  if (partNewSelectPair.value.part_id && partNewSelectPair.value.part_number > 0) {
    const res = await getPartById(partNewSelectPair.value.part_id);
    partNewSelectPair.value.part_name = res.data.name
    if (res.data.number < partNewSelectPair.value.part_number) {
      alert('零件數量不足 無法新增 請修改數量或選擇其他零件')
      return
    }
    partSelectedList.value.push({ ...partNewSelectPair.value })

    record.value.part_id_list.push(partNewSelectPair.value.part_id)
    record.value.part_number_list.push(partNewSelectPair.value.part_number)
  }
}
const getAllUsers = async () => {
  const res = await listUsers();
  userList.value = res.data
};
const getAllParts = async () => {
  const res = await listParts();
  partList.value = res.data
};
const goToList = () => {
  router.push('/order');
}
onMounted(() => {
  getAllUsers();
  getAllParts();
});
</script>

<template>
  <v-container id="part-edit-form-shell">

    <v-form id="part-edit-form">
      <v-row>
        <v-col cols=12>
          <h1>新增訂單資訊</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-text-field v-model="record.order_number" label="訂單編號"></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select label="訂單描述" v-model="record.description" :items="orderDescriptionList"></v-select>
        </v-col>
        <v-col cols="2">
          <v-select label="訂單狀態" v-model="record.status" :items="statusList"> </v-select>
        </v-col>
        <v-col cols="2">
          <v-select label="操作人" v-model="record.username" :items="userList" item-title="username"
            item-value="username"></v-select>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="record.expected_date" label="預計完工日期"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select label="使用零件" v-model="partNewSelectPair.part_id" :items="partList" item-title="name"
            item-value="id"></v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="partNewSelectPair.part_number" label="使用零件數量"></v-text-field>

        </v-col>
        <v-col cols="3"><v-btn @click="addItem">添加零件</v-btn></v-col>
      </v-row>
      <v-row justify="center">

        <v-col cols="4" xs="12" sm="12" md="8" lg="4" xl="4" xxl="4">
          <v-list>
            <v-list-item v-for="part in partSelectedList" :key="part.part_id">

              <v-list-item-content>
                <v-list-item-title>名稱 {{ part.part_name }} 編號 {{ part.part_id }}</v-list-item-title>
                <v-list-item-subtitle>數量: {{ part.part_number }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <transition name="fade">
          <v-col cols="4" xs="12" sm="12" md="8" lg="4" xl="4" xxl="4">
            <v-textarea v-show="record.description == '其他'" v-model="otherDescription" label="其他訂單描述"
              variant="solo"></v-textarea>
          </v-col>
        </transition>
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
