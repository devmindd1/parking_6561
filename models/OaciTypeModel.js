const Model = require('../core/Model');

class OaciTypeModel extends Model{
    constructor(){ super('oaci_types'); }

    getAllFree(){
        return this.t.select('oaci_types.*')
            .leftJoin('airfields', 'oaci_types.id', 'airfields.oaci_type_id')
            .whereNull('airfields.id');
    }

    getAllNotConnected(){
        return this.t.select('oaci_types.*')
            .leftJoin('airfields', 'oaci_types.id', 'airfields.oaci_type_id')
            .whereNull('airfields.id')
            .whereNotNull('oaci_types.latitude');
    }
}

module.exports = OaciTypeModel;