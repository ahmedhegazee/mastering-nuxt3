import type { CourseMeta, OutlineLesson } from "~/types/CourseMeta"
import course from "~/server/courseData";
import type { OutlineChapter } from '../types/CourseMeta';
import type { Chapter, Lesson, LessonWithPath } from "~/types/Course";
export const useCourseMeta = (): CourseMeta => {
    const OutlineChapters: OutlineChapter[] = course.chapters.map((next: Chapter): OutlineChapter => {
        const lessons: OutlineLesson[] = next.lessons.map((lesson: Lesson): OutlineLesson => {
            return {
                title: lesson.title,
                slug: lesson.slug,
                number: lesson.number,
                path: `/course/chapter/${next.slug}/lesson/${lesson.slug}`,
            }
        });
        const chapter: OutlineChapter = {
            title: next.title,
            slug: next.slug,
            number: next.number,
            lessons,
        }
        return chapter;
    });
    return {
        title: course.title,
        chapters: OutlineChapters,
    }
}