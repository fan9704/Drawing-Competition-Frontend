import type { Submission } from "@interfaces/submission";

interface StatisticTeamChallengeHightestScore {
  challenge: number;
  max_score: number;
  submission: Submission
}

interface StatisticTeamChallengeSubmissionTime {
  challenge: number;
  submission_count: number
}

interface StatisticTeamChallengeRoundScore {
  round_id: number;
  team_id: number;
  total_score: number;
}

interface StatisticTeamRoundTotalScore { // 取有各 Team 各 Round 分別總分的單一物件
  team_id: number;
  team_name: string;
  round_id_list: number[];
  total_score_list: number[];
}

export type { StatisticTeamChallengeHightestScore, StatisticTeamChallengeSubmissionTime, StatisticTeamChallengeRoundScore, StatisticTeamRoundTotalScore }
