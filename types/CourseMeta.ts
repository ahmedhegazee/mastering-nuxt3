export type MetaBase = {
    title: string;
    slug: string;
    number: number;
}

export type OutlineChapter = MetaBase & {
    lessons: OutlineLesson[];
}
export type OutlineLesson = MetaBase & {
    path: string;
}
export type CourseMeta = {
    title: string;
    chapters: OutlineChapter[];
}