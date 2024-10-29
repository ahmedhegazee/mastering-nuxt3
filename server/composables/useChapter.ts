import type { Chapter, Course } from "~/types/Course";
import useFetchWithCache from "./useFetchWithCache";
import courseData from "../courseData";

export default (chapterSlug: string) => {
    const course = courseData;
    const chapter = course.chapters.find(
        (chapter) => chapter.slug === chapterSlug
    );
    return chapter;
}