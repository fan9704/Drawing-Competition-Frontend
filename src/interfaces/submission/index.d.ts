interface Submission {
  code: string;
  score: number;
  status: string;
  time: string;
  team: number;
  challenge: number;
  round: number;
}
interface SubmissionCreateDTO {
  code: string;
  team: number;
  challenge: number;
  round: number;
}

export type { Submission, SubmissionCreateDTO }
