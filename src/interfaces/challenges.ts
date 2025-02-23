interface ChallengeType{
    id: string;
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    image_url: string;
}

export type{ ChallengeType}