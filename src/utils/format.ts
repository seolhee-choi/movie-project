export const cleanTitle = (title:string): string => {

    return title
        .replace(/\!HS/g, '')
        .replace(/\!HE/g, '')
        .replace(/^\s+|\s+$/g, '')
        .replace(/ +/g, ' ')
        .replace(/[\[\]:!?.]/g, "").trim(); }

export const replaceDate = (date:string): string => {
    return date.replace(/-/g, "");
}