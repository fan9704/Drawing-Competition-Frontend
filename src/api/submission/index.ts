import request from "@/server/request";
import type { Submission, SubmissionCreateDTO } from "@/interfaces/submission";

export function listSubmission(): Promise<Submission> {
  return request({
    url: "/submission/",
    method: "get",
  });
}

export function createSubmission(data: SubmissionCreateDTO): Promise<SubmissionCreateDTO> {
  return request({
    url: "/submission/",
    method: "post",
    data: data
  });
}

export function listSubmissionByTeamIdAndChallengeId(teamId: number, challengeId: number): Promise<Submission[]> {
  return request({
    url: `/submission/challenge/${challengeId}/team/${teamId}/`,
    method: "get",
  });
}

export function getMaxScoreSubmissionByTeamIdAndChallengeId(teamId: number, challengeId: number): Promise<Submission> {
  return request({
    url: `/submission/max/challenge/${challengeId}/team/${teamId}/`,
    method: "get",
  });
}
