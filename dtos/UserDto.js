module.exports = class UserDto{
    constructor(model){
        this.id = model.id;
        this.email = model.email;
        this.first_name = model.first_name;
        this.last_name = model.last_name;
        this.date_of_birth = model.date_of_birth;
        this.country_id = model.country_id;
    };
};