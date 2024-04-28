<script setup lang="ts">
import EditForm from '@/components/part/edit.vue';

import { listParts, deletePart, patchPart } from '@/api/part';
import type { Part } from '@/interfaces/part';
import { onMounted, ref } from 'vue';
import swal from 'sweetalert2';
import router from '@/router';

const formShow = ref<boolean>(false);

const networkRecords = ref<Part[]>([]);

const selectId = ref<number>(0);

const setId = async (id: number) => {
  router.push({ name: "PartEditView", params: { id } });
}
const closeForm = () => {
  formShow.value = false;
  selectId.value = 0;
}
const findAllParts = async () => {
  const res = await listParts();
  networkRecords.value = res.data;
};
const deleteById = async (id: number) => {
  const res = await deletePart(id);
  if (res.status == 204) {
    swal.fire("刪除成功", "訂單已從資料庫刪除", "success")
  }
  else {
    swal.fire("刪除失敗", "伺服器異常", "error")
  }
  findAllParts();
};
const al = () => {
  swal.fire("刷新成功", "已成功刷新零件管理頁面", "success")
  findAllParts();
  // info warning error success
}
onMounted(() => {
  findAllParts();
});
</script>
<template>

  <h1 id="panel-title">零件列表</h1>
  <v-row>
    <v-btn @click="al">刷新清單</v-btn>
  </v-row>
  <v-row>
    <v-col cols="1">零件編號</v-col>
    <v-col cols="2">零件名稱</v-col>
    <v-col cols="3">零件庫存數量</v-col>
    <v-col cols="2">零件最小限制存量</v-col>
    <v-col cols="2">庫存不足警告狀態</v-col>
    <v-col cols="2">操作</v-col>
  </v-row>
  <v-row v-for="(record, index) in networkRecords" key:record data-aos="flip-up">
    <v-col cols="1">{{ record.id }}</v-col>
    <v-col cols="2">{{ record.name }}</v-col>
    <v-col cols="3">{{ record.number }}</v-col>
    <v-col cols="2">{{ record.min_number }}</v-col>
    <v-col cols="2">
      <v-label :style="{ 'background-color': record.warning ? 'red' : 'green' }" :text="record.warning ? '庫存不足' : '正常'">
      </v-label>
    </v-col>
    <v-col cols="2">
      <v-btn @click="setId(record.id)">
        <v-icon>
          mdi-puzzle-edit
        </v-icon>
      </v-btn>
      <v-btn @click="deleteById(record.id)">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-col>

  </v-row>
  <v-container v-show="formShow" id="part-edit-form-container">
    <v-btn class="justify-end" id="form-close-btn" @click="closeForm" prepend-icon="mdi-close-circle">
      關閉</v-btn>

    <EditForm :id="selectId" />
  </v-container>

  <v-container id="create-container">
    <v-btn id="create-btn" to="/part">新增零件</v-btn>
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
