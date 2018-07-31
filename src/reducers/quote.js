import { QUOTE_SET } from '../actions';
const quoteReducer = (state = {quote: '', author: ''}, action) => {
    switch(action.type) {
        case QUOTE_SET:
            return {
                quote: action.quote.quote,
                author: action.quote.author
            };
        default:
            return state;
    }       
}

export default quoteReducer;

export const getQuoteText = (state) => {
    return state.quote;
}
export const getQuoteAuthor = (state) =>
    state.author;