<template>
  <v-menu location="top">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        icon
        class="fixed bottom-5 right-5 bg-transparent hover:shadow-xl"
      >
        <v-icon size="36" color="white">mdi-help-circle-outline</v-icon>
      </v-btn>
    </template>

    <v-card class="bg-grey-darken-3 text-white rounded-lg">
      <v-list dense>
        <v-list-item v-for="(url, key) in links" :key="key" @click="openLink(url)">
          <v-list-item-title class="d-flex justify-space-between">
            {{ titles[key] }}
            <v-icon size="16">mdi-open-in-new</v-icon>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup>
const links = {
  sys_tut: "https://docs.google.com/document/d/1Whgj8O9oFgrYUtGFhotWkBH_dA5CbMAGquSgOSCL9Fs/edit",
  turtle_slide: "https://docs.google.com/presentation/d/1_b6YuFZVujgGzW1fH6HVNZluly_iH5Xdxeuc6JTp0F4/edit",
  ex_code_1: "https://github.com/aa35037123/turtle_challenge/blob/main/drawing_tutorial/pen.py",
  ex_code_2: "https://github.com/aa35037123/turtle_challenge/blob/main/drawing_tutorial/star.py",
};

const titles = {
  sys_tut: "系統使用指南",
  turtle_slide: "Turtle 教學",
  ex_code_1: "範例程式一",
  ex_code_2: "範例程式二",
};

const openLink = (url) => {
  const newWindow = window.open(url, "_blank");
  if (newWindow) window.focus();
};
</script>

<style scoped>
.v-btn:hover {
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
}
</style>
