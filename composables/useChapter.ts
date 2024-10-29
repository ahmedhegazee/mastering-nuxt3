import type { Chapter } from "~/types/Course";

export default async (chapterSlug: string) => {
    return await useFetchWithCache<Chapter>(`/api/courses/chapter/${chapterSlug}`);
}