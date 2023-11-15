const Model = require('../core/Model');

class AirfieldsSpaceModel extends Model{
    constructor(){ super('airfields_spaces'); }

    static _TYPES = {
        'parking': 'parking',
        'hangar': 'hangar',
    };

    getByAirfieldId(airfieldId){
        return this.t.select('id', 'title')
            .where('airfield_id', airfieldId);
    }
}

module.exports = AirfieldsSpaceModel;