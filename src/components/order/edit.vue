<script setup lang="ts">
import { getOrderById, updateOrder } from '@/api/order';
import swal from 'sweetalert2';
import { onUpdated, ref } from 'vue';


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
  username: ""
} as any);

const findPartById = async (id: number) => {
  const res = await getOrderById(id);
  record.value = res.data;
};
const resetForm = () => {
  record.value = {
    order_number: "",
    description: "",
    status: "",
    expected_date: undefined,
    username: ""
  };
};
const submitForm = async () => {
  const formRecord = {
    order_number: record.value.order_number,
    description: record.value.description,
    status: record.value.status,
    expected_date: record.value.expected_date,
    username: record.value.username
  } as any;
  const res = await updateOrder(props.id, formRecord)
  if (res.status == 200) {
    record.value = res.data;
    swal.fire("修改成功", "訂單資料已經同步更新", "success");
  }
  else {
    swal.fire("修改失敗", "訂單資料異常或伺服器異常", "error");
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
        <v-col cols="2">
          <v-text-field v-model="record.order_number" label="訂單編號"></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="record.description" label="訂單描述"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="record.status" label="訂單狀態"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="record.username" label="操作人"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="record.expected_date" label="預計完工日期"></v-text-field>
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
