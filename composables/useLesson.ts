import type { Chapter } from "~/types/Course";

export default async (chapterSlug: string, lessonSlug: string) => {
    return await useFetchWithCache<Chapter>(`/api/courses/chapter/${chapterSlug}/lesson/${lessonSlug}`);
}