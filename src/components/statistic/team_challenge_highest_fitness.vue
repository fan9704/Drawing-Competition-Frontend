<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts';
import { useTeamStore } from '@/store';
import { storeToRefs } from 'pinia';
import { getStatisticTeamChallengeHightestScore } from "@/api/statistic";
import type { StatisticTeamChallengeHightestScore } from "@/interfaces/statistic";

// Chart
const barChart = ref(null);
let myBarChart: any = null;
const chartData = ref({
  xData: [1, 2, 3, 4, 5, 6, 7],
  yData: [100, 100, 100, 100, 100, 100, 100],
});

const teamStore = useTeamStore();
const { teamData } = storeToRefs(teamStore);

const statisticData = ref<StatisticTeamChallengeHightestScore[]>();

const getData = async () => {
  let team_id: number | null = null;
  if (teamData.value) {
    team_id = teamData.value.id;
  }
  const res = await getStatisticTeamChallengeHightestScore(team_id);
  statisticData.value = res;
  let xData: number[] = [];
  let yData: number[] = [];

  res.forEach(record => {
    xData.push(record["challenge"])
    yData.push(record["max_score"])
  });
  chartData.value.xData = xData;
  chartData.value.yData = yData;
  updateChart();
}

const updateChart = () => {
  const option = {
    animationDuration: 3000,
    title: {
      text: `${teamData.value?.name}-各挑戰最高分統計圖`,
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
      type: 'bar',
    }]
  };
  myBarChart.setOption(option);
}

watch(chartData, (newValue, oldValue) => {
  updateChart();
  console.log('chartData changed', newValue);
})

onMounted(() => {
  myBarChart = echarts.init(barChart.value);
  getData();
})

onUnmounted(() => {
  if (myBarChart != null) {
    myBarChart.dispose();
    myBarChart = null;
  }
});
</script>
<template>
  <div class="line-chart-container">
    <div class="line-chart" ref="barChart"></div>
  </div>
</template>
<style>
.line-chart-container {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.line-chart {
  width: 100%;
  height: 100%;
}
</style>
