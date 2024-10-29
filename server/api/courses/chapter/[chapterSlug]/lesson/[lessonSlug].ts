// import { useChapter, useLesson } from "~/composables/useCourse";
// import { useChapter, useLesson } from "~/composables/useCourse";

import type { H3Error } from "h3";
import useChapter from "~/server/composables/useChapter";
import useLesson from "~/server/composables/useLesson";
import type { Lesson, Chapter } from "~/types/Course";
export default defineEventHandler(async (event) => {
    // console.log(event);
    const params = getRouterParams(event);

    const chapter: Maybe<Chapter> = useChapter(params.chapterSlug);
    const lesson: Maybe<Lesson> = useLesson(params.chapterSlug, params.lessonSlug);
    let message = `Lesson ${params.lessonSlug} not found in chapter ${params.chapterSlug}`;

    if (!chapter) {
        message = `Chapter ${params.chapterSlug} not found`;
    }
    const error: H3Error = {
        statusCode: 404,
        statusMessage: message,
    } as H3Error;
    if (!lesson || !chapter) {
        throw createError(error);
        // return event.respondWith(Response.error());
        // sendError(event, error);
    }
    // return event.respondWith(Response.json({
    //     lesson,
    //     chapter,
    // }));
    // console.log('lesson', lesson);
    return event.respondWith(Response.json(lesson));
});