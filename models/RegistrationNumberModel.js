const Model = require('../core/Model');

class RegistrationNumberModel extends Model{
    constructor(){ super('registration_numbers'); }

    getFiltered({keyword}){
        return this.t.select('id', 'number', 'aircraft')
            .where('number', 'LIKE', `%${keyword}%`)
            .orWhere('aircraft', 'LIKE', `%${keyword}%`)
    }

}

module.exports = RegistrationNumberModel;