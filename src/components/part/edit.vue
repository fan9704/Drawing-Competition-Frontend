<script setup lang="ts">
import { getPartById, updatePart } from '@/api/part';
import type { PartUpdateRequestDTO } from '@/interfaces/part';
import { onUpdated, ref } from 'vue';
import swal from 'sweetalert2';


const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const record = ref({
  id: 0,
  name: "",
  number: 0,
  min_number: 0,
  warning: false,
} as PartUpdateRequestDTO);

const findPartById = async (id: number) => {
  const res = await getPartById(id);
  record.value = res.data;
};
const resetForm = () => {
  record.value = {
    name: "",
    number: 0,
    min_number: 0,
    warning: false,
  };
};
const submitForm = async () => {
  const warning = record.value.number < record.value.min_number ? true : false;

  const formRecord = {
    name: record.value.name,
    number: record.value.number,
    min_number: record.value.min_number,
    warning: warning,
  } as PartUpdateRequestDTO;
  const res = await updatePart(props.id, formRecord)
  if (res.status == 200) {
    record.value = res.data;
    swal.fire("修改成功", "零件資料已經同步更新", "success")
  }
  else {
    swal.fire("修改失敗", "數量異常或伺服器異常", "error")
  }

};
onUpdated(() => {
  if (props.id != null) {
    findPartById(props.id);
  }
});
</script>

<template>
  <span id="part-edit-form-shell">
    <v-form id="part-edit-form">
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
  </span>

</template>
<style>
span#part-edit-form-shell {
  /* background-color: rgb(54, 66, 51); */
  width: 100%;
  /* height: 100%; */
}

#part-edit-form {
  /* margin: 0% 5%; */
  width: 100%;
  padding: 2%;
  background-color: #ffffff5e;
  border-radius: 0px 0px 20px 20px;
}
</style>
