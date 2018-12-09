
import {ADD_USER,EDIT_USER} from "../constants/action-user";

export function addUser(data) {
    return { type: ADD_USER, data: data };
}
export function EditUser(data) {
    return { type: EDIT_USER, data: data };
}