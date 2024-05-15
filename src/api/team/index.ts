import request from "@/server/request";
import type { TeamAuthRequestDTO, TeamAuthResponseDTO, TeamListResponseDTO } from "@/interfaces/team";

export function teamAuthWithToken(data: TeamAuthRequestDTO): Promise<TeamAuthResponseDTO> {
  return request({
    url: "/team/auth/token/",
    method: "post",
    data: data
  });
}

export function listTeam(): Promise<TeamListResponseDTO[]> {
  return request({
    url: "/team/",
    method: "get",
  });
}
