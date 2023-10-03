import { Course } from "~/types/Course";
import courseData from "./courseData";
export const useCourse = (): Course => {
  // return courseData;
  return {
    ...courseData,
    chapters: courseData.chapters.map((chapter) => {
      return {
        ...chapter,
        lessons: chapter.lessons.map((lesson) => {
          return {
            ...lesson,
            path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
          };
        }),
      }
    })
  };
}
