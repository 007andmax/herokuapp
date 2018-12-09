export class CreateUser {
    api_key;
    email;
    first_name;
    last_name;
    phone;
    about;
    constructor (api_key,email,first_name,last_name,phone,about = null) {
        this.api_key = api_key;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        if (about)
        {
            this.about = about;
        }
       
    }
}