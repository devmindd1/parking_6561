const Model = require('../core/Model');

class AirfieldsAmenityTypesMapModel extends Model{
    constructor(){ super('airfields_amenity_types_map'); }

    getByAirfieldId(airfieldId){
        return this.t.select('amenity_type_id')
            .where({airfield_id: airfieldId});
    }
}

module.exports = AirfieldsAmenityTypesMapModel;