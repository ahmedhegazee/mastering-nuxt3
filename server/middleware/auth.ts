import { useRoute } from "vue-router";
import { useAuth } from "~/stores/auth";
import firebaseLogin from "../utils/firebaseLogin";
import { H3Event, H3Error } from "h3";
import checkChapterLink from "../utils/checkChapterLink";
import checkFirstChapter from "../utils/checkFirstChapter";


export default defineEventHandler(async (event: H3Event) => {
    const token = event.headers.get('token');

    // const headers = useRequestHeaders(['cookie'])

    if (checkChapterLink(event)) {
        return;
    }

    if (checkFirstChapter(event))
        return;
    const error: H3Error = {
        statusCode: 401,
        statusMessage: 'Unauthorized',
    } as H3Error;
    if (token == null) {

        sendError(event, error);
    }

    await firebaseLogin(token as string).then((response) => {
        if (response.user) {
            event.context.user = response.user;
        }
    }).catch((error) => {
        sendError(event, error);
    });
    // await $loginWithGithubToken(token).then(() => {
    //     console.log(auth.user);
    // });
    // console.log("headers", headers);
});