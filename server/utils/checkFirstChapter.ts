import { H3Event } from 'h3';
export default (event: H3Event) => {
    let link = getRequestURL(event).pathname;
    const linkSeparated = link.replace("/api/courses/chapter", "").replace("/lesson", "").split("/").filter((x) => x.length);
    return linkSeparated.find((str) => str == "1-chapter-1")
}