import request from "@/server/request";
import type { OAuthLoginDTO, OAuthRegisterDTO } from "@/interfaces/account";

export function listUsers() {
  return request({
    url: "/account/user/all/",
    method: "get",
  });
}

export function oAuthRegister(data: OAuthRegisterDTO) {
  return request({
    url: "/account/oauth/register/",
    method: "post",
    data: data
  })
}
export function oAuthLogin(data: OAuthLoginDTO) {
  return request({
    url: "/account/oauth/login/",
    method: "post",
    data: data
  })
}
