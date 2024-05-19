<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import type { Challenge } from '@/interfaces/challenge';
import { getChallengeById } from '@/api/challenge';
import { getServerURL } from '@/utils';
import { createSubmission } from '@/api/submission';
import swal from 'sweetalert2';
import router from "@/router"
import Tab from '@/components/challenge/tab.vue';
import { useTeamStore } from '@/store';
import { storeToRefs } from 'pinia';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const challenge = ref<Challenge>({
  id: props.id,
  description: "",
  image_url: "",
  round_id: 1,
  is_valid: true

});

// Editor
const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  acceptSuggestionOnEnter: "on",
  acceptSuggestionOnCommitCharacter: true,
  autoClosingBrackets: "always",
  autoClosingComments: "always",
  autoIndent: "full",
  codeLens: true,
  detectIndentation: true,
  guides: true,
  quickSuggestions: true,
  renderValidationDecorations: "on",
  wordBasedSuggestionsOnlySameLanguage: true,
}
const code = ref('# 打上你的程式碼')
const editorRef = shallowRef()
const handleMount = (editor: any) => (editorRef.value = editor)

// your action
function formatCode() {
  editorRef.value?.getAction('editor.action.formatDocument').run()
}
// Editor


const findChallengeById = async (id: number) => {
    const res = await getChallengeById(id);
    challenge.value = res;
}
const gotoList = () => {
  router.push({ name: 'Challenge' });

}

const resetCode = () => {
  code.value = "// some code..."
}

const submitCode = async () => {
  const teamStore = useTeamStore();
  const { teamData } = storeToRefs(teamStore);
  let team_id: number = 0;
  if (teamData.value) {
    team_id = teamData.value.id;
  }
  const submissionCreateDTO = {
    code: code.value,
    team: team_id,
    challenge: props.id,
    round: challenge.value.round_id,
  };
  console.log(submissionCreateDTO);
  const res = await createSubmission(submissionCreateDTO);
  console.log(res);
  swal.fire("提交成功", "請等待評斷", "success")
}

onMounted(() => {
    findChallengeById(props.id);
})
</script>
<template>

  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <!-- Description -->
        <div id="description-box" class="challenge-box">
          <Tab :challenge=challenge :id=props.id />
        </div>
      </v-col>
      <v-col cols="6">
        <!-- Coding -->
        <div class="challenge-box" id="coding-box">
          <h3>程式碼</h3>
          <vue-monaco-editor v-model:value="code" theme="vs-dark" :options="MONACO_EDITOR_OPTIONS" language='python'
            height=90% @mount="handleMount" />
        </div>
        <div id="bar-box">
        </div>
        <div id="button-box" class="challenge-box">
          <h3>按鈕區</h3>
          <v-btn color="info" @click="gotoList()">回到挑戰列表</v-btn>
          <v-btn color="warning" @click="resetCode()">重制</v-btn>
          <v-btn color="success" @click="submitCode()">提交</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.challenge-box{
    border-radius: 5px;
    border: black 1px solid;
    padding: 2% 5%;
}

#description-box {
  height: 85vh;
}

#coding-box {
  height: 73vh;
}

#bar-box {
    height: 1vh;
}
#button-box{
    height: 9 vh;
}
</style>

