<template>
  <v-container class="pt-4">
    <v-card class="pa-6 rounded-lg bg-opacity-70" :class="'bg-zinc-800'">
      <v-row>
        <v-col cols="12">
          <v-row class="bg-blue-600 bg-opacity-60 py-2 rounded-md" align="center">
            <!-- <v-icon class="white--text" small>mdi-desktop-classic</v-icon> -->
            <h6 class="text-h6 text-zinc-100 font-weight-medium">各隊投稿</h6>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <BestTeams :challengeId="challengeId" />
        </v-col>
        <v-col cols="12">
          <TeamSubmissions :challengeId="challengeId" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import BestTeams from '@/components/challenges/submissions/BestTeams';
import TeamSubmissions from '@/components/challenges/submissions/TeamSubmissions';

const props = defineProps({
  challengeId: String
});
</script>
