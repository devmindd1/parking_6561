const Model = require('../core/Model');

class AirfieldsRunwayTypesMapModel extends Model{
    constructor(){ super('airfields_runway_types_map'); }

    getByAirfieldId(airfieldId){
        return this.t.select('runway_type_id')
            .where({airfield_id: airfieldId});
    }
}

module.exports = AirfieldsRunwayTypesMapModel;