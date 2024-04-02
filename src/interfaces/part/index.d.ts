interface Part {
  id: number;
  name: string;
  number: number;
  min_number: number;
  warning: boolean;
}
interface PartCreateRequestDTO {
  name: string;
  number: number;
  min_number: number;
  warning: boolean;
}
interface PartUpdateRequestDTO {
  name: string;
  number: number;
  min_number: number;
  warning: boolean;
}

export { Part, PartCreateRequestDTO, PartUpdateRequestDTO }
