import request from "@/server/request";
import type { Challenge, TeamChallenge } from "@/interfaces/challenge";

export function listChallenge():Promise<Challenge[]> {
    return request({
      url: "/challenge/",
      method: "get",
    });
  }
export function listTeamChallenge(team_id:number = 0):Promise<TeamChallenge[]>{
    let url = "/challenge/team/";
    if(team_id != 0){
        url += `?team_id=${team_id}`
    }
    return request({
        url: url
    })
}
export function getChallengeById(id:number):Promise<Challenge>{
    return request({
        url:`/challenge/${id}/`,
        method:"get",
    })
}