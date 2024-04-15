interface Order {
  id: number;
  order_number: string;
  description: string;
  status: string;
  expected_date: timestamp;
  user_id: number
}

interface OrderCreateDTO {
  order_number: string;
  description: string;
  status: string;
  username: string
  expected_date: timestamp;
  part_id_list: number[]
  part_number_list: number[]
}

interface OrderUpdateDTO {
  order_number: string;
  description: string;
  status: string;
  user_id: number
  expected_date: timestamp;
}

export { Order, OrderCreateDTO, OrderUpdateDTO }
