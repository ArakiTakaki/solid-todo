
export const notNull = <T>(item: T | null): item is T => {
    return item !== null;
}