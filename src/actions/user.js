
import {ADD_USER,EDIT_USER,UPDATE_USER,REMOVE_USER} from "../constants/action-user";

export function addUser(data) {
    return { type: ADD_USER, data: data };
}
export function EditUser(data) {
    return { type: EDIT_USER, data: data };
}
export function updateUser(data) {
    return { type: UPDATE_USER, data: data };
}
export function removeUser(data) {
    return { type: REMOVE_USER, data: data };
}