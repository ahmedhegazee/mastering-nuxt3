import useCourse from "~/composables/useCourse";
import useChapter from "~/server/composables/useChapter";
import courseData from "~/server/courseData.js";
export default defineEventHandler(async (event) => {
    const params = getRouterParams(event);

    const chapter = useChapter(params.chapterSlug);
    if (!chapter) {
        throw createError({
            statusCode: 404,
            statusMessage: `Chapter ${params.chapterSlug} not found`,
        });
    }
    return event.respondWith(Response.json(chapter));
});