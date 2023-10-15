import { useAuth } from "~/stores/auth"
import { User } from "@supabase/gotrue-js";
export default defineNuxtRouteMiddleware(async (to, from) => {

    if (process.server) return;
    const auth = useAuth();
    const { $loginWithGithubToken } = useNuxtApp()
    const githubToken = useLocalStorage("github_token", "");
    if (auth.isSigned || to.params.chapterSlug == '1-chapter-1') {
        return;
    }

    if (githubToken.value !== "") {

        return await $loginWithGithubToken(githubToken.value).then(() => {
            console.log(auth.isSigned);
            if (auth.isSigned || to.params.chapterSlug == '1-chapter-1') return;
            // return navigateTo('/login');
        });
    }
    // if (!auth.isSigned) {
    //     return navigateTo('/login');
    // }
})