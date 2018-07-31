import { combineReducers } from 'redux';
import colorReducer, * as fromColor from './color';
import quoteReducer, * as fromQuote from './quote';

const rootReducer = combineReducers({
    quote: quoteReducer,
    color: colorReducer
});

export const getColor = (state) => 
    fromColor.getColor(state.color);

export const getQuoteText = (state) =>
    fromQuote.getQuoteText(state.quote);

export const getQuoteAuthor = (state) => 
    fromQuote.getQuoteAuthor(state.quote);

export default rootReducer;