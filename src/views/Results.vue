<template>
    <AppShell :allowAnon="true">
      <div class="h-full w-full flex justify-center overflow-y-auto">
        <div class="my-20 w-full max-w-4xl">
          <h1 class="mt-4 font-bold text-5xl text-white">遊戲結束！</h1>
          <h2 class="mt-4 text-2xl text-zinc-400">檢視遊戲結果</h2>
          
          <n-table
            :items="tableData.body"
            :columns="tableData.header"
            class="border rounded-md border-zinc-600 mt-8"
            :loading="query.isPending"
            :loading-content="loadingContent"
          >
            <template #default="{ item }">
              <n-table-row :key="item.key">
                <template v-for="columnKey in tableData.header" :key="columnKey.key">
                  <n-table-cell class="text-white py-3">
                    {{ item[columnKey.key] }}
                  </n-table-cell>
                </template>
              </n-table-row>
            </template>
          </n-table>
          
          <div class="h-40 w-full flex-shrink-0" />
        </div>
      </div>
    </AppShell>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGameResultsQuery } from '../utils/requests';
import { useRouter } from 'vue-router';
import AppShell from '../components/shared/AppShell';

const { query, tableData } = useGameResultsQuery();
const router = useRouter();
const loadingContent = ref('loading');  // Change to a simple string flag

onMounted(() => {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/round/`).then((res) => {
    if (res.status !== 204) {
      router.push('/team');
    }
  });
});
</script>
