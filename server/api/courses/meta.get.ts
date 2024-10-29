import { useCourseMeta } from "~/composables/useCourseMeta";

export default defineEventHandler((event) => {
    return event.respondWith(Response.json({
        course: useCourseMeta(),
    }));
});