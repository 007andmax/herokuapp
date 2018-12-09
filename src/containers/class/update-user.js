export class UpdateUser {
    id;
    api_key;
    email;
    first_name;
    last_name;
    phone;
    about;
    constructor (id,api_key,email,first_name,last_name,phone,about = null) {
        this.id = id;
        this.api_key = api_key;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.about = about;
    }
}