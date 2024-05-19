<script setup lang="ts">
import type { Submission } from "@/interfaces/submission";
import { ref, onMounted, shallowRef } from "vue";
import { getDateTime, getChallengeStatusIcon } from "@/utils";
import { getMaxScoreSubmissionByTeamIdAndChallengeId } from "@/api/submission";
import type { Challenge, TeamChallenge } from '@/interfaces/challenge';
import { useTeamStore } from '@/store';
import { storeToRefs } from 'pinia';


const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const teamStore = useTeamStore();
const { teamData } = storeToRefs(teamStore);

const submission = ref<Submission>({
  code: "",
  score: 0,
  status: "todo",
  time: "",
  team: 0,
  challenge: props.id,
  round: 1
});
// Editor
const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  autoIndent: "full",
  codeLens: true,
  detectIndentation: true,
  guides: true,
  quickSuggestions: true,
  renderValidationDecorations: "on",
  wordBasedSuggestionsOnlySameLanguage: true,
  readOnly: true,
}
const editorRef = shallowRef()
const handleMount = (editor: any) => (editorRef.value = editor)
// Editor
const findHighestTeamChallengeScore = async () => {
  let team_id: number = 0;
  if (teamData.value) {
    team_id = teamData.value.id;
  }
  let challenge_id = props.id;
  const res = await getMaxScoreSubmissionByTeamIdAndChallengeId(team_id, challenge_id);
  submission.value = res;
  console.log(res);

}

onMounted(() => {
  findHighestTeamChallengeScore();
})
</script>
<template>
  <v-table>
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
      <td>{{ getDateTime(submission.time) }}</td>
      <td>{{ getChallengeStatusIcon(submission.status) }}-{{ submission.status }}</td>
      <td>{{ submission.score }}</td>
    </tbody>
  </v-table>
  <vue-monaco-editor v-model:value="submission.code" theme="vs-dark" :options="MONACO_EDITOR_OPTIONS" language='python'
    @mount="handleMount" />
</template>
