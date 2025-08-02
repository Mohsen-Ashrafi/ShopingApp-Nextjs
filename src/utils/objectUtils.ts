// export function includeObj<T extends Record<string, any>>(obj: T, includesKey: string[]): Partial<T> {
//     const newObj: Partial<T> = {};
//     Object.keys(obj)
//         .filter((key) => includesKey.includes(key))
//         .forEach((key) => {
//             newObj[key as keyof T] = obj[key];
//         });
//     return newObj;
// }

export function includeObj<T extends object, K extends keyof T>(
    obj: T,
    includesKey: K[]
): Pick<T, K> {
    const newObj = {} as Pick<T, K>;
    includesKey.forEach((key) => {
        if (key in obj) {
            newObj[key] = obj[key];
        }
    });
    return newObj;
}

