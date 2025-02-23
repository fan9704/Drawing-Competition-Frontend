import { useRouter } from "vue-router";
import { useCookies } from 'vue3-cookies';



export default function useLogout() {
    const { cookies } = useCookies();
    const router = useRouter();

    const onLogout = () => {
        cookies.remove("teamToken");
        router.push("/");
    };

    return onLogout;
}
