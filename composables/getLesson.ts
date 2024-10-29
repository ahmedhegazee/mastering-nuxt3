import type { Lesson, LessonWithPath } from "~/types/Course";
import { StorageSerializers } from "@vueuse/core";
export default async (chapterSlug: string, lessonSlug: string) => {
    // const chapter = useChapter(chapterSlug);
    // return chapter?.lessons.find(
    //   (lesson) => lesson.slug === lessonSlug
    // );

    //caching the data
    const url = `/api/courses/chapter/${chapterSlug}/lesson/${lessonSlug}`;
    return await useFetchWithCache<LessonWithPath>(url);
    //we pass null as default value because we want to use the cache if it exists
    //set the serializer to object so it will be stored as object in the session storage
    const lesson = useSessionStorage<LessonWithPath>(url, null, {
        serializer: StorageSerializers.object,
    })
    if (lesson.value)
        return lesson;
    const { data, pending, error, refresh } = await useFetch<LessonWithPath>(url);
    //the difference if the url is on server folder , it will not use http request ,it will call the function directly
    // const { data, error } = await useAsyncData(() => $fetch(`/api/courses/chapter/${chapterSlug}/lesson/${lessonSlug}`));

    // const { data, error } = await useFetch(`http://localhost:3000/api/courses/chapter/${chapterSlug}/lesson/${lessonSlug}`);
    // console.log('error', error);

    if (error.value) {
        throw createError({
            ...error.value,
            statusMessage: `Error fetching lesson ${lessonSlug} from chapter ${chapterSlug}`
        });

    }
    lesson.value = data.value;
    return data;
};
