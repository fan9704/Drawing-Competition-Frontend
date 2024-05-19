<script setup lang="ts">
import AllTeamRoundScore from '@/components/realtime_statistic/all_team_round_score.vue';
</script>
<template>
  <v-container>
    <v-row>
      <!-- <v-col cols="6">
        <h2>{{ teamData?.name }}</h2>
      </v-col>
      <v-col cols="6">
        <v-select label="Select Team" v-model="selectedTeam" :item-props="teamItemProps" :items=teamList>
        </v-select>
      </v-col> -->
    </v-row>
    <v-row>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="4">
        <!-- <TeamChallengeHighestFitness /> -->
      </v-col>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="4">
        <!-- <TeamChallengeSubmissionCount /> -->
      </v-col>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="4">
        <!-- <TeamChallengeRoundScore /> -->
      </v-col>
      <v-col cols="6" xs="12" sm="12" md="6" lg="6" xl="4">
        <AllTeamRoundScore />
      </v-col>
    </v-row>

  </v-container>
</template>
