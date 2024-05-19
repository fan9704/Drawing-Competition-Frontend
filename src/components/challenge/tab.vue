<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getServerURL } from '@/utils';
import type { Challenge } from '@/interfaces/challenge';
import History from "@/components/challenge/history.vue";
import MaxScore from "@/components/challenge/max_score.vue";


const props = defineProps({
  challenge: {
    type: Object as () => Challenge,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});
const tab = ref(0)


const findAllSubmission = async () => {
  // const res = await listSubmission();
  // submissions.value = res;
};
const findHighestTeamChallengeScore = async () => {
  // const res = await listTeamChallenge();
  // teamChallenges.value = res;

}
onMounted(() => {
  findAllSubmission();
  findHighestTeamChallengeScore();
})
</script>
<template>
  <v-card>
    <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
      <v-tab :value="0">題目描述</v-tab>
      <v-tab :value="1">提交歷史</v-tab>
      <v-tab :value="2">最高分數</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item>
        <v-card class="mx-auto">
          <v-card-text>
            <h2>挑戰 {{ props.id }}</h2>
            <br>
            <h3>描述</h3>
            {{ props.challenge.description }}
            <h3>圖片</h3>
          </v-card-text>
          <v-img id="challenge-img" :src=getServerURL(props.challenge.image_url) :alt=props.challenge.image_url
            cover></v-img>
        </v-card>
      </v-tabs-window-item>
      <v-tabs-window-item>
        <History :id=props.id />
      </v-tabs-window-item>
      <v-tabs-window-item>
        <MaxScore :id=props.id />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>
<style>
#challenge-img {
  max-height: 50vh;
  aspect-ratio: 1/1;
  display: block;
  margin: 0 auto;
}
</style>
