
export const notDefinedFunction = (message: string) => () => {
    throw new Error(message);
}
export const notDefinedAsyncFunction = async (message: string) => () => {
    throw new Error(message);
}