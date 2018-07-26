import { combineReducers } from 'redux';
import { QUOTE_SET, COLOR_SET} from '../actions'

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

const colorReducer = (state = {color: ''}, action) => {
    switch(action.type) {
        case COLOR_SET: 
            return {
                color: action.color
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    quote: quoteReducer,
    color: colorReducer
});

export default rootReducer;