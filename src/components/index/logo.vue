<script setup lang="ts">
import Logo from "@/assets/logo.svg"
</script>
<template>
  <v-container>
    <v-row class="justify-center">
      <v-col style="text-align: center;">
        <h1 id="index-title">闖關活動 - Turtle 挑戰賽</h1>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="6" xs="6" sm="6" md="6" lg=3 xl=3 xxl=4>
        <v-img :src=Logo aspect-ratio="1" contain id="index-logo"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
#index-title {
  font-size: 4rem;
}

#index-logo {
  margin-top: 20px;
  border-radius: 5%;
}
</style>
