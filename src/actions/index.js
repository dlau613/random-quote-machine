export const QUOTE_SET = 'QUOTE_SET';
export const COLOR_SET = 'COLOR_SET';

export const setQuote = (quote) => {
    return {
        type: QUOTE_SET,
        quote: quote
    }
};

export const setColor = (color) => {
    return {
        type: COLOR_SET,
        color: color
    }
}