<script setup lang="ts">

import { listOrders, deleteOrder } from '@/api/order';
import type { Order } from '@/interfaces/order';
import { onMounted, ref } from 'vue';
import swal from 'sweetalert2';
import router from '@/router';

const formShow = ref<boolean>(false);

const orders = ref<Order[]>([]);

const selectId = ref<number>(0);
const today = new Date();

const formatDate = (input: string): string => {
  const date = new Date(input);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Example usage
const input = '2024-04-02T09:40:03.923000+08:00';
const formattedDate = formatDate(input);
const setId = async (id: number) => {
  selectId.value = id;
  formShow.value = true;
}
const closeForm = () => {
  formShow.value = false;
  selectId.value = 0;
}
const findAllOrders = async () => {
  const res = await listOrders();
  orders.value = res.data;
};
const editById = async (id: number) => {
  router.push(`/order/${id}`);
}
const deleteById = async (id: number) => {
  const res = await deleteOrder(id);
  if (res.status == 204) {
    swal.fire("刪除成功", "零件已從資料庫刪除", "success")
    findAllOrders();
  }
  else {
    swal.fire("刪除失敗", "伺服器異常", "error")
  }
};
const al = () => {
  swal.fire("刷新成功", "已成功刷新訂單管理頁面", "success")
  findAllOrders();
  // info warning error success
}
onMounted(() => {
  findAllOrders();
});
</script>
<template>

  <h1 id="panel-title">訂單列表</h1>
  <v-row>
    <v-btn @click="al">刷新清單</v-btn>
  </v-row>

  <v-row>
    <v-col cols="1">訂單流水號</v-col>
    <v-col cols="2">訂單編號</v-col>
    <v-col cols="2">訂單描述</v-col>
    <v-col cols="1">訂單操作人信箱</v-col>
    <v-col cols="2">訂單狀態</v-col>
    <v-col cols="2">預期完成日</v-col>
    <v-col cols="2">操作</v-col>
  </v-row>
  <v-row v-for="(order, index) in orders" key:record data-aos="zoom-in">
    <v-col cols="1">{{ order.id }}</v-col>
    <v-col cols="2">{{ order.order_number }}</v-col>
    <v-col cols="2">{{ order.description }}</v-col>
    <v-col cols="1">{{ order.user_id.email }}</v-col>
    <v-col cols="2">{{ order.status }}</v-col>
    <v-col cols="2">
      <v-label :style="{
      'background-color': new Date(order.expected_date) < today ? 'red' : '',
      'color': new Date(order.expected_date) < today ? 'white' : ''
    }" :text="formatDate(order.expected_date)">
      </v-label>
    </v-col>
    <v-col cols="2">
      <v-btn @click="editById(order.id)">
        <v-icon>
          mdi-puzzle-edit
        </v-icon>
      </v-btn>
      <v-btn @click="deleteById(order.id)">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-col>

  </v-row>
  <!-- <v-container v-show="formShow" id="part-edit-form-container">
    <v-btn class="justify-end" id="form-close-btn" @click="closeForm" prepend-icon="mdi-close-circle">
      關閉</v-btn>

    <EditForm :id="selectId" />
  </v-container> -->

  <v-container id="create-container">
    <v-btn id="create-btn" to="/order/create">新增工單</v-btn>
  </v-container>
</template>

<style>
.v-col {
  text-align: center;
}

#panel-title {
  text-align: center;
  margin: 20px;
  font-size: larger;
}

#form-close-btn {
  width: 100%;
  text-align: center;
  /* background-color: #ffffff3a; */
}

#part-edit-form-container {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  /* background-color: #0000008a; */
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  /* overflow: auto; */
}

#create-btn {
  background-color: #1b7fd1;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 10%;
  right: 5%;
}
</style>
