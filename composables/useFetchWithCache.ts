import type { Lesson, LessonWithPath } from "~/types/Course";
import { StorageSerializers } from "@vueuse/core";
export default async <T>(url: string) => {
    // const chapter = useChapter(chapterSlug);
    // return chapter?.lessons.find(
    //   (lesson) => lesson.slug === lessonSlug
    // );

    //caching the data

    //we pass null as default value because we want to use the cache if it exists
    //set the serializer to object so it will be stored as object in the session storage
    const cachedData = useSessionStorage<T>(url, null, {
        serializer: StorageSerializers.object,
    })
    if (cachedData.value)
        return cachedData.value;
    const { data, pending, error, refresh } = await useFetch<T>(url, {
        headers: {
            token: useCookie('github_token', { default: () => "" }).value
        }
    });

    if (error.value) {
        if (error.value.statusCode == 401) {

            return;
        }

        throw createError({
            ...error.value,
            statusMessage: error.value.statusMessage ?? `Could not fetch data from ${url}`
        });

    }
    cachedData.value = data.value as T;
    return data;
};
