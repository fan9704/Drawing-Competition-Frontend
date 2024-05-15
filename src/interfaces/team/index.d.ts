interface Team {
  id: number;
  name: string;
  token: string;
}

interface TeamAuthRequestDTO {
  name: string;
  token: string;
}
interface TeamAuthResponseDTO {
  status: boolean;
  team: Team;
}
interface TeamListResponseDTO {
  id: number;
  name: string;
}
export type { Team, TeamAuthRequestDTO, TeamAuthResponseDTO, TeamListResponseDTO }
