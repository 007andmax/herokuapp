
import {ERROR} from "../constants/event";

export function showAlert(data) {
    return { type: ERROR, data: data };
}