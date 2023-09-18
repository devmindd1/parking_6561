const Model = require('../core/Model');

class CountryModel extends Model{
    constructor(){ super('runway_types'); }

    async getAllIndexedById(){
        const result = {};
        const runways = await this.getAll();

        for(const runway of runways)
            result[runway.id] = runway['title'];

        return result;
    }

}

module.exports = CountryModel;