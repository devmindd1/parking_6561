const Model = require('../core/Model');

class AirfieldsAmenityTypesMapModel extends Model{
    constructor(){ super('airfields_amenity_types_map'); }

    getByAirfieldId(airfieldId){
        return this.t.select('amenity_type_id', 'amenity_types.title')
            .leftJoin('amenity_types', 'airfields_amenity_types_map.amenity_type_id', 'amenity_types.id')
            .where({airfield_id: airfieldId});
    }
}

module.exports = AirfieldsAmenityTypesMapModel;