import type { Chapter, Course, Lesson } from "~/types/Course";
import courseData from "~/server/courseData.js";
// export const useCourse = (): Course => {
//   // return courseData;
//   return {
//     ...courseData,
//     chapters: courseData.chapters.map((chapter) => {
//       return {
//         ...chapter,
//         lessons: chapter.lessons.map((lesson) => {
//           return {
//             ...lesson,
//             path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
//           };
//         }),
//       }
//     })
//   };
// }
export default async () => {
  return await useFetchWithCache<Course>("/api/courses");
}

// export const useChapter = (chapterSlug: string): Maybe<Chapter> => {
//   const course = useCourse();
//   return course.chapters.find(
//     (chapter) => chapter.slug === chapterSlug
//   );
//   // return computed(
//   //   (): Chapter | undefined => {
//   //     return 
//   //   }
//   // );
// }

// export const useLesson = (chapterSlug: string, lessonSlug: string): Maybe<Lesson> => {
//   const chapter = useChapter(chapterSlug);
//   return chapter?.lessons.find(
//     (lesson) => lesson.slug === lessonSlug
//   );

// };