<script setup>
import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { toast } from "sonner";

const props = defineProps({
  challengeId:String
})

const challengeId = computed(() => props.challengeId);

const fetchBestTeams = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/statistic/challenge/${props.challengeId}/top3Team/`
    );
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return await res.json();
  } catch (error) {
    toast.error("無法取得最佳隊伍資料，請找課活團隊求助！", {
      description: error.message ?? error,
    });
    console.error(error);
    return [];
  }
};

const { data: bestTeams, isFetching } = useQuery({
  queryKey: ["bestTeams", challengeId],
  queryFn: fetchBestTeams,
  refetchInterval: 30000,
});
</script>

<template>
  <div>
    <h3 class="mt-4 mb-2 font-semibold">最佳隊伍</h3>
    <div class="border rounded-md border-zinc-600 overflow-hidden">
      <v-data-table-virtual
        :items="bestTeams"
        :headers="[
          { title: '隊伍名稱', align: 'start', key: 'team_name' },
          { title: '吻合度', align: 'start', key: 'fitness' },
          { title: '程式字數', align: 'start', key: 'word_count' },
          { title: '加權分數', align: 'start', key: 'max_score' }
        ]"
        item-value="team_name"
        :loading="isFetching"
        no-data-text="目前沒有隊伍成功解出本題"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.team_name }}</td>
            <td>{{ item.fitness }}</td>
            <td>{{ item.word_count }}</td>
            <td>{{ item.max_score }}</td>
          </tr>
        </template>
      </v-data-table-virtual>
    </div>
  </div>
</template>
