interface Challenge{
    id:number;
    description:string;
    image_url:string;
    is_valid:boolean;
    round_id:number;
}
interface TeamChallenge{
    id:number;
    round_id:number;
    description:string;
    is_valid:boolean;
    status: string
}

export type {Challenge ,TeamChallenge}