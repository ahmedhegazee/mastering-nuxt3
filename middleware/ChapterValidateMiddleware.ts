import { Course } from "~/types/Course";

export default defineNuxtRouteMiddleware((to, from) => {
    if (!to.params.chapterSlug) {
        abortNavigation(createError({
            statusCode: 404,
            message: 'Chapter not found'
        }))
    }
    const course: Course = useCourse();
    const chapter = course.chapters.find(chapter => chapter.slug === to.params.chapterSlug);
    if (!chapter) {
        abortNavigation(createError({
            statusCode: 404,
            message: 'Chapter not found'
        }))
    }
})