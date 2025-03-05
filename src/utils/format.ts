export const cleanTitle = (title:string): string => {
    return title
        .replace(/\!HS/g, '')
        .replace(/\!HE/g, '')
        .replace(/^\s+|\s+$/g, '')
        .replace(/ +/g, ' ');
}