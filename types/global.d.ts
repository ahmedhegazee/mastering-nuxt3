export {

};
//declaring namespace
declare global {
    //T means any type (generic type)
    type Maybe<T> = T | null | undefined;
}