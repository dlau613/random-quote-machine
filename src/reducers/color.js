import { COLOR_SET } from '../actions';
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
export default colorReducer;

export const getColor = (state) => {
    return state.color;
}