import type { Chapter, Course } from "~/types/Course";
import useFetchWithCache from "./useFetchWithCache";
import courseData from "../courseData";

export default (chapterSlug: string, lessonSlug: string) => {
    const course = courseData;
    const chapter = course.chapters.find(
        (chapter) => chapter.slug === chapterSlug
    );

    const lesson = chapter?.lessons.find(
        (lesson) => lesson.slug === lessonSlug
    );
    return lesson;
}