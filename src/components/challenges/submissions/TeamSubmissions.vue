<template>
  <div>
    <h3 class="mt-4 mb-2 font-semibold">你的投稿</h3>
      <v-data-table-virtual :headers="columns" :items="mappedData" no-data-text="你目前沒有任何投稿" @click:row="handleRowClick" :loading="isLoading">
        <template v-slot:item="{ item }">
          <tr @click="setViewingSubmission(item)">
            <td>{{ item.time }}</td>
            <td><StatusChip :status="item.status"></StatusChip></td>
            <td>{{ item.fitness }}</td>
            <td>{{ item.word_count }}</td>
            <td>{{ item.score }}</td>
          </tr>
        </template>
      </v-data-table-virtual>
    <!-- 投稿詳情對話框 -->
    <ViewSubmission :subData="viewingSubmission" @close="viewingSubmission = null" />
  </div>
</template>
<script setup>
import { jwtDecode } from "jwt-decode";
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useCookies } from 'vue3-cookies';
import StatusChip from "@/components/challenges/submissions/StatusChip";
import ViewSubmission from "@/components/challenges/submissions/ViewSubmission";

const props = defineProps({
  challengeId: {
    type: String,
    required: true,
  },
})
const { cookies } = useCookies();
const viewingSubmission = ref(null);
const teamToken = cookies.get("teamToken");
const decodedToken = jwtDecode(teamToken);

const columns = [
  { title: 'Time', align: 'start', key: 'time' },
  { title: 'Status', align: 'start', key: 'statusEnum' },
  { title: 'Fitness', align: 'start', key: 'fitness' },
  { title: 'Word Count', align: 'start', key: 'word_count' },
  { title: 'Score', align: 'start', key: 'score' },
];

const handleRowClick = (row) => {
  if (row.statusEnum === "success" || row.statusEnum === "fail") {
    viewingSubmission.value = row;
  }
};

const { data, isLoading, error } = useQuery({
  queryKey: ["submissions", props.challengeId, decodedToken?.sub],
  queryFn: async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/submission/all/${props.challengeId}/${decodedToken?.sub}/`
    );
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data;
  },
  refetchInterval: 3000,
});
const mappedData = computed(() => {
  if (!data.value) return []; 
  return data.value.map((sub) => ({
    id: sub.id,
    code: sub.code,
    time: new Date(sub.time).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    status: sub.status, 
    statusEnum: sub.status,
    fitness: sub.status === "success" ? sub.fitness : "-",
    word_count: sub.status === "success" ? sub.word_count : "-",
    score: sub.status === "success" ? sub.score : "-",
    execute_time: sub.status === "success" ? sub.execute_time : "-",
    stdout: sub.stdout,
    stderr: sub.stderr,
    draw_image_url: sub.draw_image_url,
  }));
});

const setViewingSubmission = (item) =>{
  viewingSubmission.value = item
}
</script>
<style scoped>
/* 自定義樣式 */
</style>