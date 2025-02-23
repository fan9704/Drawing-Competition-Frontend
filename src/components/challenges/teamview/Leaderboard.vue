<template>
  <div class="border rounded-md border-zinc-600 overflow-x-auto">
    <table class="w-full border-collapse text-left text-white">
      <thead>
        <tr class="bg-zinc-700">
          <th v-for="column in data?.header ?? []" :key="column.key" class="p-3 border-b border-zinc-600">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading" class="text-center">
          <td :colspan="data?.body?.length ?? 1" class="p-4">加載中...</td>
        </tr>
        <tr v-else-if="data?.body?.length === 0" class="text-center">
          <td :colspan="data?.body?.length ?? 1" class="p-4">暫無數據</td>
        </tr>
        <tr v-else v-for="item in data?.body ?? []" :key="item.key" class="hover:bg-zinc-700">
          <td v-for="columnKey in data?.body ?? []" :key="columnKey.key" class="p-3 border-b border-zinc-600">
            {{ getKeyValue(item, columnKey.key) }}
          </td>
        </tr>
      </tbody>
    </table>
    <v-data-table-virtual :headers="tableData?.header ?? []" :items="tableData?.body" no-data-text="你目前沒有任何投稿" :loading="isLoading">
      </v-data-table-virtual>
  </div>
</template>

<script setup>
import { watch, computed } from "vue";
import { useRoundLeaderboardQuery } from "@/utils/requests";

const props = defineProps({
  roundId: Number,
});

// 確保 roundId 是字串，避免 undefined.toString() 錯誤
const roundIdString = computed(() => (props.roundId ? props.roundId.toString() : ""));

// 只有當 roundId 存在時才執行請求
const { query, tableData,isLoading } = useRoundLeaderboardQuery({ roundId: roundIdString.value });
watch(roundIdString, () => {
  console.log("Round",roundIdString)
  console.log("Table Data", tableData);
});

// 安全讀取 item[columnKey.key]，避免 undefined 錯誤
const getKeyValue = (item, columnKey) => {
  return item?.[columnKey] ?? "-";
};
</script>
