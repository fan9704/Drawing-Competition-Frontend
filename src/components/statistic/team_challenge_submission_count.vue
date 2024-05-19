<script setup lang="ts">
import { ref, onMounted, shallowRef, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import { useTeamStore } from '@/store';
import { storeToRefs } from 'pinia';
import { getStatisticTeamChallengeSubmissionTime } from "@/api/statistic";
// Chart
const lineChart = ref(null);
let myLineChart: any = null;
const chartData = ref({
  xData: [1, 2, 3, 4, 5, 6, 7],
  yData: [100, 100, 100, 100, 100, 100, 100],
});

const teamStore = useTeamStore();
const { teamData } = storeToRefs(teamStore);


const getData = async () => {
  let team_id: number | null = null;
  if (teamData.value) {
    team_id = teamData.value.id;
  }
  const res = await getStatisticTeamChallengeSubmissionTime(team_id);
  let xData: number[] = [];
  let yData: number[] = [];

  res.forEach(record => {
    xData.push(record["challenge"])
    yData.push(record["submission_count"])
  });
  chartData.value.xData = xData;
  chartData.value.yData = yData;
  updateChart();
}

const updateChart = () => {
  const option = {
    animationDuration: 3000,
    title: {
      text: `${teamData.value?.name}-各挑戰提交答案次數`,
    },
    color: [
      "#A5D88D",
      "#77B55A",
      "#509231",
    ],
    tooltip: {
      trigger: 'axis',
    },
    textStyle: {
      fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 300
    },
    xAxis: {
      type: 'category',
      data: chartData.value.xData
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: chartData.value.yData,
      type: 'line',
    }]
  };
  myLineChart.setOption(option);
}

watch(chartData, (newValue, oldValue) => {
  updateChart();
  console.log('chartData changed', newValue);
})

onMounted(() => {
  myLineChart = echarts.init(lineChart.value);
  getData()
})

onUnmounted(() => {
  if (myLineChart != null) {
    myLineChart.dispose();
    myLineChart = null;
  }
});
</script>
<template>
  <div class="line-chart-container">
    <div class="line-chart" ref="lineChart"></div>
  </div>
</template>
<style></style>
