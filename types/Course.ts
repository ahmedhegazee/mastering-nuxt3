import { MetaBase } from "./CourseMeta";

export type Course = {
  title: string;
  chapters: ChapterWithPath[];
}
export type Chapter = MetaBase & {
  lessons: Lesson[];
}
export type ChapterWithPath = MetaBase & {
  lessons: LessonWithPath[];
}
export type Lesson = MetaBase & {

  downloadUrl: string;
  videoId: number;
  text: string;
  sourceUrl?: string | null;

}


export type LessonWithPath = Lesson & {
  path: string;
}