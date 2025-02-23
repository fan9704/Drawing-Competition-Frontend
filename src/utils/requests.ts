import { useQuery } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import { toast } from "sonner";
import type { ChallengeType } from "@/interfaces/challenges";

export function useRoundQuery() {
    const router = useRouter();

    const roundDataQuery = useQuery<{
        id: number;
        start_time: Date;
        end_time: Date;
        challenge_list: ChallengeType[];
    }>({
        queryKey: ["roundData"],
        queryFn: async () => 
                fetch(`${import.meta.env.VITE_BACKEND_URL}/api/round/`)
                .then(async (res) => {
                    if (!res.ok) {
                        if (res.status === 404) {
                            return null;
                        }
                        throw new Error(await res.text());
                    }
                    if (res.status === 204) {
                        router.push("/results");
                        return null;
                    }
                    return res.json();
                })
                .catch((error) => {
                    toast.error("無法取得題目資料，請找課活團隊求助！", {
                        description: error.message ?? error,
                    });
                    console.error(error);
                }),
        refetchInterval: 20000,
    });

    return roundDataQuery;
}
export function useRoundLeaderboardQuery({ roundId }: { roundId: any }) {
    if(roundId === undefined){
        return
    }
    const tableData = ref({
        header: [
            { key: "teamName",align: 'start',  title: "隊伍名稱" },
            { key: "totalScore",align: 'start',  title: "隊伍總分" },
        ],
        body: [],
    });

    const query = useQuery<{
        team_id: string;
        team_name: string;
        total_score: number;
        score_list: number[];
    }[]
    >({
        queryKey: ["roundLeaderboard", roundId],
        queryFn: () =>
            fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/statistic/round/${roundId}/allTeam`,
            )
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error(await res.text());
                    }
                    return res.json();
                })
                .then((res) =>
                    res.map((team: any) => ({
                        ...team,
                        total_score: team.score_list.reduce(
                            (a: number, b: number) => a + b,
                            0,
                        ),
                    })),
                )
                .catch((error) => {
                    toast.error("索引排行榜時發生錯誤，請尋找課活團隊求助！", {
                        description: error.message ?? error,
                    });
                }),
        refetchInterval: 5000,
    });
    const { isLoading } = query;
    watchEffect(() => {
        if (!query.data.value) return;

        const columnHeaders = [
            { key: "teamName", title: "隊伍名稱" },
            ...query.data.value[0].score_list.map((_, i) => ({
                key: `Q${i + 1}`,
                title: `Q${i + 1}`,
            })),
            { key: "totalScore", title: "隊伍總分" },
        ];

        const rowData = query.data.value
            .map((team) => ({
                key: team.team_name,
                teamName: team.team_name,
                totalScore: team.total_score,
                ...team.score_list.reduce((acc, score: number, i: number) => {
                    //@ts-ignore
                    acc[`Q${i + 1}`] = score;
                    return acc;
                }, {}),
            }))
            .sort((a, b) => b.totalScore - a.totalScore);
        //@ts-ignore
        tableData.value = { header: columnHeaders, body: rowData };
    });

    return { query, tableData, isLoading };
}

export function useGameResultsQuery() {
    const tableData = ref({
        header: [
            { key: "teamName", label: "隊伍名稱" },
            { key: "totalScore", label: "隊伍總分" },
        ],
        body: [],
    });

    const query = useQuery({
        queryKey: ["gameLeaderboard"],
        queryFn: async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/statistic/round/allTeam/`);
                if (!res.ok) throw new Error(await res.text());

                const data = await res.json();
                //@ts-ignore
                const sortedData = data.map(team =>
                    team.round_id_list//@ts-ignore
                        .map((roundId, i) => ({
                            id: roundId,
                            score: team.total_score_list[i],
                        }))//@ts-ignore
                        .sort((a, b) => a.id - b.id)
                );
                //@ts-ignore
                return data.map((team, i) => ({
                    ...team,//@ts-ignore
                    round_id_list: sortedData[i].map(data => data.id),//@ts-ignore
                    total_score_list: sortedData[i].map(data => data.score),
                }));
            } catch (error: any) {
                toast.error("索引排行榜時發生錯誤，請尋找課活團隊求助！", {//@ts-ignore
                    description: error.message ?? error,
                });
                throw error;
            }
        },
    });

    watchEffect(() => {
        if (!query.data.value) return;

        const columnHeaders = [
            { key: "teamName", label: "隊伍名稱" },//@ts-ignore
            ...query.data.value[0].round_id_list.map((_, i) => ({
                key: `Round ${i + 1}`,
                label: `Round ${i + 1}`,
            })),
            { key: "totalScore", label: "隊伍總分" },
        ];

        const rowData = query.data.value
            //@ts-ignore
            .map(team => ({
                key: team.team_name,
                teamName: team.team_name,//@ts-ignore
                totalScore: team.total_score_list.reduce((prev, cur) => prev + cur, 0),//@ts-ignore
                ...team.total_score_list.reduce((acc, score, i) => {
                    acc[`Round ${i + 1}`] = score;
                    return acc;
                }, {}),
            }))//@ts-ignore
            .sort((a, b) => b.totalScore - a.totalScore);

        tableData.value = { header: columnHeaders, body: rowData };
    });

    return { query, tableData };
}