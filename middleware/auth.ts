import { useAuth } from "~/stores/auth"
import type { User } from "@supabase/gotrue-js";
export default defineNuxtRouteMiddleware(async (to, from) => {
    // return;
    // const user: Ref<User | null> = useSupabaseUser();
    // if (to.path === '/login') return;
    // console.log("User: ", user.value);
    // if (user.value === null) {
    //     return navigateTo('/login');
    // }
    if (process.server) return;
    const auth = useAuth();
    const { $loginWithGithubToken } = useNuxtApp()

    if (auth.isSigned || to.params.chapterSlug == '1-chapter-1')
        return;
    const githubToken = useCookie("github_token", { default: () => "" });
    if (githubToken.value === "") {
        return navigateTo(`/login?redirect=${to.path}`);
    }
    await $loginWithGithubToken(githubToken.value).then(() => {
        if (auth.isSigned) return;
        return navigateTo(`/login?redirect=${to.path}`);
    });
    // if (!auth.isSigned) {
    //     return navigateTo('/login');
    // }
})