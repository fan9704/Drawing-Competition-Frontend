<script setup lang="ts">
import { ref, onMounted } from "vue";
import { listSubmissionByTeamIdAndChallengeId } from "@/api/submission";
import { getDateTime, getChallengeStatusIcon } from "@/utils";
import type { Submission } from "@/interfaces/submission";
import { useTeamStore } from '@/store';
import { storeToRefs } from 'pinia';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const historySubmissions = ref<Submission[]>([]);
const teamStore = useTeamStore();
const { teamData } = storeToRefs(teamStore);

const findAllHistorySubmission = async () => {
  let team_id: number = 0;
  if (teamData.value) {
    team_id = teamData.value.id;
  }
  const challenge_id = props.id;
  const res = await listSubmissionByTeamIdAndChallengeId(team_id, challenge_id);
  historySubmissions.value = res;
}

onMounted(() => {
  findAllHistorySubmission();
})
</script>
<template>
  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">
          提交時間
        </th>
        <th class="text-left">
          狀態
        </th>
        <th class="text-left">
          分數
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="submission in historySubmissions">
        <td>{{ getDateTime(submission.time) }}</td>
        <td>{{ getChallengeStatusIcon(submission.status) }}-{{ submission.status }}</td>
        <td>{{ submission.score }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<style></style>
