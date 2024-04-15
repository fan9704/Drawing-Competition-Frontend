<script setup lang="ts">
import { createPart } from '@/api/part';
import type { PartCreateRequestDTO } from '@/interfaces/part';
import { ref, } from 'vue';
import swal from 'sweetalert2';
import router from '@/router';


const record = ref({
  name: "",
  number: 0,
  min_number: 0,
  warning: false,
} as PartCreateRequestDTO);

const submitForm = async () => {
  const warning = !(record.value.number > record.value.min_number);

  const formRecord = {
    name: record.value.name,
    number: record.value.number,
    min_number: record.value.min_number,
    warning: warning,
  } as PartCreateRequestDTO;

  console.log(formRecord)
  const res = await createPart(formRecord)
  if (res.status == 201) {
    record.value = res.data;
    swal.fire("新增成功", "零件添加成功", "success")
    router.push('/part/management');
  }
  else {
    swal.fire("新增失敗", "零件資料有異常", "error")
  }

};
const resetForm = () => {
  record.value = {
    name: "",
    number: 0,
    min_number: 0,
    warning: false,
  };
};
</script>

<template>
  <h1>新增零件</h1>
  <v-form id="form">
    <v-row>
      <!-- <v-col cols=" 2">
        <v-text-field v-model="record.id" label="零件編號"></v-text-field>
      </v-col> -->
      <v-col cols="4">
        <v-text-field v-model="record.name" label="零件名稱"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="record.number" label="零件數量"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="record.min_number" label="最小安全庫存數"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-btn class="mt-4" color="success" block @click="submitForm">
          Submit
        </v-btn>

      </v-col>
      <v-col cols="6">
        <v-btn class="mt-4" color="error" block @click="resetForm">
          Reset Form
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<style>
#form {
  width: 100%;
  padding: 3% 4%;
  background-color: #ffffff5e;
  border-radius: 20px;
}
</style>
