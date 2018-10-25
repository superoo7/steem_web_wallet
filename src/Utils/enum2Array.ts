// https://stackoverflow.com/questions/43100718/typescript-enum-to-object-array

// Turn enum into array
export const enum2Array = (enumme: any) => {
    return Object.values(enumme);
};
