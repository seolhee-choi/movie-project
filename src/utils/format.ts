export const cleanTitle = (title:string): string => {
    if (!title) return '';

    return title
        .replace(/HS/g, '')
        .replace(/HE/g, '')
        .replace(/^\s+|\s+$/g, '')
        .replace(/ +/g, ' ')
        .replace(/[\[\]:!?.]/g, '')
        .replace(/<br>/g, '\n')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&quot;/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .trim();
}

export const replaceDate = (date:string): string => {
    return date.replace(/-/g, '');
}