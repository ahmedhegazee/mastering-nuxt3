import courseData from "~/server/courseData";
import { Chapter } from "~/types/Course";

export default defineEventHandler((event) => {
    return event.respondWith(Response.json({
        ...courseData,
        chapters: courseData.chapters.map(formatChapter),
    }));
});
const formatChapter = (chapter: Chapter) => {
    return {
        ...chapter,
        lessons: chapter.lessons.map((lesson) => {
            return {
                ...lesson,
                path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`
            };
        })
    };
};
