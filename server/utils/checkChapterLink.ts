import { H3Event } from "h3";
export default (event: H3Event) => {
    let link = getRequestURL(event).pathname;
    return link.search("/courses/chapter") == -1;

}