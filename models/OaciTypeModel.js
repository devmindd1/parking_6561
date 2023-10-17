const Model = require('../core/Model');

class OaciTypeModel extends Model{
    constructor(){ super('oaci_types'); }

    getAllFree(){
        return this.t.select('*')
            .leftJoin('airfields', 'oaci_types.id', 'airfields.oaci_type_id')
            .whereNull('airfields.id');
    }
}

module.exports = OaciTypeModel;