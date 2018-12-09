/**
 * Created by Макс on 29.10.2017.
 */
import {
    ADD_USER
} from '../constants/action-user';

const initialState = {};
const userReducer = function(state = initialState, action) {

    switch(action.type) {

        case ADD_USER:
            return {action: ADD_USER,data: Object.assign({},state ,  action.data )};
        default:
            return {action: "",user: initialState};
    }
    return state;

}
export default userReducer;