import request from "@/server/request";
import type { OrderCreateDTO, OrderUpdateDTO } from "@/interfaces/order";

export function listOrders() {
  return request({
    url: "/order/",
    method: "get",
  });
}
export function listScheduleOrders() {
  return request({
    url: "/order/schedule/",
    method: "get",
  });
}
export function getOrderById(id: number) {
  return request({
    url: `/order/${id}/`,
    method: "get",
  });
}
export function createOrder(data: OrderCreateDTO) {
  return request({
    url: "/order/",
    method: "post",
    data,
  });
}
export function updateOrder(id: number, data: OrderUpdateDTO) {
  return request({
    url: `/order/${id}/`,
    method: "put",
    data,
  });
}
export function patchOrder(id: number, data: OrderUpdateDTO) {
  return request({
    url: `/order/${id}/`,
    method: "patch",
    data,
  });
}
export function deleteOrder(id: number) {
  return request({
    url: `/order/${id}/`,
    method: "delete",
  });
}
