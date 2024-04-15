import request from "@/server/request";
import type { PartCreateRequestDTO, PartUpdateRequestDTO } from "@/interfaces/part";

export function listParts() {
  return request({
    url: "/part/",
    method: "get",
  });
}
export function getPartById(id: number) {
  return request({
    url: `/part/${id}/`,
    method: "get",
  });
}
export function createPart(data: PartCreateRequestDTO) {
  return request({
    url: "/part/",
    method: "post",
    data,
  });
}
export function updatePart(id: number, data: PartUpdateRequestDTO) {
  return request({
    url: `/part/${id}/`,
    method: "put",
    data,
  });
}
export function patchPart(id: number, data: PartUpdateRequestDTO) {
  return request({
    url: `/part/${id}/`,
    method: "patch",
    data,
  });
}
export function deletePart(id: number) {
  return request({
    url: `/part/${id}/`,
    method: "delete",
  });
}
