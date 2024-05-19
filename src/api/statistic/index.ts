import request from "@/server/request";
import type { StatisticTeamChallengeHightestScore, StatisticTeamChallengeSubmissionTime, StatisticTeamChallengeRoundScore, StatisticTeamRoundTotalScore } from "@/interfaces/statistic";

export function getStatisticTeamChallengeHightestScore(team_id: number | null): Promise<StatisticTeamChallengeHightestScore[]> {
  let url: string = "/statistic/team/"
  if (team_id != null) {
    url = `/statistic/team/?team_id=${team_id}`
  }
  return request({
    url: url,
    method: "get",
  });
}
export function getStatisticTeamChallengeSubmissionTime(team_id: number | null): Promise<StatisticTeamChallengeSubmissionTime[]> {
  let url: string = "/statistic/submission/"
  if (team_id != null) {
    url = `/statistic/submission/?team_id=${team_id}`
  }
  return request({
    url: url,
    method: "get",
  });
}
export function getStatisticTeamChallengeRoundScore(team_id: number | null, round_id: number): Promise<StatisticTeamChallengeRoundScore> {
  let url: string = `/statistic/round/${round_id}/team/`
  if (team_id != null) {
    url += "?team_id=" + team_id
  }
  return request({
    url: url,
    method: "get",
  });
}

export function getAllStatisticTeamRoundScore(): Promise<StatisticTeamRoundTotalScore[]> {
  return request({
    url: "/statistic/round/allTeam/",
    method: "get",
  });
}
