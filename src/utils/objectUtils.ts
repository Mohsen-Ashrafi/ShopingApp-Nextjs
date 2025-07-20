// export function includeObj(obj, includesKey) {
//     const newObj = {};
//     Object.keys(obj)
//         .filter((key) => includesKey.includes(key))
//         .forEach((key) => (newObj[key] = obj[key]));
//     return newObj
// }

export function includeObj<T extends Record<string, any>>(obj: T, includesKey: string[]): Partial<T> {
    const newObj: Partial<T> = {};
    Object.keys(obj)
        .filter((key) => includesKey.includes(key))
        .forEach((key) => {
            newObj[key as keyof T] = obj[key];
        });
    return newObj;
}
